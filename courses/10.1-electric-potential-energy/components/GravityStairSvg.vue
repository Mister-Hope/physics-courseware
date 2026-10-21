<!-- 第 3 页重力类比图：同一物体沿两条不同路径由 A 到 B，高度差都是 h -->
<template>
  <svg
    viewBox="0 0 440 240"
    width="440"
    height="240"
    xmlns="http://www.w3.org/2000/svg"
    font-family="Inter, system-ui, sans-serif"
    role="img"
    aria-label="同一物体由 A 到 B 的两条路径，起点与终点的高度差都是 h"
  >
    <path d="M 80 58 L 80 185 L 370 185" fill="none" stroke="var(--c-neutral-300)" stroke-width="2" stroke-dasharray="8 6" opacity="0.75" />
    <path d="M 80 58 L 370 58 L 370 185" fill="none" stroke="var(--c-neutral-300)" stroke-width="2" stroke-dasharray="8 6" opacity="0.75" />
    <line x1="42" y1="58" x2="42" y2="185" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="4 4" />
    <line x1="34" y1="58" x2="50" y2="58" stroke="var(--c-text-dim)" stroke-width="1.3" />
    <line x1="34" y1="185" x2="50" y2="185" stroke="var(--c-text-dim)" stroke-width="1.3" />
    <text x="28" y="126" text-anchor="end" fill="var(--c-text-dim)" font-size="21" font-family="KaTeX_Math" font-style="italic">h</text>
    <rect x="68" y="46" width="24" height="24" rx="4" fill="var(--c-accent)" fill-opacity="0.2" stroke="var(--c-accent)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 80, y: 58 }" :to="{ x: 80, y: 116 }" stroke="var(--c-force)" stroke-width="2.6" />
    <text
      x="98"
      y="92"
      fill="var(--c-force)"
      font-size="18"
      font-family="KaTeX_Math"
      font-style="italic"
      stroke="var(--c-bg)"
      stroke-width="3"
      paint-order="stroke"
    >
      mg
    </text>
    <text x="56" y="42" text-anchor="end" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">A</text>
    <circle cx="370" cy="185" r="5" fill="var(--c-accent)" />
    <text x="382" y="202" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">B</text>
  </svg>
</template>
