<script setup lang="ts">
import { computed, ref } from "vue";

/** 第 8 页交互：拖动"电流 I"与"通电时间 t"，按真实公式 q = It、N = q/e 实时计算 通过导体横截面的电荷量与电子数（e = 1.6×10⁻¹⁹ C）。 */
/** 对数滑块指数：I = 10^exp A，覆盖 1 μA ～ 10 A */
const iExp = ref(Math.log10(50e-6));
const tS = ref(3.2);

/** 电子电荷量（C） */
const E_CHARGE = 1.6e-19;

const iA = computed(() => 10 ** iExp.value);

/** 电流读数：自动换成 μA / mA / A */
const iRead = computed(() => {
  const a = iA.value;
  if (a < 1e-3) return { num: (a * 1e6).toPrecision(3), unitTex: "\\mu\\text{A}" };
  if (a < 1) return { num: (a * 1e3).toPrecision(3), unitTex: "\\text{mA}" };
  return { num: a.toPrecision(3), unitTex: "\\text{A}" };
});

/** 时间 t 内通过横截面的电荷量 q = It */
const qC = computed(() => iA.value * tS.value);

/** 通过的电子数 N = q / e */
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

/** 预设：教材 11.1 练习与应用第 1、2 题的数据 */
const presets = [
  { i: 50e-6, t: 3.2 },
  { i: 0.3, t: 10 },
];

const applyPreset = (preset: { i: number; t: number }): void => {
  iExp.value = Math.log10(preset.i);
  tS.value = preset.t;
};

const presetLabel = (preset: {
  i: number;
  t: number;
}): { num: string; unitTex: string; t: string } => {
  const a = preset.i;
  if (a < 1e-3)
    return { num: (a * 1e6).toPrecision(3), unitTex: "\\mu\\text{A}", t: preset.t.toFixed(1) };
  if (a < 1)
    return { num: (a * 1e3).toPrecision(3), unitTex: "\\text{mA}", t: preset.t.toFixed(1) };
  return { num: a.toPrecision(3), unitTex: "\\text{A}", t: preset.t.toFixed(1) };
};
</script>

<template>
  <div class="cur-calc">
    <div class="cur-sliders">
      <CourseSlider
        v-model="iExp"
        :min="-6"
        :max="1"
        :step="0.05"
        label="电流"
        label-tex="I"
        accent="gold"
      >
        <template #value>{{ iRead.num }}<Latex :tex="`\\ ${iRead.unitTex}`" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="tS"
        :min="0"
        :max="60"
        :step="0.1"
        label="通电时间"
        label-tex="t"
        accent="blue"
      >
        <template #value>{{ tS.toFixed(1) }}<Latex tex="\ \text{s}" /></template>
      </CourseSlider>
    </div>
    <div class="cur-presets">
      <button
        v-for="preset in presets"
        :key="preset.t + preset.i"
        type="button"
        class="cur-preset"
        @click="applyPreset(preset)"
      >
        {{ presetLabel(preset).num }}<Latex :tex="`\\ ${presetLabel(preset).unitTex}`" />、{{
          preset.t.toFixed(1)
        }}<Latex tex="\ \text{s}" />
      </button>
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
  gap: 0.9rem;

  padding: 1rem 1.35rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);

  backdrop-filter: blur(16px);
}

.cur-sliders {
  display: grid;
  gap: 0.45rem;
}

.cur-presets {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
}

.cur-preset {
  padding: 0.2rem 0.85rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: transparent;
  color: var(--c-text-dim);

  font-size: 0.95rem;

  cursor: pointer;

  transition:
    color 0.2s,
    border-color 0.2s;
}

.cur-preset:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
}

.cur-result {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
  align-items: center;
}

.cur-formula {
  font-size: 1.15rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
}
</style>
