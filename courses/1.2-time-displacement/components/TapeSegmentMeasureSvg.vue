<template>
  <!-- 第 19 页左图：纸带上逐段测量（每相邻两点单独量 l₁~l₄），误差会累积 -->
  <svg viewBox="0 0 320 165" width="100%" class="plot-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 纸带与点 -->
    <rect x="20" y="20" width="280" height="52" rx="9" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.28)" stroke-width="1.5" />
    <circle cx="40" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="80" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="130" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="190" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="260" cy="46" r="6" fill="#cbd5e1" />
    <!-- 逐段量：段与段之间单独测量（红色）-->
    <g stroke="#f87171" stroke-width="1.8">
      <line x1="40" y1="96" x2="40" y2="118" />
      <line x1="80" y1="96" x2="80" y2="118" />
      <line x1="130" y1="96" x2="130" y2="118" />
      <line x1="190" y1="96" x2="190" y2="118" />
      <line x1="260" y1="96" x2="260" y2="118" />
    </g>
    <g stroke="#f87171" stroke-width="2.4">
      <line x1="40" y1="107" x2="80" y2="107" />
      <line x1="80" y1="107" x2="130" y2="107" />
      <line x1="130" y1="107" x2="190" y2="107" />
      <line x1="190" y1="107" x2="260" y2="107" />
    </g>
    <g font-size="15" fill="#f87171" text-anchor="middle">
      <text x="60" y="145">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">1</tspan>
      </text>
      <text x="105" y="145">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">2</tspan>
      </text>
      <text x="160" y="145">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">3</tspan>
      </text>
      <text x="225" y="145">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">4</tspan>
      </text>
    </g>
  </svg>
</template>
