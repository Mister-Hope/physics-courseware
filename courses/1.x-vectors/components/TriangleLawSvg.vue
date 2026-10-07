<template>
  <!-- 第 13 页：三角形法则：首尾相接，第一个的起点指向最后一个的终点 -->
  <svg viewBox="0 0 170 120" width="100%" style="max-width: 12rem" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="100" x2="100" y2="100" stroke="#e2a846" stroke-width="2.8" />
    <line x1="100" y1="100" x2="136" y2="30" stroke="#60a5fa" stroke-width="2.8" />
    <CourseArrow :from="{ x: 20, y: 100 }" :to="{ x: 136, y: 30 }" :head-size="10" stroke="#2dd4bf" stroke-width="3.2" />
    <circle cx="20" cy="100" r="3.4" fill="#e2a846" />
    <circle cx="100" cy="100" r="3.4" fill="#60a5fa" />
    <circle cx="136" cy="30" r="3.4" fill="#2dd4bf" />
    <text x="50" y="116" font-size="13" fill="#e2a846">首</text>
    <text x="126" y="74" font-size="13" fill="#60a5fa">尾</text>
    <text x="30" y="56" font-size="12" fill="#2dd4bf">起点 → 终点</text>
  </svg>
</template>
