<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from "vue";

import { needsUnitGap, normalizeUnit } from "./label-text";

// SSR / 首帧拿不到容器宽度时的标定宽度（整页正文栏约 884px）
const NOMINAL_RENDER_WIDTH = 884;

// 屏幕上要多大就写多大（px）；viewBox 字号 = 目标 px × (viewBox 宽 ÷ 容器实测渲染宽)
const TARGET_PX = {
  axis: 21,
  tick: 15,
  label: 17,
  origin: 17,
  gap: 9,
  tickLength: 8,
  head: 14,
  curve: 3,
  axisLine: 1.8,
};

const round2 = (value: number): number => Math.round(value * 100) / 100;
const tidy = (value: number): number => Number(value.toFixed(6));

const STEP_CANDIDATES = [
  0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000,
];

// 自动刻度步长：正半轴最多 5 格
const autoStep = (magnitude: number): number =>
  STEP_CANDIDATES.find((candidate) => magnitude / candidate <= 5) ?? magnitude / 5;

// 刻度值文本：负数用排版减号 −，别出现 "2 - -5" 这种读法
const formatTick = (value: number): string => {
  const rounded = Number(value.toFixed(2));

  return `${rounded < 0 ? "−" : ""}${Math.abs(rounded)}`;
};

// 曲线默认配色：不写 color 就按顺序取
const CURVE_PALETTE = [
  "var(--c-accent)",
  "var(--c-accent-2)",
  "var(--c-physics)",
  "var(--c-danger)",
  "var(--c-text)",
];

/** 数据坐标点（物理量数值，不是屏幕像素） */
interface Point {
  x: number;
  y: number;
}

interface SimpleCurve {
  /** 折线/直线：两点就是直线，多点就是折线 */
  points?: Point[];
  /** 函数曲线，例如 `(t) => 5 * t * t`，在 0~xMax 内采样 */
  formula?: (x: number) => number;
  /** 采样段数，默认 96 */
  samples?: number;
  /** 线色；不写按调色板顺序取 */
  color?: string;
  /** `true` 用默认虚线，也可以直接写 `"8 5"` */
  dashed?: boolean | string;
  /** 线宽（屏幕 px 口径），默认 3 */
  width?: number;
}

/** 标号相对该点的方位 */
type LabelSide = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface SimplePoint {
  x: number;
  y: number;
  /** 普通文字（系统字体）：点名、中文；物理量请用 math/sub */
  text?: string;
  /** 物理量符号（`KaTeX_Math` 斜体），如 `"P"`、`"v"` */
  math?: string;
  /** 下标（`KaTeX_Main` 小字号下沉），如 `"0"` —— 禁止写 Unicode `₀` */
  sub?: string;
  /** 单位（`KaTeX_Main`），如 `"m"`、`"m/s"`；不要写 Unicode 上标 */
  unit?: string;
  /** 单位的上标（`KaTeX_Main` 小字号上抬），如 `"2"`、`"-1"` */
  sup?: string;
  /** 标号画在点的哪个方位，默认 `"top-right"` */
  labelAt?: LabelSide;
  /** 在方位基础上再偏移（屏幕 px 口径） */
  dx?: number;
  dy?: number;
  /** 标号与圆点颜色，默认 `var(--c-accent)` */
  color?: string;
  /** 画圆点：`true` 用默认半径，也可以给具体半径（屏幕 px 口径） */
  dot?: boolean | number;
  /** 标号加深色描边光晕，默认开（压在曲线上也读得清） */
  halo?: boolean;
}

/** 从点向两条轴作虚线垂线 */
interface GuideOption {
  /** 虚线颜色，默认 `var(--c-text-dim)` */
  color?: string;
  /** `true` 用默认虚线，也可以直接写 `"7 5"` */
  dashed?: boolean | string;
}

interface AxisOption {
  /** 物理量符号（`KaTeX_Math` 斜体），如 `"t"` */
  quantity?: string;
  /** 量的下标（`KaTeX_Main` 下沉），如 `"0"`；不要写 Unicode 下标 */
  sub?: string;
  /** 单位（`KaTeX_Main`），如 `"m/s"`；不要写 Unicode 上标 */
  unit?: string;
  /** 单位的上标（`KaTeX_Main` 小字号上抬），如 `"2"`、`"-1"`；写作 `unit: "m/s", sup: "2"` */
  sup?: string;
}

