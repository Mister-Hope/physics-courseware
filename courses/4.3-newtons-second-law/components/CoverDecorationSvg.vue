<template>
  <!-- 第 1 页封面右下角装饰：淡色曲线与虚线基线示意变化趋势，金色合力 F 与蓝色加速度 a 从同一点同向射出（合力与加速度同向） -->
  <svg viewBox="0 0 220 150" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g opacity="0.85">
      <path d="M 22 80 C 58 80 62 22 100 22 C 118 22 126 34 134 42" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity="0.5" />
      <line x1="22" y1="80" x2="134" y2="80" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 6" stroke-linecap="round" opacity="0.32" />
      <circle cx="100" cy="22" r="4" fill="#e2a846" opacity="0.8" />
      <circle cx="134" cy="42" r="4" fill="#60a5fa" opacity="0.8" />
    </g>
    <CourseArrow :from="{ x: 92, y: 92 }" :to="{ x: 206, y: 142 }" stroke="#e2a846" stroke-width="3" opacity="0.9" label="F" :label-dx="-8" :label-dy="18" />
    <CourseArrow
      :from="{ x: 92, y: 92 }"
      :to="{ x: 167, y: 125 }"
      stroke="#60a5fa"
      stroke-width="2.6"
      opacity="0.85"
      label="a"
      :label-dx="14"
      :label-dy="-18"
    />
    <circle cx="92" cy="92" r="3" fill="currentColor" opacity="0.5" />
  </svg>
</template>
