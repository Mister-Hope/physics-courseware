<!--
  第 9 页：sin²ωt 的图线。一个周期内它在 1/2 上下面积相等，
  所以平均值是 1/2，这是正弦式有效值推导的关键一步。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 6.6]"
      :y-range="[-0.12, 1.25]"
      :x-axis="{ quantity: 't' }"
      :ticks="{ x: [], y: [0.5, 1], labels: true, origin: false }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 800, height: 270 }"
    />
  </div>
</template>

<script setup lang="ts">
const { PI } = Math;

const curves = [
  {
    formula: (x: number): number => Math.sin(x) ** 2,
    color: "var(--c-accent)",
    width: 3,
  },
  {
    points: [
      { x: 0, y: 0.5 },
      { x: 6.6, y: 0.5 },
    ],
    color: "var(--c-accent-2)",
    width: 1.8,
    dashed: true,
  },
];

const labels = [
  {
    x: 1.05,
    y: 1.02,
    tex: String.raw`\sin^2\omega t`,
    anchor: "top" as const,
    size: 16,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: 4.9,
    y: 0.5,
    tex: String.raw`\frac{1}{2}`,
    anchor: "bottom" as const,
    dy: 8,
    size: 16,
    color: "var(--c-accent-2)",
    halo: true,
  },
  {
    x: PI,
    y: 0,
    tex: String.raw`\frac{T}{2}`,
    anchor: "top" as const,
    dy: 16,
    size: 14,
    halo: true,
  },
  { x: 2 * PI, y: 0, tex: "T", anchor: "top" as const, dy: 16, size: 14, halo: true },
];
</script>
