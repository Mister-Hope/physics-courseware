<template>
  <!-- 第 6 页：起点各不相同的若干位移矢量 -->
  <svg viewBox="0 0 260 140" width="100%" style="max-width: 19rem" xmlns="http://www.w3.org/2000/svg">
    <text x="130" y="16" text-anchor="middle" font-size="13" fill="#94a3b8">起点各不相同</text>
    <CourseArrow :from="{ x: 46, y: 52 }" :to="{ x: 88.32, y: 39.75 }" :head-size="9" stroke="#94a3b8" stroke-width="2.2" />
    <CourseArrow :from="{ x: 120, y: 108 }" :to="{ x: 177.45, y: 116.67 }" :head-size="9" stroke="#94a3b8" stroke-width="2.2" />
    <CourseArrow :from="{ x: 196, y: 46 }" :to="{ x: 216.82, y: 93.12 }" :head-size="9" stroke="#94a3b8" stroke-width="2.2" />
    <CourseArrow :from="{ x: 70, y: 122 }" :to="{ x: 97.05, y: 92.69 }" :head-size="9" stroke="#94a3b8" stroke-width="2.2" />
    <g fill="#94a3b8">
      <circle cx="46" cy="52" r="3" />
      <circle cx="120" cy="108" r="3" />
      <circle cx="196" cy="46" r="3" />
      <circle cx="70" cy="122" r="3" />
    </g>
  </svg>
</template>
