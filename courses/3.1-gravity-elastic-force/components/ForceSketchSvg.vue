<template>
  <!-- 第 2 页：力的示意图——只画作用点与方向 -->
  <svg class="fig" viewBox="0 0 300 200" style="max-width: 14rem" xmlns="http://www.w3.org/2000/svg">
    <rect x="118" y="132" width="72" height="54" rx="6" fill="rgba(148,163,184,0.18)" stroke="#cbd5e1" stroke-width="2.6" />
    <CourseArrow :from="{ x: 154, y: 158 }" :to="{ x: 258, y: 98 }" stroke="#e2a846" stroke-width="3.2" />
    <circle cx="154" cy="158" r="4.5" fill="#e2a846" />
    <text x="212" y="112" text-anchor="middle" font-size="18" fill="#e2a846" stroke="#0f1425" stroke-width="4" paint-order="stroke">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main">= 100 N</tspan>
    </text>
  </svg>
</template>
