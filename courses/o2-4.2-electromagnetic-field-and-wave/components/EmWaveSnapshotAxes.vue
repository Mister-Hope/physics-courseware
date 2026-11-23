<!--
  4.2 P8：某一时刻的波形与波长
  —— 把某一时刻的电场沿传播方向“定格”：一条正弦曲线；点击后标出相邻两个波峰之间的距离（波长 λ）。
  坐标轴一律用共享 CoordAxes（不手写坐标轴）。
-->
<template>
  <CoordAxes
    :x-range="[0, 12.6]"
    :y-range="[-1.55, 1.5]"
    :x-axis="{ quantity: 'x' }"
    :y-axis="{ quantity: 'E' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [], y: [], labels: false, origin: false }"
    :view="{ width: 880, height: 288 }"
  >
    <template #overlay="{ x, y }">
      <g v-if="step >= 1">
        <CourseArrow
          :from="{ x: x(1), y: y(1.26) }"
          :to="{ x: x(5), y: y(1.26) }"
          stroke="var(--c-text-dim)"
          :stroke-width="1.4"
          :head-size="8"
        />
        <CourseArrow
          :from="{ x: x(5), y: y(1.26) }"
          :to="{ x: x(1), y: y(1.26) }"
          stroke="var(--c-text-dim)"
          :stroke-width="1.4"
          :head-size="8"
        />
      </g>
    </template>
  </CoordAxes>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

/** 某时刻的电场分布：波长 4 个单位，振幅 1 */
const curves = [
  {
    formula: (x: number): number => Math.sin((Math.PI * x) / 2),
    color: "var(--c-physics)",
    width: 3,
  },
];

const labels = [
  {
    x: 3,
    y: 1.3,
    tex: String.raw`\lambda`,
    anchor: "center",
    color: "var(--c-text)",
    size: 19,
    showAt: 1,
  },
];
</script>
