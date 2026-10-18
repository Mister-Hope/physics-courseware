<script setup lang="ts">
/** 封面右下角装饰（10.3 电势差与电场强度的关系）：一对平行金属板、板间三条电场线箭头、 两条竖直虚线等势线——本课的两个主角（电场线与等势线）。颜色跟随封面 currentColor，等势线用强调金。 */
</script>

<template>
  <svg viewBox="0 0 200 140" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="16" y="22" width="7" height="96" rx="3" fill="currentColor" opacity="0.55" />
    <rect x="177" y="22" width="7" height="96" rx="3" fill="currentColor" opacity="0.55" />
    <CourseArrow :from="{ x: 32, y: 44 }" :to="{ x: 168, y: 44 }" stroke="currentColor" stroke-width="1.8" opacity="0.5" />
    <CourseArrow :from="{ x: 32, y: 70 }" :to="{ x: 168, y: 70 }" stroke="currentColor" stroke-width="1.8" opacity="0.5" />
    <CourseArrow :from="{ x: 32, y: 96 }" :to="{ x: 168, y: 96 }" stroke="currentColor" stroke-width="1.8" opacity="0.5" />
    <line x1="74" y1="18" x2="74" y2="122" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="6 5" opacity="0.8" />
    <line x1="124" y1="18" x2="124" y2="122" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="6 5" opacity="0.8" />
  </svg>
</template>
