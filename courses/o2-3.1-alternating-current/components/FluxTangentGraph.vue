<!--
  第 10 页：中性面处磁通量 Φ 达到峰值，Φ-t 图线的切线水平，
  变化率为零，所以感应电动势 e = 0。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[-0.35, 12.9]"
      :y-range="[-1.4, 1.4]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'Φ' }"
      :ticks="{ x: [], y: [], labels: false, origin: true }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 900, height: 190 }"
    />
  </div>
</template>

<script setup lang="ts">
const curves = [
  {
    points: [
      { x: -0.28, y: 1 },
      { x: 0.28, y: 1 },
    ],
    color: "var(--c-text-dim)",
    width: 1.4,
    dashed: true,
    opacity: 0.7,
  },
  {
    formula: (x: number): number => Math.cos(x),
    color: "var(--c-accent)",
    width: 3.2,
  },
];

const labels = [
  {
    x: 0.2,
    y: 1.16,
    tex: String.raw`\Phi_m`,
    anchor: "left" as const,
    dy: 0,
    size: 16,
    color: "var(--c-accent)",
    halo: true,
    dot: true,
    dotColor: "var(--c-accent)",
  },
];
</script>
