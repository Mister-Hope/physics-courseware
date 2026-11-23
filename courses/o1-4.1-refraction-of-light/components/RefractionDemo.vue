<!-- 4.1 第 10 页：改变入射角，按折射定律实时计算折射角 -->
<template>
  <div class="rd">
    <div class="rd-svg">
      <RefractionRaySvg
        :theta1="theta1"
        :n2="n"
        :medium-label="medium === 'water' ? '水' : '玻璃'"
      />
    </div>
    <div class="rd-controls">
      <div class="rd-toggle" role="group" aria-label="选择介质">
        <button type="button" :class="{ active: medium === 'water' }" @click="medium = 'water'">
          空气 → 水
        </button>
        <button type="button" :class="{ active: medium === 'glass' }" @click="medium = 'glass'">
          空气 → 玻璃
        </button>
      </div>
      <CourseSlider
        v-model="theta1"
        :min="0"
        :max="89"
        :step="1"
        label="入射角"
        label-tex="\theta_1"
        accent="gold"
      >
        <template #value>{{ theta1 }}°</template>
      </CourseSlider>
      <div class="rd-readouts">
        <div class="rd-cell">
          <span class="rd-label">介质折射率 <Latex tex="n" /></span>
          <span class="rd-value">{{ n.toFixed(2) }}</span>
        </div>
        <div class="rd-cell">
          <span class="rd-label">折射角 <Latex tex="\theta_2" /></span>
          <span class="rd-value">{{ theta2.toFixed(1) }}°</span>
        </div>
      </div>
      <div class="rd-formula"><Latex tex="\dfrac{\sin\theta_1}{\sin\theta_2}=n" display /></div>
      <p class="rd-note">
        光从空气射入介质，<Latex tex="\theta_2<\theta_1" />；<Latex tex="n" /> 越大，偏折越明显。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import RefractionRaySvg from "./RefractionRaySvg.vue";

const theta1 = ref(40);
const medium = ref<"water" | "glass">("water");

const n = computed(() => (medium.value === "water" ? 1.33 : 1.5));
const theta2 = computed(() => {
  const rad = (theta1.value * Math.PI) / 180;
  const s = Math.sin(rad) / n.value;
  return (Math.asin(Math.min(1, Math.max(-1, s))) * 180) / Math.PI;
});
</script>

<style scoped>
.rd {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 1.2rem;
  align-items: center;
  width: 100%;
}

.rd-svg {
  min-width: 0;
}

.rd-svg :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

.rd-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.rd-toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem;
}

.rd-toggle button {
  padding: 0.32rem 0.4rem;
  border: 1px solid var(--c-border);
  border-radius: 0.55rem;
  background: var(--c-surface);
  color: var(--c-text-dim);
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}

.rd-toggle button.active {
  border-color: var(--c-accent);
  background: color-mix(in srgb, var(--c-accent) 16%, transparent);
  color: var(--c-accent);
}

.rd-readouts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
}

.rd-cell {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--c-border);
  border-radius: 0.55rem;
  background: color-mix(in srgb, var(--c-surface) 55%, transparent);
}

.rd-label {
  color: var(--c-text-mute);
  font-size: 0.68rem;
}

.rd-value {
  color: var(--c-accent);
  font-size: 1.28rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.rd-formula {
  color: var(--c-text);
  font-size: 1.05rem;
  text-align: center;
}

.rd-formula :deep(.katex-display) {
  margin: 0;
}

.rd-note {
  margin: 0;
  color: var(--c-text-dim);
  font-size: 0.74rem;
  line-height: 1.45;
}
</style>
