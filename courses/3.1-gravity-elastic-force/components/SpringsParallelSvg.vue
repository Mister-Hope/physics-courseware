<template>
  <!-- 第 24 页：两根弹簧并联，整体相当于一根更硬的弹簧 -->
  <svg class="fig" viewBox="0 0 300 260" style="max-width: 10rem" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 40, y: 20 }" :to="{ x: 260, y: 20 }" side="above" :thickness="12" :gap="40" color="#cbd5e1" :line-width="4" />
    <path
      d="M 96 20 L 96 32 L 84 40 L 108 52 L 84 64 L 108 76 L 84 88 L 96 96 L 96 110"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.8"
      stroke-linecap="round"
    />
    <path
      d="M 204 20 L 204 32 L 192 40 L 216 52 L 192 64 L 216 76 L 192 88 L 204 96 L 204 110"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.8"
      stroke-linecap="round"
    />
    <text x="62" y="60" font-size="17" fill="#94a3b8">
      <tspan font-family="KaTeX_Math" font-style="italic">k</tspan>
      <tspan font-family="KaTeX_Main" dy="4" font-size="12">1</tspan>
    </text>
    <text x="226" y="60" font-size="17" fill="#94a3b8">
      <tspan font-family="KaTeX_Math" font-style="italic">k</tspan>
      <tspan font-family="KaTeX_Main" dy="4" font-size="12">2</tspan>
    </text>
    <rect x="70" y="110" width="160" height="14" rx="4" fill="rgba(148,163,184,0.25)" stroke="#cbd5e1" stroke-width="2" />
    <CourseArrow :from="{ x: 150, y: 124 }" :to="{ x: 150, y: 196 }" stroke="#e2a846" stroke-width="3.2" />
    <text x="162" y="172" font-size="17" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
    </text>
    <text x="150" y="232" text-anchor="middle" font-size="17" fill="#94a3b8">并联</text>
  </svg>
</template>
