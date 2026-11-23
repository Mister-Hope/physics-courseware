<!-- 封面装饰：双缝挡板 + 屏上的明暗相间干涉条纹 -->
<template>
  <svg viewBox="0 0 320 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="86" y="28" width="6" height="134" rx="2" fill="var(--c-text-dim)" opacity="0.55" />
    <rect x="86" y="80" width="6" height="14" fill="var(--c-bg, #0b1020)" />
    <rect x="86" y="106" width="6" height="14" fill="var(--c-bg, #0b1020)" />
    <line x1="18" y1="87" x2="86" y2="87" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.8" />
    <line x1="18" y1="113" x2="86" y2="113" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.8" />
    <text x="16" y="78" font-size="11" fill="var(--c-text-dim)">光</text>
    <g v-for="bar in bars" :key="bar.i">
      <rect :x="160 + bar.i * 15" y="34" width="8" height="122" rx="3" :fill="bar.color" :opacity="bar.opacity" />
    </g>
    <text x="290" y="176" font-size="11" fill="var(--c-text-dim)" text-anchor="end">屏</text>
  </svg>
</template>

<script setup lang="ts">
interface Bar {
  i: number;
  color: string;
  opacity: number;
}

const bars: Bar[] = Array.from({ length: 11 }, (_, k) => {
  const i = k - 5;
  const d = Math.abs(i);
  return {
    i,
    color: d === 0 ? "var(--c-accent-light)" : "var(--c-accent)",
    opacity: 0.22 + 0.72 * Math.max(0, 1 - d / 6),
  };
});
</script>
