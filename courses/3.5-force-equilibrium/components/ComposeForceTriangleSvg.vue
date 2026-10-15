<template>
  <!-- 第 9 页：几何法：三个力首尾相接成一个闭合的矢量三角形 -->
  <svg viewBox="0 0 250 170" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 26, y: 134 }" :to="{ x: 146, y: 134 }" :head-size="10" stroke="var(--c-accent)" stroke-width="3" />
    <CourseArrow :from="{ x: 146, y: 134 }" :to="{ x: 214, y: 56 }" :head-size="10" stroke="var(--c-physics)" stroke-width="3" />
    <CourseArrow :from="{ x: 214, y: 56 }" :to="{ x: 26, y: 134 }" :head-size="10" stroke="var(--c-force)" stroke-width="3" />
    <text x="78" y="152" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="87" y="155" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="188" y="92" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="197" y="95" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="104" y="90" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="113" y="93" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic" font-size="10">3</text>
  </svg>
</template>
