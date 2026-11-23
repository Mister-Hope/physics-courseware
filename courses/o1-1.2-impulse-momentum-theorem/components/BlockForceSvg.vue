<!-- 第 5 页：光滑水平面上的物块受恒力 F，初速度 v；用于从牛顿第二定律推导动量定理。 -->
<template>
  <svg viewBox="0 0 360 200" width="360" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 20, y: 160 }" :to="{ x: 340, y: 160 }" side="below" />
    <rect x="130" y="100" width="64" height="60" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-border-glow)" stroke-width="1.6" />
    <CourseArrow :from="{ x: 162, y: 130 }" :to="{ x: 262, y: 130 }" stroke="var(--c-accent)" :stroke-width="2.6" label="F" :label-dy="-14" />
    <CourseArrow :from="{ x: 126, y: 72 }" :to="{ x: 206, y: 72 }" stroke="var(--c-physics)" :stroke-width="2.4" label="v" :label-dy="-10" />
  </svg>
</template>
