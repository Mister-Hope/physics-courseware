<!-- 4.1 P6：黑体辐射曲线的温度交互——按普朗克公式真算强度，峰值随温度左移 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const { initial = 5000 } = defineProps<{ initial?: number }>();

const temp = ref(initial);

/** Hc/k，单位 μm·K */
const HCK = 1.4388e4;

/** 相对强度：I(λ, T) = 1 / (λ^5 (e^{hc/λkT} − 1))，λ 取 μm */
const intensity = (lambda: number, t: number): number => {
  if (lambda <= 0) return 0;
  return 1 / (lambda ** 5 * (Math.exp(HCK / (lambda * t)) - 1));
};

/** 维恩位移：λ_max = b/T，b = 2898 μm·K */
const peakLambda = computed<number>(() => 2898 / temp.value);

const curves = computed(() => [
  {
    formula: (x: number): number => intensity(x, 4000),
    color: "var(--c-text-dim)",
    width: 1.2,
    dashed: true,
    opacity: 0.5,
  },
  {
    formula: (x: number): number => intensity(x, 6000),
    color: "var(--c-text-dim)",
    width: 1.2,
    dashed: true,
    opacity: 0.5,
  },
  {
    formula: (x: number): number => intensity(x, temp.value),
    color: "var(--c-accent)",
    width: 2.8,
  },
]);

const marks = computed(() => [
  {
    x: peakLambda.value,
    y: intensity(peakLambda.value, temp.value),
    dot: true,
    dotColor: "var(--c-accent)",
  },
]);

const peakText = computed<string>(() => peakLambda.value.toFixed(2));
</script>

<template>
  <div class="pk-explorer">
    <div class="pk-explorer-chart">
      <CoordAxes
        :x-range="[0, 2.2]"
        :y-range="[0, 0.3]"
        :x-axis="{ quantity: 'λ', unit: 'μm' }"
        :y-axis="{ quantity: 'I' }"
        :curves="curves"
        :labels="marks"
        :view="{ width: 520, height: 340 }"
      />
      <div class="pk-axis-note">纵轴：辐射强度（相对值）</div>
    </div>
    <div class="pk-explorer-panel">
      <div class="pk-readout">
        <div class="pk-readout-row">
          <span class="pk-readout-label">温度</span>
          <span class="pk-readout-value">{{ temp }} K</span>
        </div>
        <div class="pk-readout-row">
          <span class="pk-readout-label">峰值波长</span>
          <span class="pk-readout-value">≈ {{ peakText }} μm</span>
        </div>
      </div>
      <CourseSlider
        v-model="temp"
        :min="4000"
        :max="6000"
        :step="100"
        label="温度"
        label-tex="T"
        label-width="4.6rem"
        accent="gold"
      />
      <div class="mini-note">虚线为 4000 K 与 6000 K 的曲线，用来对比。</div>
    </div>
  </div>
</template>
