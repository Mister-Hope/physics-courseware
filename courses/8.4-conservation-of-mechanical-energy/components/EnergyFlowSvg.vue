<template>
  <!-- 第 18 页（小结）：动能与势能的双向转化——重力（或弹力）做正功时势能转化为动能，
       做负功时动能转化为势能；只有重力或系统内弹力做功时，两者之和不变。 -->
  <svg class="fig-energy-flow" viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="60" width="240" height="110" rx="18" fill="var(--c-accent-2)" fill-opacity="0.12" stroke="var(--c-accent-2)" stroke-width="2.6" />
    <text x="180" y="112" font-size="20" fill="var(--c-accent-2)" font-family="system-ui" text-anchor="middle">动能</text>
    <text x="180" y="146" font-size="20" fill="var(--c-accent-2)" font-family="KaTeX_Main" text-anchor="middle">
      E<tspan font-size="14" dy="4">k</tspan>
    </text>
    <rect x="520" y="60" width="240" height="110" rx="18" fill="var(--c-ok)" fill-opacity="0.12" stroke="var(--c-ok)" stroke-width="2.6" />
    <text x="640" y="112" font-size="20" fill="var(--c-ok)" font-family="system-ui" text-anchor="middle">势能</text>
    <text x="640" y="146" font-size="20" fill="var(--c-ok)" font-family="KaTeX_Main" text-anchor="middle">
      E<tspan font-size="14" dy="4">p</tspan>
    </text>
    <CourseArrow :from="{ x: 316, y: 84 }" :to="{ x: 504, y: 84 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <text x="410" y="70" font-size="16" fill="var(--c-accent)" font-family="system-ui" text-anchor="middle">重力或弹力做正功</text>
    <CourseArrow :from="{ x: 504, y: 146 }" :to="{ x: 316, y: 146 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <text x="410" y="176" font-size="16" fill="var(--c-accent)" font-family="system-ui" text-anchor="middle">重力或弹力做负功</text>
    <line x1="60" y1="206" x2="760" y2="206" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="8 6" opacity="0.5" />
    <text x="410" y="226" font-size="16" fill="var(--c-accent)" font-family="system-ui" text-anchor="middle">
      只有重力或系统内弹力做功时，两者之和保持不变
    </text>
  </svg>
</template>

<style scoped>
.fig-energy-flow {
  display: block;
  width: 100%;
  height: auto;
}
</style>
