<!-- 第 10 页：改变外电阻 R，电流表、电压表读数与内、外电压的分配同步变化（读数由 I = E/(R+r) 实时算出） -->
<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 10 页：外电阻改变时，路端电压、电流与内电压怎样变化。
 *
 * 电路：电源（E、r）＋电流表＋外电阻 R，电压表接在电源两端测路端电压。 所有读数都由闭合电路的欧姆定律实时算出：I = E/(R+r)，U = IR，U内 = Ir。
 */
/** 电源电动势 / V */
const E = 3;
/** 电源内阻 / Ω */
const r = 0.5;
/** 外电阻调节范围 / Ω */
const R_MIN = 0.5;
const R_MAX = 10;

const R = ref(4);

const current = computed(() => E / (R.value + r));
const terminalVoltage = computed(() => current.value * R.value);
const innerVoltage = computed(() => current.value * r);
const outerRatio = computed(() => terminalVoltage.value / E);
const innerRatio = computed(() => innerVoltage.value / E);
</script>

<template>
  <div class="er-wrap">
    <div class="er-figure">
      <svg viewBox="0 0 520 320" width="100%" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
          <path d="M110 80 V162" />
          <path d="M110 178 V260" />
          <path d="M40 80 V154" />
          <path d="M40 186 V260" />
          <path d="M40 80 H110" />
          <path d="M40 260 H110" />
          <path d="M110 80 H284" />
          <path d="M316 80 H426" />
          <path d="M474 80 H500" />
          <path d="M500 80 V260" />
          <path d="M500 260 H110" />
        </g>
        <circle cx="110" cy="80" r="3" fill="var(--c-text)" />
        <circle cx="110" cy="260" r="3" fill="var(--c-text)" />
        <CircuitBattery :x="110" :y="170" orientation="vertical" polarity emf="E" />
        <CircuitMeter :x="40" :y="170" kind="v" />
        <CircuitMeter :x="300" :y="80" kind="a" />
        <CircuitResistor :x="450" :y="80" label="R" />
        <CourseArrow
          :from="{ x: 150, y: 88 }"
          :to="{ x: 230, y: 88 }"
          stroke="var(--c-accent)"
          :stroke-width="2.4"
          label="I"
        />
        <CourseArrow
          :from="{ x: 440, y: 252 }"
          :to="{ x: 360, y: 252 }"
          stroke="var(--c-accent)"
          :stroke-width="2.4"
        />
      </svg>
    </div>
    <div class="er-panel">
      <div class="er-conds">
        电源：<Latex tex="E = 3.0\ \text{V}" />，<Latex tex="r = 0.5\ \Omega" />
      </div>
      <CourseSlider
        v-model="R"
        :min="R_MIN"
        :max="R_MAX"
        :step="0.1"
        label="外电阻"
        label-tex="R"
        label-width="5.6rem"
      >
        <template #value><Latex :tex="`${R.toFixed(1)}\\ \\Omega`" /></template>
      </CourseSlider>
      <div class="er-meter">
        <div class="er-k">电流 <Latex tex="I" /></div>
        <div class="er-track-spacer" />
        <div class="er-v"><Latex :tex="`${current.toFixed(2)}\\ \\text{A}`" /></div>
        <div class="er-k">路端电压 <Latex tex="U" /></div>
        <div class="er-track">
          <div class="er-fill er-fill-u" :style="{ width: `${outerRatio * 100}%` }" />
        </div>
        <div class="er-v"><Latex :tex="`${terminalVoltage.toFixed(2)}\\ \\text{V}`" /></div>
        <div class="er-k">内电压 <Latex tex="Ir" /></div>
        <div class="er-track">
          <div class="er-fill er-fill-in" :style="{ width: `${innerRatio * 100}%` }" />
        </div>
        <div class="er-v"><Latex :tex="`${innerVoltage.toFixed(2)}\\ \\text{V}`" /></div>
      </div>
      <div class="er-sum">
        <Latex tex="E = U + Ir = 3.00\ \text{V}" /><span class="er-sum-tag">不变</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.er-wrap {
  display: flex;
  gap: 1.2rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

.er-figure {
  flex: 1 1 55%;
  min-width: 0;
  max-width: 470px;
}

.er-panel {
  display: flex;
  flex: 1 1 45%;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;
}

.er-conds {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}

.er-meter {
  display: grid;
  grid-template-columns: 5.9rem minmax(0, 1fr) 5.1rem;
  gap: 0.35rem 0.45rem;
  align-items: center;

  font-size: 0.9rem;
}

.er-k {
  color: var(--c-text-dim);
  white-space: nowrap;
}

.er-v {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
}

.er-track-spacer {
  height: 0.55rem;
}

.er-track {
  overflow: hidden;
  height: 0.55rem;
  border-radius: 0.2rem;
  background: color-mix(in srgb, var(--c-text) 14%, transparent);
}

.er-fill {
  min-width: 0.45rem;
  height: 100%;
  border-radius: 0.2rem;
  transition: width 0.18s ease;
}

.er-fill-u {
  background: var(--c-accent);
}

.er-fill-in {
  background: var(--c-accent-2);
}

.er-sum {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;

  color: var(--c-text-dim);

  font-size: 0.95rem;
}

.er-sum-tag {
  color: var(--c-ok);
  font-size: 0.8rem;
}
</style>
