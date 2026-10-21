<script setup lang="ts">
/** 第 6 页：同一电荷从 A 到 B 的三条不同路径（直线、折线、曲线），静电力做功都相同。 */
</script>

<template>
  <svg viewBox="0 0 360 300" width="360" height="300">
    <line x1="16" y1="60" x2="344" y2="60" stroke="var(--c-field)" stroke-width="1.6" opacity="0.35" />
    <line x1="16" y1="150" x2="344" y2="150" stroke="var(--c-field)" stroke-width="1.6" opacity="0.35" />
    <line x1="16" y1="240" x2="344" y2="240" stroke="var(--c-field)" stroke-width="1.6" opacity="0.35" />
    <CourseArrow :from="{ x: 250, y: 60 }" :to="{ x: 306, y: 60 }" stroke="var(--c-field)" stroke-width="1.6" opacity="0.8" />
    <CourseArrow :from="{ x: 250, y: 150 }" :to="{ x: 306, y: 150 }" stroke="var(--c-field)" stroke-width="1.6" opacity="0.8" />
    <CourseArrow :from="{ x: 250, y: 240 }" :to="{ x: 306, y: 240 }" stroke="var(--c-field)" stroke-width="1.6" opacity="0.8" />
    <circle cx="52" cy="150" r="5.5" fill="var(--c-neutral-200)" />
    <text x="52" y="128" text-anchor="middle" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">A</text>
    <circle cx="318" cy="150" r="5.5" fill="var(--c-neutral-200)" />
    <text x="318" y="128" text-anchor="middle" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">B</text>
    <CourseArrow :from="{ x: 52, y: 150 }" :to="{ x: 318, y: 150 }" stroke="var(--c-accent-2)" stroke-width="2.2" stroke-dasharray="8 5" />
    <CourseArrow :from="{ x: 52, y: 150 }" :to="{ x: 185, y: 84 }" stroke="var(--c-physics)" stroke-width="2.2" stroke-dasharray="8 5" />
    <CourseArrow :from="{ x: 185, y: 84 }" :to="{ x: 318, y: 150 }" stroke="var(--c-physics)" stroke-width="2.2" stroke-dasharray="8 5" />
    <path d="M 52 150 Q 185 258 318 150" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="8 5" opacity="0.9" />
    <text x="185" y="66" text-anchor="middle" fill="var(--c-physics)" font-size="15">②</text>
    <text x="185" y="132" text-anchor="middle" fill="var(--c-accent-2)" font-size="15">①</text>
    <text x="185" y="256" text-anchor="middle" fill="var(--c-accent)" font-size="15">③</text>
  </svg>
</template>
