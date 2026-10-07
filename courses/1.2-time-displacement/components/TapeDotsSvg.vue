<template>
  <!-- 第 18 页：纸带上打出的五个点（间隔越来越大），并量出第 5 个点到起点的位移 -->
  <svg viewBox="0 12 1000 112" width="100%" class="plot-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 点的序号（时刻要靠数点自己算）-->
    <g font-size="12" fill="#94a3b8" text-anchor="middle">
      <text x="90" y="26">1</text>
      <text x="230" y="26">2</text>
      <text x="390" y="26">3</text>
      <text x="570" y="26">4</text>
      <text x="770" y="26" font-weight="700" fill="#e2a846">5</text>
    </g>
    <text x="985" y="26" text-anchor="end" font-size="12" fill="#64748b">点的序号</text>
    <!-- 纸带 -->
    <rect x="40" y="38" width="920" height="48" rx="9" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.28)" stroke-width="1.5" />
    <!-- 打出的点：间隔越来越大 → 运动越来越快 -->
    <circle cx="90" cy="62" r="5" fill="#60a5fa" />
    <circle cx="230" cy="62" r="5" fill="#e2a846" />
    <circle cx="390" cy="62" r="5" fill="#e2a846" />
    <circle cx="570" cy="62" r="5" fill="#e2a846" />
    <circle cx="770" cy="62" r="5" fill="#e2a846" />
    <circle cx="770" cy="62" r="12" fill="none" stroke="#e2a846" stroke-width="2" />
    <!-- 从起点量到第 5 个点的距离 → 这段位移 -->
    <line x1="90" y1="86" x2="90" y2="118" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="4 3" />
    <line x1="770" y1="86" x2="770" y2="118" stroke="#e2a846" stroke-width="1.2" stroke-dasharray="4 3" />
    <line x1="90" y1="112" x2="759" y2="112" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <path d="M 770 112 L 759 106 L 759 118 z" fill="#e2a846" />
    <text x="430" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="#e2a846" stroke="#0f1425" stroke-width="3" paint-order="stroke">
      量出第 5 个点到起点的距离 → 这段位移
    </text>
  </svg>
</template>
