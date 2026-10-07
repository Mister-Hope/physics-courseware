<template>
  <!-- 第 15 页：正六边形 OABCDE 与从 O 出发的五个位移矢量 -->
  <svg viewBox="0 0 300 250" width="100%" style="max-width: 19rem" xmlns="http://www.w3.org/2000/svg">
    <polygon points="34,130 79,52 169,52 214,130 169,208 79,208" fill="rgba(148,163,184,0.06)" stroke="#94a3b8" stroke-width="1.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79.32, y: 52.11 }" stroke="#e2a846" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 169, y: 52 }" stroke="#e2a846" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 214, y: 130 }" stroke="#e2a846" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 169, y: 208 }" stroke="#e2a846" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79, y: 208 }" stroke="#e2a846" stroke-width="2.4" />
    <circle cx="34" cy="130" r="3.6" fill="#e2a846" />
    <g fill="#94a3b8">
      <circle cx="79" cy="52" r="3" />
      <circle cx="169" cy="52" r="3" />
      <circle cx="214" cy="130" r="3" />
      <circle cx="169" cy="208" r="3" />
      <circle cx="79" cy="208" r="3" />
    </g>
    <g font-size="14" font-family="KaTeX_Math" font-style="italic" fill="#e2e8f0">
      <text x="60" y="44">A</text>
      <text x="176" y="44">B</text>
      <text x="220" y="134">C</text>
      <text x="176" y="224">D</text>
      <text x="58" y="224">E</text>
      <text x="10" y="146">O</text>
    </g>
    <text x="150" y="243" text-anchor="middle" font-size="12" fill="#94a3b8">边长 1 m，外接圆半径也是 1 m</text>
  </svg>
</template>
