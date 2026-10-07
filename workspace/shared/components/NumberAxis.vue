<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

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
  tickLength: 9,
  head: 14,
  axisLine: 1.8,
  calloutRise: 30,
};

const round2 = (value: number): number => Math.round(value * 100) / 100;
const tidy = (value: number): number => Number(value.toFixed(6));

const STEP_CANDIDATES = [
  0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000,
];

// 估算一段文字占多宽（用户单位）：KaTeX 字体平均字宽约 0.55 em
const estimateWidth = (content: string, font: number): number => content.length * 0.55 * font;

// 刻度值文本：负数用排版减号 −
const formatTick = (value: number): string => {
  const rounded = Number(value.toFixed(2));

  return `${rounded < 0 ? "−" : ""}${Math.abs(rounded)}`;
};

// 取“好看”的刻度步长：让露出来的刻度不超过 maxCount 个
const pickStep = (from: number, to: number, maxCount: number, skipZero: boolean): number => {
  const span = Math.max(to - from, 0.001);

  return (
    STEP_CANDIDATES.find((candidate) => {
      const count = Math.floor(span / candidate + 1e-9) + 1;

      return count - (skipZero && from <= 0 && to >= 0 ? 1 : 0) <= maxCount;
    }) ?? span / maxCount
  );
};

// 取范围内步长整数倍的刻度值；`skipZero` 时不画 0（0 交给原点 O）
const buildTicks = (from: number, to: number, step: number, skipZero: boolean): number[] => {
  const values: number[] = [];
  const start = Math.ceil(from / step - 1e-9);

  for (let index = start; index * step <= to + 1e-9; index += 1) {
    const value = tidy(index * step);

    if (skipZero && value === 0) continue;
    values.push(value);
  }

  return values;
};

interface AxisOption {
  /** 物理量符号（`KaTeX_Math` 斜体），如 `"t"` */
  quantity?: string;
  /** 量的下标（`KaTeX_Main` 下沉），如 `"1"`；不要写 Unicode 下标 */
  sub?: string;
  /** 单位（`KaTeX_Main`），如 `"min"`、`"m/s"`；不要写 Unicode 上标 */
  unit?: string;
  /** 单位的上标（`KaTeX_Main` 小字号上抬），如 `"2"`、`"-1"` */
  sup?: string;
  /** 量标签位置：`"right"` 贴在轴右端右侧（默认），`"above"` 贴在右端上方（省宽度） */
  side?: "right" | "above";
}

interface TickOption {
  /** 刻度步长（数据单位）；不传自动取 */
  step?: number;
  /** 直接给刻度值，给了就忽略 step */
  values?: number[];
  /** 画刻度数字，默认开 */
  labels?: boolean;
  /** 每个刻度上画个圆点（纸带打点风格），默认关 */
  dots?: boolean;
  /** 轴末端箭头，默认开 */
  arrows?: boolean;
  /** 0 处画原点 `O`（同时把 0 从刻度数字里去掉），默认关 */
  origin?: boolean;
}

interface Callout {
  /** 挂在轴上的位置（数据坐标） */
  value: number;
  /** 普通文字（系统字体）：中文、字母 */
  text?: string;
  /** 物理量符号（`KaTeX_Math` 斜体），如 `"x"` */
  math?: string;
  /** 下标（`KaTeX_Main` 下沉）；不要写 Unicode 下标 */
  sub?: string;
  /** 单位（`KaTeX_Main`），如 `"s"` */
  unit?: string;
  /** 单位上标（`KaTeX_Main` 上抬），如 `"2"` */
  sup?: string;
  /** 虚线往哪边连：`"above"`（默认，向上）/ `"below"`（向下） */
  side?: "above" | "below";
  /** 文字与圆点颜色，默认 `var(--c-text)` */
  color?: string;
  /** 在默认位置基础上再偏移（屏幕 px 口径） */
  dx?: number;
  dy?: number;
  /** 虚线样式；`false` 用实线，`true`/不传用默认虚线 */
  dashed?: boolean | string;
}

interface ViewOption {
  /** ViewBox 宽，默认 640（只决定比例与坐标系） */
  width?: number;
  /** ViewBox 高，默认 140；有 callout 时给足（渲染高 ≈ 容器宽 × 高 ÷ 宽） */
  height?: number;
}