interface TickOption {
  /** 横轴刻度值；不传按 `xMax` 自动取整步长（不含 0） */
  x?: number[];
  /** 纵轴刻度值；不传自动取 */
  y?: number[];
  /** 画刻度数字，默认开 */
  labels?: boolean;
  /** 轴末端箭头，默认开 */
  arrows?: boolean;
  /** 原点 `O` 标注，默认开 */
  origin?: boolean;
}

interface ViewOption {
  /** ViewBox 宽，默认 640（只决定比例与坐标系，不改屏幕字号） */
  width?: number;
  /** ViewBox 高，默认 340（渲染高 ≈ 容器宽 × 高 ÷ 宽，见使用文档的高度预算） */
  height?: number;
}

const {
  xAxis = {},
  yAxis = {},
  xMax = 5,
  yMax = 5,
  curves = [],
  point = null,
  guides = false,
  ticks = {},
  view = {},
  fontScale = 1,
} = defineProps<{
  /** 横轴的量与单位（只第一象限，量标签在轴下方） */
  xAxis?: AxisOption;
  /** 纵轴的量与单位（量标签在轴左上方） */
  yAxis?: AxisOption;
  /** 横轴最大刻度（第一象限，从 0 开始），默认 5 */
  xMax?: number;
  /** 纵轴最大刻度（第一象限，从 0 开始），默认 5 */
  yMax?: number;
  /** 若干条曲线，每条一个颜色 */
  curves?: SimpleCurve[];
  /** 一个被标出的点（可带标号），默认不画 */
  point?: SimplePoint | null;
  /** 从这个点向 x 轴、y 轴各作一条虚线垂线，默认关 */
  guides?: boolean | GuideOption;
  /** 刻度开关与刻度值 */
  ticks?: TickOption;
  /** ViewBox 尺寸（只决定比例） */
  view?: ViewOption;
  /** 字号 / 线宽整体倍率，默认 1 */
  fontScale?: number;
}>();

// 自定义装饰插槽（曲线上的引线、尺寸线…）：按 viewBox 用户单位作图，**不裁剪**
defineSlots<{
  overlay?: (props: {
    /** 数据坐标 → viewBox 用户单位 */
    x: (value: number) => number;
    y: (value: number) => number;
    /** 绘图区四边（viewBox 用户单位） */
    plot: { left: number; right: number; top: number; bottom: number };
    /** 1 屏幕 px 等于多少 viewBox 用户单位 */
    px2user: number;
    /** ViewBox 宽 / 高 */
    width: number;
    height: number;
  }) => unknown;
}>();

const wrapRef = ref<HTMLElement | null>(null);
/** 容器实测渲染宽度（px）；拿不到时退回 NOMINAL_RENDER_WIDTH */
const renderWidth = ref(0);
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  const element = wrapRef.value;

  if (!element) return;

  resizeObserver = new ResizeObserver((entries) => {
    const [entry] = entries;

    if (entry) renderWidth.value = entry.contentRect.width;
  });
  resizeObserver.observe(element);
  renderWidth.value = element.getBoundingClientRect().width;
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
});

const box = computed(() => ({
  width: view.width ?? 640,
  height: view.height ?? 340,
}));

// 1 用户单位 = 屏幕上多少 px；字号按它反算，换栏位不用重算
const unitScale = computed(() => {
  const rendered = renderWidth.value > 0 ? renderWidth.value : NOMINAL_RENDER_WIDTH;

  return box.value.width / rendered;
});

const svgPx = (target: number): number => round2(target * fontScale * unitScale.value);

const chrome = computed(() => ({
  axis: svgPx(TARGET_PX.axis),
  unit: svgPx(TARGET_PX.axis * 0.68),
  tick: svgPx(TARGET_PX.tick),
  label: svgPx(TARGET_PX.label),
  origin: svgPx(TARGET_PX.origin),
  gap: svgPx(TARGET_PX.gap),
  tickLength: svgPx(TARGET_PX.tickLength),
  head: svgPx(TARGET_PX.head),
  curve: svgPx(TARGET_PX.curve),
  axisLine: svgPx(TARGET_PX.axisLine),
  dash: `${svgPx(10)} ${svgPx(6)}`,
  guideDash: `${svgPx(7)} ${svgPx(5)}`,
}));

