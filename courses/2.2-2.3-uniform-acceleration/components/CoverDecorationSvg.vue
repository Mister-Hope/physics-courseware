<template>
  <!-- 第 1 页（封面）右下角装饰：v-t 图中的速度—时间图线与位移面积 -->
  <svg viewBox="0 0 240 160" width="250" xmlns="http://www.w3.org/2000/svg">
    <polygon points="26,134 206,134 206,46 26,106" fill="rgba(226,168,70,0.13)" />
    <line x1="26" y1="134" x2="222" y2="134" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <line x1="26" y1="134" x2="26" y2="30" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <line x1="26" y1="106" x2="206" y2="46" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <line x1="206" y1="46" x2="206" y2="134" stroke="#60a5fa" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.8" />
    <circle cx="26" cy="106" r="4.5" fill="#e2a846" />
    <circle cx="206" cy="46" r="4.5" fill="#60a5fa" />
    <text x="12" y="150" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#94a3b8">O</text>
    <text x="12" y="24" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#94a3b8">v</text>
    <text x="228" y="139" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#94a3b8">t</text>
    <text x="206" y="34" text-anchor="end" font-size="13" fill="#e2a846">面积 = 位移</text>
  </svg>
</template>
