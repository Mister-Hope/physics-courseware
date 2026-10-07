<template>
  <!-- 第 2 页：北京到重庆的三条不同路径与同一条位移矢量 -->
  <svg viewBox="0 0 300 190" width="100%" style="max-width: 21rem" xmlns="http://www.w3.org/2000/svg">
    <path d="M 40 158 C 92 146 120 116 246 54" fill="none" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.55" />
    <path d="M 40 158 C 104 56 168 150 246 54" fill="none" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.55" />
    <path d="M 40 158 C 132 174 206 102 246 54" fill="none" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.55" />
    <CourseArrow :from="{ x: 40, y: 158 }" :to="{ x: 252.07, y: 52.02 }" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <circle cx="40" cy="158" r="4" fill="#e2a846" />
    <circle cx="252" cy="52" r="4" fill="#e2a846" />
    <text x="10" y="180" font-size="13" fill="#e2a846">北京</text>
    <text x="252" y="42" font-size="13" fill="#e2a846">重庆</text>
    <text x="112" y="146" font-size="12" fill="#94a3b8">不同的路程</text>
    <text x="76" y="78" font-size="13" fill="#e2a846">
      位移
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
    </text>
  </svg>
</template>
