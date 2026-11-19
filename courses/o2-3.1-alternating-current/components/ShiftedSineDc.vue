<!--
  第 4 页：把正弦交流整体平移到正半轴。原波形有负半周（方向改变），
  平移后始终为正（方向不变、大小变化），因此是直流。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 12.6]"
      :y-range="[-1.3, 3.4]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'i' }"
      :ticks="{ x: [], y: [], labels: false, origin: true }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 900, height: 300 }"
    />
  </div>
</template>

<script setup lang="ts">
const curves = [
  {
    formula: (x: number): number => Math.sin(x),
    color: "var(--c-text-dim)",
    width: 2,
    dashed: true,
    opacity: 0.65,
  },
  {
    formula: (x: number): number => 1.5 + Math.sin(x),
    color: "var(--c-accent)",
    width: 3.2,
  },
];

const labels = [
  {
    x: 12.4,
    y: 3.05,
    text: "平移后：方向始终为正",
    anchor: "left" as const,
    size: 15,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: 12.4,
    y: -0.95,
    text: "原波形：有负半周，方向改变",
    anchor: "left" as const,
    size: 14,
    color: "var(--c-text-dim)",
    halo: true,
  },
];
</script>
