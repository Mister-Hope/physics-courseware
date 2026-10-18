<script setup lang="ts">
defineProps<{ showAnalysis?: boolean }>();
</script>

<template>
  <!-- 石块水平抛出的落地速度：v0=15 m/s、h=5 m，点击后画出速度分解与机械能守恒关系 -->
  <svg width="640" height="360" viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="320" x2="620" y2="320" stroke="var(--c-line-strong)" stroke-width="3" />
    <SurfaceHatch x1="20" y1="320" x2="620" y2="320" />
    <path d="M80 300 L80 80 L150 80" stroke="var(--c-line-strong)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="150" cy="64" r="14" fill="var(--c-warn)" fill-opacity="0.35" stroke="var(--c-warn)" stroke-width="4" />
    <CourseArrow :x1="168" y1="64" x2="238" y2="64" color="var(--c-info)" :width="3.5" />
    <text x="200" y="50" font-size="14" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="212" y="54" font-size="10" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">0</text>
    <text x="224" y="50" font-size="13" fill="var(--c-info)" font-family="KaTeX_Main">= 15 m/s</text>
    <path d="M150 70 Q340 100 540 316" stroke="var(--c-line-strong)" stroke-width="2.5" stroke-dasharray="8 8" fill="none" opacity="0.7" />
    <circle cx="540" cy="306" r="14" fill="var(--c-warn)" fill-opacity="0.35" stroke="var(--c-warn)" stroke-width="4" />
    <line x1="60" y1="80" x2="60" y2="320" stroke="var(--c-ok)" stroke-width="2" stroke-dasharray="6 6" opacity="0.7" />
    <text x="44" y="206" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="46" y="230" font-size="13" fill="var(--c-ok)" font-family="KaTeX_Main">= 5 m</text>
    <g v-if="showAnalysis">
      <CourseArrow :x1="540" y1="306" x2="612" y2="306" color="var(--c-info)" :width="3" />
      <text x="570" y="296" font-size="13" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
      <text x="580" y="300" font-size="9.5" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">0</text>
      <CourseArrow :x1="540" y1="306" x2="540" y2="216" color="var(--c-danger)" :width="3" />
      <text x="550" y="262" font-size="13" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">v</text>
      <text x="560" y="266" font-size="9.5" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">y</text>
      <line x1="540" y1="306" x2="606" y2="222" stroke="var(--c-warn)" stroke-width="3.5" stroke-linecap="round" />
      <path d="M606 222 l-13 4 l5 9 z" fill="var(--c-warn)" />
      <text x="596" y="208" font-size="14" fill="var(--c-warn)" font-family="KaTeX_Math" font-style="italic">v</text>
      <text x="608" y="212" font-size="10" fill="var(--c-warn)" font-family="KaTeX_Math" font-style="italic">t</text>
      <text x="240" y="150" font-size="13.5" fill="var(--c-ok)" font-family="KaTeX_Main">
        水平方向速度不变：
        <tspan font-style="italic">v</tspan>
        <tspan font-size="9.5" dy="3">x</tspan>
        <tspan dy="-3">= 15 m/s</tspan>
      </text>
      <text x="240" y="176" font-size="13.5" fill="var(--c-danger)" font-family="KaTeX_Main">
        竖直方向自由下落：
        <tspan font-style="italic">v</tspan>
        <tspan font-size="9.5" dy="3">y</tspan>
        <tspan dy="-3">=</tspan>
        <tspan font-style="italic">√(2</tspan>
        <tspan font-style="italic">gh</tspan>
        <tspan font-style="italic">)</tspan>
      </text>
    </g>
  </svg>
</template>
