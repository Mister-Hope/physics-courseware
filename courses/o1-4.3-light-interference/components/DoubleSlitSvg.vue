<!-- 第 5 页：杨氏双缝干涉装置（激光器 → 单缝 → 双缝 → 屏上明暗条纹） -->
<template>
  <svg viewBox="0 0 660 232" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="16" y="96" width="62" height="40" rx="8" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="1.6" />
    <text x="47" y="121" font-size="12" fill="var(--c-text)" text-anchor="middle">激光</text>
    <line x1="78" y1="116" x2="132" y2="116" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.85" />
    <rect x="132" y="42" width="6" height="148" rx="2" fill="var(--c-text-dim)" opacity="0.6" />
    <rect x="132" y="106" width="6" height="20" fill="var(--c-bg, #0b1020)" />
    <rect x="240" y="42" width="6" height="148" rx="2" fill="var(--c-text-dim)" opacity="0.6" />
    <rect x="240" y="86" width="6" height="12" fill="var(--c-bg, #0b1020)" />
    <rect x="240" y="130" width="6" height="12" fill="var(--c-bg, #0b1020)" />
    <g stroke="var(--c-accent)" stroke-width="1.1" opacity="0.55">
      <line x1="138" y1="116" x2="240" y2="92" />
      <line x1="138" y1="116" x2="240" y2="136" />
      <line x1="246" y1="92" x2="600" y2="60" />
      <line x1="246" y1="92" x2="600" y2="116" />
      <line x1="246" y1="136" x2="600" y2="116" />
      <line x1="246" y1="136" x2="600" y2="172" />
    </g>
    <rect x="600" y="26" width="8" height="180" rx="3" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <g v-for="bar in bars" :key="bar.i">
      <rect :x="608 + 0" :y="34 + bar.i * 17" width="34" height="8" rx="3" :fill="bar.color" :opacity="bar.opacity" />
    </g>
    <text x="167" y="212" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">单缝</text>
    <text x="243" y="212" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">双缝</text>
    <text x="612" y="212" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">屏</text>
  </svg>
</template>

<script setup lang="ts">
interface Bar {
  i: number;
  color: string;
  opacity: number;
}

const bars: Bar[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
  const d = Math.abs(i - 4.5);
  return {
    i,
    color: d < 1 ? "var(--c-accent-light)" : "var(--c-accent)",
    opacity: 0.2 + 0.7 * Math.max(0, 1 - d / 5),
  };
});
</script>
