<template>
  <!-- 第 2 页：导航两条路线示意图——红（骑行 3 km）与蓝（网约车 4 km）从同一起点到电影院 -->
  <svg class="nav-map" viewBox="0 0 420 210">
    <g stroke="rgba(148,163,184,0.13)" stroke-width="1">
      <path d="M 20 46 H 400" />
      <path d="M 20 96 H 400" />
      <path d="M 20 146 H 400" />
      <path d="M 96 20 V 192" />
      <path d="M 196 20 V 192" />
      <path d="M 296 20 V 192" />
    </g>
    <path
      d="M 60 176 L 150 150 L 150 96 L 300 96 L 300 52 L 356 40"
      fill="none"
      stroke="#f87171"
      stroke-width="3.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M 60 176 L 106 176 L 106 120 L 206 120 L 206 156 L 300 156 L 300 74 L 356 40"
      fill="none"
      stroke="#60a5fa"
      stroke-width="3.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="60" cy="176" r="6" fill="#f1f5f9" />
    <text x="60" y="200" text-anchor="middle" style="font-size: 11px" fill="#94a3b8">出发</text>
    <circle cx="356" cy="40" r="6" fill="#e2a846" />
    <text x="352" y="24" text-anchor="middle" style="font-size: 11px" fill="#94a3b8">电影院</text>
  </svg>
</template>
