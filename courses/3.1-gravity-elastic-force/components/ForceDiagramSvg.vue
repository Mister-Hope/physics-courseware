<template>
  <!-- 第 2 页：力的图示——先定标度，再按标度画有向线段 -->
  <svg class="fig" viewBox="0 0 300 218" style="max-width: 14rem" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="106"
      y="140"
      width="64"
      height="46"
      rx="6"
      fill="color-mix(in srgb, var(--c-text-dim) 18%, transparent)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.6"
    />
    <CourseArrow :from="{ x: 138, y: 162 }" :to="{ x: 232, y: 108 }" stroke="var(--c-accent)" stroke-width="3.2" />
    <circle cx="138" cy="162" r="4.5" fill="var(--c-accent)" />
    <line x1="138" y1="162" x2="240" y2="162" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 4" />
    <line x1="46" y1="190" x2="82" y2="190" stroke="var(--c-velocity)" stroke-width="3.4" />
    <text x="64" y="206" text-anchor="middle" font-size="15" fill="var(--c-velocity)">10 N</text>
    <text x="188" y="158" font-family="KaTeX_Main" font-size="17" fill="var(--c-text-dim)">30°</text>
    <text x="222" y="100" text-anchor="middle" font-size="18" fill="var(--c-accent)" stroke="var(--c-bg-soft)" stroke-width="4" paint-order="stroke">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main">= 30 N</tspan>
    </text>
  </svg>
</template>
