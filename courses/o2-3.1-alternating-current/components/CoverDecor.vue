<!--
  封面装饰：线圈在 N、S 极之间转动，下方拖出一条正弦电压波形。
  只作装饰，不承载知识点；颜色全部走共享 token。
-->
<template>
  <svg viewBox="0 0 320 190" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="ac-cover-wave" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0" />
        <stop offset="35%" stop-color="var(--c-accent)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--c-accent-2)" stop-opacity="0.8" />
      </linearGradient>
      <radialGradient id="ac-cover-glow">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.34" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="160" cy="78" r="66" fill="url(#ac-cover-glow)" />
    <g opacity="0.45" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-dasharray="4 5">
      <line x1="44" y1="48" x2="276" y2="48" />
      <line x1="44" y1="78" x2="276" y2="78" />
      <line x1="44" y1="108" x2="276" y2="108" />
    </g>
    <rect
      x="10"
      y="36"
      width="28"
      height="84"
      rx="5"
      fill="var(--c-danger)"
      opacity="0.14"
      stroke="var(--c-danger)"
      stroke-opacity="0.5"
    />
    <text
      x="24"
      y="84"
      fill="var(--c-danger)"
      font-size="19"
      font-weight="700"
      text-anchor="middle"
    >
      N
    </text>
    <rect
      x="282"
      y="36"
      width="28"
      height="84"
      rx="5"
      fill="var(--c-accent-2)"
      opacity="0.14"
      stroke="var(--c-accent-2)"
      stroke-opacity="0.5"
    />
    <text
      x="296"
      y="84"
      fill="var(--c-accent-2)"
      font-size="19"
      font-weight="700"
      text-anchor="middle"
    >
      S
    </text>
    <line
      x1="112"
      y1="78"
      x2="208"
      y2="78"
      stroke="var(--c-text-dim)"
      stroke-width="1.2"
      stroke-dasharray="4 4"
      opacity="0.6"
    />
    <polygon
      points="128,38 192,50 192,106 128,118"
      fill="var(--c-accent)"
      fill-opacity="0.08"
      stroke="var(--c-accent)"
      stroke-width="2.6"
      stroke-linejoin="round"
    />
    <circle cx="160" cy="78" r="3.5" fill="var(--c-accent)" />
    <line
      x1="34"
      y1="156"
      x2="286"
      y2="156"
      stroke="var(--c-text-dim)"
      stroke-width="1"
      opacity="0.35"
    />
    <path
      d="M 40 156 Q 70 114 100 156 T 160 156 T 220 156 T 280 156"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="7"
      stroke-linecap="round"
      opacity="0.14"
    />
    <path
      d="M 40 156 Q 70 114 100 156 T 160 156 T 220 156 T 280 156"
      fill="none"
      stroke="url(#ac-cover-wave)"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <circle cx="100" cy="156" r="3" fill="var(--c-accent)" />
    <circle cx="220" cy="156" r="3" fill="var(--c-accent-2)" />
  </svg>
</template>
