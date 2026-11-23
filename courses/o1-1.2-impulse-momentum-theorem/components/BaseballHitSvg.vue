<!-- 第 10 页：垒球飞来、被球棒击后反向飞出；只画两个速度方向。 -->
<template>
  <svg viewBox="0 0 400 170" width="400" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-18 350 95)">
      <rect x="338" y="30" width="16" height="132" rx="8" fill="var(--c-neutral-500)" stroke="var(--c-border)" stroke-width="1.4" />
      <rect x="332" y="150" width="28" height="8" rx="4" fill="var(--c-neutral-700)" />
    </g>
    <circle cx="250" cy="88" r="16" fill="var(--c-accent-2)" stroke="var(--c-border-glow)" stroke-width="1.5" />
    <CourseArrow :from="{ x: 108, y: 60 }" :to="{ x: 212, y: 60 }" stroke="var(--c-physics)" :stroke-width="2.4" label="v" :label-dy="-10" />
    <CourseArrow :from="{ x: 232, y: 118 }" :to="{ x: 138, y: 118 }" stroke="var(--c-accent)" :stroke-width="2.4" label="v'" :label-dy="16" />
    <path d="M 216 60 C 236 54 244 64 252 74" fill="none" stroke="var(--c-physics)" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.5" />
  </svg>
</template>
