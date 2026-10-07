<template>
  <!-- 第 2 页：物块同时受到两个分力 F₁、F₂ 的作用 -->
  <svg viewBox="0 0 300 200">
    <path d="M 112 140 L 188 140 L 176 186 L 124 186 z" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2" />
    <CourseArrow :from="{ x: 150, y: 140 }" :to="{ x: 114, y: 89 }" stroke="var(--c-accent)" stroke-width="3" pointer-events="none" />
    <CourseArrow :from="{ x: 150, y: 140 }" :to="{ x: 186, y: 89 }" stroke="var(--c-accent-2)" stroke-width="3" pointer-events="none" />
    <circle cx="150" cy="140" r="3.5" fill="var(--c-text)" />
  </svg>
</template>
