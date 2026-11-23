<!-- 4.5 光的衍射：三角形孔的衍射（大孔时仍是三角形光斑） -->
<template>
  <svg viewBox="0 0 420 220" width="420" xmlns="http://www.w3.org/2000/svg">
    <line v-for="y in waveY" :key="y" x1="20" :y1="y" x2="142" :y2="y" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <rect x="146" y="16" width="12" height="188" rx="2" fill="var(--c-neutral-600)" stroke="var(--c-neutral-300)" stroke-width="0.9" />
    <path d="M 146 74 L 158 110 L 146 146 Z" fill="var(--c-accent)" opacity="0.9" />
    <line x1="158" y1="110" x2="338" y2="110" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.7" />
    <line x1="158" y1="92" x2="338" y2="82" stroke="var(--c-accent)" stroke-width="1" opacity="0.45" />
    <line x1="158" y1="128" x2="338" y2="138" stroke="var(--c-accent)" stroke-width="1" opacity="0.45" />
    <rect x="338" y="24" width="58" height="172" rx="4" fill="var(--c-neutral-900)" stroke="var(--c-border)" stroke-width="1" />
    <path d="M 350 78 L 382 110 L 350 142 Z" fill="var(--c-accent)" opacity="0.65" />
    <text x="152" y="212" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">三角形孔</text>
    <text x="367" y="212" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">屏</text>
  </svg>
</template>

<script setup lang="ts">
const waveY = [44, 64, 84, 104, 124, 144, 164];
</script>
