<template>
  <!-- 第 1 页：封面右下角装饰——位置—时间图线示意 -->
  <svg viewBox="0 0 220 150" width="320" xmlns="http://www.w3.org/2000/svg">
    <!-- 纵轴（位置 x）-->
    <line x1="34" y1="118" x2="34" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 31 25 L 34 18 L 37 25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
    <!-- 横轴（时间 t）-->
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
    <!-- 原点（坐标轴交点，标签在左下方，KaTeX 数学斜体）-->
    <circle cx="34" cy="118" r="3" fill="currentColor" opacity="0.7" />
    <text x="22" y="136" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 12px" fill="#94a3b8" opacity="0.85">O</text>
    <!-- 物理量标签（KaTeX 数学斜体；x 与 O 竖向对齐、t 与 O 横向对齐，离轴留间距）-->
    <text x="206" y="136" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 15px" fill="#94a3b8">t</text>
    <text x="22" y="20" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 15px" fill="#94a3b8">x</text>
    <!-- 位置—时间图线（贝塞尔曲线：先上 → 再降 → 再扬）-->
    <path
      d="M 34 118 C 50 86 58 50 80 52 C 96 53 106 92 122 92 C 136 92 152 40 172 34"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <circle cx="172" cy="34" r="4" fill="#e2a846" />
    <!-- 图注（底部居中）-->
    <text x="110" y="149" text-anchor="middle" style="font-size: 11px" fill="#94a3b8" opacity="0.75">位置随时间的变化</text>
  </svg>
</template>
