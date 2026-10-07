<template>
  <!-- 皮带传动方式二：下方张紧；包角弧线随第 3 步出现 -->
  <svg viewBox="0 0 380 180" class="fig-svg fig-fill" xmlns="http://www.w3.org/2000/svg">
    <circle cx="96" cy="102" r="30" fill="rgba(45,212,191,0.1)" stroke="var(--c-physics)" stroke-width="2.2" />
    <circle cx="284" cy="102" r="42" fill="rgba(96,165,250,0.1)" stroke="var(--c-accent-2)" stroke-width="2.4" />
    <path d="M 94.1 131.9 L 281.3 143.9" stroke="var(--c-accent)" stroke-width="3.2" fill="none" stroke-linecap="round" />
    <path d="M 130 128.2 L 238 135.2" stroke="var(--c-accent)" stroke-width="1.4" fill="none" opacity="0.55" stroke-linecap="round" />
    <path d="M 108.2 74.6 Q 188 109 266.9 63.6" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-dasharray="9 4" />
    <path d="M 94.1 131.9 A 30 30 0 1 1 108.2 74.6" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <path d="M 266.9 63.6 A 42 42 0 1 1 281.3 143.9" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <g v-click="3">
      <path d="M 94.7 123 A 21 21 0 1 1 104.5 82.8" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      <text x="58" y="106" text-anchor="end" font-size="12" fill="var(--c-accent)">包角</text>
    </g>
    <path d="M 284 78 A 24 24 0 0 0 260.4 97.5" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <polygon points="255.4,96 265.4,96 260.4,107" fill="var(--c-accent)" />
    <text x="96" y="168" text-anchor="middle" font-size="13" fill="var(--c-physics)">从动轮</text>
    <text x="284" y="168" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">主动轮</text>
  </svg>
</template>
