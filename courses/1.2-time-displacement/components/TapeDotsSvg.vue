<template>
  <!-- 第 18 页：纸带上打出的五个点（间隔越来越大），并量出第 5 个点到起点的位移 -->
  <svg viewBox="0 12 1000 112" width="100%" class="plot-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 纸带向右渐隐（配合右侧锯齿撕裂断口，体现纸带尚未显示全） -->
      <linearGradient id="tape-five-fill" x1="40" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.11" />
        <stop offset="84%" stop-color="#94a3b8" stop-opacity="0.11" />
        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.015" />
      </linearGradient>
      <linearGradient id="tape-five-stroke" x1="40" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.38" />
        <stop offset="84%" stop-color="#94a3b8" stop-opacity="0.34" />
        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.06" />
      </linearGradient>
    </defs>

    <!-- 点的序号（时刻要靠数点自己算）-->
    <text x="40" y="27" text-anchor="start" font-size="12" fill="#64748b">点的序号</text>
    <g font-family="KaTeX_Main" font-size="13" fill="#94a3b8" text-anchor="middle">
      <text x="90" y="27" font-weight="700" fill="#60a5fa">1</text>
      <text x="230" y="27">2</text>
      <text x="390" y="27">3</text>
      <text x="570" y="27">4</text>
      <text x="770" y="27" font-weight="700" fill="#e2a846">5</text>
    </g>

    <!-- 纸带主体：左端圆角，右端锯齿撕裂形状 + 透明度渐隐 -->
    <path
      d="M 48 36 L 948 36 L 940 44 L 950 52 L 939 60 L 949 68 L 941 76 L 948 82 L 48 82 A 8 8 0 0 1 40 74 L 40 44 A 8 8 0 0 1 48 36 Z"
      fill="url(#tape-five-fill)"
      stroke="url(#tape-five-stroke)"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- 右侧撕裂断口双层虚影线 -->
    <path
      d="M 956 36 L 948 44 L 958 52 L 947 60 L 957 68 L 949 76 L 956 82"
      fill="none"
      stroke="rgba(148,163,184,0.18)"
      stroke-width="1.2"
      stroke-dasharray="3 3"
      stroke-linejoin="round"
    />

    <!-- 打出的墨迹点（缩小半径，外带微弱墨晕；第 5 点后续留有渐隐延续点） -->
    <circle cx="90" cy="59" r="5.2" fill="rgba(96,165,250,0.22)" />
    <circle cx="90" cy="59" r="3" fill="#60a5fa" />

    <g fill="rgba(226,168,70,0.2)">
      <circle cx="230" cy="59" r="5" />
      <circle cx="390" cy="59" r="5" />
      <circle cx="570" cy="59" r="5" />
      <circle cx="770" cy="59" r="5.4" />
    </g>
    <g fill="#e2a846">
      <circle cx="230" cy="59" r="2.9" />
      <circle cx="390" cy="59" r="2.9" />
      <circle cx="570" cy="59" r="2.9" />
      <circle cx="770" cy="59" r="3.1" />
    </g>
    <!-- 第 5 点右侧未标号的后续渐隐点迹（呼应纸带未显示全） -->
    <circle cx="905" cy="59" r="2.4" fill="#94a3b8" opacity="0.22" />

    <!-- 第 5 个点的重点标记外环 -->
    <circle cx="770" cy="59" r="9.5" fill="none" stroke="#e2a846" stroke-width="1.7" opacity="0.9" />

    <!-- 从第 1 点与第 5 点中心直接向下引出的对齐虚线与端线（靠近纸带） -->
    <line x1="90" y1="65" x2="90" y2="108" stroke="#60a5fa" stroke-width="1.35" stroke-dasharray="4 3" opacity="0.8" />
    <line x1="770" y1="69" x2="770" y2="108" stroke="#e2a846" stroke-width="1.35" stroke-dasharray="4 3" opacity="0.8" />
    <line x1="90" y1="101" x2="90" y2="115" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round" />
    <line x1="770" y1="101" x2="770" y2="115" stroke="#e2a846" stroke-width="1.8" stroke-linecap="round" />

    <!-- 起点 1 到第 5 点的双向测量箭头（紧贴纸带下方 y = 108） -->
    <line x1="99" y1="108" x2="761" y2="108" stroke="#e2a846" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 90.8 108 L 100.5 103.2 L 100.5 112.8 Z" fill="#e2a846" />
    <path d="M 769.2 108 L 759.5 103.2 L 759.5 112.8 Z" fill="#e2a846" />

    <text x="430" y="99" text-anchor="middle" font-size="13" font-weight="700" fill="#e2a846" stroke="#0f1425" stroke-width="3.5" paint-order="stroke">
      量出第 5 个点到起点的距离 → 这段位移
    </text>
  </svg>
</template>
