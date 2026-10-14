<template>
  <!-- 第 9 页右图：纸带上从第 0 点一次量到底（量出 x₁~x₄），误差范围一定 -->
  <svg viewBox="0 4 320 114" width="100%" class="figure" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 纸带左右两端均渐隐（左侧舍去开头密集点迹，右侧继续延伸未画全） -->
      <linearGradient id="tape-fill-right" x1="12" y1="0" x2="306" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text-dim)" stop-opacity="0.015" />
        <stop offset="14%" stop-color="var(--c-text-dim)" stop-opacity="0.11" />
        <stop offset="84%" stop-color="var(--c-text-dim)" stop-opacity="0.11" />
        <stop offset="100%" stop-color="var(--c-text-dim)" stop-opacity="0.015" />
      </linearGradient>
      <linearGradient id="tape-stroke-right" x1="12" y1="0" x2="306" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text-dim)" stop-opacity="0.06" />
        <stop offset="14%" stop-color="var(--c-text-dim)" stop-opacity="0.38" />
        <stop offset="84%" stop-color="var(--c-text-dim)" stop-opacity="0.36" />
        <stop offset="100%" stop-color="var(--c-text-dim)" stop-opacity="0.06" />
      </linearGradient>
    </defs>
    <!-- 纸带主体（y = 10 ~ 50）：左右两端均为锯齿撕裂形状 + 透明度渐隐 -->
    <path
      d="M 16 10 L 298 10 L 292 17 L 300 24 L 291 30 L 299 37 L 292 44 L 298 50 L 16 50 L 22 44 L 14 37 L 23 30 L 15 24 L 22 17 Z"
      fill="url(#tape-fill-right)"
      stroke="url(#tape-stroke-right)"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- 左右两侧撕裂断口双层虚影线 -->
    <path
      d="M 10 10 L 16 17 L 8 24 L 17 30 L 9 37 L 16 44 L 10 50 M 304 10 L 298 17 L 306 24 L 297 30 L 305 37 L 298 44 L 304 50"
      fill="none"
      stroke="rgba(148,163,184,0.16)"
      stroke-width="1.1"
      stroke-dasharray="2.5 2.5"
      stroke-linejoin="round"
    />
    <!-- 计数点编号 0 ~ 4（最左侧清晰起点统一记为第 0 点） -->
    <g font-family="KaTeX_Main" font-size="10.5" fill="var(--c-text-dim)" text-anchor="middle" opacity="0.88">
      <text x="48" y="25" font-weight="700" fill="#cbd5e1">0</text>
      <text x="86" y="25">1</text>
      <text x="134" y="25">2</text>
      <text x="194" y="25">3</text>
      <text x="264" y="25">4</text>
    </g>
    <!-- 第 0 点左侧：开头密集且渐隐的舍去点迹 -->
    <g fill="var(--c-text-dim)">
      <circle cx="20" cy="37" r="1.3" opacity="0.12" />
      <circle cx="23.5" cy="37" r="1.4" opacity="0.18" />
      <circle cx="27.5" cy="37" r="1.5" opacity="0.24" />
      <circle cx="32.5" cy="37" r="1.6" opacity="0.3" />
      <circle cx="39" cy="37" r="1.7" opacity="0.36" />
    </g>
    <!-- 两个计数点之间的微弱计时器过渡点迹 -->
    <g fill="var(--c-text-dim)" opacity="0.28">
      <circle cx="55.6" cy="37" r="1.1" />
      <circle cx="63.2" cy="37" r="1.1" />
      <circle cx="70.8" cy="37" r="1.1" />
      <circle cx="78.4" cy="37" r="1.1" />
      <circle cx="95.6" cy="37" r="1.1" />
      <circle cx="105.2" cy="37" r="1.1" />
      <circle cx="114.8" cy="37" r="1.1" />
      <circle cx="124.4" cy="37" r="1.1" />
      <circle cx="146" cy="37" r="1.1" />
      <circle cx="158" cy="37" r="1.1" />
      <circle cx="170" cy="37" r="1.1" />
      <circle cx="182" cy="37" r="1.1" />
      <circle cx="208" cy="37" r="1.1" />
      <circle cx="222" cy="37" r="1.1" />
      <circle cx="236" cy="37" r="1.1" />
      <circle cx="250" cy="37" r="1.1" />
      <circle cx="279" cy="37" r="1.1" opacity="0.6" />
      <circle cx="293" cy="37" r="1.1" opacity="0.28" />
    </g>
    <!-- 纸带上的精细计数点 0 ~ 4 -->
    <g fill="rgba(226,232,240,0.2)">
      <circle cx="48" cy="37" r="4.2" />
      <circle cx="86" cy="37" r="4.2" />
      <circle cx="134" cy="37" r="4.2" />
      <circle cx="194" cy="37" r="4.2" />
      <circle cx="264" cy="37" r="4.2" />
    </g>
    <g fill="#e2e8f0">
      <circle cx="48" cy="37" r="2.5" />
      <circle cx="86" cy="37" r="2.5" />
      <circle cx="134" cy="37" r="2.5" />
      <circle cx="194" cy="37" r="2.5" />
      <circle cx="264" cy="37" r="2.5" />
    </g>
    <!-- 从起点 0 及各计数点 1~4 向下引出的对齐虚线（紧贴纸带，直达对应测量线） -->
    <g stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="3 2.5" opacity="0.65">
      <line x1="48" y1="41" x2="48" y2="108" />
      <line x1="86" y1="41" x2="86" y2="66" />
      <line x1="134" y1="41" x2="134" y2="79" />
      <line x1="194" y1="41" x2="194" y2="92" />
      <line x1="264" y1="41" x2="264" y2="105" />
    </g>
    <!-- 从起点 0 一次量到各点的双向箭头线段（x₁~x₄ 紧贴纸带下方，层间距收紧为 13 px：y = 62, 75, 88, 101） -->
    <g stroke="var(--c-accent)" stroke-width="1.9" stroke-linecap="round">
      <line x1="53.5" y1="62" x2="80.5" y2="62" />
      <line x1="53.5" y1="75" x2="128.5" y2="75" />
      <line x1="53.5" y1="88" x2="188.5" y2="88" />
      <line x1="53.5" y1="101" x2="258.5" y2="101" />
    </g>
    <g fill="var(--c-accent)">
      <!-- x₁ 两侧箭头 (48 ↔ 86) -->
      <path d="M 48.5 62 L 55.2 58.6 L 55.2 65.4 Z" />
      <path d="M 85.5 62 L 78.8 58.6 L 78.8 65.4 Z" />
      <!-- x₂ 两侧箭头 (48 ↔ 134) -->
      <path d="M 48.5 75 L 55.2 71.6 L 55.2 78.4 Z" />
      <path d="M 133.5 75 L 126.8 71.6 L 126.8 78.4 Z" />
      <!-- x₃ 两侧箭头 (48 ↔ 194) -->
      <path d="M 48.5 88 L 55.2 84.6 L 55.2 91.4 Z" />
      <path d="M 193.5 88 L 186.8 84.6 L 186.8 91.4 Z" />
      <!-- x₄ 两侧箭头 (48 ↔ 264) -->
      <path d="M 48.5 101 L 55.2 97.6 L 55.2 104.4 Z" />
      <path d="M 263.5 101 L 256.8 97.6 L 256.8 104.4 Z" />
    </g>
    <!-- x₁ ~ x₄ 标注 -->
    <g font-size="13.5" fill="var(--c-accent)" text-anchor="start">
      <text x="91" y="65.5">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">1</tspan>
      </text>
      <text x="139" y="78.5">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">2</tspan>
      </text>
      <text x="199" y="91.5">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">3</tspan>
      </text>
      <text x="269" y="104.5">
        <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">4</tspan>
      </text>
    </g>
  </svg>
</template>
