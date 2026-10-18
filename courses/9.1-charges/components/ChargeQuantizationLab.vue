<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 15 页「电荷量与电子数」：拖动滑块改电子数 n（整数），按真实公式 Q = ne 算电荷量，
 * 并显示 n = Q/e 恰为整数——电荷量只能一份一份地变化（教材行 71）。
 * 旧稿是反的（调连续的 Q 再除以 e），这里改成调整数 n。
 */
const e = 1.6e-19;
const n = ref(2);

const sci = (v: number): [string, number] => {
  const exp = Math.floor(Math.log10(v));
  return [(v / 10 ** exp).toFixed(2), exp];
};

const qTex = computed(() => {
  const [m, exp] = sci(n.value * e);
  return `Q = ne = ${n.value} \\times 1.60\\times10^{-19}\\ \\text{C} = ${m}\\times10^{${exp}}\\ \\text{C}`;
});

const nTex = computed(() => `n = \\dfrac{Q}{e} = ${n.value} \\quad（整数）`);
</script>

<template>
  <div class="qlab">
    <CourseSlider v-model="n" :min="1" :max="50" :step="1" label="元电荷的个数" label-tex="n" accent="blue" aria-label="元电荷的个数 n" />
    <div class="qlab-out">
      <Latex :tex="qTex" display />
      <Latex :tex="nTex" />
    </div>
  </div>
</template>

<style scoped>
.qlab {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  background: var(--c-surface);
  backdrop-filter: blur(12px);
}

.qlab-out {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.45rem 0.3rem 0.15rem;
  border-top: 1px solid color-mix(in srgb, var(--c-border) 70%, transparent);
  text-align: center;
  font-size: 1.12rem;
}
</style>
