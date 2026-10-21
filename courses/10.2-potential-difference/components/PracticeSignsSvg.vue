<script setup lang="ts">
/** 第 15 页练习三：一条方向向左的电场线，A、B 两点，负电荷由 B 点移到 A 点。 */
</script>

<template>
  <svg viewBox="0 0 360 230" width="300" height="192">
    <line x1="24" y1="90" x2="336" y2="90" stroke="var(--c-field)" stroke-width="1.8" opacity="0.45" />
    <CourseArrow :from="{ x: 240, y: 90 }" :to="{ x: 170, y: 90 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.9" />
    <CourseArrow :from="{ x: 336, y: 90 }" :to="{ x: 266, y: 90 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.9" />
    <text x="24" y="52" fill="var(--c-field)" font-size="16">电场线</text>
    <circle cx="90" cy="90" r="5.5" fill="var(--c-neutral-200)" />
    <text x="90" y="68" text-anchor="middle" fill="var(--c-text-dim)" font-size="19" font-style="italic" font-family="KaTeX_Math">A</text>
    <circle cx="270" cy="90" r="12" fill="var(--c-velocity)" stroke="var(--c-neutral-50)" stroke-width="1.4" />
    <text x="270" y="95" text-anchor="middle" fill="var(--c-neutral-50)" font-size="18" font-weight="700">−</text>
    <text x="270" y="68" text-anchor="middle" fill="var(--c-text-dim)" font-size="19" font-style="italic" font-family="KaTeX_Math">B</text>
    <line x1="270" y1="106" x2="270" y2="150" stroke="var(--c-neutral-500)" stroke-width="1.1" stroke-dasharray="4 4" />
    <line x1="90" y1="106" x2="90" y2="150" stroke="var(--c-neutral-500)" stroke-width="1.1" stroke-dasharray="4 4" />
    <CourseArrow :from="{ x: 270, y: 150 }" :to="{ x: 104, y: 150 }" stroke="var(--c-velocity)" stroke-width="2.2" stroke-dasharray="7 5" />
    <text x="182" y="174" text-anchor="middle" fill="var(--c-text-dim)" font-size="16">移动方向</text>
  </svg>
</template>
