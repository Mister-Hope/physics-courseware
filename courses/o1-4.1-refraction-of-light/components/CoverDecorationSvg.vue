<!-- 4.1 光的折射封面装饰：空气—水的界面，入射光线折射后偏折 -->
<template>
  <svg viewBox="0 0 320 200" width="320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="cover-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2dd4bf" stop-opacity="0.22" />
        <stop offset="1" stop-color="#0c1122" stop-opacity="0.08" />
      </linearGradient>
    </defs>
    <rect x="0" y="108" width="320" height="92" fill="url(#cover-water)" />
    <line x1="0" y1="108" x2="320" y2="108" stroke="var(--c-neutral-300)" stroke-width="1.4" opacity="0.55" />
    <line x1="190" y1="18" x2="190" y2="108" stroke="var(--c-text-mute)" stroke-width="1.1" stroke-dasharray="4 5" opacity="0.55" />
    <line x1="190" y1="108" x2="190" y2="192" stroke="var(--c-text-mute)" stroke-width="1.1" stroke-dasharray="4 5" opacity="0.55" />
    <path d="M 66 30 L 190 108" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 190 108 L 244 178" fill="none" stroke="var(--c-accent-2)" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="66" cy="30" r="4" fill="var(--c-accent)" />
    <circle cx="190" cy="108" r="4" fill="var(--c-text)" />
    <circle cx="244" cy="178" r="4" fill="var(--c-accent-2)" />
    <path d="M 190 108 L 152 150 L 166 166 Z" fill="var(--c-accent-2)" opacity="0.85" />
    <circle cx="168" cy="156" r="2.2" fill="var(--c-surface-solid)" />
    <path d="M 28 134 q 14 -7 28 0 t 28 0" fill="none" stroke="var(--c-accent-2)" stroke-width="1.2" opacity="0.45" />
    <path d="M 238 134 q 14 -7 28 0 t 28 0" fill="none" stroke="var(--c-accent-2)" stroke-width="1.2" opacity="0.35" />
    <path d="M 34 166 q 18 -8 36 0 t 36 0" fill="none" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.28" />
  </svg>
</template>
