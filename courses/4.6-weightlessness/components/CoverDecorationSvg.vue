<template>
  <!-- 第 1 页封面右下角装饰：力传感器测下蹲时的示数曲线——先变小、后变大、再回到重力大小 -->
  <svg viewBox="0 0 280 170" width="320" xmlns="http://www.w3.org/2000/svg">
    <line x1="22" y1="108" x2="262" y2="108" stroke="rgba(248,113,113,0.55)" stroke-width="1.2" stroke-dasharray="6 6" />
    <text x="26" y="100" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="rgba(248,113,113,0.85)">mg</text>
    <path
      d="M 26 108 H 76 C 94 108 102 146 120 146 C 138 146 148 62 166 62 C 184 62 192 108 212 108 H 258"
      fill="none"
      stroke="currentColor"
      stroke-width="2.6"
      stroke-linecap="round"
    />
  </svg>
</template>
