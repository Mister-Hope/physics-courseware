<template>
  <!-- 第 10 页：同起点的两个矢量补成平行四边形，对角线即 a + b -->
  <svg viewBox="0 0 300 200" width="100%" style="max-width: 19rem" xmlns="http://www.w3.org/2000/svg">
    <polygon points="40,165 190,165 240,65 90,65" fill="rgba(226,168,70,0.06)" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 4" />
    <CourseArrow :from="{ x: 40, y: 165 }" :to="{ x: 190, y: 165 }" stroke="#e2a846" stroke-width="3.2" />
    <CourseArrow :from="{ x: 40, y: 165 }" :to="{ x: 90, y: 65 }" stroke="#60a5fa" stroke-width="3.2" />
    <line x1="190" y1="165" x2="240" y2="65" stroke="#60a5fa" stroke-width="2.2" stroke-dasharray="7 4" opacity="0.8" />
    <line x1="90" y1="65" x2="240" y2="65" stroke="#e2a846" stroke-width="2.2" stroke-dasharray="7 4" opacity="0.8" />
    <CourseArrow :from="{ x: 40, y: 165 }" :to="{ x: 240, y: 65 }" stroke="#2dd4bf" stroke-width="3.6" />
    <text x="104" y="188" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">a</text>
    <text x="38" y="126" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="#60a5fa">b</text>
    <text x="110" y="100" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="#2dd4bf" stroke="#0f1425" stroke-width="3" paint-order="stroke">
      a + b
    </text>
    <text x="20" y="188" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="#94a3b8">O</text>
  </svg>
</template>
