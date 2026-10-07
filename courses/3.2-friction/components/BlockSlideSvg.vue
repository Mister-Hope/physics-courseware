<template>
  <!-- 木块在桌面上向右滑动：滑动摩擦力沿接触面向左 -->
  <svg viewBox="0 0 320 230" class="fig-svg fig-md" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 24, y: 176 }" :to="{ x: 296, y: 176 }" side="below" :thickness="12" :gap="48" />
    <rect x="92" y="112" width="112" height="64" rx="7" fill="rgba(226,168,70,0.16)" stroke="var(--c-accent)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 148, y: 176 }" :to="{ x: 30, y: 176 }" stroke="var(--c-accent)" stroke-width="3.4" />
    <CourseArrow :from="{ x: 204, y: 144 }" :to="{ x: 288, y: 144 }" stroke="var(--c-physics)" stroke-width="3.4" />
    <text x="288" y="136" font-size="16" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="32" y="162" font-size="16" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="11">f</tspan>
    </text>
    <text x="148" y="214" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">木块在桌面上向右滑动</text>
  </svg>
</template>
