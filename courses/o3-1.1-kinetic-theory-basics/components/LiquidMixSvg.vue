<!-- 第 9 页：水和酒精混合后总体积变小，说明分子间有空隙 -->
<template>
  <svg viewBox="0 0 460 230" width="460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="34" y="58" width="72" height="132" rx="8" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <rect x="38" y="112" width="64" height="74" rx="4" fill="var(--c-physics)" opacity="0.55" />
    <text x="70" y="206" fill="var(--c-text-dim)" font-size="10" font-family="sans-serif" text-anchor="middle">水 50 mL</text>
    <rect x="138" y="58" width="72" height="132" rx="8" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <rect x="142" y="112" width="64" height="74" rx="4" fill="var(--c-accent)" opacity="0.55" />
    <text x="174" y="206" fill="var(--c-text-dim)" font-size="10" font-family="sans-serif" text-anchor="middle">酒精 50 mL</text>
    <path d="M 224 122 L 276 122" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 268 115 L 278 122 L 268 129" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <linearGradient id="mix-liquid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--c-accent)" stop-opacity="0.55" />
        <stop offset="1" stop-color="var(--c-physics)" stop-opacity="0.55" />
      </linearGradient>
    </defs>
    <rect x="292" y="58" width="72" height="132" rx="8" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <rect x="296" y="120" width="64" height="66" rx="4" fill="url(#mix-liquid)" />
    <line x1="288" y1="104" x2="368" y2="104" stroke="var(--c-text-mute)" stroke-width="1" stroke-dasharray="4 4" />
    <text x="378" y="107" fill="var(--c-text-mute)" font-size="9" font-family="sans-serif">100 mL</text>
    <text x="328" y="206" fill="var(--c-text-dim)" font-size="10" font-family="sans-serif" text-anchor="middle">混合后 &lt; 100 mL</text>
    <text x="200" y="34" fill="var(--c-text-mute)" font-size="11" font-family="sans-serif" text-anchor="middle">水分子和酒精分子彼此进入对方的空隙</text>
  </svg>
</template>
