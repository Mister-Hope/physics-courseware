<template>
  <!-- 第 12 页左图：v-t 图线斜率逐渐变大（上凸曲线），说明加速度在增大 -->
  <svg viewBox="0 0 400 120" style="width: 100%; max-width: 400px; height: auto">
    <line x1="24" y1="105" x2="150" y2="105" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 143 101 L 150 105 L 143 109" fill="none" stroke="rgba(148,163,184,0.5)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
    <line x1="24" y1="105" x2="24" y2="20" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 20 27 L 24 20 L 28 27" fill="none" stroke="rgba(148,163,184,0.5)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
    <path d="M 26 102 C 70 100 110 80 144 26" fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <text x="14" y="119" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 17px" fill="#94a3b8">O</text>
    <text x="14" y="14" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 17px" fill="#94a3b8">v</text>
    <text x="158" y="110" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 17px" fill="#94a3b8">t</text>
    <text x="180" y="52" style="font-size: 17px" fill="#e2a846">斜率变大</text>
    <text x="180" y="80" style="font-size: 15px" fill="#94a3b8">加速度在增大</text>
  </svg>
</template>
