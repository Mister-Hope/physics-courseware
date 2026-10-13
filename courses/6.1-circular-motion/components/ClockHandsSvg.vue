<script setup lang="ts">
/** 6.1 练习（第 13 页，时钟分针/时针）：钟面 + 一长一短两根指针（长度之比 1.4 : 1），用于比较角速度与针尖线速度。 */
interface Pt {
  x: number;
  y: number;
}

const O = { x: 120, y: 124 };
const R = 104;
const toXY = (deg: number, r: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: O.x + r * Math.cos(a), y: O.y - r * Math.sin(a) };
};
/** 12 个整点刻度（每 30° 一根，向盘内伸出） */
const ticks = Array.from({ length: 12 }, (_, i): { x1: number; y1: number; x2: number; y2: number } => {
  const inner = toXY(i * 30, R - 14);
  const outer = toXY(i * 30, R);
  return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
});
/** 分针长 84、时针长 60（之比 = 1.4 : 1），分别指向 55° 与 160° */
const MIN_HAND = 84;
const HOUR_HAND = 60;
const MIN_ANGLE = 55;
const HOUR_ANGLE = 160;
const minTip = toXY(MIN_ANGLE, MIN_HAND);
const hourTip = toXY(HOUR_ANGLE, HOUR_HAND);
/** 两个标注落在钟面内的空处，各自贴着对应的指针、又不压线 */
const minLabel = toXY(18, 76);
const hourLabel = toXY(192, 86);
</script>

<template>
  <svg viewBox="6 4 228 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="currentColor" stroke-width="2.6" opacity="0.55" />
    <line v-for="(t, i) in ticks" :key="i" :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="currentColor" stroke-width="2" opacity="0.45" />
    <line :x1="O.x" :y1="O.y" :x2="hourTip.x" :y2="hourTip.y" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" opacity="0.8" />
    <line :x1="O.x" :y1="O.y" :x2="minTip.x" :y2="minTip.y" stroke="#e2a846" stroke-width="4" stroke-linecap="round" />
    <circle :cx="O.x" :cy="O.y" r="5" fill="currentColor" opacity="0.85" />
    <text :x="minLabel.x" :y="minLabel.y" text-anchor="middle" font-size="17" font-family="KaTeX_Main" fill="#e2a846">分针</text>
    <text :x="hourLabel.x" :y="hourLabel.y" text-anchor="middle" font-size="17" font-family="KaTeX_Main" fill="currentColor" opacity="0.85">时针</text>
  </svg>
</template>
