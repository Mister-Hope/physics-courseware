<template>
  <!-- 木箱：推力、静摩擦力与竖直方向的重力、支持力 -->
  <svg viewBox="0 0 300 250" class="fig-svg fig-sm" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 24, y: 182 }" :to="{ x: 276, y: 182 }" side="below" :thickness="12" :gap="48" />
    <rect x="92" y="106" width="112" height="76" rx="7" fill="rgba(226,168,70,0.16)" stroke="var(--c-accent)" stroke-width="2.2" />
    <text x="148" y="150" text-anchor="middle" font-size="15" fill="var(--c-text)">木箱</text>
    <CourseArrow :from="{ x: 204, y: 144 }" :to="{ x: 284, y: 144 }" stroke="var(--c-accent)" stroke-width="3.2" />
    <CourseArrow :from="{ x: 148, y: 182 }" :to="{ x: 18, y: 182 }" stroke="var(--c-danger)" stroke-width="3.2" />
    <CourseArrow :from="{ x: 148, y: 106 }" :to="{ x: 148, y: 34 }" stroke="var(--c-physics)" stroke-width="3" stroke-dasharray="7 5" />
    <CourseArrow :from="{ x: 148, y: 182 }" :to="{ x: 148, y: 244 }" stroke="var(--c-accent-2)" stroke-width="3" stroke-dasharray="7 5" />
    <text x="158" y="34" font-size="15" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="10">N</tspan>
    </text>
    <text x="158" y="240" font-size="15" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">mg</tspan>
    </text>
    <text x="252" y="132" font-size="15" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">F</text>
    <text x="22" y="168" font-size="15" fill="var(--c-danger)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="10">f</tspan>
    </text>
  </svg>
</template>
