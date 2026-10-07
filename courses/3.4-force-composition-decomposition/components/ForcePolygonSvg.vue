<template>
  <!-- 第 8 页：多个力首尾相接成折线，合力由第一个力的起点指向最后一个力的终点 -->
  <svg viewBox="0 0 320 200">
    <CourseArrow :from="{ x: 40, y: 170 }" :to="{ x: 120, y: 170 }" stroke="var(--c-accent)" stroke-width="3" pointer-events="none" />
    <CourseArrow :from="{ x: 120, y: 170 }" :to="{ x: 158, y: 100 }" stroke="var(--c-accent-2)" stroke-width="3" pointer-events="none" />
    <CourseArrow :from="{ x: 158, y: 100 }" :to="{ x: 252, y: 66 }" stroke="var(--c-accent)" stroke-width="3" pointer-events="none" />
    <CourseArrow :from="{ x: 40, y: 170 }" :to="{ x: 252, y: 66 }" stroke="var(--c-physics)" stroke-width="3.6" pointer-events="none" />
    <circle cx="40" cy="170" r="3.5" fill="var(--c-text)" />
  </svg>
</template>
