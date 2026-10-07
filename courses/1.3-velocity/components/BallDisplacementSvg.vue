<template>
  <!-- 第 14 页：竖直标尺上的小球从 1 m 升到 3 m，位移 Δx = 2 m，用时 2 s -->
  <svg viewBox="0 0 200 240" style="display: block; width: 100%; max-width: 190px; margin: 0 auto">
    <line x1="70" y1="30" x2="70" y2="216" stroke="rgba(148,163,184,0.5)" stroke-width="2" />
    <g stroke="rgba(148,163,184,0.5)" stroke-width="1.6">
      <line x1="62" y1="50" x2="78" y2="50" />
      <line x1="62" y1="105" x2="78" y2="105" />
      <line x1="62" y1="160" x2="78" y2="160" />
      <line x1="62" y1="215" x2="78" y2="215" />
    </g>
    <g style="font-size: 12px" fill="#94a3b8">
      <text x="86" y="54">3 m</text>
      <text x="86" y="109">2 m</text>
      <text x="86" y="164">1 m</text>
      <text x="86" y="219">0</text>
    </g>
    <line x1="70" y1="160" x2="70" y2="50" stroke="#e2a846" stroke-width="2.4" stroke-dasharray="6 4" />
    <path d="M 62 62 L 70 48 L 78 62 Z" fill="#e2a846" />
    <circle cx="70" cy="160" r="7" fill="#60a5fa" />
    <circle cx="70" cy="50" r="7" fill="#e2a846" />
    <text x="44" y="140" text-anchor="middle" style="font-size: 12px" fill="#e2a846">Δx</text>
    <text x="122" y="222" style="font-size: 12px" fill="#94a3b8">用时 2 s</text>
  </svg>
</template>
