<!-- 第 7 页：自然光在水面反射，反射光和折射光都是偏振光 -->
<template>
  <svg viewBox="0 0 660 236" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="60" y1="150" x2="608" y2="150" stroke="#8b98b8" stroke-width="1.8" opacity="0.75" />
    <g stroke="#2dd4bf" stroke-width="1.4" opacity="0.32" fill="none">
      <path d="M 96 164 q 10 -8 20 0 t 20 0" />
      <path d="M 300 164 q 10 -8 20 0 t 20 0" />
      <path d="M 500 164 q 10 -8 20 0 t 20 0" />
    </g>
    <line x1="330" y1="34" x2="330" y2="224" stroke="#8b98b8" stroke-width="1.1" stroke-dasharray="6 6" opacity="0.5" />
    <CourseArrow :from="{ x: 196, y: 46 }" :to="{ x: 330, y: 150 }" stroke="#e2a846" :stroke-width="2.6" />
    <CourseArrow :from="{ x: 330, y: 150 }" :to="{ x: 464, y: 46 }" stroke="#60a5fa" :stroke-width="2.6" />
    <CourseArrow :from="{ x: 330, y: 150 }" :to="{ x: 404, y: 226 }" stroke="#60a5fa" :stroke-width="2" stroke-dasharray="7 6" :opacity="0.65" />
    <g stroke="#8b98b8" stroke-width="1.8" opacity="0.9">
      <path d="M 250 88 L 262 70 M 250 88 L 254 96 M 250 88 L 260 92" />
      <path d="M 262 70 L 250 88 M 262 70 L 258 62 M 262 70 L 252 66" />
      <path d="M 236 112 L 256 116 M 236 112 L 241 108 M 236 112 L 241 116" />
      <path d="M 256 116 L 236 112 M 256 116 L 251 120 M 256 116 L 251 112" />
    </g>
    <text x="200" y="34" font-family="KaTeX_Main" font-size="15" fill="#e2a846">自然光</text>
    <g stroke="#60a5fa" stroke-width="2">
      <path d="M 410 96 L 444 96 M 410 96 L 418 91 M 410 96 L 418 101" />
      <path d="M 444 96 L 410 96 M 444 96 L 436 91 M 444 96 L 436 101" />
    </g>
    <text x="452" y="101" font-family="KaTeX_Main" font-size="14" fill="#60a5fa">偏振光</text>
    <text x="300" y="228" text-anchor="end" font-family="KaTeX_Main" font-size="13" fill="#8b98b8">折射光也是偏振光</text>
  </svg>
</template>
