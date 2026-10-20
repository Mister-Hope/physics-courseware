<script setup lang="ts">
/**
 * 例题（有两个量程的电流表，0~~0.6 A 与 0~~3 A）：表头接在 A、C 之间；R₁ 接 A–B，R₂ 接 B–C。 用 A、C 时表头被 R₁+R₂ 分流（0.6 A 量程）；用 A、B 时表头与 R₂ 串联后被 R₁ 分流（3 A 量程）。 根 svg 带固有尺寸，供 exercise-split 的
 * #fig 使用。
 */
</script>

<template>
  <svg viewBox="0 0 440 285" width="320" height="207" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 110 70 H 204" />
      <path d="M 236 70 H 330" />
      <path d="M 110 70 V 240" />
      <path d="M 330 70 V 240" />
      <path d="M 110 170 H 141" />
      <path d="M 189 170 H 251" />
      <path d="M 299 170 H 330" />
      <path d="M 220 170 V 240" />
    </g>
    <circle cx="110" cy="170" r="3" fill="var(--c-text)" />
    <circle cx="220" cy="170" r="3" fill="var(--c-text)" />
    <circle cx="330" cy="170" r="3" fill="var(--c-text)" />
    <rect x="85" y="45" width="270" height="170" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" />
    <CircuitMeter :x="220" :y="70" kind="a" />
    <CircuitResistor :x="165" :y="170" />
    <CircuitResistor :x="275" :y="170" />
    <text x="220" y="102" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="14" dy="5">g</tspan>
    </text>
    <text x="165" y="152" text-anchor="middle" font-size="19" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="14" dy="5">1</tspan>
    </text>
    <text x="275" y="152" text-anchor="middle" font-size="19" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="14" dy="5">2</tspan>
    </text>
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6">
      <circle cx="110" cy="240" r="4" />
      <circle cx="220" cy="240" r="4" />
      <circle cx="330" cy="240" r="4" />
    </g>
    <g font-family="KaTeX_Main" font-size="19" fill="var(--c-accent)" text-anchor="middle">
      <text x="110" y="268">A</text>
      <text x="220" y="268">B</text>
      <text x="330" y="268">C</text>
    </g>
  </svg>
</template>
