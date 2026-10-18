<!-- 第 9 页：一列水波——标注波峰、波谷（点击后），再标出相邻两波峰间的距离即波长，最后给出传播方向 -->
<script setup lang="ts">
defineProps<{ step?: number }>();

const pts: string[] = [];
for (let i = 0; i <= 140; i++) {
  const x = 30 + 580 * (i / 140);
  const y = 125 - 42 * Math.sin((2 * Math.PI * (x - 30)) / 140);
  pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
}
const wave = `M ${pts.join(" L ")}`;
</script>

<template>
  <svg viewBox="0 0 640 235" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="125" x2="610" y2="125" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="7 6" />
    <path :d="wave" fill="none" stroke="var(--c-physics)" stroke-width="3.2" stroke-linecap="round" />
    <g v-if="(step ?? 0) >= 1">
      <circle cx="65" cy="83" r="5" fill="var(--c-accent)" />
      <circle cx="205" cy="83" r="5" fill="var(--c-accent)" />
      <circle cx="135" cy="167" r="5" fill="var(--c-accent)" />
      <text x="57" y="74" text-anchor="end" font-size="17" fill="var(--c-text)">波峰</text>
      <text x="197" y="74" text-anchor="end" font-size="17" fill="var(--c-text)">波峰</text>
      <text x="135" y="192" text-anchor="middle" font-size="17" fill="var(--c-text)">波谷</text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <line x1="65" y1="78" x2="65" y2="44" stroke="var(--c-accent)" stroke-width="1.3" stroke-dasharray="5 4" />
      <line x1="205" y1="78" x2="205" y2="44" stroke="var(--c-accent)" stroke-width="1.3" stroke-dasharray="5 4" />
      <line x1="65" y1="38" x2="205" y2="38" stroke="var(--c-accent)" stroke-width="2" />
      <line x1="65" y1="31" x2="65" y2="45" stroke="var(--c-accent)" stroke-width="2" />
      <line x1="205" y1="31" x2="205" y2="45" stroke="var(--c-accent)" stroke-width="2" />
      <text x="135" y="27" text-anchor="middle" font-size="21" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">λ</text>
    </g>
    <g v-if="(step ?? 0) >= 3">
      <line x1="40" y1="210" x2="118" y2="210" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-linecap="round" />
      <path d="M 128 210 L 115 203.5 L 115 216.5 Z" fill="var(--c-accent-2)" />
      <text x="140" y="217" font-size="16" fill="var(--c-accent-2)">传播方向</text>
    </g>
  </svg>
</template>
