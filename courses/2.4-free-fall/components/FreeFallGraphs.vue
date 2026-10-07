<script setup lang="ts">
import { computed } from "vue";

/**
 * 自由落体运动的五幅图像：a-t / v-t / v²-h / h-t / v-h，一次只画一幅，用 chart 属性选（默认 v-t）。
 *
 * 页面里写 `<FreeFallGraphs chart="v-t" />` 就是单独的一页大图；分析与公式由 slides.md 用 v-click 控制，
 * 组件里不出现标签栏、要点栏与公式卡。五幅图共用同一套坐标轴规范与画法：O 在轴交点左下、 横轴标签在轴下、纵轴标签在轴上、刻度向图内、箭头尖端正好落在轴端（marker 的 refX
 * 放在三角形中心、 线段回退半个箭头长）。
 *
 * 物理（g 取 10，与教材"粗略计算"一致）：t 到 3 s、h 到 45 m，于是 v = gt = 30 m/s、v² = 2gh = 900 m²/s²。
 *
 * 版面：viewBox 860 × 370，容器里 width:100% / max-width:860px ⇒ 整页宽（正文栏约 883px）时缩放 ≈ 1， 于是轴字母 32、刻度数字
 * 19、图内标注 18–22 就是屏幕上的 px 数；被 .fig-shrink 收成 800px 宽时缩放 ≈ 0.93。
 *
 * 字体：SVG 里嵌不了 <Latex>，所以量用 KaTeX_Math 斜体、单位与数字用 KaTeX_Main 正体， 与 KaTeX 里的 t/\text{s} 一致（斜体 t + 正体
 * /s），不再出现 t/s、v/(m·s⁻¹) 这类纯文本混排。
 */

/** 量：KaTeX_Math 斜体 */
const MATH = "KaTeX_Math";
/** 单位与数字：KaTeX_Main 正体 */
const MAIN = "KaTeX_Main";

const GRAVITY = 10;
const T_MAX = 3;
const H_MAX = 45;
const V_MAX = 30;
const V2_MAX = 900;

/** 五幅图的键（也是唯一合法的 chart 取值） */
const CHART_KEYS = ["a-t", "v-t", "v²-h", "h-t", "v-h"] as const;
type ChartKey = (typeof CHART_KEYS)[number];

/** 画布与绘图区（viewBox 用户单位，SVG 自成 16px 体系） */
const VIEW = { w: 860, h: 370 };
const PAD = { left: 74, right: 84, top: 56, bottom: 54 };
const PLOT_WIDTH = VIEW.w - PAD.left - PAD.right;
const PLOT_HEIGHT = VIEW.h - PAD.top - PAD.bottom;

/** 原点（轴交点）与轴箭头尖端：横轴在数据上限外再伸出 72 给轴端标签留位，纵轴比绘图区顶再高 14 */
const ORIGIN_X = PAD.left;
const ORIGIN_Y = PAD.top + PLOT_HEIGHT;
const X_TIP = ORIGIN_X + PLOT_WIDTH + 72;
const Y_TIP = PAD.top - 14;

/** 图上字号（用户单位；整页宽渲染时缩放 ≈ 1，所以就是屏幕上的 px） */
const AXIS_LETTER = 32;
const AXIS_UNIT = 20;
const TICK_SIZE = 19;
const ORIGIN_SIZE = 30;

/** 主曲线（暖金）、辅助线与斜率三角形（灰）、切线（蓝） */
const CURVE = "#e2a846";
const AUX = "#94a3b8";
const TANGENT = "#60a5fa";

/**
 * 数据值 → 画布横坐标
 *
 * @param value 数据值
 * @param max 该轴的数据上限
 * @returns 画布横坐标
 */
const toX = (value: number, max: number): number => ORIGIN_X + (value / max) * PLOT_WIDTH;
/**
 * 数据值 → 画布纵坐标（纵轴向上为正）
 *
 * @param value 数据值
 * @param max 该轴的数据上限
 * @returns 画布纵坐标
 */
