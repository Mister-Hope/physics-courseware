<!-- 第 14 页：光电效应实验室（选材料、调频率，真算 Ek 与遏止电压） -->
<template>
  <div class="lab">
    <div class="lab-materials">
      <button
        v-for="m in materials"
        :key="m.name"
        type="button"
        :class="['lab-chip', { 'is-active': m.name === material }]"
        @click="material = m.name"
      >
        {{ m.name }}
      </button>
      <span class="lab-w0"
        >逸出功 <Latex tex="W_0" /> = {{ current.w0.toFixed(2) }} <Latex tex="\text{eV}"
      /></span>
    </div>
    <CourseSlider
      v-model="f"
      :min="3"
      :max="12"
      :step="0.1"
      label="频率"
      label-tex="\nu"
      label-width="5.4rem"
    >
      <template #value> {{ f.toFixed(1) }}<Latex tex="\ \times 10^{14}\ \text{Hz}" /> </template>
    </CourseSlider>
    <div class="lab-bar">
      <div class="lab-bar-track">
        <div class="lab-bar-w0" :style="{ width: `${w0Percent}%` }" />
        <div class="lab-bar-ek" :style="{ left: `${w0Percent}%`, width: `${ekPercent}%` }" />
        <div class="lab-bar-mark" :style="{ left: `${w0Percent}%` }" />
      </div>
      <div class="lab-bar-legend">
        <span><i class="dot dot-w0" />克服逸出功 <Latex tex="W_0" /></span>
        <span><i class="dot dot-ek" />光电子的动能</span>
      </div>
    </div>
    <div class="lab-readout">
      <div class="lab-cell">
        <span class="lab-label">入射光子能量</span>
        <span class="lab-val">{{ hnu.toFixed(2) }}<Latex tex="\ \text{eV}" /></span>
      </div>
      <div class="lab-cell">
        <span class="lab-label">截止频率</span>
        <span class="lab-val"
          >{{ current.nuC.toFixed(2) }}<Latex tex="\ \times 10^{14}\ \text{Hz}"
        /></span>
      </div>
      <div class="lab-cell">
        <span class="lab-label">最大初动能</span>
        <span class="lab-val">{{ ek.toFixed(2) }}<Latex tex="\ \text{eV}" /></span>
      </div>
      <div class="lab-cell">
        <span class="lab-label">遏止电压</span>
        <span class="lab-val">{{ ec.toFixed(2) }}<Latex tex="\ \text{V}" /></span>
      </div>
    </div>
    <div class="lab-status" :class="canEmit ? 'is-on' : 'is-off'">
      {{ canEmit ? "能发生光电效应：光子能量大于逸出功" : "不能发生光电效应：光子能量小于逸出功" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const materials = [
  { name: "钠", w0: 2.29, nuC: 5.53 },
  { name: "钾", w0: 2.25, nuC: 5.44 },
  { name: "钨", w0: 4.54, nuC: 10.95 },
];

const material = ref("钠");
const f = ref(8);

const current = computed(() => materials.find((m) => m.name === material.value) ?? materials[0]);
const hnu = computed(() => 0.414375 * f.value);
const canEmit = computed(() => f.value >= current.value.nuC);
const ek = computed(() => (canEmit.value ? Math.max(0, hnu.value - current.value.w0) : 0));
const ec = computed(() => ek.value);

const scaleMax = 5.5;
const w0Percent = computed(() => (current.value.w0 / scaleMax) * 100);
const hnuPercent = computed(() => (Math.min(hnu.value, scaleMax) / scaleMax) * 100);
const ekPercent = computed(() => Math.max(0, hnuPercent.value - w0Percent.value));
</script>

<style scoped>
.lab {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
}

.lab-materials {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.lab-chip {
  padding: 0.24rem 0.9rem;
  border: 1px solid rgb(148 163 184 / 35%);
  border-radius: 0.7rem;

  background: rgb(148 163 184 / 8%);
  color: var(--c-text-dim);

  font-size: 0.95rem;

  transition: all 0.2s;
}

.lab-chip.is-active {
  border-color: var(--c-accent);
  background: rgb(226 168 70 / 16%);
  color: var(--c-accent);
}

.lab-w0 {
  margin-left: auto;
  color: var(--c-text-dim);
  font-size: 0.92rem;
}

.lab-bar-track {
  position: relative;

  overflow: hidden;

  height: 22px;
  border-radius: 6px;

  background: rgb(148 163 184 / 12%);
}

.lab-bar-w0,
.lab-bar-ek {
  position: absolute;
  top: 0;
  height: 100%;
}

.lab-bar-w0 {
  left: 0;
  border-radius: 6px 0 0 6px;
  background: rgb(226 168 70 / 55%);
}

.lab-bar-ek {
  background: rgb(96 165 250 / 75%);
}

.lab-bar-mark {
  position: absolute;
  top: -3px;

  width: 2px;
  height: 28px;

  background: var(--c-accent);
}

.lab-bar-legend {
  display: flex;
  gap: 1.2rem;

  margin-top: 0.4rem;

  color: var(--c-text-dim);

  font-size: 0.82rem;
}

.dot {
  display: inline-block;
  vertical-align: middle;

  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.3rem;
  border-radius: 2px;
}

.dot-w0 {
  background: rgb(226 168 70 / 55%);
}

.dot-ek {
  background: rgb(96 165 250 / 75%);
}

.lab-readout {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.7rem;
}

.lab-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  padding: 0.5rem 0.7rem;
  border: 1px solid rgb(148 163 184 / 18%);
  border-radius: 0.8rem;

  background: rgb(255 255 255 / 4%);
}

.lab-label {
  color: var(--c-text-dim);
  font-size: 0.78rem;
  white-space: nowrap;
}

.lab-val {
  font-weight: 700;
  font-size: 1.06rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.lab-val :deep(.katex) {
  font-size: 0.72em;
}

.lab-status {
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
}

.lab-status.is-on {
  color: var(--c-physics);
}

.lab-status.is-off {
  color: var(--c-danger);
}
</style>
