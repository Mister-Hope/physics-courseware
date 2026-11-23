<!-- 第 7 页：加强区与减弱区连成的曲线（双曲线族）：实线加强、虚线减弱 -->
<template>
  <svg viewBox="118 6 424 348" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      v-for="curve in curves"
      :key="curve.key"
      :d="curve.d"
      fill="none"
      :stroke="curve.stroke"
      :stroke-width="curve.width"
      :stroke-dasharray="curve.dash"
      :opacity="curve.opacity"
      stroke-linecap="round"
    />
    <circle cx="230" cy="180" r="6" fill="var(--c-accent)" />
    <circle cx="430" cy="180" r="6" fill="var(--c-physics)" />
    <text x="230" y="204" text-anchor="middle" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">
      S<tspan dy="4" font-size="10">1</tspan>
    </text>
    <text x="430" y="204" text-anchor="middle" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">
      S<tspan dy="4" font-size="10">2</tspan>
    </text>
  </svg>
</template>

<script setup lang="ts">
const midX = 330;
const cy = 180;
const halfD = 100;

const branch = (a: number, sign: number): string => {
  const b = Math.sqrt(halfD * halfD - a * a);
  const pts: string[] = [];
  for (let t = -176; t <= 176; t += 4) {
    const dx = a * Math.sqrt(1 + (t / b) ** 2);
    pts.push(`${midX + sign * dx} ${cy + t}`);
  }
  return `M ${pts.join(" L ")}`;
};

const pair = (a: number): string => `${branch(a, 1)} ${branch(a, -1)}`;

const curves = [
  { key: "0", d: pair(0), stroke: "var(--c-accent)", width: 2.8, dash: "", opacity: 0.95 },
  { key: "1", d: pair(25), stroke: "var(--c-velocity)", width: 2, dash: "7 7", opacity: 0.8 },
  { key: "2", d: pair(50), stroke: "var(--c-accent)", width: 2, dash: "", opacity: 0.7 },
  { key: "3", d: pair(75), stroke: "var(--c-velocity)", width: 1.8, dash: "7 7", opacity: 0.6 },
];
</script>
