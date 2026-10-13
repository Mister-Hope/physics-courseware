<script setup lang="ts">
/** 封面 / 章节页右下角装饰图：伏安法测电源电动势与内阻的电路示意 */
const { width = 300 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 220 150" :width="width" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.75">
      <path d="M 35 35 H 94" />
      <path d="M 126 35 H 185 V 115 H 140" />
      <path d="M 100 115 H 35 V 72" />
      <path d="M 35 60 V 35" />
    </g>
    <circle cx="110" cy="35" r="16" fill="none" stroke="currentColor" stroke-width="2" opacity="0.75" />
    <text x="110" y="41" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="#e2a846">V</text>
    <circle cx="185" cy="75" r="16" fill="none" stroke="currentColor" stroke-width="2" opacity="0.75" />
    <text x="185" y="81" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="#60a5fa">A</text>
    <line x1="20" y1="60" x2="50" y2="60" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" />
    <line x1="28" y1="72" x2="42" y2="72" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
    <rect x="100" y="106" width="40" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2" opacity="0.75" />
    <text x="110" y="145" text-anchor="middle" style="font-size: 13px" fill="#94a3b8" opacity="0.7">伏安法测 E、r</text>
  </svg>
</template>
