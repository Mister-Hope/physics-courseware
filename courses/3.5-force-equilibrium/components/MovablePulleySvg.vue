<script setup lang="ts">
import { computed, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * 第 21 页：轻绳跨过轻质动滑轮吊起重物（右侧悬挂点位于 L 形墙角，可沿竖直墙面向上移动，或沿水平墙面向右/向外移动）
 *
 * 物理规律（由绳总长 L 恒定与动滑轮两侧张力相等 T₁ = T₂ = T 严格解算）：
 *
 * 1. 水平方向平衡：T·sin α = T·sin β ⇒ α = β
 * 2. 几何关系：L₁·sin α + L₂·sin β = L·sin α = x_B - x_A ⇒ sin α = sin β = (x_B - x_A) / L
 * 3. 竖直方向平衡：2T·cos α = Mg ⇒ T = Mg / (2·cos α)
 *
 *    - 当右侧悬挂点 B 沿竖直墙面向上/向下移动时：水平跨距 (x_B - x_A) 不变 ⇒ α、β 保持不变，绳拉力 T 保持不变；
 *    - 当右侧悬挂点 B 沿水平墙面向外（右）移动时：水平跨距 (x_B - x_A) 增大 ⇒ α、β 均增大，绳拉力 T 随之增大。
 */
const LEFT_ANCHOR: Point = { x: 48, y: 40 }; // 左侧固定悬挂点
const POINT_A: Point = { x: 244, y: 28 }; // 右侧竖直墙面最高点 A
const POINT_B: Point = { x: 244, y: 96 }; // 右侧墙角拐点 B（默认位置）
const POINT_C: Point = { x: 318, y: 96 }; // 右侧水平墙面最右点 C
const ROPE_LEN = 336; // 整根轻绳总长 L（恒定不变）

/** 右侧可动悬挂点的当前坐标（初始正好位于墙角 B 处） */
const bx = ref<number>(POINT_B.x);
const by = ref<number>(POINT_B.y);

/** 由公式 sin α = (x_B - x_left) / L 实时解算夹角与动滑轮位置 P */
const sinAlpha = computed<number>(() => (bx.value - LEFT_ANCHOR.x) / ROPE_LEN);
const cosAlpha = computed<number>(() => Math.sqrt(Math.max(0.04, 1 - sinAlpha.value ** 2)));
const tanAlpha = computed<number>(() => sinAlpha.value / cosAlpha.value);
const alphaRad = computed<number>(() => Math.asin(clamp(sinAlpha.value, 0, 0.98)));

/** 动滑轮圆心 P(x_P, y_P)：满足两侧绳长之和 = L 且与竖直方向夹角严格相等 α = β */
const P = computed<Point>(() => {
  const dx = bx.value - LEFT_ANCHOR.x;
  const verticalSpan = Math.sqrt(Math.max(1, ROPE_LEN ** 2 - dx ** 2));
  const py = (LEFT_ANCHOR.y + by.value + verticalSpan) / 2;
  const px = (LEFT_ANCHOR.x + bx.value) / 2 + ((by.value - LEFT_ANCHOR.y) / 2) * tanAlpha.value;
  return { x: px, y: py };
});

/** 重力 Mg 矢量长度与两侧绳拉力 T 矢量长度（严格满足 T = Mg / (2 cos α) 比例） */
const MG_LEN = 48;
const T_SCALE = 62;
const tLen = computed<number>(() => T_SCALE / (2 * cosAlpha.value));

/** 三个力矢量的终点坐标 */
const leftTip = computed<Point>(() => ({
  x: P.value.x - tLen.value * sinAlpha.value,
  y: P.value.y - tLen.value * cosAlpha.value,
}));
const rightTip = computed<Point>(() => ({
  x: P.value.x + tLen.value * sinAlpha.value,
  y: P.value.y - tLen.value * cosAlpha.value,
}));
const mgTip = computed<Point>(() => ({
  x: P.value.x,
  y: P.value.y + MG_LEN,
}));

/** 两侧拉力标注 T 的外侧偏移坐标（置于箭头尖端外侧，绝不侵入 α、β 角扇区） */
const leftTLabel = computed<Point>(() => ({
  x: leftTip.value.x - 13,
  y: leftTip.value.y + 2,
}));
const rightTLabel = computed<Point>(() => ({
  x: rightTip.value.x + 13,
  y: rightTip.value.y + 2,
}));

/** 夹角圆弧半径与角平分线上的 α、β 标注坐标（始终位于 T 箭头上方且严格居中于角平分线） */
const arcR = computed<number>(() => Math.max(58, Math.round(tLen.value + 13)));
const vertTopY = computed<number>(() => P.value.y - arcR.value - 22);

const alphaArcPath = computed<string>(() => {
  const r = arcR.value;
  const startX = P.value.x;
  const startY = P.value.y - r;
  const endX = P.value.x - r * sinAlpha.value;
  const endY = P.value.y - r * cosAlpha.value;
  return `M ${startX} ${startY} A ${r} ${r} 0 0 0 ${endX} ${endY}`;
});

const betaArcPath = computed<string>(() => {
  const r = arcR.value;
  const startX = P.value.x;
  const startY = P.value.y - r;
  const endX = P.value.x + r * sinAlpha.value;
  const endY = P.value.y - r * cosAlpha.value;
  return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
});

/** α、β 严格放在各自夹角的角平分线上（半角 α/2 处） */
const alphaLabel = computed<Point>(() => {
  const half = alphaRad.value / 2;
  const r = arcR.value + 13;
  return {
    x: P.value.x - r * Math.sin(half),
    y: P.value.y - r * Math.cos(half),
  };
});

const betaLabel = computed<Point>(() => {
  const half = alphaRad.value / 2;
  const r = arcR.value + 13;
  return {
    x: P.value.x + r * Math.sin(half),
    y: P.value.y - r * Math.cos(half),
  };
});

/** 拖拽右侧墙角悬挂点 B：自动吸附到 L 形墙面的竖直段（向上）或水平段（向外） */
const dragging = ref(false);

const updateAnchorFromEvent = (event: PointerEvent): void => {
  const current = event.currentTarget as SVGElement | null;
  const svg = current?.ownerSVGElement ?? (current as unknown as SVGSVGElement | null);
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const ux = ((event.clientX - rect.left) / rect.width) * 340;
  const uy = ((event.clientY - rect.top) / rect.height) * 300;

  // 分别计算指针到竖直墙段 AB (x = POINT_B.x, y ∈ [POINT_A.y, POINT_B.y]) 与水平墙段 BC (y = POINT_B.y, x ∈ [POINT_B.x, POINT_C.x]) 的最近点
  const vy = clamp(uy, POINT_A.y, POINT_B.y);
  const distVertSq = (ux - POINT_B.x) ** 2 + (uy - vy) ** 2;

  const wallX = clamp(ux, POINT_B.x, POINT_C.x);
  const distHorizSq = (ux - wallX) ** 2 + (uy - POINT_B.y) ** 2;

  if (distVertSq <= distHorizSq) {
    bx.value = POINT_B.x;
    by.value = Math.round(vy);
  } else {
    bx.value = Math.round(wallX);
    by.value = POINT_B.y;
  }
};

const startDrag = (event: PointerEvent): void => {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture(event.pointerId);
  updateAnchorFromEvent(event);
};

const moveDrag = (event: PointerEvent): void => {
  if (dragging.value) updateAnchorFromEvent(event);
};

const endDrag = (): void => {
  dragging.value = false;
};
</script>

<template>
  <!-- 第 21 页：轻绳跨过轻质动滑轮吊起重物：右侧墙角悬挂点可在 A（最高点）、B（墙角点）、C（最右点）之间沿墙移动 -->
  <svg class="fig-mp" viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg">
    <!-- ==================== 1. 左侧固定支座与右侧 L 形墙角结构（全部复用 SurfaceHatch 组件） ==================== -->
    <!-- 左侧固定天花板支座 -->
    <SurfaceHatch :from="{ x: 20, y: 40 }" :to="{ x: 76, y: 40 }" side="above" color="#64748b" :line-width="2.4" :thickness="11" :gap="14" />
    <circle :cx="LEFT_ANCHOR.x" :cy="LEFT_ANCHOR.y" r="4.2" fill="#94a3b8" stroke="#0f1425" stroke-width="1.4" />

    <!-- 右上角 L 形墙角：竖直墙面（B → A 向上移动段） -->
    <SurfaceHatch
      :from="{ x: POINT_B.x, y: 16 }"
      :to="{ x: POINT_B.x, y: POINT_B.y }"
      side="right"
      color="#64748b"
      :line-width="2.4"
      :thickness="12"
      :gap="16"
    />
    <!-- 右上角 L 形墙角：水平墙面（B → C 向外/向右移动段） -->
    <SurfaceHatch
      :from="{ x: POINT_B.x, y: POINT_B.y }"
      :to="{ x: 332, y: POINT_B.y }"
      side="above"
      color="#64748b"
      :line-width="2.4"
      :thickness="12"
      :gap="16"
    />

    <!-- L 形墙角滑轨亮色引导虚线（A — B — C） -->
    <polyline
      :points="`${POINT_A.x},${POINT_A.y} ${POINT_B.x},${POINT_B.y} ${POINT_C.x},${POINT_C.y}`"
      fill="none"
      stroke="rgba(226,168,70,0.45)"
      stroke-width="2.2"
      stroke-dasharray="4 4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- 三个关键位置点位标记（最高点 A、墙角点 B、最右点 C） -->
    <circle :cx="POINT_A.x" :cy="POINT_A.y" r="3.2" fill="#1e293b" stroke="#e2a846" stroke-width="1.5" />
    <circle :cx="POINT_B.x" :cy="POINT_B.y" r="3.2" fill="#1e293b" stroke="#e2a846" stroke-width="1.5" />
    <circle :cx="POINT_C.x" :cy="POINT_C.y" r="3.2" fill="#1e293b" stroke="#e2a846" stroke-width="1.5" />

    <text
      :x="POINT_A.x - 15"
      :y="POINT_A.y"
      fill="#e2a846"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      text-anchor="middle"
      dominant-baseline="central"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      A
    </text>
    <text
      :x="POINT_B.x + 4"
      :y="POINT_B.y + 16"
      fill="#e2a846"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      text-anchor="middle"
      dominant-baseline="central"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      B
    </text>
    <text
      :x="POINT_C.x + 4"
      :y="POINT_C.y + 16"
      fill="#e2a846"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      text-anchor="middle"
      dominant-baseline="central"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      C
    </text>

    <!-- ==================== 2. 轻绳、竖直参考虚线、夹角 α/β 与动滑轮重物 ==================== -->
    <!-- 两侧轻绳 -->
    <line :x1="LEFT_ANCHOR.x" :y1="LEFT_ANCHOR.y" :x2="P.x" :y2="P.y" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round" />
    <line :x1="P.x" :y1="P.y" :x2="bx" :y2="by" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round" />

    <!-- 过动滑轮圆心 P 的竖直向上参考虚线 -->
    <line :x1="P.x" :y1="P.y" :x2="P.x" :y2="vertTopY" stroke="#64748b" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.85" />

    <!-- 左侧夹角 α 圆弧与角平分线标注 -->
    <path :d="alphaArcPath" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text
      :x="alphaLabel.x"
      :y="alphaLabel.y"
      fill="#cbd5e1"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      text-anchor="middle"
      dominant-baseline="central"
    >
      α
    </text>

    <!-- 右侧夹角 β 圆弧与角平分线标注 -->
    <path :d="betaArcPath" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text
      :x="betaLabel.x"
      :y="betaLabel.y"
      fill="#cbd5e1"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      text-anchor="middle"
      dominant-baseline="central"
    >
      β
    </text>

    <!-- 动滑轮下方吊绳与重物 Mg -->
    <line :x1="P.x" :y1="P.y" :x2="P.x" :y2="P.y + 52" stroke="#94a3b8" stroke-width="2.2" />
    <rect :x="P.x - 25" :y="P.y + 52" width="50" height="30" rx="6" fill="rgba(96,165,250,0.16)" stroke="#60a5fa" stroke-width="2" />

    <!-- 轻质动滑轮轮体 -->
    <circle :cx="P.x" :cy="P.y" r="13" fill="rgba(15,20,37,0.88)" stroke="#e2a846" stroke-width="2.6" />
    <circle :cx="P.x" :cy="P.y" r="3.6" fill="#e2a846" />

    <!-- ==================== 3. 动滑轮受力矢量 T、T、Mg ==================== -->
    <g v-click="1">
      <CourseArrow :from="P" :to="leftTip" :head-size="10" stroke="#2dd4bf" stroke-width="3.2" />
      <CourseArrow :from="P" :to="rightTip" :head-size="10" stroke="#2dd4bf" stroke-width="3.2" />
      <CourseArrow :from="P" :to="mgTip" :head-size="10" stroke="#f87171" stroke-width="3.2" />

      <text
        :x="leftTLabel.x"
        :y="leftTLabel.y"
        fill="#2dd4bf"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        text-anchor="middle"
        dominant-baseline="central"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        T
      </text>
      <text
        :x="rightTLabel.x"
        :y="rightTLabel.y"
        fill="#2dd4bf"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        text-anchor="middle"
        dominant-baseline="central"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        T
      </text>
      <text
        :x="mgTip.x + 18"
        :y="mgTip.y - 5"
        fill="#f87171"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        text-anchor="middle"
        dominant-baseline="central"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        Mg
      </text>
    </g>

    <!-- ==================== 4. 右侧墙角可动悬挂点 B 与交互热区 ==================== -->
    <circle :cx="bx" :cy="by" r="9" fill="rgba(226,168,70,0.2)" />
    <circle :cx="bx" :cy="by" r="5.5" fill="#e2a846" stroke="#0f1425" stroke-width="1.8" />

    <!-- 覆盖整个 L 形墙角滑轨的点击/拖拽热区 -->
    <rect
      x="220"
      y="14"
      width="116"
      height="108"
      fill="transparent"
      class="mp-grab"
      @pointerdown="startDrag"
      @pointermove="moveDrag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
    />
  </svg>
</template>

<style scoped>
.fig-mp {
  display: block;

  width: 100%;
  height: auto;

  user-select: none;
  touch-action: none;
}

.mp-grab {
  cursor: grab;
}

.mp-grab:active {
  cursor: grabbing;
}
</style>
