<template>
  <!-- 第 2 页：图甲：水平木棒两端各受斜向上的力 F1、F2，连同重力 G 平衡；三力作用线交于 O（点击 1 出虚线） -->
  <svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg">
    <g v-click="1">
      <line x1="22" y1="100" x2="84" y2="25" stroke="#64748b" stroke-width="1.1" stroke-dasharray="5 4" opacity="0.75" />
      <line x1="128" y1="100" x2="66" y2="25" stroke="#64748b" stroke-width="1.1" stroke-dasharray="5 4" opacity="0.75" />
      <line x1="75" y1="100" x2="75" y2="22" stroke="#64748b" stroke-width="1.1" stroke-dasharray="5 4" opacity="0.75" />
      <circle cx="75" cy="36" r="3" fill="#94a3b8" />
      <text x="56" y="32" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="14">O</text>
    </g>
    <rect x="18" y="96" width="114" height="9" rx="4" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" stroke-width="1.4" />
    <CourseArrow :from="{ x: 75, y: 100 }" :to="{ x: 75, y: 132 }" :head-size="9" stroke="#f87171" stroke-width="2.6" />
    <CourseArrow :from="{ x: 22, y: 100 }" :to="{ x: 53.9, y: 61.5 }" :head-size="9" stroke="#e2a846" stroke-width="2.6" />
    <CourseArrow :from="{ x: 128, y: 100 }" :to="{ x: 96.2, y: 61.5 }" :head-size="9" stroke="#2dd4bf" stroke-width="2.6" />
    <text x="34" y="58" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="43" y="61" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="102" y="58" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="111" y="61" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="82" y="130" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="14">G</text>
  </svg>
</template>
