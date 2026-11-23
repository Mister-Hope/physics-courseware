<!-- 第 15 页：主动降噪：发出与噪声相位相反的声波，叠加后互相抵消 -->
<template>
  <svg viewBox="36 8 588 186" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke-width="2.4" stroke-linecap="round">
      <path :d="noise" stroke="var(--c-accent)" />
      <path :d="anti" stroke="var(--c-physics)" stroke-dasharray="7 6" />
      <path :d="sum" stroke="var(--c-text)" stroke-width="3" />
    </g>
    <text x="40" y="52" font-size="14" fill="var(--c-accent)">噪声</text>
    <text x="40" y="122" font-size="14" fill="var(--c-physics)">反相声波</text>
    <text x="40" y="196" font-size="14" fill="var(--c-text)">合成</text>
  </svg>
</template>

<script setup lang="ts">
const wave = (base: number, amp: number, phase: number): string => {
  const pts: string[] = [];
  for (let x = 120; x <= 620; x += 4) {
    const y = base - amp * Math.sin(((x - 120) / 100) * Math.PI + phase);
    pts.push(`${pts.length === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
};

const noise = wave(46, 24, 0);
const anti = wave(116, 24, Math.PI);
const sum = wave(186, 3, 0);
</script>
