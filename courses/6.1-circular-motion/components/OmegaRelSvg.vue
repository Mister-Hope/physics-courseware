<script setup lang="ts">
/** 6.1 线速度与角速度的关系（第 6 页）：Δt 内半径扫过 Δθ、物体走过弧长 Δs，Δθ = Δs / r，于是 v = ωr。 */
interface Pt {
  x: number;
  y: number;
}

const O = { x: 140, y: 148 };
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

const A = toXY(142);
const B = toXY(64);
const arcAB = arcPath(142, 64, R);
const angleArc = arcPath(142, 64, 46);
const thetaLabel = toXY(103, 64);
/** Δs 标注贴着金色弧上方（原来在 R+22 处，离弧太远、顶部还顶到 viewBox 边界） */
const dsLabel = toXY(103, R + 12);
const rLabel = { x: (O.x + A.x) / 2 - 17, y: (O.y + A.y) / 2 + 13 };
</script>

<template>
  <svg viewBox="30 18 220 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.28" />
    <path :d="arcAB" fill="none" stroke="var(--c-accent)" stroke-width="6" stroke-linecap="round" />
    <line :x1="O.x" :y1="O.y" :x2="A.x" :y2="A.y" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <line :x1="O.x" :y1="O.y" :x2="B.x" :y2="B.y" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.45" />
    <path :d="angleArc" fill="none" stroke="var(--c-velocity)" stroke-width="3.2" stroke-linecap="round" />
    <circle :cx="A.x" :cy="A.y" r="5" fill="var(--c-accent)" />
    <circle :cx="B.x" :cy="B.y" r="5" fill="var(--c-accent)" />
    <circle :cx="O.x" :cy="O.y" r="3.5" fill="currentColor" opacity="0.8" />
    <text :x="O.x - 8" :y="O.y + 19" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">O</text>
    <text :x="A.x - 19" :y="A.y + 5" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">A</text>
    <text :x="B.x + 9" :y="B.y + 5" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">B</text>
    <text :x="rLabel.x" :y="rLabel.y" text-anchor="middle" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="currentColor">r</text>
    <text :x="thetaLabel.x" :y="thetaLabel.y" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-velocity)">Δθ</text>
    <text :x="dsLabel.x" :y="dsLabel.y" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">Δs</text>
  </svg>
</template>
