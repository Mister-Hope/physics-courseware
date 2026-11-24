<!-- 封面装饰：分子与分子势能曲线 -->
<template>
  <svg viewBox="0 0 320 200" width="320" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="26" y1="150" x2="294" y2="150" stroke="var(--c-neutral-600)" stroke-width="1.2" opacity="0.7" />
    <path
      d="M 38 66 C 86 66 88 116 132 116 C 168 116 166 72 206 72 C 238 72 252 96 286 96"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <line x1="132" y1="84" x2="132" y2="150" stroke="var(--c-accent-2)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.7" />
    <circle cx="76" cy="42" r="12" fill="var(--c-physics)" opacity="0.85" />
    <circle cx="106" cy="64" r="8" fill="var(--c-accent-2)" opacity="0.8" />
    <circle cx="224" cy="42" r="9" fill="var(--c-accent)" opacity="0.8" />
    <circle cx="132" cy="116" r="5" fill="var(--c-accent)" />
    <text x="132" y="168" fill="var(--c-text-mute)" font-size="10" font-family="KaTeX_Math" font-style="italic" text-anchor="middle">r0</text>
    <text x="56" y="126" fill="var(--c-text-mute)" font-size="10" font-family="sans-serif">分子</text>
  </svg>
</template>
