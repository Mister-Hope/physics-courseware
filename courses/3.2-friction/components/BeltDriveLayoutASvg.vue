<template>
  <!-- 皮带传动方式一：上方张紧；包角弧线随第 3 步出现 -->
  <svg viewBox="0 0 380 180" class="fig-svg fig-fill" xmlns="http://www.w3.org/2000/svg">
    <circle cx="96" cy="102" r="42" fill="rgba(96,165,250,0.1)" stroke="var(--c-accent-2)" stroke-width="2.4" />
    <circle cx="284" cy="102" r="30" fill="rgba(45,212,191,0.1)" stroke="var(--c-physics)" stroke-width="2.2" />
    <path d="M 98.7 60.1 L 285.9 72.1" stroke="var(--c-accent)" stroke-width="3.2" fill="none" stroke-linecap="round" />
    <path d="M 142 66.8 L 250 73.8" stroke="var(--c-accent)" stroke-width="1.4" fill="none" opacity="0.55" stroke-linecap="round" />
    <path d="M 86 142.8 Q 190 166 293 130.6" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-dasharray="9 4" />
    <path d="M 86 142.8 A 42 42 0 0 1 98.7 60.1" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <path d="M 285.9 72.1 A 30 30 0 0 1 293 130.6" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <g v-click="3">
      <path d="M 285.3 81 A 21 21 0 0 1 290.3 122" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      <text x="320" y="106" font-size="12" fill="var(--c-accent)">包角</text>
    </g>
    <path d="M 96 78 A 24 24 0 0 0 72.4 97.5" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <polygon points="67.4,96 77.4,96 72.4,107" fill="var(--c-accent)" />
    <text x="96" y="168" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">主动轮</text>
    <text x="284" y="168" text-anchor="middle" font-size="13" fill="var(--c-physics)">从动轮</text>
  </svg>
</template>