const toY = (value: number, max: number): number => ORIGIN_Y - (value / max) * PLOT_HEIGHT;

/** Marker 三角形长（与 markerWidth 一致）：线段回退半个箭头，尖端才正好落在轴上 */
const ARROW = 12;
/**
 * 把线段终点沿反方向回退半个箭头长，让箭头尖端正好落在轴上
 *
 * @param x1 线段起点横坐标
 * @param y1 线段起点纵坐标
 * @param x2 线段终点横坐标
 * @param y2 线段终点纵坐标
 * @returns 回退后的线段终点坐标
 */
const shaftEnd = (x1: number, y1: number, x2: number, y2: number): { x: number; y: number } => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const back = ARROW / 2 / (Math.hypot(dx, dy) || 1);

  return { x: x2 - dx * back, y: y2 - dy * back };
};

const xShaft = shaftEnd(ORIGIN_X, ORIGIN_Y, X_TIP, ORIGIN_Y);
const yShaft = shaftEnd(ORIGIN_X, ORIGIN_Y, ORIGIN_X, Y_TIP);
const arrowId = `ffg-arrow-${Math.random().toString(36).slice(2, 8)}`;

interface Tick {
  value: number;
  pos: number;
}

/**
 * 横轴刻度：把刻度值换算成画布横坐标
 *
 * @param values 刻度处的数据值
 * @param max 横轴的数据上限
 * @returns 刻度数组（数据值与画布坐标成对）
 */
const xTicks = (values: number[], max: number): Tick[] =>
  values.map((value) => ({ value, pos: toX(value, max) }));
/**
 * 纵轴刻度：把刻度值换算成画布纵坐标
 *
 * @param values 刻度处的数据值
 * @param max 纵轴的数据上限
 * @returns 刻度数组（数据值与画布坐标成对）
 */
const yTicks = (values: number[], max: number): Tick[] =>
  values.map((value) => ({ value, pos: toY(value, max) }));

/**
 * 数值保留一位小数
 *
 * @param value 原始数值
 * @returns 四舍五入到 0.1 的数值
 */
const round1 = (value: number): number => Math.round(value * 10) / 10;
/**
 * 两点之间的线段路径
 *
 * @param x1 起点横坐标
 * @param y1 起点纵坐标
 * @param x2 终点横坐标
 * @param y2 终点纵坐标
 * @returns SVG 路径字符串
 */
const seg = (x1: number, y1: number, x2: number, y2: number): string =>
  `M ${round1(x1)} ${round1(y1)} L ${round1(x2)} ${round1(y2)}`;

interface CurveOptions {
  from: number;
  to: number;
  steps: number;
  xOf: (param: number) => number;
  yOf: (param: number) => number;
}

/**
 * 按参数采样一条曲线：参数 param 从 from 到 to，xOf / yOf 给出两个方向的数据值
 *
 * @param options 采样区间（from/to）、采样段数 steps 与两个方向的数据映射函数 xOf、yOf
 * @returns SVG 折线路径字符串
 */
const curve = (options: CurveOptions): string => {
  const { from, to, steps, xOf, yOf } = options;
  const points: string[] = [];

  for (let index = 0; index <= steps; index += 1) {
    const param = from + ((to - from) * index) / steps;

    points.push(`${round1(xOf(param))},${round1(yOf(param))}`);
  }

  return `M ${points.join(" L ")}`;
};

/**
 * 自由落体的下落高度 h = ½gt²
 *
 * @param time 下落时间（s）
 * @returns 该时刻的下落高度（m）
 */
const heightOf = (time: number): number => 0.5 * GRAVITY * time * time;

/**
 * 图上文字的一段：量、单位、中文的字体各不相同，所以一段一段拼。
 *
 * 段内可以有空格（SVG 保留段内空白），但段首段尾不写空格（会被吃掉），需要间距就用 dx。
 */
