<!-- 第 1 页封面装饰：一列向右传播的电磁波——红色电场波、蓝色磁场波相互垂直（正交）地振动，左端是振源天线（纯图形，不放文字） -->
<script setup lang="ts">
const wavePath = (amp: number, phase: number, n = 120) => {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = 34 + (222 * i) / n;
    const y = 78 - amp * Math.sin((2 * Math.PI * (x - 34 + phase)) / 88);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
};
const eWave = wavePath(34, 0);
const bWave = wavePath(20, 22);
</script>

<template>
  <svg viewBox="0 0 280 150" width="250" xmlns="http://www.w3.org/2000/svg">
    <line x1="26" y1="78" x2="264" y2="78" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 6" opacity="0.35" />
    <line x1="34" y1="26" x2="34" y2="130" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="34" cy="26" r="5" fill="var(--c-accent)" />
    <path :d="bWave" fill="none" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-dasharray="8 5" opacity="0.85" />
    <path :d="eWave" fill="none" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" />
    <line x1="244" y1="130" x2="272" y2="130" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 272 130 L 262 124.5 L 262 135.5 Z" fill="var(--c-accent)" />
    <circle cx="65" cy="44.9" r="3.2" fill="var(--c-danger)" />
    <circle cx="109" cy="111.1" r="3.2" fill="var(--c-danger)" />
    <circle cx="153" cy="44.9" r="3.2" fill="var(--c-danger)" />
  </svg>
</template>