const {
  axis = {},
  range = [0, 10],
  ticks = {},
  callouts = [],
  view = {},
  fontScale = 1,
} = defineProps<{
  /** 轴的量与单位（画在轴右端） */
  axis?: AxisOption;
  /** 轴的范围 `[最小值, 最大值]`，默认 `[0, 10]` */
  range?: [number, number];
  /** 刻度：步长 / 显式刻度值 / 数字与圆点 / 箭头 / 原点 */
  ticks?: TickOption;
  /** 从轴上某个点向上（或向下）连一条虚线，末端放文字 */
  callouts?: Callout[];
  /** ViewBox 尺寸（只决定比例） */
  view?: ViewOption;
  /** 字号 / 线宽整体倍率，默认 1 */
  fontScale?: number;
}>();

// 自定义装饰插槽（轴上的有向线段、端点圆点、竖直虚线…）：按 viewBox 用户单位作图，**不裁剪**
defineSlots<{
  overlay?: (props: {
    /** 数据坐标 → viewBox 用户单位（只有横轴） */
    x: (value: number) => number;
    /** 轴的可用区间（viewBox 用户单位）：`{ left, right }`，纵向用 `axisY` */
    plot: { left: number; right: number };
    /** 轴线在 viewBox 用户单位下的 y */
    axisY: number;
    /** 1 屏幕 px 等于多少 viewBox 用户单位（写"离轴 20px"这类偏移时乘它） */
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
  height: view.height ?? 140,
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
  axisLine: svgPx(TARGET_PX.axisLine),
  rise: svgPx(TARGET_PX.calloutRise),
  dash: `${svgPx(7)} ${svgPx(5)}`,
  calloutDash: `${svgPx(6)} ${svgPx(5)}`,
}));

const domain = computed(() => {
  const [from, to] = range;
  const low = Number.isFinite(from) ? from : 0;
  const high = Number.isFinite(to) && to > low ? to : low + 1;

  return { from: low, to: high };
});

const resolvedTicks = computed(() => {
  const { from, to } = domain.value;
  const skipZero = ticks.origin === true;
  const step = ticks.step ?? pickStep(from, to, 6, skipZero);

  return {
    values: ticks.values ?? buildTicks(from, to, step, skipZero),
    origin: skipZero && from <= 0 && to >= 0,
    dots: ticks.dots === true,
    labels: ticks.labels !== false,
    arrows: ticks.arrows !== false,
  };
});

const layout = computed(() => {
  const { width, height } = box.value;
  const sizes = chrome.value;
  const { from, to } = domain.value;
  const hasAbove = callouts.some((callout) => (callout.side ?? "above") === "above");
  const hasBelow = callouts.some((callout) => callout.side === "below");
  const labelRoom = sizes.label * 1.3;
  const tickRow = sizes.tickLength * 0.5 + sizes.tick * 1.35;
  const aboveRoom = hasAbove ? sizes.rise + labelRoom : 0;
  const belowRoom = tickRow + (hasBelow ? sizes.rise + labelRoom : 0);
  // 两端要给“最宽的刻度数字”和“最宽 callout 文字”的一半留位置，否则文字会画出画布外
  const tickHalf =
    Math.max(
      ...resolvedTicks.value.values.map((value) => formatTick(value).length),
      resolvedTicks.value.origin ? 1 : 0,
      1,
    ) *
    0.5 *
    0.55 *
    sizes.tick;
  const calloutHalf = callouts.reduce(
    (max, callout) =>
      Math.max(
        max,
        estimateWidth(callout.text ?? "", sizes.label) * 0.5 +
          estimateWidth(callout.math ?? "", sizes.label) * 0.5,
      ),
    0,
  );
  const edgeRoom = Math.max(tickHalf, calloutHalf);
  const axisLabelWidth = axis.quantity
    ? estimateWidth(axis.quantity, sizes.axis * 0.62) +
      estimateWidth(axis.unit ?? "", sizes.unit) +
      estimateWidth(axis.sup ?? "", sizes.unit * 0.75)
    : 0;
  const labelAtRight = (axis.side ?? "right") === "right";
  const padLeft = sizes.gap + edgeRoom;
  const padRight =
    sizes.gap + edgeRoom + (labelAtRight && axis.quantity ? axisLabelWidth + sizes.gap : 0);
  const plot = {
    left: round2(padLeft),
    right: round2(width - padRight),
  };
  const span = to - from || 1;
  const screenX = (value: number): number =>
    plot.left + ((value - from) / span) * (plot.right - plot.left);
  const lower = sizes.gap + aboveRoom;
  const upper = height - sizes.gap - belowRoom;
  const wanted = sizes.gap + (height - sizes.gap * 2) * (hasAbove || hasBelow ? 0.62 : 0.55);
  const axisY =
    upper >= lower ? round2(Math.min(Math.max(wanted, lower), upper)) : round2(height / 2);

  return {
    width,
    height,
    sizes,
    plot,
    screenX,
    axisY,
    labelAtRight,
    axisLabelWidth,
  };
});

