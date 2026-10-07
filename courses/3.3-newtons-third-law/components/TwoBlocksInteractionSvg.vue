<template>
  <!-- 第 16 页：A、B 两物体相互挤压——F 与 F′ 分别作用在两个物体上 -->
  <svg viewBox="0 0 900 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="200" y1="192" x2="700" y2="192" stroke="#94a3b8" stroke-width="3" opacity="0.25" stroke-linecap="round" />
    <rect x="290" y="60" width="160" height="100" rx="14" fill="none" stroke="#e2a846" stroke-width="3" />
    <rect x="450" y="60" width="160" height="100" rx="14" fill="none" stroke="#60a5fa" stroke-width="3" />
    <text x="370" y="46" fill="#e2a846" font-size="22" text-anchor="middle">A</text>
    <text x="530" y="46" fill="#60a5fa" font-size="22" text-anchor="middle">B</text>
    <CourseArrow :from="{ x: 450, y: 110 }" :to="{ x: 596, y: 110 }" stroke="#60a5fa" stroke-width="4" />
    <text
      x="523"
      y="94"
      fill="#60a5fa"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="22"
      text-anchor="middle"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      F
    </text>
    <CourseArrow :from="{ x: 450, y: 110 }" :to="{ x: 304, y: 110 }" stroke="#e2a846" stroke-width="4" />
    <text
      x="377"
      y="140"
      fill="#e2a846"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="22"
      text-anchor="middle"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      F'
    </text>
  </svg>
</template>
