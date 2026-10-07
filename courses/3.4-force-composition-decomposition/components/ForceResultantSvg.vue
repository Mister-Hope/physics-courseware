<template>
  <!-- 第 2 页：物块只受一个合力 F 的作用，效果与上面的两个分力相同 -->
  <svg viewBox="0 0 300 200">
    <path d="M 112 140 L 188 140 L 176 186 L 124 186 z" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2" />
    <CourseArrow :from="{ x: 150, y: 140 }" :to="{ x: 150, y: 38 }" stroke="var(--c-physics)" stroke-width="3.4" pointer-events="none" />
    <circle cx="150" cy="140" r="3.5" fill="var(--c-text)" />
  </svg>
</template>
