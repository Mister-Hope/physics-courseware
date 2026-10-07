<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from "vue";

import ChartLabel from "./ChartLabel.vue";
import { axisMathParts, labelParts, needsUnitGap, normalizeUnit } from "./label-text";
import type { ChartLabelPart } from "./label-text";

const NOMINAL_RENDER_WIDTH = 884; // SSR / 首帧拿不到容器宽度时的标定宽度（整页正文栏约 884px）

const round2 = (value: number): number => Math.round(value * 100) / 100;
const tidy = (value: number): number => Number(value.toFixed(6));

const STEP_CANDIDATES = [
  0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000,
];

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
  const start = Math.ceil(from / step - 1e-9);
  const count = Math.max(0, Math.floor(to / step + 1e-9) - start + 1);

  return Array.from({ length: count }, (_, index) => tidy((start + index) * step)).filter(
    (value) => !skipZero || value !== 0,
  );
};

const clamp = (value: number, from: number, to: number): number =>
  Math.min(Math.max(value, from), to);

// 点标注锚点 = 文字相对该点所在的方位（默认中心，压在点上）——方向与平移换算见 `ChartLabel.vue`，
// 文字（KaTeX / 中文混排）的规整与拼装见 `label-text.ts`

/** 数据坐标点（物理量数值，不是屏幕像素） */
interface Point {
  x: number;
  y: number;
}

/** `[最小值, 最大值]`：横纵两轴各自独立，不必对称 */
type Range = [number, number];

interface AxisOption {
  /** 物理量符号（`KaTeX_Math` 斜体），如 `"t"` */
  quantity?: string;
  /** 量的下标（`KaTeX_Main` 下沉），如 `"0"`；不要写 Unicode 下标 */
  sub?: string;
  /** 单位（`KaTeX_Main`），如 `"m/s"`；不要写 Unicode 上标 */
  unit?: string;
  /** 单位的上标（`KaTeX_Main` 小字号上抬），如 `"2"`、`"-1"` */
  sup?: string;
  /** 标签位置：横轴 `"below"`（默认）/ `"above"`；纵轴 `"left"`（默认）/ `"right"` */
  side?: "above" | "below" | "left" | "right";
  /** 标签额外横向微调（屏幕 px 口径） */
  dx?: number;
  /** 标签额外纵向微调（屏幕 px 口径） */
  dy?: number;
}

interface Curve {
  /** 折线/直线：两点就是直线，多点就是折线 */
  points?: Point[];
  /** 函数曲线，在横轴范围内采样，例如 `(x) => 2 + 1.5 * x` */
  formula?: (x: number) => number;
  /** 采样段数，默认 96 */
  samples?: number;
  /** 线色，默认 `var(--c-accent)` */
  stroke?: string;
  /** 线宽（屏幕 px 口径），默认 3 */
  width?: number;
  /** `true` 用默认虚线，也可以直接写 `"8 5"` */
  dashed?: boolean | string;
  opacity?: number;
  /** 第几次点击之后才出现（配 `step`） */
  showAt?: number;
}

interface Area {
  /** 多边形顶点（梯形就是 4 个点），按顺序给 */
  points: Point[];
  /** 填充色，默认 `var(--c-accent)` */
  fill?: string;
  /** 填充不透明度，默认 0.22 */
  fillOpacity?: number;
  /** 描边色；不传不描边 */
  stroke?: string;
  /** 描边宽（屏幕 px 口径） */
  width?: number;
  dashed?: boolean | string;
  opacity?: number;
  showAt?: number;
}

