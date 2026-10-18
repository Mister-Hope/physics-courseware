<template>
  <!-- 判断情境①：跳伞运动员匀速下落（受空气阻力） -->
  <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="200" x2="240" y2="200" stroke="var(--c-line-strong)" stroke-width="3" />
    <SurfaceHatch x1="20" y1="200" x2="240" y2="200" />
    <circle cx="130" cy="90" r="16" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="3.5" />
    <CourseArrow :x1="130" y1="112" x2="130" y2="164" color="var(--c-info)" :width="3" />
    <text x="142" y="146" font-size="13" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <g stroke="var(--c-ink-faint)" stroke-width="2" opacity="0.8">
      <line x1="106" y1="66" x2="96" y2="56" />
      <line x1="154" y1="66" x2="164" y2="56" />
      <line x1="100" y1="96" x2="88" y2="96" />
      <line x1="160" y1="96" x2="172" y2="96" />
    </g>
  </svg>
</template>
