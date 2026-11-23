<!-- 第 16 页：劈尖干涉——抽去一张纸片后，条纹变疏 -->
<template>
  <svg viewBox="0 0 660 250" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="60" y="120" width="470" height="18" rx="3" fill="var(--c-physics)" opacity="0.18" />
    <line x1="60" y1="120" x2="530" y2="120" stroke="var(--c-physics)" stroke-width="2.2" />
    <polygon points="60,120 530,120 530,72" fill="var(--c-physics)" opacity="0.1" />
    <line x1="60" y1="120" x2="530" y2="72" stroke="var(--c-text-dim)" stroke-width="2.6" />
    <rect x="516" y="74" width="26" height="46" fill="var(--c-accent)" opacity="0.55" />
    <rect x="516" y="74" width="26" height="46" fill="none" stroke="var(--c-accent)" stroke-width="1.4" />
    <text x="556" y="104" font-size="12" fill="var(--c-accent)">纸片</text>
    <g stroke="var(--c-accent)" stroke-width="1.6" opacity="0.7">
      <line v-for="x in rays" :key="x" :x1="x" y1="34" :x2="x + 12" y2="66" />
    </g>
    <text x="60" y="28" font-size="12" fill="var(--c-text-dim)">光</text>
    <line x1="60" y1="176" x2="530" y2="176" stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="6 6" />
    <rect v-for="bar in bars" :key="bar.k" :x="bar.x - 3" y="184" width="6" height="44" rx="2" fill="var(--c-accent)" :opacity="bar.opacity" />
    <text x="60" y="244" font-size="12" fill="var(--c-text-dim)">俯视看到的条纹</text>
  </svg>
</template>

<script setup lang="ts">
interface BarItem {
  k: number;
  x: number;
  opacity: number;
}

const { step = 0 } = defineProps<{ step?: number }>();

const spacing = step >= 1 ? 56 : 32;
const bars: BarItem[] = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]
  .map((k) => ({ k, x: 300 + k * spacing, opacity: 0.9 - (0.4 * Math.abs(k)) / 8 }))
  .filter((bar) => bar.x > 70 && bar.x < 520);

const rays = [110, 210, 310, 410, 500];
</script>
