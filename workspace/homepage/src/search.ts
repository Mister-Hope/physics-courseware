/**
 * 主页课件搜索：标题 / 标签的模糊匹配、相关度打分与高亮区间。
 *
 * 面向中文标题 + 少量英文缩写（`v-t 图像`、`U-I 图像`），不引第三方库：
 *
 * - 逐字符做 NFKC 归一 + 小写，全角字母数字自动压成半角；
 * - 「紧凑化」时跳过空白与 `-` `·` 等分隔符，让 `vt图像` 也能命中 `v-t 图像`， 同时记录「紧凑下标 → 原文字符下标」，供高亮回填；
 * - 先试连续子串（分数最高），再试子序列（按顺序出现、允许跳字）， 标题命中权重高于标签命中；
 * - 多个关键词用空白分隔，必须全部命中（AND）。
 */

import type { CourseMeta, TextbookGroup } from "./courses.config";

/** 原文里的高亮区间：`[start, end)`，单位是「原文字符（码点）下标」 */
export type MatchRange = [start: number, end: number];

/** 一门课的搜索命中结果 */
export interface SearchHit {
  course: CourseMeta;
  group: TextbookGroup;
  /** 相关度（越大越靠前） */
  score: number;
  /** 标题里的高亮区间 */
  titleRanges: MatchRange[];
  /** 标签名 → 该标签里的高亮区间（只收命中的标签） */
  tagRanges: Map<string, MatchRange[]>;
}

/** 一次搜索的结果 */
export interface SearchResult {
  /** 已按相关度排序（同分保持 `courses.json` 里的原始顺序） */
  hits: SearchHit[];
  /** 拆分后的关键词（已归一成紧凑形式） */
  terms: string[];
}

/** 匹配时忽略的分隔符：空白与常见连接符 */
const SEPARATOR_RE = /[\s\-·—–_/]+/u;

/**
 * 按 Unicode 码点拆字（中文搜索需要逐字处理）。
 *
 * `Array.from` 才是按码点迭代的写法；换成 spread 会被 `no-misused-spread` 拦（拆 emoji 有风险）， 这里两者都需要，因此固定用
 * `Array.from` 并只在本行关掉 `prefer-spread`。
 *
 * @param text 原始文本
 * @returns 码点数组
 */
// oxlint-disable-next-line unicorn/prefer-spread
const toChars = (text: string): string[] => Array.from(text);

/** 逐字符归一化后的文本：紧凑串 + 每个紧凑字符对应的原文字符下标 */
interface CompactText {
  text: string;
  map: number[];
}

/** 单个关键词对一段文本的匹配结果（区间是紧凑下标） */
interface TextMatch {
  score: number;
  ranges: MatchRange[];
}

/**
 * 把文本压成「归一 + 去分隔符」的紧凑串，并记录回原串的下标映射。
 *
 * @param text 原始文本
 * @returns 紧凑串与映射（`map[i]` 是紧凑串第 `i` 个字符对应的原文字符下标）
 */
const compact = (text: string): CompactText => {
  const chars = toChars(text);
  let folded = "";
  const map: number[] = [];

  for (const [index, char] of chars.entries()) {
    const normalized = char.normalize("NFKC").toLowerCase();

    for (const piece of normalized) {
      if (SEPARATOR_RE.test(piece)) continue;

      folded += piece;
      map.push(index);
    }
  }

  return { text: folded, map };
};

/**
 * 把零散的区间排序、合并，得到干净的高亮段。
 *
 * @param ranges 原文区间（顺序随意）
 * @returns 升序、互不重叠的区间
 */
