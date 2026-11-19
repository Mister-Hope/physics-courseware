<!--
  第 8 页：转一圈过程中电流随时间的变化。正半周电流方向为正，
  负半周反向；曲线两次穿过零轴，对应线圈两次经过中性面。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 6.6]"
      :y-range="[-1.45, 1.45]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'i' }"
      :ticks="{ x: [], y: [], labels: false, origin: true }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 820, height: 280 }"
    />
  </div>
</template>

<script setup lang="ts">
const curves = [
  {
    formula: (x: number): number => Math.sin(x),
    color: "var(--c-accent)",
    width: 3.2,
  },
];

const labels = [
  {
    x: 1.57,
    y: 1.12,
    text: "电流为正",
    anchor: "bottom" as const,
    size: 15,
    color: "var(--c-accent)",
    halo: true,
    dot: true,
    dotColor: "var(--c-accent)",
  },
  {
    x: 4.71,
    y: -1.12,
    text: "电流反向",
    anchor: "top" as const,
    size: 15,
    color: "var(--c-accent-2)",
    halo: true,
    dot: true,
    dotColor: "var(--c-accent-2)",
  },
  {
    x: 3.14,
    y: 0,
    dot: true,
    dotColor: "var(--c-text-dim)",
  },
];
</script>
