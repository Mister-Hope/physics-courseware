<!-- 第 7 页：教材图 3.5-3 的复刻——振动片向左运动，左侧波前被挤密 -->
<template>
  <svg viewBox="0 0 660 320" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.5">
      <circle v-for="ring in rings" :key="ring.k" :cx="ring.cx" cy="160" :r="ring.r" :opacity="0.8 - ring.k * 0.1" />
    </g>
    <circle cx="330" cy="160" r="6" fill="var(--c-accent-light)" />
    <circle cx="52" cy="160" r="7" fill="var(--c-physics-light)" />
    <text x="52" y="186" text-anchor="middle" font-size="14" fill="var(--c-physics-light)">左侧观察者</text>
    <circle cx="608" cy="160" r="7" fill="var(--c-physics-light)" />
    <text x="608" y="186" text-anchor="middle" font-size="14" fill="var(--c-physics-light)">右侧观察者</text>
    <g v-if="step >= 1">
      <line x1="318" y1="160" x2="252" y2="160" stroke="var(--c-physics)" stroke-width="2.4" stroke-linecap="round" />
      <path d="M 252 160 l 10 -5 v 10 z" fill="var(--c-physics)" />
      <text x="286" y="142" text-anchor="middle" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">v</text>
    </g>
    <g v-if="step >= 2">
      <text x="180" y="286" text-anchor="middle" font-size="15" fill="var(--c-physics)">波前更密</text>
      <text x="480" y="286" text-anchor="middle" font-size="15" fill="var(--c-velocity)">波前更疏</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

interface Ring {
  k: number;
  cx: number;
  r: number;
}

const rings: Ring[] = [1, 2, 3, 4, 5].map((k) => ({
  k,
  cx: 330 + 14 * k,
  r: 30 * k,
}));
</script>
