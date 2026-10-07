<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 第 20 页：半球面上的小球（可拖：按住小球沿半球面升降）。
 *
 * 左图是装置：半球面半径 R、顶端正上方 H 处的定滑轮、跨过滑轮向左拉出的绳、与半球面**相切**的小球（半径 r）。 右图是力的三角形：它永远与几何三角形 OPQ 相似（G ∥ OQ、F_N ∥ OP、F_T ∥ PQ）。
 *
 * 物理全部由 `computed` 真实计算：F_N/G = OP/OQ = (R+r)/H 不变；F_T/G = PQ/OQ，球升高时 PQ 变小 ⇒ F_T 变小。
 */
const { $clicks } = useSlideContext();
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 3)));

const rad = (deg: number): number => (deg * Math.PI) / 180;
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** 装置几何 */
const origin = { x: 150, y: 230 }; // 半球面球心
const R = 110; // 半球面半径
const BALL_R = 10; // 小球半径（小球与半球面相切 ⇒ 球心到 O 的距离是 R + r）
const PULLEY = { x: 150, y: 60 }; // 定滑轮圆心
const PULLEY_R = 11;
const PULLEY_HEIGHT = origin.y - PULLEY.y; // 滑轮圆心到 O 的高度

/** 小球偏角（相对竖直方向）可调范围：太靠顶会贴到滑轮，太靠下就滑到边缘 */
const PHI_MIN = 15;
const PHI_MAX = 58;
const phi = ref(45);

/** 三个力的箭头长度比例（G 画成 G_PX 长） */
const G_PX = 68;

const ball = computed(() => {
  const d = R + BALL_R;

  return { x: origin.x + d * Math.sin(rad(phi.value)), y: origin.y - d * Math.cos(rad(phi.value)) };
});

/** 球与半球面的切点（球心与 O 的连线和半球面的交点） */
const touch = computed(() => ({
  x: origin.x + R * Math.sin(rad(phi.value)),
  y: origin.y - R * Math.cos(rad(phi.value)),
}));

/** 球心到滑轮圆心的距离：F_T/G = PQ/OQ */
const PQ = computed<number>(() => Math.hypot(ball.value.x - PULLEY.x, ball.value.y - PULLEY.y));
const fnRatio = computed<number>(() => (R + BALL_R) / PULLEY_HEIGHT);
const ftRatio = computed<number>(() => PQ.value / PULLEY_HEIGHT);

/** 绳与滑轮的切点（取靠右的那个） */
const tangent = computed(() => {
  const dx = ball.value.x - PULLEY.x;
  const dy = ball.value.y - PULLEY.y;
  const d = Math.hypot(dx, dy);
  const psi = Math.acos(PULLEY_R / d);
  const base = Math.atan2(dy, dx);

  return { x: PULLEY.x + PULLEY_R * Math.cos(base - psi), y: PULLEY.y + PULLEY_R * Math.sin(base - psi) };
});

/** 绳在滑轮顶部的出绳点（水平向左拉出） */
const exit = { x: PULLEY.x, y: PULLEY.y - PULLEY_R };

/** 三个力箭头的终点（都从球心出发） */
const tips = computed(() => ({
  g: { x: ball.value.x, y: ball.value.y + G_PX },
  normal: { x: ball.value.x + G_PX * fnRatio.value * Math.sin(rad(phi.value)), y: ball.value.y - G_PX * fnRatio.value * Math.cos(rad(phi.value)) },
  t: {
    x: ball.value.x + (G_PX * ftRatio.value * (PULLEY.x - ball.value.x)) / PQ.value,
    y: ball.value.y + (G_PX * ftRatio.value * (PULLEY.y - ball.value.y)) / PQ.value,
  },
}));

/** 力的三角形：与 OPQ 相似（缩放 s），三边标成 G、F_N、F_T */
const S = 0.86;
const triO = { x: 86, y: 236 };
const triQ = { x: triO.x, y: triO.y - PULLEY_HEIGHT * S };
const triP = computed(() => ({
  x: triO.x + (R + BALL_R) * S * Math.sin(rad(phi.value)),
  y: triO.y - (R + BALL_R) * S * Math.cos(rad(phi.value)),
}));

/** 拖动小球：把指针位置换算成它相对 O 的偏角 */
const dragging = ref(false);

const drag = (event: PointerEvent): void => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  const userX = ((event.clientX - rect.left) / rect.width) * 340;
  const userY = ((event.clientY - rect.top) / rect.height) * 270;
  const deg = (Math.atan2(userX - origin.x, origin.y - userY) * 180) / Math.PI;

  phi.value = clamp(Math.round(deg), PHI_MIN, PHI_MAX);
};

const startDrag = (event: PointerEvent): void => {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture(event.pointerId);
};

const moveDrag = (event: PointerEvent): void => {
  if (dragging.value) drag(event);
};

const endDrag = (): void => {
  dragging.value = false;
};
</script>

