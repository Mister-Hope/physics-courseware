<!-- 第 16 页练习图：M、N 在同一条电场线上，P 在过 M 且与电场线垂直的直线 AB 上 -->
<script setup lang="ts">
defineProps<{
  /** 已叠加的分析步数：1 = M→N 的静电力，2 = M→P 的位移与直角关系 */
  step?: number;
}>();
</script>

<template>
  <svg
    viewBox="0 0 380 240"
    width="350"
    height="221"
    xmlns="http://www.w3.org/2000/svg"
    font-family="Inter, system-ui, sans-serif"
    role="img"
    aria-label="匀强电场中 M、N 在同一条电场线上，P 在过 M 且垂直于电场线的直线上"
  >
    <CourseArrow v-for="y in [52, 120, 188]" :key="y" :from="{ x: 32, y }" :to="{ x: 344, y }" stroke="var(--c-field)" stroke-width="1.4" opacity="0.45" />
    <text x="356" y="48" text-anchor="end" fill="var(--c-accent)" font-size="19" font-style="italic" font-family="KaTeX_Math">E</text>
    <line x1="140" y1="44" x2="140" y2="196" stroke="var(--c-neutral-300)" stroke-width="1.6" opacity="0.8" />
    <text x="140" y="34" text-anchor="middle" fill="var(--c-text-dim)" font-size="18" font-family="KaTeX_Math" font-style="italic">A</text>
    <text x="140" y="216" text-anchor="middle" fill="var(--c-text-dim)" font-size="18" font-family="KaTeX_Math" font-style="italic">B</text>
    <circle cx="140" cy="120" r="4.5" fill="var(--c-accent)" />
    <circle cx="300" cy="120" r="4.5" fill="var(--c-accent)" />
    <circle cx="140" cy="80" r="4.5" fill="var(--c-accent)" />
    <text x="150" y="78" fill="var(--c-accent)" font-size="19" font-family="KaTeX_Math" font-style="italic">P</text>
    <text x="128" y="126" text-anchor="end" fill="var(--c-accent)" font-size="19" font-family="KaTeX_Math" font-style="italic">M</text>
    <text x="300" y="142" text-anchor="middle" fill="var(--c-accent)" font-size="19" font-family="KaTeX_Math" font-style="italic">N</text>
    <g v-if="(step ?? 0) >= 1">
      <CourseArrow :from="{ x: 140, y: 120 }" :to="{ x: 212, y: 120 }" stroke="var(--c-force)" stroke-width="2.8" />
      <text
        x="178"
        y="108"
        text-anchor="middle"
        fill="var(--c-force)"
        font-size="18"
        font-family="KaTeX_Math"
        font-style="italic"
        stroke="var(--c-bg)"
        stroke-width="3"
        paint-order="stroke"
      >
        F
      </text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <CourseArrow :from="{ x: 140, y: 112 }" :to="{ x: 140, y: 84 }" stroke="var(--c-velocity)" stroke-width="2.4" stroke-dasharray="5 4" />
      <path d="M 140 110 L 150 110 L 150 120" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" />
    </g>
  </svg>
</template>
