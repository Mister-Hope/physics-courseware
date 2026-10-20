<!-- 第 12 页：微波炉加热食物——微波从炉腔右侧射向食物，点击后显示食物中的水分子在微波作用下振动加剧 -->
<script setup lang="ts">
defineProps<{ step?: number }>();

const arc = (x1: number, x2: number, y: number, amp: number): string => {
  const pts: string[] = [];
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const x = x1 + ((x2 - x1) * i) / n;
    const yy = y + amp * Math.sin((2 * Math.PI * (x - x1)) / 46);
    pts.push(`${x.toFixed(1)} ${yy.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
};
const rows = [100, 126, 152];
</script>

<template>
  <svg viewBox="0 0 560 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="30" width="500" height="240" rx="16" fill="none" stroke="var(--c-text-dim)" stroke-width="2" />
    <rect x="46" y="46" width="300" height="208" rx="10" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="60" y="60" width="272" height="180" rx="8" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <rect x="356" y="120" width="10" height="60" rx="5" fill="var(--c-text-dim)" />
    <g fill="none" stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round">
      <path v-for="(r, i) in rows" :key="i" :d="arc(330, 200, r, 9)" />
    </g>
    <path d="M 200 100 L 212 93.5 L 212 106.5 Z" fill="var(--c-danger)" />
    <path d="M 200 126 L 212 119.5 L 212 132.5 Z" fill="var(--c-danger)" />
    <path d="M 200 152 L 212 145.5 L 212 158.5 Z" fill="var(--c-danger)" />
    <text x="266" y="80" text-anchor="middle" font-size="16" fill="var(--c-danger)">微波</text>
    <ellipse cx="150" cy="206" rx="72" ry="11" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <ellipse cx="150" cy="186" rx="44" ry="20" fill="color-mix(in srgb, var(--c-accent) 55%, var(--c-surface))" stroke="var(--c-accent)" stroke-width="1.6" />
    <g v-if="(step ?? 0) >= 1">
      <g stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round">
        <line x1="126" y1="188" x2="148" y2="188" />
        <line x1="168" y1="194" x2="190" y2="194" />
        <line x1="146" y1="172" x2="168" y2="172" />
      </g>
      <path d="M 121 188 L 128 182 L 128 194 Z" fill="var(--c-accent)" />
      <path d="M 153 188 L 146 182 L 146 194 Z" fill="var(--c-accent)" />
      <path d="M 163 194 L 170 188 L 170 200 Z" fill="var(--c-accent)" />
      <path d="M 195 194 L 188 188 L 188 200 Z" fill="var(--c-accent)" />
      <path d="M 141 172 L 148 166 L 148 178 Z" fill="var(--c-accent)" />
      <path d="M 173 172 L 166 166 L 166 178 Z" fill="var(--c-accent)" />
      <g>
        <circle cx="132" cy="188" r="7" fill="var(--c-danger)" />
        <circle cx="143" cy="188" r="4.5" fill="var(--c-accent-2)" />
        <circle cx="174" cy="194" r="7" fill="var(--c-danger)" />
        <circle cx="185" cy="194" r="4.5" fill="var(--c-accent-2)" />
        <circle cx="152" cy="172" r="7" fill="var(--c-danger)" />
        <circle cx="163" cy="172" r="4.5" fill="var(--c-accent-2)" />
      </g>
      <text x="196" y="232" text-anchor="middle" font-size="15" fill="var(--c-accent)">水分子</text>
    </g>
  </svg>
</template>
