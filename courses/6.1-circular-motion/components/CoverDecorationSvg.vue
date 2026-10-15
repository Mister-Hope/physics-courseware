<script setup lang="ts">
/** 封面装饰（6.1 圆周运动）：一个带齿的轮子，轮缘上一颗小球与一条半径线，小球处画出沿切线的速度箭头（强调金），圆心处一小段弧表示扫过的角度。 */
const C = { x: 104, y: 74 };
const R = 42;
const toXY = (deg: number, r: number): { x: number; y: number } => {
  const a = (deg * Math.PI) / 180;
  return { x: C.x + r * Math.cos(a), y: C.y - r * Math.sin(a) };
};
/** 轮齿：每 15° 一根朝外的小短线 */
const teeth = Array.from({ length: 24 }, (_, i) => {
  const inner = toXY(i * 15, R);
  const outer = toXY(i * 15, R + 5);
  return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
});
/** 轮缘小球在 -35°，沿顺时针方向运动时切线指向 (sinφ, cosφ)（与其他各图的方向保持一致） */
const PHI = -35;
const ball = toXY(PHI, R);
const TANGENT = { x: Math.sin((PHI * Math.PI) / 180), y: Math.cos((PHI * Math.PI) / 180) };
/** 速度箭头从小球表面起笔（不再压在小球中间），尖端正好落在小球前方的切线上 */
const arrowFrom = { x: ball.x + 6 * TANGENT.x, y: ball.y + 6 * TANGENT.y };
const tangentTip = { x: ball.x + 36 * TANGENT.x, y: ball.y + 36 * TANGENT.y };
/** 圆心处已经扫过的角：顺时针从 0° 转到 −35°（画成小圆弧） */
const sweep = Array.from({ length: 13 }, (_, i) => toXY((-35 * i) / 12, 20));
const sweepD = sweep.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
</script>

<template>
  <svg viewBox="44 14 122 118" width="210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="C.x" :cy="C.y" :r="R" fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.6" />
    <line v-for="(t, i) in teeth" :key="i" :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="currentColor" stroke-width="1.5" opacity="0.45" />
    <line :x1="C.x" :y1="C.y" :x2="ball.x" :y2="ball.y" stroke="currentColor" stroke-width="1.6" opacity="0.5" />
    <path :d="sweepD" fill="none" stroke="var(--c-velocity)" stroke-width="2.1" opacity="0.75" stroke-linecap="round" />
    <circle :cx="C.x" :cy="C.y" r="3" fill="currentColor" opacity="0.6" />
    <circle :cx="ball.x" :cy="ball.y" r="5" fill="var(--c-accent)" />
    <CourseArrow :from="arrowFrom" :to="tangentTip" stroke="var(--c-accent)" :stroke-width="2.4" />
  </svg>
</template>
