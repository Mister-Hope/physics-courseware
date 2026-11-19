<!--
  第 3 页：从正弦式交流的 u-t 图上读出周期 T 和峰值 U_m。
  只标这两个量；有效值后面再用热效应计算。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 6.6]"
      :y-range="[-1.35, 1.35]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'u' }"
      :ticks="{ x: [], y: [], labels: false, origin: true }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 820, height: 280 }"
    />
  </div>
</template>

<script setup lang="ts">
const { PI } = Math;

const curves = [
  {
    formula: (x: number): number => Math.sin(x),
    color: "var(--c-accent)",
    width: 3.2,
  },
];

const labels = [
  {
    x: PI / 2,
    y: 1,
    tex: "U_m",
    anchor: "top" as const,
    dy: -8,
    size: 16,
    color: "var(--c-accent)",
    halo: true,
    dot: true,
    dotColor: "var(--c-accent)",
  },
  {
    x: PI,
    y: 0,
    tex: String.raw`\frac{T}{2}`,
    anchor: "top" as const,
    dy: 14,
    size: 14,
    halo: true,
  },
  {
    x: 2 * PI,
    y: 0,
    tex: "T",
    anchor: "top" as const,
    dy: 14,
    size: 14,
    halo: true,
  },
];
</script>
