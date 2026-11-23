<!--
  第 14 页：某一时刻的波形图（y-x 图像），坐标轴用共享 CoordAxes 画。
  横坐标 = 各质点的平衡位置，纵坐标 = 该时刻各质点偏离平衡位置的位移；
  曲线上的圆点表示介质中的质点，第 1 击后给其中一个质点标出它的横、纵坐标。
-->
<template>
  <CoordAxes
    :x-range="[0, 10.4]"
    :y-range="[-1.5, 1.5]"
    :x-axis="{ quantity: 'x' }"
    :y-axis="{ quantity: 'y' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [], y: [], labels: false, origin: false }"
    :view="{ width: 900, height: 210 }"
    :step="step"
  >
    <template #overlay="{ x, y }">
      <g>
        <line
          v-if="step >= 1"
          :x1="x(1)"
          :y1="y(amplitude)"
          :x2="x(1)"
          :y2="y(0)"
          stroke="var(--c-text-mute)"
          stroke-width="1.5"
          stroke-dasharray="6 4"
        />
        <line
          v-if="step >= 1"
          :x1="x(0)"
          :y1="y(amplitude)"
          :x2="x(1)"
          :y2="y(amplitude)"
          stroke="var(--c-text-mute)"
          stroke-width="1.5"
          stroke-dasharray="6 4"
        />
        <circle
          v-for="point in particles"
          :key="point.x"
          :cx="x(point.x)"
          :cy="y(point.y)"
          r="3.4"
          fill="var(--c-physics)"
        />
      </g>
    </template>
  </CoordAxes>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

/** 振幅取 1、波长取 4 个横轴单位：曲线上每隔 0.5 放一个质点 */
const amplitude = 1;
const wavelength = 4;

const shape = (x: number): number => amplitude * Math.sin((2 * Math.PI * x) / wavelength);

/** 曲线画到 x = 10 为止，给末端的坐标轴箭头留出空隙 */
const curves = [
  {
    points: Array.from({ length: 201 }, (_, index) => {
      const x = index * 0.05;

      return { x, y: shape(x) };
    }),
    color: "var(--c-accent)",
    width: 3,
  },
];

const particles = Array.from({ length: 21 }, (_, index) => {
  const x = index * 0.5;

  return { x, y: shape(x) };
});

const labels = computed(() => [
  {
    x: 1.16,
    y: -0.14,
    tex: "x_1",
    anchor: "top-left" as const,
    size: 15,
    color: "var(--c-text-dim)",
    showAt: 1,
  },
  {
    x: 0.14,
    y: amplitude,
    tex: "y_1",
    anchor: "left" as const,
    size: 15,
    color: "var(--c-text-dim)",
    showAt: 1,
  },
]);
</script>
