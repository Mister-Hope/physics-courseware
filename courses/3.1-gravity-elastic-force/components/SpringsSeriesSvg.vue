<template>
  <!-- 第 24 页：两根弹簧串联，整体相当于一根更软的弹簧 -->
  <svg class="fig" viewBox="0 0 300 260" style="max-width: 10rem" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 80, y: 20 }" :to="{ x: 220, y: 20 }" side="above" :thickness="12" :gap="40" color="#cbd5e1" :line-width="4" />
    <path
      d="M 150 20 L 150 32 L 138 40 L 162 52 L 138 64 L 162 76 L 138 88 L 150 96 L 150 108"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.8"
      stroke-linecap="round"
    />
    <path
      d="M 150 108 L 150 120 L 138 128 L 162 140 L 138 152 L 162 164 L 138 176 L 150 184 L 150 196"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.8"
      stroke-linecap="round"
    />
    <text x="168" y="60" font-size="17" fill="#94a3b8">
      <tspan font-family="KaTeX_Math" font-style="italic">k</tspan>
      <tspan font-family="KaTeX_Main" dy="4" font-size="12">1</tspan>
    </text>
    <text x="168" y="150" font-size="17" fill="#94a3b8">
      <tspan font-family="KaTeX_Math" font-style="italic">k</tspan>
      <tspan font-family="KaTeX_Main" dy="4" font-size="12">2</tspan>
    </text>
    <CourseArrow :from="{ x: 150, y: 196 }" :to="{ x: 150, y: 238 }" stroke="#e2a846" stroke-width="3.2" />
    <text x="162" y="226" font-size="17" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
    </text>
    <text x="150" y="256" text-anchor="middle" font-size="17" fill="#94a3b8">串联</text>
  </svg>
</template>