interface Seg {
  /** 段落文字（首尾不带空格） */
  text: string;
  /** 字体；不写就继承正文字体（中文走这里） */
  font?: typeof MATH | typeof MAIN;
  /** 段前额外间距（用户单位） */
  dx?: number;
  /** 上标：抬高并缩到基线的 0.72 倍（由 scripts 补出） */
  sup?: boolean;
  /** 纵向位移（由 scripts 补出） */
  dy?: number;
  /** 该段的字号；不写就跟随所在 text 的 font-size */
  size?: number;
}

/**
 * 量：KaTeX_Math 斜体（t、v、a、h、v² 里的 v）
 *
 * @param text 文字
 * @param dx 段前额外间距
 * @returns 段落
 */
const math = (text: string, dx = 0): Seg => ({ text, font: MATH, dx });
/**
 * 单位或数字：KaTeX_Main 正体（s、m、m/s、m/s²…）
 *
 * @param text 文字
 * @param dx 段前额外间距
 * @returns 段落
 */
const unit = (text: string, dx = 0): Seg => ({ text, font: MAIN, dx });
/**
 * 轴上的单位段：正体、比轴字母小一档
 *
 * @param text 文字
 * @returns 段落
 */
const axisUnit = (text: string): Seg => ({ text, font: MAIN, size: AXIS_UNIT });
/**
 * 中文等继承正文字体的段落
 *
 * @param text 文字
 * @param dx 段前额外间距
 * @returns 段落
 */
const plain = (text: string, dx = 0): Seg => ({ text, dx });
/**
 * 上标（正体数字，如 v²、m²/s² 的指数）
 *
 * @param text 上标文字
 * @returns 段落
 */
const sup = (text: string): Seg => ({ text, sup: true });

/**
 * 把上标抬高、缩小，再给紧随其后的段落补一个反向 dy 复位（dy 在 SVG 里是累加的）
 *
 * @param segs 段落数组
 * @param base 基线字号（上标大小与抬升量都按它算）
 * @returns 补好 dy / size 的段落数组
 */
const scripts = (segs: Seg[], base: number): Seg[] => {
  let size = base;
  let rise = 0;

  return segs.map((part) => {
    const { font, size: partSize, sup: isSup } = part;

    if (isSup) {
      rise = Math.round(size * 0.34);

      return { ...part, font: font ?? MAIN, size: Math.round(size * 0.72), dy: -rise };
    }

    const fixed = rise === 0 ? { ...part } : { ...part, dy: rise };

    rise = 0;
    if (partSize) size = partSize;

    return fixed;
  });
};

/** 端点投影、斜率三角形、切线这类辅助虚线 */
interface Dash {
  /** 路径 */
  path: string;
  /** 线条颜色 */
  stroke: string;
  /** 不透明度 */
  opacity: number;
}

/** 图内标注 */
interface Mark {
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  /** 字号（用户单位） */
  size: number;
  fill: string;
  segs: Seg[];
  /** 是否加描边光晕（默认加；灰底的对照线说明不加） */
  halo?: boolean;
}

/** 一幅图的全部几何：换图只换这份数据，模板只有一套 */
interface ChartSpec {
  /** 无障碍说明 */
  aria: string;
  xLabel: Seg[];
  yLabel: Seg[];
  xTicks: Tick[];
  yTicks: Tick[];
  dashed: Dash[];
  curve: string;
  /** 端点 / 切点圆点 */
  dot: { x: number; y: number };
  marks: Mark[];
}

/** ── 轴端标签：量斜体大一号、单位正体小一档（t/s、h/m、v/(m/s)、a/(m/s²)、v²/(m²/s²)） ── */
const LABEL_T = scripts([math("t"), axisUnit("/s")], AXIS_LETTER);
const LABEL_H = scripts([math("h"), axisUnit("/m")], AXIS_LETTER);
const LABEL_V = scripts([math("v"), axisUnit("/(m/s)")], AXIS_LETTER);
const LABEL_A = scripts([math("a"), axisUnit("/(m/s"), sup("2"), axisUnit(")")], AXIS_LETTER);
const LABEL_V2 = scripts(
  [math("v"), sup("2"), axisUnit("/(m"), sup("2"), axisUnit("/s"), sup("2"), axisUnit(")")],
  AXIS_LETTER,
);

