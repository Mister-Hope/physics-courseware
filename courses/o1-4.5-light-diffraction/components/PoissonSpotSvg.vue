<!-- 4.5 光的衍射：泊松亮斑（不透明圆盘影中心的亮斑） -->
<template>
  <svg viewBox="0 0 420 220" width="420" xmlns="http://www.w3.org/2000/svg">
    <line v-for="y in waveY" :key="y" x1="20" :y1="y" x2="142" :y2="y" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <circle cx="170" cy="110" r="20" fill="var(--c-neutral-500)" stroke="var(--c-text)" stroke-width="1.2" />
    <line x1="190" y1="92" x2="338" y2="66" stroke="var(--c-accent)" stroke-width="1.2" opacity="0.55" />
    <line x1="190" y1="128" x2="338" y2="154" stroke="var(--c-accent)" stroke-width="1.2" opacity="0.55" />
    <line x1="190" y1="110" x2="338" y2="110" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.75" />
    <rect x="338" y="24" width="58" height="172" rx="4" fill="var(--c-neutral-900)" stroke="var(--c-border)" stroke-width="1" />
    <circle cx="367" cy="110" r="34" fill="var(--c-neutral-900)" stroke="var(--c-text-mute)" stroke-width="0.9" opacity="0.9" />
    <circle cx="367" cy="110" r="5" fill="var(--c-accent)" />
    <circle cx="367" cy="110" r="42" fill="none" stroke="var(--c-accent)" stroke-width="0.8" opacity="0.35" />
    <circle cx="367" cy="110" r="50" fill="none" stroke="var(--c-accent-2)" stroke-width="0.8" opacity="0.22" />
    <text x="170" y="152" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">不透明圆盘</text>
    <text x="367" y="212" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">影中心亮斑</text>
  </svg>
</template>

<script setup lang="ts">
const waveY = [44, 62, 80, 98, 116, 134, 152, 170];
</script>
