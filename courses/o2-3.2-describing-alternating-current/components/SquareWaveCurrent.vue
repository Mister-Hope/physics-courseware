<!--
  第 4 页：一个周期内前一半 4 A、后一半 -2 A 的方波电流。
  有效值按一个周期的热效应计算；方向相反不影响 I²R。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 1.15]"
      :y-range="[-3.8, 5.2]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'i', unit: 'A' }"
      :ticks="{ x: [], y: [-2, 4], labels: true, origin: false }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 520, height: 280 }"
    />
  </div>
</template>

<script setup lang="ts">
const curves = [
  {
    points: [
      { x: 0, y: 4 },
      { x: 0.5, y: 4 },
      { x: 0.5, y: -2 },
      { x: 1, y: -2 },
    ],
    color: "var(--c-accent)",
    width: 3.2,
  },
];

const labels = [
  {
    x: 0.13,
    y: 4,
    tex: String.raw`4\ \text{A}`,
    anchor: "top" as const,
    dy: -6,
    size: 14,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: 0.64,
    y: -2,
    tex: String.raw`-2\ \text{A}`,
    anchor: "bottom" as const,
    dy: 6,
    size: 14,
    color: "var(--c-accent-2)",
    halo: true,
  },
  {
    x: 0.5,
    y: -3,
    tex: String.raw`\frac{T}{2}`,
    anchor: "top" as const,
    dy: 12,
    size: 13,
    halo: true,
  },
  {
    x: 1,
    y: -3,
    tex: "T",
    anchor: "top" as const,
    dy: 12,
    size: 13,
    halo: true,
  },
];
</script>
