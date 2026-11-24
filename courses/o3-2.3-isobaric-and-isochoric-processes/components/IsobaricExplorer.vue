<!-- 第 4 页交互：等压变化 V-T 图。滑块改变 T，状态点沿过原点的直线移动，V/T 始终不变 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const temperature = ref<number>(300);
const constant = 1 / 300;
const volume = computed<number>(() => constant * temperature.value);
const temperatureTex = computed<string>(() => `T=${temperature.value}\\ \\text{K}`);
const volumeTex = computed<string>(() => `V=${volume.value.toFixed(2)}\\ \\text{L}`);
const ratioTex = computed<string>(
  () =>
    `\\frac{V}{T}=${((volume.value / temperature.value) * 1000).toFixed(2)}\\times10^{-3}\\ \\text{L/K}`,
);
</script>

<template>
  <div class="iso-lab">
    <div class="iso-chart">
      <CoordAxes
        :x-range="[0, 650]"
        :y-range="[0, 2.3]"
        :x-axis="{ quantity: 'T', unit: ' / K' }"
        :y-axis="{ quantity: 'V', unit: ' / L' }"
        :ticks="{ labels: false }"
        :curves="[{ formula: (t: number) => constant * t, color: 'var(--c-accent)', width: 3 }]"
        :labels="[{ x: temperature, y: volume, dot: true, dotColor: 'var(--c-accent)' }]"
      />
    </div>
    <div class="iso-panel">
      <div class="iso-read"><Latex :tex="temperatureTex" /></div>
      <div class="iso-read"><Latex :tex="volumeTex" /></div>
      <div class="iso-read iso-constant"><Latex :tex="ratioTex" /></div>
      <CourseSlider
        v-model="temperature"
        :min="150"
        :max="600"
        :step="10"
        label="温度"
        label-tex="T"
        label-width="4.6rem"
        accent="gold"
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
  color: var(--c-accent);
  font-weight: 700;
}
</style>
