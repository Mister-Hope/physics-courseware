<template>
  <!-- 第 3 页：宝剑只能握剑柄，矢量有确定的起点与指向 -->
  <svg viewBox="0 0 300 150" width="100%" style="max-width: 16rem" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="p3-blade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-neutral-50)" stop-opacity="0.95" />
        <stop offset="45%" stop-color="var(--c-text-dim)" stop-opacity="0.8" />
        <stop offset="55%" stop-color="var(--c-neutral-300)" stop-opacity="0.9" />
        <stop offset="100%" stop-color="var(--c-neutral-600)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="p3-grip" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-accent-light)" />
        <stop offset="100%" stop-color="#b45309" />
      </linearGradient>
      <linearGradient id="p3-guard" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-text-dim)" />
        <stop offset="50%" stop-color="var(--c-neutral-200)" />
        <stop offset="100%" stop-color="var(--c-neutral-500)" />
      </linearGradient>
    </defs>
    <path d="M 108 58 L 246 66 L 272 75 L 246 84 L 108 92 Z" fill="url(#p3-blade)" stroke="var(--c-neutral-200)" stroke-width="1.1" stroke-opacity="0.6" />
    <path d="M 112 62 L 242 69 L 264 75" fill="none" stroke="var(--c-neutral-50)" stroke-width="1.6" opacity="0.65" />
    <line x1="116" y1="75" x2="258" y2="75" stroke="var(--c-neutral-500)" stroke-width="1.3" opacity="0.5" />
    <rect x="98" y="43" width="14" height="64" rx="7" fill="url(#p3-guard)" stroke="var(--c-neutral-300)" stroke-width="1" />
    <rect x="46" y="64" width="58" height="22" rx="10" fill="url(#p3-grip)" stroke="var(--c-accent-light)" stroke-width="1.2" />
    <g stroke="#7c2d12" stroke-width="1.2" opacity="0.45">
      <line x1="60" y1="65" x2="56" y2="85" />
      <line x1="72" y1="65" x2="68" y2="85" />
      <line x1="84" y1="65" x2="80" y2="85" />
      <line x1="96" y1="65" x2="92" y2="85" />
    </g>
    <circle cx="44" cy="75" r="9" fill="url(#p3-grip)" stroke="var(--c-accent-light)" stroke-width="1.2" />
    <text x="120" y="40" font-size="12" fill="var(--c-text-dim)">剑尖（终点）指向对手</text>
    <text x="34" y="126" font-size="12" fill="var(--c-accent)">握这里（起点）</text>
  </svg>
</template>
