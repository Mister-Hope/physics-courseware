<script setup lang="ts">
/** 3.2 波的描述 · 引课：绳上的一列横波，标出传播方向、质点 P 与它的位移 */
const x0 = 30;
const x1 = 450;
const y0 = 160;
const amp = 46;
const cycles = 2;
const point = (x: number): number => y0 - amp * Math.sin(((x - x0) / (x1 - x0)) * cycles * 2 * Math.PI);
const wavePath = Array.from({ length: 141 }, (_, i) => {
  const x = x0 + ((x1 - x0) * i) / 140;
  return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${point(x).toFixed(1)}`;
}).join(" ");
const beads = Array.from({ length: 13 }, (_, i) => {
  const x = x0 + 35 * i;
  return { x, y: point(x) };
});
const px = 100;
const py = point(px);
</script>

<template>
  <!-- 引课图：绳波上取若干质点，P 点偏离平衡位置，位移可用纵坐标表示 -->
  <svg viewBox="0 0 480 300" class="wave-intro-svg" role="img" aria-label="绳上的一列横波，质点 P 与它的位移">
    <line x1="30" y1="160" x2="455" y2="160" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="5 6" opacity="0.35" />
    <path :d="wavePath" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <circle
      v-for="(b, i) in beads"
      :key="i"
      :cx="b.x"
      :cy="b.y"
      r="4"
      :fill="b.x === px ? 'var(--c-accent)' : 'var(--c-accent-2)'"
      :opacity="b.x === px ? 1 : 0.75"
    />
    <circle :cx="px" :cy="py" r="8" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.7" />
    <line :x1="px" :y1="py" :x2="px" y2="160" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.7" />
    <text :x="px - 12" :y="py - 12" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">P</text>
    <CourseArrow :from="{ x: 300, y: 62 }" :to="{ x: 400, y: 62 }" stroke="var(--c-text-dim)" :stroke-width="1.4" :head-size="6" />
    <text x="350" y="48" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-dim)">波的传播方向</text>
    <text x="240" y="286" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-dim)">绳上的一列横波</text>
  </svg>
</template>
