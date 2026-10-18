<template>
  <!-- 竖直上抛示意图：以 v0 竖直上抛，标出最大高度 H -->
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="290" x2="280" y2="290" stroke="var(--c-line-strong)" stroke-width="3" />
    <SurfaceHatch x1="40" y1="290" x2="280" y2="290" />
    <line x1="160" y1="270" x2="160" y2="50" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="6 7" opacity="0.55" />
    <circle cx="160" cy="270" r="13" fill="var(--c-warn)" fill-opacity="0.35" stroke="var(--c-warn)" stroke-width="3.5" />
    <CourseArrow :x1="182" y1="270" x2="182" y2="204" color="var(--c-info)" :width="3" />
    <text x="192" y="242" font-size="14" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="202" y="246" font-size="10" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">0</text>
    <text x="212" y="242" font-size="13" fill="var(--c-info)" font-family="KaTeX_Main">= 20 m/s</text>
    <circle cx="160" cy="58" r="13" fill="var(--c-warn)" fill-opacity="0.2" stroke="var(--c-warn)" stroke-width="3.5" opacity="0.6" />
    <text x="104" y="166" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Main">最大高度</text>
    <text x="104" y="186" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Main" font-style="italic">H</text>
    <line x1="140" y1="60" x2="140" y2="268" stroke="var(--c-ok)" stroke-width="2" stroke-dasharray="5 6" opacity="0.7" />
  </svg>
</template>
