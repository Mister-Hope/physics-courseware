<!-- 第 14 页（习题图）：天宫一号目标飞行器轨道示意——地球、虚线圆轨道、天宫一号与发向地面接收站的电磁波路径，标注两个已知半径与待求路程 -->
<script setup lang="ts"></script>

<template>
  <svg viewBox="0 0 480 350" width="352" height="257" xmlns="http://www.w3.org/2000/svg">
    <circle cx="240" cy="215" r="132" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-dasharray="8 6" />
    <CelestialEarth :x="240" :y="215" :r="94" />
    <circle cx="240" cy="215" r="3" fill="var(--c-text)" />
    <line x1="240" y1="215" x2="333" y2="122" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <line x1="240" y1="215" x2="306" y2="281" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <text x="250" y="158" font-size="15" fill="var(--c-text)" stroke="var(--c-bg)" stroke-width="4" paint-order="stroke" stroke-linejoin="round">
      <tspan font-family="KaTeX_Math" font-style="italic">r</tspan>
      <tspan font-family="KaTeX_Main">= 6 740</tspan>
      <tspan font-family="KaTeX_Main">km</tspan>
    </text>
    <text x="312" y="292" font-size="15" fill="var(--c-text)" stroke="var(--c-bg)" stroke-width="4" paint-order="stroke" stroke-linejoin="round">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main">= 6 400</tspan>
      <tspan font-family="KaTeX_Main">km</tspan>
    </text>
    <g>
      <rect x="323" y="114" width="20" height="17" rx="3" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="2" />
      <rect x="303" y="118" width="17" height="10" rx="2" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <rect x="346" y="118" width="17" height="10" rx="2" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <text
        x="352"
        y="96"
        text-anchor="middle"
        font-size="15"
        fill="var(--c-text-dim)"
        stroke="var(--c-bg)"
        stroke-width="4"
        paint-order="stroke"
        stroke-linejoin="round"
      >
        天宫一号
      </text>
    </g>
    <rect x="296" y="141" width="20" height="9" rx="2" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text
      x="246"
      y="170"
      text-anchor="end"
      font-size="15"
      fill="var(--c-text-dim)"
      stroke="var(--c-bg)"
      stroke-width="4"
      paint-order="stroke"
      stroke-linejoin="round"
    >
      地面接收站
    </text>
    <line x1="249" y1="165" x2="294" y2="150" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <CourseArrow :from="{ x: 324, y: 131 }" :to="{ x: 311, y: 144 }" stroke="var(--c-accent)" stroke-width="2.6" />
    <text
      x="304"
      y="126"
      text-anchor="end"
      font-size="17"
      fill="var(--c-accent)"
      stroke="var(--c-bg)"
      stroke-width="4"
      paint-order="stroke"
      stroke-linejoin="round"
    >
      <tspan font-family="KaTeX_Math" font-style="italic">s</tspan>
      <tspan font-family="KaTeX_Main">= ?</tspan>
    </text>
  </svg>
</template>
