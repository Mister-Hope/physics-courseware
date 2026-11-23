<template>
  <!-- 单摆模型：悬点、摆线、摆球、平衡位置、摆角与摆长 -->
  <svg viewBox="62 10 316 292" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="单摆模型示意图">
    <path
      d="M70 40 H370 M80 40 L71 30 M104 40 L95 30 M128 40 L119 30 M152 40 L143 30 M176 40 L167 30 M200 40 L191 30 M224 40 L215 30 M248 40 L239 30 M272 40 L263 30 M296 40 L287 30 M320 40 L311 30 M344 40 L335 30 M368 40 L359 30"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-opacity=".4"
    />
    <line x1="70" y1="40" x2="370" y2="40" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <circle cx="220" cy="40" r="4.5" fill="var(--c-text-dim)" />
    <text x="230" y="27" font-size="13" fill="var(--c-text-dim)">悬点</text>
    <line x1="220" y1="40" x2="220" y2="300" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 7" stroke-opacity=".55" />
    <line x1="220" y1="40" x2="306.1" y2="253.3" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="306.1" cy="253.3" r="15" fill="var(--c-accent)" fill-opacity=".26" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="220" cy="270" r="4" fill="var(--c-text-dim)" />
    <text x="198" y="292" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">O</text>
    <path d="M220 270 A230 230 0 0 1 306.1 253.3" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 6" stroke-opacity=".6" />
    <path d="M220 74 A34 34 0 0 1 232.7 71.5" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="238" y="86" font-size="16" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">θ</text>
    <text x="243" y="159" font-size="17" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">l</text>
    <text x="330" y="250" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">m</text>
  </svg>
</template>
