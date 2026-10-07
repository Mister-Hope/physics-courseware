<template>
  <!-- 第 2 页：图乙：水平木棒两端各受竖直向上的力 F1、F2，连同重力 G 保持平衡 -->
  <svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="96" width="114" height="9" rx="4" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" stroke-width="1.4" />
    <CourseArrow :from="{ x: 22, y: 100 }" :to="{ x: 22, y: 52 }" :head-size="9" stroke="#e2a846" stroke-width="2.6" />
    <CourseArrow :from="{ x: 128, y: 100 }" :to="{ x: 128, y: 52 }" :head-size="9" stroke="#2dd4bf" stroke-width="2.6" />
    <CourseArrow :from="{ x: 75, y: 100 }" :to="{ x: 75, y: 132 }" :head-size="9" stroke="#f87171" stroke-width="2.6" />
    <text x="28" y="46" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="37" y="49" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="134" y="46" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="143" y="49" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="82" y="130" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="14">G</text>
  </svg>
</template>