// 正半轴刻度值：步长整数倍，不含 0（0 交给原点 O）
const autoTicks = (magnitude: number, step: number): number[] => {
  const values: number[] = [];

  for (let value = step; value <= magnitude + 1e-9; value += step) values.push(tidy(value));

  return values;
};

const resolvedTicks = computed(() => ({
  x: ticks.x ?? autoTicks(xMax, autoStep(xMax)),
  y: ticks.y ?? autoTicks(yMax, autoStep(yMax)),
}));

const layout = computed(() => {
  const { width, height } = box.value;
  const sizes = chrome.value;
  const spanX = Math.max(Math.abs(xMax), 0.001);
  const spanY = Math.max(Math.abs(yMax), 0.001);
  const yTickWidth =
    Math.max(...resolvedTicks.value.y.map((value) => formatTick(value).length), 1) *
    0.55 *
    sizes.tick;
  const padLeft = sizes.gap + yTickWidth + sizes.gap * 0.7;
  const padRight = sizes.gap;
  // 顶部多留一点：纵轴量标签要能躲开正上方那个刻度数字
  const padTop = sizes.gap + sizes.axis * 0.95 + sizes.tick * 0.35;
  const padBottom =
    sizes.tickLength +
    sizes.tick * 1.35 +
    (xAxis.quantity ? sizes.axis * 1.2 : 0) +
    sizes.gap * 1.1;
  const plot = {
    left: round2(padLeft),
    right: round2(width - padRight),
    top: round2(padTop),
    bottom: round2(height - padBottom),
  };
  const screenX = (x: number): number => plot.left + (x / spanX) * (plot.right - plot.left);
  const screenY = (y: number): number => plot.bottom - (y / spanY) * (plot.bottom - plot.top);
  // 顶端刻度数字的最上沿；纵轴量标签要放在它上面，别压在一起
  const yTickTop =
    resolvedTicks.value.y.length > 0
      ? screenY(Math.max(...resolvedTicks.value.y)) - sizes.tick * 0.34
      : plot.top;
  const yLabelBase = round2(Math.min(plot.top - sizes.gap * 0.4, yTickTop - sizes.gap * 0.8));

  return { width, height, sizes, plot, screenX, screenY, yLabelBase };
});

const axisArrows = computed(() => {
  const { plot, sizes } = layout.value;
  const { head } = sizes;

  return {
    x: `M ${round2(plot.right - head)} ${round2(plot.bottom - head * 0.45)} L ${plot.right} ${plot.bottom} L ${round2(plot.right - head)} ${round2(plot.bottom + head * 0.45)} Z`,
    y: `M ${round2(plot.left - head * 0.45)} ${round2(plot.top + head)} L ${plot.left} ${plot.top} L ${round2(plot.left + head * 0.45)} ${round2(plot.top + head)} Z`,
  };
});

const xTicks = computed(() =>
  resolvedTicks.value.x.map((value) => {
    const { plot, screenX, sizes } = layout.value;

    return {
      key: `sx-tick-${value}`,
      label: formatTick(value),
      x: round2(screenX(value)),
      from: round2(plot.bottom),
      to: round2(plot.bottom - sizes.tickLength),
      labelY: round2(plot.bottom + sizes.tickLength + sizes.tick * 1.35),
    };
  }),
);

const yTicks = computed(() =>
  resolvedTicks.value.y.map((value) => {
    const { plot, screenY, sizes } = layout.value;

    return {
      key: `sx-tick-${value}`,
      label: formatTick(value),
      y: round2(screenY(value)),
      from: round2(plot.left),
      to: round2(plot.left + sizes.tickLength),
      labelX: round2(plot.left - sizes.gap * 0.7),
      labelY: round2(screenY(value) + sizes.tick * 0.36),
    };
  }),
);

const originLabel = computed(() => {
  if (ticks.origin === false) return null;
  const { plot, sizes } = layout.value;

  return {
    x: round2(plot.left - sizes.gap * 0.7),
    y: round2(plot.bottom + sizes.origin * 0.85),
    font: sizes.origin,
  };
});

