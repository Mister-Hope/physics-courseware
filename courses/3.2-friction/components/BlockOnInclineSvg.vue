<template>
  <!-- 斜面上的物块：有下滑趋势，静摩擦力沿斜面向上 -->
  <svg viewBox="0 45 300 170" class="fig-svg fig-md" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,196 270,196 270,60" fill="rgba(148,163,184,0.1)" stroke="var(--c-text-dim)" stroke-width="2" />
    <g transform="translate(148,129.1) rotate(-29.54)">
      <rect x="-28" y="-22" width="56" height="22" rx="4" fill="rgba(226,168,70,0.18)" stroke="var(--c-accent)" stroke-width="2.2" />
    </g>
    <CourseArrow :from="{ x: 148, y: 129.1 }" :to="{ x: 195.9, y: 102 }" stroke="var(--c-accent)" stroke-width="3.4" />
    <CourseArrow :from="{ x: 142.6, y: 119.6 }" :to="{ x: 100.8, y: 143.3 }" stroke="var(--c-text-dim)" stroke-width="2.6" stroke-dasharray="8 5" />
    <text x="176" y="88" font-size="17" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="5" font-size="11">静</tspan>
    </text>
    <text x="26" y="166" font-size="14" fill="var(--c-text-dim)">相对运动趋势</text>
  </svg>
</template>