/** 文字相对标注点的方位 */
type LabelAnchor =
  | "center"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface PointLabel {
  /** 标注点（数据坐标） */
  x: number;
  y: number;
  /**
   * 标注内容（KaTeX 源码），**推荐写法**：`tex: "v_0"`、`tex: "\\frac{1}{2}at^2"`。
   *
   * 图内标注走 HTML 覆盖层 + 真 KaTeX，所以分式、上下标、单位都能正常排版——不要写 Unicode `½`、`v₀`。
   */
  tex?: string;
  /**
   * 任意顺序混排 KaTeX 与普通文字，如 `[{ text: "剪掉" }, { tex: "-32\\ \\text{m}" }]`
   *
   * 给了 `parts` 就忽略下面的 `tex` / `math` / `text` / `unit` 简写字段。
   */
  parts?: ChartLabelPart[];
  /** 普通文字（系统字体）：中文、点名 */
  text?: string;
  /** 物理量符号 + 下标的**简写**（`math: "v", sub: "0"` 等价于 `tex: "v_0"`）@deprecated 直接用 `tex` */
  math?: string;
  /** 下标简写（配 `math`）@deprecated 改用 `tex: "v_0"` */
  sub?: string;
  /** 单位简写（配 `math`/`text`）@deprecated 改用 `tex: "\\text{m/s}"` */
  unit?: string;
  /** 单位上标简写（配 `unit`）@deprecated 改用 `tex: "\\text{m/s}^2"` */
  sup?: string;
  /** 文字画在点的哪个方位，默认 `"center"`（压在点上） */
  anchor?: LabelAnchor;
  /** 方位之外再偏移（屏幕 px 口径） */
  dx?: number;
  dy?: number;
  /** 字号（屏幕 px 口径），默认 17 */
  size?: number;
  /** 文字色，默认 `var(--c-text)` */
  color?: string;
  /** 加深色描边光晕，默认关 */
  halo?: boolean;
  /** 在标注点画圆点：`true` 用默认半径，也可以给具体半径（屏幕 px 口径） */
  dot?: boolean | number;
  dotColor?: string;
  showAt?: number;
}

/** 刻度短线方向：`in` 伸向图内（默认）、`out` 伸向图外、`cross` 骑在轴上 */
type TickDirection = "in" | "out" | "cross";

interface TickOption {
  /** 横轴刻度值（数据坐标）；不传按范围自动取整步长，且不画 0 */
  x?: number[];
  /** 纵轴刻度值（数据坐标）；不传自动取 */
  y?: number[];
  /** 画刻度数字，默认开；`false` 只画刻度短线（原图有刻度线但不写数字时用） */
  labels?: boolean;
  /** 画网格线，默认关 */
  grid?: boolean;
  /** 网格步长；不传跟自动刻度步长 */
  gridStep?: number;
  /** 轴末端箭头，默认开 */
  arrows?: boolean;
  /** 原点 `O` 标注，默认开（0 不在范围内时不画） */
  origin?: boolean;
  direction?: TickDirection;
}

interface ViewOption {
  /** ViewBox 宽，默认 640（只决定比例与坐标系，不改屏幕字号） */
  width?: number;
  /** ViewBox 高，默认 380（渲染高 ≈ 容器宽 × 高 ÷ 宽） */
  height?: number;
}

const {
  xRange = [0, 6],
  yRange = [0, 10],
  xAxis = {},
  yAxis = {},
  curves = [],
  areas = [],
  labels = [],
  ticks = {},
  view = {},
  fontScale = 1,
  step = Number.POSITIVE_INFINITY,
} = defineProps<{
  /** 横轴范围 `[最小值, 最大值]`，默认 `[0, 6]`；可以和纵轴完全不对称 */
  xRange?: Range;
  /** 纵轴范围 `[最小值, 最大值]`，默认 `[0, 10]` */
  yRange?: Range;
  /** 横轴的量 / 单位 / 标签位置 */
  xAxis?: AxisOption;
  /** 纵轴的量 / 单位 / 标签位置 */
  yAxis?: AxisOption;
  /** 若干条曲线（实线/虚线、颜色、线宽） */
  curves?: Curve[];
  /** 若干块区域填充（多边形 / 梯形） */
  areas?: Area[];
  /** 若干处点标注（文字 / 圆点） */
  labels?: PointLabel[];
  /** 刻度 / 网格 / 箭头 / 原点开关 */
  ticks?: TickOption;
  /** ViewBox 尺寸（只决定比例） */
  view?: ViewOption;
  /** 字号 / 线宽整体倍率，默认 1 */
  fontScale?: number;
  /** 当前点击步数（传 `$clicks`），配各元素的 `showAt` 分步出现 */
  step?: number;
}>();

