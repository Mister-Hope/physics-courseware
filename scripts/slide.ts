import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { listCourses, resolveCourseId } from "./course-lookup";

/**
 * `pnpm slide` —— 快速定位/读取课件某一页（给 AI agent 省 token 的小工具）
 *
 * ```bash
 * pnpm slide                       → 列出所有课件及其页数
 * pnpm slide 1.x-vectors           → 列出该课件每一页：页号 / 标题 / 行号 / 点击数
 * pnpm slide 1.x-vectors 15        → 打印第 15 页源码（带行号，可直接照着改）
 * pnpm slide 1.x-vectors 15-17 19  → 区间 + 多页
 * pnpm slide 1.x-vectors --grep 正交分解 → 找哪一页哪一行出现了这个词
 * pnpm slide 1.x-vectors 15 --raw  → 不带行号输出（方便整段复制）
 * ```
 *
 * <课件> 支持模糊匹配：完整目录名 / 英文名 / 章节号（如 1.3）/ 唯一子串。 为什么需要它：`slides.md` 动辄上千行，动一页就 read 整个文件非常浪费 token； 先
 * `pnpm slide <课件> --grep`/列表定位，再 `pnpm slide <课件> <页号>` 只看那一页即可。
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");

interface SlidePage {
  /** 1 起的页码（与 Slidev 一致） */
  pageNo: number;
  /** 第一个 `#` 标题（去掉 markdown 行内标记） */
  title: string;
  /** Frontmatter 里的 clicks，没有就取 v-click 里最大的序号，再没有就是 0 */
  clicks: number;
  /** 起始行号（1 起，含） */
  start: number;
  /** 结束行号（1 起，含） */
  end: number;
  lines: string[];
}

/** `slides.md` 被 `---` 切出来的一块（frontmatter 块 / 页体块） */
interface Chunk {
  lines: string[];
  /** 该块第一行在文件里的行号（1 起） */
  start: number;
}

