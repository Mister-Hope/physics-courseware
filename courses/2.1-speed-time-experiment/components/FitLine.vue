<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * FitLine —— 《实验：探究小车速度随时间变化的规律》（人教版必修一 §2.1）
 *
 * 作图与求加速度：把测量得到的 (t, v) 数据描成十字叉 → 学生拖动两个蓝色手柄拉出一条 拟合直线 → 在直线上取两个相距较远的手柄点求斜率，斜率就是加速度。
 *
 * 坐标轴 / 刻度 / 数字 / O / 轴量标签交给共享 `CoordAxes`；拟合直线、8 个十字数据点、 两个拖拽手柄与热区、纵轴锯齿折断线与"不从 0 开始"标注留在本组件、画在
 * `#overlay` 插槽里 （折断线要跨到轴外、手柄要接指针事件，曲线/填充会被绘图区裁剪）；**拖拽的坐标映射也走插槽给的 `plot`**。
 *
 * 版面：坐标图收窄成近 8:5（viewBox 640 × 400），整块组件设计宽 600，塞进幻灯片正文区。 图内字号由 `CoordAxes` 按实测容器宽度自适应（轴量 21px / 刻度
 * 15px / 标注 17px）。
 */

// 某次实验的测量结果（m/s）
const DATA: readonly { readonly t: number; readonly v: number }[] = [
  { t: 0.1, v: 0.244 },
  { t: 0.2, v: 0.314 },
  { t: 0.3, v: 0.405 },
  { t: 0.4, v: 0.476 },
  { t: 0.5, v: 0.563 },
  { t: 0.6, v: 0.634 },
  { t: 0.7, v: 0.724 },
  { t: 0.8, v: 0.796 },
];

/* ────────────── 坐标范围与画布 ────────────── */

/** 横轴 0–0.9 s、纵轴 0.15–0.85 m/s（纵轴不从 0 开始，用锯齿折断线表示省略） */
const X_MIN = 0;
const X_MAX = 0.9;
const Y_MIN = 0.15;
const Y_MAX = 0.85;
/** 刻度（数据坐标）：横轴每 0.1 s，纵轴每 0.2 m/s */
const X_TICKS: readonly number[] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
const Y_TICKS: readonly number[] = [0.2, 0.4, 0.6, 0.8];
/** ViewBox 尺寸（只决定比例与拖拽映射） */
const VIEW_W = 640;
const VIEW_H = 400;
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
/** 折断符号的标注：在折断线右侧，压在直线上也读得清（描边光晕） */
const NOTE_DX = 76;
const NOTE_DY = 6;
const NOTE_FONT = 14;
const NOTE_HALO = 4;

interface Vec {
  readonly t: number;
  readonly v: number;
}

type HandleId = "a" | "b";

