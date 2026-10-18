<script setup lang="ts">
/** 第 11 页：双量程电压表的内部电路（教材习题 11.4-4 的图）：A 为公共端， A–B 之间是表头与 R₁，A–C 之间再加 R₂。根 svg 带固有尺寸，供 exercise-split 的 #fig 使用。 */
</script>

<template>
  <svg viewBox="0 0 460 290" width="340" height="214" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 150 34 H 230 V 54" />
      <path d="M 230 86 V 112" />
      <path d="M 230 152 V 176" />
      <path d="M 230 176 H 330" />
      <path d="M 230 176 V 204" />
      <path d="M 230 244 V 258" />
      <path d="M 230 258 H 330" />
    </g>
    <circle cx="230" cy="176" r="3" fill="var(--c-text)" />
    <CircuitMeter :x="230" :y="70" kind="a" />
    <CircuitResistor :x="230" :y="132" orientation="vertical" :length="40" />
    <CircuitResistor :x="230" :y="224" orientation="vertical" :length="40" />
    <circle cx="150" cy="34" r="4.5" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <circle cx="330" cy="176" r="4.5" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <circle cx="330" cy="258" r="4.5" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <g font-family="KaTeX_Main" font-size="17" fill="var(--c-accent)">
      <text x="136" y="40" text-anchor="end">A</text>
      <text x="342" y="182">B</text>
      <text x="342" y="264">C</text>
    </g>
    <text x="204" y="76" text-anchor="end" font-size="15" fill="var(--c-text-dim)">表头</text>
    <text x="252" y="137" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="13" dy="4">1</tspan>
    </text>
    <text x="252" y="229" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="13" dy="4">2</tspan>
    </text>
  </svg>
</template>
