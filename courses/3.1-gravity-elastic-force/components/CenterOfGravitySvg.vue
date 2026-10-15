<template>
  <!-- 第 5 页：细直棒、均匀球、圆柱的重心位置 -->
  <svg class="fig" viewBox="0 0 620 170" style="max-width: 26rem" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="30"
      y="70"
      width="150"
      height="26"
      rx="4"
      fill="color-mix(in srgb, var(--c-text-dim) 20%, transparent)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.4"
    />
    <line x1="105" y1="52" x2="105" y2="114" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 4" />
    <circle cx="105" cy="83" r="6" fill="var(--c-force)" />
    <circle cx="275" cy="83" r="40" fill="color-mix(in srgb, var(--c-text-dim) 20%, transparent)" stroke="var(--c-neutral-300)" stroke-width="2.4" />
    <line x1="275" y1="34" x2="275" y2="132" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 4" />
    <circle cx="275" cy="83" r="6" fill="var(--c-force)" />
    <path
      d="M 424 56 L 424 112 A 30 10 0 0 0 484 112 L 484 56"
      fill="color-mix(in srgb, var(--c-text-dim) 20%, transparent)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.4"
    />
    <ellipse cx="454" cy="56" rx="30" ry="10" fill="color-mix(in srgb, var(--c-text-dim) 30%, transparent)" stroke="var(--c-neutral-300)" stroke-width="2.4" />
    <line x1="454" y1="26" x2="454" y2="140" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 4" />
    <circle cx="454" cy="84" r="6" fill="var(--c-force)" />
    <text x="105" y="158" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">细直棒 · 中点</text>
    <text x="275" y="158" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">均匀球 · 球心</text>
    <text x="454" y="158" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">圆柱 · 轴线中点</text>
  </svg>
</template>
