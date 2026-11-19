<!--
  第 10 页：构造两个正弦式电流 i1=Im sinωt 与 i2=Im cosωt。
  两者相位差 T/4，但平方和恒为 Im²，这是求有效值的巧妙方法。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 13.2]"
      :y-range="[-1.4, 1.4]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'i' }"
      :ticks="{ x: [], y: [], labels: false, origin: false }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 820, height: 270 }"
    />
  </div>
</template>

<script setup lang="ts">
const { PI } = Math;

const curves = [
  {
    formula: (x: number): number => Math.sin(x),
    color: "var(--c-accent)",
    width: 3,
  },
  {
    formula: (x: number): number => Math.cos(x),
    color: "var(--c-accent-2)",
    width: 2.6,
    dashed: true,
  },
];

const labels = [
  {
    x: PI / 2,
    y: 1.06,
    tex: "i_1",
    anchor: "bottom" as const,
    size: 15,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: 0.15,
    y: 1.06,
    tex: "i_2",
    anchor: "bottom" as const,
    size: 15,
    color: "var(--c-accent-2)",
    halo: true,
  },
  {
    x: PI / 2,
    y: 0,
    tex: String.raw`\frac{T}{4}`,
    anchor: "top" as const,
    dy: 16,
    size: 14,
    halo: true,
  },
  { x: 2 * PI, y: 0, tex: "T", anchor: "top" as const, dy: 16, size: 14, halo: true },
  { x: 4 * PI, y: 0, tex: "2T", anchor: "top" as const, dy: 16, size: 14, halo: true },
];
</script>