/* ── ① a-t：a = g = 10 m/s²，一条水平线 ── */
const CHART_AT: ChartSpec = {
  aria: "加速度—时间图像：加速度恒为 10 米每二次方秒，是一条水平线",
  xLabel: LABEL_T,
  yLabel: LABEL_A,
  xTicks: xTicks([1, 2, 3], T_MAX),
  yTicks: yTicks([5, 10], GRAVITY),
  dashed: [
    {
      path: seg(toX(T_MAX, T_MAX), toY(GRAVITY, GRAVITY), toX(T_MAX, T_MAX), ORIGIN_Y),
      stroke: CURVE,
      opacity: 0.55,
    },
  ],
  curve: seg(ORIGIN_X, toY(GRAVITY, GRAVITY), toX(T_MAX, T_MAX), toY(GRAVITY, GRAVITY)),
  dot: { x: toX(T_MAX, T_MAX), y: toY(GRAVITY, GRAVITY) },
  marks: [
    {
      x: 260,
      y: 44,
      anchor: "middle",
      size: 22,
      fill: CURVE,
      segs: scripts([math("a"), unit("=", 7), math("g", 7)], 22),
    },
  ],
};

/* ── ② v-t：过原点、斜率 g 的直线，t = 3 s 时 v = 30 m/s ── */
const CHART_VT: ChartSpec = {
  aria: "速度—时间图像：过原点的倾斜直线，斜率等于 g",
  xLabel: LABEL_T,
  yLabel: LABEL_V,
  xTicks: xTicks([1, 2, 3], T_MAX),
  yTicks: yTicks([10, 20, 30], V_MAX),
  dashed: [
    {
      path: seg(ORIGIN_X, toY(V_MAX, V_MAX), toX(T_MAX, T_MAX), toY(V_MAX, V_MAX)),
      stroke: CURVE,
      opacity: 0.55,
    },
    {
      path: seg(toX(T_MAX, T_MAX), toY(V_MAX, V_MAX), toX(T_MAX, T_MAX), ORIGIN_Y),
      stroke: CURVE,
      opacity: 0.55,
    },
    {
      path:
        seg(toX(1, T_MAX), toY(10, V_MAX), toX(2, T_MAX), toY(10, V_MAX)) +
        seg(toX(2, T_MAX), toY(10, V_MAX), toX(2, T_MAX), toY(20, V_MAX)),
      stroke: AUX,
      opacity: 0.7,
    },
  ],
  curve: seg(ORIGIN_X, ORIGIN_Y, toX(T_MAX, T_MAX), toY(V_MAX, V_MAX)),
  dot: { x: toX(T_MAX, T_MAX), y: toY(V_MAX, V_MAX) },
  marks: [
    {
      x: 460,
      y: 220,
      anchor: "middle",
      size: 20,
      fill: CURVE,
      segs: scripts([plain("斜率"), unit("=", 8), math("g", 8)], 20),
    },
    {
      x: 766,
      y: 44,
      anchor: "end",
      size: 20,
      fill: "#f1f5f9",
      segs: scripts([math("t"), unit("= 3 s", 8), plain("，"), math("v"), unit("= 30 m/s", 8)], 20),
    },
  ],
};

