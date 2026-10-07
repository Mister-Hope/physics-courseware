<template>
  <!-- 第 3 页：地球吸引物体，物体也吸引地球——万有引力同样是相互的 -->
  <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 两球心连心虚线 -->
    <line x1="54" y1="65" x2="158" y2="65" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.65" />

    <!-- ==================== 1. 左侧：极简经纬线地球（cx=54, cy=65, r=32） ==================== -->
    <g fill="none">
      <!-- 地球主体轮廓 -->
      <circle cx="54" cy="65" r="32" fill="rgba(96,165,250,0.16)" stroke="#60a5fa" stroke-width="2.4" />
      <!-- 极简经纬线（体现天体球面几何感，不画繁琐大陆云层） -->
      <ellipse cx="54" cy="65" rx="14" ry="32" stroke="rgba(96,165,250,0.35)" stroke-width="1.3" />
      <path d="M 24 53 Q 54 60 84 53 M 24 77 Q 54 70 84 77" stroke="rgba(96,165,250,0.32)" stroke-width="1.2" />
    </g>

    <!-- ==================== 2. 右侧：被吸引的物体/小天体（cx=158, cy=65, r=14） ==================== -->
    <circle cx="158" cy="65" r="14" fill="rgba(226,168,70,0.18)" stroke="#e2a846" stroke-width="2.2" />

    <!-- ==================== 3. 等大反向的万有引力矢量（长均为 42px） ==================== -->
    <CourseArrow :from="{ x: 54, y: 65 }" :to="{ x: 96, y: 65 }" stroke="#60a5fa" stroke-width="3.2" />
    <CourseArrow :from="{ x: 158, y: 65 }" :to="{ x: 116, y: 65 }" stroke="#e2a846" stroke-width="3.2" />

    <!-- 两球心质点标记 -->
    <circle cx="54" cy="65" r="3.2" fill="#60a5fa" stroke="#0f1425" stroke-width="1.2" />
    <circle cx="158" cy="65" r="3.2" fill="#e2a846" stroke="#0f1425" stroke-width="1.2" />
  </svg>
</template>
