<template>
  <!-- 第 29 页：定滑轮上的轻绳，两端拉力都向下且大小相等 -->
  <svg class="fig" viewBox="0 0 300 206" style="max-width: 13rem" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 66, y: 16 }" :to="{ x: 234, y: 16 }" side="above" :thickness="12" :gap="40" :line-width="3" :hatch-width="1.5" />
    <line x1="118" y1="16" x2="150" y2="70" stroke="#64748b" stroke-width="3.6" />
    <line x1="182" y1="16" x2="150" y2="70" stroke="#64748b" stroke-width="3.6" />
    <circle cx="150" cy="70" r="24" fill="none" stroke="#cbd5e1" stroke-width="2.8" />
    <circle cx="150" cy="70" r="4.5" fill="#64748b" />
    <path d="M 126 70 A 24 24 0 0 1 174 70" fill="none" stroke="#e2a846" stroke-width="3" />
    <line x1="126" y1="70" x2="126" y2="138" stroke="#e2a846" stroke-width="3" />
    <line x1="174" y1="70" x2="174" y2="138" stroke="#e2a846" stroke-width="3" />
    <CourseArrow :from="{ x: 126, y: 138 }" :to="{ x: 126, y: 174 }" stroke="#e2a846" stroke-width="3" />
    <CourseArrow :from="{ x: 174, y: 138 }" :to="{ x: 174, y: 174 }" stroke="#e2a846" stroke-width="3" />
    <text x="104" y="166" text-anchor="middle" font-size="17" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" dy="4" font-size="12">T</tspan>
    </text>
    <text x="196" y="166" text-anchor="middle" font-size="17" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" dy="4" font-size="12">T</tspan>
    </text>
    <text x="150" y="198" text-anchor="middle" font-size="15" fill="#94a3b8">定滑轮：两端拉力都向下、大小相等</text>
  </svg>
</template>
