<template>
  <!-- 第 1 页（封面）：右下角装饰——两个球之间的相互作用力 F 与 F′ 等大反向 -->
  <svg viewBox="0 0 220 150" width="330" xmlns="http://www.w3.org/2000/svg">
    <circle cx="58" cy="75" r="24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <circle cx="162" cy="75" r="24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <line x1="86" y1="62" x2="130" y2="62" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 128 56 L 138 62 L 128 68 z" fill="var(--c-accent)" />
    <line x1="134" y1="88" x2="90" y2="88" stroke="var(--c-velocity)" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 92 82 L 82 88 L 92 94 z" fill="var(--c-velocity)" />
    <text x="108" y="48" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17" text-anchor="middle">F</text>
    <text x="112" y="112" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17" text-anchor="middle">F'</text>
  </svg>
</template>
