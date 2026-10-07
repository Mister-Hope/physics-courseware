<template>
  <!-- 第 1 页封面装饰：v-t 图像（一陡一缓两条直线 + 斜率三角形），与本课"斜率就是加速度"主线呼应 -->
  <svg viewBox="0 0 240 160" width="320" xmlns="http://www.w3.org/2000/svg">
    <line x1="34" y1="124" x2="216" y2="124" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 209 121 L 216 124 L 209 127" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
    <line x1="34" y1="124" x2="34" y2="22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 31 29 L 34 22 L 37 29" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
    <line x1="34" y1="124" x2="188" y2="30" stroke="#e2a846" stroke-width="2.6" stroke-linecap="round" />
    <line x1="34" y1="124" x2="214" y2="62" stroke="#60a5fa" stroke-width="2.4" stroke-linecap="round" />
    <line x1="34" y1="124" x2="112" y2="124" stroke="#e2a846" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.7" />
    <line x1="112" y1="124" x2="112" y2="76" stroke="#e2a846" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.7" />
    <circle cx="188" cy="30" r="4" fill="#e2a846" />
    <circle cx="214" cy="62" r="4" fill="#60a5fa" />
    <text x="22" y="140" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#94a3b8" opacity="0.8">O</text>
    <text x="22" y="28" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#94a3b8">v</text>
    <text x="206" y="140" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#94a3b8">t</text>
  </svg>
</template>
