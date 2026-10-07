<template>
  <!-- 第 12 页：同一条对角线可以作出无数个平行四边形——同一个力 F 可分解成无数对分力（两组示例按步显示） -->
  <svg viewBox="0 0 760 220">
    <line x1="60" y1="180" x2="330" y2="180" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="5 5" opacity="0.45" />
    <g v-click="1">
      <line x1="60" y1="180" x2="325" y2="180" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
      <line x1="325" y1="180" x2="400" y2="50" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
      <line x1="60" y1="180" x2="135" y2="50" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
      <line x1="135" y1="50" x2="400" y2="50" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
    </g>
    <g v-click="2">
      <line x1="60" y1="180" x2="337" y2="20" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
      <line x1="337" y1="20" x2="400" y2="50" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
      <line x1="60" y1="180" x2="124" y2="210" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
      <line x1="124" y1="210" x2="400" y2="50" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-dasharray="7 5" opacity="0.85" />
    </g>
    <CourseArrow :from="{ x: 60, y: 180 }" :to="{ x: 400, y: 50 }" stroke="var(--c-physics)" stroke-width="3.8" pointer-events="none" />
    <circle cx="60" cy="180" r="4" fill="var(--c-text)" />
  </svg>
</template>
