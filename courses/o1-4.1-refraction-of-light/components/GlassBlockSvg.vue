<!-- 4.1 第 12 页：用玻璃砖测折射率的光路与大头针定位示意 -->
<template>
  <svg viewBox="0 0 440 300" width="420" height="286" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="glass-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#60a5fa" stop-opacity="0.22" />
        <stop offset="1" stop-color="#3b82f6" stop-opacity="0.08" />
      </linearGradient>
    </defs>
    <rect x="110" y="100" width="220" height="90" rx="4" fill="url(#glass-fill)" stroke="var(--c-neutral-300)" stroke-width="2" opacity="0.9" />
    <text x="220" y="150" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">玻璃砖</text>
    <line x1="80" y1="30" x2="180" y2="100" stroke="var(--c-accent)" stroke-width="2" />
    <line x1="180" y1="100" x2="239" y2="190" stroke="var(--c-accent-2)" stroke-width="2" />
    <line x1="239" y1="190" x2="368" y2="280" stroke="var(--c-accent)" stroke-width="2" />
    <line x1="180" y1="62" x2="180" y2="140" stroke="var(--c-text-mute)" stroke-width="1.1" stroke-dasharray="4 4" />
    <line x1="239" y1="148" x2="239" y2="232" stroke="var(--c-text-mute)" stroke-width="1.1" stroke-dasharray="4 4" />
    <line x1="180" y1="100" x2="288" y2="176" stroke="var(--c-text-mute)" stroke-width="1" stroke-dasharray="4 4" opacity="0.6" />
    <circle cx="80" cy="30" r="3.2" fill="var(--c-accent)" />
    <circle cx="130" cy="65" r="3.2" fill="var(--c-accent)" />
    <circle cx="296" cy="230" r="3.2" fill="var(--c-accent-2)" />
    <circle cx="368" cy="280" r="3.2" fill="var(--c-accent-2)" />
    <text x="68" y="24" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="13">A</text>
    <text x="136" y="62" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="13">B</text>
    <text x="304" y="228" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="13">C</text>
    <text x="376" y="296" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="13">D</text>
    <text x="186" y="96" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="13">O</text>
    <text x="245" y="206" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="13">O′</text>
    <path d="M 180 65 A 35 35 0 0 0 151.3 79.9" fill="none" stroke="var(--c-accent)" stroke-width="1.3" />
    <path d="M 239 225 A 35 35 0 0 1 258.1 219.3" fill="none" stroke="var(--c-accent-2)" stroke-width="1.3" />
    <text x="145" y="72" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="14">θ₁</text>
    <text x="252" y="241" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="14">θ₂</text>
    <text x="98" y="18" fill="var(--c-accent)" font-size="11">入射光线</text>
    <text x="190" y="178" fill="var(--c-accent-2)" font-size="11">折射光线</text>
    <text x="330" y="292" fill="var(--c-accent)" font-size="11">出射光线</text>
    <text x="24" y="118" fill="var(--c-text-mute)" font-size="11">大头针 A、B</text>
    <text x="300" y="266" fill="var(--c-text-mute)" font-size="11">大头针 C、D</text>
  </svg>
</template>
