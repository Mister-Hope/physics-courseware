<template>
  <!-- 摆钟示意图：钟面 + 摆锤，用于“摆钟为什么能计时”一页 -->
  <svg viewBox="0 0 300 330" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="摆钟示意图">
    <rect x="52" y="12" width="196" height="208" rx="12" fill="var(--c-surface)" stroke="var(--c-line)" stroke-width="2" />
    <circle cx="150" cy="104" r="62" fill="var(--c-bg-soft)" stroke="var(--c-line)" stroke-width="1.6" />
    <line
      v-for="tick in ticks"
      :key="tick.key"
      :x1="tick.x1"
      :y1="tick.y1"
      :x2="tick.x2"
      :y2="tick.y2"
      stroke="var(--c-text-dim)"
      :stroke-width="tick.major ? 2.4 : 1.2"
      stroke-linecap="round"
      stroke-opacity=".8"
    />
    <line x1="150" y1="104" x2="182.9" y2="85" stroke="var(--c-text)" stroke-width="2.6" stroke-linecap="round" />
    <line x1="150" y1="104" x2="129.2" y2="92" stroke="var(--c-text)" stroke-width="3.4" stroke-linecap="round" />
    <circle cx="150" cy="104" r="4" fill="var(--c-text)" />
    <line x1="150" y1="220" x2="150" y2="238" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
    <line x1="150" y1="238" x2="150" y2="316" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 6" stroke-opacity=".35" />
    <path d="M142.3 311.6 A74 74 0 0 1 157.7 311.6" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 6" stroke-opacity=".4" />
    <line x1="150" y1="238" x2="157.7" y2="311.6" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="157.7" cy="311.6" r="12" fill="var(--c-accent)" fill-opacity=".26" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="150" cy="238" r="4" fill="var(--c-text-dim)" />
    <line x1="172" y1="318" x2="163" y2="314" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-opacity=".6" />
    <text x="176" y="322" font-size="11" fill="var(--c-text-dim)">摆锤</text>
  </svg>
</template>

<script setup lang="ts">
const ticks = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * Math.PI) / 6;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  return {
    key: i,
    x1: 150 + 54 * sin,
    y1: 104 - 54 * cos,
    x2: 150 + 60 * sin,
    y2: 104 - 60 * cos,
    major: i % 3 === 0,
  };
});
</script>