const axisArrow = computed(() => {
  const { plot, sizes, axisY } = layout.value;
  const { head } = sizes;

  return {
    x: `M ${round2(plot.right - head)} ${round2(axisY - head * 0.45)} L ${plot.right} ${axisY} L ${round2(plot.right - head)} ${round2(axisY + head * 0.45)} Z`,
    right: plot.right,
    y: axisY,
  };
});

const axisLabel = computed(() => {
  if (!axis.quantity) return null;
  const { plot, sizes, axisY, labelAtRight } = layout.value;

  return {
    x: round2(labelAtRight ? plot.right + sizes.gap : plot.right),
    y: round2(labelAtRight ? axisY + sizes.axis * 0.34 : axisY - sizes.axis * 0.5),
    anchor: labelAtRight ? "start" : "end",
    font: sizes.axis,
    unitFont: sizes.unit,
    subFont: round2(sizes.axis * 0.72),
    supFont: round2(sizes.unit * 0.75),
    subShift: round2(sizes.axis * 0.18),
    unitGap: round2(sizes.axis * 0.22),
    quantity: axis.quantity,
    sub: axis.sub,
    unit: axis.unit ? normalizeUnit(axis.unit) : "",
    sup: axis.sup,
  };
});

const tickItems = computed(() => {
  const { screenX, axisY, sizes } = layout.value;

  return resolvedTicks.value.values.map((value) => ({
    key: `na-tick-${value}`,
    value,
    label: resolvedTicks.value.labels ? formatTick(value) : "",
    x: round2(screenX(value)),
    dotRadius: resolvedTicks.value.dots ? round2(sizes.axisLine * 1.3) : 0,
    labelY: round2(axisY + sizes.tickLength * 0.5 + sizes.tick * 1.35),
  }));
});

const originMark = computed(() => {
  if (!resolvedTicks.value.origin) return null;
  const { screenX, axisY, sizes } = layout.value;

  return {
    x: round2(screenX(0)),
    y: round2(axisY + sizes.tickLength * 0.5 + sizes.origin * 1.05),
    font: sizes.origin,
  };
});

const calloutItems = computed(() =>
  callouts.map((callout, index) => {
    const { screenX, axisY, sizes } = layout.value;
    const { from, to } = domain.value;
    const value = Math.min(Math.max(callout.value, from), to);
    const isAbove = (callout.side ?? "above") === "above";
    const lineEnd = round2(isAbove ? axisY - sizes.rise : axisY + sizes.rise);
    const font = sizes.label;

    return {
      key: `na-callout-${index}`,
      x: round2(screenX(value)),
      lineFrom: axisY,
      lineEnd,
      style: {
        stroke: callout.color ?? "var(--c-text-dim)",
        strokeWidth: sizes.axisLine * 0.75,
        strokeDasharray:
          typeof callout.dashed === "string"
            ? callout.dashed
            : callout.dashed === false
              ? "none"
              : sizes.calloutDash,
        strokeLinecap: "round",
        opacity: 0.9,
      } as Record<string, string | number>,
      dotStyle: { fill: callout.color ?? "var(--c-accent)" } as Record<string, string>,
      dotRadius: round2(sizes.axisLine * 1.4),
      textX: round2(screenX(value) + (callout.dx ? svgPx(callout.dx) : 0)),
      textY: round2(
        (isAbove ? lineEnd - font * 0.35 : lineEnd + sizes.gap * 0.35) +
          (callout.dy ? svgPx(callout.dy) : 0),
      ),
      baseline: isAbove ? "auto" : "hanging",
      font,
      subFont: round2(font * 0.72),
      unitFont: round2(font * 0.68),
      supFont: round2(font * 0.5),
      subShift: round2(font * 0.18),
      unitGap: round2(font * 0.22),
      color: callout.color ?? "var(--c-text)",
      text: callout.text,
      math: callout.math,
      sub: callout.sub,
      unit: callout.unit,
      sup: callout.sup,
    };
  }),
);

const ariaLabel = computed(() => {
  const name = axis.quantity ? `${axis.quantity} ${axis.unit ?? ""}`.trim() : "数轴";

  return `一维坐标轴（${name}）`;
});
</script>

