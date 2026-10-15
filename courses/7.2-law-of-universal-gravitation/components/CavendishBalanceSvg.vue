<!-- 卡文迪什扭秤（第 9 页）：T 形架绕竖直轴扭转（图中把扭转角画大以便看清），平面镜转过 θ、反射光线转过 2θ，远处的刻度尺把微小的扭转放大成明显的移动 -->
<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{
  /** 0 = 未扭转；1 = 大球吸引小球、T 形架扭转 */
  step?: number;
}>();

const twisted = computed(() => step >= 1);

/** 竖直悬挂轴（石英丝与 T 形架的竖直杆都在这条线上） */
const AXIS = { x: 225, y: 120 };
const BAR_Y = 178;
/** 横杆在透视下的两个半轴：水平半轴 A、进深半轴 B（B 越大，越像从斜上方看） */
const BAR_A = 100;
const BAR_B = 58;
/** 扭转角（度） */
const theta = computed(() => (twisted.value ? 22 : 0));
const thetaRad = computed(() => (theta.value * Math.PI) / 180);

/** 横杆两端：绕竖直轴转过 θ 后，端点在透视投影下沿椭圆移动 */
const endA = computed(() => ({
  x: AXIS.x + BAR_A * Math.cos(thetaRad.value),
  y: BAR_Y + BAR_B * Math.sin(thetaRad.value),
}));
const endB = computed(() => ({
  x: AXIS.x - BAR_A * Math.cos(thetaRad.value),
  y: BAR_Y - BAR_B * Math.sin(thetaRad.value),
}));

/** 平面镜装在竖直杆上：随架子一起转，投影宽度按 cos θ 缩短 */
const MIRROR = { x: AXIS.x, y: 148 };
const mirrorHalfW = computed(() => 10 * Math.cos(thetaRad.value));
const MIRROR_HALF_H = 15;

const mirrorFront = computed(
  () =>
    `M ${MIRROR.x - mirrorHalfW.value} ${MIRROR.y - MIRROR_HALF_H} ` +
    `L ${MIRROR.x + mirrorHalfW.value} ${MIRROR.y - MIRROR_HALF_H} ` +
    `L ${MIRROR.x + mirrorHalfW.value} ${MIRROR.y + MIRROR_HALF_H} ` +
    `L ${MIRROR.x - mirrorHalfW.value} ${MIRROR.y + MIRROR_HALF_H} Z`,
);
const mirrorSide = computed(
  () =>
    `M ${MIRROR.x + mirrorHalfW.value} ${MIRROR.y - MIRROR_HALF_H} ` +
    `L ${MIRROR.x + mirrorHalfW.value + 6} ${MIRROR.y - MIRROR_HALF_H + 4} ` +
    `L ${MIRROR.x + mirrorHalfW.value + 6} ${MIRROR.y + MIRROR_HALF_H + 4} ` +
    `L ${MIRROR.x + mirrorHalfW.value} ${MIRROR.y + MIRROR_HALF_H} Z`,
);

/** 刻度尺 */
const RULER_Y = 68;
const RULER_X1 = 150;
const RULER_X2 = 430;
const ticks = Array.from({ length: 15 }, (_, index) => RULER_X1 + 10 + index * 20);

/** 光源与基准光点 */
const LAMP = { x: 48, y: 80 };
const BASE_SPOT = { x: 330, y: RULER_Y };

/** 反射光线的光点：平面镜转过 θ，反射光线转过 2θ（反射定律）； 把基准方向绕入射点旋转 −2θ，再求它与刻度尺所在直线的交点。 */
const spot = computed(() => {
  const dx = BASE_SPOT.x - MIRROR.x;
  const dy = BASE_SPOT.y - MIRROR.y;
  const phi = (-2 * theta.value * Math.PI) / 180;
  const rx = dx * Math.cos(phi) - dy * Math.sin(phi);
  const ry = dx * Math.sin(phi) + dy * Math.cos(phi);
  const t = (RULER_Y - MIRROR.y) / ry;

  return { x: MIRROR.x + rx * t, y: RULER_Y };
});

/**
 * 两点之间的单位方向向量（画 2θ 圆弧用）
 *
 * @param from 起点
 * @param to 终点
 * @returns 从起点指向终点的单位向量
 */
