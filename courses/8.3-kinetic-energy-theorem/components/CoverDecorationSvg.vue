<template>
  <!-- 第 1 页封面装饰：水平面上被恒力 F 加速的物块——速度由 v₁ 增到 v₂，动能随之增大 -->
  <svg viewBox="0 0 360 180" width="340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="水平面上被恒力加速的物块与两个速度箭头">
    <SurfaceHatch :from="{ x: 24, y: 134 }" :to="{ x: 336, y: 134 }" side="below" :thickness="12" :gap="20" color="var(--c-text-dim)" :line-width="2" />
    <path d="M 24 60 C 96 34 236 34 330 62" fill="none" stroke="var(--c-accent)" stroke-opacity="0.35" stroke-width="1.6" stroke-dasharray="7 7" />
    <rect x="70" y="96" width="62" height="38" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-accent)" stroke-width="2" />
    <text x="101" y="121" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-text)" text-anchor="middle">m</text>
    <CourseArrow :from="{ x: 101, y: 115 }" :to="{ x: 190, y: 115 }" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dy="-10" />
    <CourseArrow :from="{ x: 70, y: 72 }" :to="{ x: 130, y: 72 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text
      x="100"
      y="58"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      fill="var(--c-velocity)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      <tspan>v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="11">1</tspan>
    </text>
    <CourseArrow :from="{ x: 214, y: 72 }" :to="{ x: 306, y: 72 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text
      x="260"
      y="58"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      fill="var(--c-velocity)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      <tspan>v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="11">2</tspan>
    </text>
    <text x="288" y="154" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)" text-anchor="middle">
      <tspan>E</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="12">k</tspan>
    </text>
  </svg>
</template>
