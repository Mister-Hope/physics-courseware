<script setup lang="ts">
/** 3.2 波的描述 · 例题：波长 0.24 m 的正弦波，0.5 s 后的波形（虚线） */
const curves = [
  {
    formula: (x: number): number => Math.sin((2 * Math.PI * x) / 0.24),
    samples: 420,
    color: "var(--c-accent)",
    width: 3,
  },
  {
    formula: (x: number): number => Math.sin((2 * Math.PI * (x - 0.18)) / 0.24),
    samples: 420,
    color: "var(--c-accent-2)",
    width: 2.6,
    dashed: true,
  },
];
const labels = [
  { x: 0.12, y: 1.28, text: "实线", anchor: "top-left", size: 14, color: "var(--c-accent)" },
  { x: 0.27, y: 1.22, text: "虚线", anchor: "top-left", size: 14, color: "var(--c-accent-2)" },
];
</script>

<template>
  <CoordAxes
    :x-range="[0, 0.42]"
    :y-range="[-1.5, 1.5]"
    :x-axis="{ quantity: 'x', unit: 'm' }"
    :y-axis="{ quantity: 'y', unit: 'cm' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [0.12, 0.24, 0.36], y: [-1, 1] }"
    :view="{ width: 700, height: 360 }"
    :font-scale="1.2"
  />
</template>
