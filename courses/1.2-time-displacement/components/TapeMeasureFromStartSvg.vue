<template>
  <!-- 第 19 页右图：纸带上从起点一次量到底（量出 x₁~x₄），误差范围一定 -->
  <svg viewBox="0 0 320 165" width="100%" class="plot-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 纸带向右渐隐（配合右侧锯齿撕裂边，体现纸带向右继续延伸未画全） -->
      <linearGradient id="tape-fill-right" x1="20" y1="0" x2="304" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.11" />
        <stop offset="82%" stop-color="#94a3b8" stop-opacity="0.11" />
        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.02" />
      </linearGradient>
      <linearGradient id="tape-stroke-right" x1="20" y1="0" x2="304" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.38" />
        <stop offset="82%" stop-color="#94a3b8" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.08" />
      </linearGradient>
    </defs>

    <!-- 纸带主体：左端圆角、右端锯齿撕裂形状 + 透明度渐隐 -->
    <path
      d="M 27 16 L 298 16 L 292 24 L 300 32 L 291 40 L 299 48 L 292 56 L 298 64 L 27 64 A 7 7 0 0 1 20 57 L 20 23 A 7 7 0 0 1 27 16 Z"
      fill="url(#tape-fill-right)"
      stroke="url(#tape-stroke-right)"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- 右侧撕裂断口双层虚影线 -->
    <path
      d="M 304 16 L 298 24 L 306 32 L 297 40 L 305 48 L 298 56 L 304 64"
      fill="none"
      stroke="rgba(148,163,184,0.18)"
      stroke-width="1.2"
      stroke-dasharray="2.5 2.5"
      stroke-linejoin="round"
    />

    <!-- 计数点编号 0 ~ 4 -->
    <g font-family="KaTeX_Main" font-size="11" fill="#94a3b8" text-anchor="middle" opacity="0.85">
      <text x="40" y="33">0</text>
      <text x="80" y="33">1</text>
      <text x="130" y="33">2</text>
      <text x="190" y="33">3</text>
      <text x="260" y="33">4</text>
    </g>

    <!-- 两个计数点之间的微弱计时器过渡点迹 -->
    <g fill="#94a3b8" opacity="0.28">
      <circle cx="48" cy="46" r="1.1" />
      <circle cx="56" cy="46" r="1.1" />
      <circle cx="64" cy="46" r="1.1" />
      <circle cx="72" cy="46" r="1.1" />

      <circle cx="90" cy="46" r="1.1" />
      <circle cx="100" cy="46" r="1.1" />
      <circle cx="110" cy="46" r="1.1" />
      <circle cx="120" cy="46" r="1.1" />

      <circle cx="142" cy="46" r="1.1" />
      <circle cx="154" cy="46" r="1.1" />
      <circle cx="166" cy="46" r="1.1" />
      <circle cx="178" cy="46" r="1.1" />

      <circle cx="204" cy="46" r="1.1" />
      <circle cx="218" cy="46" r="1.1" />
      <circle cx="232" cy="46" r="1.1" />
      <circle cx="246" cy="46" r="1.1" />

      <circle cx="275" cy="46" r="1.1" opacity="0.6" />
      <circle cx="290" cy="46" r="1.1" opacity="0.3" />
    </g>

    <!-- 纸带上的精细墨迹点（缩小半径，外带微弱墨晕） -->
    <g fill="rgba(226,232,240,0.2)">
      <circle cx="40" cy="46" r="4.4" />
      <circle cx="80" cy="46" r="4.4" />
      <circle cx="130" cy="46" r="4.4" />
      <circle cx="190" cy="46" r="4.4" />
      <circle cx="260" cy="46" r="4.4" />
    </g>
    <g fill="#e2e8f0">
      <circle cx="40" cy="46" r="2.6" />
      <circle cx="80" cy="46" r="2.6" />
      <circle cx="130" cy="46" r="2.6" />
      <circle cx="190" cy="46" r="2.6" />
      <circle cx="260" cy="46" r="2.6" />
    </g>

    <!-- 从起点 0 及各计数点 1~4 向下引出的对齐虚线（靠近纸带，直达对应测量线） -->
    <g stroke="#e2a846" stroke-width="1.25" stroke-dasharray="3.5 3" opacity="0.65">
      <line x1="40" y1="51" x2="40" y2="152" />
      <line x1="80" y1="51" x2="80" y2="87" />
      <line x1="130" y1="51" x2="130" y2="108" />
      <line x1="190" y1="51" x2="190" y2="129" />
      <line x1="260" y1="51" x2="260" y2="150" />
    </g>

    <!-- 从起点 0 一次量到各点的双向箭头线段（x₁~x₄，靠近纸带依次排列） -->
    <g stroke="#e2a846" stroke-width="2" stroke-linecap="round">
      <line x1="45.5" y1="81" x2="74.5" y2="81" />
      <line x1="45.5" y1="102" x2="124.5" y2="102" />
      <line x1="45.5" y1="123" x2="184.5" y2="123" />
      <line x1="45.5" y1="144" x2="254.5" y2="144" />
    </g>
    <g fill="#e2a846">
      <!-- x₁ 两侧箭头 (40 ↔ 80) -->
      <path d="M 40.5 81 L 47.5 77.2 L 47.5 84.8 Z" />
      <path d="M 79.5 81 L 72.5 77.2 L 72.5 84.8 Z" />
      <!-- x₂ 两侧箭头 (40 ↔ 130) -->
      <path d="M 40.5 102 L 47.5 98.2 L 47.5 105.8 Z" />
      <path d="M 129.5 102 L 122.5 98.2 L 122.5 105.8 Z" />
      <!-- x₃ 两侧箭头 (40 ↔ 190) -->
      <path d="M 40.5 123 L 47.5 119.2 L 47.5 126.8 Z" />
      <path d="M 189.5 123 L 182.5 119.2 L 182.5 126.8 Z" />
      <!-- x₄ 两侧箭头 (40 ↔ 260) -->
      <path d="M 40.5 144 L 47.5 140.2 L 47.5 147.8 Z" />
      <path d="M 259.5 144 L 252.5 140.2 L 252.5 147.8 Z" />
    </g>

    <!-- x₁ ~ x₄ 标注 -->
    <g font-size="14" fill="#e2a846" text-anchor="start">
      <text x="86" y="85">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">1</tspan>
      </text>
      <text x="136" y="106">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">2</tspan>
      </text>
      <text x="196" y="127">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">3</tspan>
      </text>
      <text x="266" y="148">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="3">4</tspan>
      </text>
    </g>
  </svg>
</template>
