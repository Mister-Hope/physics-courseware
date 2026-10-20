<!-- 第 1 页封面装饰：左侧竖直天线 + 向右传播的一列波 + 传播方向（纯装饰，不标 E/B） -->
<script setup lang="ts">
const wavePath = (): string => {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = 44 + (234 * i) / 120;
    const y = 80 - 30 * Math.sin((2 * Math.PI * (x - 44)) / 96);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
};
const wave = wavePath();
</script>

<template>
  <svg viewBox="0 0 300 160" width="260" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="42" x2="30" y2="118" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <circle cx="30" cy="42" r="5" fill="var(--c-accent)" />
    <line x1="44" y1="80" x2="286" y2="80" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.45" />
    <path :d="wave" fill="none" stroke="var(--c-accent-2)" stroke-width="2.8" stroke-linecap="round" />
    <line x1="232" y1="136" x2="278" y2="136" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 286 136 L 274 130 L 274 142 Z" fill="var(--c-accent)" />
  </svg>
</template>
