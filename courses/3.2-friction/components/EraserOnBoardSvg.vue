<template>
  <!-- 板擦在黑板上滑动：摩擦力与速度反向 -->
  <svg viewBox="0 0 300 230" class="fig-svg fig-fill" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="260" height="152" rx="10" fill="rgba(15,20,37,0.6)" stroke="var(--c-border)" stroke-width="2" />
    <rect x="102" y="100" width="96" height="52" rx="7" fill="rgba(96,165,250,0.22)" stroke="var(--c-accent-2)" stroke-width="2.2" />
    <text x="150" y="118" text-anchor="middle" font-size="15" fill="var(--c-text)">板擦</text>
    <CourseArrow :from="{ x: 150, y: 126 }" :to="{ x: 34, y: 126 }" stroke="var(--c-accent)" stroke-width="3.2" />
    <CourseArrow :from="{ x: 198, y: 126 }" :to="{ x: 266, y: 126 }" stroke="var(--c-physics)" stroke-width="3.2" />
    <text x="270" y="120" font-size="14" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="36" y="114" font-size="15" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="10">f</tspan>
    </text>
  </svg>
</template>
