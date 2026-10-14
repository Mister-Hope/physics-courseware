/**
 * 共享 addon 的 UnoCSS 配置 —— **专门用来堵住 UnoCSS attributify 在 SVG 上捅的娄子**。
 *
 * ## 背景（详见 `.agents/notes/svg-attributify-trap.md`）
 *
 * Slidev 自己的 `@slidev/client/uno.config.ts` 里带了 `presetAttributify()`。attributify 的 本事是 「把 HTML
 * 属性当工具类」——但它的提取器**不认识 SVG 的表现属性**，于是把
 *
 * ```html
 * <circle opacity="0.9" font-size="16" stroke-width="2.8" cols="16" gap="40" />
 * ```
 *
 * 也提取成候选工具类 `[opacity~="0.9"]`、`[font-size~="16"]`……再由 presetWind3 按 「百分数 / 间距比例」去翻译，生成这些**鬼规则**：
 *
 * ```css
 * [opacity~="0.9"] { opacity: 0.009; }     // 0.9 被当成 0.9% ，整层图形直接隐形
 * [font-size~="16"] { font-size: 4rem; }   // 16 被当成 16 × 0.25rem = 88px
 * [stroke-width~="1.6"] { stroke-width: 1.6px; }
 * ```
 *
 * 属性选择器 `[attr~="value"]` 的权重（0,1,0）**高于** SVG 表现属性（等同于权重 0,0,0）， 所以这些鬼规则会稳稳压住作者写的属性值 ——
 * 不是「不生效」，而是「被一个隐形的、数值被重算过的 CSS 规则盖掉了」。
 *
 * ## 为什么用 `blocklist` 而不是别的办法
 *
 * - ❌ **再加一个 `presetAttributify({ ignoreAttributes: [...] })`**：没用。 `resolveConfig` 里
 *   `uniqueBy(presets, (a, b) => a.name === b.name)` **只保留第一个**同名的 preset，而 Slidev 的 client 配置在
 *   addon 之前加载， 我们这份会被直接丢掉（`presetAttributify` 的 `name` 恒为 `"@unocss/preset-attributify"`）。
 * - ❌ **改 Slidev 的预设**：`configFile: false` + 内部 `mergeConfigs`，改不到。
 * - ✅ **`blocklist`**：`blocklist` 在 `TokenProcessor.parse` 里**同时**校验原始 token（`[opacity~="0.9"]`） 和
 *   variant 展开后的 token，命中即**直接丢弃候选**——正好卡在「提取出来后、生成规则前」这一步。
 *
 * 只屏蔽**数值型**的 SVG 表现属性 / 组件 props 名，Slidev 自己用到的 `stroke="currentColor"`、
 * `fill="currentColor"`、`flex="~"`、`grid="~ cols-2"` 这些**非纯粹数值**的 attributify 写法一律放过。
 */

/**
 * 会出现在 `<svg>` 上、且**值可能是纯数字**的属性名。
 *
 * 前一段是 SVG 规范里的表现属性（presentation attributes），后一段（`size`/`cols`/`rows`/`gap`） 是共享组件自己声明的 props —— 写
 * `<FieldDots :size="10" />` 时它就以 `size="10"` 落到 DOM 上， 同样会被 attributify 抓走。
 */
const NUMERIC_ATTRS = [
  // SVG 表现属性
  "opacity",
  "fill-opacity",
  "stroke-opacity",
  "stop-opacity",
  "font-size",
  "font-weight",
  "stroke-width",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-miterlimit",
  "r",
  "rx",
  "ry",
  "cx",
  "cy",
  "x",
  "y",
  "x1",
  "y1",
  "x2",
  "y2",
  "width",
  "height",
  "offset",
  // 共享组件 props（会原样落到 DOM 属性上）
  "size",
  "cols",
  "rows",
  "spacing",
  "gap",
  "thickness",
  "head-size",
  "label-size",
  "line-width",
];

/** 形如 `[opacity~="0.9"]` / `[font-size="16"]`：属性在表里、值恰好是一个（可带小数的）数字 */
const SVG_NUMERIC_ATTRIBUTIFY = new RegExp(
  `^\\[(?:${NUMERIC_ATTRS.join("|")})(?:~=|=)"-?\\d+(?:\\.\\d+)?"\\]$`,
);

export default {
  blocklist: [SVG_NUMERIC_ATTRIBUTIFY],
};
