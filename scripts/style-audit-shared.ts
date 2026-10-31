/**
 * 课件风格体检的**共享基础件**：仓库路径 / 阈值 / 词表（UnoCSS 工具类前缀、允许在 `:root` 覆盖的变量、受保护共享选择器）/ 全部正则 /
 * 去注释与读文件的小工具。检查项、编排与报告在 `./style-audit.ts`。
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..");
export const COURSES_DIR = path.join(ROOT, "courses");
/** Style-guide §4：一份课件卡片总数上限 */
export const CARD_BUDGET = 15;

/** 共享样式正本目录（common / layout / atoms 三个文件里的类 = 全部合法共享原子） */
export const SHARED_STYLES_DIR = path.join(ROOT, "workspace", "shared", "styles");

// 读文件（不存在算空串）。声明放在最前：模块顶层的初始化就可能用到它，
// 若挪到下面、又有人改成 `const` 之前的顶层调用，会掉进暂时性死区（TDZ）。
export const read = (file: string): string => (existsSync(file) ? readFileSync(file, "utf8") : "");

/**
 * 共享原子全集 —— **从正本 CSS 现读**，不手工维护。
 *
 * 正本：`workspace/shared/styles/{common,layout,atoms}.css`。以前这里是手工抄的一份清单， 结果 `atoms.css` 新增
 * `.data-table`/`.split-wide`/`.ok`/`.step-list` 等 12 个原子后清单没跟上，
 * 子代理一用就被误报成"裸类名"、被迫绕开正本写私有值（真踩过）。现在直接扫 CSS 顶层选择器。
 *
 * @returns 三个正本样式文件里定义的共享原子类名
 */
