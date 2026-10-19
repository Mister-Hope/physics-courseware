<script setup lang="ts">
/**
 * 串、并联等效电阻实验台：拖动 R₁、R₂（1–20 Ω），串联 R = R₁ + R₂、并联 R = R₁R₂/(R₁+R₂) 全部按真实公式实时计算。 读数区是固定列 grid（标签 / 公式
 * / 数值三列，数值列定宽右对齐），拖动时不会把旁边的元素顶跑。
 */
import { computed, ref } from "vue";

const r1 = ref(6);
const r2 = ref(12);

/** 串联等效电阻 R = R₁ + R₂ */
const rSeries = computed(() => r1.value + r2.value);
/** 并联等效电阻 R = R₁R₂/(R₁+R₂) */
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
        <Latex tex="R = R_1 + R_2" />
        <Latex :tex="`= ${rSeries.toFixed(1)}\\ \\Omega`" />
      </div>
      <div class="sp-row">
        <span class="sp-k">并联</span>
        <Latex tex="R = \dfrac{R_1 R_2}{R_1 + R_2}" />
        <Latex :tex="`= ${rParallel.toFixed(2)}\\ \\Omega`" />
      </div>
      <div class="sp-note">
        串联总电阻大于其中较大的 <Latex :tex="`${maxR}\\ \\Omega`" />；并联总电阻小于其中较小的
        <Latex :tex="`${minR}\\ \\Omega`" />。
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
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

/* 固定列：标签 / 公式 / 数值（数值列定宽右对齐），拖动滑块时读数不会顶跑别的元素 */
.sp-row {
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr) 7rem;
  gap: 0.7rem;
  align-items: center;

  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
}

.sp-row > :last-child {
  text-align: right;
}

.sp-k {
  padding: 0.15rem 0;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  color: var(--c-text-dim);

  font-size: 0.85rem;
  text-align: center;
}

.sp-note {
  color: var(--c-text-dim);
  font-size: 0.9rem;
}
</style>
