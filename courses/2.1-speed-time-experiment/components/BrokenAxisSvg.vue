<template>
  <!-- 第 10 页：纵轴的折断，用锯齿折断线压缩纵轴原点附近的空白 -->
  <svg viewBox="0 0 360 240" width="100%" style="max-width: 360px" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="200" x2="348" y2="200" stroke="#94a3b8" stroke-width="1.6" />
    <line x1="40" y1="200" x2="40" y2="24" stroke="#94a3b8" stroke-width="1.6" />
    <path d="M 340 194 L 348 200 L 340 206 Z" fill="#94a3b8" />
    <path d="M 34 32 L 40 24 L 46 32 Z" fill="#94a3b8" />
    <path d="M 32 188 L 48 180" stroke="#e2a846" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 32 178 L 48 170" stroke="#e2a846" stroke-width="2.6" stroke-linecap="round" />
    <g stroke="#94a3b8" stroke-width="1" opacity="0.5">
      <line x1="40" y1="200" x2="47" y2="200" />
      <line x1="40" y1="160" x2="47" y2="160" />
      <line x1="40" y1="120" x2="47" y2="120" />
      <line x1="40" y1="80" x2="47" y2="80" />
      <line x1="40" y1="40" x2="47" y2="40" />
      <line x1="110" y1="200" x2="110" y2="193" />
      <line x1="180" y1="200" x2="180" y2="193" />
      <line x1="250" y1="200" x2="250" y2="193" />
      <line x1="320" y1="200" x2="320" y2="193" />
    </g>
    <text x="26" y="216" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#94a3b8">O</text>
    <text x="352" y="206" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#94a3b8">t</text>
    <text x="28" y="20" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#94a3b8">v</text>
  </svg>
</template>
