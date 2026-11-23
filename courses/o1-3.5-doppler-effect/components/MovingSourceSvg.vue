<!-- 第 6 页：波源静止（同心圆）与波源向右运动（前方波前挤密、后方拉疏） -->
<template>
  <svg viewBox="0 0 660 288" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.6">
      <circle v-for="ring in rings" :key="ring.k" :cx="ring.cx" cy="150" :r="ring.r" :opacity="ring.opacity" />
    </g>
    <line x1="52" y1="150" x2="612" y2="150" stroke="var(--c-text-mute)" stroke-width="1" stroke-dasharray="5 5" opacity="0.45" />
    <circle cx="330" cy="150" r="6" fill="var(--c-accent-light)" />
    <g v-if="step >= 1">
      <line x1="344" y1="150" x2="392" y2="150" stroke="var(--c-physics)" stroke-width="2" stroke-linecap="round" />
      <path d="M 392 150 l -8 -4.5 v 9 z" fill="var(--c-physics)" />
      <text x="368" y="134" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">v</text>
      <text x="330" y="128" text-anchor="middle" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-light)">S</text>
    </g>
    <g v-if="step >= 1">
      <circle cx="470" cy="150" r="7" fill="var(--c-physics-light)" />
      <text x="470" y="180" text-anchor="middle" font-size="13" fill="var(--c-physics-light)">观察者 A</text>
      <text x="470" y="204" text-anchor="middle" font-size="14" fill="var(--c-physics)">波峰更密，波长变短</text>
      <circle cx="120" cy="150" r="7" fill="var(--c-physics-light)" />
      <text x="120" y="180" text-anchor="middle" font-size="13" fill="var(--c-physics-light)">观察者 B</text>
      <text x="120" y="204" text-anchor="middle" font-size="14" fill="var(--c-velocity)">波峰更疏，波长变长</text>
    </g>
    <text v-else x="330" y="276" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">波源静止：各方向波长相同</text>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

interface Ring {
  k: number;
  cx: number;
  r: number;
  opacity: number;
}

const rings: Ring[] = [1, 2, 3, 4].map((k) => ({
  k,
  cx: 330 - (step >= 1 ? 18 * k : 0),
  r: 32 * k,
  opacity: 0.8 - k * 0.1,
}));
</script>