/* ── ③ v²-h：过原点、斜率 2g 的直线，h = 45 m 时 v² = 900 ── */
const CHART_V2H: ChartSpec = {
  aria: "速度平方—下落高度图像：过原点的直线，斜率等于 2g",
  xLabel: LABEL_H,
  yLabel: LABEL_V2,
  xTicks: xTicks([15, 30, 45], H_MAX),
  yTicks: yTicks([300, 600, 900], V2_MAX),
  dashed: [
    {
      path: seg(ORIGIN_X, toY(V2_MAX, V2_MAX), toX(H_MAX, H_MAX), toY(V2_MAX, V2_MAX)),
      stroke: CURVE,
      opacity: 0.55,
    },
    {
      path: seg(toX(H_MAX, H_MAX), toY(V2_MAX, V2_MAX), toX(H_MAX, H_MAX), ORIGIN_Y),
      stroke: CURVE,
      opacity: 0.55,
    },
    {
      path:
        seg(toX(15, H_MAX), toY(300, V2_MAX), toX(30, H_MAX), toY(300, V2_MAX)) +
        seg(toX(30, H_MAX), toY(300, V2_MAX), toX(30, H_MAX), toY(600, V2_MAX)),
      stroke: AUX,
      opacity: 0.7,
    },
  ],
  curve: seg(ORIGIN_X, ORIGIN_Y, toX(H_MAX, H_MAX), toY(V2_MAX, V2_MAX)),
  dot: { x: toX(H_MAX, H_MAX), y: toY(V2_MAX, V2_MAX) },
  marks: [
    {
      x: 460,
      y: 220,
      anchor: "middle",
      size: 20,
      fill: CURVE,
      segs: scripts([plain("斜率"), unit("= 2", 8), math("g")], 20),
    },
    {
      x: 766,
      y: 44,
      anchor: "end",
      size: 20,
      fill: "#f1f5f9",
      segs: scripts(
        [math("h"), unit("= 45 m", 8), plain("时", 6), math("v", 6), sup("2"), unit("= 900", 8)],
        20,
      ),
    },
  ],
};

/* ── ④ h-t：h = ½gt² 的下凹抛物线；t = 2 s 处的切线斜率就是该时刻速度 20 m/s ── */
const CHART_HT: ChartSpec = {
  aria: "下落高度—时间图像：下凹抛物线，t = 2 s 处切线的斜率等于该时刻的速度",
  xLabel: LABEL_T,
  yLabel: LABEL_H,
  xTicks: xTicks([1, 2, 3], T_MAX),
  yTicks: yTicks([15, 30, 45], H_MAX),
  dashed: [
    {
      path: seg(toX(1.15, T_MAX), toY(3, H_MAX), toX(2.9, T_MAX), toY(38, H_MAX)),
      stroke: TANGENT,
      opacity: 1,
    },
  ],
  curve: curve({
    from: 0,
    to: T_MAX,
    steps: 36,
    xOf: (time) => toX(time, T_MAX),
    yOf: (time) => toY(heightOf(time), H_MAX),
  }),
  dot: { x: toX(2, T_MAX), y: toY(heightOf(2), H_MAX) },
  marks: [
    {
      x: 640,
      y: 130,
      anchor: "end",
      size: 20,
      fill: TANGENT,
      segs: scripts([plain("切线斜率"), unit("=", 8), math("v", 8)], 20),
    },
    {
      x: 510,
      y: 292,
      anchor: "middle",
      size: 20,
      fill: "#f1f5f9",
      segs: scripts([math("t"), unit("= 2 s", 8), plain("，"), math("h"), unit("= 20 m", 8)], 20),
    },
  ],
};

