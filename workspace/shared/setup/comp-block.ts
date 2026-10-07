/**
 * ` ```comp <组件名> ` 代码块 → Vue 组件标签。
 *
 * 为什么做这个：坐标组件的 props 是**嵌套数组/对象**，写在 HTML 属性里既长又难读，还容易踩两个坑 （属性里的 `"` 要转义、LaTeX 反斜杠要写成 `\\`）。改成代码块后：
 *
 * ```text
 * ```comp CoordAxes
 * x-range: [0, 6.4]
 * curves:
 *   - points: [[0, 5], [6, 15]]
 *     stroke: var(--c-accent)
 * ```
 *
 *     → `<CoordAxes v-bind="{ 'x-range': [0, 6.4], 'curves': [...] }" />`
 *
 *     支持的是 **YAML 的一个子集**（够写 props 用）：缩进映射、`- ` 列表、行内 `[...]` / `{...}`、
 *     单/双引号字符串、裸字符串、数字、`true/false/null`、`#` 注释；**不支持**锚点、多行标量、`|`/`>` 折叠。
 *     JSON 也是这个子集的一部分，所以直接贴 JSON 也能用。
 */

/** 解析出来的值 */
export type BlockValue =
  | string
  | number
  | boolean
  | null
  | BlockValue[]
  | { [key: string]: BlockValue };

/** 代码块解析结果 */
export interface BlockSpec {
  /** 组件名（`comp` 后面的第一个词） */
  component: string;
  /** 除 `click` / `class` 之外的键，原样作为 props */
  props: Record<string, BlockValue>;
  /** 外层包一层 `<div v-click="N">` */
  click?: number;
  /** 外层 `<div>` 的 class（写 `vt-host` 这类图容器用） */
  wrapperClass?: string;
}

interface Line {
  indent: number;
  content: string;
}

interface BlockCursor {
  lines: Line[];
  index: number;
}

// ── 词法：按行切开、去掉注释、量缩进 ──

// 行尾注释：只在引号外、且 `#` 前是空白时才算（`var(--c-accent)` 里的 `#` 不受影响）
const stripComment = (text: string): string => {
  let quote = "";

  for (let index = 0; index < text.length; index += 1) {
    const char = text.slice(index, index + 1);

    if (quote !== "") {
      if (char === quote) quote = "";
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === "#" && (index === 0 || /\s/u.test(text.charAt(index - 1))))
      return text.slice(0, index);
  }

  return text;
};

const END: Line = { indent: -1, content: "" };

const tokenize = (source: string): Line[] =>
  source
    .split("\n")
    .map((raw) => ({
      indent: (/^\s*/u.exec(raw)?.[0] ?? "").length,
      content: stripComment(raw).trim(),
    }))
    .filter((line) => line.content !== "");

// ── 行内值：`[...]`、`{...}`、标量 ──

