<!-- 引课页：雨滴落在水面，激起几组圆形涟漪，相互交叠 -->
<template>
  <svg viewBox="0 0 660 240" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="var(--c-physics)" stroke-width="1.4">
      <circle v-for="ring in rings" :key="ring.key" :cx="ring.cx" :cy="ring.cy" :r="ring.r" :stroke-dasharray="ring.dash" :opacity="ring.opacity" />
    </g>
    <circle cx="200" cy="96" r="4.5" fill="var(--c-physics)" />
    <circle cx="432" cy="72" r="4.5" fill="var(--c-physics)" />
    <circle cx="330" cy="176" r="4.5" fill="var(--c-physics)" />
  </svg>
</template>

<script setup lang="ts">
const drops = [
  { x: 200, y: 96 },
  { x: 432, y: 72 },
  { x: 330, y: 176 },
];

const rings = drops.flatMap((drop, i) =>
  [26, 52, 78, 104, 130].map((r, k) => ({
    key: `${i}-${r}`,
    cx: drop.x,
    cy: drop.y,
    r,
    dash: k % 2 === 0 ? "5 7" : "",
    opacity: 0.55 - k * 0.08,
  })),
);
</script>