/** 绘图区四边（viewBox 用户单位），由 `#overlay` 插槽在模板里传进来 */
interface PlotArea {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/**
 * 把手柄的位置限制在坐标区内，并取到 0.001（保证读数里的 Δv、Δt 与显示值严格自洽）
 *
 * @param vec 手柄位置（物理量）
 * @returns 夹取后的手柄位置
 */
const clampVec = (vec: Vec): Vec => ({
  t: Math.round(clamp(vec.t, X_MIN, X_MAX) * 1000) / 1000,
  v: Math.round(clamp(vec.v, Y_MIN, Y_MAX) * 1000) / 1000,
});

/* ────────────── 状态 ────────────── */

/** 两个可拖拽手柄：初始落在理想直线 v = 0.80t + 0.16 上 */
const handleA = ref<Vec>({ t: 0.05, v: 0.2 });
const handleB = ref<Vec>({ t: 0.85, v: 0.84 });
const dragging = ref<HandleId | null>(null);

/** 渲染用的两个手柄（物理量；画布坐标由 `#overlay` 的 `x()` / `y()` 换算） */
const handles = computed<readonly (Vec & { readonly id: HandleId })[]>(() => [
  { id: "a", t: handleA.value.t, v: handleA.value.v },
  { id: "b", t: handleB.value.t, v: handleB.value.v },
]);

/* ────────────── 由两个手柄确定的直线 ────────────── */

/**
 * 直线 v = k·t + b（两手柄竖直对齐时按水平线兜底）
 *
 * @returns 斜率 k 与截距 b
 */
const currentLine = computed<{ readonly k: number; readonly b: number }>(() => {
  const pointA = handleA.value;
  const pointB = handleB.value;
  const dt = pointB.t - pointA.t;

  if (Math.abs(dt) < 1e-6) return { k: 0, b: pointA.v };

  const k = (pointB.v - pointA.v) / dt;
  return { k, b: pointA.v - k * pointA.t };
});

/** 把直线延伸到坐标区边界：与四条边求交，取 t 最小 / 最大的两个交点（数据坐标，组件再按绘图区裁剪） */
const lineEnds = computed<readonly [Vec, Vec]>(() => {
  const { k, b } = currentLine.value;
  const candidates: Vec[] = [];

  const push = (t: number, v: number): void => {
    if (!Number.isFinite(t) || !Number.isFinite(v)) return;
    if (t < X_MIN - 1e-6 || t > X_MAX + 1e-6 || v < Y_MIN - 1e-6 || v > Y_MAX + 1e-6) return;
    candidates.push({ t, v });
  };

  push(X_MIN, b);
  push(X_MAX, k * X_MAX + b);

  if (Math.abs(k) > 1e-9) {
    push((Y_MIN - b) / k, Y_MIN);
    push((Y_MAX - b) / k, Y_MAX);
  }

  if (candidates.length < 2) return [handleA.value, handleB.value];

  const sorted = [...candidates].sort((left, right) => left.t - right.t);
  const [min] = sorted;
  const max = sorted[sorted.length - 1];

  return [min, max];
});

/** 拟合直线：由两个手柄确定，延伸到坐标区边界 */
const curves = computed(() => {
  const [start, end] = lineEnds.value;

  return [
    {
      points: [
        { x: start.t, y: start.v },
        { x: end.t, y: end.v },
      ],
      stroke: "var(--c-accent-2)",
      width: 3,
    },
  ];
});

/** 纵轴从 0.15 起（0 不在范围内），组件的原点 `O` 不会画，这里自己补一个 */
const labels = [
  { x: X_MIN, y: Y_MIN, tex: "O", anchor: "bottom-left" as const, color: "var(--c-text-dim)" },
];

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
    t: X_MIN + ((userX - plot.left) / (plot.right - plot.left)) * (X_MAX - X_MIN),
    v: Y_MAX - ((userY - plot.top) / (plot.bottom - plot.top)) * (Y_MAX - Y_MIN),
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

/** 两个手柄是直线上的"虚拟点"；以 t 较小的那个为起点，保证 Δt > 0 */
const orderedHandles = computed<readonly [Vec, Vec]>(() =>
  handleA.value.t <= handleB.value.t
    ? [handleA.value, handleB.value]
    : [handleB.value, handleA.value],
);

const deltaT = computed<number>(() => orderedHandles.value[1].t - orderedHandles.value[0].t);
const deltaV = computed<number>(() => orderedHandles.value[1].v - orderedHandles.value[0].v);
/** 斜率就是加速度 */
const accel = computed<number>(() => deltaV.value / deltaT.value);

/**
 * 保留 2 位有效数字（如 0.7975 → "0.80"）；手柄重合等退化情形显示占位符
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

const deltaVText = computed<string>(() => deltaV.value.toFixed(3));
const deltaTText = computed<string>(() => deltaT.value.toFixed(3));
const accelText = computed<string>(() => formatSig2(accel.value));
</script>

<template>
  <div class="fl-wrap">
    <div class="fl-figure">
      <CoordAxes
        :x-range="[X_MIN, X_MAX]"
        :y-range="[Y_MIN, Y_MAX]"
        :x-axis="{ quantity: 't' }"
        :y-axis="{ quantity: 'v' }"
        :ticks="{ x: X_TICKS, y: Y_TICKS }"
        :view="{ width: VIEW_W, height: VIEW_H }"
        :curves="curves"
        :labels="labels"
      >
        <template #overlay="{ x, y, plot, px2user }">
          <!-- 纵轴锯齿折断符号：横跨纵轴、跨到轴外（曲线会被裁剪，只能走插槽） -->
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
          <!-- 8 个数据点：十字叉 -->
          <g stroke="var(--c-accent)" :stroke-width="CROSS_WIDTH * px2user" stroke-linecap="round">
            <line
              v-for="point in DATA"
              :key="`cross-h-${point.t}`"
              :x1="x(point.t) - CROSS_HALF * px2user"
              :y1="y(point.v)"
              :x2="x(point.t) + CROSS_HALF * px2user"
              :y2="y(point.v)"
            />
            <line
              v-for="point in DATA"
              :key="`cross-v-${point.t}`"
              :x1="x(point.t)"
              :y1="y(point.v) - CROSS_HALF * px2user"
              :x2="x(point.t)"
              :y2="y(point.v) + CROSS_HALF * px2user"
            />
          </g>
          <!-- 两个可拖拽手柄（外圈 r=16 为透明热区） -->
          <g v-for="handle in handles" :key="handle.id">
            <circle
              :cx="x(handle.t)"
              :cy="y(handle.v)"
              :r="HANDLE_R * px2user"
              fill="var(--c-accent-2)"
              fill-opacity="0.35"
              stroke="var(--c-accent-2)"
              :stroke-width="HANDLE_STROKE * px2user"
            />
            <circle
              :cx="x(handle.t)"
              :cy="y(handle.v)"
              :r="GRAB_R * px2user"
              fill="transparent"
              class="fl-grab"
              @pointerdown="beginDrag(handle.id, $event, plot)"
              @pointermove="dragTo(handle.id, $event, plot)"
              @pointerup="endDrag"
              @pointercancel="endDrag"
            />
          </g>
          <!-- 折断符号的标注：最后画（压在直线之上）+ 深色描边光晕，线扫过时仍看得清；不吃指针事件 -->
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

    <div class="fl-readout">
      <span class="fl-chip">
        <span class="fl-chip-k"><Latex tex="\Delta v" /></span>
        <span class="fl-chip-v"><Latex :tex="`${deltaVText}\\ \\text{m/s}`" /></span>
      </span>
      <span class="fl-chip">
        <span class="fl-chip-k"><Latex tex="\Delta t" /></span>
        <span class="fl-chip-v"><Latex :tex="`${deltaTText}\\ \\text{s}`" /></span>
      </span>
      <span class="fl-chip fl-chip-wide">
        <span class="fl-chip-k">加速度 <Latex tex="a = \Delta v/\Delta t" /></span>
        <span class="fl-chip-v"><Latex :tex="`${accelText}\\ \\text{m/s}^2`" /></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.fl-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;

  width: 100%;
  min-width: 0;
  max-width: 760px;
  margin: 0 auto;
}

/* 收窄后的坐标图：viewBox 640 × 400，渲染宽 600 时高 ≈ 377（含 1px 边框） */
.fl-figure {
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: rgb(15 20 37 / 40%);
}

/* 拖拽要吃掉触摸滚动（原来写在手写 <svg> 上，坐标轴交给组件后从外层给） */
.fl-figure :deep(.coord-axes-svg) {
  touch-action: none;
}

.fl-grab {
  cursor: grab;
  pointer-events: all;
}

.fl-grab:active {
  cursor: grabbing;
}

/* 读数只有一行，很薄——整块总高才压得进 400 */
.fl-readout {
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

.fl-chip {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;

  padding: 0.1rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: var(--c-surface);

  white-space: nowrap;
}

.fl-chip-wide {
  border-color: rgb(226 168 70 / 45%);
}

.fl-chip-k {
  color: var(--c-text-dim);
}

.fl-chip-v {
  color: var(--c-text);
  font-weight: 700;
}

.fl-chip-wide .fl-chip-v {
  color: var(--c-accent);
  font-size: 1rem;
}
</style>
