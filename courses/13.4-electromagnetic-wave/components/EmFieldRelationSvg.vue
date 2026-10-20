<!-- 第 4 页：变化的磁场与变化的电场相互产生，形成统一的电磁场（只画关系，不画场线） -->
<template>
  <svg viewBox="0 0 860 200" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="60" width="300" height="80" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.6" />
    <text x="190" y="108" text-anchor="middle" font-size="18" fill="var(--c-text)">
      变化的磁场
      <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
    </text>
    <rect x="520" y="60" width="300" height="80" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.6" />
    <text x="670" y="108" text-anchor="middle" font-size="18" fill="var(--c-text)">
      变化的电场
      <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
    </text>
    <CourseArrow
      :from="{ x: 352, y: 88 }"
      :to="{ x: 508, y: 88 }"
      stroke="var(--c-accent)"
      stroke-width="2.6"
      label="产生"
      :label-dy="-12"
    />
    <CourseArrow
      :from="{ x: 508, y: 114 }"
      :to="{ x: 352, y: 114 }"
      stroke="var(--c-accent-2)"
      stroke-width="2.6"
      label="产生"
      :label-dy="20"
    />
  </svg>
</template>