// 轴量与单位：横轴贴轴端下方，纵轴贴轴顶（自动躲开顶端刻度数字）
const axisLabels = computed(() => {
  const { plot, sizes, yLabelBase } = layout.value;
  const items: {
    key: string;
    x: number;
    y: number;
    anchor: "start" | "end";
    font: number;
    unitFont: number;
    subFont: number;
    supFont: number;
    subShift: number;
    unitGap: number;
    quantity: string;
    sub?: string;
    unit?: string;
    sup?: string;
  }[] = [];

  if (xAxis.quantity) {
    items.push({
      key: "sx-axis-x",
      x: plot.right,
      y: round2(plot.bottom + sizes.tickLength + sizes.tick * 1.35 + sizes.axis * 1.2),
      anchor: "end",
      font: sizes.axis,
      unitFont: sizes.unit,
      subFont: round2(sizes.axis * 0.72),
      supFont: round2(sizes.unit * 0.75),
      subShift: round2(sizes.axis * 0.18),
      unitGap: round2(sizes.axis * 0.22),
      quantity: xAxis.quantity,
      sub: xAxis.sub,
      unit: xAxis.unit ? normalizeUnit(xAxis.unit) : "",
      sup: xAxis.sup,
    });
  }

  if (yAxis.quantity) {
    items.push({
      key: "sx-axis-y",
      x: round2(plot.left - sizes.gap),
      y: yLabelBase,
      anchor: "start",
      font: sizes.axis,
      unitFont: sizes.unit,
      subFont: round2(sizes.axis * 0.72),
      supFont: round2(sizes.unit * 0.75),
      subShift: round2(sizes.axis * 0.18),
      unitGap: round2(sizes.axis * 0.22),
      quantity: yAxis.quantity,
      sub: yAxis.sub,
      unit: yAxis.unit ? normalizeUnit(yAxis.unit) : "",
      sup: yAxis.sup,
    });
  }

  return items;
});

const cutoff = (value: number, limit: number): number => Math.min(Math.max(value, 0), limit);

// 显式给的线宽按“屏幕 px”口径换算成用户单位；没给就用默认（已经是用户单位）
const lineWidthOf = (value: number | undefined, fallback: number): number =>
  typeof value === "number" ? round2(value * unitScale.value) : fallback;

// 虚线：给了字符串就用它，`true` 用默认虚线，`false`/没给用实线
const dashOf = (dashed: boolean | string | undefined, fallback: string): string =>
  typeof dashed === "string" ? dashed : dashed === true ? fallback : "none";

const pointAt = computed(() => {
  if (!point) return null;
  const { screenX, screenY } = layout.value;

  return {
    x: round2(screenX(cutoff(point.x, Math.max(xMax, 0.001)))),
    y: round2(screenY(cutoff(point.y, Math.max(yMax, 0.001)))),
  };
});

const guideLines = computed(() => {
  if (!point || !pointAt.value || !guides) return [];
  const { plot, sizes } = layout.value;
  const option: GuideOption = typeof guides === "object" ? guides : {};
  const style = {
    stroke: option.color ?? "var(--c-text-dim)",
    strokeWidth: round2(sizes.axisLine * 0.75),
    strokeDasharray:
      typeof option.dashed === "string"
        ? option.dashed
        : option.dashed === false
          ? "none"
          : sizes.guideDash,
    strokeLinecap: "round",
    opacity: 0.9,
  } as Record<string, string | number>;

  return [
    {
      key: "sx-guide-y",
      x1: pointAt.value.x,
      y1: pointAt.value.y,
      x2: pointAt.value.x,
      y2: plot.bottom,
      style,
    },
    {
      key: "sx-guide-x",
      x1: pointAt.value.x,
      y1: pointAt.value.y,
      x2: plot.left,
      y2: pointAt.value.y,
      style,
    },
  ];
});

const pointItem = computed(() => {
  if (!point || !pointAt.value) return null;
  const { sizes } = layout.value;
  const side = point.labelAt ?? "top-right";
  const isTop = side.startsWith("top");
  const isLeft = side.endsWith("left");
  const font = point.text || point.math ? sizes.label : 0;
  const inset = round2(font * 0.5);

  return {
    dotX: pointAt.value.x,
    dotY: pointAt.value.y,
    dotRadius:
      typeof point.dot === "number"
        ? point.dot
        : point.dot === false
          ? 0
          : round2(sizes.curve * 1.7),
    dotColor: point.color ?? "var(--c-accent)",
    labelX: round2(pointAt.value.x + (isLeft ? -inset : inset) + (point.dx ? svgPx(point.dx) : 0)),
    labelY: round2(pointAt.value.y + (isTop ? -inset : inset) + (point.dy ? svgPx(point.dy) : 0)),
    anchor: isLeft ? "end" : "start",
    baseline: isTop ? "auto" : "hanging",
    font,
    subFont: round2(font * 0.72),
    unitFont: round2(font * 0.68),
    supFont: round2(font * 0.5),
    subShift: round2(font * 0.18),
    unitGap: round2(font * 0.22),
    halo: point.halo !== false,
    haloWidth: Math.max(2, round2(font * 0.16)),
    color: point.color ?? "var(--c-text)",
    text: point.text,
    math: point.math,
    sub: point.sub,
    unit: point.unit,
    sup: point.sup,
  };
});

