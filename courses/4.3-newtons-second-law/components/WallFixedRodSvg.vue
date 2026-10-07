<template>
  <!-- 第 24 页：一端嵌在墙里的多力杆——弹力可以不沿杆。（取自 3.1 轻杆模型那一页） -->
  <svg class="fig" viewBox="0 0 300 190" style="max-width: 14rem" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="26" width="34" height="140" fill="rgba(148,163,184,0.22)" stroke="#cbd5e1" stroke-width="2.2" />
    <g stroke="#64748b" stroke-width="1.6">
      <line x1="10" y1="44" x2="0" y2="56" />
      <line x1="10" y1="80" x2="0" y2="92" />
      <line x1="10" y1="116" x2="0" y2="128" />
      <line x1="10" y1="152" x2="0" y2="164" />
    </g>
    <line x1="26" y1="110" x2="214" y2="110" stroke="#e2a846" stroke-width="7" stroke-linecap="round" />
    <CourseArrow :from="{ x: 214, y: 110 }" :to="{ x: 268, y: 40 }" stroke="#e2a846" :stroke-width="3.4" />
  </svg>
</template>
