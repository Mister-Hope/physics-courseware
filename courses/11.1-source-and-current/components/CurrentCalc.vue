<script setup lang="ts">
import { computed, ref } from "vue";

/** 第 8 页交互：拖动电流 I 与通电时间 t，按真实公式 q = It、N = q/e 实时计算通过横截面的电荷量与电子数。 */
const iMa = ref(200);
const tS = ref(5);

/** 电子电荷量（库仑） */
const E_CHARGE = 1.6e-19;

const qC = computed(() => (iMa.value / 1000) * tS.value);
const nElec = computed(() => qC.value / E_CHARGE);

/** 科学计数法的 LaTeX：1.60 \times 10^{-4}（0 与个位数单独处理） */
const sci = (value: number): string => {
  if (value <= 0) return "0";
  const exp = Math.floor(Math.log10(value));
  const mantissa = value / 10 ** exp;
  if (exp === 0) return mantissa.toFixed(2);
  return `${mantissa.toFixed(2)} \\times 10^{${exp}}`;
};

const qTex = computed(() => `q = It = ${sci(qC.value)}\\ \\text{C}`);
const nTex = computed(() => `N = \\dfrac{q}{e} = ${sci(nElec.value)}`);
</script>

<template>
  <div class="cur-calc">
    <div class="cur-sliders">
      <CourseSlider
        v-model="iMa"
        :min="0"
        :max="500"
        :step="1"
        label="电流"
        label-tex="I"
        accent="gold"
      >
        <template #value>{{ iMa }}<Latex tex="\ \text{mA}" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="tS"
        :min="0"
        :max="30"
        :step="0.1"
        label="通电时间"
        label-tex="t"
        accent="blue"
      >
        <template #value>{{ tS.toFixed(1) }}<Latex tex="\ \text{s}" /></template>
      </CourseSlider>
    </div>
    <div class="cur-result">
      <div class="cur-formula"><Latex :tex="qTex" /></div>
      <div class="cur-formula"><Latex :tex="nTex" /></div>
    </div>
  </div>
</template>

<style scoped>
.cur-calc {
  display: grid;
  gap: 1rem;
  padding: 1.1rem 1.35rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  background: var(--c-surface);
  backdrop-filter: blur(16px);
}

.cur-sliders {
  display: grid;
  gap: 0.55rem;
}

.cur-result {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.4rem;
  align-items: center;
  justify-content: center;
}

.cur-formula {
  font-size: 1.2rem;
}
</style>
