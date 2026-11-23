<script setup lang="ts">
import { computed, ref } from "vue";

const amplitude = ref(0.1);
const period = ref(1);
const phase = ref(0);

const frequency = computed(() => 1 / period.value);
const omega = computed(() => (2 * Math.PI) / period.value);
const curves = computed(() => [
  {
    formula: (t: number): number =>
      amplitude.value * Math.sin((2 * Math.PI * t) / period.value + phase.value),
    samples: 500,
    color: "var(--c-accent)",
    width: 2.6,
  },
]);
</script>

<template>
  <div class="shm-explorer">
    <div class="shm-chart">
      <CoordAxes
        :x-range="[0, 4]"
        :y-range="[-0.34, 0.34]"
        :x-axis="{ quantity: 't', unit: 's' }"
        :y-axis="{ quantity: 'x', unit: 'm' }"
        :curves="curves"
        :ticks="{ x: [0, 1, 2, 3, 4], y: [-0.3, 0, 0.3], origin: false }"
        :view="{ width: 700, height: 320 }"
      />
    </div>
    <div class="shm-controls">
      <CourseSlider
        v-model="amplitude"
        :min="0.05"
        :max="0.3"
        :step="0.01"
        label="振幅"
        accent="gold"
        layout="tight"
      />
      <CourseSlider
        v-model="period"
        :min="0.5"
        :max="2"
        :step="0.1"
        label="周期"
        accent="blue"
        layout="tight"
      />
      <CourseSlider
        v-model="phase"
        :min="0"
        :max="6.28"
        :step="0.26"
        label="初相"
        accent="teal"
        layout="tight"
      />
      <div class="shm-values">
        <div><Latex tex="A" /> = {{ amplitude.toFixed(2) }} <Latex tex="\text{m}" /></div>
        <div><Latex tex="T" /> = {{ period.toFixed(1) }} <Latex tex="\text{s}" /></div>
        <div><Latex tex="f" /> = {{ frequency.toFixed(2) }} <Latex tex="\text{Hz}" /></div>
        <div><Latex tex="\omega" /> = {{ omega.toFixed(2) }} <Latex tex="\text{rad/s}" /></div>
        <div><Latex tex="\varphi" /> = {{ phase.toFixed(2) }} <Latex tex="\text{rad}" /></div>
      </div>
      <div class="shm-formula"><Latex tex="x=A\sin\left(\frac{2\pi}{T}t+\varphi\right)" /></div>
    </div>
  </div>
</template>
