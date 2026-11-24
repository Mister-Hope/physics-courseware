<!-- 2.5 液体 P7、P9：浸润/不浸润的液滴形状与管中液面弯曲 -->
<script setup lang="ts">
const { mode = "drops" } = defineProps<{ mode?: "drops" | "meniscus" }>();
</script>

<template>
  <svg v-if="mode === 'drops'" viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="150" width="185" height="12" rx="3" fill="var(--c-neutral-600)" />
    <rect x="235" y="150" width="185" height="12" rx="3" fill="var(--c-neutral-600)" />
    <path d="M 52 150 C 54 122 80 110 112 110 C 144 110 172 124 172 150 Z" fill="rgba(96,165,250,0.30)" stroke="var(--c-velocity)" stroke-width="2" />
    <path d="M 328 150 C 296 150 290 94 328 72 C 366 94 360 150 328 150 Z" fill="rgba(96,165,250,0.30)" stroke="var(--c-velocity)" stroke-width="2" />
    <text x="112" y="186" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">玻璃板</text>
    <text x="328" y="186" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">涂蜡玻璃板</text>
    <text x="112" y="34" font-size="15" fill="var(--c-text)" text-anchor="middle">水散开、附着</text>
    <text x="328" y="34" font-size="15" fill="var(--c-text)" text-anchor="middle">水不附着、滚来滚去</text>
  </svg>
  <svg v-else viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg">
    <line x1="100" y1="40" x2="100" y2="200" stroke="var(--c-neutral-300)" stroke-width="3" />
    <line x1="210" y1="40" x2="210" y2="200" stroke="var(--c-neutral-300)" stroke-width="3" />
    <line x1="250" y1="40" x2="250" y2="200" stroke="var(--c-neutral-300)" stroke-width="3" />
    <line x1="360" y1="40" x2="360" y2="200" stroke="var(--c-neutral-300)" stroke-width="3" />
    <path d="M 100 92 Q 155 122 210 92 L 210 200 L 100 200 Z" fill="rgba(96,165,250,0.28)" stroke="var(--c-velocity)" stroke-width="1.6" />
    <path d="M 250 118 Q 305 90 360 118 L 360 200 L 250 200 Z" fill="rgba(96,165,250,0.28)" stroke="var(--c-velocity)" stroke-width="1.6" />
    <text x="155" y="224" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">浸润：液面向上弯</text>
    <text x="305" y="224" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">不浸润：液面向下弯</text>
    <text x="155" y="26" font-size="15" fill="var(--c-text)" text-anchor="middle">水 · 玻璃</text>
    <text x="305" y="26" font-size="15" fill="var(--c-text)" text-anchor="middle">水银 · 玻璃</text>
  </svg>
</template>
