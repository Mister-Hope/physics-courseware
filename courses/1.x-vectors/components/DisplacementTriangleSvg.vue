<template>
  <!-- 第 7 页：先向东 3 m 再向北 4 m，用三角形法则求合位移 -->
  <svg viewBox="0 0 300 200" width="100%" style="max-width: 20rem" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 34, y: 164 }" :to="{ x: 186, y: 164 }" stroke="#2dd4bf" stroke-width="3.2" stroke-linecap="round" />
    <CourseArrow :from="{ x: 186, y: 160 }" :to="{ x: 186, y: 42 }" stroke="#60a5fa" stroke-width="3.2" stroke-linecap="round" />
    <CourseArrow :from="{ x: 34, y: 164 }" :to="{ x: 180.71, y: 48.28 }" stroke="#e2a846" stroke-width="3.6" stroke-linecap="round" />
    <text x="96" y="186" text-anchor="middle" font-size="13" fill="#2dd4bf">先向东 3 m</text>
    <text x="194" y="104" font-size="13" fill="#60a5fa">再向北 4 m</text>
    <text x="62" y="100" font-size="13" fill="#e2a846">合位移 5 m</text>
    <circle cx="34" cy="164" r="4" fill="#e2a846" />
    <circle cx="186" cy="164" r="4" fill="#94a3b8" />
    <text x="14" y="186" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="#94a3b8">O</text>
    <text x="192" y="186" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="#94a3b8">A</text>
    <path d="M 186 150 A 14 14 0 0 1 172 164" fill="none" stroke="#94a3b8" stroke-width="1" opacity="0.7" />
  </svg>
</template>
