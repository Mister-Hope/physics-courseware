<template>
  <!-- 第 2 页：力的图示——先定标度，再按标度画有向线段 -->
  <svg class="fig" viewBox="0 0 300 218" style="max-width: 14rem" xmlns="http://www.w3.org/2000/svg">
    <rect x="106" y="140" width="64" height="46" rx="6" fill="rgba(148,163,184,0.18)" stroke="#cbd5e1" stroke-width="2.6" />
    <CourseArrow :from="{ x: 138, y: 162 }" :to="{ x: 232, y: 108 }" stroke="#e2a846" stroke-width="3.2" />
    <circle cx="138" cy="162" r="4.5" fill="#e2a846" />
    <line x1="138" y1="162" x2="240" y2="162" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" />
    <line x1="46" y1="190" x2="82" y2="190" stroke="#60a5fa" stroke-width="3.4" />
    <text x="64" y="206" text-anchor="middle" font-size="15" fill="#60a5fa">10 N</text>
    <text x="188" y="158" font-family="KaTeX_Main" font-size="17" fill="#94a3b8">30°</text>
    <text x="222" y="100" text-anchor="middle" font-size="18" fill="#e2a846" stroke="#0f1425" stroke-width="4" paint-order="stroke">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main">= 30 N</tspan>
    </text>
  </svg>
</template>
