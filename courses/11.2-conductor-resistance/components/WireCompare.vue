<script setup lang="ts">
/** 第 2 页（引课）：两根同长、同材料（铜）的导线，一细一粗，各标出长度 l 与横截面积 S1、S2。 图只给"看着想"的对象：为什么粗一点损耗就小？ */
</script>

<template>
  <svg
    viewBox="0 0 640 210"
    xmlns="http://www.w3.org/2000/svg"
    class="block w-full h-auto"
    aria-hidden="true"
  >
    <text
      x="96"
      y="47"
      text-anchor="end"
      font-family="KaTeX_Main"
      font-size="16"
      fill="var(--c-text-dim)"
    >
      铜
    </text>
    <text
      x="96"
      y="146"
      text-anchor="end"
      font-family="KaTeX_Main"
      font-size="16"
      fill="var(--c-text-dim)"
    >
      铜
    </text>
    <rect
      x="120"
      y="34"
      width="360"
      height="12"
      rx="3"
      fill="rgba(96,165,250,0.12)"
      stroke="var(--c-text)"
      stroke-width="1.6"
    />
    <rect
      x="120"
      y="120"
      width="360"
      height="34"
      rx="3"
      fill="rgba(96,165,250,0.12)"
      stroke="var(--c-text)"
      stroke-width="1.6"
    />
    <g stroke="var(--c-text-dim)" stroke-width="1.3" stroke-linecap="round">
      <line x1="120" y1="70" x2="480" y2="70" />
      <line x1="120" y1="63" x2="120" y2="77" />
      <line x1="480" y1="63" x2="480" y2="77" />
      <line x1="120" y1="174" x2="480" y2="174" />
      <line x1="120" y1="167" x2="120" y2="181" />
      <line x1="480" y1="167" x2="480" y2="181" />
    </g>
    <text
      x="300"
      y="94"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      fill="var(--c-text)"
    >
      l
    </text>
    <text
      x="300"
      y="198"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      fill="var(--c-text)"
    >
      l
    </text>
    <text
      x="500"
      y="48"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      fill="var(--c-accent)"
    >
      S
      <tspan dy="5" font-size="13">1</tspan>
    </text>
    <text
      x="500"
      y="147"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      fill="var(--c-accent)"
    >
      S
      <tspan dy="5" font-size="13">2</tspan>
    </text>
  </svg>
</template>
