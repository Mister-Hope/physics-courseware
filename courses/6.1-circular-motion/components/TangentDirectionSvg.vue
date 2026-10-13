<script setup lang="ts">
/** 6.1 匀速圆周运动（第 4 页）：圆周上四个位置的小球，线速度大小相同（箭头等长）、方向各不相同。 */
const { showVelocity = false } = defineProps<{ showVelocity?: boolean }>();

interface Pt {
  x: number;
  y: number;
}

const O = { x: 160, y: 150 };
const R = 88;
/** 箭杆沿半径外移量：小球半径 5，外移后箭尾仍搭在小球上，箭杆却离开了圆周虚线 */
const ARROW_OFFSET = 4.5;
const ARROW_LEN = 44;
const toXY = (deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: O.x + R * Math.cos(a), y: O.y - R * Math.sin(a) };
};
/** 顺时针运动（与其他各图的方向保持一致）：某点切线方向为 (sinθ, cosθ)，四支箭头等长 ⇒ 速率不变、方向时刻改变 */
const states = [90, 180, 270, 0].map((deg): { deg: number; p: Pt; from: Pt; tip: Pt } => {
  const a = (deg * Math.PI) / 180;
  const p = toXY(deg);
  // 外法线 (cosθ, −sinθ)：把箭杆整体推到圆外，避免与虚线圆周糊在一起
  const n = { x: Math.cos(a), y: -Math.sin(a) };
  const from = { x: p.x + ARROW_OFFSET * n.x, y: p.y + ARROW_OFFSET * n.y };
  return { deg, p, from, tip: { x: from.x + ARROW_LEN * Math.sin(a), y: from.y + ARROW_LEN * Math.cos(a) } };
});
const [first] = states;
</script>

<template>
  <svg viewBox="55 45 210 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 6" opacity="0.32" />
    <line :x1="O.x" :y1="O.y" :x2="first.p.x" :y2="first.p.y" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 5" opacity="0.4" />
    <circle :cx="O.x" :cy="O.y" r="3.5" fill="currentColor" opacity="0.8" />
    <g v-if="showVelocity">
      <template v-for="s in states" :key="s.deg">
        <circle :cx="s.p.x" :cy="s.p.y" r="5" fill="#e2a846" />
        <CourseArrow :from="s.from" :to="s.tip" stroke="#e2a846" :stroke-width="2.8" />
      </template>
    </g>
    <circle v-else :cx="first.p.x" :cy="first.p.y" r="5" fill="#e2a846" />
    <text :x="O.x - 6" :y="O.y + 19" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">O</text>
  </svg>
</template>
