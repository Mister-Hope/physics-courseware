<template>
  <!-- 第 5 页：三个共点力首尾相接、恰好闭合的矢量三角形（合力为零） -->
  <svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 24, y: 132 }" :to="{ x: 132, y: 132 }" :head-size="10" stroke="#e2a846" stroke-width="3" />
    <CourseArrow :from="{ x: 132, y: 132 }" :to="{ x: 202, y: 52 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
    <CourseArrow :from="{ x: 202, y: 52 }" :to="{ x: 24, y: 132 }" :head-size="10" stroke="#f87171" stroke-width="3" />
    <circle cx="24" cy="132" r="4" fill="#94a3b8" />
    <text x="66" y="150" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="75" y="153" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="176" y="88" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="185" y="91" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="96" y="88" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="105" y="91" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="10">3</text>
  </svg>
</template>