export const sharedAtomClasses = (): Set<string> => {
  const atoms = new Set<string>();
  // 顶层选择器：行首 `.name`（`.a,` / `.a {` / `.a:hover {` 都算），复合选择器里的不算
  const TOP_LEVEL = /^\.(?<name>[a-z][a-z0-9-]*)\s*(?:[,{]|$)/mu;

  for (const file of ["common.css", "layout.css", "atoms.css"]) {
    for (const line of readFileSync(path.join(SHARED_STYLES_DIR, file), "utf8").split("\n")) {
      const name = TOP_LEVEL.exec(line)?.groups?.name;

      if (name) atoms.add(name);
    }
  }

  return atoms;
};

export const SHARED_ATOMS = sharedAtomClasses();

/** UnoCSS 工具类前缀（它们不是"自造原子"，排除掉） */
export const UTILITY_PREFIXES = new Set([
  "m",
  "p",
  "mt",
  "mb",
  "ml",
  "mr",
  "mx",
  "my",
  "pt",
  "pb",
  "pl",
  "pr",
  "px",
  "py",
  "gap",
  "gap-x",
  "gap-y",
  "space",
  "grid",
  "col",
  "row",
  "flex",
  "basis",
  "order",
  "text",
  "font",
  "leading",
  "tracking",
  "whitespace",
  "break",
  "uppercase",
  "italic",
  "w",
  "h",
  "min-w",
  "max-w",
  "min-h",
  "max-h",
  "size",
  "bg",
  "border",
  "rounded",
  "shadow",
  "opacity",
  "outline",
  "ring",
  "divide",
  "items",
  "justify",
  "place",
  "self",
  "content",
  "z",
  "top",
  "left",
  "right",
  "bottom",
  "inset",
  "absolute",
  "relative",
  "fixed",
  "sticky",
  "overflow",
  "pointer",
  "select",
  "cursor",
  "hidden",
  "block",
  "inline",
  "contents",
  "transition",
  "duration",
  "ease",
  "delay",
  "transform",
  "translate",
  "scale",
  "rotate",
  "sr",
  "not-sr",
  "visually",
]);

/**
 * 只有这些变量允许在本课 `:root` 里覆盖（layout.css / atoms.css 声明的唯一出口）。
 *
 * ⛔ **`--hint-pad-y` / `--hint-pad-x` / `--hint-icon-size` 不在此列**：提示气泡的图标是 `::before` 绝对定位， `top` 由
 * `calc(var(--hint-pad-y) + …)` 算出——在 `:root` 全局改这两个内边距，文字跟着内边距走、图标按另一套基准算， 两者会立刻错位（8.4 的 P3/P4
 * 踩过）。要压某一页的气泡，只在该页容器上写行内 `style="--hint-pad-y: …"`， 不要拿 `:root` 当全局旋钮（AGENTS.md「八」有同一条）。
 */
export const ALLOWED_ROOT_OVERRIDES = new Set([
  "--page-gap",
  "--stack-gap",
  /* 定义气泡的内边距：不参与图标定位，按页按课自己定没问题 */
  "--def-pad-y",
  "--def-pad-x",
]);

/** 共享选择器：本课 style.css 不得重写（style-guide §8）。标签给人看，正则给机器用 */
export const PROTECTED_SELECTORS: [label: string, pattern: RegExp][] = [
  [
    ".slidev-layout（页面外壳）",
    /^\.slidev-layout(?:\.(?:base-flex|exercise-split|focus-question|course-cover))?\s*[,{]/mu,
  ],
  ["h1（页面大标题）", /^h1\s*\{/mu],
  ["table / th / td（共享表格）", /^(?<tag>table|th|td)\s*\{/mu],
  [".mini-title（小节标题）", /^\.mini-title\s*[,{]/mu],
  [".ask（提问）", /^\.ask\s*[,{]/mu],
  [".problem（习题题干）", /^\.problem\s*[,{]/mu],
  [".key（结论竖线）", /^\.key\s*[,{]/mu],
];

export const CLASS_ATTR = /(?<![:\w-])class="(?<classes>[^"]*)"/gu;
export const CLASS_DEF = /^\s*\.(?<name>[a-zA-Z][\w-]*)/mu;
/** 与 `CLASS_DEF` 同源，但带 `g`（`matchAll` 要求）——全仓多处复用，避免每次 new RegExp */
export const CLASS_DEF_GLOBAL = new RegExp(CLASS_DEF.source, "gmu");
export const STYLE_BLOCK = /<style[^>]*>(?<block>[\s\S]*?)<\/style>/gu;
export const ICON = /<(?<icon>mdi-[a-z0-9-]+)/gu;
/**
 * 与**视口尺寸**绑定的写法（幻灯片是固定 980×552 画布 + 整体缩放，版面一律不该依赖窗口大小）。
 *
 * - `vw`/`vh`/`vmin`/`dvh`… 这类视口单位；
 * - `@media (width …)` / `(orientation …)` 这类按窗口尺寸切换的媒体查询；
 * - JS 里的 `window.innerWidth` / `matchMedia("(width…")`。
 *
 * **不拦**用元素自身尺寸的写法（`ResizeObserver` 观察自己的容器、`%`、`1fr`、`cqw` 容器查询单位）—— 那些跟着画布走，与窗口无关；也不拦
 * `prefers-reduced-motion` / `prefers-color-scheme`（那不是视口）。
 */
export const VIEWPORT_UNIT =
  /(?<![\w-])(?:\d+(?:\.\d+)?|\.\d+)(?:vw|vh|vmin|vmax|dvw|dvh|lvh|svh|vi|vb)(?![\w-])/giu;
export const VIEWPORT_MEDIA =
  /@media[^{]*\((?:[^)]*\b(?:width|height|orientation|aspect-ratio)\b[^)]*)\)/giu;
export const VIEWPORT_JS =
  /\b(?:window\.)?inner(?:Width|Height)\b|\bmatchMedia\(\s*["'][^"']*(?:width|height|orientation)/giu;

/**
 * 去掉注释再扫（注释里提到 `36vh` 不该被算命中）
 *
 * @param source 源码文本
 * @returns 剥掉 `/* *\/`、HTML 注释与行注释后的文本
 */
export const stripComments = (source: string): string =>
  source
    .replaceAll(/\/\*[\s\S]*?\*\//gu, "")
    .replaceAll(/<!--[\s\S]*?-->/gu, "")
    .replaceAll(/(?<prefix>^|[^:'"])\/\/[^\n]*/gu, "$<prefix>");

/** 允许给图标放大的字号类：共享阶梯（带 `!important`）+ 图标专用 `.icon-*`（也带 `!important`） */
export const ICON_SIZE_OK = /^(?:(?<text>text-(?:[2-5]xl))|(?<icon>icon-(?:md|lg|xl|2xl)))$/u;
/**
 * UnoCSS 的字号类不带 `!important`，压不过 `common.css` 给 svg 钉的 `font-size:16px` 基准 → 图标钉死 16px。
 * 只在"作者确实想把图标放大"（text-2xl 及以上）时报：行内小图标用 text-lg/xl 是有意为之、不算问题。
 */
export const UNOCSS_BIG_TEXT = /^text-(?<xl>[2-9]xl|\d{2,}xl)$/u;
/** 只用来"找有没有"，别带 `g`（`test()` 配 `g` 会记住 lastIndex、隔次返回假） */
export const FONT_SIZE = /font-size\s*:\s*(?<size>[^;}{]+);/gu;
export const BORDER_RADIUS = /border-radius\s*:\s*(?<radius>[^;}{]+);/gu;
/** 剥掉 `var(--…)` 再判断"是否写死了值" */
export const CSS_VALUE = /var\((?<var>[^)]*)\)/gu;
export const ROOT_VAR = /^\s*(?<var>--[\w-]+)\s*:/mu;