const curveItems = computed(() =>
  curves
    .map((curve, index) => {
      const { screenX, screenY, sizes } = layout.value;
      const samples = Math.max(2, Math.min(Math.round(curve.samples ?? 96), 600));
      const spanX = Math.max(Math.abs(xMax), 0.001);
      const points: Point[] = curve.formula
        ? Array.from({ length: samples + 1 }, (_, step) => {
            const x = (spanX * step) / samples;

            return { x, y: curve.formula?.(x) ?? Number.NaN };
          }).filter((item) => Number.isFinite(item.y))
        : (curve.points ?? []);
      const d =
        points.length < 2
          ? ""
          : `M ${points
              .map((item) => `${round2(screenX(item.x))} ${round2(screenY(item.y))}`)
              .join(" L ")}`;

      return {
        key: `sx-curve-${index}`,
        d,
        style: {
          fill: "none",
          stroke: curve.color ?? CURVE_PALETTE[index % CURVE_PALETTE.length],
          strokeWidth: lineWidthOf(curve.width, sizes.curve),
          strokeDasharray: dashOf(curve.dashed, sizes.dash),
          strokeLinecap: "round",
        } as Record<string, string | number>,
      };
    })
    .filter((item) => item.d !== ""),
);

const clipId = `simple-axis-clip-${useId()}`;

const ariaLabel = computed(() => {
  const xName = xAxis.quantity ? `${xAxis.quantity} ${xAxis.unit ?? ""}`.trim() : "横轴";
  const yName = yAxis.quantity ? `${yAxis.quantity} ${yAxis.unit ?? ""}`.trim() : "纵轴";

  return `演示坐标图（${xName} — ${yName}）`;
});
</script>

