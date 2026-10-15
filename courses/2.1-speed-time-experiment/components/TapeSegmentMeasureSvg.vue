<template>
  <!-- 第 9 页左图：纸带上逐段测量（每相邻两点单独量 l₁~l₄），误差会累积 -->
  <svg viewBox="0 4 320 114" width="100%" class="figure" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 纸带左右两端均渐隐（左侧舍去开头密集点迹，右侧继续延伸未画全） -->
      <linearGradient id="tape-fill-left" x1="12" y1="0" x2="306" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text-dim)" stop-opacity="0.015" />
        <stop offset="14%" stop-color="var(--c-text-dim)" stop-opacity="0.11" />
        <stop offset="84%" stop-color="var(--c-text-dim)" stop-opacity="0.11" />
        <stop offset="100%" stop-color="var(--c-text-dim)" stop-opacity="0.015" />
      </linearGradient>
      <linearGradient id="tape-stroke-left" x1="12" y1="0" x2="306" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text-dim)" stop-opacity="0.06" />
        <stop offset="14%" stop-color="var(--c-text-dim)" stop-opacity="0.38" />
        <stop offset="84%" stop-color="var(--c-text-dim)" stop-opacity="0.36" />
        <stop offset="100%" stop-color="var(--c-text-dim)" stop-opacity="0.06" />
      </linearGradient>
    </defs>
    <!-- 纸带主体（y = 10 ~ 50）：左右两端均为锯齿撕裂形状 + 透明度渐隐 -->
    <path
      d="M 16 10 L 298 10 L 292 17 L 300 24 L 291 30 L 299 37 L 292 44 L 298 50 L 16 50 L 22 44 L 14 37 L 23 30 L 15 24 L 22 17 Z"
      fill="url(#tape-fill-left)"
      stroke="url(#tape-stroke-left)"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- 左右两侧撕裂断口双层虚影线 -->
    <path
      d="M 10 10 L 16 17 L 8 24 L 17 30 L 9 37 L 16 44 L 10 50 M 304 10 L 298 17 L 306 24 L 297 30 L 305 37 L 298 44 L 304 50"
      fill="none"
      stroke="color-mix(in srgb, var(--c-text-dim) 16%, transparent)"
      stroke-width="1.1"
      stroke-dasharray="2.5 2.5"
      stroke-linejoin="round"
    />
    <!-- 计数点编号 0 ~ 4（最左侧清晰起点统一记为第 0 点） -->
    <g font-family="KaTeX_Main" font-size="10.5" fill="var(--c-text-dim)" text-anchor="middle" opacity="0.88">
      <text x="48" y="25" font-weight="700" fill="var(--c-neutral-300)">0</text>
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
    <g fill="color-mix(in srgb, var(--c-neutral-200) 20%, transparent)">
      <circle cx="48" cy="37" r="4.2" />
      <circle cx="86" cy="37" r="4.2" />
      <circle cx="134" cy="37" r="4.2" />
      <circle cx="194" cy="37" r="4.2" />
      <circle cx="264" cy="37" r="4.2" />
    </g>
    <g fill="var(--c-neutral-200)">
      <circle cx="48" cy="37" r="2.5" />
      <circle cx="86" cy="37" r="2.5" />
      <circle cx="134" cy="37" r="2.5" />
      <circle cx="194" cy="37" r="2.5" />
      <circle cx="264" cy="37" r="2.5" />
    </g>
    <!-- 从各计数点向下引出的短对齐虚线（紧贴纸带下沿 y=50） -->
    <g stroke="var(--c-danger)" stroke-width="1.2" stroke-dasharray="3 2.5" opacity="0.65">
      <line x1="48" y1="41" x2="48" y2="58" />
      <line x1="86" y1="41" x2="86" y2="58" />
      <line x1="134" y1="41" x2="134" y2="58" />
      <line x1="194" y1="41" x2="194" y2="58" />
      <line x1="264" y1="41" x2="264" y2="58" />
    </g>
    <!-- 逐段测量分界端线（紧贴纸带下方 y = 58 ~ 70） -->
    <g stroke="var(--c-danger)" stroke-width="1.6" stroke-linecap="round">
      <line x1="48" y1="58" x2="48" y2="70" />
      <line x1="86" y1="58" x2="86" y2="70" />
      <line x1="134" y1="58" x2="134" y2="70" />
      <line x1="194" y1="58" x2="194" y2="70" />
      <line x1="264" y1="58" x2="264" y2="70" />
    </g>
    <!-- 逐段测量双向箭头（紧贴纸带下方 y = 64） -->
    <g stroke="var(--c-danger)" stroke-width="1.9" stroke-linecap="round">
      <line x1="53.5" y1="64" x2="80.5" y2="64" />
      <line x1="91.5" y1="64" x2="128.5" y2="64" />
      <line x1="139.5" y1="64" x2="188.5" y2="64" />
      <line x1="199.5" y1="64" x2="258.5" y2="64" />
    </g>
    <g fill="var(--c-danger)">
      <!-- l₁ 两侧箭头 (48 ↔ 86) -->
      <path d="M 48.8 64 L 55.5 60.5 L 55.5 67.5 Z" />
      <path d="M 85.2 64 L 78.5 60.5 L 78.5 67.5 Z" />
      <!-- l₂ 两侧箭头 (86 ↔ 134) -->
      <path d="M 86.8 64 L 93.5 60.5 L 93.5 67.5 Z" />
      <path d="M 133.2 64 L 126.5 60.5 L 126.5 67.5 Z" />
      <!-- l₃ 两侧箭头 (134 ↔ 194) -->
      <path d="M 134.8 64 L 141.5 60.5 L 141.5 67.5 Z" />
      <path d="M 193.2 64 L 186.5 60.5 L 186.5 67.5 Z" />
      <!-- l₄ 两侧箭头 (194 ↔ 264) -->
      <path d="M 194.8 64 L 201.5 60.5 L 201.5 67.5 Z" />
      <path d="M 263.2 64 L 256.5 60.5 L 256.5 67.5 Z" />
    </g>
    <!-- 各段测量值标注 l₁ ~ l₄（紧随箭头下方 y = 84） -->
    <g font-size="14" fill="var(--c-danger)" text-anchor="middle">
      <text x="67" y="84">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">1</tspan>
      </text>
      <text x="110" y="84">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">2</tspan>
      </text>
      <text x="164" y="84">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">3</tspan>
      </text>
      <text x="229" y="84">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan>
        <tspan font-family="KaTeX_Main" font-size="10.5" dy="2.5">4</tspan>
      </text>
    </g>
  </svg>
</template>
