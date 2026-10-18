<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 5 页交互：教材"思考与讨论"——墨子号的动能。
 *
 * 教材数据：质量 m = 631 kg，某时刻速度大小 v = 7.6 km/s。 组件按动能定义式 E_k = ½mv² 真实计算：拖动质量与速度（速度先换算成 m/s），
 * 动能、代入过程与条形图都随参数变化；点"墨子号"回到教材数据。
 */

const m = ref(631);
/** 速度按 km/s 给（与教材题面一致） */
const v = ref(7.6);

const setMozzi = () => {
  m.value = 631;
  v.value = 7.6;
};

/** 速度换算成 m/s */
const vsi = computed(() => v.value * 1000);
/** E_k = ½ m v²（J） */
const ek = computed(() => 0.5 * m.value * vsi.value ** 2);

/** 条形图参照：滑块量程上限处的动能 */
const EK_REF = 0.5 * 1200 * 12000 ** 2;
const barWidth = computed(() => Math.min(100, (ek.value / EK_REF) * 100));

/**
 * 把数值写成 a×10ᵇ 形式的 LaTeX（数字与量级之间不夹 HTML 空格）
 *
 * @param value 数值
 * @param digits 有效数字位数
 * @param unitTex 单位（LaTeX 片段）
 * @returns LaTeX 源码
 */
const sciTex = (value: number, digits: number, unitTex: string): string => {
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = (value / 10 ** exponent).toFixed(digits - 1);

  return `${mantissa}\\times10^{${exponent}}\\ ${unitTex}`;
};

const ekTex = computed(() => sciTex(ek.value, 3, String.raw`\text{J}`));
const vTex = computed(() => sciTex(vsi.value, 3, String.raw`\text{m/s}`));
const eqTex = computed(
  () =>
    `\\tfrac{1}{2}\\times ${m.value.toFixed(0)}\\times\\left(${v.value}\\times10^{3}\\right)^{2}=${sciTex(ek.value, 3, String.raw`\text{J}`)}`,
);
</script>

<template>
  <div class="kel">
    <div class="kel-head">
      <button class="kel-btn" type="button" @click="setMozzi">墨子号</button>
      <Latex tex="E_k = \tfrac{1}{2}mv^2" />
    </div>
    <CourseSlider
      v-model="m"
      :min="100"
      :max="1200"
      :step="1"
      label="质量"
      label-tex="m"
      accent="gold"
    >
      <template #value>{{ m }}<span class="kel-unit">kg</span></template>
    </CourseSlider>
    <CourseSlider
      v-model="v"
      :min="0.5"
      :max="12"
      :step="0.1"
      label="速度"
      label-tex="v"
      accent="blue"
    >
      <template #value>{{ v.toFixed(1) }}<span class="kel-unit">km/s</span></template>
    </CourseSlider>
    <div class="kel-out">
      <div class="kel-cell">
        <div class="kel-lab">速度 <Latex tex="v" /></div>
        <Latex :tex="vTex" />
      </div>
      <div class="kel-cell kel-cell-main">
        <div class="kel-lab">动能 <Latex tex="E_k" /></div>
        <Latex :tex="ekTex" />
      </div>
    </div>
    <div class="kel-bar">
      <div class="kel-fill" :style="{ width: `${barWidth.toFixed(1)}%` }" />
    </div>
    <div class="kel-eq"><Latex :tex="eqTex" /></div>
  </div>
</template>

<style scoped>
.kel {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  width: 100%;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);
}

.kel-head {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.kel-btn {
  padding: 0.2rem 0.8rem;
  border: 1px solid var(--c-accent-border);
  border-radius: 999px;

  background: var(--c-accent-soft);
  color: var(--c-accent);

  font-size: 0.85rem;

  cursor: pointer;
}

.kel-unit {
  margin-left: 0.3em;

  color: var(--c-text-dim);
  font-size: 0.75rem;
}

.kel-out {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.kel-cell {
  min-width: 0;
  text-align: center;
}

.kel-lab {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.kel-cell-main :deep(.katex) {
  color: var(--c-accent);
  font-size: 1.35rem;
}

.kel-bar {
  overflow: hidden;

  height: 0.5rem;
  border-radius: 999px;

  background: var(--c-border);
}

.kel-fill {
  height: 100%;
  border-radius: 999px;

  background: var(--c-accent);
  transition: width 0.25s ease;
}

.kel-eq {
  color: var(--c-text-dim);
  font-size: 0.9rem;
  text-align: center;
}
</style>
