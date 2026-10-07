<template>
  <!-- 第 11 页：甲、乙两车同向运动：甲以 v0 匀速、乙由静止起步，相距 d -->
  <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">
    <line x1="16" y1="150" x2="304" y2="150" stroke="#94a3b8" stroke-width="1.4" opacity="0.4" />
    <rect x="34" y="112" width="52" height="30" rx="6" fill="#e2a846" opacity="0.85" />
    <text x="60" y="133" font-size="16" font-family="KaTeX_Main" fill="#0b1020" text-anchor="middle">甲</text>
    <CourseArrow :from="{ x: 88, y: 127 }" :to="{ x: 138, y: 127 }" stroke="#e2a846" stroke-width="2.6" />
    <text x="112" y="106" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="#e2a846" text-anchor="middle">
      v
      <tspan font-size="11" font-family="KaTeX_Main" font-style="normal" dy="3">0</tspan>
    </text>
    <rect x="182" y="112" width="52" height="30" rx="6" fill="#60a5fa" opacity="0.85" />
    <text x="208" y="133" font-size="16" font-family="KaTeX_Main" fill="#0b1020" text-anchor="middle">乙</text>
    <line x1="86" y1="164" x2="182" y2="164" stroke="#94a3b8" stroke-width="1.2" opacity="0.7" />
    <line x1="86" y1="158" x2="86" y2="170" stroke="#94a3b8" stroke-width="1.6" opacity="0.85" />
    <line x1="182" y1="158" x2="182" y2="170" stroke="#94a3b8" stroke-width="1.6" opacity="0.85" />
    <text x="134" y="184" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#94a3b8" text-anchor="middle">d</text>
    <text x="208" y="100" font-size="14" fill="#94a3b8" text-anchor="middle">由静止起步</text>
  </svg>
</template>
