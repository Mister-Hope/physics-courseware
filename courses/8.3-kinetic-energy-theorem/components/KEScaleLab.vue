<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 11 页交互：教材练习 8.3-1——质量和速度改变时，动能是原来的几倍。
 *
 * E_k' / E_k = (m'/m)·(v'/v)²：组件用这条例式真实计算，A–D 四个按钮对应题面四种情形， 两个滑块可自由改动倍数，倍数与条形图同步变化。
 */

interface Case {
  /** 题面选项 */
  key: string;
  /** 质量倍数 */
  m: number;
  /** 速度倍数 */
  v: number;
}

const CASES: Case[] = [
  { key: "A", m: 1, v: 2 },
  { key: "B", m: 2, v: 1 },
  { key: "C", m: 0.5, v: 4 },
  { key: "D", m: 4, v: 0.5 },
];

const mFactor = ref(1);
const vFactor = ref(2);
const active = ref("A");

const applyCase = (item: Case) => {
  mFactor.value = item.m;
  vFactor.value = item.v;
  active.value = item.key;
};

/** 动能倍数 E_k'/E_k = (m'/m)(v'/v)² */
const factor = computed(() => mFactor.value * vFactor.value ** 2);
const factorTex = computed(() => factor.value.toFixed(2).replace(/\.?0+$/u, ""));
const barWidth = computed(() => Math.min(100, (factor.value / 8) * 100));
</script>

<template>
  <div class="kesl">
    <div class="kesl-btns">
      <button
        v-for="item in CASES"
        :key="item.key"
        class="kesl-btn"
        :class="{ 'kesl-btn-on': item.key === active }"
        type="button"
        @click="applyCase(item)"
      >
        {{ item.key }}
      </button>
    </div>
    <CourseSlider
      v-model="mFactor"
      :min="0.5"
      :max="4"
      :step="0.5"
      label="质量倍数"
      label-tex="\dfrac{m'}{m}"
      label-width="7.6rem"
      accent="gold"
      layout="tight"
    />
    <CourseSlider
      v-model="vFactor"
      :min="0.5"
      :max="4"
      :step="0.5"
      label="速度倍数"
      label-tex="\dfrac{v'}{v}"
      label-width="7.6rem"
      accent="blue"
      layout="tight"
    />
    <div class="kesl-eq">
      <Latex tex="\dfrac{E_k'}{E_k}=\dfrac{m'}{m}\left(\dfrac{v'}{v}\right)^2" />
      <span class="kesl-eq-gt">=</span>
      <Latex :tex="`${mFactor}\\times${vFactor}^{2}`" />
      <span class="kesl-eq-gt">=</span>
      <Latex class="kesl-big" :tex="factorTex" />
    </div>
    <div class="kesl-bar">
      <div class="kesl-fill" :style="{ width: `${barWidth.toFixed(1)}%` }" />
    </div>
  </div>
</template>

<style scoped>
.kesl {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  width: 100%;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);
}

.kesl-btns {
  display: flex;
  gap: 0.4rem;
}

.kesl-btn {
  width: 2.1rem;
  height: 2.1rem;
  border: 1px solid var(--c-border);
  border-radius: 50%;

  background: transparent;
  color: var(--c-text-dim);

  font-size: 0.95rem;

  cursor: pointer;
  transition: all 0.2s ease;
}

.kesl-btn-on {
  border-color: var(--c-accent-border);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.kesl-eq {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.kesl-eq-gt {
  color: var(--c-text-dim);
}

.kesl-big {
  color: var(--c-accent);
  font-size: 1.6rem;
  font-weight: 700;
}

.kesl-bar {
  overflow: hidden;

  height: 0.55rem;
  border-radius: 999px;

  background: var(--c-border);
}

.kesl-fill {
  height: 100%;
  border-radius: 999px;

  background: var(--c-accent);
  transition: width 0.25s ease;
}
</style>
