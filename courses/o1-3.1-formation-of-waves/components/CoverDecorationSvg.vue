<!-- 第 1 页封面装饰：一条向右传播的绳波（正弦）+ 绳上质点 + 抖动端的上下箭头 -->
<template>
  <svg viewBox="0 0 320 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="20" y1="118" x2="304" y2="118" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.45" />
    <polyline :points="wavePoints" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <circle v-for="(p, i) in dots" :key="i" :cx="p.x" :cy="p.y" r="4.2" fill="var(--c-physics)" />
    <line x1="34" y1="96" x2="34" y2="140" stroke="var(--c-accent)" stroke-width="2" opacity="0.9" />
    <path d="M 34 94 l -4.5 7 h 9 z" fill="var(--c-accent)" />
    <path d="M 34 142 l -4.5 -7 h 9 z" fill="var(--c-accent)" />
  </svg>
</template>

<script setup lang="ts">
const x0 = 44;
const x1 = 300;
const axisY = 118;
const amp = 38;
const lambda = 128;

const waveY = (x: number): number => axisY - amp * Math.sin(((x - x0) / lambda) * Math.PI * 2);

const wavePoints = Array.from({ length: 129 }, (_, i) => {
  const x = x0 + ((x1 - x0) * i) / 128;
  return `${x.toFixed(1)},${waveY(x).toFixed(1)}`;
}).join(" ");

const dots = [44, 76, 108, 140, 172, 204, 236, 268, 300].map((x) => ({ x, y: waveY(x) }));
</script>
