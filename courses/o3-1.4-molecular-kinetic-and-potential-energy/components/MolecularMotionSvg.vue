<!-- 分子在不停地运动：速率不同、方向不同 -->
<template>
  <svg viewBox="0 0 420 220" width="420" height="220" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="16" width="384" height="168" rx="18" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" />
    <circle cx="108" cy="86" r="15" fill="var(--c-physics)" opacity="0.9" />
    <circle cx="210" cy="58" r="10" fill="var(--c-accent-2)" opacity="0.9" />
    <circle cx="300" cy="108" r="13" fill="var(--c-accent)" opacity="0.9" />
    <circle cx="178" cy="142" r="9" fill="var(--c-danger)" opacity="0.8" />
    <CourseArrow :from="{ x: 128, y: 80 }" :to="{ x: 186, y: 62 }" stroke="var(--c-accent-2)" :stroke-width="2" :head-size="7" />
    <CourseArrow :from="{ x: 226, y: 62 }" :to="{ x: 276, y: 96 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="7" />
    <CourseArrow :from="{ x: 288, y: 118 }" :to="{ x: 236, y: 140 }" stroke="var(--c-danger)" :stroke-width="2" :head-size="7" />
    <CourseArrow :from="{ x: 166, y: 148 }" :to="{ x: 112, y: 118 }" stroke="var(--c-physics)" :stroke-width="2" :head-size="7" />
    <text x="210" y="206" fill="var(--c-text-mute)" font-size="11" font-family="sans-serif" text-anchor="middle">分子在不停地做无规则运动</text>
  </svg>
</template>
