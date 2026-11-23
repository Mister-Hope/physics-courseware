<script setup lang="ts">
// 封面装饰：共振曲线（尖峰）与单摆
</script>

<template>
  <svg viewBox="0 0 260 180" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="18" y1="150" x2="242" y2="150" stroke="var(--c-line)" stroke-width="1.4" stroke-dasharray="5 5" />
    <path d="M 18 150 C 56 149 90 144 116 118 C 132 102 140 58 150 44 C 160 58 168 102 184 118 C 210 144 230 149 242 150" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" opacity="0.9" />
    <circle cx="150" cy="44" r="5" fill="var(--c-accent)" />
    <line x1="20" y1="30" x2="76" y2="30" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-linecap="round" />
    <line x1="48" y1="30" x2="48" y2="112" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <circle cx="48" cy="119" r="7" fill="var(--c-accent-2)" />
    <path d="M 48 119 A 26 26 0 0 1 73 107" fill="none" stroke="var(--c-accent-2)" stroke-width="1.4" stroke-dasharray="3 4" opacity="0.6" />
    <path d="M 48 119 A 26 26 0 0 0 23 107" fill="none" stroke="var(--c-accent-2)" stroke-width="1.4" stroke-dasharray="3 4" opacity="0.6" />
  </svg>
</template>
