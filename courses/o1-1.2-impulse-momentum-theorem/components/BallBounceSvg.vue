<!-- 第 9 页：钢球撞墙前后速度反向；只画速度，不画受力。 -->
<template>
  <svg viewBox="0 0 520 170" width="520" xmlns="http://www.w3.org/2000/svg">
    <rect x="256" y="18" width="10" height="134" rx="3" fill="var(--c-neutral-500)" stroke="var(--c-border)" stroke-width="1.4" />
    <circle cx="150" cy="85" r="18" fill="var(--c-accent-2)" stroke="var(--c-border-glow)" stroke-width="1.5" />
    <circle cx="390" cy="85" r="18" fill="var(--c-accent-2)" stroke="var(--c-border-glow)" stroke-width="1.5" />
    <CourseArrow :from="{ x: 174, y: 85 }" :to="{ x: 240, y: 85 }" stroke="var(--c-physics)" :stroke-width="2.4" label="v" :label-dy="-10" />
    <CourseArrow :from="{ x: 366, y: 85 }" :to="{ x: 300, y: 85 }" stroke="var(--c-physics)" :stroke-width="2.4" label="v'" :label-dy="16" />
    <path d="M 168 67 C 204 34 232 44 252 72" fill="none" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.55" />
    <path d="M 372 103 C 336 136 308 126 288 98" fill="none" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.55" />
  </svg>
</template>
