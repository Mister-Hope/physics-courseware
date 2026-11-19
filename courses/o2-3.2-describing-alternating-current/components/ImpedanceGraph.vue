<!--
  第 13、14 页：同一交流电压下，电感中的电流随频率升高而减小，
  电容中的电流随频率升高而增大。只画趋势，不标刻度。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 6.4]"
      :y-range="[0, 6.2]"
      :x-axis="{ quantity: 'f' }"
      :y-axis="{ quantity: 'I' }"
      :ticks="{ x: [], y: [], labels: false, origin: false }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 700, height: 280 }"
    />
  </div>
</template>

<script setup lang="ts">
const { mode = "inductor" } = defineProps<{ mode?: "inductor" | "capacitor" }>();

const curves = [
  {
    formula: (x: number): number => 5 / (1 + 0.55 * x),
    color: mode === "inductor" ? "var(--c-accent)" : "var(--c-text-dim)",
    width: mode === "inductor" ? 3.2 : 1.6,
    opacity: mode === "inductor" ? 1 : 0.35,
  },
  {
    formula: (x: number): number => (3.8 * x) / (1 + 0.35 * x),
    color: mode === "capacitor" ? "var(--c-accent-2)" : "var(--c-text-dim)",
    width: mode === "capacitor" ? 3.2 : 1.6,
    opacity: mode === "capacitor" ? 1 : 0.35,
  },
];

const labels = [
  {
    x: 6.1,
    y: 1.35,
    text: "电感",
    anchor: "right" as const,
    size: 15,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: 6.1,
    y: 5.25,
    text: "电容",
    anchor: "right" as const,
    size: 15,
    color: "var(--c-accent-2)",
    halo: true,
  },
];
</script>
