<template>
  <!-- 第 1 页：封面右下角的装饰：三个首尾相接的力矢量组成的闭合三角形 -->
  <svg viewBox="0 0 220 160" width="300" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 60, y: 22 }" :to="{ x: 60, y: 122 }" :head-size="10" stroke="#f87171" stroke-width="2.8" opacity="0.85" />
    <CourseArrow :from="{ x: 60, y: 122 }" :to="{ x: 178, y: 122 }" :head-size="10" stroke="#e2a846" stroke-width="2.8" opacity="0.85" />
    <CourseArrow :from="{ x: 178, y: 122 }" :to="{ x: 60, y: 22 }" :head-size="10" stroke="#2dd4bf" stroke-width="2.8" opacity="0.85" />
    <circle cx="60" cy="22" r="4" fill="#f87171" />
    <circle cx="60" cy="122" r="4" fill="#e2a846" />
    <circle cx="178" cy="122" r="4" fill="#2dd4bf" />
  </svg>
</template>
