<script setup lang="ts">
/** 第 7 页配图：一段导体与它的横截面，时间 t 内有电荷量 q 通过该横截面（电流定义 I = q/t 的示意）。 */
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 132" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体 -->
      <rect x="30" y="34" width="400" height="58" rx="6" fill="rgba(96,165,250,0.07)" stroke="var(--c-text)" stroke-width="1.6" />
      <!-- 时间 t 内通过横截面的那段电荷 -->
      <rect x="176" y="34" width="74" height="58" fill="rgba(226,168,70,0.14)" />
      <!-- 横截面 -->
      <line x1="250" y1="26" x2="250" y2="100" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="7 5" />
      <text x="250" y="18" text-anchor="middle" font-size="14" fill="var(--c-accent)">横截面</text>
      <!-- 通过的电荷量 q -->
      <CourseArrow :from="{ x: 150, y: 63 }" :to="{ x: 330, y: 63 }" stroke="var(--c-accent)" :stroke-width="2.8" label="q" :label-dx="-30" :label-dy="-14" />
      <text x="230" y="122" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
        时间
        <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
        内通过横截面的电荷量
        <tspan font-family="KaTeX_Math" font-style="italic">q</tspan>
      </text>
    </svg>
  </div>
</template>
