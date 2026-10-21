<script setup lang="ts">
/** 第 8 页例题第 (4) 问的答案图：匀强电场方向由 C 一侧指向 B 一侧，C、A、B 三点在同一条电场线上，φ_C > φ_A > φ_B。 */
</script>

<template>
  <svg viewBox="0 0 360 230" width="360" height="230">
    <line x1="18" y1="70" x2="342" y2="70" stroke="var(--c-field)" stroke-width="1.8" opacity="0.4" />
    <line x1="18" y1="125" x2="342" y2="125" stroke="var(--c-field)" stroke-width="1.8" opacity="0.4" />
    <line x1="18" y1="180" x2="342" y2="180" stroke="var(--c-field)" stroke-width="1.8" opacity="0.4" />
    <CourseArrow :from="{ x: 236, y: 70 }" :to="{ x: 300, y: 70 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.85" />
    <CourseArrow :from="{ x: 236, y: 125 }" :to="{ x: 300, y: 125 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.85" />
    <CourseArrow :from="{ x: 236, y: 180 }" :to="{ x: 300, y: 180 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.85" />
    <circle cx="58" cy="125" r="6" fill="var(--c-accent)" />
    <text x="58" y="101" text-anchor="middle" fill="var(--c-text)" font-size="16" font-style="italic" font-family="KaTeX_Math">C</text>
    <circle cx="212" cy="125" r="6" fill="var(--c-neutral-200)" />
    <text x="212" y="101" text-anchor="middle" fill="var(--c-text)" font-size="16" font-style="italic" font-family="KaTeX_Math">A</text>
    <circle cx="318" cy="125" r="6" fill="var(--c-accent-2)" />
    <text x="318" y="101" text-anchor="middle" fill="var(--c-text)" font-size="16" font-style="italic" font-family="KaTeX_Math">B</text>
    <line x1="58" y1="136" x2="58" y2="152" stroke="var(--c-accent)" stroke-width="1" opacity="0.7" />
    <line x1="212" y1="136" x2="212" y2="152" stroke="var(--c-neutral-500)" stroke-width="1" opacity="0.7" />
    <line x1="318" y1="136" x2="318" y2="152" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.7" />
    <line x1="58" y1="152" x2="212" y2="152" stroke="var(--c-neutral-500)" stroke-width="1" stroke-dasharray="4 4" opacity="0.8" />
    <line x1="212" y1="152" x2="318" y2="152" stroke="var(--c-neutral-500)" stroke-width="1" stroke-dasharray="4 4" opacity="0.8" />
    <text x="152" y="212" text-anchor="middle" fill="var(--c-text-dim)" font-size="13" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="9" dy="2">C</tspan>
      <tspan dx="2" font-family="KaTeX_Main" font-style="normal">最高</tspan>
    </text>
    <text x="290" y="212" text-anchor="middle" fill="var(--c-text-dim)" font-size="13" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="9" dy="2">B</tspan>
      <tspan dx="2" font-family="KaTeX_Main" font-style="normal">最低</tspan>
    </text>
    <text x="248" y="46" text-anchor="middle" fill="var(--c-field)" font-size="14" font-style="italic" font-family="KaTeX_Math">E</text>
  </svg>
</template>
