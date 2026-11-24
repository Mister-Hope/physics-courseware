<!-- 1.3 封面装饰：速率分布曲线与气体分子 -->
<template>
  <svg viewBox="0 0 320 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="40" y1="150" x2="294" y2="150" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.55" />
    <path :d="curve" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <line x1="196" y1="150" x2="196" y2="58" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.6" />
    <circle cx="196" cy="58" r="4" fill="var(--c-accent)" />
    <circle cx="78" cy="66" r="4.5" fill="var(--c-physics)" opacity="0.9" />
    <circle cx="120" cy="42" r="3.4" fill="var(--c-physics)" opacity="0.75" />
    <circle cx="262" cy="52" r="3.8" fill="var(--c-physics)" opacity="0.8" />
    <circle cx="286" cy="96" r="3" fill="var(--c-physics)" opacity="0.7" />
    <text x="204" y="46" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">v_p</text>
  </svg>
</template>

<script setup lang="ts">
const points: string[] = [];
for (let index = 0; index <= 120; index += 1) {
  const x = 40 + (index / 120) * 254;
  const t = (x - 40) / 254;
  const y = 150 - 92 * Math.exp(-(((t - 0.62) / 0.19) ** 2));
  points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
}
const curve = `M ${points.join(" L ")}`;
</script>
