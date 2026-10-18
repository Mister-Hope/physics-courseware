<script setup lang="ts">
/** 封面右下角装饰：一段导体与它的长度 l、横截面 S —— 对应课题《导体的电阻》与 R = ρl/S */
const { width = 320 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 320 150" :width="width" xmlns="http://www.w3.org/2000/svg" class="select-none overflow-visible" aria-hidden="true">
    <!-- 导体 -->
    <rect x="56" y="40" width="180" height="30" rx="5" fill="rgba(96,165,250,0.08)" stroke="var(--c-text)" stroke-width="1.8" />
    <!-- 右端横截面 -->
    <ellipse cx="236" cy="55" rx="8" ry="15" fill="rgba(226,168,70,0.18)" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="258" y="50" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">S</text>
    <text x="258" y="72" font-family="KaTeX_Main" font-size="13" fill="var(--c-text-dim)">横截面</text>
    <!-- 长度尺寸线 -->
    <g stroke="var(--c-text-dim)" stroke-width="1.3" stroke-linecap="round">
      <line x1="56" y1="92" x2="236" y2="92" />
      <line x1="56" y1="85" x2="56" y2="99" />
      <line x1="236" y1="85" x2="236" y2="99" />
    </g>
    <text x="146" y="115" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">l</text>
    <!-- 电阻的决定式 -->
    <text x="160" y="143" text-anchor="middle" font-size="21">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main">=</tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">ρl</tspan>
      <tspan font-family="KaTeX_Main">/</tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">S</tspan>
    </text>
  </svg>
</template>
