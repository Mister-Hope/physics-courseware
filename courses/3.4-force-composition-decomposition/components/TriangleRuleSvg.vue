<template>
  <!-- 第 8 页：两力首尾相接，合力由第一个力的起点指向第二个力的终点（三角形定则） -->
  <svg viewBox="0 0 320 200">
    <line x1="46" y1="166" x2="150" y2="166" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="5 5" opacity="0.5" />
    <CourseArrow :from="{ x: 46, y: 166 }" :to="{ x: 150, y: 166 }" stroke="var(--c-accent)" stroke-width="3.2" pointer-events="none" />
    <CourseArrow :from="{ x: 150, y: 166 }" :to="{ x: 216, y: 78 }" stroke="var(--c-accent-2)" stroke-width="3.2" pointer-events="none" />
    <CourseArrow :from="{ x: 46, y: 166 }" :to="{ x: 216, y: 78 }" stroke="var(--c-physics)" stroke-width="3.6" pointer-events="none" />
    <circle cx="46" cy="166" r="3.5" fill="var(--c-text)" />
  </svg>
</template>
