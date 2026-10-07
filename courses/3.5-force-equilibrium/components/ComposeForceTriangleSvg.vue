<template>
  <!-- 第 9 页：几何法：三个力首尾相接成一个闭合的矢量三角形 -->
  <svg viewBox="0 0 250 170" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 26, y: 134 }" :to="{ x: 146, y: 134 }" :head-size="10" stroke="#e2a846" stroke-width="3" />
    <CourseArrow :from="{ x: 146, y: 134 }" :to="{ x: 214, y: 56 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
    <CourseArrow :from="{ x: 214, y: 56 }" :to="{ x: 26, y: 134 }" :head-size="10" stroke="#f87171" stroke-width="3" />
    <text x="78" y="152" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="87" y="155" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="188" y="92" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="197" y="95" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="104" y="90" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="113" y="93" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="10">3</text>
  </svg>
</template>
