<!-- 第 8 页交互：等容变化 p-T 图。滑块改变 T，状态点沿过原点的直线移动，p/T 始终不变 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const temperature = ref<number>(300);
const constant = 1e5 / 300;
const pressure = computed<number>(() => constant * temperature.value);
const temperatureTex = computed<string>(() => `T=${temperature.value}\\ \\text{K}`);
const pressureTex = computed<string>(
  () => `p=${(pressure.value / 1e5).toFixed(2)}\\times10^{5}\\ \\text{Pa}`,
);
const ratioTex = computed<string>(
  () =>
    `\\frac{p}{T}=${(pressure.value / temperature.value / 100).toFixed(2)}\\times10^{2}\\ \\text{Pa/K}`,
);
</script>

<template>
  <div class="iso-lab">
    <div class="iso-chart">
      <CoordAxes
        :x-range="[0, 650]"
        :y-range="[0, 2.3e5]"
        :x-axis="{ quantity: 'T', unit: ' / K' }"
        :y-axis="{ quantity: 'p', unit: ' / Pa' }"
        :ticks="{ labels: false }"
        :curves="[{ formula: (t: number) => constant * t, color: 'var(--c-velocity)', width: 3 }]"
        :labels="[{ x: temperature, y: pressure, dot: true, dotColor: 'var(--c-velocity)' }]"
      />
    </div>
    <div class="iso-panel">
      <div class="iso-read"><Latex :tex="temperatureTex" /></div>
      <div class="iso-read"><Latex :tex="pressureTex" /></div>
      <div class="iso-read iso-constant"><Latex :tex="ratioTex" /></div>
      <CourseSlider
        v-model="temperature"
        :min="150"
        :max="600"
        :step="10"
        label="温度"
        label-tex="T"
        label-width="4.6rem"
        accent="blue"
      />
    </div>
  </div>
</template>

<style scoped>
.iso-lab {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;

  width: 100%;
}

.iso-chart {
  justify-self: center;
  width: 100%;
  max-width: 430px;
}

.iso-chart :deep(svg) {
  width: 100%;
  height: auto;
}

.iso-panel {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.iso-read {
  font-size: 1.02rem;
  text-align: center;
}

.iso-constant {
  color: var(--c-velocity);
  font-weight: 700;
}
</style>
