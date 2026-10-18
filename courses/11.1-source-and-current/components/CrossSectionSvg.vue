<script setup lang="ts">
/** 第 7 页配图：一段导体与它的横截面，时间 t 内有电荷量 q 通过该横截面（电流定义 I = q/t 的示意）。 */
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体 -->
      <rect x="40" y="44" width="380" height="72" rx="8" fill="rgba(96,165,250,0.07)" stroke="var(--c-text)" stroke-width="1.6" />
      <!-- 横截面 -->
      <line x1="250" y1="44" x2="250" y2="116" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="7 5" />
      <text x="250" y="32" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent)">横截面</text>
      <!-- 通过横截面的电荷量 -->
      <CourseArrow :from="{ x: 96, y: 80 }" :to="{ x: 320, y: 80 }" stroke="var(--c-accent)" :stroke-width="2.8" label="q" :label-dx="-40" :label-dy="-14" />
      <text x="230" y="146" text-anchor="middle" font-family="KaTeX_Main" font-size="16" fill="var(--c-text-dim)">
        时间
        <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
        内通过横截面的电荷量
        <tspan font-family="KaTeX_Math" font-style="italic">q</tspan>
      </text>
    </svg>
  </div>
</template>
