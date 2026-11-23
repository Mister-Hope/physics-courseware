<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const x0 = 0.6;
const t1 = Math.asin(x0) / (2 * Math.PI);
const t2 = 0.5 - t1;
const peak = 0.25;

const curves = [
  {
    formula: (t: number): number => Math.sin(2 * Math.PI * t),
    samples: 500,
    color: "var(--c-accent)",
    width: 2.6,
  },
];
</script>

<template>
  <CoordAxes
    :step="step"
    :x-range="[0, 2]"
    :y-range="[-1.2, 1.2]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :y-axis="{ quantity: 'x', unit: 'm' }"
    :curves="curves"
    :ticks="{ x: [0, 0.5, 1, 1.5, 2], y: [-1, 0, 1], origin: false }"
    :view="{ width: 900, height: 300 }"
  >
    <template #overlay="{ x, y }">
      <line
        v-if="step >= 1"
        :x1="x(0)"
        :y1="y(x0)"
        :x2="x(2)"
        :y2="y(x0)"
        stroke="var(--c-sky)"
        stroke-width="1.2"
        stroke-dasharray="5 5"
      />
      <text
        v-if="step >= 1"
        :x="x(1.78)"
        :y="y(x0) - 10"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-sky)"
        >x<tspan baseline-shift="sub" font-size="10">0</tspan></text
      >
      <circle v-if="step >= 2" :cx="x(t1)" :cy="y(x0)" r="5" fill="var(--c-accent)" />
      <circle v-if="step >= 2" :cx="x(t2)" :cy="y(x0)" r="5" fill="var(--c-accent)" />
      <CourseArrow
        v-if="step >= 2"
        :from="{ x: x(t1), y: y(x0) }"
        :to="{ x: x(t1 + 0.14), y: y(x0) }"
        stroke="var(--c-velocity)"
        :stroke-width="2"
        :head-size="7"
      />
      <CourseArrow
        v-if="step >= 2"
        :from="{ x: x(t2), y: y(x0) }"
        :to="{ x: x(t2 - 0.14), y: y(x0) }"
        stroke="var(--c-velocity)"
        :stroke-width="2"
        :head-size="7"
      />
      <text
        v-if="step >= 2"
        :x="x(t1) - 6"
        :y="y(x0) - 12"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-velocity)"
        >v</text
      >
      <text
        v-if="step >= 2"
        :x="x(t2) + 6"
        :y="y(x0) - 12"
        text-anchor="start"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-velocity)"
        >v</text
      >
      <text
        v-if="step >= 2"
        :x="x(t1)"
        :y="y(-1.02)"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-text-dim)"
        >t<tspan baseline-shift="sub" font-size="10">1</tspan></text
      >
      <text
        v-if="step >= 2"
        :x="x(t2)"
        :y="y(-1.02)"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-text-dim)"
        >t<tspan baseline-shift="sub" font-size="10">2</tspan></text
      >
      <line
        v-if="step >= 3"
        :x1="x(peak)"
        :y1="y(0)"
        :x2="x(peak)"
        :y2="y(1)"
        stroke="var(--c-text-dim)"
        stroke-width="1"
        stroke-dasharray="3 4"
      />
      <text
        v-if="step >= 3"
        :x="x(peak)"
        :y="y(1.08)"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-text-dim)"
        >t<tspan baseline-shift="sub" font-size="10">max</tspan></text
      >
    </template>
  </CoordAxes>
</template>
