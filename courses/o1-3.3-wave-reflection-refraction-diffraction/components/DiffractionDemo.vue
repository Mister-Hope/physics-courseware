<script setup lang="ts">
import { computed, ref } from "vue";

const ratio = ref(1);
const ratioText = computed(() => ratio.value.toFixed(1));
const level = computed(() => (ratio.value <= 1.2 ? "strong" : ratio.value <= 3 ? "mid" : "weak"));
const statusText = computed(() =>
  level.value === "strong" ? "衍射明显" : level.value === "mid" ? "逐渐不明显" : "衍射不明显",
);
const statusClass = computed(() => `dd-${level.value}`);
const slitWidth = computed(() => Math.min(100, (ratio.value / 5) * 100));
</script>

<template>
  <div class="dd">
    <div class="dd-head">
      <div class="dd-read">
        <span class="dd-k">缝宽与波长之比</span>
        <span class="dd-v"><Latex tex="d/\lambda" /> = {{ ratioText }}</span>
      </div>
      <span class="dd-status" :class="statusClass">{{ statusText }}</span>
    </div>
    <div class="dd-bars">
      <div class="dd-row">
        <span class="dd-l">波长 <Latex tex="\lambda" /></span>
        <div class="dd-track">
          <span class="dd-lambda"></span>
          <i class="dd-threshold"></i>
        </div>
      </div>
      <div class="dd-row">
        <span class="dd-l">缝宽 <Latex tex="d" /></span>
        <div class="dd-track">
          <span class="dd-slit" :style="{ width: slitWidth + '%' }"></span>
          <i class="dd-threshold"></i>
        </div>
      </div>
    </div>
    <CourseSlider
      v-model="ratio"
      :min="0.2"
      :max="5"
      :step="0.1"
      label="比值"
      label-tex="d/\lambda"
      :label-width="9"
      accent="gold"
    >
      <template #value>{{ ratioText }}</template>
    </CourseSlider>
    <div class="dd-foot">
      <span class="dd-mark">阈值 <Latex tex="d=\lambda" /></span>
      <span>缝宽越小，或波长越大，衍射越明显</span>
    </div>
  </div>
</template>

<style scoped>
.dd {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.dd-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.dd-read {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
}
.dd-k {
  font-size: 0.82rem;
  color: var(--c-text-mute);
}
.dd-v {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}
.dd-status {
  padding: 0.12rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}
.dd-strong {
  color: var(--c-physics);
  background: color-mix(in srgb, var(--c-physics) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--c-physics) 40%, transparent);
}
.dd-mid {
  color: var(--c-accent);
  background: color-mix(in srgb, var(--c-accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--c-accent) 36%, transparent);
}
.dd-weak {
  color: var(--c-danger);
  background: color-mix(in srgb, var(--c-danger) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--c-danger) 36%, transparent);
}
.dd-bars {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.dd-row {
  display: grid;
  grid-template-columns: 4.2rem minmax(0, 1fr);
  align-items: center;
  gap: 0.6rem;
}
.dd-l {
  font-size: 0.8rem;
  color: var(--c-text-dim);
  text-align: right;
}
.dd-track {
  position: relative;
  height: 0.62rem;
  border-radius: 999px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  overflow: hidden;
}
.dd-lambda,
.dd-slit {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 999px;
}
.dd-lambda {
  width: 20%;
  background: var(--c-accent-2);
  opacity: 0.65;
}
.dd-slit {
  background: var(--c-accent);
  transition: width 0.18s ease;
}
.dd-threshold {
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: 20%;
  width: 1px;
  background: var(--c-text);
  opacity: 0.45;
}
.dd-foot {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.76rem;
  color: var(--c-text-mute);
}
.dd-mark {
  color: var(--c-accent);
  font-weight: 700;
  white-space: nowrap;
}
</style>
