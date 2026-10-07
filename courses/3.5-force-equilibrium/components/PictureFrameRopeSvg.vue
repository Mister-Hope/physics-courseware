<template>
  <!-- 第 25 页：画框用轻绳对称悬挂在两挂钉上：两段绳的张力 T、绳与竖直方向的夹角 θ 与重力 G -->
  <svg viewBox="0 0 340 230" xmlns="http://www.w3.org/2000/svg">
    <line x1="170" y1="60" x2="83.4" y2="110" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="170" y1="60" x2="256.6" y2="110" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="170" y1="30" x2="170" y2="60" stroke="#94a3b8" stroke-width="2.2" />
    <circle cx="170" cy="60" r="5" fill="#e2a846" />
    <line x1="170" y1="60" x2="170" y2="120" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <rect x="63" y="110" width="214" height="80" rx="6" fill="rgba(96,165,250,0.14)" stroke="#60a5fa" stroke-width="2.2" />
    <circle cx="83.4" cy="110" r="4" fill="#60a5fa" />
    <circle cx="256.6" cy="110" r="4" fill="#60a5fa" />
    <path d="M 170 115 A 55 55 0 0 0 142.5 107.6" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" />
    <text x="132" y="104" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="16">θ</text>
    <g v-click="1">
      <CourseArrow :from="{ x: 170, y: 150 }" :to="{ x: 170, y: 200 }" :head-size="10" stroke="#f87171" stroke-width="3" />
      <CourseArrow :from="{ x: 170, y: 150 }" :to="{ x: 209, y: 127.5 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <CourseArrow :from="{ x: 170, y: 150 }" :to="{ x: 131, y: 127.5 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <text x="178" y="196" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
      <text x="214" y="124" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">T</text>
      <text x="112" y="124" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">T</text>
      <text x="150" y="86" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="14">0.5 m</text>
    </g>
  </svg>
</template>
