<script setup lang="ts">
/** 3.2 波的描述 · 思考与讨论：只给两个时刻的波形，不能唯一判定传播方向 */
const curves = [
  {
    formula: (x: number): number => Math.sin(Math.PI * x),
    samples: 300,
    color: "var(--c-accent)",
    width: 3,
  },
  {
    formula: (x: number): number => Math.sin(Math.PI * (x - 0.3)),
    samples: 300,
    color: "var(--c-accent-2)",
    width: 2.6,
    dashed: true,
  },
];
const labels = [
  { x: 0.95, y: 1.35, text: "实线", anchor: "top-left", size: 14, color: "var(--c-accent)" },
  { x: 0.42, y: -1.24, text: "虚线", anchor: "top-left", size: 14, color: "var(--c-accent-2)" },
];
</script>

<template>
  <CoordAxes
    :x-range="[0, 4.4]"
    :y-range="[-1.5, 1.5]"
    :x-axis="{ quantity: 'x', unit: 'm' }"
    :y-axis="{ quantity: 'y', unit: 'cm' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [1, 2, 3, 4], y: [-1, 1] }"
    :view="{ width: 700, height: 360 }"
    :font-scale="1.2"
  />
</template>