<template>
  <div ref="wrapRef" class="simple-axis">
    <svg
      class="simple-axis-svg"
      :viewBox="`0 0 ${layout.width} ${layout.height}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="ariaLabel"
    >
      <defs>
        <clipPath :id="clipId">
          <rect
            :x="layout.plot.left"
            :y="layout.plot.top"
            :width="layout.plot.right - layout.plot.left"
            :height="layout.plot.bottom - layout.plot.top"
          />
        </clipPath>
      </defs>
      <g
        stroke="var(--c-text-dim)"
        :stroke-width="layout.sizes.axisLine"
        stroke-opacity="0.72"
        stroke-linecap="round"
      >
        <line
          :x1="layout.plot.left"
          :y1="layout.plot.bottom"
          :x2="layout.plot.right"
          :y2="layout.plot.bottom"
        />
        <line
          :x1="layout.plot.left"
          :y1="layout.plot.bottom"
          :x2="layout.plot.left"
          :y2="layout.plot.top"
        />
      </g>
      <g v-if="ticks.arrows !== false" fill="var(--c-text-dim)" opacity="0.72">
        <path :d="axisArrows.x" />
        <path :d="axisArrows.y" />
      </g>
      <g
        stroke="var(--c-text-dim)"
        :stroke-width="layout.sizes.axisLine * 0.8"
        stroke-opacity="0.6"
      >
        <line
          v-for="mark in xTicks"
          :key="mark.key"
          :x1="mark.x"
          :y1="mark.from"
          :x2="mark.x"
          :y2="mark.to"
        />
        <line
          v-for="mark in yTicks"
          :key="mark.key"
          :x1="mark.from"
          :y1="mark.y"
          :x2="mark.to"
          :y2="mark.y"
        />
      </g>
      <g v-if="ticks.labels !== false" :font-size="layout.sizes.tick" fill="var(--c-text-dim)">
        <text
          v-for="mark in xTicks"
          :key="mark.key"
          :x="mark.x"
          :y="mark.labelY"
          text-anchor="middle"
        >
          {{ mark.label }}
        </text>
        <text
          v-for="mark in yTicks"
          :key="mark.key"
          :x="mark.labelX"
          :y="mark.labelY"
          text-anchor="end"
        >
          {{ mark.label }}
        </text>
      </g>
      <g v-if="originLabel" :font-size="originLabel.font" fill="var(--c-text-dim)">
        <text
          :x="originLabel.x"
          :y="originLabel.y"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          O
        </text>
      </g>
      <g fill="var(--c-text)">
        <text
          v-for="axis in axisLabels"
          :key="axis.key"
          :x="axis.x"
          :y="axis.y"
          :text-anchor="axis.anchor"
        >
          <tspan font-family="KaTeX_Math" font-style="italic" :font-size="axis.font">
            {{ axis.quantity }}
          </tspan>
          <tspan
            v-if="axis.sub"
            font-family="KaTeX_Main"
            :font-size="axis.subFont"
            :dy="axis.subShift"
          >
            {{ axis.sub }}
          </tspan>
          <tspan
            v-if="axis.unit"
            font-family="KaTeX_Main"
            :font-size="axis.unitFont"
            :dy="axis.sub ? -axis.subShift : 0"
            :dx="needsUnitGap(axis.unit) ? axis.unitGap : 0"
          >
            {{ axis.unit }}
          </tspan>
          <tspan
            v-if="axis.sup"
            font-family="KaTeX_Main"
            :font-size="axis.supFont"
            :dy="-axis.subShift"
          >
            {{ axis.sup }}
          </tspan>
        </text>
      </g>
      <g>
        <line
          v-for="guide in guideLines"
          :key="guide.key"
          :x1="guide.x1"
          :y1="guide.y1"
          :x2="guide.x2"
          :y2="guide.y2"
          :style="guide.style"
        />
      </g>
      <g :clip-path="`url(#${clipId})`">
        <path
          v-for="curve in curveItems"
          :key="curve.key"
          :d="curve.d"
          :style="curve.style"
          stroke-linejoin="round"
        />
      </g>
      <g class="simple-axis-overlay">
        <slot
          name="overlay"
          :x="layout.screenX"
          :y="layout.screenY"
          :plot="layout.plot"
          :px2user="unitScale"
          :width="box.width"
          :height="box.height"
        />
      </g>
      <g v-if="pointItem">
        <circle
          v-if="pointItem.dotRadius > 0"
          :cx="pointItem.dotX"
          :cy="pointItem.dotY"
          :r="pointItem.dotRadius"
          :style="{ fill: pointItem.dotColor }"
        />
        <text
          v-if="pointItem.font > 0"
          :x="pointItem.labelX"
          :y="pointItem.labelY"
          :font-size="pointItem.font"
          :text-anchor="pointItem.anchor"
          :dominant-baseline="pointItem.baseline"
          :style="{ fill: pointItem.color }"
          :stroke="pointItem.halo ? 'var(--c-bg-soft)' : 'none'"
          :stroke-width="pointItem.halo ? pointItem.haloWidth : 0"
          :paint-order="pointItem.halo ? 'stroke' : 'normal'"
        >
          <tspan v-if="pointItem.math" font-family="KaTeX_Math" font-style="italic">
            {{ pointItem.math }}
          </tspan>
          <tspan
            v-if="pointItem.sub"
            font-family="KaTeX_Main"
            :font-size="pointItem.subFont"
            :dy="pointItem.subShift"
          >
            {{ pointItem.sub }}
          </tspan>
          <tspan v-if="pointItem.text" :dy="pointItem.sub ? -pointItem.subShift : 0">
            {{ pointItem.text }}
          </tspan>
          <tspan
            v-if="pointItem.unit"
            font-family="KaTeX_Main"
            :font-size="pointItem.unitFont"
            :dy="pointItem.sub && !pointItem.text ? -pointItem.subShift : 0"
            :dx="pointItem.unitGap"
          >
            {{ pointItem.unit }}
          </tspan>
          <tspan
            v-if="pointItem.sup"
            font-family="KaTeX_Main"
            :font-size="pointItem.supFont"
            :dy="-pointItem.subShift"
          >
            {{ pointItem.sup }}
          </tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.simple-axis {
  width: 100%;
  min-width: 0;
}

.simple-axis-svg {
  display: block;
  overflow: visible;
  width: 100%;
  height: auto;
}
</style>
