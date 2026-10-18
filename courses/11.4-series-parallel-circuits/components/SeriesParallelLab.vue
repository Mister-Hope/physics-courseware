<script setup lang="ts">
/**
 * 第 7 页：串、并联等效电阻交互实验。拖动 R₁、R₂（1–20 Ω）， 串联 R = R₁ + R₂、并联 R = R₁R₂/(R₁+R₂) 全部按真实公式实时计算，
 * 结论句里的数值也随滑块变化。
 */
import { computed, ref } from "vue";

const r1 = ref(6);
const r2 = ref(12);

const rSeries = computed(() => r1.value + r2.value);
const rParallel = computed(() => (r1.value * r2.value) / (r1.value + r2.value));
const minR = computed(() => Math.min(r1.value, r2.value));
const maxR = computed(() => Math.max(r1.value, r2.value));
</script>

<template>
  <div class="sp-lab">
    <div class="sp-ctrl">
      <CourseSlider
        v-model="r1"
        :min="1"
        :max="20"
        :step="1"
        label="电阻"
        label-tex="R_1"
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
        accent="blue"
      >
        <template #value>{{ r2 }}<Latex tex="\ \Omega" /></template>
      </CourseSlider>
    </div>
    <div class="sp-out">
      <div class="sp-row">
        <span class="sp-k">串联</span>
        <Latex :tex="`R = R_1 + R_2 = ${rSeries.toFixed(1)}\\ \\Omega`" />
      </div>
      <div class="sp-row">
        <span class="sp-k">并联</span>
        <Latex :tex="`R = \\dfrac{R_1 R_2}{R_1 + R_2} = ${rParallel.toFixed(2)}\\ \\Omega`" />
      </div>
      <div class="sp-note">
        串联总电阻比两电阻中较大的 <Latex :tex="`${maxR}\\ \\Omega`" /> 还大；
        并联总电阻比两电阻中较小的 <Latex :tex="`${minR}\\ \\Omega`" /> 还小。
      </div>
    </div>
  </div>
</template>

<style scoped>
.sp-lab {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.sp-ctrl {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.sp-out {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.7rem 0.9rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}
.sp-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.05rem;
}
.sp-k {
  flex: 0 0 3.2rem;
  font-size: 0.85rem;
  color: var(--c-text-dim);
  text-align: center;
  padding: 0.15rem 0;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
}
.sp-note {
  font-size: 0.9rem;
  color: var(--c-text-dim);
}
</style>
