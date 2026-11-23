<!-- 第 4 页：油膜法估测分子大小，油膜铺成单分子层的示意 -->
<template>
  <svg viewBox="0 0 520 240" width="520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="oil-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.65" />
      </linearGradient>
    </defs>
    <rect x="44" y="66" width="432" height="136" rx="16" fill="url(#oil-water)" stroke="var(--c-border)" stroke-width="1.6" />
    <line x1="44" y1="78" x2="476" y2="78" stroke="var(--c-physics)" stroke-width="1" opacity="0.6" />
    <ellipse cx="260" cy="132" rx="148" ry="44" fill="var(--c-accent)" fill-opacity="0.22" stroke="var(--c-accent)" stroke-width="1.6" />
    <g fill="var(--c-accent)" opacity="0.9">
      <circle cx="190" cy="120" r="3.2" />
      <circle cx="218" cy="140" r="3.2" />
      <circle cx="246" cy="116" r="3.2" />
      <circle cx="274" cy="142" r="3.2" />
      <circle cx="302" cy="118" r="3.2" />
      <circle cx="330" cy="140" r="3.2" />
      <circle cx="230" cy="126" r="3.2" />
      <circle cx="290" cy="130" r="3.2" />
    </g>
    <path d="M 88 46 L 88 80" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="3 4" />
    <path d="M 82 46 L 94 46" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <circle cx="88" cy="86" r="3" fill="var(--c-accent-2)" />
    <text x="108" y="42" fill="var(--c-text-dim)" font-size="11" font-family="sans-serif">一滴油酸酒精溶液</text>
    <text x="60" y="96" fill="var(--c-text-dim)" font-size="11" font-family="sans-serif">水面</text>
    <text x="260" y="198" fill="var(--c-accent)" font-size="12" font-family="sans-serif" text-anchor="middle">油膜（单分子层）</text>
    <text x="260" y="220" fill="var(--c-text-mute)" font-size="10" font-family="sans-serif" text-anchor="middle">
      测出油膜面积 S，再由一滴油酸的体积 V 求厚度 d
    </text>
  </svg>
</template>
