<!-- 第 6 页：屏上三点 P0/P1/P2 的路程差与明暗（示意图，两缝间距已放大） -->
<template>
  <svg viewBox="160 6 500 292" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="180" y="26" width="6" height="240" rx="2" fill="var(--c-text-dim)" opacity="0.6" />
    <rect x="180" y="106" width="6" height="14" fill="#0b1020" />
    <rect x="180" y="150" width="6" height="14" fill="#0b1020" />
    <rect x="586" y="16" width="6" height="262" rx="3" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="168" y="99" font-size="16" fill="var(--c-text)" text-anchor="end" font-family="KaTeX_Math" font-style="italic">
      <tspan>S</tspan><tspan dy="5" font-size="12">1</tspan>
    </text>
    <text x="168" y="179" font-size="16" fill="var(--c-text)" text-anchor="end" font-family="KaTeX_Math" font-style="italic">
      <tspan>S</tspan><tspan dy="5" font-size="12">2</tspan>
    </text>
    <text x="600" y="292" font-size="15" fill="var(--c-text-dim)">屏</text>
    <g v-for="p in points" :key="p.key">
      <g v-if="step >= p.reveal">
        <line :x1="186" :y1="113" :x2="586" :y2="p.y" stroke="var(--c-accent)" stroke-width="1.3" opacity="0.5" />
        <line :x1="186" :y1="157" :x2="586" :y2="p.y" stroke="var(--c-accent)" stroke-width="1.3" opacity="0.32" />
        <circle cx="586" :cy="p.y" r="4.5" :fill="p.bright ? 'var(--c-accent-light)' : 'var(--c-velocity)'" />
        <text :x="596" :y="p.y - 10" font-size="16" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic">
          <tspan>P</tspan><tspan dy="5" font-size="12">{{ p.sub }}</tspan>
        </text>
        <text :x="596" :y="p.y + 16" font-size="15" :fill="p.bright ? 'var(--c-accent-light)' : 'var(--c-velocity)'" font-family="KaTeX_Math">
          {{ p.delta }}
        </text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface PointItem {
  key: string;
  sub: string;
  y: number;
  delta: string;
  bright: boolean;
  reveal: number;
}

const { step = 0 } = defineProps<{ step?: number }>();

const points: PointItem[] = [
  { key: "p0", sub: "0", y: 137, delta: "Δr = 0", bright: true, reveal: 0 },
  { key: "p1", sub: "1", y: 76, delta: "Δr = λ/2", bright: false, reveal: 1 },
  { key: "p2", sub: "2", y: 32, delta: "Δr = λ", bright: true, reveal: 2 },
];
</script>