const mergeRanges = (ranges: MatchRange[]): MatchRange[] => {
  const sorted = ranges
    .map(([start, end]) => [start, end] as MatchRange)
    .sort((a, b) => a[0] - b[0]);
  const merged: MatchRange[] = [];

  for (const range of sorted) {
    const previous = merged[merged.length - 1];

    if (previous != null && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
    else merged.push([range[0], range[1]]);
  }

  return merged;
};

/**
 * 把紧凑下标区间映射回原文字符下标区间。
 *
 * @param ranges 紧凑下标区间
 * @param map 紧凑下标 → 原文字符下标
 * @returns 合并后的原文区间
 */
const toTextRanges = (ranges: MatchRange[], map: number[]): MatchRange[] =>
  mergeRanges(
    ranges.flatMap(([start, end]) => {
      const from = map[start];
      const last = map[end - 1];

      return from == null || last == null ? [] : [[from, last + 1] as MatchRange];
    }),
  );

/**
 * 单个关键词对紧凑文本的匹配。
 *
 * @param term 归一后的关键词（紧凑形式）
 * @param target 归一后的文本（紧凑形式）
 * @returns 分数与命中区间；不匹配返回 `null`
 */
const matchCompact = (term: string, target: CompactText): TextMatch | null => {
  if (term === "") return null;

  // ① 连续子串：最可信 —— 命中越靠前、关键词占比越高，分数越高
  const ranges: MatchRange[] = [];
  let firstAt = -1;
  let index = target.text.indexOf(term);

  while (index !== -1) {
    if (firstAt === -1) firstAt = index;
    ranges.push([index, index + term.length]);
    index = target.text.indexOf(term, index + term.length);
  }

  if (ranges.length > 0) {
    const coverage = term.length / Math.max(target.text.length, 1);
    const startBonus = firstAt === 0 ? 40 : Math.max(0, 24 - firstAt);

    return { score: 100 + startBonus + Math.round(coverage * 30), ranges };
  }

  // ② 子序列：字按顺序出现即可（允许跳字），跳得越散分越低
  const positions: number[] = [];
  let cursor = 0;

  for (const char of term) {
    const found = target.text.indexOf(char, cursor);
    if (found === -1) return null;

    positions.push(found);
    cursor = found + 1;
  }

  const span = (positions[positions.length - 1] ?? 0) - (positions[0] ?? 0) + 1;
  const coverage = term.length / Math.max(target.text.length, 1);
  const score = Math.max(20, 70 + Math.round(coverage * 20) - (span - term.length) * 6);

  return { score, ranges: positions.map((position) => [position, position + 1] as MatchRange) };
};

/** 一个关键词在某个标签里的命中（已换算成原文区间） */
interface TagMatch {
  tag: string;
  score: number;
  ranges: MatchRange[];
}

/**
 * 在一门课的全部标签里找这个关键词最好的一次命中。
 *
 * @param term 归一后的关键词
 * @param tags 标签及其紧凑文本
 * @returns 最好的那次命中；都不命中返回 `null`
 */
const findBestTagMatch = (
  term: string,
  tags: { tag: string; text: CompactText }[],
): TagMatch | null => {
  let best: TagMatch | null = null;

  for (const { tag, text } of tags) {
    const match = matchCompact(term, text);

    if (match == null) continue;

    if (best == null || match.score > best.score)
      best = { tag, score: match.score, ranges: toTextRanges(match.ranges, text.map) };
  }

  return best;
};

/**
 * 计算一门课对全部关键词的命中情况（每个关键词取标题 / 标签里最好的那次匹配）。
 *
 * @param course 课件元数据
 * @param terms 归一后的关键词列表
 * @returns 命中结果；任一关键词都没命中则返回 `null`
 */
const scoreCourse = (
  course: CourseMeta,
  terms: string[],
): Pick<SearchHit, "score" | "titleRanges" | "tagRanges"> | null => {
  const title = compact(course.title);
  const tags = course.tags.map((tag) => ({ tag, text: compact(tag) }));

  let score = 0;
  const titleRanges: MatchRange[] = [];
  const tagRanges = new Map<string, MatchRange[]>();

  for (const term of terms) {
    const titleMatch = matchCompact(term, title);
    const tagMatch = findBestTagMatch(term, tags);

    if (titleMatch) {
      // 标题命中比标签命中更值钱；同一关键词只计一次最高分
      score += 1000 + titleMatch.score * 2;
      titleRanges.push(...toTextRanges(titleMatch.ranges, title.map));
    } else if (tagMatch) {
      const { tag, score: tagScore, ranges } = tagMatch;

      score += 500 + tagScore;
      // 多个关键词可能命中同一个标签：区间要合并，不能互相覆盖
      tagRanges.set(tag, mergeRanges([...(tagRanges.get(tag) ?? []), ...ranges]));
    } else {
      return null;
    }
  }

  return { score, titleRanges: mergeRanges(titleRanges), tagRanges };
};

/**
 * 搜索课件：标题 / 标签模糊匹配，按相关度排序。
 *
 * @param query 输入框原文
 * @param groups 全部教材分册（`courses.json`）
 * @returns 搜索词为空时返回 `null`（表示「未搜索」），否则返回搜索结果
 */
export const searchCourses = (query: string, groups: TextbookGroup[]): SearchResult | null => {
  const terms = query
    .normalize("NFKC")
    .toLowerCase()
    .split(/\s+/u)
    .map((term) => compact(term).text)
    .filter(Boolean);

  if (terms.length === 0) return null;

  const hits: SearchHit[] = [];

  for (const group of groups) {
    for (const course of group.courses) {
      const scored = scoreCourse(course, terms);

      if (scored) hits.push({ course, group, ...scored });
    }
  }

  // 同分保持 courses.json 的原始顺序（sort 稳定，无需另记序号）
  hits.sort((a, b) => b.score - a.score);

  return { hits, terms };
};

/**
 * HTML 转义（课件数据可信，但搜索结果要拼进 innerHTML，统一转义避免手滑）。
 *
 * @param text 原始文本
 * @returns 可安全插入 innerHTML 的文本
 */
export const escapeHtml = (text: string): string =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

/**
 * 按命中区间给文本加 `<mark>` 高亮（先转义、再包标签）。
 *
 * @param text 原始文本
 * @param ranges 原文区间（顺序随意）
 * @returns 可安全插入 innerHTML 的字符串
 */
export const highlight = (text: string, ranges: MatchRange[]): string => {
  const chars = toChars(text);
  const merged = mergeRanges(ranges);

  let html = "";
  let cursor = 0;

  for (const [start, end] of merged) {
    const from = Math.max(start, cursor);
    const to = Math.min(end, chars.length);

    if (to <= from) continue;

    html += chars
      .slice(cursor, from)
      .map((char) => escapeHtml(char))
      .join("");
    html += `<mark>${chars
      .slice(from, to)
      .map((char) => escapeHtml(char))
      .join("")}</mark>`;
    cursor = to;
  }

  return (
    html +
    chars
      .slice(cursor)
      .map((char) => escapeHtml(char))
      .join("")
  );
};
