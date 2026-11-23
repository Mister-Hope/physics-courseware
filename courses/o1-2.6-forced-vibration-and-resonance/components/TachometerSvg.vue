<script setup lang="ts">
// 转速计：不同长度的钢片与机器接触，固有频率与转速一致的钢片共振
const { step = 0 } = defineProps<{ step?: number }>();

const strips = [
  { x: 290, len: 112, amp: 2 },
  { x: 345, len: 94, amp: 4 },
  { x: 400, len: 76, amp: 18, active: true },
  { x: 455, len: 58, amp: 3 },
  { x: 510, len: 40, amp: 1 },
];
</script>

<template>
  <svg viewBox="0 0 760 240" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="60" y1="200" x2="700" y2="200" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-linecap="round" />
    <rect x="80" y="118" width="110" height="82" rx="8" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <circle cx="135" cy="200" r="13" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2" />
    <circle cx="135" cy="200" r="4" fill="var(--c-accent)" />
    <path d="M 112 188 A 22 22 0 0 1 136 177" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
    <polygon points="136,177 128,179 132,185" fill="var(--c-accent)" />
    <g v-for="s in strips" :key="s.x">
      <line :x1="s.x" y1="200" :x2="s.x" :y2="200 - s.len" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="3 4" opacity="0.45" />
      <line :x1="s.x" y1="200" :x2="s.x + (step >= 1 && s.active ? s.amp : 0)" :y2="200 - s.len" :stroke="s.active ? 'var(--c-accent)' : 'var(--c-text-dim)'" :stroke-width="s.active ? 7 : 6" stroke-linecap="round" />
    </g>
    <text x="135" y="228" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">机器</text>
    <text x="430" y="228" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">不同长度的钢片</text>
  </svg>
</template>
