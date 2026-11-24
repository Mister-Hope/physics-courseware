<!-- 第 9 页：加速电压滑块 → 电子动量、德布罗意波长（真实计算）与衍射环大小 -->
<template>
  <div class="lab">
    <CourseSlider
      v-model="voltage"
      :min="100"
      :max="1000"
      :step="10"
      label="加速电压"
      label-tex="U"
      label-width="6.2rem"
      accent="gold"
    >
      <template #value>{{ voltage.toFixed(0) }}<Latex tex="\ \text{V}" /></template>
    </CourseSlider>
    <div class="lab-body">
      <div class="lab-readouts">
        <div class="lab-cell">
          <span class="mini-note">电子动量 <Latex tex="p" /></span>
          <span class="lab-value text-xl"
            >{{ fmt(momentum, 2) }}<Latex tex="\ \times 10^{-24}\ \text{kg}\cdot\text{m/s}"
          /></span>
        </div>
        <div class="lab-cell">
          <span class="mini-note">德布罗意波长 <Latex tex="\lambda" /></span>
          <span class="lab-value lab-value-accent text-xl"
            >{{ fmt(wavelength, 2) }}<Latex tex="\ \times 10^{-10}\ \text{m}"
          /></span>
        </div>
        <div class="lab-cell">
          <span class="mini-note"
            >波长与晶格间距之比 <Latex tex="\lambda/d" />（<Latex
              tex="d = 0.20\ \text{nm}"
            />）</span
          >
          <span class="lab-value text-xl">{{ fmt(ratio, 2) }}</span>
        </div>
      </div>
      <div class="lab-screen">
        <svg viewBox="0 0 220 220" width="100%" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="110"
            cy="110"
            r="96"
            fill="var(--c-surface)"
            fill-opacity="0.4"
            stroke="var(--c-border)"
            stroke-width="1.2"
          />
          <circle
            cx="110"
            cy="110"
            :r="ring2"
            fill="none"
            stroke="var(--c-physics)"
            stroke-width="1.6"
            opacity="0.55"
          />
          <circle
            cx="110"
            cy="110"
            :r="ring1"
            fill="none"
            stroke="var(--c-physics)"
            stroke-width="2"
            opacity="0.9"
          />
          <circle cx="110" cy="110" r="6" fill="var(--c-accent)" opacity="0.9" />
        </svg>
        <span class="mini-note">衍射环（示意）</span>
      </div>
    </div>
    <div class="lab-formula"><Latex tex="\lambda = \dfrac{h}{\sqrt{2m_{\text{e}}eU}}" /></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

/** 普朗克常量（J·s） */
const H = 6.63e-34;
/** 电子质量（kg） */
const M_E = 9.11e-31;
/** 元电荷（C） */
const E = 1.6e-19;
/** 晶体中相邻原子的间距，取 0.20 nm（m） */
const D = 2e-10;

const voltage = ref(100);

/** 电子动量，单位 10^-24 kg·m/s */
const momentum = computed(() => Math.sqrt(2 * M_E * E * voltage.value) / 1e-24);
/** 德布罗意波长，单位 10^-10 m */
const wavelength = computed(() => (H / Math.sqrt(2 * M_E * E * voltage.value)) * 1e10);
/** 波长与晶格间距之比 */
const ratio = computed(() => (wavelength.value * 1e-10) / D);
/** 衍射环半径与波长成正比：100 V 时取 62（画布单位），电压升高则环变小 */
const ring1 = computed(() => (wavelength.value / 1.2279) * 62);
const ring2 = computed(() => ring1.value * 1.5);

const fmt = (value: number, digits: number): string => value.toFixed(digits);
</script>

<style scoped>
.lab {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: 100%;
}
.lab-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  gap: 1.8rem;
  align-items: center;
}
.lab-readouts {
  display: grid;
  gap: 0.45rem;
}
.lab-cell {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}
.lab-value {
  color: var(--c-text);
  font-variant-numeric: tabular-nums;
  line-height: 1.3;
}
.lab-value-accent {
  color: var(--c-accent);
}
.lab-screen {
  text-align: center;
}
.lab-screen svg {
  display: block;
  width: 100%;
}
.lab-screen .mini-note {
  display: block;
}
.lab-formula {
  text-align: center;
}
</style>
