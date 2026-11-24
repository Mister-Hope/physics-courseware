<!-- 5.3 P8：氘核结合能分步计算——按教材例题数据真实计算（m_p+m_n → Δm → ΔE=Δmc² → MeV → 比结合能），点击分步出现 -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

/** 教材例题给出的数据：质子、中子、氘核质量（kg），光速（m/s），元电荷（C） */
const M_PROTON = 1.6726e-27;
const M_NEUTRON = 1.6749e-27;
const M_DEUTERON = 3.3436e-27;
const SPEED_OF_LIGHT = 3e8;
const ELEMENTARY_CHARGE = 1.6e-19;

/** Kg 值折成"×10⁻²⁷ 前面的数字"，用来按教材写法列式 */
const E27 = 1e-27;

/** 把数值写成 LaTeX 科学计数法（保留 digits 位有效数字） */
const sci = (value: number, digits: number): string => {
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;
  const fixed = mantissa.toFixed(digits - 1);

  return Number(fixed) >= 10
    ? String.raw`${(Number(fixed) / 10).toFixed(digits - 1)}\times10^{${exponent + 1}}`
    : String.raw`${fixed}\times10^{${exponent}}`;
};

const protonMantissa = (M_PROTON / E27).toFixed(4);
const neutronMantissa = (M_NEUTRON / E27).toFixed(4);
const deuteronMantissa = (M_DEUTERON / E27).toFixed(4);

/** 核子质量之和、质量亏损、释放能量（J / eV / MeV）、比结合能——全部由上式算得 */
const massSum = M_PROTON + M_NEUTRON;
const massDefect = massSum - M_DEUTERON;
const energyJ = massDefect * SPEED_OF_LIGHT ** 2;
const energyEv = energyJ / ELEMENTARY_CHARGE;
const energyMeV = energyEv / 1e6;
const perNucleon = energyMeV / 2;
const energyMeVText = energyMeV.toFixed(2);
const perNucleonText = perNucleon.toFixed(2);

interface CalcRow {
  label: string;
  tex: string;
}

const rows: CalcRow[] = [
  {
    label: "核子质量之和",
    tex: String.raw`m_{\text{p}}+m_{\text{n}}=\left(${protonMantissa}+${neutronMantissa}\right)\times10^{-27}\ \text{kg}=${sci(massSum, 5)}\ \text{kg}`,
  },
  {
    label: "质量亏损",
    tex: String.raw`\Delta m=\left(${(massSum / E27).toFixed(4)}-${deuteronMantissa}\right)\times10^{-27}\ \text{kg}=${sci(massDefect, 3)}\ \text{kg}`,
  },
  {
    label: "释放能量",
    tex: String.raw`\Delta E=\Delta mc^{2}=${sci(massDefect, 3)}\times\left(3.00\times10^{8}\right)^{2}\ \text{J}=${sci(energyJ, 3)}\ \text{J}`,
  },
  {
    label: "换算单位",
    tex: String.raw`\Delta E=\frac{${sci(energyJ, 3)}}{1.60\times10^{-19}}\ \text{eV}=${sci(energyEv, 3)}\ \text{eV}=${energyMeVText}\ \text{MeV}`,
  },
  {
    label: "比结合能",
    tex: String.raw`\frac{${energyMeVText}\ \text{MeV}}{2}=${perNucleonText}\ \text{MeV}`,
  },
];
</script>

<template>
  <div class="nb-calc">
    <div
      v-for="(row, index) in rows"
      :key="row.label"
      class="nb-calc-row"
      :class="{
        'nb-calc-row--last': index === rows.length - 1,
        'nb-calc-row--hidden': step < index + 1,
      }"
    >
      <span class="nb-calc-no">{{ index + 1 }}</span>
      <span class="nb-calc-label">{{ row.label }}</span>
      <span class="nb-calc-tex"><Latex :tex="row.tex" /></span>
    </div>
  </div>
</template>

<style scoped>
.nb-calc {
  display: flex;
  flex-direction: column;
  gap: 0.34rem;
}

.nb-calc-row {
  display: grid;
  grid-template-columns: 1.5rem 5.4rem minmax(0, 1fr);
  gap: 0.7rem;
  align-items: center;

  min-height: 2.1rem;
  padding: 0.2rem 0.8rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.nb-calc-row--last {
  border-color: var(--c-border-glow);
  background: var(--c-accent-soft);
}

.nb-calc-row--hidden {
  visibility: hidden;
}

.nb-calc-no {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  background: var(--c-accent-soft);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.78rem;
}

.nb-calc-label {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}

.nb-calc-tex {
  min-width: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>
