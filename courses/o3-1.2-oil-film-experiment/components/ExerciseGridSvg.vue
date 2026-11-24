<!-- 第 15 页例题：方格纸上约 100 格的油膜轮廓。 -->
<template>
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="30" y="30" width="340" height="340" fill="#0b2b4a" fill-opacity="0.35" stroke="#94a3b8" stroke-width="1.4" />
    <g stroke="#94a3b8" stroke-opacity="0.4" stroke-width="0.7">
      <line v-for="i in 21" :key="`v${i}`" :x1="30 + (i - 1) * 17" y1="30" :x2="30 + (i - 1) * 17" y2="370" />
      <line v-for="i in 21" :key="`h${i}`" x1="30" :y1="30 + (i - 1) * 17" x2="370" :y2="30 + (i - 1) * 17" />
    </g>
    <circle cx="200" cy="200" r="95" fill="#e2a846" fill-opacity="0.15" stroke="#e2a846" stroke-width="1.8" />
    <text x="200" y="196" fill="#e2a846" font-size="11" text-anchor="middle">油膜轮廓</text>
    <text x="200" y="214" fill="#94a3b8" font-size="9" text-anchor="middle">约 100 格</text>
    <line x1="30" y1="386" x2="47" y2="386" stroke="#94a3b8" stroke-width="1.2" />
    <line x1="30" y1="382" x2="30" y2="390" stroke="#94a3b8" stroke-width="1.2" />
    <line x1="47" y1="382" x2="47" y2="390" stroke="#94a3b8" stroke-width="1.2" />
    <text x="56" y="390" fill="#94a3b8" font-size="10">1 cm</text>
  </svg>
</template>
