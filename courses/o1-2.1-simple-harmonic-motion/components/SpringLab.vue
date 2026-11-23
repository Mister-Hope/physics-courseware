<!-- 2.1 弹簧振子实验室：改 k、m、A，实时算出 ω、T、f 与 x-t 曲线 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const k = ref(40);
const m = ref(1);
const amplitudeCm = ref(10);

const omega = computed(() => Math.sqrt(k.value / m.value));
const period = computed(() => (2 * Math.PI) / omega.value);
const freq = computed(() => 1 / period.value);
const amplitude = computed(() => amplitudeCm.value / 100);

const curves = computed(() => [
  {
    formula: (t: number) => amplitude.value * Math.sin(omega.value * t),
    samples: 500,
    color: "var(--c-accent)",
    width: 2.6,
  },
]);
</script>

<template>
  <div class="lab">
    <div class="lab-chart">
      <CoordAxes
        :x-range="[0, 2]"
        :y-range="[-0.23, 0.23]"
        :x-axis="{ quantity: 't', unit: 's', side: 'below' }"
        :y-axis="{ quantity: 'x', unit: 'm' }"
        :curves="curves"
        :ticks="{ x: [], y: [], labels: false }"
        :view="{ width: 470, height: 340 }"
      />
    </div>
    <div class="lab-side">
      <div class="lab-slider">
        <CourseSlider
          v-model="k"
          :min="10"
          :max="80"
          :step="2"
          label="劲度系数"
          label-tex="k"
          label-width="6.4rem"
        >
          <template #value> {{ k }}<Latex tex="\ \text{N/m}" /> </template>
        </CourseSlider>
      </div>
      <div class="lab-slider">
        <CourseSlider
          v-model="m"
          :min="0.2"
          :max="2"
          :step="0.1"
          label="质量"
          label-tex="m"
          label-width="6.4rem"
          accent="blue"
        >
          <template #value> {{ m.toFixed(1) }}<Latex tex="\ \text{kg}" /> </template>
        </CourseSlider>
      </div>
      <div class="lab-slider">
        <CourseSlider
          v-model="amplitudeCm"
          :min="2"
          :max="20"
          :step="1"
          label="振幅"
          label-tex="A"
          label-width="6.4rem"
          accent="blue"
        >
          <template #value> {{ amplitudeCm }}<Latex tex="\ \text{cm}" /> </template>
        </CourseSlider>
      </div>
      <div class="lab-readout">
        <div class="lab-cell">
          <div class="lab-key"><Latex tex="\omega" /></div>
          <div class="lab-val">{{ omega.toFixed(2) }}<Latex tex="\ \text{rad/s}" /></div>
        </div>
        <div class="lab-cell">
          <div class="lab-key"><Latex tex="T" /></div>
          <div class="lab-val">{{ period.toFixed(2) }}<Latex tex="\ \text{s}" /></div>
        </div>
        <div class="lab-cell">
          <div class="lab-key"><Latex tex="f" /></div>
          <div class="lab-val">{{ freq.toFixed(2) }}<Latex tex="\ \text{Hz}" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;
  width: 100%;
}

.lab-chart {
  width: 100%;
}

.lab-side {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
}

.lab-readout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;
  margin-top: 0.2rem;
}

.lab-cell {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.85rem;
  padding: 0.42rem 0.55rem;
  text-align: center;
}

.lab-key {
  font-size: 0.86rem;
  color: var(--c-text-dim);
}

.lab-val {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.1rem;
  font-size: 1.24rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1.3;
}
</style>