/* ── ⑤ v-h：v = √(2gh) 的开口向右曲线；灰色虚线是"若 v 与 h 成正比"的对照 ── */
const CHART_VH: ChartSpec = {
  aria: "速度—下落高度图像：开口向右的曲线，下落高度越大速度增长越慢",
  xLabel: LABEL_H,
  yLabel: LABEL_V,
  xTicks: xTicks([15, 30, 45], H_MAX),
  yTicks: yTicks([10, 20, 30], V_MAX),
  dashed: [
    {
      path: seg(ORIGIN_X, toY(V_MAX, V_MAX), toX(H_MAX, H_MAX), toY(V_MAX, V_MAX)),
      stroke: CURVE,
      opacity: 0.55,
    },
    {
      path: seg(toX(H_MAX, H_MAX), toY(V_MAX, V_MAX), toX(H_MAX, H_MAX), ORIGIN_Y),
      stroke: CURVE,
      opacity: 0.55,
    },
    {
      path: seg(ORIGIN_X, ORIGIN_Y, toX(H_MAX, H_MAX), toY(V_MAX, V_MAX)),
      stroke: AUX,
      opacity: 0.55,
    },
  ],
  curve: curve({
    from: 0,
    to: H_MAX,
    steps: 80,
    xOf: (height) => toX(height, H_MAX),
    yOf: (height) => toY(Math.sqrt(2 * GRAVITY * height), V_MAX),
  }),
  dot: { x: toX(H_MAX, H_MAX), y: toY(V_MAX, V_MAX) },
  marks: [
    {
      x: 500,
      y: 225,
      anchor: "middle",
      size: 18,
      fill: AUX,
      halo: false,
      segs: scripts(
        [plain("若"), math("v", 6), plain("与", 6), math("h", 6), plain("成正比", 6)],
        18,
      ),
    },
    {
      x: 578,
      y: 285,
      anchor: "middle",
      size: 20,
      fill: CURVE,
      segs: scripts([plain("增长越来越慢")], 20),
    },
    {
      x: 766,
      y: 44,
      anchor: "end",
      size: 20,
      fill: "#f1f5f9",
      segs: scripts(
        [math("h"), unit("= 45 m", 8), plain("时", 6), math("v", 6), unit("= 30 m/s", 8)],
        20,
      ),
    },
  ],
};

const SPECS: Record<ChartKey, ChartSpec> = {
  "a-t": CHART_AT,
  "v-t": CHART_VT,
  "v²-h": CHART_V2H,
  "h-t": CHART_HT,
  "v-h": CHART_VH,
};

/** 要画哪一幅：a-t | v-t | v²-h | h-t | v-h，默认 v-t（给别的值时也退回 v-t） */
const { chart = "v-t" } = defineProps<{ chart?: string }>();

const current = computed<ChartSpec>(() => {
  const key = CHART_KEYS.find((item) => item === chart);

  return SPECS[key ?? "v-t"];
});
</script>

