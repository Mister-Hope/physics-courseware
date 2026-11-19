<!--
  第 5 页：交流电流随时间变化，一个周期内正负半周面积相等，平均值为零。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 6.6]"
      :y-range="[-1.4, 1.4]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'i' }"
      :ticks="{ x: [], y: [], labels: false, origin: false }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 760, height: 260 }"
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
];

const labels = [
  { x: PI / 2, y: 0.62, text: "+", size: 26, color: "var(--c-accent)", halo: true },
  { x: (3 * PI) / 2, y: -0.62, text: "−", size: 26, color: "var(--c-accent-2)", halo: true },
  {
    x: (3 * PI) / 2,
    y: -1.18,
    text: "正、负半周面积相等",
    size: 13,
    anchor: "bottom" as const,
    halo: true,
  },
];
</script>
