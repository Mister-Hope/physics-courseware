<!-- 第 8 页：简谐运动的 x-t 图像；T=1.0 s，A=0.1 m，x=A sin(2πt/T) -->
<script setup lang="ts">
const xRange: [number, number] = [0, 1.5];
const yRange: [number, number] = [-0.12, 0.12];
const curve = {
  formula: (t: number): number => 0.1 * Math.sin(2 * Math.PI * t),
  color: "var(--c-accent-2)",
  width: 3,
};
const labels = [
  { x: 0.25, y: 0.1, tex: "P", anchor: "top-right" as const, dot: 4 },
  { x: 0.75, y: -0.1, tex: "Q", anchor: "bottom-right" as const, dot: 4 },
  { x: 1, y: 0, tex: "T", anchor: "bottom-right" as const, dot: false },
];
const xAxis = { quantity: "t", unit: "s" };
const yAxis = { quantity: "x", unit: "m" };
const ticks = { x: [0.5, 1.5], y: [0.1, -0.1] };
const view = { width: 760, height: 300 };
</script>

<template>
  <div class="em-xt-host">
    <CoordAxes
      :x-range="xRange"
      :y-range="yRange"
      :x-axis="xAxis"
      :y-axis="yAxis"
      :curves="[curve]"
      :labels="labels"
      :ticks="ticks"
      :view="view"
    />
  </div>
</template>

<style scoped>
.em-xt-host {
  width: 100%;
}
</style>
