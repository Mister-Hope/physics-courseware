// 课件标识的统一解析：`pnpm dev` / `pnpm slide` / `pnpm shots` 共用。
//
// 课件目录名一律是「章节前缀 + 英文名」（如 1.3-velocity、2.2-2.3-uniform-acceleration），
// 这里把这些标识统一成同一套匹配规则：完整目录名 / 英文名 / 章节号 / 唯一子串。

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { textbooks } from "../workspace/homepage/courses.config";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT_DIR, "courses");

export interface CourseInfo {
  /** 目录名：URL 前缀与首页 slug */
  slug: string;
  /** 包名（pnpm --filter 用）；缺 package.json 时为 undefined */
  packageName?: string;
  /** 英文名（包名去掉 -courseware 后缀） */
  englishName: string;
  /** 中文标题（只在 courses.config.ts 登记过才有） */
  title?: string;
  /** 章节号，如「§1.3」（只在 courses.config.ts 登记过才有） */
  chapter?: string;
}

export interface CourseGroup {
  /** 分册全名，如「必修第一册」 */
  name: string;
  /** 分册简称，如「必修1」 */
  shortName: string;
  /** 分册 slug，如「bx1」 */
  slug: string;
  /** 该分册下真实存在的课件（按 courses.config.ts 的登记顺序） */
  courses: CourseInfo[];
}

const readPackageName = (slug: string): string | undefined => {
  const manifestPath = path.join(COURSES_DIR, slug, "package.json");
  let packageName: string | undefined;

  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { name?: string };

      packageName = manifest.name;
    } catch {
      console.warn(`⚠️  解析 ${manifestPath} 失败，按缺包名处理`);
    }
  }

  return packageName;
};

const toInfo = (slug: string, meta?: { title: string; chapter: string }): CourseInfo => {
  const packageName = readPackageName(slug);

  return {
    slug,
    packageName,
    englishName: packageName ? packageName.replace(/-courseware$/u, "") : slug,
    title: meta?.title,
    chapter: meta?.chapter,
  };
};

// courses/ 下所有含 slides.md 的课件目录名
export const listCourseDirs = (): string[] =>
  readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        existsSync(path.join(COURSES_DIR, entry.name, "slides.md")),
    )
    .map((entry) => entry.name);

// 目录名里的章节前缀（如 2.2-2.3-uniform-acceleration → 2.2-2.3）
const chapterPrefix = (slug: string): string =>
  /^(?:o\d+-)?(?<chapter>\d+(?:\.[\dx]+)*(?:-\d+(?:\.[\dx]+)*)*)/u.exec(slug)?.groups?.chapter ??
  "";

// 章节号归一化：去掉 §、`·`/`/`/全角点统一成连字符（方便 "2.2·2.3" 与 "2.2-2.3" 互相匹配）
export const normalizeChapter = (chapter: string): string =>
  chapter
    .trim()
    .replace(/^§\s*/u, "")
    .replaceAll(/[·・/／．]/gu, "-")
    .replaceAll(/\s+/gu, "");

// 章节号排序键：按数值逐段比较（10.4 不能排在 2.1 前面）；`x` 段排在同章数字段之后
const chapterRank = (slug: string): number[] =>
  chapterPrefix(slug)
    .split(/[.-]/u)
    .map((part) => (part === "x" ? Number.MAX_SAFE_INTEGER : Number(part)));

const compareByChapter = (left: string, right: string): number => {
  const leftRank = chapterRank(left);
  const rightRank = chapterRank(right);

  for (let index = 0; index < Math.max(leftRank.length, rightRank.length); index += 1) {
    const leftValue = leftRank[index] ?? -1;
    const rightValue = rightRank[index] ?? -1;

    if (leftValue !== rightValue) return leftValue - rightValue;
  }

  return 0;
};

// 按 courses.config.ts 的分册与登记顺序列出课件（跳过目录不存在的登记项）
export const readCourseGroups = (): CourseGroup[] => {
  const existing = new Set(listCourseDirs());

  return textbooks.map((group) => ({
    name: group.name,
    shortName: group.shortName,
    slug: group.slug,
    courses: group.courses
      .filter((course) => existing.has(course.slug))
      .map((course) => toInfo(course.slug, course)),
  }));
};

// 未登记的课件目录：按章节号数值排序（不能字符串排序，否则 10.4 会排在 2.1 前面）
export const listUnregistered = (): CourseInfo[] => {
  const registered = new Set(
    textbooks.flatMap((group) => group.courses.map((course) => course.slug)),
  );

  return listCourseDirs()
    .filter((slug) => !registered.has(slug))
    .sort((left, right) => compareByChapter(left, right) || left.localeCompare(right))
    .map((slug) => toInfo(slug));
};

// 登记 + 未登记的全部课件，登记项在前、未登记项按章节号排在后面
export const listCourses = (): CourseInfo[] => [
  ...readCourseGroups().flatMap((group) => group.courses),
  ...listUnregistered(),
];

// 课件的章节号：优先取登记值，未登记时从目录名推导
const courseChapter = (course: CourseInfo): string =>
  normalizeChapter(course.chapter ?? chapterPrefix(course.slug));

const matchTiers: ((course: CourseInfo, id: string) => boolean)[] = [
  // ① 完整目录名
  (course, id) => course.slug === id,
  // ② 英文名（包名去掉 -courseware）
  (course, id) => course.englishName === id,
  // ③ 章节号（1.3 / 2.2·2.3 / 2.x）
  (course, id) => courseChapter(course) === normalizeChapter(id),
  // ④ 唯一子串（目录名或中文标题）
  (course, id) => course.slug.includes(id) || (course.title?.includes(id) ?? false),
];

/**
 * 模糊匹配课件标识，返回命中列表（调用方自己判断 0 个 / 1 个 / 多个）
 *
 * @param id 目录名 / 英文名 / 章节号 / 唯一子串
 * @returns 命中的课件；按匹配优先级返回第一档非空结果
 */
export const resolveCourseId = (id: string): CourseInfo[] => {
  const all = listCourses();

  for (const tier of matchTiers) {
    const matches = all.filter((course) => tier(course, id));

    if (matches.length > 0) return matches;
  }

  return [];
};
