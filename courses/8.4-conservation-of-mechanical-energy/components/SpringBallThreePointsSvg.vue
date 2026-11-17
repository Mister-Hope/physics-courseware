<template>
  <!-- 第 16 页练习：竖直弹簧把小球从压缩位置 A 经原长位置 B 弹到最高点 C -->
  <svg width="220" height="340" viewBox="0 0 220 340" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto">
    <line x1="20" y1="310" x2="200" y2="310" stroke="var(--c-neutral-500)" stroke-width="3" />
    <SurfaceHatch :from="{ x: 24, y: 310 }" :to="{ x: 196, y: 310 }" side="below" :thickness="12" :gap="20" />
    <line x1="110" y1="80" x2="110" y2="310" stroke="var(--c-neutral-500)" stroke-width="1.4" stroke-dasharray="6 7" opacity="0.3" />
    <path
      d="M 110 310 L 94 303 L 126 296 L 94 289 L 126 282 L 94 275 L 126 268 L 94 261 L 110 252"
      stroke="var(--c-text-dim)"
      stroke-width="2.4"
      stroke-linejoin="round"
    />
    <line x1="64" y1="252" x2="156" y2="252" stroke="var(--c-neutral-500)" stroke-width="1.4" stroke-dasharray="5 6" opacity="0.35" />
    <circle cx="110" cy="240" r="12" fill="var(--c-accent)" fill-opacity="0.3" stroke="var(--c-accent)" stroke-width="3" />
    <circle cx="110" cy="200" r="12" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="4 4" />
    <circle cx="110" cy="120" r="12" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="4 4" />
    <text x="128" y="245" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">A</text>
    <text x="128" y="205" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">B</text>
    <text x="128" y="125" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">C</text>
    <text x="110" y="180" font-size="11" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">原长</text>
  </svg>
</template>
