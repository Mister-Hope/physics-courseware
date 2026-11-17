<!--
  第 2 页：甲（电池，平直）、乙（学生电源，正弦）两种电压波形的对比。
  只画形状，不标刻度数字——这一页问的是“哪条是电池的”，不是读数。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 6.8]"
      :y-range="[-1.5, 1.5]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'u' }"
      :ticks="{ x: [], y: [], labels: false, origin: false }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 820, height: 300 }"
    />
  </div>
</template>

<script setup lang="ts">
const curves = [
  {
    points: [
      { x: 0, y: 0.55 },
      { x: 6.6, y: 0.55 },
    ],
    color: "var(--c-accent-2)",
    width: 3,
  },
  {
    formula: (x: number): number => Math.sin(x),
    color: "var(--c-accent)",
    width: 3.2,
  },
];

const labels = [
  {
    x: 6,
    y: 0.55,
    text: "甲",
    anchor: "top" as const,
    dy: -2,
    size: 17,
    color: "var(--c-accent-2)",
  },
  {
    x: 1.57,
    y: 1,
    text: "乙",
    anchor: "top" as const,
    dy: -2,
    size: 17,
    color: "var(--c-accent)",
  },
];
</script>
