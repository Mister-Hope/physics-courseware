<template>
  <!-- 第 16 页：把 OB、OD 平移到 E、A 后分别与 OE、OA 配对成 OC -->
  <svg viewBox="0 0 300 245" width="100%" style="max-width: 14.5rem" xmlns="http://www.w3.org/2000/svg">
    <polygon points="34,130 79,52 169,52 214,130 169,208 79,208" fill="rgba(148,163,184,0.05)" stroke="#94a3b8" stroke-width="1.2" opacity="0.8" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79, y: 52 }" stroke="#2dd4bf" stroke-width="2.8" />
    <CourseArrow :from="{ x: 79, y: 208 }" :to="{ x: 214, y: 130 }" stroke="#60a5fa" stroke-width="2.8" stroke-dasharray="8 4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79, y: 208 }" stroke="#2dd4bf" stroke-width="2.8" />
    <CourseArrow :from="{ x: 79, y: 52 }" :to="{ x: 214, y: 130 }" stroke="#e2a846" stroke-width="2.8" stroke-dasharray="8 4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 214, y: 130 }" stroke="#f59e0b" stroke-width="3.8" />
    <circle cx="34" cy="130" r="3.6" fill="#f59e0b" />
    <g font-size="14" font-family="KaTeX_Math" font-style="italic" fill="#e2e8f0">
      <text x="60" y="44">A</text>
      <text x="176" y="44">B</text>
      <text x="220" y="134">C</text>
      <text x="176" y="224">D</text>
      <text x="58" y="224">E</text>
      <text x="10" y="146">O</text>
    </g>
    <text x="84" y="114" font-size="12" fill="#60a5fa">OB = EC</text>
    <text x="74" y="182" font-size="12" fill="#e2a846">OD = AC</text>
    <text x="150" y="240" text-anchor="middle" font-size="12" fill="#f59e0b">三个 OC → 6 m</text>
  </svg>
</template>
