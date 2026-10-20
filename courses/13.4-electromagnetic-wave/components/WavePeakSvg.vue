<!-- 第 9 页：一列水波——点击后依次标出波峰、波谷、相邻两波峰间的距离（波长）与传播方向 -->
<script setup lang="ts">
defineProps<{ step?: number }>();

const pts: string[] = [];
for (let i = 0; i <= 160; i++) {
  const x = 40 + 780 * (i / 160);
  const y = 120 - 40 * Math.sin((2 * Math.PI * (x - 40)) / 260);
  pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
}
const wave = `M ${pts.join(" L ")}`;
</script>

<template>
  <svg viewBox="0 0 860 235" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="120" x2="820" y2="120" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="7 6" />
    <path :d="wave" fill="none" stroke="var(--c-physics)" stroke-width="3.2" stroke-linecap="round" />
    <g v-if="(step ?? 0) >= 1">
      <circle cx="105" cy="80" r="5" fill="var(--c-accent)" />
      <circle cx="365" cy="80" r="5" fill="var(--c-accent)" />
      <circle cx="235" cy="160" r="5" fill="var(--c-accent)" />
      <text x="97" y="70" text-anchor="end" font-size="17" fill="var(--c-text)">波峰</text>
      <text x="357" y="70" text-anchor="end" font-size="17" fill="var(--c-text)">波峰</text>
      <text x="235" y="186" text-anchor="middle" font-size="17" fill="var(--c-text)">波谷</text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <line x1="105" y1="75" x2="105" y2="42" stroke="var(--c-accent)" stroke-width="1.3" stroke-dasharray="5 4" />
      <line x1="365" y1="75" x2="365" y2="42" stroke="var(--c-accent)" stroke-width="1.3" stroke-dasharray="5 4" />
      <line x1="105" y1="36" x2="365" y2="36" stroke="var(--c-accent)" stroke-width="2" />
      <line x1="105" y1="29" x2="105" y2="43" stroke="var(--c-accent)" stroke-width="2" />
      <line x1="365" y1="29" x2="365" y2="43" stroke="var(--c-accent)" stroke-width="2" />
      <text x="235" y="24" text-anchor="middle" font-size="21" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">λ</text>
    </g>
    <g v-if="(step ?? 0) >= 3">
      <line x1="50" y1="205" x2="150" y2="205" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-linecap="round" />
      <path d="M 166 205 L 152 198.5 L 152 211.5 Z" fill="var(--c-accent-2)" />
      <text x="180" y="212" font-size="16" fill="var(--c-accent-2)">传播方向</text>
    </g>
  </svg>
</template>
