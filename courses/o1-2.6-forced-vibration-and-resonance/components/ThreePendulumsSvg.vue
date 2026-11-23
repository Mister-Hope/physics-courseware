<script setup lang="ts">
// Q2 三个摆：同一根张紧的水平绳上挂 A、B、C，B 靠近 A 但摆长不同，C 远离 A 但与 A 等长
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const pendulums = computed(() => {
  const list = [
    { id: "A", x: 180, len: 160, amp: step >= 2 ? 22 : 18, color: "var(--c-accent)" },
    { id: "B", x: 300, len: 110, amp: 4, color: "var(--c-text-dim)" },
    { id: "C", x: 560, len: 160, amp: 26, color: "var(--c-physics)" },
  ];
  return list.map((p) => ({
    id: p.id,
    x: p.x,
    len: p.len,
    amp: p.amp,
    color: p.color,
    bx: p.x + (step >= 1 ? p.amp : 0),
    by: 60 + p.len,
  }));
});
</script>

<template>
  <svg viewBox="0 0 760 300" width="760" height="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="80" y1="20" x2="80" y2="60" stroke="var(--c-text-dim)" stroke-width="2" />
    <line x1="680" y1="20" x2="680" y2="60" stroke="var(--c-text-dim)" stroke-width="2" />
    <line x1="60" y1="60" x2="700" y2="60" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
    <g v-for="p in pendulums" :key="p.id">
      <line :x1="p.x" y1="60" :x2="p.bx" :y2="p.by" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <circle :cx="p.bx" :cy="p.by" r="11" :fill="p.color" />
      <text :x="p.x" y="292" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="22" :fill="p.color">{{ p.id }}</text>
    </g>
  </svg>
</template>
