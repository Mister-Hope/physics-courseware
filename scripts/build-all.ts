import { execSync, spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { availableParallelism } from "node:os";
import path from "node:path";
import type { Readable } from "node:stream";

const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");
const DIST = path.join(ROOT, "dist");
const SHARED_DIR = path.join(DIST, "shared");
/* ── 1. 构建入口网站 ── */
console.log("\n📦 构建入口网站 ...");
execSync("pnpm run --filter physics-courseware-homepage build", { cwd: ROOT, stdio: "inherit" });

/* ── 2. 遍历 courses/，滑动窗口并发构建 ──
   一课一个构建进程，串行跑 25 课太慢（单课 1–2 分钟、吃满一个核）；
   并发度默认 min(4, 核数)，可用 `BUILD_CONCURRENCY` 覆盖（本机内存小就调小）。 */
const BUILD_CONCURRENCY = Math.max(
  1,
  Number(process.env.BUILD_CONCURRENCY ?? "4") || Math.min(4, availableParallelism()),
);

const entries = readdirSync(COURSES_DIR, { withFileTypes: true });
const courseDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
const buildTargets: string[] = [];

for (const name of courseDirs) {
  const coursePath = path.join(COURSES_DIR, name);

  if (!existsSync(path.join(coursePath, "package.json"))) {
    console.log(`⏭️  跳过 ${name}：无 package.json`);
    continue;
  }

  // 只有写了 slides.md 的目录才算课件（口径与 `scripts/course-lookup.ts` 一致）：
  // 欠费/未动工的骨架目录有 package.json 却没有 slides.md，直接 `slidev build` 会中断整轮构建
  // （2026-10 第十一章收尾时 13.1-magnetic-field-lines 就卡在这里）。
  if (!existsSync(path.join(coursePath, "slides.md"))) {
    console.log(`⏭️  跳过 ${name}：还没有 slides.md`);
    continue;
  }

  buildTargets.push(name);
}

// 把子进程输出按行加 `[课件名]` 前缀转发（并发时不会串在一起认不出是谁）
const forwardLines = (name: string, stream: Readable | null): void => {
  if (stream == null) return;

  let rest = "";

  stream.setEncoding("utf8");
  stream.on("data", (chunk: string) => {
    const lines = `${rest}${chunk}`.split("\n");

    rest = lines.pop() ?? "";

    for (const line of lines) if (line.trim() !== "") console.log(`[${name}] ${line}`);
  });
  stream.on("end", () => {
    if (rest.trim() !== "") console.log(`[${name}] ${rest}`);
  });
};

interface BuildResult {
  name: string;
  code: number | null;
  ms: number;
}

// 构建单个课件：优先用课件自己的 bin（纯 node 进程，省掉 pnpm 一层），缺了才退回 `pnpm build`
const buildCourse = (name: string): Promise<BuildResult> =>
  new Promise((resolve) => {
    const coursePath = path.join(COURSES_DIR, name);
    const localBin = path.join(coursePath, "node_modules", ".bin", "slidev");
    const started = Date.now();

    const child = existsSync(localBin)
      ? spawn(localBin, ["build", "--base", `/${name}/`], {
          cwd: coursePath,
          stdio: ["ignore", "pipe", "pipe"],
        })
      : spawn("pnpm", ["build"], {
          cwd: coursePath,
          stdio: ["ignore", "pipe", "pipe"],
        });

    forwardLines(name, child.stdout);
    forwardLines(name, child.stderr);

    child.once("error", (error) => {
      console.error(`[${name}] ❌ 启动失败：${error.message}`);
      resolve({ name, code: -1, ms: Date.now() - started });
    });
    child.once("exit", (code) => {
      resolve({ name, code, ms: Date.now() - started });
    });
  });

// 把课件自己的 dist/ 收进整站 dist/<name>/
const collectCourse = (name: string): void => {
  const srcDist = path.join(COURSES_DIR, name, "dist");
  const destDist = path.join(DIST, name);

  if (!existsSync(srcDist)) {
    console.log(`[${name}] ⚠️  未找到构建产物 ${srcDist}`);
    return;
  }

  if (existsSync(destDist)) rmSync(destDist, { recursive: true });
  cpSync(srcDist, destDist, { recursive: true });
  console.log(`[${name}] ✅ 已复制到 dist/${name}/`);
};

if (buildTargets.length === 0) {
  console.log("⚠️  未找到任何课件目录");
} else {
  console.log(`\n📦 并发构建 ${buildTargets.length} 个课件（并发度 ${BUILD_CONCURRENCY}）...`);

  const queue = [...buildTargets];
  const failures: BuildResult[] = [];

  const worker = async (): Promise<void> => {
    for (;;) {
      const name = queue.shift();

      if (name == null) return;

      console.log(`\n📦 构建课件: ${name} ...`);
      const result = await buildCourse(name);
      const seconds = (result.ms / 1000).toFixed(1);

      if (result.code === 0) {
        collectCourse(name);
        console.log(`[${name}] ✅ 构建完成（${seconds}s）`);
      } else {
        failures.push(result);
        console.log(`[${name}] ❌ 构建失败（exit ${result.code}，${seconds}s）`);
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(BUILD_CONCURRENCY, buildTargets.length) }, () => worker()),
  );

  // 有任何一课失败就整轮失败：dist/ 不完整时继续做公共资源归并，会把引用改到不存在的文件上
  if (failures.length > 0) {
    console.error(
      `\n❌ ${failures.length} 个课件构建失败：${failures.map(({ name }) => name).join("、")}`,
    );
    process.exitCode = 1;
    throw new Error("课件构建失败，终止后续资源归并");
  }
}

/* ── 3. KaTeX 字体去重：内容一致（同名同 hash），整站只留 dist/shared/katex 一份 ──
   课件 CSS 里引用的是绝对路径，因此站点必须部署在域名根目录（与现有 `--base /<slug>/` 一致）。 */
const sharedFontDir = path.join(SHARED_DIR, "katex");
const fonts = new Map<string, string>();
const fontFiles: string[] = [];
const cssFiles: string[] = [];

const collect = (dir: string): void => {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (full !== SHARED_DIR) collect(full);
    } else if (/^KaTeX_.+\.woff2$/u.test(entry.name)) {
      fontFiles.push(full);
      if (!fonts.has(entry.name)) fonts.set(entry.name, full);
    } else if (entry.name.endsWith(".css")) {
      cssFiles.push(full);
    }
  }
};
collect(DIST);

