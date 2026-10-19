<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 11 页交互：拖动"电流 I"与"横截面积 S"，按真实公式 v = I/(neS) 实时计算 自由电子定向移动的平均速率，并用 t = L/v 算出电子通过 1 m 导线需要的时间。
 *
 * 滑块范围按"真实导线不会烧断"取：I 0.1–2 A、S 0.5–4 mm²（最极端组合 2 A / 0.5 mm² 的电流密度为 4 A/mm²，仍在铜导线的安全载流量内），避免出现"0.1
 * mm² 通 10 A"这类不现实状态。
 */
const iA = ref(1);
const sMm2 = ref(1);

/** 电子电荷量（C） */
const E_CHARGE = 1.6e-19;

/**
 * 铜的自由电子数密度（m⁻³）：取铜的密度 8.96 g/cm³、摩尔质量 63.55 g/mol， 按每个铜原子贡献 1 个自由电子估算：n = ρN_A/M ≈ 8.5×10²⁸
 * m⁻³（教材未给此值）。
 */
const N_CU = 8.5e28;

/** 横截面积（m²） */
const sM2 = computed(() => sMm2.value * 1e-6);

/** 定向移动的平均速率 v = I/(neS) */
const vDrift = computed(() => iA.value / (N_CU * E_CHARGE * sM2.value));

/** NeS（分母，单位 C/m） */
const neS = computed(() => N_CU * E_CHARGE * sM2.value);

/** 电子通过 1 m 导线需要的时间 t = L/v（s） */
const tOneMeter = computed(() => 1 / vDrift.value);

/** 科学计数法的 LaTeX：7.40 \times 10^{-5} */
const sci = (value: number): string => {
  if (value <= 0) return "0";
  const exp = Math.floor(Math.log10(value));
  const mantissa = value / 10 ** exp;
  if (exp === 0) return mantissa.toFixed(2);
  return `${mantissa.toFixed(2)} \\times 10^{${exp}}`;
};

const vTex = computed(
  () =>
    `v = \\dfrac{I}{neS} = \\dfrac{${iA.value.toFixed(1)}}{${sci(neS.value)}}\\ \\text{m/s} = ${sci(vDrift.value)}\\ \\text{m/s}`,
);

/** 时间读数：不足 1 min 给秒，不足 1 h 给分，否则给小时（括号内附秒） */
const tTex = computed(() => {
  const t = tOneMeter.value;
  if (t < 60) return `t = \\dfrac{L}{v} = ${t.toFixed(1)}\\ \\text{s}`;
  if (t < 3600) return `t = \\dfrac{L}{v} = ${(t / 60).toFixed(1)}\\ \\text{min}`;
  return `t = \\dfrac{L}{v} = ${(t / 3600).toFixed(1)}\\ \\text{h}`;
});
</script>

<template>
  <div class="drift-calc">
    <div class="drift-sliders">
      <CourseSlider
        v-model="iA"
        :min="0.1"
        :max="2"
        :step="0.1"
        label="电流"
        label-tex="I"
        accent="gold"
      >
        <template #value>{{ iA.toFixed(1) }}<Latex tex="\ \text{A}" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="sMm2"
        :min="0.5"
        :max="4"
        :step="0.1"
        label="横截面积"
        label-tex="S"
        accent="blue"
      >
        <template #value>{{ sMm2.toFixed(1) }}<Latex tex="\ \text{mm}^2" /></template>
      </CourseSlider>
    </div>
    <div class="drift-const">
      <Latex tex="n \approx 8.5 \times 10^{28}\ \text{m}^{-3}" />（按铜估算）
    </div>
    <div class="drift-result">
      <div class="drift-formula"><Latex :tex="vTex" /></div>
      <div class="drift-foot"><Latex :tex="tTex" />（<Latex tex="L = 1\ \text{m}" />）</div>
    </div>
  </div>
</template>

<style scoped>
.drift-calc {
  display: grid;
  gap: 0.55rem;

  padding: 0.7rem 1.35rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);

  backdrop-filter: blur(16px);
}

.drift-sliders {
  display: grid;
  gap: 0.35rem;
}

.drift-const {
  color: var(--c-text-dim);
  font-size: 0.95rem;
  text-align: center;
}

.drift-result {
  display: grid;
  gap: 0.15rem;
}

.drift-formula {
  font-size: 1.1rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.drift-foot {
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
}
</style>
