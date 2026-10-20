<script setup lang="ts">
/** 例题（有两个量程的电压表）：a 为公共端；a–b 量程 0~~3 V（表头与 R₁ 串联），a–c 量程 0~~15 V（再串 R₂）。 根 svg 带固有尺寸，供 exercise-split 的 #fig 使用。 */
</script>

<template>
  <svg viewBox="0 0 460 250" width="330" height="179" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 70 80 V 190" />
      <path d="M 70 80 H 114" />
      <path d="M 146 80 H 206" />
      <path d="M 254 80 H 346" />
      <path d="M 394 80 H 410" />
      <path d="M 410 80 V 190" />
      <path d="M 300 80 V 190" />
    </g>
    <circle cx="300" cy="80" r="3" fill="var(--c-text)" />
    <rect x="48" y="42" width="384" height="128" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" />
    <CircuitMeter :x="130" :y="80" kind="a" />
    <CircuitResistor :x="230" :y="80" />
    <CircuitResistor :x="370" :y="80" />
    <text x="130" y="112" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="14" dy="5">g</tspan>
    </text>
    <text x="230" y="62" text-anchor="middle" font-size="19" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="14" dy="5">1</tspan>
    </text>
    <text x="370" y="62" text-anchor="middle" font-size="19" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="14" dy="5">2</tspan>
    </text>
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6">
      <circle cx="70" cy="190" r="4" />
      <circle cx="300" cy="190" r="4" />
      <circle cx="410" cy="190" r="4" />
    </g>
    <g font-family="KaTeX_Main" font-size="19" fill="var(--c-accent)" text-anchor="middle">
      <text x="70" y="216">a</text>
      <text x="300" y="216">b</text>
      <text x="410" y="216">c</text>
    </g>
    <g font-family="KaTeX_Main" font-size="17" fill="var(--c-text-dim)" text-anchor="middle">
      <text x="300" y="240">3 V</text>
      <text x="410" y="240">15 V</text>
    </g>
  </svg>
</template>