const stripInline = (text: string): string =>
  text
    .replaceAll(/<[^>]+>/gu, "")
    .replaceAll(/[`*_$]/gu, "")
    .trim();

/**
 * 判断一个 chunk 是不是（纯）YAML frontmatter
 *
 * @param chunk 待判断的若干行
 * @returns 这些行是否全部是 YAML frontmatter 语法
 */
const looksLikeFrontmatter = (chunk: string[]): boolean => {
  const meaningful = chunk.filter((line) => line.trim() !== "");

  if (meaningful.length === 0) return false;

  return meaningful.every(
    (line) =>
      /^[A-Za-z_][\w-]*:/u.test(line) || // key: value
      /^\s+\S/u.test(line) || // 续行
      /^\s*#/u.test(line) || // YAML 注释
      /^\s*-\s/u.test(line), // 列表项
  );
};

const countClicks = (chunk: string[]): number => {
  const front = /^clicks:\s*(?<clicks>\d+)/mu.exec(chunk.join("\n"));
  const frontClicks = front?.groups?.clicks;

  if (frontClicks) return Number(frontClicks);

  let max = 0;

  for (const line of chunk) {
    for (const match of line.matchAll(/v-click="(?<click>\d+)"/gu))
      max = Math.max(max, Number(match.groups?.click));
  }

  return max;
};

/**
 * 把 slides.md 切成"页"，并记住每页的行号范围
 *
 * @param markdown Slides.md 全文
 * @returns 按页序排列的页列表
 */
const parseSlides = (markdown: string): SlidePage[] => {
  const lines = markdown.split(/\r?\n/u);
  const chunks: Chunk[] = [];
  let current: string[] = [];
  let currentStart = 1;

  const push = (): void => {
    chunks.push({ lines: current, start: currentStart });
  };

  for (const [index, line] of lines.entries()) {
    if (line.trim() === "---") {
      push();
      current = [];
      currentStart = index + 2;
      continue;
    }

    current.push(line);
  }

  push();

  const pages: SlidePage[] = [];
  let index = 0;

  // 文件以 `---` 开头时，第一块是空的
  if (chunks[0].lines.every((line) => line.trim() === "")) index = 1;

  while (index < chunks.length) {
    const chunk = chunks[index];
    const isFront = looksLikeFrontmatter(chunk.lines);
    const hasNext = index + 1 < chunks.length;
    const used: Chunk[] = isFront && hasNext ? [chunk, chunks[index + 1]] : [chunk];
    const [first] = used;
    const body = used[used.length - 1];

    index += used.length;

    if (body.lines.every((line) => line.trim() === "")) continue;

    const heading = body.lines.find((line) => /^#{1,2}\s+\S/u.test(line));
    const title = heading ? stripInline(heading.replace(/^#{1,2}\s+/u, "")) : "(无标题)";

    pages.push({
      pageNo: pages.length + 1,
      title,
      clicks: countClicks(used.flatMap((item) => item.lines)),
      start: first.start,
      end: body.start + body.lines.length - 1,
      lines: used.flatMap((item) => item.lines),
    });
  }

  return pages;
};

const readSlides = (slug: string): { file: string; pages: SlidePage[] } | null => {
  const file = path.join(COURSES_DIR, slug, "slides.md");

  if (!existsSync(file)) return null;

  return { file, pages: parseSlides(readFileSync(file, "utf-8")) };
};

/**
 * 把 "15-17" / "19" 解析成页号数组
 *
 * @param args 命令行里给出的页号写法
 * @returns 解析出的页号列表
 */
const parsePages = (args: string[]): number[] => {
  const result: number[] = [];

  for (const arg of args) {
    const range = /^(?<startNo>\d+)-(?<endNo>\d+)$/u.exec(arg);

    if (range?.groups) {
      const { endNo, startNo } = range.groups;

      for (let pageNo = Number(startNo); pageNo <= Number(endNo); pageNo += 1) result.push(pageNo);
      continue;
    }

    if (/^\d+$/u.test(arg)) result.push(Number(arg));
  }

  return result;
};

const printUsage = (): void => {
  console.log(`用法：
  pnpm slide <课件> [页号...] [--raw]      打印指定页（带行号）
  pnpm slide <课件> --grep <关键词>        找哪一页哪一行出现该词
  pnpm slide <课件>                        列出所有页
  pnpm slide                               列出所有课件

课件：${listCourses()
    .map((course) => course.slug)
    .join(", ")}`);
};

/** 列出所有课件及各自的页数 */
const printCourseList = (): void => {
  console.log("📚 现有课件：");

  for (const course of listCourses()) {
    const slides = readSlides(course.slug);
    const label = course.title ? `${course.chapter ?? ""} ${course.title}` : "（未登记）";

    console.log(
      `  ${course.slug.padEnd(36)} ${String(slides?.pages.length ?? 0).padStart(2)} 页  ${label}`,
    );
  }

  console.log("\n用 `pnpm slide <课件>` 看某一课的页目，`pnpm slide <课件> <页号>` 看页面源码。");
};

/**
 * 找关键词出现在哪一页哪一行
 *
 * @param relative Slides.md 相对仓库根的路径
 * @param slug 课件名
 * @param pages 该课的页列表
 * @param keyword 要查找的关键词
 */
const printGrep = (relative: string, slug: string, pages: SlidePage[], keyword: string): void => {
  let hits = 0;

  for (const page of pages) {
    for (const [offset, line] of page.lines.entries()) {
      if (!line.includes(keyword)) continue;

      hits += 1;
      const lineNo = page.start + offset;

      console.log(
        `${relative}:${lineNo}  第 ${String(page.pageNo).padStart(2)} 页「${page.title}」  ${stripInline(line).slice(0, 80)}`,
      );
    }
  }

  console.log(
    hits === 0
      ? `✗ 没有找到「${keyword}」`
      : `\n共 ${hits} 处命中。用 \`pnpm slide ${slug} <页号>\` 看整页。`,
  );
};

/**
 * 列出某课的页目：页号 / 标题 / 行号 / 点击数
 *
 * @param relative Slides.md 相对仓库根的路径
 * @param slug 课件名
 * @param pages 该课的页列表
 */
