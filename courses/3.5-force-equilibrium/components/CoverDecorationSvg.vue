<template>
  <!-- 第 1 页：封面右下角的装饰：三个首尾相接的力矢量组成的闭合三角形 -->
  <svg viewBox="0 0 220 160" width="300" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 60, y: 22 }" :to="{ x: 60, y: 122 }" :head-size="10" stroke="var(--c-force)" stroke-width="2.8" opacity="0.85" />
    <CourseArrow :from="{ x: 60, y: 122 }" :to="{ x: 178, y: 122 }" :head-size="10" stroke="var(--c-accent)" stroke-width="2.8" opacity="0.85" />
    <CourseArrow :from="{ x: 178, y: 122 }" :to="{ x: 60, y: 22 }" :head-size="10" stroke="var(--c-physics)" stroke-width="2.8" opacity="0.85" />
    <circle cx="60" cy="22" r="4" fill="var(--c-force)" />
    <circle cx="60" cy="122" r="4" fill="var(--c-accent)" />
    <circle cx="178" cy="122" r="4" fill="var(--c-physics)" />
  </svg>
</template>
