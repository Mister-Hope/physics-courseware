<template>
  <svg viewBox="0 50 520 150" width="520" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 20, y: 158 }" :to="{ x: 500, y: 158 }" side="below" />
    <rect x="62" y="107" width="122" height="42" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="92" cy="145" r="13" fill="var(--c-neutral-700)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="154" cy="145" r="13" fill="var(--c-neutral-700)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <line x1="170" y1="111" x2="244" y2="92" stroke="var(--c-neutral-200)" stroke-width="13" stroke-linecap="round" />
    <line x1="236" y1="94" x2="250" y2="90" stroke="var(--c-accent)" stroke-width="15" stroke-linecap="round" />
    <circle cx="302" cy="88" r="9" fill="var(--c-accent)" />
    <text x="118" y="132" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">M</text>
    <text x="316" y="74" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)">m</text>
    <g v-if="showArrows">
      <CourseArrow :from="{ x: 316, y: 88 }" :to="{ x: 420, y: 88 }" stroke="var(--c-accent-2)" stroke-width="2.4" label="v" />
      <CourseArrow :from="{ x: 110, y: 176 }" :to="{ x: 28, y: 176 }" stroke="var(--c-accent)" stroke-width="2.4" label="V" :label-dy="16" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const { showArrows = false } = defineProps<{ showArrows?: boolean }>();
</script>