if (fonts.size > 0) {
  console.log("\n🔤 归并 KaTeX 字体到 dist/shared/katex ...");
  mkdirSync(sharedFontDir, { recursive: true });

  for (const [name, source] of fonts) cpSync(source, path.join(sharedFontDir, name));

  const fontRef = /url\([^)]*?(?<file>KaTeX_[^)'"]+?\.woff2)\)/gu;
  let rewritten = 0;

  for (const cssFile of cssFiles) {
    const source = readFileSync(cssFile, "utf8");
    const next = source.replaceAll(fontRef, "url(/shared/katex/$<file>)");

    if (next !== source) {
      writeFileSync(cssFile, next);
      rewritten += 1;
    }
  }

  for (const source of fontFiles) rmSync(source);

  console.log(`   ✅ ${fonts.size} 个 woff2 归并到 dist/shared/katex/，改写 ${rewritten} 个 CSS`);
}

/* ── 4. 公共 chunk 去重 ──
   Vite 产物名带内容 hash：不同课件里同名的文件内容完全一致（如 vue-*.js、shiki-*.js、logo-*.png、
   以及 A 之后变成异步 chunk 的 katex-*.js）。把它们整站归并到 dist/shared/assets 一份，
   再把所有引用改成绝对路径 /shared/assets/<name>（站点部署在域名根目录，与 `--base /<slug>/` 一致）。 */
const sharedAssetDir = path.join(SHARED_DIR, "assets");
const assetGroups = new Map<string, string[]>();
const textFiles: string[] = [];

const collectAssets = (dir: string): void => {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (full !== SHARED_DIR) collectAssets(full);
      continue;
    }

    if (/\.(?:html|js|css)$/u.test(entry.name)) textFiles.push(full);

    if (full.includes(`${path.sep}assets${path.sep}`)) {
      const list = assetGroups.get(entry.name) ?? [];

      list.push(full);
      assetGroups.set(entry.name, list);
    }
  }
};
collectAssets(DIST);

