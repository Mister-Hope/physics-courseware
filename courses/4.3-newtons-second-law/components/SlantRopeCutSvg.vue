<template>
  <!-- 第 26 页：斜吊摆绳剪断 —— 小球被斜轻绳吊住、另受水平向左的拉力，斜绳在中点被剪断 -->
  <svg viewBox="0 0 380 320" width="100%" style="max-width: 400px" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="30" x2="330" y2="30" stroke="#94a3b8" stroke-width="3" />
    <line x1="70" y1="30" x2="56" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="130" y1="30" x2="116" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="190" y1="30" x2="176" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="250" y1="30" x2="236" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="310" y1="30" x2="296" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="210" y1="30" x2="150" y2="220" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="210" y1="30" x2="210" y2="190" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 5" />
    <path d="M 210 100 A 70 70 0 0 1 188.9 96.8" fill="none" stroke="#94a3b8" stroke-width="1.4" />
    <text
      x="197"
      y="110"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      fill="#94a3b8"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      θ
    </text>
    <line x1="172" y1="117" x2="188" y2="133" stroke="#f87171" stroke-width="2.6" />
    <line x1="188" y1="117" x2="172" y2="133" stroke="#f87171" stroke-width="2.6" />
    <CourseArrow :from="{ x: 132, y: 220 }" :to="{ x: 66, y: 220 }" stroke="#e2a846" :stroke-width="3" />
    <text x="93" y="207" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#e2a846">F</text>
    <text x="102" y="210" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="#e2a846">T</text>
    <circle cx="150" cy="220" r="18" fill="rgba(30,41,59,0.85)" stroke="#60a5fa" stroke-width="2.2" />
    <text x="150" y="225" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="#f1f5f9">m</text>
  </svg>
</template>
