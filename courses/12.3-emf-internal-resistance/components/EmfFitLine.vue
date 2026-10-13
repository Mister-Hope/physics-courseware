<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * EmfFitLine —— 《实验：电池电动势和内阻的测量》（人教版必修三 §12.3）
 *
 * 处理数据：把测量得到的 (I, U) 数据描成十字叉 → 学生拖动两个蓝色手柄拉出一条拟合直线 → 直线在纵轴上的截距就是电动势 E，斜率绝对值就是内阻 r = |ΔU/ΔI|。
 *
 * 数据用教材 §12.3 练习与应用第 1 题的蓄电池数据（U 变化只有 0.11 V，纵轴必须从 1.86 V 起、 用锯齿折断线表示省略，否则点会挤成一条水平线）。
 *
 * 坐标轴 / 刻度 / 数字 / O / 轴量标签交给共享 `CoordAxes`；拟合直线、5 个十字数据点、 两个拖拽手柄与热区、纵轴锯齿折断线留在本组件、画在 `#overlay`
 * 插槽里（折断线要跨到轴外、 手柄要接指针事件，曲线/填充会被绘图区裁剪）；拖拽的坐标映射走插槽给的 `plot`。
 */

/** 蓄电池的五组测量数据（教材 §12.3 练习与应用 1） */
const DATA: readonly { readonly i: number; readonly u: number }[] = [
  { i: 1.72, u: 1.88 },
  { i: 1.35, u: 1.92 },
  { i: 0.98, u: 1.93 },
  { i: 0.63, u: 1.98 },
  { i: 0.34, u: 1.99 },
];

/* ────────────── 坐标范围与画布 ────────────── */

/** 横轴 0–1.9 A、纵轴 1.86–2.06 V（纵轴不从 0 开始，用锯齿折断线表示省略） */
const X_MIN = 0;
const X_MAX = 1.9;
const Y_MIN = 1.86;
const Y_MAX = 2.06;
/** 刻度（数据坐标） */
const X_TICKS: readonly number[] = [0.5, 1, 1.5];
const Y_TICKS: readonly number[] = [1.9, 1.95, 2, 2.05];
/** ViewBox 尺寸（只决定比例与拖拽映射） */
const VIEW_W = 640;
const VIEW_H = 350;
/** 图内尺寸（屏幕 px 口径，插槽里乘 `px2user` 折成 viewBox 用户单位） */
const CROSS_HALF = 6.5;
const CROSS_WIDTH = 1.8;
const HANDLE_R = 7;
const HANDLE_STROKE = 2.4;
const GRAB_R = 16;
/** 纵轴折断符号：两条平行斜线横跨纵轴，右端比左端高 6px，分别离轴 2–8px、9–15px */
const BREAK_HALF = 8;
const BREAK_LINES: readonly { readonly from: number; readonly to: number }[] = [
  { from: 2, to: 8 },
  { from: 9, to: 15 },
];
/** 折断符号的标注 */
const NOTE_DX = 76;
const NOTE_DY = 6;
const NOTE_FONT = 14;
const NOTE_HALO = 4;

interface Vec {
  readonly i: number;
  readonly u: number;
}

type HandleId = "a" | "b";

/** 绘图区四边（viewBox 用户单位），由 `#overlay` 插槽在模板里传进来 */
interface PlotArea {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
}

/**
 * 把手柄限制在坐标区内，并取到 0.001（保证读数里的 ΔU、ΔI 与显示值严格自洽）
 *
 * @param vec 手柄位置（物理量）
 * @returns 夹取后的手柄位置
 */
const clampVec = (vec: Vec): Vec => ({
  i: Math.round(Math.min(X_MAX, Math.max(X_MIN, vec.i)) * 1000) / 1000,
  u: Math.round(Math.min(Y_MAX, Math.max(Y_MIN, vec.u)) * 1000) / 1000,
});

/* ────────────── 状态 ────────────── */

/** 两个可拖拽手柄：初始落在由数据拟合出的直线 U = 2.02 − 0.08I 上 */
const handleA = ref<Vec>({ i: 0.1, u: 2.013 });
const handleB = ref<Vec>({ i: 1.8, u: 1.876 });
const dragging = ref<HandleId | null>(null);

const handles = computed<readonly (Vec & { readonly id: HandleId })[]>(() => [
  { id: "a", i: handleA.value.i, u: handleA.value.u },
  { id: "b", i: handleB.value.i, u: handleB.value.u },
]);

/* ────────────── 由两个手柄确定的直线 ────────────── */

/**
 * 直线 U = k·I + b（两手柄竖直对齐时按水平线兜底）
 *
 * @returns 斜率 k 与截距 b
 */
const currentLine = computed<{ readonly k: number; readonly b: number }>(() => {
  const pointA = handleA.value;
  const pointB = handleB.value;
  const di = pointB.i - pointA.i;

  if (Math.abs(di) < 1e-6) return { k: 0, b: pointA.u };

  const k = (pointB.u - pointA.u) / di;
  return { k, b: pointA.u - k * pointA.i };
});

