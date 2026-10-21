<script setup lang="ts">
/** 封面右下角装饰（10.2 电势差）：两条竖直虚线等势面、水平电场线，以及分处两条等势面上的 A、B 两点——本课的两个主角（电势差与等势面）。颜色跟随封面 currentColor，等势面用青/金强调色。 */
</script>

<template>
  <svg viewBox="0 0 200 140" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="56" y1="18" x2="56" y2="122" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="6 5" opacity="0.8" />
    <line x1="144" y1="18" x2="144" y2="122" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="6 5" opacity="0.8" />
    <CourseArrow :from="{ x: 26, y: 44 }" :to="{ x: 174, y: 44 }" stroke="currentColor" stroke-width="1.6" opacity="0.5" />
    <CourseArrow :from="{ x: 26, y: 70 }" :to="{ x: 174, y: 70 }" stroke="currentColor" stroke-width="1.6" opacity="0.5" />
    <CourseArrow :from="{ x: 26, y: 96 }" :to="{ x: 174, y: 96 }" stroke="currentColor" stroke-width="1.6" opacity="0.5" />
    <circle cx="56" cy="70" r="4.2" fill="var(--c-physics)" />
    <circle cx="144" cy="70" r="4.2" fill="var(--c-accent)" />
  </svg>
</template>
