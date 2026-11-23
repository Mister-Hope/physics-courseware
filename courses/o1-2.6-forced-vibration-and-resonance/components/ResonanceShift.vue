<script setup lang="ts">
// 摆长增大时，共振峰向低频方向移动
const { step = 0 } = defineProps<{ step?: number }>();

const ZETA = 0.16;
const ampAt = (f: number, f0: number): number => {
  const x = f / f0;
  return 1 / Math.hypot(1 - x ** 2, 2 * ZETA * x);
};
const norm = (f: number, f0: number): number => ampAt(f, f0) / ampAt(f0, f0);

const curves = [
  { formula: (f: number): number => norm(f, 1), color: "var(--c-accent)", width: 2.6 },
  { formula: (f: number): number => norm(f, 0.8), color: "var(--c-sky)", width: 2.2, showAt: 1 },
];

const labels = [
  {
    x: 1,
    y: 1.04,
    tex: "f_0",
    anchor: "top" as const,
    size: 12,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: 0.8,
    y: 1.04,
    tex: "f_0'",
    anchor: "top" as const,
    size: 12,
    color: "var(--c-sky)",
    halo: true,
    showAt: 1,
  },
  {
    x: 1,
    y: 0.5,
    text: "原曲线",
    anchor: "center" as const,
    size: 11,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: 0.8,
    y: 0.5,
    text: "摆长增大",
    anchor: "center" as const,
    size: 11,
    color: "var(--c-sky)",
    halo: true,
    showAt: 1,
  },
];
</script>

<template>
  <CoordAxes
    :x-range="[0.3, 1.9]"
    :y-range="[0, 1.12]"
    :x-axis="{ quantity: 'f', unit: 'Hz' }"
    :y-axis="{ quantity: 'A' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [0.5, 1, 1.5], y: [0.5, 1], labels: true, origin: false }"
    :view="{ width: 760, height: 240 }"
    :step="step"
  >
    <template #overlay="{ x, y }">
      <CourseArrow
        v-if="step >= 2"
        :from="{ x: x(1.06), y: y(0.9) }"
        :to="{ x: x(0.84), y: y(0.9) }"
        stroke="var(--c-accent)"
        :stroke-width="2.2"
        label="左移"
      />
    </template>
  </CoordAxes>
</template>
