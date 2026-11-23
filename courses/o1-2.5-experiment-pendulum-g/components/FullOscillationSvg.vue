<script setup lang="ts">
// 第 9 页：一次全振动（从平衡位置 O 出发，O→B→O→A→O）
const cx = 200;
const cy = 30;
const r = 180;
const ballR = 13;
const ox = cx;
const oy = cy + r;
const bx = cx + r * Math.sin((22 * Math.PI) / 180);
const by = cy + r * Math.cos((22 * Math.PI) / 180);
const ax = cx - r * Math.sin((22 * Math.PI) / 180);
const ay = by;
</script>

<template>
  <svg viewBox="0 0 400 300" role="img" aria-label="单摆从平衡位置出发完成一次全振动">
    <rect x="140" y="14" width="120" height="9" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-border)" stroke-width="1.4" />
    <line :x1="cx" :y1="cy" :x2="ax" :y2="ay" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="4 5" opacity="0.55" />
    <line :x1="cx" :y1="cy" :x2="bx" :y2="by" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="4 5" opacity="0.55" />
    <path
      :d="`M ${ax} ${ay} Q ${cx} ${cy + r + 58} ${bx} ${by}`"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.3"
      stroke-dasharray="5 6"
      opacity="0.5"
    />
    <line :x1="cx" :y1="cy" :x2="ox" :y2="oy" stroke="var(--c-text)" stroke-width="1.6" />
    <circle :cx="ox" :cy="oy" :r="ballR" fill="var(--c-accent)" />
    <circle :cx="ax" :cy="ay" :r="ballR - 3" fill="var(--c-text-dim)" opacity="0.55" />
    <circle :cx="bx" :cy="by" :r="ballR - 3" fill="var(--c-text-dim)" opacity="0.55" />
    <text :x="ax - 6" :y="ay + 30" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-text)" text-anchor="middle">A</text>
    <text :x="bx + 6" :y="by + 30" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-text)" text-anchor="middle">B</text>
    <text :x="ox" :y="oy + 34" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-text)" text-anchor="middle">O</text>
    <text :x="ox" :y="oy + 56" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">平衡位置</text>
  </svg>
</template>
