<!-- 第 2 页：肥皂膜上的彩色条纹（水平彩带 = 不同位置液膜厚度不同） -->
<template>
  <svg viewBox="0 0 660 208" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <clipPath id="li-film-clip">
        <ellipse cx="330" cy="104" rx="168" ry="80" />
      </clipPath>
    </defs>
    <ellipse cx="330" cy="104" rx="168" ry="80" fill="var(--c-surface)" />
    <g clip-path="url(#li-film-clip)">
      <rect v-for="band in bands" :key="band.y" x="150" :y="band.y" :width="360" :height="band.h" :fill="band.color" :opacity="band.opacity" />
      <ellipse cx="272" cy="64" rx="52" ry="26" fill="#ffffff" opacity="0.09" />
    </g>
    <ellipse cx="330" cy="104" rx="168" ry="80" fill="none" stroke="var(--c-text-dim)" stroke-width="3.4" />
    <text x="330" y="200" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">肥皂膜</text>
  </svg>
</template>

<script setup lang="ts">
interface Band {
  y: number;
  h: number;
  color: string;
  opacity: number;
}

const colors = ["#f87171", "#fb923c", "#fbbf24", "#4ade80", "#2dd4bf", "#60a5fa", "#a78bfa", "#f472b6"];
const bands: Band[] = colors.map((color, i) => ({
  y: 24 + i * 20,
  h: 22,
  color,
  opacity: 0.3 + 0.05 * ((i + 2) % 3),
}));
</script>
