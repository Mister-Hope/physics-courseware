/**
 * `slides.md` 分页解析 —— **全仓唯一实现**。
 *
 * 为什么要有这个文件：`pnpm slide` / 主页页数统计 / e2e 分片均衡 / 风格体检都各自数过一遍 `slides.md` 的分页， 规则却各不相同（有的不跳过 ```
 * 围栏、有的假设"每页一定带 frontmatter 占两个 `---`"）， 于是同一份课件在不同脚本里页数对不上（见 `PROJECT_REVIEW.md` 问题 6）。
 *
 * 解析规则（与 Slidev 的写法对齐）：
 *
 * - 顶层 `---` 是分隔线：既可能是"frontmatter 的起止"，也可能是"裸分页符"；
 * - **``` 围栏内的 `---` 不是分隔线**（代码块里写 YAML / Markdown 示例很常见）；
 * - 两块之间如果上一块像 YAML frontmatter，就把它与下一块合成一页（该页 `start` 指向 frontmatter 首行）。
 */

/**
 * 课件的一页。
 *
 * 行号均为 1 起、闭区间，且与 `slides.md` 的行号一一对应（可直接拿去报错 / 定位）。
 */
export interface SlidePage {
  /** 1 起的页码（与 Slidev 一致） */
  pageNo: number;
  /** 第一个 `#` 标题（去掉 markdown 行内标记），没有则为 `(无标题)` */
  title: string;
  /** Frontmatter 里的 clicks，没有就取 v-click 里最大的序号，再没有就是 0 */
  clicks: number;
  /** 该页起始行号（含 frontmatter 首行） */
  start: number;
  /** 该页正文块的起始行号（跳过 frontmatter；没有 frontmatter 时等于 `start`） */
  bodyStart: number;
  /** 该页结束行号 */
  end: number;
  /** 该页完整行（含 frontmatter 与正文） */
  lines: string[];
  /** 仅该页正文行（不含 frontmatter，也不含分隔线） */
  bodyLines: string[];
}

/** `slides.md` 被顶层 `---` 切出来的一块（frontmatter 块 / 页体块） */
interface Chunk {
  lines: string[];
  /** 该块第一行在文件里的行号（1 起） */
  start: number;
}

/**
 * 去掉 markdown 行内标记，得到可读的纯文本（标题 / 检索摘要用）。
 *
 * @param text 一行 markdown
 * @returns 去掉 HTML 标签与 `*`、`_`、`$`、反引号后的文本
 */
export const stripInline = (text: string): string =>
  text
    .replaceAll(/<[^>]+>/gu, "")
    .replaceAll(/[`*_$]/gu, "")
    .trim();

/**
 * 判断一个 chunk 是不是（纯）YAML frontmatter。
 *
 * ⚠️ 必须要求**至少一条真正的映射项**（`key: value`）：只有标题、或只有 `- 列表项` 的正文块 也能被下面那几条"顺带"匹配上（`#` 在 YAML 里是注释、`-`
 * 是列表），但 frontmatter 不可能一个 key 都没有。 少了这条，裸 `---` 分页下"整页只有一个标题"的页面会被当成 frontmatter 吞进下一页（页数少算）。
 *
 * @param chunk 待判断的若干行
 * @returns 这些行是否全部是 YAML frontmatter 语法
 */
const looksLikeFrontmatter = (chunk: string[]): boolean => {
  const meaningful = chunk.filter((line) => line.trim() !== "");

  if (meaningful.length === 0) return false;

  if (!meaningful.some((line) => /^[A-Za-z_][\w-]*:/u.test(line))) return false;

  return meaningful.every(
    (line) =>
      /^[A-Za-z_][\w-]*:/u.test(line) || // key: value
      /^\s+\S/u.test(line) || // 续行
      /^\s*#/u.test(line) || // YAML 注释
      /^\s*-\s/u.test(line), // 列表项
  );
};

/**
 * 数一页里有几次点击：优先取 frontmatter 的 `clicks:`，否则取 `v-click="N"` 的最大序号。
 *
 * @param chunk 该页的所有行（含 frontmatter）
 * @returns 点击数（没有就是 0）
 */
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
 * 把 `slides.md` 切成"页"，并记住每页的行号范围。
 *
 * 代码块围栏（三个反引号）内的 `---` 会被跳过：代码块里的 YAML / Markdown 示例不能当分页符。
 *
 * @param markdown Slides.md 全文
 * @returns 按页序排列的页列表（空文件返回空数组，调用方需要"至少一页"语义时用 `countSlidePages`）
 */
export const parseSlides = (markdown: string): SlidePage[] => {
  const lines = markdown.split(/\r?\n/u);
  const chunks: Chunk[] = [];
  let current: string[] = [];
  let currentStart = 1;
  let inFence = false;

  const push = (): void => {
    chunks.push({ lines: current, start: currentStart });
  };

  for (const [index, line] of lines.entries()) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      current.push(line);
      continue;
    }

    if (!inFence && line.trim() === "---") {
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
      bodyStart: body.start,
      end: body.start + body.lines.length - 1,
      lines: used.flatMap((item) => item.lines),
      bodyLines: body.lines,
    });
  }

  return pages;
};

/**
 * 只数页数：与 `parseSlides` 同一套规则，最少算 1 页。
 *
 * @param markdown Slides.md 全文
 * @returns 页数
 */
export const countSlidePages = (markdown: string): number =>
  Math.max(1, parseSlides(markdown).length);