const unit = (from: { x: number; y: number }, to: { x: number; y: number }): { x: number; y: number } => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;

  return { x: dx / length, y: dy / length };
};
const baseDir = computed(() => unit(MIRROR, BASE_SPOT));
const reflectedDir = computed(() => unit(MIRROR, spot.value));
const rayArc = computed(() => {
  const r = 42;
  const start = { x: MIRROR.x + baseDir.value.x * r, y: MIRROR.y + baseDir.value.y * r };
  const end = { x: MIRROR.x + reflectedDir.value.x * r, y: MIRROR.y + reflectedDir.value.y * r };

  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 0 ${end.x} ${end.y}`;
});
const rayLabel = computed(() => {
  const r = 30;
  const mx = (baseDir.value.x + reflectedDir.value.x) / 2;
  const my = (baseDir.value.y + reflectedDir.value.y) / 2;
  const len = Math.hypot(mx, my) || 1;

  return { x: MIRROR.x + (mx / len) * r, y: MIRROR.y + (my / len) * r };
});

/** T 形架转过的角 θ：画在横杆原位置与现位置之间 */
const frameArc = computed(() => `M ${AXIS.x + BAR_A} ${BAR_Y} A ${BAR_A} ${BAR_A} 0 0 1 ${endA.value.x} ${endA.value.y}`);
</script>

<template>
  <svg viewBox="0 0 480 300" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs>
      <!-- 小球（蓝）与大球（金）的立体球面渐变 -->
      <radialGradient id="cav-small" cx="35%" cy="30%" r="72%">
        <stop offset="0%" stop-color="#dbeafe" />
        <stop offset="55%" stop-color="#60a5fa" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </radialGradient>
      <radialGradient id="cav-large" cx="35%" cy="30%" r="72%">
        <stop offset="0%" stop-color="#fde68a" />
        <stop offset="55%" stop-color="#e2a846" />
        <stop offset="100%" stop-color="#b45309" />
      </radialGradient>
    </defs>

    <!-- 天花板 -->
    <SurfaceHatch :from="{ x: 150, y: 30 }" :to="{ x: 300, y: 30 }" side="above" :thickness="12" :gap="16" />

    <!-- 刻度尺（薄板 + 顶面） -->
    <polygon :points="`${RULER_X1 + 6},50 ${RULER_X2 + 6},50 ${RULER_X2},${RULER_Y - 10} ${RULER_X1},${RULER_Y - 10}`" fill="rgba(148,163,184,0.1)" />
    <rect :x="RULER_X1" :y="RULER_Y - 10" :width="RULER_X2 - RULER_X1" height="20" rx="3" fill="rgba(148,163,184,0.12)" stroke="#94a3b8" stroke-width="1.6" />
    <line v-for="tick in ticks" :key="tick" :x1="tick" :y1="RULER_Y - 10" :x2="tick" :y2="RULER_Y + 4" stroke="#94a3b8" stroke-width="1.2" />
    <text :x="(RULER_X1 + RULER_X2) / 2" y="42" text-anchor="middle" font-size="15" fill="#94a3b8">刻度尺</text>

    <!-- 光路：入射光 → 平面镜 → 反射光 -->
    <CourseArrow :from="LAMP" :to="MIRROR" stroke="#60a5fa" :stroke-width="2.2" />
    <line :x1="MIRROR.x" :y1="MIRROR.y" :x2="BASE_SPOT.x" :y2="BASE_SPOT.y" stroke="rgba(248,113,113,0.4)" stroke-width="1.6" stroke-dasharray="6 5" />
    <CourseArrow :from="MIRROR" :to="spot" stroke="#f87171" :stroke-width="2.4" />

    <!-- 光源 -->
    <rect x="16" y="66" width="28" height="30" rx="6" fill="rgba(96,165,250,0.18)" stroke="#60a5fa" stroke-width="2" />
    <text x="30" y="114" text-anchor="middle" font-size="15" fill="#94a3b8">光源</text>

    <!-- 光点在刻度尺上的移动 -->
    <circle :cx="BASE_SPOT.x" :cy="BASE_SPOT.y" r="5" fill="none" stroke="rgba(248,113,113,0.8)" stroke-width="1.6" stroke-dasharray="3 3" />
    <circle :cx="spot.x" :cy="spot.y" r="5" fill="#f87171" />
    <template v-if="twisted">
      <line :x1="spot.x" :y1="RULER_Y + 22" :x2="BASE_SPOT.x" :y2="RULER_Y + 22" stroke="#f87171" stroke-width="1.8" />
      <polygon :points="`${spot.x},${RULER_Y + 22} ${spot.x + 9},${RULER_Y + 18} ${spot.x + 9},${RULER_Y + 26}`" fill="#f87171" />
      <polygon :points="`${BASE_SPOT.x},${RULER_Y + 22} ${BASE_SPOT.x - 9},${RULER_Y + 18} ${BASE_SPOT.x - 9},${RULER_Y + 26}`" fill="#f87171" />
      <text :x="(spot.x + BASE_SPOT.x) / 2 + 26" :y="RULER_Y + 44" text-anchor="middle" font-size="15" fill="#f87171">光点移动</text>
    </template>

    <!-- 反射光线转过 2θ -->
    <template v-if="twisted">
      <path :d="rayArc" fill="none" stroke="#2dd4bf" stroke-width="2" />
      <text
        :x="rayLabel.x"
        :y="rayLabel.y"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="#2dd4bf"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        2θ
      </text>
    </template>

    <!-- 石英丝（细） -->
    <line :x1="AXIS.x" y1="30" :x2="AXIS.x" :y2="AXIS.y" stroke="#cbd5e1" stroke-width="1.8" />
    <text :x="AXIS.x - 12" y="108" text-anchor="end" font-size="15" fill="#94a3b8">石英丝</text>

    <!-- T 形架：竖直杆 + 平面镜 + 横杆 + 两端小球 -->
    <line :x1="AXIS.x" :y1="AXIS.y" :x2="AXIS.x" y2="178" stroke="#cbd5e1" stroke-width="3.5" />
    <polygon :points="mirrorSide" fill="rgba(226,168,70,0.18)" stroke="rgba(226,168,70,0.55)" stroke-width="1.2" />
    <path :d="mirrorFront" fill="rgba(226,168,70,0.3)" stroke="#e2a846" stroke-width="1.8" />
    <text :x="MIRROR.x - 16" :y="MIRROR.y + 6" text-anchor="end" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">M</text>

    <!-- 扭转前横杆的位置（虚线） -->
    <line
      v-if="twisted"
      :x1="AXIS.x - BAR_A"
      :y1="BAR_Y"
      :x2="AXIS.x + BAR_A"
      :y2="BAR_Y"
      stroke="rgba(148,163,184,0.45)"
      stroke-width="1.6"
      stroke-dasharray="6 5"
    />
    <!-- 横杆（带高光的立体杆） -->
    <line :x1="endB.x" :y1="endB.y" :x2="endA.x" :y2="endA.y" stroke="#94a3b8" stroke-width="5.5" stroke-linecap="round" />
    <line :x1="endB.x" :y1="endB.y - 1.6" :x2="endA.x" :y2="endA.y - 1.6" stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round" />

    <!-- 扭转角 θ -->
    <template v-if="twisted">
      <path :d="frameArc" fill="none" stroke="#2dd4bf" stroke-width="2" />
      <text
        :x="endA.x + 26"
        :y="endA.y - 6"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="#2dd4bf"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        θ
      </text>
    </template>

    <!-- 两个小球 -->
    <circle :cx="endA.x" :cy="endA.y" r="11" fill="url(#cav-small)" />
    <circle :cx="endA.x - 3.5" :cy="endA.y - 3.5" r="2.6" fill="rgba(255,255,255,0.6)" />
    <circle :cx="endB.x" :cy="endB.y" r="11" fill="url(#cav-small)" />
    <circle :cx="endB.x - 3.5" :cy="endB.y - 3.5" r="2.6" fill="rgba(255,255,255,0.6)" />
    <text :x="endA.x" :y="endA.y + 32" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#93c5fd">m</text>
    <text :x="endB.x" :y="endB.y + 32" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#93c5fd">m</text>

    <!-- 两个大球（位置固定） -->
    <circle cx="88" cy="184" r="19" fill="url(#cav-large)" />
    <circle cx="84.5" cy="180.5" r="4" fill="rgba(255,255,255,0.5)" />
    <circle cx="362" cy="184" r="19" fill="url(#cav-large)" />
    <circle cx="358.5" cy="180.5" r="4" fill="rgba(255,255,255,0.5)" />
    <text x="88" y="226" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">m′</text>
    <text x="362" y="226" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">m′</text>
  </svg>
</template>
