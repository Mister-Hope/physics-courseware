<script setup lang="ts">
// 共振演示：横梁上挂 A–G 七个摆，D 为驱动摆，A、G 与 D 摆长相同
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const pendulums = computed(() => {
  const list = [
    { id: "A", x: 130, len: 170, amp: 30, bob: 9, color: "var(--c-accent)" },
    { id: "B", x: 240, len: 140, amp: 12, bob: 9, color: "var(--c-text-dim)" },
    { id: "C", x: 350, len: 110, amp: 4, bob: 9, color: "var(--c-text-dim)" },
    { id: "D", x: 460, len: 170, amp: 16, bob: 14, color: "var(--c-physics)" },
    { id: "E", x: 570, len: 200, amp: 3, bob: 9, color: "var(--c-text-dim)" },
    { id: "F", x: 680, len: 230, amp: 12, bob: 9, color: "var(--c-text-dim)" },
    { id: "G", x: 790, len: 170, amp: 30, bob: 9, color: "var(--c-accent)" },
  ];
  return list.map((p) => ({
    ...p,
    bx: p.x + (step >= 1 ? p.amp : 0),
    by: 58 + p.len,
  }));
});
</script>

<template>
  <svg viewBox="0 0 880 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="60" y1="18" x2="820" y2="18" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
    <line x1="100" y1="18" x2="100" y2="48" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="780" y1="18" x2="780" y2="48" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="60" y="48" width="760" height="10" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <g v-for="p in pendulums" :key="p.id">
      <line :x1="p.x" y1="58" :x2="p.bx" :y2="p.by" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <circle :cx="p.bx" :cy="p.by" :r="p.bob" :fill="p.color" />
      <text v-if="p.id === 'D'" :x="p.x" y="272" text-anchor="middle" font-size="11" fill="var(--c-physics)">驱动</text>
      <text :x="p.x" y="340" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" :fill="p.color">{{ p.id }}</text>
    </g>
  </svg>
</template>
