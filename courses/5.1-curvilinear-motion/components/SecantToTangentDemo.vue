<script setup lang="ts">
// 用于第 13 页（从割线到切线）：A 固定，**直接用鼠标把 B 点沿曲线拖向 A**（点曲线上任意位置也可以），
// 割线 AB 的方向逐渐逼近 A 点的切线方向；B 拖到与 A 重合时，割线就变成切线。
import { computed, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

const point0: Point = { x: 80, y: 278 };
const control1: Point = { x: 260, y: 108 };
const control2: Point = { x: 560, y: 108 };
const point1: Point = { x: 820, y: 258 };

const VIEW_W = 880;
const VIEW_H = 340;
/** A 点在曲线上的位置 */
const T_A = 0.35;
/** B 点能拖到的最左位置：比 A 稍右一点点，避免与 A 完全重合后退化 */
const T_MIN = T_A + 0.006;
const T_MAX = 0.99;

const bezier = (t: number): Point => {
  const invT = 1 - t;
  return {
    x:
      invT * invT * invT * point0.x +
      3 * invT * invT * t * control1.x +
      3 * invT * t * t * control2.x +
      t * t * t * point1.x,
    y:
      invT * invT * invT * point0.y +
      3 * invT * invT * t * control1.y +
      3 * invT * t * t * control2.y +
      t * t * t * point1.y,
  };
};

const derivative = (t: number): Point => {
  const invT = 1 - t;
  return {
    x:
      3 * invT * invT * (control1.x - point0.x) +
      6 * invT * t * (control2.x - control1.x) +
      3 * t * t * (point1.x - control2.x),
    y:
      3 * invT * invT * (control1.y - point0.y) +
      6 * invT * t * (control2.y - control1.y) +
      3 * t * t * (point1.y - control2.y),
  };
};

const unit = (point: Point): Point => {
  const len = Math.hypot(point.x, point.y) || 1;
  return { x: point.x / len, y: point.y / len };
};

const paramB = ref(0.92);

const pointA = computed(() => bezier(T_A));
const pointB = computed(() => bezier(paramB.value));
/** B 与 A 是否已经贴在一起 —— 此时割线就是切线 */
const merged = computed(
  () => Math.hypot(pointB.value.x - pointA.value.x, pointB.value.y - pointA.value.y) < 16,
);

const curvePath = `M ${point0.x} ${point0.y} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${point1.x} ${point1.y}`;

/** 割线 AB：经过 A、B 并稍向两端延伸 */
const secant = computed(() => {
  const unitVec = unit({ x: pointB.value.x - pointA.value.x, y: pointB.value.y - pointA.value.y });
  return {
    x1: pointA.value.x - 50 * unitVec.x,
    y1: pointA.value.y - 50 * unitVec.y,
    x2: pointB.value.x + 70 * unitVec.x,
    y2: pointB.value.y + 70 * unitVec.y,
  };
});

/** A 点的切线 */
const tangent = computed(() => {
  const unitVec = unit(derivative(T_A));
  return {
    x1: pointA.value.x - 150 * unitVec.x,
    y1: pointA.value.y - 150 * unitVec.y,
    x2: pointA.value.x + 160 * unitVec.x,
    y2: pointA.value.y + 160 * unitVec.y,
  };
});

const secantMid = computed(() => ({
  x: (pointA.value.x + pointB.value.x) / 2,
  y: (pointA.value.y + pointB.value.y) / 2,
}));

const tangentLabel = computed(() => ({
  x: tangent.value.x2 - 40,
  y: tangent.value.y2 - 14,
}));

/* ── 拖拽 B：把鼠标位置换算成"曲线上最近的点" ── */
const svgRef = ref<SVGSVGElement | null>(null);
const dragging = ref(false);

const toLocal = (event: PointerEvent): Point => {
  const rect = svgRef.value?.getBoundingClientRect();
  if (!rect) return pointB.value;
  return {
    x: ((event.clientX - rect.left) / rect.width) * VIEW_W,
    y: ((event.clientY - rect.top) / rect.height) * VIEW_H,
  };
};

/**
 * 取曲线上离鼠标最近的位置作为 B（限制在 A 右侧，所以往左拖到底就与 A 重合）
 *
 * @param point 鼠标位置（已换算到 SVG 用户坐标）
 */
const moveBTo = (point: Point): void => {
  let bestT = T_MIN;
  let bestDist = Number.POSITIVE_INFINITY;
  const steps = 200;
  for (let i = 0; i <= steps; i += 1) {
    const t = T_MIN + (i / steps) * (T_MAX - T_MIN);
    const curvePoint = bezier(t);
    const dist = (curvePoint.x - point.x) ** 2 + (curvePoint.y - point.y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestT = t;
    }
  }
  paramB.value = bestT;
};

const onDown = (event: PointerEvent): void => {
  dragging.value = true;
  moveBTo(toLocal(event));
};

const onMove = (event: PointerEvent): void => {
  if (dragging.value) moveBTo(toLocal(event));
};

const onUp = (): void => {
  dragging.value = false;
};
</script>

<template>
  <div class="stt">
    <svg
      ref="svgRef"
      viewBox="0 0 880 340"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ 'stt-grabbing': dragging }"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointerleave="onUp"
    >
      <path
        :d="curvePath"
        fill="none"
        stroke="#2dd4bf"
        stroke-width="3.6"
        stroke-linecap="round"
        opacity="0.9"
      />
      <line
        :x1="secant.x1"
        :y1="secant.y1"
        :x2="secant.x2"
        :y2="secant.y2"
        stroke="#94a3b8"
        stroke-width="2.4"
        stroke-dasharray="9 7"
        stroke-linecap="round"
        opacity="0.9"
      />
      <line
        :x1="tangent.x1"
        :y1="tangent.y1"
        :x2="tangent.x2"
        :y2="tangent.y2"
        stroke="#e2a846"
        stroke-width="3"
        stroke-linecap="round"
        opacity="0.95"
      />
      <CourseArrow :from="pointB" :to="pointA" stroke="#60a5fa" stroke-width="3" />
      <circle :cx="pointA.x" :cy="pointA.y" r="6.5" fill="#e2a846" />
      <circle :cx="pointB.x" :cy="pointB.y" r="20" fill="rgba(96,165,250,0.16)" stroke="none" />
      <circle :cx="pointB.x" :cy="pointB.y" r="6.5" fill="#60a5fa" />
      <text
        :x="pointA.x - 26"
        :y="pointA.y + 26"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="#e2a846"
      >
        A
      </text>
      <text
        :x="pointB.x + 12"
        :y="pointB.y - 14"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="#60a5fa"
      >
        B
      </text>
      <text
        :x="secantMid.x - 40"
        :y="secantMid.y - 16"
        font-family="KaTeX_Main"
        font-size="20"
        fill="#94a3b8"
      >
        割线
      </text>
      <text
        :x="tangentLabel.x"
        :y="tangentLabel.y"
        font-family="KaTeX_Main"
        font-size="20"
        fill="#e2a846"
      >
        切线
      </text>
      <text :x="300" :y="46" font-family="KaTeX_Main" font-size="21" fill="#60a5fa">
        蓝箭头：物体由 B 运动到 A 的平均速度方向
      </text>
      <text :x="300" :y="78" font-family="KaTeX_Main" font-size="21" fill="#e2a846">
        金线：曲线在 A 点的切线方向
      </text>
    </svg>
    <div class="stt-bar">
      <span class="stt-state" :class="{ 'stt-state-on': merged }">
        {{ merged ? "B 与 A 重合：割线的方向就是切线方向" : "割线与切线还不重合" }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.stt {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.stt svg {
  cursor: grab;
  touch-action: none;
}

.stt-grabbing {
  cursor: grabbing;
}

.stt-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.1rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.9rem;
}

.stt-tip {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
}

.stt-state {
  color: var(--c-text-dim);
}

.stt-state-on {
  color: #e2a846;
  font-weight: 700;
}
</style>
