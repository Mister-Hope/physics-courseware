<script setup lang="ts">
/** 6.1 角速度（第 5 页）：半径 OA、OB 在 Δt 内扫过圆心角 Δθ，用 Δθ 与 Δt 之比描述绕圆心转动的快慢。 配色约定（与第 6 页一致）：角 Δθ 用蓝，A / B 两个关键点用暖金。 */
const { showSolved = false } = defineProps<{ showSolved?: boolean }>();

interface Pt {
  x: number;
  y: number;
}

const O = { x: 148, y: 142 };
const R = 100;
const toXY = (deg: number, r = R): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: O.x + r * Math.cos(a), y: O.y - r * Math.sin(a) };
};
const arcPath = (a1: number, a2: number, r: number, n = 30): string =>
  Array.from({ length: n + 1 }, (_, i) => {
    const p = toXY(a1 + ((a2 - a1) * i) / n, r);
    return `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");

const A = toXY(150);
const B = toXY(52);
const angleArc = arcPath(150, 52, 46);
/** 与第 6 页同样的“弧半径 46 + 标注半径 64”，两页观感一致 */
const thetaLabel = toXY(101, 64);
</script>

<template>
  <svg viewBox="42 36 214 212" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.28" />
    <line :x1="O.x" :y1="O.y" :x2="A.x" :y2="A.y" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <line :x1="O.x" :y1="O.y" :x2="B.x" :y2="B.y" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <g v-if="showSolved">
      <path :d="angleArc" fill="none" stroke="#60a5fa" stroke-width="3.2" stroke-linecap="round" />
      <text :x="thetaLabel.x" :y="thetaLabel.y" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#60a5fa">Δθ</text>
    </g>
    <circle :cx="A.x" :cy="A.y" r="5" fill="#e2a846" />
    <circle :cx="B.x" :cy="B.y" r="5" fill="#e2a846" />
    <circle :cx="O.x" :cy="O.y" r="3.5" fill="currentColor" opacity="0.8" />
    <text :x="O.x - 8" :y="O.y + 19" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">O</text>
    <text :x="A.x - 18" :y="A.y + 13" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">A</text>
    <text :x="B.x + 9" :y="B.y + 11" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">B</text>
  </svg>
</template>
