<template>
  <!-- 第 25 页：挡板突变 —— 光滑斜面上的小球被竖直挡板挡住，挡板用虚线表示即将撤去（红色箭头标撤去方向） -->
  <svg viewBox="0 0 380 270" width="100%" style="max-width: 400px" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 60, y: 220 }" :to="{ x: 345, y: 220 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <SurfaceHatch :from="{ x: 60, y: 220 }" :to="{ x: 345, y: 95 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <line x1="345" y1="95" x2="345" y2="220" stroke="#64748b" stroke-width="2" />
    <path d="M 115 220 A 55 55 0 0 0 110.4 197.9" fill="none" stroke="#94a3b8" stroke-width="1.4" />
    <text
      x="96"
      y="213"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      fill="#94a3b8"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      θ
    </text>
    <circle cx="205" cy="128" r="26" fill="rgba(30,41,59,0.85)" stroke="#60a5fa" stroke-width="2.4" />
    <text x="205" y="134" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#f1f5f9">m</text>
    <line x1="179" y1="120" x2="179" y2="168" stroke="#94a3b8" stroke-width="2.6" stroke-dasharray="7 5" />
    <CourseArrow :from="{ x: 133, y: 150 }" :to="{ x: 172, y: 150 }" stroke="#f87171" :stroke-width="3" />
    <text x="152" y="138" text-anchor="middle" font-size="13" fill="#f87171">撤去</text>
  </svg>
</template>
