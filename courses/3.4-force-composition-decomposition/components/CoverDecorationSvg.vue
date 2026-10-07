<template>
  <!-- 第 1 页：封面装饰——两个分力与合力构成的平行四边形 -->
  <svg viewBox="0 0 220 160" width="320" xmlns="http://www.w3.org/2000/svg">
    <polygon points="28,134 122,134 152,60 58,60" fill="rgba(226,168,70,0.07)" stroke="none" />
    <line x1="122" y1="134" x2="152" y2="60" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 4" opacity="0.7" />
    <line x1="58" y1="60" x2="152" y2="60" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 4" opacity="0.7" />
    <CourseArrow :from="{ x: 28, y: 134 }" :to="{ x: 122, y: 134 }" stroke="#e2a846" stroke-width="2.8" />
    <CourseArrow :from="{ x: 28, y: 134 }" :to="{ x: 58, y: 60 }" stroke="#60a5fa" stroke-width="2.8" />
    <CourseArrow :from="{ x: 28, y: 134 }" :to="{ x: 152, y: 60 }" stroke="#2dd4bf" stroke-width="3.2" />
    <circle cx="28" cy="134" r="3" fill="currentColor" opacity="0.75" />
  </svg>
</template>
