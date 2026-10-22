<!-- 封面装饰：线圈中的交变电流 → 变化的磁场 → 金属中的一圈圈涡流 -->
<template>
  <svg
    viewBox="0 0 300 170"
    width="300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="涡流"
  >
    <defs>
      <radialGradient id="ed-cover-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.34" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="196" cy="76" r="82" fill="url(#ed-cover-glow)" />
    <g fill="none" stroke="var(--c-accent)">
      <ellipse cx="196" cy="76" rx="64" ry="36" stroke-width="1.8" opacity="0.32" />
      <ellipse cx="196" cy="76" rx="44" ry="24" stroke-width="2" opacity="0.58" />
      <ellipse cx="196" cy="76" rx="24" ry="13" stroke-width="2.4" opacity="0.95" />
    </g>
    <g
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-linecap="round"
      opacity="0.85"
    >
      <path d="M 172 68 L 184 64" />
      <path d="M 216 84 L 208 88" />
    </g>
    <g
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="2.2"
      stroke-linecap="round"
      opacity="0.62"
    >
      <path d="M 18 124 C 38 108 58 140 78 124 C 98 108 118 140 138 124" />
      <path d="M 18 136 C 38 120 58 152 78 136 C 98 120 118 152 138 136" />
    </g>
    <g
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.4"
      stroke-dasharray="4 5"
      opacity="0.45"
    >
      <path d="M 150 130 C 156 108 168 96 186 90" />
      <path d="M 152 108 C 162 92 176 84 194 82" />
    </g>
    <circle cx="78" cy="130" r="3" fill="var(--c-accent-2)" />
  </svg>
</template>
