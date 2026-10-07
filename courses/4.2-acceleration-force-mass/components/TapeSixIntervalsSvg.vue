<template>
  <!-- 第 10 页：纸带上连续 6 段位移 x1…x6，相邻两段间隔为一个 T -->
  <svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg">
    <rect x="34" y="40" width="572" height="34" rx="6" fill="rgba(148,163,184,0.14)" stroke="rgba(148,163,184,0.3)" stroke-width="1.2" />
    <line x1="48" y1="57" x2="592" y2="57" stroke="rgba(148,163,184,0.4)" stroke-width="1" />
    <circle cx="48" cy="57" r="4" fill="#e2a846" />
    <circle cx="138.7" cy="57" r="4" fill="#e2a846" />
    <circle cx="229.3" cy="57" r="4" fill="#e2a846" />
    <circle cx="320" cy="57" r="4" fill="#e2a846" />
    <circle cx="410.7" cy="57" r="4" fill="#e2a846" />
    <circle cx="501.3" cy="57" r="4" fill="#e2a846" />
    <circle cx="592" cy="57" r="4" fill="#e2a846" />
    <text x="93" y="30" font-size="16" fill="#94a3b8" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">1</tspan>
    </text>
    <text x="184" y="30" font-size="16" fill="#94a3b8" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">2</tspan>
    </text>
    <text x="275" y="30" font-size="16" fill="#94a3b8" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">3</tspan>
    </text>
    <text x="365" y="30" font-size="16" fill="#94a3b8" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">4</tspan>
    </text>
    <text x="456" y="30" font-size="16" fill="#94a3b8" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">5</tspan>
    </text>
    <text x="547" y="30" font-size="16" fill="#94a3b8" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">6</tspan>
    </text>
    <line x1="48" y1="92" x2="138.7" y2="92" stroke="#60a5fa" stroke-width="1.4" />
    <line x1="48" y1="87" x2="48" y2="97" stroke="#60a5fa" stroke-width="1.4" />
    <line x1="138.7" y1="87" x2="138.7" y2="97" stroke="#60a5fa" stroke-width="1.4" />
    <text x="93" y="116" font-size="16" fill="#60a5fa" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">T</tspan>
    </text>
  </svg>
</template>
