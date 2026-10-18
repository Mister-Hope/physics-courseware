<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 3 页交互：U-I 图像。滑块改电阻 R 得到不同倾斜程度的直线，滑块改工作点电流 I， 图上标出该点并实时读出电压 U 与比值 U/I —— 由真实公式 U = IR 计算，比值恒等于
 * R。
 */
const r = ref(10);
const i = ref(0.3);

const uMax = 12.5;
const iMax = 0.6;

const u = computed(() => r.value * i.value);
const ratio = computed(() => u.value / i.value);

const line = computed(() => [
  { x: 0, y: 0 },
  { x: iMax, y: Math.min(r.value * iMax, uMax) },
]);
const point = computed(() => ({ x: i.value, y: u.value, math: "P", color: "var(--c-accent)" }));
</script>

<template>
  <div class="res-ui">
    <div class="res-ui-chart">
      <SimpleAxis
        :x-max="iMax"
        :y-max="uMax"
        :x-axis="{ quantity: 'I', unit: 'A' }"
        :y-axis="{ quantity: 'U', unit: 'V' }"
        :curves="[{ points: line, color: 'var(--c-accent-2)' }]"
        :point="point"
        :guides="{ color: 'var(--c-accent)' }"
        :ticks="{ x: [0.2, 0.4, 0.6], y: [4, 8, 12] }"
        :view="{ width: 560, height: 250 }"
      />
    </div>
    <div class="res-ui-panel">
      <CourseSlider
        v-model="r"
        :min="2"
        :max="20"
        :step="0.5"
        label="电阻"
        label-tex="R"
        accent="gold"
        label-width="3.4rem"
      >
        <template #value>{{ r.toFixed(1) }}<Latex tex="\ \Omega" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="i"
        :min="0.05"
        :max="0.6"
        :step="0.01"
        label="电流"
        label-tex="I"
        accent="blue"
        label-width="3.4rem"
      >
        <template #value>{{ i.toFixed(2) }}<Latex tex="\ \text{A}" /></template>
      </CourseSlider>
      <div class="res-ui-readout">
        <div><Latex :tex="`U = ${u.toFixed(1)}\\ \\text{V}`" /></div>
        <div><Latex :tex="`\\dfrac{U}{I} = ${ratio.toFixed(1)}\\ \\Omega`" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.res-ui {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.res-ui-chart {
  flex: 1;
  min-width: 0;
}

.res-ui-panel {
  width: 15.5rem;
  display: grid;
  gap: 0.5rem;
}

.res-ui-readout {
  display: flex;
  gap: 1.6rem;
  justify-content: center;
  font-size: 1.2rem;
}
</style>
