<!-- 第 11 页：拖动位移滑块，观察 Ek、Ep 此消彼长、总量守恒（k=10 N/m，m=0.5 kg，A=0.12 m） -->
<script setup lang="ts">
import { computed, ref } from "vue";

const K = 10;
const M = 0.5;
const A = 0.12;
const TOTAL = 0.5 * K * A * A;

const x = ref(0.08);
const ep = computed((): number => 0.5 * K * x.value * x.value);
const ek = computed((): number => TOTAL - ep.value);
const speed = computed((): number => Math.sqrt((2 * ek.value) / M));
const epPct = computed((): number => (ep.value / TOTAL) * 100);
const ekPct = computed((): number => 100 - epPct.value);
const xText = computed((): string => x.value.toFixed(2));
const epText = computed((): string => ep.value.toFixed(3));
const ekText = computed((): string => ek.value.toFixed(3));
const speedText = computed((): string => speed.value.toFixed(2));
const totalText = computed((): string => TOTAL.toFixed(3));
</script>

<template>
  <div class="em-energy-lab">
    <div class="em-energy-total">
      <div class="em-energy-total-head">
        <span>总机械能 <Latex tex="E=\frac{1}{2}kA^2" /></span>
        <span class="em-energy-total-value">{{ totalText }} <Latex tex="\text{J}" /></span>
      </div>
      <div class="em-energy-bar">
        <div class="em-energy-seg ep" :style="{ width: epPct + '%' }"></div>
        <div class="em-energy-seg ek" :style="{ width: ekPct + '%' }"></div>
      </div>
      <div class="em-energy-legend">
        <span class="ep">弹性势能 <Latex tex="E_p" /></span>
        <span class="ek">动能 <Latex tex="E_k" /></span>
      </div>
    </div>
    <div class="em-energy-slider">
      <div class="em-energy-slider-head">
        <span>位移 <Latex tex="x" /></span>
        <span class="em-energy-unit">/ <Latex tex="\text{m}" /></span>
      </div>
      <CourseSlider v-model="x" :min="-A" :max="A" :step="0.01" layout="bare" accent="gold" />
    </div>
    <div class="em-energy-readouts">
      <div class="em-energy-cell">
        <span class="em-energy-key"><Latex tex="x" /></span>
        <span class="em-energy-val">{{ xText }} <Latex tex="\text{m}" /></span>
      </div>
      <div class="em-energy-cell">
        <span class="em-energy-key"><Latex tex="E_p" /></span>
        <span class="em-energy-val">{{ epText }} <Latex tex="\text{J}" /></span>
      </div>
      <div class="em-energy-cell">
        <span class="em-energy-key"><Latex tex="E_k" /></span>
        <span class="em-energy-val">{{ ekText }} <Latex tex="\text{J}" /></span>
      </div>
      <div class="em-energy-cell">
        <span class="em-energy-key">速度大小 <Latex tex="v" /></span>
        <span class="em-energy-val">{{ speedText }} <Latex tex="\text{m/s}" /></span>
      </div>
    </div>
    <div class="em-energy-note">
      取 <Latex tex="k=10\ \text{N/m}" />，<Latex tex="A=0.12\ \text{m}" />，<Latex
        tex="m=0.5\ \text{kg}"
      />
    </div>
  </div>
</template>

<style scoped>
.em-energy-lab {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.em-energy-total {
  padding: 0.6rem 0.8rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
}

.em-energy-total-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.45rem;
  font-size: 0.84rem;
  color: var(--c-text-dim);
}

.em-energy-total-value {
  font-size: 0.92rem;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}

.em-energy-bar {
  display: flex;
  overflow: hidden;
  height: 54px;
  background: var(--c-bg-soft);
  border: 1px solid var(--c-border);
  border-radius: 0.6rem;
}

.em-energy-seg {
  height: 100%;
  transition: width 0.18s ease;
}

.em-energy-seg.ep {
  background: var(--c-accent);
}

.em-energy-seg.ek {
  background: var(--c-accent-2);
}

.em-energy-legend {
  display: flex;
  gap: 1.2rem;
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: var(--c-text-dim);
}

.em-energy-legend span::before {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 0.35rem;
  border-radius: 2px;
  content: "";
}

.em-energy-legend .ep::before {
  background: var(--c-accent);
}

.em-energy-legend .ek::before {
  background: var(--c-accent-2);
}

.em-energy-slider-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.3rem;
  font-size: 0.84rem;
  color: var(--c-text-dim);
}

.em-energy-unit {
  font-size: 0.76rem;
  color: var(--c-text-mute);
}

.em-energy-readouts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
}

.em-energy-cell {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.4rem;
  min-width: 0;
  padding: 0.28rem 0.55rem;
  background: var(--c-surface);
  border-left: 3px solid var(--c-accent-2);
  border-radius: 0.5rem;
}

.em-energy-cell:nth-child(2) {
  border-left-color: var(--c-accent);
}

.em-energy-key {
  font-size: 0.78rem;
  color: var(--c-text-dim);
  white-space: nowrap;
}

.em-energy-val {
  font-size: 0.86rem;
  color: var(--c-text);
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.em-energy-note {
  font-size: 0.72rem;
  color: var(--c-text-mute);
  text-align: right;
}
</style>
