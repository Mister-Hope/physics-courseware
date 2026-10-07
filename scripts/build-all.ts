import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");
const DIST = path.join(ROOT, "dist");
const SHARED_DIR = path.join(DIST, "shared");
/* ── 1. 构建入口网站 ── */
console.log("\n📦 构建入口网站 ...");
execSync("pnpm run --filter physics-courseware-homepage build", { cwd: ROOT, stdio: "inherit" });

/* ── 2. 遍历 courses/，逐个构建 ── */
const entries = readdirSync(COURSES_DIR, { withFileTypes: true });
const courseDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

if (courseDirs.length === 0) {
  console.log("⚠️  未找到任何课件目录");
} else {
  for (const name of courseDirs) {
    const coursePath = path.join(COURSES_DIR, name);
    const pkgJsonPath = path.join(coursePath, "package.json");

    if (!existsSync(pkgJsonPath)) {
      console.log(`⏭️  跳过 ${name}：无 package.json`);
      continue;
    }

    console.log(`\n📦 构建课件: ${name} ...`);
    execSync("pnpm build", { cwd: coursePath, stdio: "inherit" });

    const srcDist = path.join(coursePath, "dist");
    const destDist = path.join(DIST, name);

    if (existsSync(srcDist)) {
      if (existsSync(destDist)) rmSync(destDist, { recursive: true });
      cpSync(srcDist, destDist, { recursive: true });
      console.log(`   ✅ 已复制到 dist/${name}/`);
    } else {
      console.log(`   ⚠️  未找到构建产物 ${srcDist}`);
    }
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
    const next = source.replace(fontRef, "url(/shared/katex/$<file>)");

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

const movedNames = [...assetGroups]
  .filter(([, list]) => list.length > 1)
  .map(([name]) => name)
  .sort((left, right) => right.length - left.length);

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