const escapeRegExp = (value: string): string =>
  value.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`);

// `__vite__mapDeps` 的项会被 Vite 的预加载助手**无条件拼上课件 base**（`base + dep`），
// 所以这类 base-相对项要写成 `../shared/assets/<name>`（经 URL 规范化后正好落在 /shared/assets/）；
// 其余形态（静态 import / HTML / CSS url()）是浏览器直接解析的，用绝对路径即可。
const rewriteAssetRef = (
  _match: string,
  quote: string,
  pathPrefix: string | undefined,
  name: string,
): string => {
  const prefix = pathPrefix ?? "";

  return prefix.startsWith("/") || prefix.startsWith(".")
    ? `${quote}/shared/assets/${name}`
    : `${quote}../shared/assets/${name}`;
};

const movedCandidates = [...assetGroups]
  .filter(([, list]) => list.length > 1)
  .map(([name]) => name)
  .sort((left, right) => right.length - left.length);

/* 闭包安全校验：只有「它引用的同目录资产也一起搬走」的文件才能搬进 dist/shared/assets/。
   否则 `from"./chunk-xxx.js"`、`import("./chunk-xxx.js")` 这类相对引用会指向一个
   只存在于某个课件 assets/ 里的文件，搬走后直接 404。被剔除的留在各课件自己的 assets/ 里，
   第 4 步的引用改写照常会把别人指向它的相对路径改成 /shared/assets/。 */
const localRelativeRef = /(?:from\s*|import\s*\(?\s*)(?<quote>["'])(?<path>\.\/[^"'/]+)\k<quote>/gu;
const movable = new Set(movedCandidates);

for (let changed = true; changed;) {
  changed = false;

  for (const name of movable) {
    if (!name.endsWith(".js")) continue;

    const source = assetGroups.get(name)?.[0];

    if (source == null) continue;

    for (const match of readFileSync(source, "utf8").matchAll(localRelativeRef)) {
      const ref = match.groups?.path?.slice(2);

      if (ref == null || movable.has(ref)) continue;

      console.log(`   ⏭️  ${name} 引用了未归并的 ${ref}，保留在课件自己的 assets/ 中`);
      movable.delete(name);
      changed = true;
      break;
    }
  }
}

const movedNames = movedCandidates.filter((name) => movable.has(name));

if (movedNames.length > 0) {
  console.log("\n📦 归并公共 chunk 到 dist/shared/assets ...");
  mkdirSync(sharedAssetDir, { recursive: true });

  for (const name of movedNames) {
    const source = assetGroups.get(name)?.[0];

    if (source != null) cpSync(source, path.join(sharedAssetDir, name));
  }

  // 归并后的文件自身也要参与改写（内部 import 改成绝对路径）
  for (const name of movedNames)
    if (/\.(?:js|css)$/u.test(name)) textFiles.push(path.join(sharedAssetDir, name));

  const alternation = movedNames.map((name) => escapeRegExp(name)).join("|");
  // 引用形态：`"./modules/x.js"`、`"../x.js"`、`"/deck/assets/x.js"`、`url(/deck/assets/x.png)`、
  // 模板字符串 `/deck/assets/x.png`，以及 `__vite__mapDeps` 里的 base-相对项 `"assets/…/x.js"`。
  const reference = new RegExp(
    `(["'\`(])(?<path>[^"'()\\s\`]*?/)?(?<name>${alternation})(?=["'\`)]|$)`,
    "gu",
  );

  let rewritten = 0;

  for (const file of textFiles) {
    if (!existsSync(file)) continue;

    const source = readFileSync(file, "utf8");
    const next = source.replaceAll(reference, rewriteAssetRef);

    if (next !== source) {
      writeFileSync(file, next);
      rewritten += 1;
    }
  }

  for (const name of movedNames)
    for (const original of assetGroups.get(name) ?? []) rmSync(original);

  // 校验 1：改写后每一处引用都必须是 /shared/assets/<name>；2：归并后的文件确实存在
  let checked = 0;

  for (const file of textFiles) {
    if (!existsSync(file)) continue;

    const source = readFileSync(file, "utf8");

    for (const match of source.matchAll(reference)) {
      const name = match.groups?.name;

      if (name == null || !match[0].endsWith(`/shared/assets/${name}`))
        throw new Error(`公共资源引用未改写：${file} → ${match[0]}`);

      checked += 1;
    }
  }

  for (const name of movedNames)
    if (!existsSync(path.join(sharedAssetDir, name))) throw new Error(`公共资源缺失：${name}`);

  console.log(
    `   ✅ 归并 ${movedNames.length} 个公共资源到 dist/shared/assets/，改写 ${rewritten} 个文件（校验 ${checked} 处引用）`,
  );
}

console.log(`\n✨ 全部完成！输出目录: ${DIST}\n`);
