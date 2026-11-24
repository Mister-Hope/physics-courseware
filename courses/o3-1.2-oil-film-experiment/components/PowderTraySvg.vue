<!-- 第 7 页：浅盘水面撒爽身粉，滴入一滴溶液后油酸向外推开粉末形成油膜。 -->
<script setup lang="ts">
import { computed } from "vue";

const FILM_X = 260;
const FILM_Y = 160;
const FILM_R = 78;

const dots = computed(() => {
  const out: { x: number; y: number }[] = [];
  for (let row = 0; row < 11; row += 1) {
    for (let col = 0; col < 19; col += 1) {
      const x = 66 + col * 22 + (row % 2) * 11;
      const y = 66 + row * 20;
      const dx = x - FILM_X;
      const dy = y - FILM_Y;
      if (dx * dx + dy * dy < FILM_R * FILM_R) continue;
      out.push({ x, y });
    }
  }
  return out;
});
</script>

<template>
  <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="36" y="42" width="448" height="240" rx="10" fill="#0b2b4a" stroke="#94a3b8" stroke-width="1.8" />
    <g fill="#cbd5e1" fill-opacity="0.5">
      <circle v-for="(dot, index) in dots" :key="index" :cx="dot.x" :cy="dot.y" r="1.5" />
    </g>
    <circle :cx="FILM_X" :cy="FILM_Y" :r="FILM_R" fill="#e2a846" fill-opacity="0.16" stroke="#e2a846" stroke-width="1.6" />
    <line x1="260" y1="2" x2="260" y2="42" stroke="#cbd5e1" stroke-width="2.4" />
    <circle cx="260" cy="54" r="6" fill="#e2a846" />
    <text x="272" y="34" fill="#94a3b8" font-size="10">滴 1 滴溶液</text>
    <text x="260" y="162" fill="#e2a846" font-size="11" text-anchor="middle">油膜</text>
    <text x="72" y="268" fill="#94a3b8" font-size="10">爽身粉</text>
    <text x="430" y="268" fill="#94a3b8" font-size="10">水</text>
    <text x="48" y="304" fill="#94a3b8" font-size="10">浅盘</text>
  </svg>
</template>
