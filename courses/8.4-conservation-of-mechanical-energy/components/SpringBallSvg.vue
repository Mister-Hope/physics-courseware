<template>
  <!-- 判断情境②：被压缩弹簧弹起的小球（不计摩擦） -->
  <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="200" x2="240" y2="200" stroke="var(--c-line-strong)" stroke-width="3" />
    <SurfaceHatch x1="20" y1="200" x2="240" y2="200" />
    <path d="M110 196 l6 -12 l12 12 l6 -12 l12 12 l6 -12 l12 12 l6 -12 l12 12" stroke="var(--c-ink-faint)" stroke-width="2.5" fill="none" />
    <circle cx="152" cy="160" r="14" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="3.5" />
    <CourseArrow :x1="152" y1="140" x2="152" y2="76" color="var(--c-info)" :width="3" />
    <text x="164" y="112" font-size="13" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
  </svg>
</template>
