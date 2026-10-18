<script setup lang="ts">
/** 第 5–6 页：螺旋测微器读数训练图。固定刻度露出 6 mm 整毫米线与 6.5 mm 半毫米线， 可动刻度第 22.5 格与基准线对齐 → 读数 6.5 mm + 0.225 mm = 6.725 mm。 step ≥1 整毫米，≥2 半毫米线，≥3 可动刻度，≥4 最终读数。 */
const { step = 0 } = defineProps<{ step?: number }>();

const baseY = 130;
const wholeTicks = Array.from({ length: 7 }, (_, m) => ({ m, x: 90 + 30 * m }));
const halfTicks = Array.from({ length: 7 }, (_, m) => ({ m, x: 105 + 30 * m }));
const divTicks = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27].map((k) => ({ k, y: baseY + (22.5 - k) * 13 }));
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 600 290" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="92" width="240" height="76" rx="6" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <line x1="66" :y1="baseY" x2="470" :y2="baseY" stroke="var(--c-text)" stroke-width="1.4" />
      <g v-for="t in wholeTicks" :key="'w' + t.m">
        <line :x1="t.x" :y1="baseY" :x2="t.x" :y2="112" stroke="var(--c-text)" stroke-width="1.4" />
        <text :x="t.x" y="106" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">{{ t.m }}</text>
      </g>
      <g v-for="t in halfTicks" :key="'h' + t.m">
        <line :x1="t.x" :y1="baseY" :x2="t.x" :y2="148" stroke="var(--c-text)" stroke-width="1.4" />
      </g>
      <rect x="300" y="56" width="180" height="148" rx="8" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <g v-for="t in divTicks" :key="'d' + t.k">
        <line x1="300" :y1="t.y" x2="332" :y2="t.y" stroke="var(--c-text)" stroke-width="1.4" />
        <text v-if="t.k === 20 || t.k === 25" x="340" :y="t.y + 5" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">{{ t.k }}</text>
      </g>
      <text x="96" y="196" font-size="16" fill="var(--c-text-dim)">固定刻度</text>
      <text x="390" y="228" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">可动刻度</text>
      <g v-if="step >= 1">
        <line x1="270" y1="130" x2="270" y2="108" stroke="var(--c-accent)" stroke-width="2.6" />
        <text x="170" y="76" text-anchor="middle" font-size="16" fill="var(--c-accent)">整毫米：6 mm</text>
      </g>
      <g v-if="step >= 2">
        <line x1="285" y1="130" x2="285" y2="152" stroke="var(--c-accent-2)" stroke-width="2.6" />
        <text x="440" y="76" text-anchor="middle" font-size="16" fill="var(--c-accent-2)">半毫米线已露出：+0.5 mm</text>
      </g>
      <g v-if="step >= 3">
        <line x1="300" :y1="baseY" x2="340" :y2="baseY" stroke="var(--c-physics)" stroke-width="2.6" />
        <text x="390" y="36" text-anchor="middle" font-size="16" fill="var(--c-physics)">可动刻度：22.5 格</text>
      </g>
      <g v-if="step >= 4">
        <rect x="130" y="238" width="340" height="38" rx="8" fill="rgba(226,168,70,0.12)" stroke="var(--c-accent)" stroke-width="1.4" />
        <text x="300" y="263" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent)">6.5 mm + 0.225 mm = 6.725 mm</text>
      </g>
    </svg>
  </div>
</template>
