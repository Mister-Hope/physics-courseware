<template>
  <!-- 第 7 页（现实中的机械能损失）：物体沿斜面下滑所受的三个力——重力 G、支持力 F_N（垂直于运动方向、
       不做功）、阻力 F_f（沿斜面向上、做负功）。三个力都从物块的几何中心出发。 -->
  <svg class="fig-incline-force" viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="234" x2="780" y2="234" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
    <SurfaceHatch :from="{ x: 60, y: 234 }" :to="{ x: 780, y: 234 }" side="below" :thickness="14" :gap="24" />
    <line x1="140" y1="234" x2="660" y2="114" stroke="var(--c-neutral-300)" stroke-width="4" stroke-linecap="round" />
    <path d="M 246 234 A 106 106 0 0 0 243 210" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="256" y="224" font-size="16" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">θ</text>
    <g transform="rotate(-13 423 151)">
      <rect x="399" y="133" width="48" height="26" rx="4" fill="var(--c-accent)" fill-opacity="0.18" stroke="var(--c-accent)" stroke-width="2.6" />
    </g>
    <CourseArrow :from="{ x: 423, y: 151 }" :to="{ x: 423, y: 205 }" stroke="var(--c-danger)" :stroke-width="3" />
    <text x="434" y="186" font-size="16" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">G</text>
    <CourseArrow :from="{ x: 423, y: 151 }" :to="{ x: 411, y: 101 }" stroke="var(--c-accent-2)" :stroke-width="3" />
    <text x="392" y="106" font-size="16" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-size="11" dy="3">N</tspan>
    </text>
    <CourseArrow :from="{ x: 423, y: 151 }" :to="{ x: 376, y: 162 }" stroke="var(--c-physics)" :stroke-width="3" />
    <text x="338" y="150" font-size="16" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-size="11" dy="3">f</tspan>
    </text>
  </svg>
</template>

<style scoped>
.fig-incline-force {
  display: block;
  width: 100%;
  height: auto;
}
</style>
