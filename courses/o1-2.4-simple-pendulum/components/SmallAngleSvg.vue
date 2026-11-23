<template>
  <!-- 小角度近似：摆角很小时，弧长≈弦长 x，sinθ≈θ=x/l -->
  <svg viewBox="84 14 274 268" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="小角度近似示意图">
    <path
      d="M90 30 H350 M100 30 L91 21 M124 30 L115 21 M148 30 L139 21 M172 30 L163 21 M196 30 L187 21 M220 30 L211 21 M244 30 L235 21 M268 30 L259 21 M292 30 L283 21 M316 30 L307 21 M340 30 L331 21"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-opacity=".4"
    />
    <line x1="90" y1="30" x2="350" y2="30" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <circle cx="220" cy="30" r="4.5" fill="var(--c-text-dim)" />
    <line x1="220" y1="30" x2="220" y2="282" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 7" stroke-opacity=".5" />
    <line x1="220" y1="30" x2="309.5" y2="231" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="309.5" cy="231" r="11" fill="var(--c-accent)" fill-opacity=".26" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="220" cy="250" r="4" fill="var(--c-text-dim)" />
    <path d="M220 250 A220 220 0 0 1 309.5 231" fill="none" stroke="var(--c-accent)" stroke-width="5" stroke-opacity=".35" stroke-linecap="round" />
    <line x1="220" y1="250" x2="309.5" y2="231" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-dasharray="6 5" />
    <text x="262" y="256" font-size="16" fill="var(--c-accent-2)" text-anchor="middle" font-family="KaTeX_Math" font-style="italic">x</text>
    <text x="243" y="146" font-size="17" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">l</text>
    <path d="M220 70 A40 40 0 0 1 236.3 66.5" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="242" y="82" font-size="16" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">θ</text>
    <text x="200" y="270" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">O</text>
    <text x="335" y="238" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">P</text>
  </svg>
</template>
