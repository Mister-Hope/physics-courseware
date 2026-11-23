<!--
  第 14 页「改变电感或电容」：拖动 L、C 两个滑块，用 T = 2π√(LC) 实时算出固有周期与频率，
  并在固定时间窗口（0～1000 ns）里画出 q–t 波形，让学生看见「T 变大 → 波形变疏」。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

/** 电感，单位 μH */
const L = ref(30);
/** 电容，单位 pF */
const C = ref(100);

/** 真实周期 T = 2π√(LC)，单位 s */
const period = computed(() => 2 * Math.PI * Math.sqrt(L.value * 1e-6 * C.value * 1e-12));
/** 频率 f = 1/T，单位 Hz */
const freq = computed(() => 1 / period.value);

/** 读数用的数值（μs / MHz）——固定两位小数，切换参数时不跳位 */
const periodUs = computed(() => period.value * 1e6);
const periodNs = computed(() => period.value * 1e9);
const freqMHz = computed(() => freq.value / 1e6);

const curves = computed(() => [
  {
    formula: (t: number): number => Math.cos((2 * Math.PI * t) / periodNs.value),
    samples: 400,
    color: "var(--c-accent)",
    width: 2.6,
  },
]);
</script>

<template>
  <div class="lab">
    <div class="lab-graph">
      <CoordAxes
        :x-range="[0, 1000]"
        :y-range="[-1.08, 1.08]"
        :x-axis="{ quantity: 't', unit: 'ns', side: 'below' }"
        :y-axis="{ quantity: 'q' }"
        :curves="curves"
        :ticks="{ x: [], y: [], labels: false }"
        :view="{ width: 480, height: 300 }"
      />
    </div>
    <div class="lab-panel">
      <div class="lab-readout">
        <div class="lab-cell">
          <div class="lab-key">周期 <Latex tex="T" /></div>
          <div class="lab-val">{{ periodUs.toFixed(2) }}<Latex tex="\ \mu\text{s}" /></div>
        </div>
        <div class="lab-cell">
          <div class="lab-key">频率 <Latex tex="f" /></div>
          <div class="lab-val">{{ freqMHz.toFixed(2) }}<Latex tex="\ \text{MHz}" /></div>
        </div>
      </div>
      <CourseSlider
        v-model="L"
        :min="20"
        :max="80"
        :step="1"
        label="电感"
        label-tex="L"
        label-width="4rem"
      >
        <template #value>{{ L }}<Latex tex="\ \mu\text{H}" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="C"
        :min="20"
        :max="400"
        :step="5"
        label="电容"
        label-tex="C"
        label-width="4rem"
        accent="blue"
      >
        <template #value>{{ C }}<Latex tex="\ \text{pF}" /></template>
      </CourseSlider>
    </div>
  </div>
</template>

<style scoped>
.lab {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: 1.6rem;
  align-items: center;

  width: 100%;
}

.lab-graph {
  width: 100%;
  min-width: 0;
}

.lab-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
}

.lab-readout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.8rem;
}

.lab-cell {
  padding: 0.5rem 0.95rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 1rem;
  background: rgb(255 255 255 / 5%);
}

.lab-key {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.lab-val {
  display: flex;
  gap: 0.1rem;
  align-items: baseline;

  font-weight: 700;
  font-size: 1.42rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.3;
}
</style>
