<!-- 第 12 页交互：垒球动量变化固定，拖动作用时间 Δt，按 F=Δp/Δt 真实计算平均力。 -->
<template>
  <div class="bfd">
    <div class="bfd-meta">
      <span>垒球</span>
      <Latex tex="m=0.18\ \text{kg}" />
      <Latex tex="v=25\to -45\ \text{m/s}" />
      <Latex tex="\Delta p=12.6\ \text{kg}\cdot\text{m/s}" />
    </div>
    <CourseSlider
      v-model="dtMs"
      :min="1"
      :max="20"
      :step="1"
      label="作用时间"
      label-tex="\Delta t"
      accent="gold"
    >
      <template #value>{{ dtMs }} <Latex tex="\text{ms}" /></template>
    </CourseSlider>
    <div class="bfd-readout">
      <span class="bfd-label">平均力</span>
      <span class="bfd-value">{{ forceText }} <Latex tex="\text{N}" /></span>
    </div>
    <div class="bfd-meter"><div class="bfd-fill" :style="{ width: barWidth }"></div></div>
    <div class="bfd-scale">
      <span>0</span><span><Latex tex="1.26\times10^4\ \text{N}" /></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const dtMs = ref(2);
const DP = 12.6;
const force = computed(() => DP / (dtMs.value / 1000));
const forceText = computed(() => Math.round(force.value).toLocaleString("zh-CN"));
const barWidth = computed(() => `${Math.min(100, (force.value / 12600) * 100)}%`);
</script>
<style scoped>
.bfd {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.bfd-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1.1rem;
  font-size: 0.88rem;
  color: var(--c-text-dim);
}
.bfd-meta > span:first-child {
  color: var(--c-accent);
  font-weight: 700;
}
.bfd-readout {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.45rem 0.9rem;
  border-radius: 0.9rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
}
.bfd-label {
  font-size: 0.92rem;
  color: var(--c-text-dim);
}
.bfd-value {
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}
.bfd-meter {
  height: 0.55rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--c-neutral-700);
}
.bfd-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--c-accent-2), var(--c-accent));
  transition: width 0.18s ease;
}
.bfd-scale {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--c-text-mute);
}
</style>
