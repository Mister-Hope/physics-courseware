<script setup lang="ts">
/** 3.2 波的描述 · 波形图与振动图像对比：左图横轴是位置，右图横轴是时间 */
const xAxis = { quantity: "x", unit: "m" };
const tAxis = { quantity: "t", unit: "s" };
const yAxis = { quantity: "y", unit: "cm" };
const curvesX = [
  {
    formula: (x: number): number => Math.sin(Math.PI * x),
    samples: 240,
    color: "var(--c-accent)",
    width: 3,
  },
];
const curvesT = [
  {
    formula: (t: number): number => Math.sin(Math.PI * t),
    samples: 240,
    color: "var(--c-accent-2)",
    width: 3,
  },
];
const labelsX = [
  { x: 0.75, y: Math.SQRT1_2, tex: "P", anchor: "top-right", dot: 5, color: "var(--c-accent-2)" },
];
const labelsT = [
  { x: 0.75, y: Math.SQRT1_2, tex: "P", anchor: "top-right", dot: 5, color: "var(--c-accent-2)" },
];
</script>

<template>
  <div class="wc-grid">
    <div class="wc-panel">
      <CoordAxes
        :x-range="[0, 4.4]"
        :y-range="[-1.35, 1.35]"
        :x-axis="xAxis"
        :y-axis="yAxis"
        :curves="curvesX"
        :labels="labelsX"
        :ticks="{ x: [1, 2, 3, 4], y: [-1, 1] }"
        :view="{ width: 640, height: 270 }"
        :font-scale="1.4"
      />
      <div class="wc-cap">波形图：某一时刻各质点的位移</div>
    </div>
    <div class="wc-panel">
      <CoordAxes
        :x-range="[0, 4.4]"
        :y-range="[-1.35, 1.35]"
        :x-axis="tAxis"
        :y-axis="yAxis"
        :curves="curvesT"
        :labels="labelsT"
        :ticks="{ x: [1, 2, 3, 4], y: [-1, 1] }"
        :view="{ width: 640, height: 270 }"
        :font-scale="1.4"
      />
      <div class="wc-cap">振动图像：某一质点在各时刻的位移</div>
    </div>
  </div>
</template>
