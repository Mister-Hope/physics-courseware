<!-- 第 13 页：微波炉加热食物——微波从磁控管射入炉腔，点击后食物中的水分子热运动加剧 -->
<script setup lang="ts">
defineProps<{ step?: number }>();

const arc = (x1: number, x2: number, y: number): string => {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = x1 + ((x2 - x1) * i) / 60;
    const yy = y + 8 * Math.sin((2 * Math.PI * (x - x1)) / 40);
    pts.push(`${x.toFixed(1)} ${yy.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
};
const rows = [84, 114, 144];
const molecules = [
  { x: 240, y: 110 },
  { x: 300, y: 128 },
  { x: 360, y: 106 },
];
</script>

<template>
  <svg viewBox="0 0 880 200" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="840" height="160" rx="16" fill="none" stroke="var(--c-text-dim)" stroke-width="2" />
    <rect x="36" y="34" width="600" height="132" rx="10" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="46" y="42" width="580" height="116" rx="8" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="6 5" />
    <rect x="650" y="34" width="196" height="132" rx="10" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="680" y="82" width="70" height="40" rx="6" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="715" y="72" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">磁控管</text>
    <rect x="636" y="94" width="14" height="16" rx="3" fill="var(--c-accent)" />
    <g fill="none" stroke="var(--c-danger)" stroke-width="2.4" stroke-linecap="round">
      <path v-for="(r, i) in rows" :key="i" :d="arc(630, 436, r)" />
    </g>
    <path d="M 426 84 L 440 77 L 440 91 Z" fill="var(--c-danger)" />
    <path d="M 426 114 L 440 107 L 440 121 Z" fill="var(--c-danger)" />
    <path d="M 426 144 L 440 137 L 440 151 Z" fill="var(--c-danger)" />
    <text x="545" y="66" text-anchor="middle" font-size="16" fill="var(--c-danger)">微波</text>
    <ellipse cx="300" cy="148" rx="150" ry="13" fill="none" stroke="var(--c-text-dim)" stroke-width="1.7" />
    <ellipse cx="300" cy="120" rx="110" ry="38" fill="color-mix(in srgb, var(--c-accent) 45%, var(--c-surface))" stroke="var(--c-accent)" stroke-width="1.7" />
    <g v-if="(step ?? 0) >= 2">
      <g v-for="(m, i) in molecules" :key="i">
        <line :x1="m.x - 14" :y1="m.y + 20" :x2="m.x - 30" :y2="m.y + 20" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-linecap="round" />
        <path :d="`M ${m.x - 36} ${m.y + 20} L ${m.x - 28} ${m.y + 15.5} L ${m.x - 28} ${m.y + 24.5} Z`" fill="var(--c-accent-2)" />
        <line :x1="m.x + 14" :y1="m.y + 20" :x2="m.x + 30" :y2="m.y + 20" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-linecap="round" />
        <path :d="`M ${m.x + 36} ${m.y + 20} L ${m.x + 28} ${m.y + 15.5} L ${m.x + 28} ${m.y + 24.5} Z`" fill="var(--c-accent-2)" />
        <circle :cx="m.x - 11" :cy="m.y - 8" r="4" fill="var(--c-neutral-300)" />
        <circle :cx="m.x + 11" :cy="m.y - 8" r="4" fill="var(--c-neutral-300)" />
        <circle :cx="m.x" :cy="m.y" r="7" fill="var(--c-danger)" />
      </g>
      <text x="300" y="192" text-anchor="middle" font-size="15" fill="var(--c-accent)">水分子</text>
    </g>
  </svg>
</template>