/** 把直线延伸到坐标区边界：与四条边求交，取 I 最小 / 最大的两个交点 */
const lineEnds = computed<readonly [Vec, Vec]>(() => {
  const { k, b } = currentLine.value;
  const candidates: Vec[] = [];

  const push = (i: number, u: number): void => {
    if (!Number.isFinite(i) || !Number.isFinite(u)) return;
    if (i < X_MIN - 1e-6 || i > X_MAX + 1e-6 || u < Y_MIN - 1e-6 || u > Y_MAX + 1e-6) return;
    candidates.push({ i, u });
  };

  push(X_MIN, b);
  push(X_MAX, k * X_MAX + b);

  if (Math.abs(k) > 1e-9) {
    push((Y_MIN - b) / k, Y_MIN);
    push((Y_MAX - b) / k, Y_MAX);
  }

  if (candidates.length < 2) return [handleA.value, handleB.value];

  const sorted = [...candidates].sort((left, right) => left.i - right.i);
  const [min] = sorted;
  const max = sorted[sorted.length - 1];

  return [min, max];
});

const curves = computed(() => {
  const [start, end] = lineEnds.value;

  return [
    {
      points: [
        { x: start.i, y: start.u },
        { x: end.i, y: end.u },
      ],
      stroke: "var(--c-accent-2)",
      width: 3,
    },
  ];
});

/** 纵轴截距处标出 E（随拖拽实时移动），纵轴从 1.86 起，所以自己补一个原点标记 */
const labels = computed(() => {
  const { b } = currentLine.value;

  return [
    {
      x: X_MIN,
      y: Y_MIN,
      tex: "O",
      anchor: "bottom-left" as const,
      color: "var(--c-text-dim)",
      size: 16,
    },
    {
      x: X_MIN,
      y: Math.min(Y_MAX, Math.max(Y_MIN, b)),
      tex: "E",
      anchor: "top-right" as const,
      size: 19,
      halo: true,
      dot: 5,
    },
  ];
});

/* ────────────── 拖拽 ────────────── */

/**
 * 指针位置 → 手柄新位置：先用 SVG 的 `getBoundingClientRect()` 把客户端坐标换算成 viewBox 用户单位， 再按绘图区四边线性映射回数据坐标（`plot`
 * 来自 `#overlay` 插槽）
 *
 * @param id 手柄标识
 * @param event 指针事件
 * @param plot 绘图区四边（viewBox 用户单位）
 */
const setHandle = (id: HandleId, event: PointerEvent, plot: PlotArea): void => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) return;

  const userX = ((event.clientX - rect.left) / rect.width) * VIEW_W;
  const userY = ((event.clientY - rect.top) / rect.height) * VIEW_H;
  const next = clampVec({
    i: X_MIN + ((userX - plot.left) / (plot.right - plot.left)) * (X_MAX - X_MIN),
    u: Y_MAX - ((userY - plot.top) / (plot.bottom - plot.top)) * (Y_MAX - Y_MIN),
  });

  if (id === "a") handleA.value = next;
  else handleB.value = next;
};

const beginDrag = (id: HandleId, event: PointerEvent, plot: PlotArea): void => {
  dragging.value = id;

  const target = event.currentTarget;

  if (target instanceof Element) target.setPointerCapture(event.pointerId);

  setHandle(id, event, plot);
};

const dragTo = (id: HandleId, event: PointerEvent, plot: PlotArea): void => {
  if (dragging.value !== id) return;

  setHandle(id, event, plot);
};

const endDrag = (): void => {
  dragging.value = null;
};

/* ────────────── 读数 ────────────── */

const orderedHandles = computed<readonly [Vec, Vec]>(() =>
  handleA.value.i <= handleB.value.i
    ? [handleA.value, handleB.value]
    : [handleB.value, handleA.value],
);

const deltaI = computed<number>(() => orderedHandles.value[1].i - orderedHandles.value[0].i);
const deltaU = computed<number>(() => orderedHandles.value[1].u - orderedHandles.value[0].u);
/** 斜率绝对值就是内阻 */
const resistance = computed<number>(() => Math.abs(deltaU.value / deltaI.value));
/** 纵轴截距就是电动势 */
const emf = computed<number>(() => currentLine.value.b);

/**
 * 保留 2 位有效数字（如 0.0807 → "0.081"）
 *
 * @param value 原始数值
 * @returns 两位有效数字的字符串
 */
const formatSig2 = (value: number): string => {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0.0";

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const decimals = Math.min(6, Math.max(0, 1 - exponent));

  return value.toFixed(decimals);
};

const deltaUText = computed<string>(() => deltaU.value.toFixed(2));
const deltaIText = computed<string>(() => deltaI.value.toFixed(2));
const emfText = computed<string>(() => emf.value.toFixed(2));
const resistanceText = computed<string>(() => formatSig2(resistance.value));
</script>

