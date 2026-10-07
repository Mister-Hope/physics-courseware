<template>
  <!-- 第 17 页：力的三角形 F1F2F3 与几何三角形 L1L2L3 相似，对应边成比例 -->
  <svg viewBox="0 0 340 190" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow :from="{ x: 30, y: 150 }" :to="{ x: 140, y: 150 }" :head-size="9" stroke="#e2a846" stroke-width="2.8" />
    <CourseArrow :from="{ x: 140, y: 150 }" :to="{ x: 78, y: 64 }" :head-size="9" stroke="#2dd4bf" stroke-width="2.8" />
    <CourseArrow :from="{ x: 78, y: 64 }" :to="{ x: 30, y: 150 }" :head-size="9" stroke="#f87171" stroke-width="2.8" />
    <text x="70" y="168" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="79" y="171" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="118" y="102" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="127" y="105" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="26" y="102" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="35" y="105" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="10">3</text>
    <text x="164" y="118" fill="#94a3b8" font-size="15">相似</text>
    <line x1="210" y1="150" x2="320" y2="150" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="320" y1="150" x2="248" y2="64" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="248" y1="64" x2="210" y2="150" stroke="#94a3b8" stroke-width="2.2" />
    <text x="256" y="168" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">L</text>
    <text x="265" y="171" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="292" y="102" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">L</text>
    <text x="301" y="105" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="212" y="102" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">L</text>
    <text x="221" y="105" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="10">3</text>
  </svg>
</template>
