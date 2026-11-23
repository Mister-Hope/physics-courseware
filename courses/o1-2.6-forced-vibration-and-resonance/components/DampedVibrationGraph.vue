<script setup lang="ts">
// 阻尼振动图象：振幅按指数衰减，点击后显示包络线
const { step = 0 } = defineProps<{ step?: number }>();

const decay = 0.5;
const mainCurve = {
  formula: (t: number) => Math.exp(-decay * t) * Math.cos(2 * Math.PI * t),
  color: "var(--c-accent)",
  width: 2.4,
};
const envelopeUp = {
  formula: (t: number) => Math.exp(-decay * t),
  color: "var(--c-text-dim)",
  width: 1.4,
  dashed: true,
  showAt: 1,
};
const envelopeDown = {
  formula: (t: number) => -Math.exp(-decay * t),
  color: "var(--c-text-dim)",
  width: 1.4,
  dashed: true,
  showAt: 1,
};
const labels = [
  { x: 2.1, y: 0.92, text: "振幅逐渐减小", anchor: "center" as const, size: 14, color: "var(--c-text-dim)", halo: true, showAt: 1 },
];
</script>

<template>
  <CoordAxes
    :x-range="[0, 4]"
    :y-range="[-1.1, 1.1]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :y-axis="{ quantity: 'x', unit: 'm' }"
    :curves="[mainCurve, envelopeUp, envelopeDown]"
    :labels="labels"
    :ticks="{ labels: false, origin: false, x: [0, 1, 2, 3, 4], y: [] }"
    :view="{ width: 760, height: 300 }"
    :step="step"
  />
</template>
