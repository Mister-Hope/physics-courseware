<script setup lang="ts">
/** 封面右下角装饰（10.5 带电粒子在电场中的运动）：左侧加速电场、右侧偏转电场与荧光屏，金色轨迹把两者连起来。 */
</script>

<template>
  <svg viewBox="0 0 200 140" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="14" y="30" width="6" height="76" rx="2" fill="currentColor" opacity="0.5" />
    <rect x="44" y="30" width="6" height="76" rx="2" fill="currentColor" opacity="0.5" />
    <CourseArrow :from="{ x: 42, y: 50 }" :to="{ x: 22, y: 50 }" stroke="currentColor" stroke-width="1.6" opacity="0.4" />
    <CourseArrow :from="{ x: 42, y: 69 }" :to="{ x: 22, y: 69 }" stroke="currentColor" stroke-width="1.6" opacity="0.4" />
    <CourseArrow :from="{ x: 42, y: 88 }" :to="{ x: 22, y: 88 }" stroke="currentColor" stroke-width="1.6" opacity="0.4" />
    <rect x="76" y="46" width="86" height="5" rx="2" fill="currentColor" opacity="0.5" />
    <rect x="76" y="90" width="86" height="5" rx="2" fill="currentColor" opacity="0.5" />
    <CourseArrow :from="{ x: 100, y: 58 }" :to="{ x: 100, y: 84 }" stroke="currentColor" stroke-width="1.6" opacity="0.4" />
    <CourseArrow :from="{ x: 132, y: 58 }" :to="{ x: 132, y: 84 }" stroke="currentColor" stroke-width="1.6" opacity="0.4" />
    <path d="M 22 69 L 76 69 Q 120 69 160 54 L 181 50" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" opacity="0.9" />
    <line x1="186" y1="22" x2="186" y2="116" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <circle cx="181" cy="50" r="3.2" fill="var(--c-accent)" />
  </svg>
</template>
