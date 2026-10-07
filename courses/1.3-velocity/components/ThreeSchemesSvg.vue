<template>
  <!-- 第 22 页：求 N 点速度的三种取段方案——① 该点→下一点、② 上一点→该点、③ 上一点→下一点（关于 N 点对称） -->
  <svg viewBox="0 0 620 160" style="display: block; width: 100%; max-width: 720px; margin: 0 auto">
    <rect x="30" y="24" width="560" height="34" rx="6" fill="rgba(148,163,184,0.10)" stroke="rgba(148,163,184,0.3)" stroke-width="1.5" />
    <circle cx="150" cy="41" r="5" fill="#94a3b8" />
    <circle cx="310" cy="41" r="6" fill="#e2a846" />
    <circle cx="470" cy="41" r="5" fill="#94a3b8" />
    <text x="150" y="16" text-anchor="middle" style="font-size: 13px" fill="#94a3b8">N−1</text>
    <text x="310" y="14" text-anchor="middle" style="font-size: 14px" fill="#e2a846">N</text>
    <text x="470" y="16" text-anchor="middle" style="font-size: 13px" fill="#94a3b8">N+1</text>
    <g stroke="#60a5fa" stroke-width="2">
      <line x1="310" y1="76" x2="470" y2="76" />
      <line x1="310" y1="70" x2="310" y2="82" />
      <line x1="470" y1="70" x2="470" y2="82" />
    </g>
    <text x="390" y="68" text-anchor="middle" style="font-size: 12px" fill="#60a5fa">① 该点 → 下一点</text>
    <g stroke="#2dd4bf" stroke-width="2">
      <line x1="150" y1="100" x2="310" y2="100" />
      <line x1="150" y1="94" x2="150" y2="106" />
      <line x1="310" y1="94" x2="310" y2="106" />
    </g>
    <text x="230" y="92" text-anchor="middle" style="font-size: 12px" fill="#2dd4bf">② 上一点 → 该点</text>
    <g stroke="#e2a846" stroke-width="2.4">
      <line x1="150" y1="130" x2="470" y2="130" />
      <line x1="150" y1="124" x2="150" y2="136" />
      <line x1="470" y1="124" x2="470" y2="136" />
    </g>
    <text x="310" y="152" text-anchor="middle" style="font-size: 12px" fill="#e2a846">③ 上一点 → 下一点（关于 N 点对称）</text>
  </svg>
</template>
