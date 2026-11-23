<!-- 4.5 光的衍射：衍射光栅（多缝使条纹变窄、变亮） -->
<template>
  <svg viewBox="0 0 560 200" width="560" xmlns="http://www.w3.org/2000/svg">
    <line v-for="y in waveY" :key="y" x1="20" :y1="y" x2="150" :y2="y" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <rect x="178" y="18" width="96" height="164" rx="5" fill="var(--c-neutral-700)" stroke="var(--c-neutral-300)" stroke-width="1" />
    <line v-for="x in slitX" :key="x" :x1="x" y1="30" :x2="x" y2="170" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.85" />
    <rect x="430" y="18" width="94" height="164" rx="5" fill="var(--c-neutral-900)" stroke="var(--c-border)" stroke-width="1" />
    <line v-for="x in brightX" :key="x" :x1="x" y1="34" :x2="x" y2="166" stroke="var(--c-accent)" stroke-width="3" opacity="0.9" />
    <line v-for="x in faintX" :key="'f' + x" :x1="x" y1="48" :x2="x" y2="152" stroke="var(--c-accent-2)" stroke-width="1.4" opacity="0.45" />
    <text x="226" y="198" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">光栅</text>
    <text x="477" y="198" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">屏</text>
    <text x="24" y="26" fill="var(--c-text-mute)" font-size="11">平行光</text>
  </svg>
</template>

<script setup lang="ts">
const waveY = [38, 62, 86, 110, 134, 158, 182];
const slitX = [190, 202, 214, 226, 238, 250, 262];
const brightX = [452, 477, 502];
const faintX = [440, 464, 489, 514];
</script>
