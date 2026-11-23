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
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.dd-read {
  display: flex;
  gap: 0.55rem;
  align-items: baseline;
}

.dd-k {
  color: var(--c-text-mute);
  font-size: 0.82rem;
}

.dd-v {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
}

.dd-status {
  padding: 0.12rem 0.6rem;
  border-radius: 999px;

  font-weight: 700;
  font-size: 0.8rem;
  white-space: nowrap;
}

.dd-strong {
  border: 1px solid color-mix(in srgb, var(--c-physics) 40%, transparent);
  background: color-mix(in srgb, var(--c-physics) 16%, transparent);
  color: var(--c-physics);
}

.dd-mid {
  border: 1px solid color-mix(in srgb, var(--c-accent) 36%, transparent);
  background: color-mix(in srgb, var(--c-accent) 14%, transparent);
  color: var(--c-accent);
}

.dd-weak {
  border: 1px solid color-mix(in srgb, var(--c-danger) 36%, transparent);
  background: color-mix(in srgb, var(--c-danger) 14%, transparent);
  color: var(--c-danger);
}

.dd-bars {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dd-row {
  display: grid;
  grid-template-columns: 4.2rem minmax(0, 1fr);
  gap: 0.6rem;
  align-items: center;
}

.dd-l {
  color: var(--c-text-dim);
  font-size: 0.8rem;
  text-align: right;
}

.dd-track {
  position: relative;

  overflow: hidden;

  height: 0.62rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: var(--c-surface);
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
  gap: 0.6rem;
  align-items: center;

  color: var(--c-text-mute);

  font-size: 0.76rem;
}

.dd-mark {
  color: var(--c-accent);
  font-weight: 700;
  white-space: nowrap;
}
</style>