// 按顶层分隔符切开（引号内、括号内不切）
const splitTopLevel = (text: string, separator: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let quote = "";
  let current = "";

  for (const char of text) {
    if (quote !== "") {
      current += char;
      if (char === quote) quote = "";
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }

    if (char === "[" || char === "(" || char === "{") depth += 1;
    if (char === "]" || char === ")" || char === "}") depth -= 1;

    if (char === separator && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim() !== "") parts.push(current);

  return parts;
};

// 顶层 `:` 的位置（`{a: 1}` 里引号/括号内的冒号不算）
const findKeySeparator = (text: string): number => {
  let depth = 0;
  let quote = "";

  for (let index = 0; index < text.length; index += 1) {
    const char = text.slice(index, index + 1);

    if (quote !== "") {
      if (char === quote) quote = "";
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === "[" || char === "{") depth += 1;
    if (char === "]" || char === "}") depth -= 1;
    if (char === ":" && depth === 0) return index;
  }

  return -1;
};

const unquote = (text: string): string => {
  const trimmed = text.trim();

  if (trimmed.length > 1 && trimmed.startsWith("'") && trimmed.endsWith("'"))
    return trimmed.slice(1, -1).replaceAll("''", "'");
  if (trimmed.length > 1 && trimmed.startsWith('"') && trimmed.endsWith('"'))
    return trimmed.slice(1, -1).replaceAll(String.raw`\"`, '"');

  return trimmed;
};

const parseValue = (text: string): BlockValue => {
  const value = text.trim();

  if (value === "") return null;

  if (value.startsWith("[")) {
    return splitTopLevel(value.slice(1, value.lastIndexOf("]")), ",").map((part) =>
      parseValue(part),
    );
  }

  if (value.startsWith("{")) {
    const result: Record<string, BlockValue> = {};

    for (const part of splitTopLevel(value.slice(1, value.lastIndexOf("}")), ",")) {
      const separator = findKeySeparator(part);

      if (separator >= 0)
        result[unquote(part.slice(0, separator))] = parseValue(part.slice(separator + 1));
    }

    return result;
  }

  if (/^(?:true|false)$/iu.test(value)) return value.toLowerCase() === "true";
  if (/^(?:null|~)$/iu.test(value)) return null;
  if (/^-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?$/u.test(value)) return Number(value);

  return unquote(value);
};

// ── 块结构：缩进映射 / `- ` 列表 ──

// 行尾哨兵：`tokenize` 已经滤掉空行，所以 `content === ""` 可以当"没有下一行"用，
// 这样全程不出现 null / undefined 字面量（本仓库的 lint 风格）
const lineAt = (cursor: BlockCursor): Line => cursor.lines[cursor.index] ?? END;

// `key: value`：值在本行 → 直接用；值在下面 → 用 `nested` 回调递归解析更深的块
// （递归回调由 `parseBlock` 传进来，这样"互相调用"不会踩 no-use-before-define）
const parseEntry = (
  cursor: BlockCursor,
  content: string,
  nested: (index: number, indent: number) => [BlockValue, number],
): [string, BlockValue] => {
  const separator = findKeySeparator(content);
  const key = unquote(separator < 0 ? content : content.slice(0, separator));
  const inline = separator < 0 ? "" : content.slice(separator + 1).trim();

  if (inline !== "") return [key, parseValue(inline)];
  const next = lineAt(cursor);
  const indent = cursor.lines[cursor.index - 1]?.indent ?? 0;

  if (next.indent > indent) {
    const [value, after] = nested(cursor.index, next.indent);

    cursor.index = after;

    return [key, value];
  }

  return [key, null];
};

const parseBlock = (lines: Line[], start: number, indent: number): [BlockValue, number] => {
  const cursor: BlockCursor = { lines, index: start };
  const nested = (index: number, depth: number): [BlockValue, number] =>
    parseBlock(lines, index, depth);
  const isList = (lines[start]?.content ?? "").startsWith("- ");
  const map: Record<string, BlockValue> = {};
  const list: BlockValue[] = [];

  while (cursor.index < lines.length) {
    const line = lineAt(cursor);

    if (line.content === "" || line.indent !== indent) break;
    cursor.index += 1;

    if (!isList) {
      if (line.content.startsWith("- ")) break;
      const [key, value] = parseEntry(cursor, line.content, nested);

      map[key] = value;
      continue;
    }

    if (!line.content.startsWith("- ")) break;
    const rest = line.content.slice(2).trim();

    // `- 标量`
    if (findKeySeparator(rest) < 0) {
      list.push(parseValue(rest));
      continue;
    }

    // `- key: value`：本项是映射，同一项的后续键缩进更深
    const item: Record<string, BlockValue> = {};
    const [key, value] = parseEntry(cursor, rest, nested);

    item[key] = value;

    while (cursor.index < lines.length) {
      const extra = lineAt(cursor);

      if (extra.content === "" || extra.indent <= indent || extra.content.startsWith("- ")) break;
      cursor.index += 1;
      const [extraKey, extraValue] = parseEntry(cursor, extra.content, nested);

      item[extraKey] = extraValue;
    }

    list.push(item);
  }

  return [isList ? list : map, cursor.index];
};

// ── 值 → JS 源码 ──

// 字符串写成 `t => 表达式` 时当作箭头函数原样输出（函数曲线用）
// 反斜杠与单引号（用 fromCharCode 写，免得源码里堆一串转义）
const BACKSLASH = String.fromCodePoint(92);
const QUOTE = String.fromCodePoint(39);

// JS 单引号字符串字面量里的转义（反斜杠、单引号）
const escapeJs = (text: string): string =>
  text.replaceAll(BACKSLASH, BACKSLASH + BACKSLASH).replaceAll(QUOTE, BACKSLASH + QUOTE);

const ARROW = /^\s*(?:\([\w\s,$]*\)|[\w$]+)\s*=>/u;

const toJs = (value: BlockValue): string => {
  if (typeof value === "string") {
    if (ARROW.test(value)) return `(${value})`;

    return `'${escapeJs(value)}'`;
  }

  if (typeof value === "number" || typeof value === "boolean") return String(value);
  // oxlint-disable-next-line eqeqeq
  if (value === null) return "null";
  if (Array.isArray(value)) return `[${value.map((item) => toJs(item)).join(", ")}]`;

  const entries = Object.entries(value).map(
    ([key, item]) => `${/^[A-Za-z_$][\w$]*$/u.test(key) ? key : `'${key}'`}: ${toJs(item)}`,
  );

  return `{ ${entries.join(", ")} }`;
};

// 把代码块内容解析成组件规格；`info` 不是 `comp` 开头时返回 null
export const parseCompBlock = (info: string, code: string): BlockSpec | null => {
  const [tag, component] = info.trim().split(/\s+/u);

  if (tag !== "comp" || !component) return null;
  const lines = tokenize(code);
  const first = lines[0] ?? END;

  if (first.content === "") return { component, props: {} };

  const [value] = parseBlock(lines, 0, first.indent);

  if (typeof value !== "object" || Array.isArray(value))
    throw new Error(`[comp ${component}] 代码块顶层必须是"键: 值"的映射`);

  const { click, class: wrapperClass, ...props } = value as Record<string, BlockValue>;

  return {
    component,
    props,
    ...(typeof click === "number" ? { click } : {}),
    ...(typeof wrapperClass === "string" ? { wrapperClass } : {}),
  };
};

// 组件规格 → 单行 HTML（Slidev 会把它当 Vue 模板编译）
export const renderCompBlock = (spec: BlockSpec): string => {
  const tag = Object.keys(spec.props).length
    ? `<${spec.component} v-bind="${toJs(spec.props)}" />`
    : `<${spec.component} />`;
  const wrapperClass = spec.wrapperClass ?? "";
  const click = spec.click ?? -1;

  if (wrapperClass === "" && click < 0) return tag;
  const attributes = [
    wrapperClass === "" ? "" : ` class="${wrapperClass}"`,
    click < 0 ? "" : ` v-click="${click}"`,
  ].join("");

  return `<div${attributes}>${tag}</div>`;
};
