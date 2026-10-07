/**
 * 图内标注的**文字规整 + 片段拼装**（`ChartLabel` / `CoordAxes` 共用）。
 *
 * 独立成文件有两个原因：① 三个坐标组件迟早都要用同一套标注口径；② 塞进组件脚本会把 `max-lines` 撑爆。
 */

/** 一个标注片段：`tex` 走 KaTeX（物理量、单位、公式），`text` 走系统字体（中文、点名） */
export type ChartLabelPart = { tex: string } | { text: string };

/** 文字相对标注点的方位 */
export type ChartLabelAnchor =
  | "center"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

// 手写标注里常见的 Unicode 数学符号 → KaTeX 源码。
// 最要紧的一条是 ½：它以前会被渲染成字体里的怪字形，转成 \frac{1}{2} 才是 LaTeX 的分式。
const TEX_FIXES: [RegExp, string][] = [
  [/[−–—]/gu, "-"],
  [/×/gu, String.raw`\times `],
  [/÷/gu, String.raw`\div `],
  [/·/gu, String.raw`\cdot `],
  [/≈/gu, String.raw`\approx `],
  [/≤/gu, String.raw`\le `],
  [/≥/gu, String.raw`\ge `],
  [/½/gu, String.raw`\frac{1}{2}`],
  [/⅓/gu, String.raw`\frac{1}{3}`],
  [/⅔/gu, String.raw`\frac{2}{3}`],
  [/¼/gu, String.raw`\frac{1}{4}`],
  [/¾/gu, String.raw`\frac{3}{4}`],
  [/θ/gu, String.raw`\theta `],
  [/Δ/gu, String.raw`\Delta `],
  [/π/gu, String.raw`\pi `],
  [/°/gu, String.raw`^\circ `],
];

/**
 * 轴标签的**单位**要不要在前面留一道缝
 *
 * 轴标签是 SVG `<tspan>` 拼的，不自动留缝：`quantity: 't'` + `unit: 'min'` 会挤成 `tmin`。 但 `unit: '/(m/s)'`、`unit:
 * ' / min'` 这种**自带分隔符**（`/`、`(`、`·`、空格）的写法不要再加缝， 否则会变成 `v /(m/s)`。所以：自带分隔符就不留，纯字母单位才留。
 *
 * 注：轴单位的斜杠由 `normalizeUnit` 统一补，所以轴标签走完归一化后这里通常返回 `false`； 这个函数现在主要留给"自己带分隔符的旧写法"兜底。
 *
 * @param unit 单位字符串
 * @returns 是否需要额外间隙
 */
export const needsUnitGap = (unit: string): boolean => !/^[\s/(·]/u.test(unit);

/**
 * 轴标签的**单位**：作者只写单位本身，斜杠由组件统一补
 *
 * 老师的口径（2026-10-06）是「`unit` 不带斜杠」：写 `unit: "m"` 就渲染成 `x/m`。 为了不炸掉旧写法，这里先把**前导斜杠与空白**去掉再补回一个 `/`：
 * `"/m"`、`" / m"`、`"/(m/s)"`、`"(m/s)"` 都能得到正确结果。
 *
 * 复合单位请自带括号（写 `"(m/s)"` → 渲染 `/ (m/s)` 的紧凑形式），避免出现 `v/m/s` 这种歧义。
 *
 * @param unit 单位字符串（带不带前导斜杠都行）
 * @returns 带前导斜杠的单位字符串
 */
export const normalizeUnit = (unit: string): string => `/${unit.trim().replace(/^\/+\s*/u, "")}`;

/** 轴量文本的片段：数学斜体（`KaTeX_Math`）/ 正体（`KaTeX_Main`，给数字用） */
export interface AxisMathPart {
  text: string;
  /** 正体片段：数字在数学斜体字体里没有字形，会被浏览器换成别的字体、渲染得明显偏小 */
  upright: boolean;
}

/**
 * 轴量文本 → 片段数组：字母与符号走数学斜体（`KaTeX_Math`），数字走正体（`KaTeX_Main`）
 *
 * `quantity: "1/M"` 这种带数字的轴量，整串交给 `KaTeX_Math` 时数字会因为没有字形而退化成系统字体 （`1/M` 里的 1 明显偏小）。把数字单独切出来用
 * `KaTeX_Main` 画，与 LaTeX 数学模式一致。
 *
 * @param quantity 轴量文本，如 `"t"`、`"1/M"`
 * @returns 片段数组，可直接铺成 `<tspan>`
 */
export const axisMathParts = (quantity: string): AxisMathPart[] =>
  quantity
    .split(/(?<number>\d+(?:\.\d+)?)/u)
    .filter((piece) => piece !== "")
    .map((piece) => ({ text: piece, upright: /^\d/u.test(piece) }));

/**
 * 把标注里手写的 Unicode 数学符号换成 KaTeX 源码（`½` → `\frac{1}{2}`、`−` → `-`…）
 *
 * @param tex KaTeX 源码（可能夹着 Unicode 符号）
 * @returns 规整后的 KaTeX 源码
 */
export const normalizeTex = (tex: string): string =>
  TEX_FIXES.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), tex);

/** 点标注里与文字有关的字段（新写法 `tex` / `parts`，老写法 `math` / `sub` / `unit` / `sup`） */
export interface LabelTextSource {
  /** KaTeX 源码（推荐写法），如 `"v_0"`、`String.raw`\frac{1}{2}at^2`` */
  tex?: string;
  /** 任意顺序混排 KaTeX 与普通文字；给了它上面的简写字段就都忽略 */
  parts?: ChartLabelPart[];
  /** 普通文字（系统字体）：中文、点名 */
  text?: string;
  /** 物理量符号的简写（配 `sub` / `sup`），如 `"v"`；等价于 `tex: "v_0"` */
  math?: string;
  /** 下标简写（配 `math`），如 `"0"`；不要写 Unicode 下标 */
  sub?: string;
  /** 单位简写，如 `"m/s"`；不要写 Unicode 上标 */
  unit?: string;
  /** 单位上标简写（配 `unit`），如 `"2"` */
  sup?: string;
}

/**
 * 标注 → 片段数组：新写法（`tex` / `parts`）直接用，老写法（`math` / `sub` / `unit` / `sup`）就地翻译成 KaTeX
 *
 * @param label 含文字的标注配置
 * @returns 交给 `ChartLabel` 的片段数组
 */
export const labelParts = (label: LabelTextSource): ChartLabelPart[] => {
  if (label.parts && label.parts.length > 0) return label.parts;
  const parts: ChartLabelPart[] = [];

  if (label.tex) {
    parts.push({ tex: normalizeTex(label.tex) });
  } else if (label.math) {
    const sub = label.sub ? `_{${label.sub}}` : "";
    const sup = label.sup ? `^{${label.sup}}` : "";

    parts.push({ tex: `${normalizeTex(label.math)}${sub}${sup}` });
  }

  if (label.text) parts.push({ text: label.text });
  if (label.unit) {
    const sup = label.sup && !label.math ? `^{${label.sup}}` : "";

    // 片段之间由 `ChartLabel` 统一留缝（`> * + *` 的 margin），这里不再自己塞空格
    parts.push({ tex: `${String.raw`\text{`}${label.unit}}${sup}` });
  }

  return parts;
};
