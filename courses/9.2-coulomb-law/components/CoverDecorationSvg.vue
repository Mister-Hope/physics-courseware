<script setup lang="ts">
/** 封面右下角装饰：两个同种点电荷与沿连线方向的斥力 */
</script>

<template>
  <svg viewBox="0 0 200 140" :width="300" xmlns="http://www.w3.org/2000/svg">
    <circle cx="82" cy="70" r="20" fill="none" stroke="currentColor" stroke-width="2.4" opacity="0.85" />
    <text x="82" y="70" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="currentColor" opacity="0.9">+</text>
    <circle cx="146" cy="70" r="20" fill="none" stroke="currentColor" stroke-width="2.4" opacity="0.6" />
    <text x="146" y="70" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="currentColor" opacity="0.7">+</text>
    <CourseArrow :from="{ x: 78, y: 70 }" :to="{ x: 26, y: 70 }" stroke="currentColor" stroke-width="2.2" opacity="0.55" />
    <CourseArrow :from="{ x: 150, y: 70 }" :to="{ x: 196, y: 70 }" stroke="currentColor" stroke-width="2.2" opacity="0.55" />
  </svg>
</template>
