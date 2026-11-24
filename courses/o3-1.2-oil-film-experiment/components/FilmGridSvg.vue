<!-- 第 7 页：玻璃板上的坐标方格与油膜轮廓（示意，实际数得约 2000 格）。 -->
<template>
  <svg viewBox="0 0 510 510" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="25" y="25" width="450" height="450" fill="#0b2b4a" fill-opacity="0.35" stroke="#94a3b8" stroke-width="1.6" />
    <g stroke="#94a3b8" stroke-opacity="0.35" stroke-width="0.7">
      <line v-for="i in 45" :key="`v${i}`" :x1="25 + (i - 1) * 10" y1="25" :x2="25 + (i - 1) * 10" y2="475" />
      <line v-for="i in 45" :key="`h${i}`" x1="25" :y1="25 + (i - 1) * 10" x2="475" :y2="25 + (i - 1) * 10" />
    </g>
    <circle cx="250" cy="250" r="232" fill="#e2a846" fill-opacity="0.14" stroke="#e2a846" stroke-width="2" />
    <text x="250" y="246" fill="#e2a846" font-size="12" text-anchor="middle">油膜轮廓</text>
    <text x="250" y="266" fill="#94a3b8" font-size="10" text-anchor="middle">数得约 2000 格</text>
    <line x1="25" y1="490" x2="35" y2="490" stroke="#94a3b8" stroke-width="1.2" />
    <line x1="25" y1="486" x2="25" y2="494" stroke="#94a3b8" stroke-width="1.2" />
    <line x1="35" y1="486" x2="35" y2="494" stroke="#94a3b8" stroke-width="1.2" />
    <text x="44" y="494" fill="#94a3b8" font-size="10">1 cm</text>
  </svg>
</template>