const printOutline = (relative: string, slug: string, pages: SlidePage[]): void => {
  console.log(`${relative} · 共 ${pages.length} 页\n`);
  console.log("| 页 | 标题 | 行号 | 点击数 |");
  console.log("| --- | --- | --- | --- |");

  for (const page of pages) {
    console.log(
      `| ${page.pageNo} | ${page.title} | L${page.start}–L${page.end} | ${page.clicks || "—"} |`,
    );
  }

  console.log(`\n看某一页：pnpm slide ${slug} <页号>（可写 15-17 或 15 19）`);
};

/**
 * 打印指定页源码
 *
 * @param relative Slides.md 相对仓库根的路径
 * @param pages 该课的页列表
 * @param pageNumbers 要打印的页号
 * @param wantsRaw 是否输出不带行号的原文
 */
const printPages = (
  relative: string,
  pages: SlidePage[],
  pageNumbers: number[],
  wantsRaw: boolean,
): void => {
  for (const pageNo of pageNumbers) {
    const page = pages.find((item) => item.pageNo === pageNo);

    if (!page) {
      console.error(`✗ 第 ${pageNo} 页不存在（该课件共 ${pages.length} 页）`);
      process.exitCode = 1;
      continue;
    }

    const lineTag = `L${page.start}–L${page.end}（${page.lines.length} 行）`;
    console.log(
      `\n=== ${relative} · 第 ${page.pageNo} 页 · ${lineTag} · 点击数 ${page.clicks} ===`,
    );
    console.log(`标题：${page.title}\n`);

    if (wantsRaw) {
      console.log(page.lines.join("\n"));
      continue;
    }

    const width = String(page.end).length;

    for (const [offset, line] of page.lines.entries())
      console.log(`${String(page.start + offset).padStart(width)}| ${line}`);
  }
};

/**
 * 处理 `--grep` 分支
 *
 * @param relative Slides.md 相对仓库根的路径
 * @param slug 课件名
 * @param pages 该课的页列表
 * @param rest 去掉课件标识之后的命令行参数
 * @returns 是否已按 --grep 处理（true 时调用方直接返回）
 */
const runGrep = (relative: string, slug: string, pages: SlidePage[], rest: string[]): boolean => {
  const grepIndex = rest.indexOf("--grep");

  if (grepIndex === -1) return false;

  const keyword = rest[grepIndex + 1];

  if (!keyword) {
    console.error("✗ --grep 后面要跟关键词");
    process.exitCode = 1;
    return true;
  }

  printGrep(relative, slug, pages, keyword);

  return true;
};

/**
 * 处理 `pnpm slide <课件> ...` 这一支
 *
 * @param rawArgs 去掉 node / 脚本名之后的命令行参数
 */
const runForCourse = (rawArgs: string[]): void => {
  const [id = ""] = rawArgs;
  const rest = rawArgs.slice(1);
  const matches = resolveCourseId(id);

  if (matches.length !== 1) {
    if (matches.length === 0) {
      console.error(`✗ 找不到课件「${id}」`);
    } else {
      console.error(
        `✗ 「${id}」匹配到多个课件，请写更具体的标识：${matches.map((course) => course.slug).join("、")}`,
      );
    }

    printUsage();
    process.exitCode = 1;
    return;
  }

  const [{ slug }] = matches;
  const slides = readSlides(slug);

  if (!slides) {
    console.error(`✗ 找不到课件：courses/${slug}/slides.md`);
    process.exitCode = 1;
    return;
  }

  const { file, pages } = slides;
  const relative = path.relative(ROOT, file);

  /* ── --grep：定位关键词 ── */
  if (runGrep(relative, slug, pages, rest)) return;

  const pageNumbers = parsePages(rest);

  /* ── 无页号：列页目 ── */
  if (pageNumbers.length === 0) {
    printOutline(relative, slug, pages);
    return;
  }

  /* ── 打印指定页 ── */
  printPages(relative, pages, pageNumbers, rest.includes("--raw"));
};

const main = (): void => {
  const rawArgs = process.argv.slice(2);

  if (rawArgs.length === 0) printCourseList();
  else runForCourse(rawArgs);
};

main();