<template>
  <div ref="wrapRef" class="number-axis">
    <svg
      class="number-axis-svg"
      :viewBox="`0 0 ${layout.width} ${layout.height}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="ariaLabel"
    >
      <line
        :x1="layout.plot.left"
        :y1="layout.axisY"
        :x2="layout.plot.right"
        :y2="layout.axisY"
        stroke="var(--c-text-dim)"
        :stroke-width="layout.sizes.axisLine"
        stroke-opacity="0.72"
        stroke-linecap="round"
      />
      <path v-if="resolvedTicks.arrows" :d="axisArrow.x" fill="var(--c-text-dim)" opacity="0.72" />
      <g
        stroke="var(--c-text-dim)"
        :stroke-width="layout.sizes.axisLine * 0.8"
        stroke-opacity="0.6"
      >
        <line
          v-for="mark in tickItems"
          :key="mark.key"
          :x1="mark.x"
          :y1="layout.axisY - layout.sizes.tickLength * 0.5"
          :x2="mark.x"
          :y2="layout.axisY + layout.sizes.tickLength * 0.5"
        />
      </g>
      <g v-if="resolvedTicks.dots" fill="var(--c-text-dim)">
        <circle
          v-for="mark in tickItems"
          :key="mark.key"
          :cx="mark.x"
          :cy="layout.axisY"
          :r="mark.dotRadius"
        />
      </g>
      <g :font-size="layout.sizes.tick" fill="var(--c-text-dim)">
        <text
          v-for="mark in tickItems"
          :key="mark.key"
          :x="mark.x"
          :y="mark.labelY"
          text-anchor="middle"
        >
          {{ mark.label }}
        </text>
      </g>
      <g v-if="originMark" :font-size="originMark.font" fill="var(--c-text-dim)">
        <text
          :x="originMark.x"
          :y="originMark.y"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          O
        </text>
      </g>
      <g v-if="axisLabel" fill="var(--c-text)">
        <text :x="axisLabel.x" :y="axisLabel.y" :text-anchor="axisLabel.anchor">
          <tspan font-family="KaTeX_Math" font-style="italic" :font-size="axisLabel.font">
            {{ axisLabel.quantity }}
          </tspan>
          <tspan
            v-if="axisLabel.sub"
            font-family="KaTeX_Main"
            :font-size="axisLabel.subFont"
            :dy="axisLabel.subShift"
          >
            {{ axisLabel.sub }}
          </tspan>
          <tspan
            v-if="axisLabel.unit"
            font-family="KaTeX_Main"
            :font-size="axisLabel.unitFont"
            :dy="axisLabel.sub ? -axisLabel.subShift : 0"
            :dx="needsUnitGap(axisLabel.unit) ? axisLabel.unitGap : 0"
          >
            {{ axisLabel.unit }}
          </tspan>
          <tspan
            v-if="axisLabel.sup"
            font-family="KaTeX_Main"
            :font-size="axisLabel.supFont"
            :dy="-axisLabel.subShift"
          >
            {{ axisLabel.sup }}
          </tspan>
        </text>
      </g>
      <g class="number-axis-overlay">
        <slot
          name="overlay"
          :x="layout.screenX"
          :plot="layout.plot"
          :axis-y="layout.axisY"
          :px2user="unitScale"
          :width="box.width"
          :height="box.height"
        />
      </g>
      <g>
        <template v-for="callout in calloutItems" :key="callout.key">
          <line
            :x1="callout.x"
            :y1="callout.lineFrom"
            :x2="callout.x"
            :y2="callout.lineEnd"
            :style="callout.style"
          />
          <circle
            :cx="callout.x"
            :cy="callout.lineFrom"
            :r="callout.dotRadius"
            :style="callout.dotStyle"
          />
          <text
            :x="callout.textX"
            :y="callout.textY"
            :font-size="callout.font"
            text-anchor="middle"
            :dominant-baseline="callout.baseline"
            :style="{ fill: callout.color }"
          >
            <tspan v-if="callout.math" font-family="KaTeX_Math" font-style="italic">
              {{ callout.math }}
            </tspan>
            <tspan
              v-if="callout.sub"
              font-family="KaTeX_Main"
              :font-size="callout.subFont"
              :dy="callout.subShift"
            >
              {{ callout.sub }}
            </tspan>
            <tspan v-if="callout.text" :dy="callout.sub ? -callout.subShift : 0">
              {{ callout.text }}
            </tspan>
            <tspan
              v-if="callout.unit"
              font-family="KaTeX_Main"
              :font-size="callout.unitFont"
              :dy="callout.sub && !callout.text ? -callout.subShift : 0"
              :dx="callout.unitGap"
            >
              {{ callout.unit }}
            </tspan>
            <tspan
              v-if="callout.sup"
              font-family="KaTeX_Main"
              :font-size="callout.supFont"
              :dy="-callout.subShift"
            >
              {{ callout.sup }}
            </tspan>
          </text>
        </template>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.number-axis {
  width: 100%;
  min-width: 0;
}

.number-axis-svg {
  display: block;
  overflow: visible;
  width: 100%;
  height: auto;
}
</style>
