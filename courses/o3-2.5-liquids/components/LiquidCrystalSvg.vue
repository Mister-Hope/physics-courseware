<!-- 2.5 液体 P14：液晶的三种状态——结晶态、液晶态、液态中棒状分子的排列 -->
<script setup lang="ts">
const crystalRods = [
  { x: 16, y: 34 },
  { x: 58, y: 34 },
  { x: 100, y: 34 },
  { x: 16, y: 68 },
  { x: 58, y: 68 },
  { x: 100, y: 68 },
  { x: 16, y: 102 },
  { x: 58, y: 102 },
  { x: 100, y: 102 },
  { x: 16, y: 136 },
  { x: 58, y: 136 },
  { x: 100, y: 136 },
];
const crystalRods2 = [
  { x: 16, y: 34 },
  { x: 60, y: 28 },
  { x: 96, y: 44 },
  { x: 24, y: 66 },
  { x: 72, y: 62 },
  { x: 100, y: 78 },
  { x: 14, y: 96 },
  { x: 52, y: 102 },
  { x: 88, y: 96 },
  { x: 30, y: 128 },
  { x: 70, y: 124 },
  { x: 102, y: 132 },
];
const liquidRods = [
  { x: 16, y: 36, a: -30 },
  { x: 56, y: 30, a: 44 },
  { x: 90, y: 46, a: 52 },
  { x: 20, y: 64, a: -14 },
  { x: 62, y: 60, a: 58 },
  { x: 90, y: 80, a: -42 },
  { x: 12, y: 94, a: 58 },
  { x: 52, y: 98, a: -50 },
  { x: 88, y: 100, a: 22 },
  { x: 30, y: 126, a: -40 },
  { x: 68, y: 122, a: 56 },
  { x: 94, y: 124, a: 16 },
];
</script>

<template>
  <svg viewBox="0 0 440 236" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="16" width="140" height="146" rx="8" fill="rgba(226,168,70,0.08)" stroke="rgba(226,168,70,0.35)" stroke-width="1.2" />
    <rect x="152" y="16" width="140" height="146" rx="8" fill="rgba(226,168,70,0.08)" stroke="rgba(226,168,70,0.35)" stroke-width="1.2" />
    <rect x="298" y="16" width="136" height="146" rx="8" fill="rgba(226,168,70,0.08)" stroke="rgba(226,168,70,0.35)" stroke-width="1.2" />
    <g fill="var(--c-accent)">
      <rect v-for="(rod, index) in crystalRods" :key="`c${index}`" :x="rod.x" :y="rod.y" width="26" height="7" rx="3.5" />
    </g>
    <g fill="var(--c-accent)">
      <rect v-for="(rod, index) in crystalRods2" :key="`l${index}`" :x="rod.x + 146" :y="rod.y" width="26" height="7" rx="3.5" />
    </g>
    <g fill="var(--c-accent)">
      <rect
        v-for="(rod, index) in liquidRods"
        :key="`f${index}`"
        :x="rod.x + 298"
        :y="rod.y"
        width="26"
        height="7"
        rx="3.5"
        :transform="`rotate(${rod.a} ${rod.x + 305} ${rod.y + 3.5})`"
      />
    </g>
    <text x="76" y="186" font-size="15" fill="var(--c-text)" text-anchor="middle">结晶态</text>
    <text x="222" y="186" font-size="15" fill="var(--c-text)" text-anchor="middle">液晶态</text>
    <text x="366" y="186" font-size="15" fill="var(--c-text)" text-anchor="middle">液态</text>
    <text x="76" y="206" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">重心有序、取向有序</text>
    <text x="222" y="206" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">重心无序、取向较有序</text>
    <text x="366" y="206" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">重心、取向都无序</text>
    <text x="220" y="228" font-size="12" fill="var(--c-text-mute)" text-anchor="middle">温度升高 →</text>
  </svg>
</template>
