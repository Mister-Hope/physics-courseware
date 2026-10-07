<template>
  <!-- 第 6 页：学校到公园的两条路线（15 km / 18 km）与直线距离（12 km 有向线段） -->
  <svg viewBox="0 12 640 276" width="100%" class="nav-map" xmlns="http://www.w3.org/2000/svg">
    <!-- 淡网格：导航底图 -->
    <g stroke="rgba(148,163,184,0.07)" stroke-width="1">
      <line x1="30" y1="60" x2="610" y2="60" />
      <line x1="30" y1="120" x2="610" y2="120" />
      <line x1="30" y1="180" x2="610" y2="180" />
      <line x1="30" y1="240" x2="610" y2="240" />
      <line x1="160" y1="20" x2="160" y2="290" />
      <line x1="320" y1="20" x2="320" y2="290" />
      <line x1="480" y1="20" x2="480" y2="290" />
    </g>
    <!-- 路线②：绕远的一条（18 km，灰色＝不选它） -->
    <path d="M 100 240 Q 320 -20 540 60" fill="none" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round" opacity="0.75" />
    <text x="300" y="40" text-anchor="middle" font-size="13" fill="#94a3b8">18 km</text>
    <!-- 路线①：更短的一条（15 km） -->
    <path d="M 100 240 Q 330 210 540 60" fill="none" stroke="#3b82f6" stroke-width="3.5" stroke-linecap="round" />
    <text x="322" y="206" text-anchor="middle" font-size="13" font-weight="700" fill="#60a5fa">15 km</text>
    <!-- 起点终点的直线距离：12 km（金色有向线段；箭头尖端落在公园点上、线头被三角盖住） -->
    <line x1="100" y1="240" x2="520.4" y2="67.6" stroke="#e2a846" stroke-width="3.5" stroke-dasharray="9 6" stroke-linecap="round" />
    <path d="M 533.5 62.5 L 523.3 75 L 517.5 60.1 z" fill="#e2a846" />
    <text x="330" y="100" text-anchor="middle" font-size="14" font-weight="700" fill="#e2a846" stroke="#0f1425" stroke-width="3" paint-order="stroke">
      12 km（直线距离）
    </text>
    <!-- 学校 / 公园 -->
    <circle cx="100" cy="240" r="7" fill="#60a5fa" stroke="#0f1425" stroke-width="2" />
    <circle cx="540" cy="60" r="7" fill="#e2a846" stroke="#0f1425" stroke-width="2" />
    <text x="100" y="272" text-anchor="middle" font-size="14" font-weight="700" fill="#cbd5e1">学校</text>
    <text x="540" y="32" text-anchor="middle" font-size="14" font-weight="700" fill="#cbd5e1">公园</text>
  </svg>
</template>
