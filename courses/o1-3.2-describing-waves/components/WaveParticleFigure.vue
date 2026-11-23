<script setup lang="ts">
import { computed } from "vue";

/** 3.2 波的描述 · 练习：质点 P 此时刻的速度与加速度方向（v 向上，a 指向平衡位置向下） */
const { step = 0 } = defineProps<{ step?: number }>();

const curves = [
  {
    formula: (x: number): number => Math.sin(Math.PI * x),
    samples: 300,
    color: "var(--c-accent)",
    width: 3,
  },
];
const labels = computed(() => [
  { x: 0.75, y: Math.SQRT1_2, tex: "P", anchor: "left", dot: 5, color: "var(--c-accent)" },
  ...(step >= 1
    ? [
        { x: 0.88, y: 1.02, tex: "v", anchor: "left", size: 18, color: "var(--c-accent-2)" },
        { x: 0.88, y: 0.4, tex: "a", anchor: "left", size: 18, color: "var(--c-accent)" },
      ]
    : []),
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 4.4]"
    :y-range="[-1.55, 1.55]"
    :x-axis="{ quantity: 'x', unit: 'm' }"
    :y-axis="{ quantity: 'y', unit: 'cm' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [1, 2, 3, 4], y: [-1, 1] }"
    :view="{ width: 650, height: 360 }"
    :font-scale="1.25"
  >
    <template #overlay="{ x, y }">
      <template v-if="step >= 1">
        <CourseArrow
          :from="{ x: x(0.75), y: y(Math.SQRT1_2) }"
          :to="{ x: x(0.75), y: y(1.2) }"
          stroke="var(--c-accent-2)"
          :stroke-width="2.2"
          :head-size="7"
        />
        <CourseArrow
          :from="{ x: x(0.75), y: y(Math.SQRT1_2) }"
          :to="{ x: x(0.75), y: y(0.22) }"
          stroke="var(--c-accent)"
          :stroke-width="2.2"
          :head-size="7"
        />
      </template>
    </template>
  </CoordAxes>
</template>
