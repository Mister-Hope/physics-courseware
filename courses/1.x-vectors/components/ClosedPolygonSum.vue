<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 多边形法则：三条矢量首尾相接，拖动顶点改变形状。 闭合时 a + b + c 恒为 0；点"断开链"把终点挪开，合矢量立刻不为 0 —— 用来说明"和为 0"的条件。
 *
 * 坐标轴 / 网格 / 刻度 / O / 轴量标签交给共享 `CoordAxes`；三条矢量箭头、合矢量、可拖顶点与文字标注 留在本组件、画在 `#overlay` 插槽里（`x()`/`y()`
 * 由组件给出数据坐标映射，指针反算走 `plot`）。
 */

/** 绘图区四边（viewBox 用户单位，由 `#overlay` 插槽给出） */
interface PlotArea {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface ViewBox {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

/** 数据范围照搬旧手写 SVG：横轴 ±5、纵轴 ±3.5（刻度到 ±4 / ±2，末端箭头都留了余量） */
const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -3.5;
const Y_MAX = 3.5;
const TICKS_X = [-4, -2, 2, 4];
const TICKS_Y = [-2, 2];
/** ViewBox 尺寸沿用旧图的 520 × 400：绘图区比例与旧图一致（旧图 SCALE 44 对两轴相同）， 迁移后横纵比例误差 < 1%，无需再补偿。 */
const VIEW = { width: 520, height: 400 };
/** 顶点的活动范围（拖拽时夹取） */
const MIN_X = -5;
const MAX_X = 5;
const MIN_Y = -3.5;
const MAX_Y = 3.5;
/** 拖拽热区半径（屏幕 px，按 `px2user` 折成 viewBox 用户单位） */
const GRAB_PX = 22;

const vertices = ref<Point[]>([
  { x: -2, y: 2 },
  { x: 2.5, y: 1.5 },
  { x: 0, y: -2 },
]);

/** 缺口：闭合时为 (0,0)，断开时给出一个偏移量 */
const gap = ref<Point>({ x: 0, y: 0 });
const dragIndex = ref(-1);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const snap = (value: number): number => Math.round(value * 2) / 2;

const pointAt = (index: number): Point => {
  const point = vertices.value[index];

  return point ?? { x: 0, y: 0 };
};

/** 链的终点：闭合时就是 A，断开时是 A + 缺口 */
const endPoint = computed<Point>(() => {
  const a = pointAt(0);

  return { x: a.x + gap.value.x, y: a.y + gap.value.y };
});

interface Arrow {
  from: Point;
  end: Point;
  color: string;
  label: string;
}

/** A = AB、b = BC、c = C→(链终点) */
const vectors = computed<Arrow[]>(() => [
  { from: pointAt(0), end: pointAt(1), color: "var(--c-accent)", label: "a" },
  { from: pointAt(1), end: pointAt(2), color: "var(--c-accent-2)", label: "b" },
  { from: pointAt(2), end: endPoint.value, color: "var(--c-physics)", label: "c" },
]);

/** 合矢量 = a + b + c（数值计算，闭合时严格为 0） */
const sum = computed<Point>(() => {
  let sumX = 0;
  let sumY = 0;

  for (const vector of vectors.value) {
    sumX += vector.end.x - vector.from.x;
    sumY += vector.end.y - vector.from.y;
  }

  return { x: sumX, y: sumY };
});

const isClosed = computed<boolean>(
  () => Math.abs(sum.value.x) < 1e-9 && Math.abs(sum.value.y) < 1e-9,
);

const format = (value: number): string => value.toFixed(1);

const sumTex = computed<string>(() =>
  isClosed.value
    ? String.raw`\vec{a} + \vec{b} + \vec{c} = (0,\;0)`
    : `\\vec{a} + \\vec{b} + \\vec{c} = (${format(sum.value.x)},\\;${format(sum.value.y)}) \\ne \\vec{0}`,
);

const vectorTexs = computed<string[]>(() =>
  vectors.value.map((vector, index) => {
    const dx = vector.end.x - vector.from.x;
    const dy = vector.end.y - vector.from.y;
    const name =
      [String.raw`\vec{a}`, String.raw`\vec{b}`, String.raw`\vec{c}`][index] ?? String.raw`\vec{a}`;

    return `${name} = (${format(dx)},\\;${format(dy)})`;
  }),
);

/** 三条矢量的名字：贴着各自中点、避开箭头（沿用旧图的方位） */
const LABEL_ANCHOR = ["center", "bottom-right", "top-right"] as const;
/** A 的名字再往右上方挪半格：让开 y 轴上的刻度数字「2」 */
const LABEL_SHIFT = [
  { x: 0.5, y: 0.45 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];
/** 三个顶点的名字：沿用旧图的方位 */
const VERTEX_ANCHOR = ["bottom-right", "top-right", "bottom-left"] as const;
const VERTEX_NAME = ["A", "B", "C"];

const toggleGap = (): void => {
  gap.value = isClosed.value ? { x: 1.5, y: -1.5 } : { x: 0, y: 0 };
};

/**
 * 指针位置 → 坐标平面上的格点（吸附到 0.5 格）
 *
 * @param event 指针事件
 * @param plot 绘图区四边（viewBox 用户单位）
 * @param view ViewBox 尺寸
 * @returns 吸附并夹取后的格点；SVG 还没量到尺寸时返回 null
 */
const pointerToUnit = (event: PointerEvent, plot: PlotArea, view: ViewBox): Point | null => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return null;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return null;

  const pointerX = ((event.clientX - rect.left) / rect.width) * view.width;
  const pointerY = ((event.clientY - rect.top) / rect.height) * view.height;

  return {
    x: clamp(
      snap(X_MIN + ((pointerX - plot.left) / (plot.right - plot.left)) * (X_MAX - X_MIN)),
      MIN_X,
      MAX_X,
    ),
    y: clamp(
      snap(Y_MAX - ((pointerY - plot.top) / (plot.bottom - plot.top)) * (Y_MAX - Y_MIN)),
      MIN_Y,
      MAX_Y,
    ),
  };
};

const onPointerMove = (event: PointerEvent, plot: PlotArea, view: ViewBox): void => {
  if (dragIndex.value < 0) return;

  const next = pointerToUnit(event, plot, view);

  if (!next) return;

  vertices.value = vertices.value.map((point, index) => (index === dragIndex.value ? next : point));
};

const startDrag = (index: number, event: PointerEvent): void => {
  dragIndex.value = index;
  (event.target as Element).setPointerCapture(event.pointerId);
};

const endDrag = (): void => {
  dragIndex.value = -1;
};

/** 图内标注走 `labels`（HTML + 真 KaTeX）：三条矢量的名字、三个顶点名，断开时再加"合矢量" */
const labels = computed(() => {
  const items = [
    ...vectors.value.map((vector, index) => ({
      x: (vector.from.x + vector.end.x) / 2 + (LABEL_SHIFT[index]?.x ?? 0),
      y: (vector.from.y + vector.end.y) / 2 + (LABEL_SHIFT[index]?.y ?? 0),
      tex: vector.label,
      anchor: LABEL_ANCHOR[index] ?? ("top-left" as const),
      color: vector.color,
      size: 19,
      halo: true,
    })),
    ...vertices.value.map((point, index) => ({
      x: point.x,
      y: point.y,
      tex: VERTEX_NAME[index] ?? "A",
      anchor: VERTEX_ANCHOR[index] ?? ("top-right" as const),
      color: "var(--c-text)",
      size: 15,
      halo: true,
    })),
  ];

  if (!isClosed.value) {
    items.push({
      x: (pointAt(0).x + endPoint.value.x) / 2,
      y: (pointAt(0).y + endPoint.value.y) / 2,
      tex: "\\text{合矢量}",
      anchor: "top-right" as const,
      color: "var(--c-danger)",
      size: 15,
      halo: true,
    });
  }

  return items;
});
</script>

<template>
  <div class="cp-wrap">
    <div class="cp-figure">
      <CoordAxes
        :x-range="[X_MIN, X_MAX]"
        :y-range="[Y_MIN, Y_MAX]"
        :x-axis="{ quantity: 'x' }"
        :y-axis="{ quantity: 'y' }"
        :ticks="{ x: TICKS_X, y: TICKS_Y, grid: true, gridStep: 1, direction: 'cross' }"
        :view="VIEW"
        :labels="labels"
      >
        <template #overlay="{ x, y, plot, px2user, width, height }">
          <!-- 合矢量（断开时才出现） -->
          <CourseArrow
            v-if="!isClosed"
            :from="{ x: x(pointAt(0).x), y: y(pointAt(0).y) }"
            :to="{ x: x(endPoint.x), y: y(endPoint.y) }"
            :head-size="12"
            stroke="var(--c-danger)"
            stroke-width="2.6"
            stroke-dasharray="7 4"
            pointer-events="none"
          />