// 轴外装饰插槽（尺寸线 / 括号 / 引线）：按 viewBox 用户单位作图，**不裁剪**，见模板里的 `<slot name="overlay">`
defineSlots<{
  overlay?: (props: {
    /** 数据坐标 x → viewBox 用户单位 */
    x: (value: number) => number;
    /** 数据坐标 y → viewBox 用户单位 */
    y: (value: number) => number;
    /** 绘图区四边（viewBox 用户单位） */
    plot: { left: number; right: number; top: number; bottom: number };
    /** 1 屏幕 px 等于多少 viewBox 用户单位（写轴外偏移时乘它） */
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

const box = computed(() => ({ width: view.width ?? 640, height: view.height ?? 380 }));

// 1 用户单位 = 屏幕上多少 px；字号按它反算，换栏位不用重算
const unitScale = computed(() => {
  const rendered = renderWidth.value > 0 ? renderWidth.value : NOMINAL_RENDER_WIDTH;

  return box.value.width / rendered;
});

const svgPx = (target: number): number => round2(target * fontScale * unitScale.value);

// 屏幕目标尺寸（px）：轴量 21 / 刻度 15 / 标注 17 / 线宽 3，fontScale 与实测宽度再折算
const chrome = computed(() => ({
  axis: svgPx(21),
  unit: svgPx(21 * 0.68),
  tick: svgPx(15),
  origin: svgPx(17),
  gap: svgPx(9),
  tickLength: svgPx(8),
  head: svgPx(14),
  curve: svgPx(3),
  areaStroke: svgPx(1.8),
  dot: svgPx(5),
  axisLine: svgPx(1.8),
  dash: `${svgPx(10)} ${svgPx(6)}`,
}));

/** 横纵范围各自独立取整（不允许 min ≥ max） */
const domain = computed(() => {
  const [xFrom, xTo] = xRange;
  const [yFrom, yTo] = yRange;
  const xLow = Number.isFinite(xFrom) ? xFrom : 0;
  const yLow = Number.isFinite(yFrom) ? yFrom : 0;

  return {
    xMin: xLow,
    xMax: Number.isFinite(xTo) && xTo > xLow ? xTo : xLow + 1,
    yMin: yLow,
    yMax: Number.isFinite(yTo) && yTo > yLow ? yTo : yLow + 1,
  };
});

const resolvedTicks = computed(() => {
  const { xMin, xMax: xTo, yMin, yMax: yTo } = domain.value;
  const skipZero = ticks.origin !== false;

  return {
    x: ticks.x ?? buildTicks(xMin, xTo, pickStep(xMin, xTo, 5, skipZero), skipZero),
    y: ticks.y ?? buildTicks(yMin, yTo, pickStep(yMin, yTo, 5, skipZero), skipZero),
    xStep: ticks.gridStep ?? pickStep(xMin, xTo, 5, true),
    yStep: ticks.gridStep ?? pickStep(yMin, yTo, 5, true),
  };
});

const layout = computed(() => {
  const { width, height } = box.value;
  const sizes = chrome.value;
  const area = domain.value;
  const spanX = area.xMax - area.xMin || 1;
  const spanY = area.yMax - area.yMin || 1;
  const xSide = xAxis.side ?? "below";
  const ySide = yAxis.side ?? "left";
  const yTickWidth =
    Math.max(...resolvedTicks.value.y.map((value) => formatTick(value).length), 1) *
    0.55 *
    sizes.tick;
  // 轴贴在绘图区左/下边缘时，刻度数字要占额外边距；轴在中间时它们压在图上（与既有课件一致）
  const axisAtLeft = area.xMin >= 0;
  const axisAtBottom = area.yMin >= 0;
  const padLeft = sizes.gap + (axisAtLeft ? yTickWidth + sizes.gap * 0.7 : 0);
  const padRight = sizes.gap;
  // 顶部多留一点：纵轴量标签要能躲开正上方那个刻度数字
  const padTop = sizes.gap + sizes.axis * 0.95 + sizes.tick * 0.35;
  const padBottom = axisAtBottom
    ? xSide === "below"
      ? sizes.tickLength + sizes.tick * 1.35 + sizes.axis * 1.2 + sizes.gap * 1.1
      : sizes.tickLength + sizes.tick * 1.7 + sizes.gap * 0.6
    : sizes.gap * 0.8;
  const plot = {
    left: round2(padLeft),
    right: round2(width - padRight),
    top: round2(padTop),
    bottom: round2(height - padBottom),
  };
  const screenX = (x: number): number =>
    plot.left + ((x - area.xMin) / spanX) * (plot.right - plot.left);
  const screenY = (y: number): number =>
    plot.bottom - ((y - area.yMin) / spanY) * (plot.bottom - plot.top);
  // 顶端刻度数字的最上沿；纵轴量标签放在它上面，别叠在一起
  const yTickTop = resolvedTicks.value.y.length
    ? screenY(Math.max(...resolvedTicks.value.y)) - sizes.tick * 0.34
    : plot.top;
  const yLabelBase = round2(Math.min(plot.top - sizes.gap * 0.4, yTickTop - sizes.gap * 0.8));

  return {
    width,
    height,
    sizes,
    plot,
    yLabelBase,
    screenX,
    screenY,
    axisX: round2(screenX(clamp(0, area.xMin, area.xMax))),
    axisY: round2(screenY(clamp(0, area.yMin, area.yMax))),
    yLabelStarts: ySide === "right" || axisAtLeft,
  };
});

const tickSpan = (inward: number, length: number): { from: number; to: number } => {
  const direction = ticks.direction ?? "in";

  if (direction === "cross") return { from: -length / 2, to: length / 2 };

  const sign = direction === "in" ? inward : -inward;

  return { from: 0, to: sign * length };
};

// 分步出现：showAt 之前的元素仍然占位，只改 visibility，不删不插
const visibilityOf = (showAt?: number): "visible" | "hidden" =>
  step >= (showAt ?? 0) ? "visible" : "hidden";

const tickMarks = computed(() => {
  const current = layout.value;
  const area = domain.value;
  const xSpan = tickSpan(area.yMax > 0 ? -1 : 1, current.sizes.tickLength);
  const ySpan = tickSpan(area.xMax > 0 ? 1 : -1, current.sizes.tickLength);
  // 轴末端有箭头：贴在箭头上的刻度短线会跟箭头糊成一团（教师挑过）→ 这个刻度只留数字、不画短线。
  // 想要"箭头比最后一个刻度多出一截"的效果，调用方要把范围给得比最大刻度大一点（见文档）。
  const arrowClearance = current.sizes.head * 1.05;

  return {
    x: resolvedTicks.value.x
      .filter((value) => value >= area.xMin && value <= area.xMax)
      .map((value) => ({
        key: `cx-tick-x-${value}`,
        label: formatTick(value),
        x: round2(current.screenX(value)),
        y1: round2(current.axisY + xSpan.from),
        y2: round2(current.axisY + xSpan.to),
        labelY: round2(current.axisY + current.sizes.tickLength + current.sizes.tick * 1.35),
        mark: current.plot.right - current.screenX(value) > arrowClearance,
      })),
    y: resolvedTicks.value.y
      .filter((value) => value >= area.yMin && value <= area.yMax)
      .map((value) => ({
        key: `cx-tick-y-${value}`,
        label: formatTick(value),
        y: round2(current.screenY(value)),
        x1: round2(current.axisX + ySpan.from),
        x2: round2(current.axisX + ySpan.to),
        labelX: round2(current.axisX - current.sizes.gap * 0.6),
        labelY: round2(current.screenY(value) + current.sizes.tick * 0.36),
        mark: current.screenY(value) - current.plot.top > arrowClearance,
      })),
  };
});

const gridSegments = computed(() => {
  if (ticks.grid !== true) return [];

  const current = layout.value;
  const area = domain.value;
  const xValues = buildTicks(area.xMin, area.xMax, resolvedTicks.value.xStep, true);
  const yValues = buildTicks(area.yMin, area.yMax, resolvedTicks.value.yStep, true);

  return [
    ...xValues.map((value) => ({
      key: `cx-grid-x-${value}`,
      x1: round2(current.screenX(value)),
      y1: current.plot.top,
      x2: round2(current.screenX(value)),
      y2: current.plot.bottom,
    })),
    ...yValues.map((value) => ({
      key: `cx-grid-y-${value}`,
      x1: current.plot.left,
      y1: round2(current.screenY(value)),
      x2: current.plot.right,
      y2: round2(current.screenY(value)),
    })),
  ];
});

// 轴箭头三角形：尖端正好落在轴端，底边比线宽宽，不会“挂个长方形”
const arrowPath = (x: number, y: number, upright: boolean, head: number): string =>
  upright
    ? `M ${round2(x - head * 0.45)} ${round2(y + head)} L ${x} ${y} L ${round2(x + head * 0.45)} ${round2(y + head)} Z`
    : `M ${round2(x - head)} ${round2(y - head * 0.45)} L ${x} ${y} L ${round2(x - head)} ${round2(y + head * 0.45)} Z`;

// 数据坐标 → 屏幕坐标；折线用空格分段（再 join 成 L），多边形用逗号分段
const pointOf = (point: Point, separator: string): string => {
  const current = layout.value;

  return `${round2(current.screenX(point.x))}${separator}${round2(current.screenY(point.y))}`;
};

const pathOf = (points: Point[]): string =>
  points.length < 2 ? "" : `M ${points.map((point) => pointOf(point, " ")).join(" L ")}`;

const polygonOf = (points: Point[]): string => points.map((point) => pointOf(point, ",")).join(" ");

const sampleCurve = (formula: (x: number) => number, samples: number): Point[] => {
  const area = domain.value;
  const total = Math.max(2, Math.min(Math.round(samples), 600));

  return Array.from({ length: total + 1 }, (_, index) => {
    const x = area.xMin + ((area.xMax - area.xMin) * index) / total;

    return { x, y: formula(x) };
  }).filter((point) => Number.isFinite(point.y));
};

// 尺寸类字段统一按“屏幕 px 口径”，这里换算成用户单位
const sizeToUser = (value: number | undefined, fallback: number): number =>
  typeof value === "number" && value > 0 ? round2(value * fontScale * unitScale.value) : fallback;

// 虚线：给了字符串就用它，`true` 用默认虚线，`false`/没给用实线
const dashOf = (dashed: boolean | string | undefined): string =>
  typeof dashed === "string" ? dashed : dashed === true ? layout.value.sizes.dash : "none";

const layerItems = computed(() => ({
  curves: curves
    .map((curve, index) => ({
      key: `cx-curve-${index}`,
      d: pathOf(
        curve.formula ? sampleCurve(curve.formula, curve.samples ?? 96) : (curve.points ?? []),
      ),
      style: {
        fill: "none",
        stroke: curve.stroke ?? "var(--c-accent)",
        strokeWidth: sizeToUser(curve.width, layout.value.sizes.curve),
        strokeDasharray: dashOf(curve.dashed),
        strokeLinecap: "round",
        opacity: curve.opacity ?? 1,
        visibility: visibilityOf(curve.showAt),
      } as Record<string, string | number>,
    }))
    .filter((item) => item.d !== ""),
  areas: areas.map((area, index) => ({
    key: `cx-area-${index}`,
    points: polygonOf(area.points),
    style: {
      fill: area.fill ?? "var(--c-accent)",
      fillOpacity: area.fillOpacity ?? 0.22,
      stroke: area.stroke ?? "none",
      strokeWidth: sizeToUser(area.width, layout.value.sizes.areaStroke),
      strokeDasharray: dashOf(area.dashed),
      opacity: area.opacity ?? 1,
      visibility: visibilityOf(area.showAt),
    } as Record<string, string | number>,
  })),
}));

// 标注走 HTML 覆盖层（SVG 里写不了 LaTeX）：
// 位置换算成**容器百分比**——SVG 是 `width: 100%; height: auto`，所以百分比正好等于 viewBox 坐标。
const labelItems = computed(() =>
  labels.map((label, index) => {
    const current = layout.value;
    const dotRadius =
      typeof label.dot === "number"
        ? round2(label.dot * fontScale * unitScale.value)
        : label.dot === true
          ? current.sizes.dot
          : 0;
    const visible = step >= (label.showAt ?? 0);

    return {
      key: `cx-label-${index}`,
      dotX: round2(current.screenX(label.x)),
      dotY: round2(current.screenY(label.y)),
      dotRadius,
      dotColor: label.dotColor ?? "var(--c-accent)",
      dotVisible: visible,
      percentX: round2((current.screenX(label.x) / current.width) * 100),
      percentY: round2((current.screenY(label.y) / current.height) * 100),
      anchor: label.anchor ?? "center",
      dx: label.dx ?? 0,
      dy: label.dy ?? 0,
      size: round2((label.size ?? 17) * fontScale),
      color: label.color ?? "var(--c-text)",
      halo: label.halo === true,
      visible,
      parts: labelParts(label),
    };
  }),
);

// 一张轴标签的公共字段（量/下标/单位/上标 + 三层字号），位置由调用方给
const axisLabelItem = (
  config: AxisOption,
  position: { x: number; y: number; anchor: "start" | "end" },
  sizes: { axis: number; unit: number },
  key: string,
): {
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
} => ({
  key,
  x: position.x,
  y: position.y,
  anchor: position.anchor,
  font: sizes.axis,
  unitFont: sizes.unit,
  subFont: round2(sizes.axis * 0.72),
  supFont: round2(sizes.unit * 0.75),
  subShift: round2(sizes.axis * 0.18),
  unitGap: round2(sizes.axis * 0.22),
  quantity: config.quantity ?? "",
  sub: config.sub,
  unit: config.unit ? normalizeUnit(config.unit) : "",
  sup: config.sup,
});

// 轴的量与单位标签：横轴贴右端（下侧独占一行 / 上侧压在图上），纵轴贴轴顶（左侧 / 右侧）
const axisLabels = computed(() => {
  const current = layout.value;
  const xSide = xAxis.side ?? "below";
  const ySide = yAxis.side ?? "left";
  const items: ReturnType<typeof axisLabelItem>[] = [];

  if (xAxis.quantity) {
    items.push(
      axisLabelItem(
        xAxis,
        {
          x: round2(current.plot.right + (xAxis.dx ? svgPx(xAxis.dx) : 0)),
          y: round2(
            current.axisY +
              (xSide === "below"
                ? current.sizes.tickLength + current.sizes.tick * 1.35 + current.sizes.axis * 1.2
                : -current.sizes.axis * 0.35) +
              (xAxis.dy ? svgPx(xAxis.dy) : 0),
          ),
          anchor: "end",
        },
        current.sizes,
        "cx-axis-x",
      ),
    );
  }

  if (yAxis.quantity) {
    items.push(
      axisLabelItem(
        yAxis,
        {
          x: round2(
            current.axisX +
              (ySide === "right" ? current.sizes.gap : -current.sizes.gap) +
              (yAxis.dx ? svgPx(yAxis.dx) : 0),
          ),
          y: round2(current.yLabelBase + (yAxis.dy ? svgPx(yAxis.dy) : 0)),
          anchor: current.yLabelStarts ? "start" : "end",
        },
        current.sizes,
        "cx-axis-y",
      ),
    );
  }

  return items;
});

// 原点 O：只在 0 真的落在范围内时画，位置在轴交点左下
const originMark = computed(() => {
  const area = domain.value;

  if (ticks.origin === false || area.xMin > 0 || area.xMax < 0 || area.yMin > 0 || area.yMax < 0)
    return null;
  const current = layout.value;

  return {
    x: round2(current.axisX - current.sizes.gap * 0.7),
    y: round2(current.axisY + current.sizes.origin * 0.85),
    font: current.sizes.origin,
  };
});

const clipId = `coord-axes-clip-${useId()}`;

const ariaLabel = computed(() => {
  const xName = xAxis.quantity ? `${xAxis.quantity} ${xAxis.unit ?? ""}`.trim() : "横轴";
  const yName = yAxis.quantity ? `${yAxis.quantity} ${yAxis.unit ?? ""}`.trim() : "纵轴";

  return `坐标图（${xName} — ${yName}）`;
});
</script>

<template>
  <div ref="wrapRef" class="coord-axes">
    <svg
      class="coord-axes-svg"
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
      <g v-if="gridSegments.length > 0" stroke="var(--c-border)" stroke-width="1">
        <line
          v-for="segment in gridSegments"
          :key="segment.key"
          :x1="segment.x1"
          :y1="segment.y1"
          :x2="segment.x2"
          :y2="segment.y2"
        />
      </g>
      <g
        stroke="var(--c-text-dim)"
        :stroke-width="layout.sizes.axisLine"
        stroke-opacity="0.72"
        stroke-linecap="round"
      >
        <line
          :x1="layout.plot.left"
          :y1="layout.axisY"
          :x2="layout.plot.right"
          :y2="layout.axisY"
        />
        <line
          :x1="layout.axisX"
          :y1="layout.plot.bottom"
          :x2="layout.axisX"
          :y2="layout.plot.top"
        />
      </g>
      <g v-if="ticks.arrows !== false" fill="var(--c-text-dim)" opacity="0.72">
        <path :d="arrowPath(layout.plot.right, layout.axisY, false, layout.sizes.head)" />
        <path :d="arrowPath(layout.axisX, layout.plot.top, true, layout.sizes.head)" />
      </g>
      <g
        stroke="var(--c-text-dim)"
        :stroke-width="layout.sizes.axisLine * 0.8"
        stroke-opacity="0.6"
      >
        <template v-for="mark in tickMarks.x" :key="mark.key">
          <line v-if="mark.mark" :x1="mark.x" :y1="mark.y1" :x2="mark.x" :y2="mark.y2" />
        </template>
        <template v-for="mark in tickMarks.y" :key="mark.key">
          <line v-if="mark.mark" :x1="mark.x1" :y1="mark.y" :x2="mark.x2" :y2="mark.y" />
        </template>
      </g>
      <g v-if="ticks.labels !== false" :font-size="layout.sizes.tick" fill="var(--c-text-dim)">
        <text
          v-for="mark in tickMarks.x"
          :key="mark.key"
          :x="mark.x"
          :y="mark.labelY"
          text-anchor="middle"
        >
          {{ mark.label }}
        </text>
        <text
          v-for="mark in tickMarks.y"
          :key="mark.key"
          :x="mark.labelX"
          :y="mark.labelY"
          text-anchor="end"
        >
          {{ mark.label }}
        </text>
      </g>
      <g v-if="originMark" :font-size="originMark.font" fill="var(--c-text-dim)">
        <text
          :x="originMark.x"
          :y="originMark.y"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          O
        </text>
      </g>
      <g :clip-path="`url(#${clipId})`">
        <polygon
          v-for="area in layerItems.areas"
          :key="area.key"
          :points="area.points"
          :style="area.style"
        />
        <path
          v-for="curve in layerItems.curves"
          :key="curve.key"
          :d="curve.d"
          :style="curve.style"
          stroke-linejoin="round"
        />
      </g>
      <!--
        轴外装饰的出口：尺寸线、括号、引线这类**要画到绘图区外面**的东西，
        曲线/填充会被裁剪（见上面的 clipPath），这里不裁剪。
        插槽按 viewBox 用户单位作图：`x(数据)`/`y(数据)` 换算坐标，`px2user` 把屏幕 px 折成用户单位。
      -->
      <g class="coord-axes-overlay">
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
      <g fill="var(--c-text)">
        <text
          v-for="axis in axisLabels"
          :key="axis.key"
          :x="axis.x"
          :y="axis.y"
          :text-anchor="axis.anchor"
        >
          <tspan
            v-for="(part, index) in axisMathParts(axis.quantity)"
            :key="index"
            :font-family="part.upright ? 'KaTeX_Main' : 'KaTeX_Math'"
            :font-style="part.upright ? 'normal' : 'italic'"
            :font-size="axis.font"
          >
            {{ part.text }}
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
      <g v-for="label in labelItems" :key="label.key">
        <circle
          v-if="label.dotRadius > 0"
          :cx="label.dotX"
          :cy="label.dotY"
          :r="label.dotRadius"
          :style="{ fill: label.dotColor, visibility: label.dotVisible ? 'visible' : 'hidden' }"
        />
      </g>
    </svg>

    <div class="coord-axes-labels">
      <ChartLabel
        v-for="label in labelItems"
        :key="label.key"
        :x-percent="label.percentX"
        :y-percent="label.percentY"
        :parts="label.parts"
        :anchor="label.anchor"
        :dx="label.dx"
        :dy="label.dy"
        :size="label.size"
        :color="label.color"
        :halo="label.halo"
        :visible="label.visible"
      />
    </div>
  </div>
</template>

<style scoped>
.coord-axes {
  position: relative;
  width: 100%;
  min-width: 0;
}

/* 标注层：盖在 SVG 上层，只负责定位（子元素按容器百分比摆放） */
.coord-axes-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.coord-axes-svg {
  display: block;
  overflow: visible;
  width: 100%;
  height: auto;
}
</style>
