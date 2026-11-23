<!-- 4.1 第 2 页：水中的鱼看水面上的昆虫；点击后显示折射光路与看到的虚像位置 -->
<template>
  <svg viewBox="0 0 420 300" width="420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fish-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#60a5fa" stop-opacity="0.20" />
        <stop offset="1" stop-color="#0c1122" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect x="0" y="130" width="420" height="170" fill="url(#fish-water)" />
    <line x1="0" y1="130" x2="420" y2="130" stroke="var(--c-accent-2)" stroke-width="1.4" opacity="0.55" />
    <path d="M 18 130 q 18 -7 36 0 t 36 0" fill="none" stroke="var(--c-accent-2)" stroke-width="1.1" opacity="0.35" />
    <path d="M 330 130 q 14 -6 28 0 t 28 0" fill="none" stroke="var(--c-accent-2)" stroke-width="1.1" opacity="0.35" />
    <text x="20" y="32" fill="var(--c-text-dim)" font-size="12">空气</text>
    <text x="20" y="158" fill="var(--c-text-dim)" font-size="12">水</text>
    <g fill="var(--c-accent)">
      <ellipse cx="310" cy="55" rx="7" ry="4.5" />
      <ellipse cx="306" cy="49" rx="5" ry="3" transform="rotate(-28 306 49)" opacity="0.75" />
      <ellipse cx="315" cy="49" rx="5" ry="3" transform="rotate(24 315 49)" opacity="0.75" />
      <line x1="307" y1="47" x2="301" y2="39" stroke="var(--c-accent)" stroke-width="1" />
      <line x1="314" y1="47" x2="320" y2="39" stroke="var(--c-accent)" stroke-width="1" />
    </g>
    <text x="326" y="66" fill="var(--c-accent)" font-size="12">昆虫</text>
    <text x="326" y="80" fill="var(--c-text-mute)" font-size="11">实际位置</text>
    <g fill="var(--c-physics)">
      <ellipse cx="180" cy="245" rx="27" ry="14" />
      <path d="M 153 245 L 136 234 L 140 245 L 136 256 Z" />
      <circle cx="198" cy="240" r="2.6" fill="var(--c-surface-solid)" />
    </g>
    <text x="154" y="278" fill="var(--c-physics)" font-size="12">鱼</text>
    <g v-if="showAnswer">
      <line x1="250" y1="130" x2="310" y2="21" stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="5 5" />
      <circle cx="310" cy="21" r="8" fill="none" stroke="var(--c-accent-2)" stroke-width="1.4" stroke-dasharray="4 3" />
      <circle cx="310" cy="21" r="2" fill="var(--c-accent-2)" />
      <text x="310" y="11" fill="var(--c-accent-2)" font-size="11" text-anchor="middle">看到的位置</text>
      <CourseArrow :from="{ x: 310, y: 55 }" :to="{ x: 250, y: 130 }" stroke="var(--c-accent)" :stroke-width="1.8" />
      <CourseArrow :from="{ x: 250, y: 130 }" :to="{ x: 180, y: 245 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
      <circle cx="250" cy="130" r="3" fill="var(--c-text)" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const { showAnswer = false } = defineProps<{ showAnswer?: boolean }>();
</script>
