<template>
  <!-- 第 23 页：长梯斜靠光滑墙、下端放在粗糙地面：重力 G、墙的弹力 F_N 与地面反力（作用线过交点 P） -->
  <svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="20" width="20" height="240" fill="rgba(148,163,184,0.18)" />
    <line x1="60" y1="20" x2="60" y2="260" stroke="#94a3b8" stroke-width="2.4" />
    <line x1="40" y1="70" x2="26" y2="56" stroke="#64748b" stroke-width="1.6" />
    <line x1="40" y1="130" x2="26" y2="116" stroke="#64748b" stroke-width="1.6" />
    <line x1="40" y1="190" x2="26" y2="176" stroke="#64748b" stroke-width="1.6" />
    <line x1="30" y1="260" x2="330" y2="260" stroke="#64748b" stroke-width="2.4" />
    <line x1="60" y1="120" x2="170" y2="260" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
    <line x1="115" y1="190" x2="115" y2="120" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <line x1="60" y1="120" x2="115" y2="120" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <line x1="170" y1="260" x2="115" y2="120" stroke="#c084fc" stroke-width="1.6" stroke-dasharray="7 5" opacity="0.85" />
    <circle cx="115" cy="120" r="4" fill="#c084fc" />
    <g v-click="1">
      <CourseArrow :from="{ x: 115, y: 190 }" :to="{ x: 115, y: 245 }" :head-size="10" stroke="#f87171" stroke-width="3" />
      <CourseArrow :from="{ x: 60, y: 120 }" :to="{ x: 105, y: 120 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <CourseArrow :from="{ x: 170, y: 260 }" :to="{ x: 170, y: 205 }" :head-size="10" stroke="#e2a846" stroke-width="3" />
      <CourseArrow :from="{ x: 170, y: 260 }" :to="{ x: 130, y: 260 }" :head-size="10" stroke="#c084fc" stroke-width="3" />
      <text x="122" y="240" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
      <text x="86" y="112" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="95" y="115" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">N</text>
      <text x="178" y="204" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="189" y="208" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">N</text>
      <text x="112" y="276" fill="#c084fc" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="121" y="279" fill="#c084fc" font-family="KaTeX_Math" font-style="italic" font-size="10">f</text>
      <text x="140" y="252" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="16">θ</text>
    </g>
  </svg>
</template>
