<!-- 封面装饰：波源向右运动，前方波前被挤密、后方被拉疏 -->
<template>
  <svg viewBox="0 0 320 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.4">
      <circle v-for="ring in rings" :key="ring.r" :cx="ring.cx" cy="96" :r="ring.r" :opacity="ring.opacity" />
    </g>
    <circle cx="228" cy="96" r="6" fill="var(--c-accent-light)" />
    <line x1="248" y1="96" x2="296" y2="96" stroke="var(--c-physics)" stroke-width="2" stroke-linecap="round" />
    <path d="M 296 96 l -8 -4.5 v 9 z" fill="var(--c-physics)" />
    <text x="272" y="80" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">v</text>
  </svg>
</template>

<script setup lang="ts">
interface Ring {
  cx: number;
  r: number;
  opacity: number;
}

const rings: Ring[] = [0, 1, 2, 3, 4, 5].map((k) => ({
  cx: 150 + k * 14,
  r: 88 - k * 14,
  opacity: 0.7 - k * 0.09,
}));
</script>
