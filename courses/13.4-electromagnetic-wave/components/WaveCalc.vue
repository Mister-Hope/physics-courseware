<!-- 第 10 页：波长—频率实时计算器——滑动频率（真实对数档位），由 λ=c/f 真实计算波长并自动换算单位、判定所在波段；预设按钮一键取教材常见值 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const C = 3e8;

const presets = [
  { name: "微波炉", f: 2.45e9, tex: "2.45\times10^{9}" },
  { name: "调频广播", f: 1e8, tex: "1\times10^{8}" },
  { name: "红光", f: 5e14, tex: "5\times10^{14}" },
  { name: "X 射线", f: 1e18, tex: "1\times10^{18}" },
];

const logF = ref(Math.log10(2.45e9));
const f = computed(() => 10 ** logF.value);

function sci3(x: number) {
  const e = Math.floor(Math.log10(x));
  const m = Number((x / 10 ** e).toPrecision(3));
  return { ms: String(m), e };
}

const fTex = computed(() => {
  const { ms, e } = sci3(f.value);
  return `${ms}\\times10^{${e}}\\ \\text{Hz}`;
});

const lamTex = computed(() => {
  const lam = C / f.value;
  const steps: [number, string, number][] = [
    [1e5, String.raw`\text{km}`, 1e-3],
    [1, String.raw`\text{m}`, 1],
    [1e-3, String.raw`\text{mm}`, 1e3],
    [1e-6, String.raw`\mu\text{m}`, 1e6],
    [1e-9, String.raw`\text{nm}`, 1e9],
    [-Infinity, String.raw`\text{pm}`, 1e12],
  ];
  for (const [min, unit, mul] of steps) {
    if (lam >= min) {
      const v = Number((lam * mul).toPrecision(3));
      return `${String(v)}\\ ${unit}`;
    }
  }
  return "";
});

function bandOf(freq: number) {
  if (freq < 3e9) return "无线电波";
  if (freq < 3e11) return "微波";
  if (freq < 4e14) return "红外线";
  if (freq < 7.5e14) return "可见光";
  if (freq < 3e16) return "紫外线";
  if (freq < 3e19) return "X 射线";
  return "γ 射线";
}
const band = computed(() => bandOf(f.value));
</script>

<template>
  <div class="wcalc">
    <CourseSlider
      v-model="logF"
      :min="6"
      :max="20"
      :step="0.01"
      label="频率"
      labelTex="f"
      accent="gold"
      label-width="6.4rem"
    >
      <template #value><Latex :tex="fTex" /></template>
    </CourseSlider>
    <div class="wcalc-chips">
      <button
        v-for="p in presets"
        :key="p.name"
        class="wcalc-chip"
        type="button"
        @click="logF = Math.log10(p.f)"
      >
        {{ p.name }} <Latex :tex="p.tex + '\\ \\text{Hz}'" />
      </button>
    </div>
    <div class="wcalc-out">
      <div class="wcalc-cell">
        <div class="wcalc-k">由 <Latex tex="\lambda = \dfrac{c}{f}" /> 计算波长</div>
        <div class="wcalc-v"><Latex :tex="lamTex" /></div>
      </div>
      <div class="wcalc-cell">
        <div class="wcalc-k">落在电磁波谱的哪一段</div>
        <div class="wcalc-v wcalc-band">{{ band }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wcalc {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.wcalc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.wcalc-chip {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;

  padding: 0.32rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--c-accent) 45%, transparent);
  border-radius: 999px;

  background: color-mix(in srgb, var(--c-accent) 10%, transparent);
  color: var(--c-text);

  font-size: 0.92rem;

  cursor: pointer;

  transition: background 0.15s ease;
}

.wcalc-chip:hover {
  background: color-mix(in srgb, var(--c-accent) 26%, transparent);
}

.wcalc-out {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 0.9rem;
  align-items: stretch;
}

.wcalc-cell {
  min-width: 0;
  padding: 0.7rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: color-mix(in srgb, var(--c-surface) 70%, transparent);

  text-align: center;
}

.wcalc-k {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}

.wcalc-v {
  margin-top: 0.35rem;
  font-size: 1.55rem;
}

.wcalc-band {
  color: var(--c-accent);
  font-weight: 700;
}
</style>
