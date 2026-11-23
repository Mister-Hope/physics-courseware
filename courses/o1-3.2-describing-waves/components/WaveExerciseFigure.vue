<script setup lang="ts">
/** 3.2 波的描述 · 方向练习：波沿 +x 传播，判断 A、B、C、D 的振动方向（点击后才画箭头） */
const { showAnswers = false } = defineProps<{ showAnswers?: boolean }>();

const curves = [
  {
    formula: (x: number): number => Math.sin(Math.PI * x),
    samples: 300,
    color: "var(--c-accent)",
    width: 3,
  },
];
const labels = [
  { x: 0.2, y: 0.588, text: "A", anchor: "top-left", dot: 5, color: "var(--c-accent-2)" },
  { x: 0.7, y: 0.809, text: "B", anchor: "top-right", dot: 5, color: "var(--c-accent-2)" },
  { x: 1.2, y: -0.588, text: "C", anchor: "bottom-right", dot: 5, color: "var(--c-accent-2)" },
  { x: 1.7, y: -0.809, text: "D", anchor: "bottom-left", dot: 5, color: "var(--c-accent-2)" },
];
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
    :view="{ width: 700, height: 360 }"
    :font-scale="1.2"
  >
    <template #overlay="{ x, y }">
      <template v-if="showAnswers">
        <CourseArrow
          :from="{ x: x(0.2), y: y(0.588) }"
          :to="{ x: x(0.2), y: y(0.18) }"
          stroke="var(--c-accent-2)"
          :stroke-width="2"
          :head-size="6"
        />
        <CourseArrow
          :from="{ x: x(0.7), y: y(0.809) }"
          :to="{ x: x(0.7), y: y(1.24) }"
          stroke="var(--c-accent-2)"
          :stroke-width="2"
          :head-size="6"
        />
        <CourseArrow
          :from="{ x: x(1.2), y: y(-0.588) }"
          :to="{ x: x(1.2), y: y(-0.18) }"
          stroke="var(--c-accent-2)"
          :stroke-width="2"
          :head-size="6"
        />
        <CourseArrow
          :from="{ x: x(1.7), y: y(-0.809) }"
          :to="{ x: x(1.7), y: y(-1.28) }"
          stroke="var(--c-accent-2)"
          :stroke-width="2"
          :head-size="6"
        />
      </template>
    </template>
  </CoordAxes>
</template>
