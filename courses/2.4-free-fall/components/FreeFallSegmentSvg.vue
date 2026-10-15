<template>
  <!--
  第 24 页：起点 O → A（高 H）→ B（再落 h₀、用时 t₀）的竖直下落示意图。
  题目：物体自由下落，在 A、B 两点之间下落的高度是 h₀、所用时间是 t₀，求起点到 A 点的高度 H。
  布局（viewBox 260 × 340）：落体路径竖线 x = 150；O(42) / A(168) / B(312)；
  左侧尺寸箭头 x = 112（上面一段标 H、下面一段标 h₀）；右侧时间虚线 x = 196（只管 t₀）。
-->
  <svg viewBox="0 0 260 340" role="img" aria-label="自由下落分段示意图：起点 O 到 A 的高度是 H，A 到 B 再落 h₀、用时 t₀">
    <line x1="150" y1="50" x2="150" y2="312" stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)" stroke-width="1.6" stroke-dasharray="6 5" />
    <g stroke="color-mix(in srgb, var(--c-text-dim) 35%, transparent)" stroke-width="1">
      <line x1="98" y1="42" x2="202" y2="42" />
      <line x1="98" y1="168" x2="202" y2="168" />
      <line x1="98" y1="312" x2="204" y2="312" />
    </g>
    <CourseArrow :from="{ x: 150, y: 64 }" :to="{ x: 150, y: 96 }" stroke="var(--c-accent)" stroke-width="2.6" />
    <CourseArrow :from="{ x: 112, y: 105 }" :to="{ x: 112, y: 42 }" stroke="var(--c-accent)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 112, y: 105 }" :to="{ x: 112, y: 168 }" stroke="var(--c-accent)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 112, y: 240 }" :to="{ x: 112, y: 168 }" stroke="var(--c-physics)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 112, y: 240 }" :to="{ x: 112, y: 312 }" stroke="var(--c-physics)" stroke-width="2.2" />
    <line x1="196" y1="168" x2="196" y2="312" stroke="var(--c-velocity)" stroke-width="2" stroke-dasharray="6 5" />
    <circle cx="150" cy="42" r="9" fill="var(--c-accent)" />
    <circle cx="150" cy="168" r="5.5" fill="var(--c-accent)" />
    <circle cx="150" cy="312" r="5.5" fill="var(--c-physics)" />
    <text x="170" y="49" fill="var(--c-accent)" font-size="20" class="fig-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">O</tspan>
      <tspan dx="4" font-size="16">（起点）</tspan>
    </text>
    <text x="138" y="175" text-anchor="end" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic" class="fig-halo">A</text>
    <text x="138" y="319" text-anchor="end" fill="var(--c-physics)" font-size="20" font-family="KaTeX_Math" font-style="italic" class="fig-halo">B</text>
    <text x="100" y="110" text-anchor="end" fill="var(--c-accent)" font-size="28" font-family="KaTeX_Math" font-style="italic" class="fig-halo">H</text>
    <text x="100" y="248" text-anchor="end" fill="var(--c-physics)" font-size="22" class="fig-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan>
      <tspan font-family="KaTeX_Math" font-style="italic" font-size="16" dy="4">0</tspan>
    </text>
    <text x="206" y="248" fill="var(--c-velocity)" font-size="22" class="fig-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
      <tspan font-family="KaTeX_Math" font-style="italic" font-size="16" dy="4">0</tspan>
    </text>
  </svg>
</template>

<style scoped>
/* 图上文字压在虚线/辅助线上时加描边光晕 */
.fig-halo {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3px;
}
</style>
