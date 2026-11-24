<!-- 第 11 页：4 个分子的 16 种微观态；初始态（4 个都在 A，第 1 格）只是其中 1 种 -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
const states = Array.from({ length: 16 }, (_, i) => Array.from({ length: 4 }, (_, k) => Math.floor(i / 2 ** k) % 2));
const cells = Array.from({ length: 16 }, (_, i) => ({
  x: 20 + (i % 4) * 198,
  y: 64 + Math.floor(i / 4) * 62,
}));
</script>

<template>
  <svg viewBox="0 0 840 310" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="24" y="30" font-size="15" fill="var(--c-text)">4 个分子：每个分子在 A 或 B</text>
    <text x="816" y="30" text-anchor="end" font-size="14" fill="var(--c-accent)">共 16 种微观态</text>
    <text x="24" y="50" font-size="12" fill="var(--c-text-dim)">左半 A · 右半 B</text>
    <g v-for="(cell, i) in cells" :key="i" :opacity="step === 1 && i !== 0 ? 0.18 : 1">
      <rect
        :x="cell.x"
        :y="cell.y"
        width="190"
        height="54"
        rx="8"
        :fill="i === 0 && step >= 1 ? 'rgba(226,168,70,0.10)' : 'rgba(30,41,59,0.55)'"
        :stroke="i === 0 && step >= 1 ? 'var(--c-accent)' : 'var(--c-line)'"
        :stroke-width="i === 0 && step >= 1 ? 2.4 : 1.2"
        :stroke-dasharray="i === 0 && step >= 2 ? '6 4' : undefined"
      />
      <line :x1="cell.x + 95" :y1="cell.y + 6" :x2="cell.x + 95" :y2="cell.y + 48" stroke="var(--c-line)" stroke-width="1" stroke-dasharray="3 4" />
      <circle
        v-for="(side, k) in states[i]"
        :key="k"
        :cx="cell.x + (side ? 152 : 38)"
        :cy="cell.y + 12 + k * 10"
        r="3.2"
        :fill="i === 0 && step >= 1 ? 'var(--c-accent)' : 'var(--c-sky)'"
      />
    </g>
  </svg>
</template>