<template>
  <div class="hb-wrap">
    <!-- 左：装置（可拖小球） -->
    <div class="hb-fig">
      <svg viewBox="0 0 340 270" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="230" x2="320" y2="230" stroke="#64748b" stroke-width="2.4" />
        <path d="M 40 230 A 110 110 0 0 1 260 230" fill="none" stroke="#94a3b8" stroke-width="2.4" />
        <!-- 竖直轴 OQ（G 的方向）与半径 OP -->
        <line :x1="origin.x" :y1="origin.y" :x2="origin.x" :y2="PULLEY.y" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.75" />
        <line :x1="origin.x" :y1="origin.y" :x2="ball.x" :y2="ball.y" stroke="#94a3b8" stroke-width="1.6" />
        <!-- 顶部支架与定滑轮 -->
        <line x1="110" y1="30" x2="190" y2="30" stroke="#94a3b8" stroke-width="2.6" />
        <line :x1="PULLEY.x" y1="30" :x2="PULLEY.x" :y2="PULLEY.y - PULLEY_R" stroke="#94a3b8" stroke-width="2.2" />
        <circle :cx="PULLEY.x" :cy="PULLEY.y" :r="PULLEY_R" fill="none" stroke="#e2a846" stroke-width="2.4" />
        <circle :cx="PULLEY.x" :cy="PULLEY.y" r="3.2" fill="#e2a846" />
        <!-- 绳：小球 → 滑轮切点 → 绕过轮顶 → 向左水平拉出 -->
        <line :x1="ball.x" :y1="ball.y" :x2="tangent.x" :y2="tangent.y" stroke="#94a3b8" stroke-width="2.2" />
        <path :d="`M ${tangent.x} ${tangent.y} A ${PULLEY_R} ${PULLEY_R} 0 0 0 ${exit.x} ${exit.y}`" fill="none" stroke="#94a3b8" stroke-width="2.2" />
        <line :x1="exit.x" :y1="exit.y" x2="26" :y2="exit.y" stroke="#94a3b8" stroke-width="2.2" />
        <!-- 小球（与半球面相切）与拖拽热区 -->
        <circle :cx="ball.x" :cy="ball.y" :r="BALL_R" fill="rgba(96,165,250,0.22)" stroke="#60a5fa" stroke-width="2.2" />
        <circle :cx="touch.x" :cy="touch.y" r="2.6" fill="#94a3b8" />
        <circle
          :cx="ball.x"
          :cy="ball.y"
          :r="22"
          fill="transparent"
          class="fe-grab"
          @pointerdown="startDrag"
          @pointermove="moveDrag"
          @pointerup="endDrag"
          @pointercancel="endDrag"
        />
        <!-- 几何标注 -->
        <text :x="origin.x - 18" :y="origin.y + 18" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">O</text>
        <text :x="PULLEY.x - 20" :y="PULLEY.y - 16" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">Q</text>
        <text :x="ball.x + 14" :y="ball.y - 12" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="15">P</text>
        <text :x="origin.x + 14" :y="origin.y - 54" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="14">R</text>
        <text :x="origin.x + 8" :y="PULLEY.y + 88" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="14">H</text>
        <!-- 三个力：点一下才出 -->
        <g v-click="1">
          <CourseArrow :from="ball" :to="tips.g" :head-size="13" stroke="#f87171" stroke-width="3.8" />
          <text :x="tips.g.x + 8" :y="tips.g.y - 4" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="19">G</text>
          <CourseArrow :from="ball" :to="tips.normal" :head-size="13" stroke="#2dd4bf" stroke-width="3.8" />
          <text :x="tips.normal.x + 6" :y="tips.normal.y - 6" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="19">F</text>
          <text :x="tips.normal.x + 18" :y="tips.normal.y - 2" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="12">N</text>
          <CourseArrow :from="ball" :to="tips.t" :head-size="13" stroke="#e2a846" stroke-width="3.8" />
          <text :x="tips.t.x - 26" :y="tips.t.y - 6" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="19">F</text>
          <text :x="tips.t.x - 20" :y="tips.t.y - 2" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="12">T</text>
        </g>
      </svg>
    </div>

    <!-- 右：力的三角形（与 OPQ 相似） -->
    <div class="hb-tri" :class="{ 'fe-hidden': step < 1 }">
      <svg viewBox="52 58 176 210" xmlns="http://www.w3.org/2000/svg">
        <CourseArrow :from="triQ" :to="triO" :head-size="11" stroke="#f87171" stroke-width="3.4" />
        <CourseArrow :from="triO" :to="triP" :head-size="11" stroke="#2dd4bf" stroke-width="3.4" />
        <CourseArrow :from="triP" :to="triQ" :head-size="11" stroke="#e2a846" stroke-width="3.4" />
        <text :x="triO.x - 26" :y="(triO.y + triQ.y) / 2" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="18">G</text>
        <text :x="(triO.x + triP.x) / 2 + 12" :y="(triO.y + triP.y) / 2 + 4" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="18">F</text>
        <text :x="(triO.x + triP.x) / 2 + 23" :y="(triO.y + triP.y) / 2 + 8" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="12">N</text>
        <text :x="(triP.x + triQ.x) / 2 - 6" :y="(triP.y + triQ.y) / 2 - 10" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="18">F</text>
        <text :x="(triP.x + triQ.x) / 2 + 5" :y="(triP.y + triQ.y) / 2 - 6" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="12">T</text>
        <text :x="triO.x - 20" :y="triO.y + 18" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="14">O</text>
        <text :x="triQ.x - 18" :y="triQ.y - 10" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="14">Q</text>
        <text :x="triP.x + 10" :y="triP.y - 10" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="14">P</text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.hb-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  align-items: stretch;

  width: 100%;
  min-height: 0;
}

.hb-fig,
.hb-tri {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 0;
}

.hb-fig svg,
.hb-tri svg {
  width: 100%;
  height: auto;
  max-height: 100%;
}
</style>
