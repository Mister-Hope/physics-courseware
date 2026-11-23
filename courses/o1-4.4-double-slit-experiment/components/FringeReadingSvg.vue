<!-- 第 7 页：屏上的干涉条纹与测量方法（step 1 第 1 条；2 第 6 条与 a；3 相邻间距 Δx） -->
<template>
  <svg viewBox="0 0 660 214" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="40" y="34" width="580" height="92" rx="6" fill="#0b1020" stroke="#c8d3ea" stroke-opacity="0.28" stroke-width="1.2" />
    <rect v-for="bar in bars" :key="bar.x" :x="bar.x" y="38" width="12" height="84" fill="#fbbf24" :opacity="bar.opacity" />
    <g v-if="step >= 1">
      <line x1="138" y1="20" x2="138" y2="140" stroke="#60a5fa" stroke-width="1.6" stroke-dasharray="7 5" />
      <text x="138" y="16" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#60a5fa">第 1 条</text>
    </g>
    <g v-if="step >= 2">
      <line x1="358" y1="20" x2="358" y2="140" stroke="#60a5fa" stroke-width="1.6" stroke-dasharray="7 5" />
      <text x="358" y="16" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#60a5fa">第 6 条</text>
      <path d="M 138 158 L 358 158" stroke="#2dd4bf" stroke-width="1.6" />
      <path d="M 138 150 L 138 166 M 358 150 L 358 166" stroke="#2dd4bf" stroke-width="1.6" />
      <text x="248" y="184" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#2dd4bf">a</text>
    </g>
    <g v-if="step >= 3">
      <path d="M 138 196 L 182 196" stroke="#fbbf24" stroke-width="1.6" />
      <path d="M 138 190 L 138 202 M 182 190 L 182 202" stroke="#fbbf24" stroke-width="1.6" />
      <text x="160" y="212" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#fbbf24">Δx</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  step?: number;
}

const { step = 0 } = defineProps<Props>();

const bars = Array.from({ length: 12 }, (_, index) => ({
  x: 88 + index * 44,
  opacity: 0.16 + 0.8 * Math.max(0, 1 - Math.abs(index - 5) / 6.4),
}));
</script>
