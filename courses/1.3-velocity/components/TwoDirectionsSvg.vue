<template>
  <!-- 第 5 页：从同一起点出发的两段位移——向东 3 km 到电影院、向南 3 km 到体育馆，路程相同但方向不同 -->
  <svg viewBox="0 0 320 210" style="display: block; width: 100%; max-width: 420px; margin: 0 auto">
    <circle cx="130" cy="72" r="6" fill="var(--c-text)" />
    <text x="130" y="52" text-anchor="middle" style="font-size: 12px" fill="var(--c-text-dim)">起点</text>
    <line x1="130" y1="72" x2="292" y2="72" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <path d="M 284 66 L 296 72 L 284 78 Z" fill="var(--c-accent)" />
    <text x="286" y="100" text-anchor="end" style="font-size: 13px" fill="var(--c-accent)">电影院 3 km（东）</text>
    <line x1="130" y1="72" x2="130" y2="192" stroke="var(--c-velocity)" stroke-width="3" stroke-linecap="round" />
    <path d="M 124 184 L 130 196 L 136 184 Z" fill="var(--c-velocity)" />
    <text x="146" y="188" style="font-size: 13px" fill="var(--c-velocity)">体育馆 3 km（南）</text>
    <text x="24" y="204" style="font-size: 12px" fill="var(--c-text-dim)">两段路程都是 3 km，用时都是 15 min</text>
  </svg>
</template>
