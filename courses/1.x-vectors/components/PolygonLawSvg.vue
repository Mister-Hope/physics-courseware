<template>
  <!-- 第 13 页：多边形法则：多个矢量依次首尾相接，起点直连最后一个终点 -->
  <svg viewBox="0 0 170 120" width="100%" style="max-width: 12rem" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20,96 60,48 106,70 136,32" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4 3" opacity="0.7" />
    <line x1="20" y1="96" x2="60" y2="48" stroke="#e2a846" stroke-width="2.6" />
    <line x1="60" y1="48" x2="106" y2="70" stroke="#60a5fa" stroke-width="2.6" />
    <line x1="106" y1="70" x2="136" y2="32" stroke="#2dd4bf" stroke-width="2.6" />
    <CourseArrow :from="{ x: 20, y: 96 }" :to="{ x: 135.98, y: 31.98 }" :head-size="10" stroke="#f59e0b" stroke-width="3.2" />
    <circle cx="20" cy="96" r="3.4" fill="#e2a846" />
    <circle cx="136" cy="32" r="3.4" fill="#2dd4bf" />
    <text x="82" y="92" font-size="12" fill="#f59e0b">合矢量</text>
  </svg>
</template>
