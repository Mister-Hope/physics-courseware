<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 12 页交互：教材练习 8.3-2——把同一辆车从 10 km/h 加到 20 km/h， 与从 50 km/h 加到 60 km/h，哪种情况做的功多。
 *
 * 动能定理：合力做的功等于动能的变化 W = ½mv₂² − ½mv₁²。 组件把 km/h 换算成 m/s 后按公式真实计算，两段加速的功与它们的比值都随质量变化，
 * 比值本身与质量无关（速度平方差之比），页面上单独给出。
 */

/** 第一段加速：10 → 20 km/h */
const V1 = [10, 20];
/** 第二段加速：50 → 60 km/h */
const V2 = [50, 60];

const m = ref(1200);

/** Km/h → m/s */
const toSi = (kmh: number): number => kmh / 3.6;

/** ΔE_k = ½m(v₂² − v₁²)（J） */
const work1 = computed(() => 0.5 * m.value * (toSi(V2[0]) ** 2 - toSi(V1[0]) ** 2));
const work2 = computed(() => 0.5 * m.value * (toSi(V2[1]) ** 2 - toSi(V1[1]) ** 2));

/** 两段功之比：与质量、速度单位都无关 */
const ratio = computed(() => (V2[1] ** 2 - V2[0] ** 2) / (V2[0] ** 2 - V1[0] ** 2));
const ratioTex = computed(() => ratio.value.toFixed(2));

const maxWork = computed(() => Math.max(work1.value, work2.value));
const bar1 = computed(() => (work1.value / maxWork.value) * 100);
const bar2 = computed(() => (work2.value / maxWork.value) * 100);

/**
 * 把数值写成 a×10ᵇ + 单位 的 LaTeX
 *
 * @param value 数值
 * @returns LaTeX 源码
 */
const sciTex = (value: number): string => {
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = (value / 10 ** exponent).toFixed(2);

  return `${mantissa}\\times10^{${exponent}}\\ ${String.raw`\text{J}`}`;
};

const w1Tex = computed(() => sciTex(work1.value));
const w2Tex = computed(() => sciTex(work2.value));
</script>

<template>
  <div class="wcl">
    <div class="wcl-row">
      <Latex tex="m" />
      <CourseSlider
        v-model="m"
        :min="800"
        :max="2500"
        :step="50"
        label="汽车质量"
        label-tex="m"
        label-width="5.6rem"
        accent="gold"
      />
    </div>
    <div class="wcl-cols">
      <div class="wcl-col">
        <div class="wcl-tag"><Latex tex="10 \to 20\ \text{km/h}" /></div>
        <Latex class="wcl-val" :tex="w1Tex" />
        <div class="wcl-bar">
          <div class="wcl-fill wcl-fill-a" :style="{ width: `${bar1.toFixed(1)}%` }" />
        </div>
      </div>
      <div class="wcl-col">
        <div class="wcl-tag"><Latex tex="50 \to 60\ \text{km/h}" /></div>
        <Latex class="wcl-val" :tex="w2Tex" />
        <div class="wcl-bar">
          <div class="wcl-fill" :style="{ width: `${bar2.toFixed(1)}%` }" />
        </div>
      </div>
    </div>
    <div class="wcl-ratio">
      <Latex tex="\dfrac{W_2}{W_1}=\dfrac{60^2-50^2}{20^2-10^2}" />
      <span>=</span>
      <Latex :tex="ratioTex" />
      <span class="wcl-dim">（与质量无关）</span>
    </div>
  </div>
</template>

<style scoped>
.wcl {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  width: 100%;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);
}

.wcl-row {
  display: flex;
  gap: 0.9rem;
  align-items: center;
}

.wcl-cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.wcl-col {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.wcl-tag {
  color: var(--c-text-dim);
  font-size: 0.9rem;
  text-align: center;
}

.wcl-val {
  color: var(--c-accent);
  font-size: 1.3rem;
  text-align: center;
}

.wcl-bar {
  overflow: hidden;
  height: 0.6rem;
  border-radius: 999px;
  background: var(--c-border);
}

.wcl-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--c-accent);
  transition: width 0.25s ease;
}

.wcl-fill-a {
  background: var(--c-physics);
}

.wcl-ratio {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  color: var(--c-text);

  font-size: 1.05rem;
}

.wcl-dim {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}
</style>
