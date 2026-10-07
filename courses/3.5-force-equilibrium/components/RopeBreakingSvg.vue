<template>
  <!-- 第 24 页：悬绳 OC 上的 A 点被水平力牵引：OA 段拉力 T、水平拉力 F 与竖直向下的重力 G -->
  <svg viewBox="0 0 340 270" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="30" x2="300" y2="30" stroke="#94a3b8" stroke-width="3" />
    <line x1="90" y1="30" x2="76" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="140" y1="30" x2="126" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="190" y1="30" x2="176" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="240" y1="30" x2="226" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="170" y1="40" x2="248" y2="144" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="248" y1="144" x2="248" y2="200" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="248" y1="144" x2="330" y2="144" stroke="#94a3b8" stroke-width="2.2" />
    <rect x="223" y="200" width="50" height="32" rx="6" fill="rgba(96,165,250,0.16)" stroke="#60a5fa" stroke-width="2" />
    <path d="M 248 189 A 45 45 0 0 0 221 108" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" />
    <text x="212" y="104" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="16">θ</text>
    <circle cx="170" cy="40" r="4" fill="#f1f5f9" />
    <circle cx="248" cy="144" r="5" fill="#f1f5f9" />
    <g v-click="1">
      <CourseArrow :from="{ x: 248, y: 144 }" :to="{ x: 209, y: 92 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <CourseArrow :from="{ x: 248, y: 144 }" :to="{ x: 298, y: 144 }" :head-size="10" stroke="#e2a846" stroke-width="3" />
      <CourseArrow :from="{ x: 248, y: 144 }" :to="{ x: 248, y: 189 }" :head-size="10" stroke="#f87171" stroke-width="3" />
      <text x="192" y="88" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">T</text>
      <text x="292" y="136" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="256" y="186" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
      <text x="154" y="34" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">O</text>
      <text x="230" y="166" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">A</text>
    </g>
  </svg>
</template>