          <!-- 三条首尾相接的矢量 -->
          <CourseArrow
            v-for="(vector, index) in vectors"
            :key="`v${index}`"
            :from="{ x: x(vector.from.x), y: y(vector.from.y) }"
            :to="{ x: x(vector.end.x), y: y(vector.end.y) }"
            :head-size="12"
            :stroke="vector.color"
            stroke-width="3.2"
            pointer-events="none"
          />

          <!-- 可拖动的顶点 -->
          <g v-for="(point, index) in vertices" :key="`p${index}`">
            <circle
              :cx="x(point.x)"
              :cy="y(point.y)"
              r="5"
              fill="var(--c-text)"
              opacity="0.9"
              pointer-events="none"
            />
            <circle
              :cx="x(point.x)"
              :cy="y(point.y)"
              :r="GRAB_PX * px2user"
              fill="transparent"
              class="cp-grab"
              @pointerdown="startDrag(index, $event)"
              @pointermove="onPointerMove($event, plot, { width, height })"
              @pointerup="endDrag"
              @pointercancel="endDrag"
            />
          </g>
        </template>
      </CoordAxes>
    </div>

    <div class="cp-info">
      <div class="cp-ask">先问：多长的"链"加起来会是 0？</div>
      <div class="cp-row">
        <span class="cp-dot cp-dot-gold" />首尾相接：<Latex :tex="vectorTexs[0] ?? ''" />
      </div>
      <div class="cp-row">
        <span class="cp-dot cp-dot-blue" /><Latex :tex="vectorTexs[1] ?? ''" />
      </div>
      <div class="cp-row">
        <span class="cp-dot cp-dot-teal" /><Latex :tex="vectorTexs[2] ?? ''" />
      </div>
      <div class="cp-key" :class="{ 'cp-key-open': !isClosed }"><Latex :tex="sumTex" /></div>
      <div class="cp-note">
        {{ isClosed ? "链的末端回到了起点 —— 合矢量为 0" : "链没闭合：合矢量就是那一段缺口" }}
      </div>
      <button type="button" class="cp-btn" @click="toggleGap">
        <mdi-gesture-tap /> {{ isClosed ? "断开链（看合矢量）" : "接回起点（看和为 0）" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.cp-wrap {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* 图的外壳（轴与刻度在 CoordAxes 里）：与旧手写 SVG 同一套边框 / 底色 */
.cp-figure {
  display: block;
  flex: 1 1 58%;

  min-width: 0;
  max-width: 19.5rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 45%);

  touch-action: none;
}

.cp-grab {
  cursor: grab;
  touch-action: none;
}

.cp-grab:active {
  cursor: grabbing;
}

.cp-info {
  display: flex;
  flex: 1 1 42%;
  flex-direction: column;
  gap: 0.55rem;

  min-width: 0;

  font-size: 0.95rem;
  line-height: 1.65;
}

.cp-ask {
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 1rem;
}

.cp-row {
  display: flex;
  gap: 0.45rem;
  align-items: center;
}

.cp-dot {
  flex-shrink: 0;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}

.cp-dot-gold {
  background: var(--c-accent);
}

.cp-dot-blue {
  background: var(--c-accent-2);
}

.cp-dot-teal {
  background: var(--c-physics);
}

.cp-key {
  padding-left: 0.75rem;
  border-left: 3px solid var(--c-accent);
  font-size: 1.02rem;
}

.cp-key-open {
  border-left-color: var(--c-danger);
}

.cp-note {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.cp-btn {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  align-self: flex-start;

  margin-top: 0.2rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid rgb(59 130 246 / 30%);
  border-radius: 2rem;

  background: rgb(59 130 246 / 14%);
  color: var(--c-text);

  font-size: 0.8rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.cp-btn:hover {
  background: rgb(59 130 246 / 24%);
}
</style>
