<script setup lang="ts">
/** 第 16 页配图（示例 2：转动的带电圆环）：均匀带正电的橡胶圆环以角速度 ω 绕竖直转轴匀速转动。 题目图常显、只画题目给的信息（圆环、转轴、半径 R、ω、均匀分布的正电荷）；等效电流方向属答案，不画。 */
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 360 210" width="280" height="163" xmlns="http://www.w3.org/2000/svg">
      <!-- 圆环（透视椭圆） -->
      <ellipse cx="180" cy="112" rx="105" ry="34" fill="none" stroke="var(--c-accent)" stroke-width="3" />
      <!-- 转轴：垂直于圆环平面、通过圆心 -->
      <line x1="180" y1="16" x2="180" y2="200" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
      <text x="192" y="26" font-size="12" fill="var(--c-text-dim)">转轴</text>
      <!-- 转动方向 -->
      <path d="M 60 112 A 120 46 0 0 1 300 112" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
      <path d="M 300 112 L 293 103 L 307 103 Z" fill="var(--c-accent)" />
      <text x="255" y="64" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">ω</text>
      <!-- 半径 R -->
      <line x1="180" y1="112" x2="232" y2="141" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 4" />
      <text x="198" y="138" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text-dim)">R</text>
      <circle cx="180" cy="112" r="2.5" fill="var(--c-text-dim)" />
      <!-- 均匀分布的正电荷 -->
      <text x="285" y="117" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <text x="232" y="147" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <text x="128" y="147" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <text x="75" y="117" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <text x="128" y="88" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <text x="232" y="88" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
    </svg>
  </div>
</template>
