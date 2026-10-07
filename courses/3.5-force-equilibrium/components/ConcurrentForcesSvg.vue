<template>
  <!-- 第 3 页：三个力的作用线都交于同一点 O 的共点力示意 -->
  <svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg">
    <line x1="196" y1="156" x2="64" y2="34" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <line x1="46" y1="128" x2="214" y2="62" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <line x1="130" y1="18" x2="130" y2="160" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <CourseArrow :from="{ x: 130, y: 95 }" :to="{ x: 88, y: 54 }" :head-size="9" stroke="#e2a846" stroke-width="2.8" />
    <CourseArrow :from="{ x: 130, y: 95 }" :to="{ x: 189, y: 72 }" :head-size="9" stroke="#2dd4bf" stroke-width="2.8" />
    <CourseArrow :from="{ x: 130, y: 95 }" :to="{ x: 130, y: 150 }" :head-size="9" stroke="#f87171" stroke-width="2.8" />
    <circle cx="130" cy="95" r="4" fill="#94a3b8" />
    <text x="104" y="112" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">O</text>
    <text x="72" y="48" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="81" y="51" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="194" y="66" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="203" y="69" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="138" y="148" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="147" y="151" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="10">3</text>
  </svg>
</template>
