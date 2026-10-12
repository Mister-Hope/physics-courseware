/**
 * 统计每课页数 → workspace/homepage/src/pages.generated.ts
 *
 * 用途：主页「我要上课」弹窗要显示每课总页数、并在选择起始页时校验范围。
 *
 * 统计方式：读 courses/<slug>/slides.md，数「顶格 `---`」分隔符（跳过 ``` 围栏内的行）。 本仓库的写法是每页都带 frontmatter：`--- <fm>
 * --- <内容> --- <fm> --- …`， 即**每页边界占两个 `---`**（极少数裸分隔符只占一个），所以页数 = ⌈分隔符数 / 2⌉。
 *
 * 由 workspace/homepage/vite.config.ts 在 dev 启动与 build 前自动调用，页数不手工维护； 生成的 pages.generated.ts
 * 随仓库提交一份，保证 lint / 静态分析时不缺文件。
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");
const OUT_FILE = path.join(ROOT, "workspace", "homepage", "src", "pages.generated.ts");

/**
 * 数 md 文本里的「顶格 ---」分隔符（跳过围栏）。
 *
 * @param markdown 课件 slides.md 全文
 * @returns 顶层 `---` 分隔符数量
 */
export const countTopLevelSeparators = (markdown: string): number => {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  let inFence = false;
  let separators = 0;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^\s*---\s*$/u.test(line)) separators += 1;
  }

  return separators;
};

/**
 * 由 slides.md 推断页数：页边界成对出现（`--- fm ---`），故 ⌈分隔符 / 2⌉，最少 1 页。
 *
 * @param markdown 课件 slides.md 全文
 * @returns 页数
 */
export const countPages = (markdown: string): number =>
  Math.max(1, Math.ceil(countTopLevelSeparators(markdown) / 2));

/**
 * 统计全部课件页数并写入 pages.generated.ts。
 *
 * @returns 每课页数映射（slug → 页数）
 */
export const generateCoursePages = (): Record<string, number> => {
  const pages: Record<string, number> = {};

  for (const entry of readdirSync(COURSES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const slidesPath = path.join(COURSES_DIR, entry.name, "slides.md");
    let markdown = "";

    try {
      markdown = readFileSync(slidesPath, "utf8");
    } catch {
      continue; // 无 slides.md 的目录（如 docs）跳过
    }

    pages[entry.name] = countPages(markdown);
  }

  const source = `// 生成文件：由 scripts/course-pages.ts 在主页 dev / build 时自动写入，勿手改。
// 每课页数 = courses/<slug>/slides.md 的顶层 \`---\` 分隔数，主页「我要上课」弹窗用它显示总页数并校验起始页。

export const coursePages: Record<string, number> = ${JSON.stringify(pages, null, 2)};
`;

  mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, source);

  return pages;
};

/* 模块加载即统计一次（幂等、开销小）：
   - 被 workspace/homepage/vite.config.ts import → 每次 dev / build 启动自动刷新页数；
   - 被 `pnpm exec unrun scripts/course-pages.ts` 直接运行 → 手动刷新生效。 */
generateCoursePages();
