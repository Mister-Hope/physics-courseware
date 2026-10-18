<script setup lang="ts">
/**
 * 第 3–4 页：游标卡尺（10 分度）结构与读数训练图。主尺刻 0–29 mm（每格 1 mm）， 游标尺 10 分度总长 9 mm（每格 0.9 mm）。示例读数 21.7 mm： 游标零线落在主尺 21 mm 与 22 mm 之间，游标第 7 条刻度线与主尺 28 mm 刻度线对齐。 step ≥1
 * 标出主尺读数，≥2 高亮对齐的刻度线，≥3 给出最终读数。
 */
const { step = 0 } = defineProps<{ step?: number }>();

const u = 14;
const x0 = 40;
const mainTicks = Array.from({ length: 30 }, (_, m) => ({ m, x: x0 + m * u }));
const vz = x0 + 21.7 * u;
const vernierSpan = 10 * 0.9 * u;
const vernierTicks = Array.from({ length: 11 }, (_, k) => ({ k, x: vz + k * 0.9 * u }));
const alignX = vz + 7 * 0.9 * u;
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
      <text x="26" y="42" font-size="16" fill="var(--c-text-dim)">主尺</text>
      <line x1="26" y1="100" x2="560" y2="100" stroke="var(--c-text)" stroke-width="1.6" />
      <g v-for="t in mainTicks" :key="'m' + t.m">
        <line :x1="t.x" :y1="100" :x2="t.x" :y2="t.m % 5 === 0 ? 76 : 86" stroke="var(--c-text)" stroke-width="1.4" />
        <text v-if="t.m % 5 === 0" :x="t.x" y="68" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-text)">{{ t.m }}</text>
      </g>
      <rect :x="vz - 14" y="126" :width="vernierSpan + 28" height="52" rx="6" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line :x1="vz - 14" y1="150" :x2="vz + vernierSpan + 14" y2="150" stroke="var(--c-text)" stroke-width="1.6" />
      <g v-for="t in vernierTicks" :key="'v' + t.k">
        <line :x1="t.x" :y1="150" :x2="t.x" :y2="164" stroke="var(--c-text)" stroke-width="1.4" />
        <text v-if="t.k % 5 === 0" :x="t.x" y="180" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-text)">{{ t.k }}</text>
      </g>
      <text :x="vz + vernierSpan + 24" y="156" font-size="16" fill="var(--c-text-dim)">游标尺</text>
      <g v-if="step >= 1">
        <line :x1="x0" y1="205" :x2="x0 + 21 * u" y2="205" stroke="var(--c-accent)" stroke-width="1.8" />
        <line :x1="x0" y1="199" :x2="x0" y2="211" stroke="var(--c-accent)" stroke-width="1.8" />
        <line :x1="x0 + 21 * u" y1="199" :x2="x0 + 21 * u" y2="211" stroke="var(--c-accent)" stroke-width="1.8" />
        <text :x="x0 + 10.5 * u" y="226" text-anchor="middle" font-size="16" fill="var(--c-accent)">主尺读数 21 mm</text>
      </g>
      <g v-if="step >= 2">
        <line :x1="alignX" y1="52" :x2="alignX" y2="192" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-dasharray="6 5" />
        <text :x="alignX" y="42" text-anchor="middle" font-size="16" fill="var(--c-accent-2)">第 7 条刻度线对齐</text>
      </g>
      <g v-if="step >= 3">
        <rect x="150" y="236" width="300" height="38" rx="8" fill="rgba(226,168,70,0.12)" stroke="var(--c-accent)" stroke-width="1.4" />
        <text x="300" y="261" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent)">21 mm + 0.7 mm = 21.7 mm</text>
      </g>
    </svg>
  </div>
</template>