<template>
  <div class="efl-wrap">
    <div class="efl-figure">
      <CoordAxes
        :x-range="[X_MIN, X_MAX]"
        :y-range="[Y_MIN, Y_MAX]"
        :x-axis="{ quantity: 'I', unit: 'A' }"
        :y-axis="{ quantity: 'U', unit: 'V' }"
        :ticks="{ x: X_TICKS, y: Y_TICKS }"
        :view="{ width: VIEW_W, height: VIEW_H }"
        :curves="curves"
        :labels="labels"
      >
        <template #overlay="{ x, y, plot, px2user }">
          <!-- 纵轴锯齿折断符号：横跨纵轴、跨到轴外 -->
          <g stroke="var(--c-danger)" :stroke-width="2.6 * px2user" stroke-linecap="round">
            <line
              v-for="(segment, index) in BREAK_LINES"
              :key="`break-${index}`"
              :x1="x(X_MIN) - BREAK_HALF * px2user"
              :y1="plot.bottom - segment.from * px2user"
              :x2="x(X_MIN) + BREAK_HALF * px2user"
              :y2="plot.bottom - segment.to * px2user"
            />
          </g>
          <!-- 5 个数据点：十字叉 -->
          <g stroke="var(--c-accent)" :stroke-width="CROSS_WIDTH * px2user" stroke-linecap="round">
            <line
              v-for="point in DATA"
              :key="`cross-h-${point.i}`"
              :x1="x(point.i) - CROSS_HALF * px2user"
              :y1="y(point.u)"
              :x2="x(point.i) + CROSS_HALF * px2user"
              :y2="y(point.u)"
            />
            <line
              v-for="point in DATA"
              :key="`cross-v-${point.i}`"
              :x1="x(point.i)"
              :y1="y(point.u) - CROSS_HALF * px2user"
              :x2="x(point.i)"
              :y2="y(point.u) + CROSS_HALF * px2user"
            />
          </g>
          <!-- 两个可拖拽手柄（外圈 r=16 为透明热区） -->
          <g v-for="handle in handles" :key="handle.id">
            <circle
              :cx="x(handle.i)"
              :cy="y(handle.u)"
              :r="HANDLE_R * px2user"
              fill="var(--c-accent-2)"
              fill-opacity="0.35"
              stroke="var(--c-accent-2)"
              :stroke-width="HANDLE_STROKE * px2user"
            />
            <circle
              :cx="x(handle.i)"
              :cy="y(handle.u)"
              :r="GRAB_R * px2user"
              fill="transparent"
              class="efl-grab"
              @pointerdown="beginDrag(handle.id, $event, plot)"
              @pointermove="dragTo(handle.id, $event, plot)"
              @pointerup="endDrag"
              @pointercancel="endDrag"
            />
          </g>
          <!-- 折断符号的标注：最后画（压在直线之上）+ 深色描边光晕 -->
          <text
            :x="x(X_MIN) + NOTE_DX * px2user"
            :y="plot.bottom - NOTE_DY * px2user"
            :font-size="NOTE_FONT * px2user"
            fill="var(--c-danger)"
            stroke="var(--c-bg-soft)"
            :stroke-width="NOTE_HALO * px2user"
            paint-order="stroke"
            pointer-events="none"
          >
            不从 0 开始
          </text>
        </template>
      </CoordAxes>
    </div>

    <div class="efl-readout">
      <span class="efl-chip">
        <span class="efl-chip-k"><Latex tex="\Delta U" /></span>
        <span class="efl-chip-v"><Latex :tex="`${deltaUText}\\ \\text{V}`" /></span>
      </span>
      <span class="efl-chip">
        <span class="efl-chip-k"><Latex tex="\Delta I" /></span>
        <span class="efl-chip-v"><Latex :tex="`${deltaIText}\\ \\text{A}`" /></span>
      </span>
      <span class="efl-chip efl-chip-wide">
        <span class="efl-chip-k">内阻 <Latex tex="r = |\Delta U/\Delta I|" /></span>
        <span class="efl-chip-v"><Latex :tex="`${resistanceText}\\ \\Omega`" /></span>
      </span>
      <span class="efl-chip efl-chip-wide">
        <span class="efl-chip-k">电动势 <Latex tex="E" />（纵轴截距）</span>
        <span class="efl-chip-v"><Latex :tex="`${emfText}\\ \\text{V}`" /></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.efl-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;

  width: 100%;
  min-width: 0;
  max-width: 760px;
  margin: 0 auto;
}

.efl-figure {
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: rgb(15 20 37 / 40%);
}

/* 拖拽要吃掉触摸滚动 */
.efl-figure :deep(.coord-axes-svg) {
  touch-action: none;
}

.efl-grab {
  cursor: grab;
  pointer-events: all;
}

.efl-grab:active {
  cursor: grabbing;
}

.efl-readout {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 760px;

  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.15;
}

.efl-chip {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;

  padding: 0.1rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: var(--c-surface);

  white-space: nowrap;
}

.efl-chip-wide {
  border-color: rgb(226 168 70 / 45%);
}

.efl-chip-k {
  color: var(--c-text-dim);
}

.efl-chip-v {
  color: var(--c-text);
  font-weight: 700;
}

.efl-chip-wide .efl-chip-v {
  color: var(--c-accent);
  font-size: 1rem;
}
</style>
