<template>
  <!-- 第 13 页：平行四边形法则：同起点补出平行四边形，对角线为和 -->
  <svg viewBox="0 0 170 120" width="100%" style="max-width: 12rem" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,100 104,100 140,36 60,36" fill="color-mix(in srgb, var(--c-accent) 7%, transparent)" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 3" />
    <line x1="24" y1="100" x2="104" y2="100" stroke="var(--c-accent)" stroke-width="2.6" />
    <line x1="24" y1="100" x2="60" y2="36" stroke="var(--c-velocity)" stroke-width="2.6" />
    <CourseArrow :from="{ x: 24, y: 100 }" :to="{ x: 140, y: 36 }" :head-size="10" stroke="var(--c-physics)" stroke-width="3.2" />
    <text x="74" y="116" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">a</text>
    <text x="22" y="58" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-velocity)">b</text>
    <text x="98" y="80" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      a + b
    </text>
  </svg>
</template>
