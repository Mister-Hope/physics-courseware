<script setup lang="ts">
// 受迫振动频率：改变驱动力频率，稳定后振动的频率随驱动力频率改变
import { computed, ref } from "vue";

const driveFreq = ref(0.6);
const NATURAL_FREQ = 1;
const ZETA = 0.22;

const amp = computed(
  () =>
    1 /
    Math.sqrt(
      (1 - (driveFreq.value / NATURAL_FREQ) ** 2) ** 2 +
        (2 * ZETA * driveFreq.value / NATURAL_FREQ) ** 2,
    ),
);

const curve = computed(() => ({
  formula: (t: number) => amp.value * Math.sin(2 * Math.PI * driveFreq.value * t),
  color: "var(--c-accent)",
  width: 2.4,
}));

const labels = computed(() => [
  {
    x: 2.15,
    y: 1.9,
    text: `f = ${driveFreq.value.toFixed(2)} Hz`,
    anchor: "center" as const,
    size: 14,
    color: "var(--c-accent)",
    halo: true,
  },
]);
</script>

<template>
  <div class="fw-explorer">
    <div class="fw-chart">
      <CoordAxes
        :x-range="[0, 4]"
        :y-range="[-2.5, 2.5]"
        :x-axis="{ quantity: 't', unit: 's' }"
        :y-axis="{ quantity: 'x', unit: 'm' }"
        :curves="[curve]"
        :labels="labels"
        :ticks="{ labels: true, origin: false, x: [0, 1, 2, 3, 4], y: [-2, 0, 2] }"
        :view="{ width: 700, height: 320 }"
      />
    </div>
    <div class="fw-controls">
      <CourseSlider
        v-model="driveFreq"
        :min="0.5"
        :max="2"
        :step="0.05"
        label="驱动力频率"
        label-tex="f"
        accent="gold"
        layout="tight"
      />
      <div class="fw-values">
        <div><Latex tex="f" /> = {{ driveFreq.toFixed(2) }} <Latex tex="\text{Hz}" /></div>
        <div><Latex tex="T" /> = {{ (1 / driveFreq).toFixed(2) }} <Latex tex="\text{s}" /></div>
        <div><Latex tex="f_0" /> = 1.00 <Latex tex="\text{Hz}" /></div>
      </div>
      <div class="fw-formula"><Latex tex="f=f_{\text{驱}}" /></div>
    </div>
  </div>
</template>
