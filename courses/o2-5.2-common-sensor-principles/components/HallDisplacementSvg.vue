<template>
  <!-- P15 霍尔元件测微小位移：两块磁感应强度相同的磁体同极相对，中间 B=0；元件沿 z 轴移动时输出与位移成正比的霍尔电压 -->
  <svg viewBox="0 0 440 250" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="霍尔元件测微小位移示意图">
    <BarMagnet :x="105" :y="145" :length="110" :width="34" nSide="right" />
    <BarMagnet :x="335" :y="145" :length="110" :width="34" nSide="left" />
    <text x="220" y="82" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">两块磁体同极相对</text>
    <rect x="203" y="128" width="34" height="34" rx="2" fill="var(--c-physics)" fill-opacity="0.25" stroke="var(--c-physics)" stroke-width="1.8" />
    <text x="220" y="118" font-size="12" fill="var(--c-physics)" text-anchor="middle">霍尔元件</text>
    <text x="220" y="184" font-size="12" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)" text-anchor="middle">B = 0</text>
    <line x1="237" y1="145" x2="256" y2="145" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" />
    <text x="260" y="141" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">U<tspan dy="3" font-size="8">H</tspan></text>
    <CourseArrow :from="{ x: 220, y: 224 }" :to="{ x: 140, y: 224 }" stroke="var(--c-accent-2)" :stroke-width="2" :head-size="9" />
    <CourseArrow :from="{ x: 220, y: 224 }" :to="{ x: 300, y: 224 }" stroke="var(--c-accent-2)" :stroke-width="2" :head-size="9" />
    <text x="306" y="230" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">z</text>
  </svg>
</template>
