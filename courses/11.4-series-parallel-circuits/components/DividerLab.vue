<script setup lang="ts">
/**
 * 分压 / 分流实验台（串联分压、并联分流两档）。 串联（电压 U 一定）：U₁ = U·R₁/(R₁+R₂)、U₂ = U·R₂/(R₁+R₂)——电压按电阻**正比**分配； 并联（干路电流
 * I 一定）：I₁ = I·R₂/(R₁+R₂)、I₂ = I·R₁/(R₁+R₂)——电流按电阻**反比**分配。 两条比例条按真实比例给宽度，"谁分得多"一眼可见；数值全部 computed
 * 实时算，不写死。
 */
import { computed, ref } from "vue";

type Mode = "series" | "parallel";

const mode = ref<Mode>("series");
const r1 = ref(5);
const r2 = ref(10);
/** 串联时加在两电阻上的总电压 U（V） */
const sourceU = ref(6);
/** 并联时干路总电流 I（A） */
const sourceI = ref(0.9);

const sum = computed(() => r1.value + r2.value);
/** 串联分压：U₁ = U·R₁/(R₁+R₂) */
const u1 = computed(() => (sourceU.value * r1.value) / sum.value);
/** 串联分压：U₂ = U·R₂/(R₁+R₂) */
const u2 = computed(() => (sourceU.value * r2.value) / sum.value);
/** 并联分流：I₁ = I·R₂/(R₁+R₂) */
const i1 = computed(() => (sourceI.value * r2.value) / sum.value);
/** 并联分流：I₂ = I·R₁/(R₁+R₂) */
const i2 = computed(() => (sourceI.value * r1.value) / sum.value);

const share = (part: number, total: number): string =>
  total > 0 ? `${(part / total) * 100}%` : "0%";
const num = (v: number): string => v.toFixed(2);
</script>

<template>
  <div class="dv-lab">
    <div class="dv-switch">
      <button
        class="dv-btn"
        :class="{ on: mode === 'series' }"
        type="button"
        @click="mode = 'series'"
      >
        串联分压
      </button>
      <button
        class="dv-btn"
        :class="{ on: mode === 'parallel' }"
        type="button"
        @click="mode = 'parallel'"
      >
        并联分流
      </button>
    </div>
    <div class="dv-body">
      <div class="dv-ctrl">
        <CourseSlider
          v-model="r1"
          :min="1"
          :max="20"
          :step="1"
          label="电阻"
          label-tex="R_1"
          label-width="5.5rem"
          layout="tight"
          accent="gold"
        >
          <template #value>{{ r1 }}<Latex tex="\ \Omega" /></template>
        </CourseSlider>
        <CourseSlider
          v-model="r2"
          :min="1"
          :max="20"
          :step="1"
          label="电阻"
          label-tex="R_2"
          label-width="5.5rem"
          layout="tight"
          accent="blue"
        >
          <template #value>{{ r2 }}<Latex tex="\ \Omega" /></template>
        </CourseSlider>
        <CourseSlider
          v-model="sourceU"
          v-show="mode === 'series'"
          :min="1"
          :max="12"
          :step="0.5"
          label="总电压"
          label-tex="U"
          label-width="5.5rem"
          layout="tight"
          accent="teal"
        >
          <template #value>{{ sourceU }}<Latex tex="\ \text{V}" /></template>
        </CourseSlider>
        <CourseSlider
          v-model="sourceI"
          v-show="mode === 'parallel'"
          :min="0.1"
          :max="3"
          :step="0.1"
          label="总电流"
          label-tex="I"
          label-width="5.5rem"
          layout="tight"
          accent="teal"
        >
          <template #value>{{ sourceI.toFixed(1) }}<Latex tex="\ \text{A}" /></template>
        </CourseSlider>
      </div>
      <div class="dv-out">
        <template v-if="mode === 'series'">
          <div class="dv-row">
            <Latex tex="U_1 = U\frac{R_1}{R_1+R_2}" />
            <div class="dv-bar">
              <div class="dv-fill dv-fill-gold" :style="{ width: share(u1, sourceU) }" />
            </div>
            <span class="dv-val">{{ num(u1) }}<Latex tex="\ \text{V}" /></span>
          </div>
          <div class="dv-row">
            <Latex tex="U_2 = U\frac{R_2}{R_1+R_2}" />
            <div class="dv-bar">
              <div class="dv-fill dv-fill-blue" :style="{ width: share(u2, sourceU) }" />
            </div>
            <span class="dv-val">{{ num(u2) }}<Latex tex="\ \text{V}" /></span>
          </div>
          <div class="dv-sum">
            <Latex tex="U_1 + U_2" /> = {{ num(u1 + u2) }}<Latex tex="\ \text{V}" />，与总电压
            <Latex tex="U" /> 相等。
          </div>
        </template>
        <template v-else>
          <div class="dv-row">
            <Latex tex="I_1 = I\frac{R_2}{R_1+R_2}" />
            <div class="dv-bar">
              <div class="dv-fill dv-fill-gold" :style="{ width: share(i1, sourceI) }" />
            </div>
            <span class="dv-val">{{ num(i1) }}<Latex tex="\ \text{A}" /></span>
          </div>
          <div class="dv-row">
            <Latex tex="I_2 = I\frac{R_1}{R_1+R_2}" />
            <div class="dv-bar">
              <div class="dv-fill dv-fill-blue" :style="{ width: share(i2, sourceI) }" />
            </div>
            <span class="dv-val">{{ num(i2) }}<Latex tex="\ \text{A}" /></span>
          </div>
          <div class="dv-sum">
            <Latex tex="I_1 + I_2" /> = {{ num(i1 + i2) }}<Latex tex="\ \text{A}" />，与干路电流
            <Latex tex="I" /> 相等。
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dv-lab {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.dv-switch {
  display: flex;
  gap: 0.6rem;
}

.dv-btn {
  flex: 1;

  padding: 0.45rem 0;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 1rem;

  cursor: pointer;
}

.dv-btn.on {
  border-color: var(--c-accent);
  background: var(--c-accent);
  color: var(--c-bg);
}

.dv-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 1rem;
  align-items: start;
}

.dv-ctrl {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.dv-out {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  padding: 0.75rem 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

/* 固定列：公式 / 比例条 / 读数（读数列定宽右对齐），拖动时不顶跑别的元素 */
.dv-row {
  display: grid;
  grid-template-columns: auto minmax(3rem, 1fr) 5.4rem;
  gap: 0.7rem;
  align-items: center;

  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}

.dv-bar {
  overflow: hidden;
  height: 0.5rem;
  border-radius: 999px;
  background: rgb(148 163 184 / 18%);
}

.dv-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dv-fill-gold {
  background: var(--c-accent);
}

.dv-fill-blue {
  background: var(--c-accent-2);
}

.dv-val {
  text-align: right;
  white-space: nowrap;
}

.dv-sum {
  color: var(--c-text-dim);
  font-size: 0.88rem;
}
</style>
