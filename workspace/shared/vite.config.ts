import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import type { renderToString } from "katex";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

/**
 * 共享 addon 的 Vite 配置：Slidev 会把它合并进**每个**课件的构建。
 *
 * 目前有两件事：
 *
 * - B0：KaTeX 只保留 woff2 字体；
 * - A：把 `<Latex>` 的静态公式在编译期预渲染成 HTML。
 */

/* ────────────────────────────── B0 ────────────────────────────── */

/**
 * B0：KaTeX 只保留 woff2 字体。
 *
 * `katex/dist/katex.min.css` 的每个 `@font-face` 同时给了 woff2 / woff / truetype 三种格式， Vite 会把三个文件全部 emit
 * 出去 —— 每个课件多出 ~1.2MB（整个 dist 里 woff+ttf 合计 ~16MB）。 本项目浏览器目标（chrome111 / safari16.4，见 Vite 的
 * cssTarget）全部支持 woff2，所以只留 woff2。
 *
 * 实现放在 `generateBundle`：`@import url("katex/...")` 是在 Vite 的 CSS 处理阶段才被内联的， 普通的 transform
 * 钩子拿不到那段字体声明；到 generateBundle 时 CSS 与字体资源都已成型， 这时删掉 woff/ttf 资源、并把 CSS 里 对应的 `src` 分支去掉即可。
 */
const NON_WOFF2_SRC =
  /,\s*url\([^)]*?KaTeX_[^)]*?\.(?:woff|ttf)\)\s*format\("(?:woff|truetype)"\)/gu;
const KATEX_LEGACY_FONT = /KaTeX_.+\.(?:woff|ttf)$/u;

/* ────────────────────────────── A ────────────────────────────── */

/**
 * A：静态公式编译期预渲染。
 *
 * `Latex.vue` 原先在运行时 `import { renderToString } from "katex"`，于是每个课件都要带上 ~259KB 的 katex JS。 而本仓库
 * 2073 处 `<Latex>` 里 2067 处是静态字面量 —— 这些完全可以在 build 期渲染好。
 *
 * 插件扫描课件目录 + 共享 addon 里的 `.vue` / `.md`，把静态 `tex="..."` / `{ tex: "..." }` 用 katex 渲染成 HTML
 * 映射（虚拟模块，重复公式天然去重），`Latex.vue` 改成查表。 只有动态绑定（`:tex="..."`）才回落到运行时 `import("katex")`（异步
 * chunk，只有真的渲染动态公式才加载）。
 */
const VIRTUAL_ID = "virtual:courseware-katex-html";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

const TAG_RE = /<Latex\b(?<attrs>[^>]*?)\/?>/gu;
const ATTR_TEX_RE = /\btex="(?<tex>[^"]*)"/u;
const OBJ_TEX_RE = /\btex:\s*"(?<tex>(?:[^"\\]|\\.)*)"/gu;
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".temp", ".e2e"]);

const decodeEntities = (value: string): string =>
  value
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");

const collectSourceFiles = (dir: string, found: string[]): void => {
  let entries;

  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) collectSourceFiles(full, found);
    } else if (entry.name.endsWith(".vue") || entry.name.endsWith(".md")) {
      found.push(full);
    }
  }
};

const render = (
  values: Set<string>,
  displayMode: boolean,
  renderToStringFn: typeof renderToString,
): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const value of values) {
    try {
      result[value] = renderToStringFn(value, { displayMode, throwOnError: false, output: "html" });
    } catch {
      // 渲染失败的公式不写入映射，运行时会回落到 katex 动态渲染
    }
  }

  return result;
};

const katexPrerenderPlugin = (sharedRoot: string): Plugin => {
  let courseRoot = sharedRoot;

  return {
    name: "courseware:katex-prerender",
    enforce: "pre" as const,
    configResolved(config: { root: string }): void {
      courseRoot = config.root;
    },
    async load(this: { addWatchFile: (id: string) => void }, id: string): Promise<string | null> {
      if (id !== RESOLVED_ID) return null;

      const roots = [...new Set([courseRoot, sharedRoot].filter((root) => root.length > 0))];
      const files: string[] = [];

      for (const root of roots) collectSourceFiles(root, files);

      const inline = new Set<string>();
      const display = new Set<string>();

      for (const file of files) {
        this.addWatchFile(file);

        let source: string;

        try {
          source = readFileSync(file, "utf8");
        } catch {
          continue;
        }

        for (const match of source.matchAll(TAG_RE)) {
          const attrs = match.groups?.attrs ?? "";

          if (attrs.includes(":tex=")) continue;

          const tex = ATTR_TEX_RE.exec(attrs)?.groups?.tex;

          if (tex == null) continue;

          const value = decodeEntities(tex);

          if (/(?:^|\s)display(?:\s|=|$)/u.test(attrs)) display.add(value);
          else inline.add(value);
        }

        for (const match of source.matchAll(OBJ_TEX_RE)) {
          const tex = match.groups?.tex;

          if (tex != null) inline.add(decodeEntities(tex.replaceAll(String.raw`\"`, '"')));
        }
      }

      const { renderToString } = await import("katex");

      return [
        `export const KATEX_INLINE = ${JSON.stringify(render(inline, false, renderToString))};`,
        `export const KATEX_DISPLAY = ${JSON.stringify(render(display, true, renderToString))};`,
      ].join("\n");
    },
    resolveId(id: string): string | null {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },
  };
};

const SHARED_ROOT = import.meta.dirname;

export default defineConfig({
  plugins: [
    katexPrerenderPlugin(SHARED_ROOT),
    {
      name: "courseware:katex-woff2-only",
      generateBundle(_options, bundle): void {
        for (const [fileName, item] of Object.entries(bundle)) {
          if (item.type === "asset" && fileName.endsWith(".css")) {
            const source =
              typeof item.source === "string"
                ? item.source
                : Buffer.from(item.source).toString("utf8");
            const next = source.replace(NON_WOFF2_SRC, "");

            if (next !== source) item.source = next;
          } else if (item.type === "asset" && KATEX_LEGACY_FONT.test(fileName)) {
            Reflect.deleteProperty(bundle, fileName);
          }
        }
      },
    },
  ],
});
