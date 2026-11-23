<script setup lang="ts">
import { computed } from "vue";

/** 3.2 波的描述 · 判断质点振动方向：波沿 +x 传播，把波形微移后 P 到达 P′，P 向下运动 */
const { step = 0 } = defineProps<{ step?: number }>();

const curves = [
  {
    formula: (x: number): number => Math.sin(Math.PI * x),
    samples: 300,
    color: "var(--c-accent)",
    width: 3,
  },
  {
    formula: (x: number): number => Math.sin(Math.PI * (x - 0.25)),
    samples: 300,
    color: "var(--c-accent-2)",
    width: 2.6,
    dashed: true,
    showAt: 1,
  },
];
const labels = computed(() => [
  { x: 0.25, y: Math.SQRT1_2, tex: "P", anchor: "top-right", dot: 5, color: "var(--c-accent)" },
  { x: 3.1, y: 1.32, text: "传播方向", anchor: "bottom", size: 14, color: "var(--c-text-dim)" },
  ...(step >= 1
    ? [{ x: 0.25, y: 0, tex: "P'", anchor: "bottom-right", dot: 5, color: "var(--c-accent-2)" }]
    : []),
  ...(step >= 2
    ? [{ x: 0.36, y: 0.46, tex: "v", anchor: "left", size: 18, color: "var(--c-accent-2)" }]
    : []),
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 4.4]"
    :y-range="[-1.5, 1.55]"
    :x-axis="{ quantity: 'x', unit: 'm' }"
    :y-axis="{ quantity: 'y', unit: 'cm' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [1, 2, 3, 4], y: [-1, 1] }"
    :view="{ width: 700, height: 360 }"
    :font-scale="1.2"
    :step="step"
  >
    <template #overlay="{ x, y }">
      <CourseArrow
        :from="{ x: x(2.7), y: y(1.15) }"
        :to="{ x: x(3.7), y: y(1.15) }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="6"
      />
      <CourseArrow
        v-if="step >= 2"
        :from="{ x: x(0.25), y: y(Math.SQRT1_2) }"
        :to="{ x: x(0.25), y: y(0.26) }"
        stroke="var(--c-accent-2)"
        :stroke-width="2.2"
        :head-size="7"
      />
    </template>
  </CoordAxes>
</template>
