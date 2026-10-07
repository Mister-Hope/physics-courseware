<template>
  <!-- 第 5 页：从同一起点出发的两段位移——向东 3 km 到电影院、向南 3 km 到体育馆，路程相同但方向不同 -->
  <svg viewBox="0 0 320 210" style="display: block; width: 100%; max-width: 420px; margin: 0 auto">
    <circle cx="130" cy="72" r="6" fill="#f1f5f9" />
    <text x="130" y="52" text-anchor="middle" style="font-size: 12px" fill="#94a3b8">起点</text>
    <line x1="130" y1="72" x2="292" y2="72" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <path d="M 284 66 L 296 72 L 284 78 Z" fill="#e2a846" />
    <text x="286" y="100" text-anchor="end" style="font-size: 13px" fill="#e2a846">电影院 3 km（东）</text>
    <line x1="130" y1="72" x2="130" y2="192" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" />
    <path d="M 124 184 L 130 196 L 136 184 Z" fill="#60a5fa" />
    <text x="146" y="188" style="font-size: 13px" fill="#60a5fa">体育馆 3 km（南）</text>
    <text x="24" y="204" style="font-size: 12px" fill="#94a3b8">两段路程都是 3 km，用时都是 15 min</text>
  </svg>
</template>
