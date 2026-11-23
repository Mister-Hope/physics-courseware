<!-- 潜水员看到的水面范围：水面景物在倒立圆锥内，圆锥顶角 2C -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 500 340" class="diver-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coneFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3b82f6" stop-opacity=".2" />
        <stop offset="1" stop-color="#3b82f6" stop-opacity=".05" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="500" height="90" fill="#0b1220" opacity=".5" />
    <rect x="0" y="90" width="500" height="250" fill="#0c1a2e" opacity=".55" />
    <polygon points="250,300 11,90 489,90" fill="url(#coneFill)" stroke="#60a5fa" stroke-width="1.6" />
    <line x1="0" y1="90" x2="500" y2="90" stroke="#cbd5e1" stroke-width="2" opacity=".8" />
    <line x1="250" y1="90" x2="250" y2="300" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".55" />
    <circle cx="250" cy="300" r="13" fill="#1e3a8a" stroke="#93c5fd" stroke-width="1.5" />
    <circle cx="250" cy="300" r="4" fill="#e2e8f0" />
    <g :opacity="step >= 1 ? 1 : 0">
      <path d="M 250 240 A 60 60 0 0 1 293 258" fill="none" stroke="#e2a846" stroke-width="1.4" />
      <path d="M 250 240 A 60 60 0 0 0 207 258" fill="none" stroke="#e2a846" stroke-width="1.4" />
      <text x="286" y="234" fill="#e2a846" font-size="17" font-family="KaTeX_Math" font-style="italic">C</text>
      <text x="196" y="234" fill="#e2a846" font-size="17" font-family="KaTeX_Math" font-style="italic">C</text>
    </g>
    <text x="250" y="332" fill="#e2e8f0" font-size="15" text-anchor="middle">潜水员</text>
    <text x="18" y="76" fill="#94a3b8" font-size="16">空气</text>
    <text x="18" y="316" fill="#94a3b8" font-size="16">水</text>
    <text x="236" y="112" fill="#cbd5e1" font-size="16">水面</text>
  </svg>
</template>