<template>
  <svg
    class="ffg"
    :viewBox="`0 0 ${VIEW.w} ${VIEW.h}`"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="current.aria"
  >
    <defs>
      <marker
        :id="arrowId"
        markerWidth="12"
        markerHeight="12"
        refX="6"
        refY="6"
        orient="auto"
        markerUnits="userSpaceOnUse"
        viewBox="0 0 12 12"
      >
        <path d="M 0 0 L 12 6 L 0 12 z" fill="#64748b" />
      </marker>
    </defs>
    <g stroke="#94a3b8" stroke-width="1" opacity="0.13">
      <line
        v-for="tick in current.xTicks"
        :key="`gx${tick.value}`"
        :x1="tick.pos"
        :y1="PAD.top"
        :x2="tick.pos"
        :y2="ORIGIN_Y"
      />
      <line
        v-for="tick in current.yTicks"
        :key="`gy${tick.value}`"
        :x1="ORIGIN_X"
        :y1="tick.pos"
        :x2="ORIGIN_X + PLOT_WIDTH"
        :y2="tick.pos"
      />
    </g>
    <line
      :x1="ORIGIN_X"
      :y1="ORIGIN_Y"
      :x2="xShaft.x"
      :y2="xShaft.y"
      stroke="#64748b"
      stroke-width="2.4"
      :marker-end="`url(#${arrowId})`"
    />
    <line
      :x1="ORIGIN_X"
      :y1="ORIGIN_Y"
      :x2="yShaft.x"
      :y2="yShaft.y"
      stroke="#64748b"
      stroke-width="2.4"
      :marker-end="`url(#${arrowId})`"
    />
    <g stroke="#64748b" stroke-width="1.7">
      <line
        v-for="tick in current.xTicks"
        :key="`tx${tick.value}`"
        :x1="tick.pos"
        :y1="ORIGIN_Y"
        :x2="tick.pos"
        :y2="ORIGIN_Y - 9"
      />
      <line
        v-for="tick in current.yTicks"
        :key="`ty${tick.value}`"
        :x1="ORIGIN_X"
        :y1="tick.pos"
        :x2="ORIGIN_X + 9"
        :y2="tick.pos"
      />
    </g>
    <g :font-size="TICK_SIZE" font-family="KaTeX_Main" fill="#94a3b8">
      <text
        v-for="tick in current.xTicks"
        :key="`nx${tick.value}`"
        :x="tick.pos"
        :y="ORIGIN_Y + 30"
        text-anchor="middle"
      >
        {{ tick.value }}
      </text>
      <text
        v-for="tick in current.yTicks"
        :key="`ny${tick.value}`"
        :x="ORIGIN_X - 12"
        :y="tick.pos + 6"
        text-anchor="end"
      >
        {{ tick.value }}
      </text>
    </g>
    <text
      :x="ORIGIN_X - 14"
      :y="ORIGIN_Y + 42"
      text-anchor="middle"
      :font-size="ORIGIN_SIZE"
      font-family="KaTeX_Math"
      font-style="italic"
      fill="#94a3b8"
    >
      O
    </text>
    <text
      :x="X_TIP - 6"
      :y="ORIGIN_Y + 42"
      text-anchor="end"
      :font-size="AXIS_LETTER"
      fill="#94a3b8"
    >
      <tspan
        v-for="(part, index) in current.xLabel"
        :key="index"
        :dx="part.dx"
        :dy="part.dy"
        :font-size="part.size"
        :font-family="part.font"
        :font-style="part.font === MATH ? 'italic' : undefined"
      >
        {{ part.text }}
      </tspan>
    </text>
    <text :x="ORIGIN_X" y="28" text-anchor="middle" :font-size="AXIS_LETTER" fill="#94a3b8">
      <tspan
        v-for="(part, index) in current.yLabel"
        :key="index"
        :dx="part.dx"
        :dy="part.dy"
        :font-size="part.size"
        :font-family="part.font"
        :font-style="part.font === MATH ? 'italic' : undefined"
      >
        {{ part.text }}
      </tspan>
    </text>
    <path
      v-for="(dash, index) in current.dashed"
      :key="`dash${index}`"
      :d="dash.path"
      fill="none"
      :stroke="dash.stroke"
      :opacity="dash.opacity"
      stroke-width="1.6"
      stroke-dasharray="5 4"
    />
    <path
      :d="current.curve"
      fill="none"
      :stroke="CURVE"
      stroke-width="4.5"
      stroke-linecap="round"
    />
    <circle :cx="current.dot.x" :cy="current.dot.y" r="6" :fill="CURVE" />
    <text
      v-for="(mark, index) in current.marks"
      :key="`mark${index}`"
      :class="{ 'ffg-halo': mark.halo !== false }"
      :x="mark.x"
      :y="mark.y"
      :text-anchor="mark.anchor"
      :font-size="mark.size"
      :fill="mark.fill"
    >
      <tspan
        v-for="(part, partIndex) in mark.segs"
        :key="partIndex"
        :dx="part.dx"
        :dy="part.dy"
        :font-size="part.size"
        :font-family="part.font"
        :font-style="part.font === MATH ? 'italic' : undefined"
      >
        {{ part.text }}
      </tspan>
    </text>
  </svg>
</template>

<style scoped>
/* 一大张图：占满所在栏（正文栏约 883px），到 860px 就封顶 ⇒ 缩放 ≈ 1，字号按屏幕 px 给 */
.ffg {
  display: block;

  width: 100%;
  max-width: 860px;
  height: auto;
  aspect-ratio: 860 / 370;
  margin: 0 auto;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: rgb(15 20 37 / 45%);
}

/* 标注压在曲线/虚线上时加描边光晕，保证读得清（"若 v 与 h 成正比"不加） */
.ffg-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 4;
}
</style>
