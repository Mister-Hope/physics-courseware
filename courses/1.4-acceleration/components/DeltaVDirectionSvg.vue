<template>
  <!-- 第 8 页：速度变化量 Δv 的作图——v₁、v₂ 起点相同，Δv 由 v₁ 箭头端指向 v₂ 箭头端 -->
  <svg viewBox="40 22 268 134" style="width: 100%; max-width: 410px; height: auto">
    <line x1="52" y1="56" x2="141" y2="56" stroke="var(--c-accent)" stroke-width="4.6" stroke-linecap="round" />
    <path d="M 148 56 L 134 48 L 134 64 Z" fill="var(--c-accent)" />
    <line x1="52" y1="84" x2="253" y2="84" stroke="var(--c-velocity)" stroke-width="4.6" stroke-linecap="round" />
    <path d="M 260 84 L 246 76 L 246 92 Z" fill="var(--c-velocity)" />
    <line x1="52" y1="56" x2="52" y2="84" stroke="color-mix(in srgb, var(--c-text-dim) 55%, transparent)" stroke-width="1.3" stroke-dasharray="4 4" />
    <line x1="148" y1="56" x2="148" y2="124" stroke="color-mix(in srgb, var(--c-accent) 50%, transparent)" stroke-width="1.3" stroke-dasharray="5 4" />
    <line x1="260" y1="84" x2="260" y2="124" stroke="color-mix(in srgb, var(--c-velocity) 50%, transparent)" stroke-width="1.3" stroke-dasharray="5 4" />
    <line x1="148" y1="124" x2="253" y2="124" stroke="var(--c-physics)" stroke-width="4.6" stroke-linecap="round" />
    <path d="M 260 124 L 246 116 L 246 132 Z" fill="var(--c-physics)" />
    <text x="100" y="44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 19px" fill="var(--c-accent)">v₁</text>
    <text x="100" y="74" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 19px" fill="var(--c-velocity)">v₂</text>
    <text x="204" y="150" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 19px" fill="var(--c-physics)">Δv</text>
  </svg>
</template>
