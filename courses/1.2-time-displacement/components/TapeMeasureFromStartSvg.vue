<template>
  <!-- 第 19 页右图：纸带上从起点一次量到底（量出 x₁~x₄），误差范围一定 -->
  <svg viewBox="0 0 320 165" width="100%" class="plot-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 纸带与点（同左）-->
    <rect x="20" y="20" width="280" height="52" rx="9" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.28)" stroke-width="1.5" />
    <circle cx="40" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="80" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="130" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="190" cy="46" r="6" fill="#cbd5e1" />
    <circle cx="260" cy="46" r="6" fill="#cbd5e1" />
    <!-- 从起点一次量到每个点（金色）-->
    <line x1="40" y1="82" x2="40" y2="156" stroke="#e2a846" stroke-width="1.4" stroke-dasharray="5 4" />
    <g stroke="#e2a846" stroke-width="2.4" stroke-linecap="round">
      <line x1="40" y1="88" x2="71" y2="88" />
      <line x1="40" y1="108" x2="121" y2="108" />
      <line x1="40" y1="128" x2="181" y2="128" />
      <line x1="40" y1="148" x2="251" y2="148" />
    </g>
    <g fill="#e2a846">
      <path d="M 80 88 L 70 82.5 L 70 93.5 z" />
      <path d="M 130 108 L 120 102.5 L 120 113.5 z" />
      <path d="M 190 128 L 180 122.5 L 180 133.5 z" />
      <path d="M 260 148 L 250 142.5 L 250 153.5 z" />
    </g>
    <g font-size="14" fill="#e2a846" text-anchor="start">
      <text x="87" y="93">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">1</tspan>
      </text>
      <text x="137" y="113">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">2</tspan>
      </text>
      <text x="197" y="133">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">3</tspan>
      </text>
      <text x="267" y="153">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">4</tspan>
      </text>
    </g>
  </svg>
</template>
