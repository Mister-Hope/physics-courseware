<template>
  <!-- 第 23 页：以 N 点为中心、左右各取 Δt 的对称取段（方案 ③） -->
  <svg viewBox="0 0 620 96" style="display: block; width: 100%; max-width: 700px; margin: 0 auto">
    <line x1="90" y1="52" x2="530" y2="52" stroke="rgba(148,163,184,0.35)" stroke-width="2" stroke-dasharray="6 6" />
    <circle cx="190" cy="52" r="5" fill="#94a3b8" />
    <circle cx="310" cy="52" r="7" fill="#e2a846" />
    <circle cx="430" cy="52" r="5" fill="#94a3b8" />
    <text x="190" y="30" text-anchor="middle" style="font-size: 13px" fill="#94a3b8">N−1</text>
    <text x="310" y="28" text-anchor="middle" style="font-size: 14px" fill="#e2a846">N</text>
    <text x="430" y="30" text-anchor="middle" style="font-size: 13px" fill="#94a3b8">N+1</text>
    <g stroke="#e2a846" stroke-width="2.4">
      <line x1="190" y1="72" x2="430" y2="72" />
      <line x1="190" y1="66" x2="190" y2="78" />
      <line x1="430" y1="66" x2="430" y2="78" />
    </g>
    <text x="310" y="92" text-anchor="middle" style="font-size: 12px" fill="#e2a846">左右各取 Δt——关于 N 点对称</text>
  </svg>
</template>
