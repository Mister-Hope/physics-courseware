<!-- 第 6 页：电源的内阻——把电源看成"电动势 E 与内阻 r 串联"，虚线框内是内电路 -->
<template>
  <svg viewBox="0 0 640 280" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M120 80 H356" />
      <path d="M404 80 H600" />
      <path d="M600 80 V230" />
      <path d="M600 230 H120" />
      <path d="M120 80 V102" />
      <path d="M120 118 V136" />
      <path d="M120 184 V230" />
    </g>
    <rect x="44" y="60" width="152" height="160" rx="14" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.9" />
    <text x="120" y="48" text-anchor="middle" font-size="18" fill="var(--c-physics)">电源</text>
    <CircuitBattery :x="120" :y="110" orientation="vertical" polarity emf="E" />
    <CircuitResistor :x="120" :y="160" orientation="vertical" label="r" />
    <CircuitResistor :x="380" :y="80" label="R" />
    <CourseArrow :from="{ x: 470, y: 88 }" :to="{ x: 550, y: 88 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" />
    <CourseArrow :from="{ x: 120, y: 216 }" :to="{ x: 120, y: 196 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <CourseArrow :from="{ x: 360, y: 238 }" :to="{ x: 290, y: 238 }" stroke="var(--c-accent)" :stroke-width="2.4" />
  </svg>
</template>
