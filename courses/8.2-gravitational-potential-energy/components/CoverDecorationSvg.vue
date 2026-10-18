<template>
  <!-- 封面装饰：物体从高处沿轨迹落到低处的示意（等高虚线 + 两个小球） -->
  <svg viewBox="0 0 320 200" width="320" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="物体从高处沿轨迹下落到低处的示意">
    <line x1="30" y1="44" x2="292" y2="44" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="7 6" opacity="0.4" />
    <line x1="30" y1="160" x2="292" y2="160" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="7 6" opacity="0.7" />
    <path
      d="M 30 160 C 96 160 108 44 176 44 C 228 44 252 108 292 108"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.6"
      stroke-linecap="round"
      opacity="0.75"
    />
    <circle cx="176" cy="44" r="7" fill="var(--c-accent)" />
    <circle cx="292" cy="108" r="7" fill="var(--c-velocity)" />
  </svg>
</template>
