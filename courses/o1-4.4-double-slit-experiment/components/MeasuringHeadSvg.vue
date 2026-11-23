<!-- 第 5 页：测量头（step 0 目镜里的干涉条纹；1 分划板中心刻线对准亮纹；2 手轮读数） -->
<template>
  <svg viewBox="0 0 560 236" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <clipPath id="ds-head-clip">
        <circle cx="150" cy="106" r="72" />
      </clipPath>
    </defs>
    <circle cx="150" cy="106" r="72" fill="#0b1020" stroke="#c8d3ea" stroke-opacity="0.4" stroke-width="1.6" />
    <g clip-path="url(#ds-head-clip)">
      <rect v-for="bar in bars" :key="bar.x" :x="bar.x" y="34" width="9" height="144" fill="#fbbf24" :opacity="bar.opacity" />
    </g>
    <line x1="78" y1="106" x2="222" y2="106" stroke="#c8d3ea" stroke-width="1" opacity="0.45" />
    <line :x1="crossX" y1="40" :x2="crossX" y2="172" stroke="#60a5fa" stroke-width="1.6" stroke-dasharray="7 5" />
    <text x="150" y="200" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="#c8d3ea">目镜中看到的条纹</text>
    <g v-if="step >= 1">
      <text :x="crossX + 10" y="36" font-family="KaTeX_Main" font-size="13" fill="#60a5fa">分划板中心刻线</text>
    </g>
    <g v-if="step >= 2">
      <circle cx="404" cy="140" r="44" fill="none" stroke="#e2a846" stroke-width="2" opacity="0.9" />
      <line
        v-for="tick in ticks"
        :key="tick.i"
        x1="404"
        :y1="96"
        :x2="404"
        :y2="104"
        stroke="#e2a846"
        stroke-width="2"
        :transform="tick.transform"
        opacity="0.8"
      />
      <rect x="356" y="52" width="96" height="26" rx="4" fill="#0f1425" stroke="#e2a846" stroke-opacity="0.6" stroke-width="1.2" />
      <text x="404" y="70" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#fbbf24">12.60 mm</text>
      <text x="404" y="204" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="#c8d3ea">手轮（读数）</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  step?: number;
}

const { step = 0 } = defineProps<Props>();

const bars = Array.from({ length: 7 }, (_, index) => ({
  x: 80 + index * 21,
  opacity: 0.18 + 0.8 * Math.max(0, 1 - Math.abs(index - 3) / 3.6),
}));

const crossX = computed(() => (step >= 2 ? 122 : 150));

const ticks = Array.from({ length: 12 }, (_, index) => ({
  i: index,
  transform: `rotate(${index * 30} 404 140)`,
}));
</script>
