<template>
  <!-- 第 9 页右图（减速）：v₁ 长、v₂ 短且同向，Δv 与 v 反向 -->
  <svg viewBox="40 22 268 134" style="width: 100%; max-width: 400px; height: auto">
    <line x1="52" y1="56" x2="253" y2="56" stroke="var(--c-accent)" stroke-width="4.6" stroke-linecap="round" />
    <path d="M 260 56 L 246 48 L 246 64 Z" fill="var(--c-accent)" />
    <line x1="52" y1="84" x2="141" y2="84" stroke="var(--c-velocity)" stroke-width="4.6" stroke-linecap="round" />
    <path d="M 148 84 L 134 76 L 134 92 Z" fill="var(--c-velocity)" />
    <line x1="52" y1="56" x2="52" y2="84" stroke="color-mix(in srgb, var(--c-text-dim) 55%, transparent)" stroke-width="1.3" stroke-dasharray="4 4" />
    <line x1="260" y1="56" x2="260" y2="124" stroke="color-mix(in srgb, var(--c-accent) 50%, transparent)" stroke-width="1.3" stroke-dasharray="5 4" />
    <line x1="148" y1="84" x2="148" y2="124" stroke="color-mix(in srgb, var(--c-velocity) 50%, transparent)" stroke-width="1.3" stroke-dasharray="5 4" />
    <line x1="260" y1="124" x2="155" y2="124" stroke="var(--c-physics)" stroke-width="4.6" stroke-linecap="round" />
    <path d="M 148 124 L 162 116 L 162 132 Z" fill="var(--c-physics)" />
    <text x="100" y="44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 19px" fill="var(--c-accent)">v₁</text>
    <text x="100" y="74" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 19px" fill="var(--c-velocity)">v₂</text>
    <text x="204" y="150" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size: 19px" fill="var(--c-physics)">Δv</text>
  </svg>
</template>
