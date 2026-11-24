<!-- 封面装饰：光子射到金属表面，光电子逸出 -->
<template>
  <svg viewBox="0 0 340 210" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pe-cover-metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(148, 163, 184, 0.3)" />
        <stop offset="100%" stop-color="rgba(148, 163, 184, 0.08)" />
      </linearGradient>
    </defs>
    <rect x="188" y="116" width="140" height="74" rx="8" fill="url(#pe-cover-metal)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <path d="M 26 54 Q 44 40 62 54 T 98 54 T 134 54" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <path d="M 134 54 L 172 92" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <path d="M 172 92 L 158 86 M 172 92 L 164 78" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <path d="M 52 108 Q 70 94 88 108 T 124 108" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" opacity="0.75" />
    <path d="M 124 108 L 160 138" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" opacity="0.75" />
    <path d="M 160 138 L 146 134 M 160 138 L 152 124" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" opacity="0.75" />
    <text x="46" y="34" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">hν</text>
    <circle cx="232" cy="74" r="8" fill="rgba(96, 165, 250, 0.22)" stroke="var(--c-velocity)" stroke-width="1.6" />
    <text x="232" y="78" font-family="KaTeX_Main" font-size="10" fill="var(--c-velocity)" text-anchor="middle">e</text>
    <path d="M 232 64 L 232 34" fill="none" stroke="var(--c-velocity)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="5 4" />
    <path d="M 232 34 L 226 44 M 232 34 L 238 44" fill="none" stroke="var(--c-velocity)" stroke-width="1.8" stroke-linecap="round" />
    <circle cx="292" cy="58" r="6" fill="rgba(96, 165, 250, 0.22)" stroke="var(--c-velocity)" stroke-width="1.4" />
    <text x="252" y="196" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-dim)">金属</text>
  </svg>
</template>
