<script setup lang="ts">
/**
 * 第 7 页：x、y 两个方向都匀速时，抓娃娃机爪的轨迹—— 由 x = v_x t、y = v_y t 消去 t 得 y = (v_y/v_x)x，是一条过原点的直线。 坐标轴交给共享
 * CoordAxes（本组件只填 props，不手写坐标轴 SVG）。
 */
const view = { width: 460, height: 340 };
const xAxis = { quantity: "x", unit: "m" };
const yAxis = { quantity: "y", unit: "m" };
const ticks = { x: [], y: [], labels: false };
const curves = [
  {
    points: [
      { x: 0, y: 0 },
      { x: 3.2, y: 2.4 },
    ],
    stroke: "var(--c-accent)",
    width: 3.4,
  },
];
const labels = [{ x: 1.7, y: 1.28, math: "v", anchor: "bottom-right" }];
</script>

<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 4]"
      :y-range="[0, 3]"
      :x-axis="xAxis"
      :y-axis="yAxis"
      :view="view"
      :ticks="ticks"
      :curves="curves"
      :labels="labels"
    />
  </div>
</template>
