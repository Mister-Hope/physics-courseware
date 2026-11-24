<!-- 5.3 P4：两个质子各受电磁斥力（向外）与核力（向内），下方标出核力作用范围约 1e-15 m -->
<template>
  <svg viewBox="0 0 440 232" width="100%" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 118, y: 104 }" :to="{ x: 26, y: 104 }" stroke="var(--c-accent-2)" :stroke-width="3.2" />
    <CourseArrow :from="{ x: 322, y: 104 }" :to="{ x: 414, y: 104 }" stroke="var(--c-accent-2)" :stroke-width="3.2" />
    <CourseArrow :from="{ x: 182, y: 104 }" :to="{ x: 214, y: 104 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <CourseArrow :from="{ x: 258, y: 104 }" :to="{ x: 226, y: 104 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <circle cx="150" cy="104" r="30" fill="var(--c-danger)" fill-opacity="0.9" />
    <circle cx="290" cy="104" r="30" fill="var(--c-danger)" fill-opacity="0.9" />
    <text x="150" y="104" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="24" fill="var(--c-bg)">+</text>
    <text x="290" y="104" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="24" fill="var(--c-bg)">+</text>
    <text x="71" y="78" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">电磁斥力</text>
    <text x="369" y="78" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">电磁斥力</text>
    <text x="220" y="78" text-anchor="middle" font-size="14" fill="var(--c-accent)">核力</text>
    <line x1="150" y1="172" x2="150" y2="188" stroke="var(--c-line)" stroke-width="1.2" />
    <line x1="290" y1="172" x2="290" y2="188" stroke="var(--c-line)" stroke-width="1.2" />
    <line x1="150" y1="180" x2="290" y2="180" stroke="var(--c-line)" stroke-width="1.2" stroke-dasharray="5 5" />
    <text x="220" y="208" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
      <tspan>约 </tspan>
      <tspan font-family="KaTeX_Math" font-style="italic" font-size="14">10</tspan>
      <tspan font-family="KaTeX_Main" font-size="10" dy="-5">−15</tspan>
      <tspan font-family="KaTeX_Main" dy="5"> m</tspan>
    </text>
  </svg>
</template>
