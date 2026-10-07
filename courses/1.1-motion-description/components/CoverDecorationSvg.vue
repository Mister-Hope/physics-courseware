<template>
  <!-- 1.1 封面右下角装饰（方案 C·极简浓缩风）：物体忽略形状大小抽象为质点 P(m) 及其在参考系中的运动 -->
  <svg viewBox="0 0 220 150" width="320" xmlns="http://www.w3.org/2000/svg">
    <!-- 参考系纵轴（y）-->
    <line x1="34" y1="118" x2="34" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 31 25 L 34 18 L 37 25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
    <!-- 参考系横轴（x）-->
    <line x1="34" y1="118" x2="206" y2="118" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 201 121 L 208 118 L 201 115" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
    <!-- 刻度：短线紧贴轴、向图内伸出 -->
    <g stroke="currentColor" stroke-width="1.2" opacity="0.6">
      <line x1="78" y1="118" x2="78" y2="112" />
      <line x1="118" y1="118" x2="118" y2="112" />
      <line x1="158" y1="118" x2="158" y2="112" />
      <line x1="198" y1="118" x2="198" y2="112" />
      <line x1="34" y1="94" x2="40" y2="94" />
      <line x1="34" y1="68" x2="40" y2="68" />
      <line x1="34" y1="42" x2="40" y2="42" />
    </g>

    <!-- 原点 O 与坐标轴标签 -->
    <circle cx="34" cy="118" r="3" fill="currentColor" opacity="0.7" />
    <text x="22" y="136" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 12px" fill="#94a3b8" opacity="0.85">O</text>
    <text x="206" y="136" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 15px" fill="#94a3b8">x</text>
    <text x="22" y="20" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 15px" fill="#94a3b8">y</text>

    <!-- 空间运动轨迹虚线（呼应 1.2 的贝塞尔曲线弧度） -->
    <path
      d="M 46 102 C 62 72 78 48 104 56 C 126 62 142 82 168 38"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.4"
      stroke-dasharray="5 3.5"
      stroke-linecap="round"
    />

    <!-- 起点处：具有形状和大小的实际物体轮廓（虚线圆角块） -->
    <rect
      x="38"
      y="93"
      width="18"
      height="14"
      rx="4"
      transform="rotate(-24 47 100)"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-dasharray="3 2"
      opacity="0.55"
    />
    <circle cx="47" cy="100" r="2.8" fill="#e2a846" opacity="0.7" />

    <!-- 终点处：忽略形状大小浓缩为质点 P(x, y)，并向参考系两轴作垂线定位 -->
    <g stroke="currentColor" stroke-width="1.1" stroke-dasharray="3 3" opacity="0.42">
      <line x1="168" y1="38" x2="168" y2="118" />
      <line x1="34" y1="38" x2="168" y2="38" />
    </g>
    <circle cx="168" cy="38" r="11" fill="none" stroke="currentColor" stroke-width="1.1" stroke-dasharray="2.5 2.5" opacity="0.4" />
    <circle cx="168" cy="38" r="4.2" fill="#e2a846" />
    <text x="184" y="42" text-anchor="start" font-family="KaTeX_Math" font-style="italic" style="font-size: 14px" fill="#e2a846">P</text>

    <!-- 图注（底部居中）-->
    <text x="110" y="149" text-anchor="middle" style="font-size: 11px" fill="#94a3b8" opacity="0.75">质点的抽象与参考系定位</text>
  </svg>
</template>
