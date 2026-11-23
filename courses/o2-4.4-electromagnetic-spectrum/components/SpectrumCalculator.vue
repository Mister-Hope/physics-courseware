<!--
  第 12 页：电磁波谱计算器。
  拖动频率（对数刻度），按 c = λf 实时计算波长，并标出所在波段。
  波长与频率都由 computed 真实计算，不做查表。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

const C = 3e8;
const exp = ref(14.7);

const f = computed(() => 10 ** exp.value);
const lambda = computed(() => C / f.value);

const fExponent = computed(() => Math.floor(Math.log10(f.value)));
const fMantissa = computed(() => (f.value / 10 ** fExponent.value).toFixed(1));
const fTex = computed(() => `${fMantissa.value} \\times 10^{${fExponent.value}}\\ \\text{Hz}`);

const units = [
  { name: "km", tex: String.raw`\text{km}`, factor: 1e3, threshold: 1e3 },
  { name: "m", tex: String.raw`\text{m}`, factor: 1, threshold: 0.1 },
  { name: "mm", tex: String.raw`\text{mm}`, factor: 1e-3, threshold: 1e-3 },
  { name: "μm", tex: String.raw`\mu\text{m}`, factor: 1e-6, threshold: 1e-6 },
  { name: "nm", tex: String.raw`\text{nm}`, factor: 1e-9, threshold: 1e-9 },
  { name: "pm", tex: String.raw`\text{pm}`, factor: 1e-12, threshold: 0 },
];

const lambdaUnit = computed(
  () => units.find((u) => lambda.value >= u.threshold) ?? units[units.length - 1],
);

const formatValue = (value: number): string => {
  if (value >= 100) return value.toFixed(0);
  if (value >= 10) return value.toFixed(1);
  if (value >= 1) return value.toFixed(2);
  return value.toFixed(3);
};

const lambdaNumber = computed(() => lambda.value / lambdaUnit.value.factor);
const lambdaTex = computed(() => `${formatValue(lambdaNumber.value)}\\ ${lambdaUnit.value.tex}`);

const band = computed(() => {
  if (f.value < 3e12) return { key: "radio", name: "无线电波" };
  if (f.value < 3.947e14) return { key: "infrared", name: "红外线" };
  if (f.value < 7.5e14) return { key: "visible", name: "可见光" };
  if (f.value < 3e16) return { key: "ultraviolet", name: "紫外线" };
  return { key: "xray", name: "X 射线、γ 射线" };
});

const bands = [
  { key: "radio", name: "无线电波" },
  { key: "infrared", name: "红外线" },
  { key: "visible", name: "可见光" },
  { key: "ultraviolet", name: "紫外线" },
  { key: "xray", name: "X 射线、γ 射线" },
];
</script>

<template>
  <div class="em-calc">
    <div class="em-calc-formula">
      <Latex tex="c = \lambda f \qquad \lambda = \frac{c}{f}" display />
    </div>
    <div class="em-calc-readout">
      <div class="em-calc-cell">
        <div class="em-calc-label">频率</div>
        <div class="em-calc-value"><Latex :tex="fTex" /></div>
      </div>
      <div class="em-calc-cell">
        <div class="em-calc-label">波长</div>
        <div class="em-calc-value"><Latex :tex="lambdaTex" /></div>
      </div>
      <div class="em-calc-cell">
        <div class="em-calc-label">所在波段</div>
        <div class="em-calc-band" :class="`em-calc-band-${band.key}`">
          <template v-if="band.key === 'xray'">X 射线、<Latex tex="\gamma" /> 射线</template>
          <template v-else>{{ band.name }}</template>
        </div>
      </div>
    </div>
    <div class="em-calc-slider">
      <CourseSlider
        v-model="exp"
        :min="4"
        :max="20"
        :step="0.1"
        layout="bare"
        aria-label="频率（对数刻度）"
      />
      <div class="em-calc-limits">
        <span><Latex tex="10^{4}\ \text{Hz}" /></span>
        <span><Latex tex="10^{20}\ \text{Hz}" /></span>
      </div>
    </div>
    <div class="em-calc-bands">
      <div
        v-for="item in bands"
        :key="item.key"
        class="em-calc-band-item"
        :class="{ 'is-active': item.key === band.key }"
      >
        <template v-if="item.key === 'xray'">X / <Latex tex="\gamma" /> 射线</template>
        <template v-else>{{ item.name }}</template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.em-calc {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  width: 100%;
  min-width: 0;
}

.em-calc-formula {
  font-size: 1.3rem;
  text-align: center;
}

.em-calc-readout {
  display: grid;
  grid-template-columns: 1.1fr 1.1fr 0.9fr;
  gap: 0.8rem;
}

.em-calc-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 3.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: color-mix(in srgb, var(--c-surface) 68%, transparent);
}

.em-calc-label {
  color: var(--c-text-mute);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

.em-calc-value,
.em-calc-band {
  overflow: hidden;
  max-width: 100%;
  font-size: 1.02rem;
  white-space: nowrap;
}

.em-calc-band {
  color: var(--c-physics-light);
  font-weight: 600;
  font-size: 0.95rem;
}

.em-calc-slider {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.em-calc-limits {
  display: flex;
  justify-content: space-between;

  padding: 0 0.2rem;

  color: var(--c-text-mute);

  font-size: 0.75rem;
}

.em-calc-bands {
  display: flex;
  gap: 0.35rem;
  justify-content: space-between;
}

.em-calc-band-item {
  padding: 0.18rem 0.5rem;
  border-radius: 999px;

  color: var(--c-text-mute);

  font-size: 0.78rem;
  white-space: nowrap;
}

.em-calc-band-item.is-active {
  background: color-mix(in srgb, var(--c-accent) 20%, transparent);
  color: var(--c-text);
}
</style>
