/**
 * 统计每课页数（内存计算，供主页的 Vite 虚拟模块 `virtual:course-pages` 使用）
 *
 * 用途：主页「我要上课」弹窗要显示每课总页数、并在选择起始页时校验范围。
 *
 * 统计方式：读 courses/<slug>/slides.md，交给 `scripts/shared/parse-slides.ts` 的 `countSlidePages`
 * （全仓唯一的分页解析实现：区分 frontmatter 块与正文块、跳过 ``` 围栏内的 `---`），不在这里另写一套。
 *
 * 由 workspace/homepage/vite.config.ts 在 dev / build 时通过虚拟模块调用，页数不手工维护，也不落盘。
 */

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { countSlidePages } from "./shared/parse-slides";

const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");

/**
 * 由 slides.md 推断页数（保留旧导出名，外部调用方无需改动）。
 *
 * @param markdown 课件 slides.md 全文
 * @returns 页数（最少 1）
 */
export const countPages = countSlidePages;

/**
 * 统计全部课件页数（纯内存计算，不写磁盘）。
 *
 * @returns 每课页数映射（slug → 页数）
 */
export const collectCoursePages = (): Record<string, number> => {
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

  return pages;
};

/**
 * 兼容旧调用方：等同于 `collectCoursePages()`（不再生成 pages.generated.ts）。
 *
 * @returns 每课页数映射（slug → 页数）
 */
export const generateCoursePages = (): Record<string, number> => collectCoursePages();
