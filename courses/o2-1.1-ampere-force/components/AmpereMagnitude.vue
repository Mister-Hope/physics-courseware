<!-- 第 9 页：I、l、B 改变时 F = IlB 的实时读数 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const current = ref(2);
const length = ref(0.4);
const field = ref(0.5);
const force = computed(() => current.value * length.value * field.value);
</script>

<template>
  <div class="amp-mag">
    <div class="amp-fig">
      <AmperePerpSvg :force-scale="force / 5" />
    </div>
    <div class="amp-controls">
      <CourseSlider v-model="current" :min="0.5" :max="5" :step="0.1" label="电流" label-tex="I" accent="blue" />
      <CourseSlider v-model="length" :min="0.1" :max="1" :step="0.05" label="长度" label-tex="l" accent="gold" />
      <CourseSlider v-model="field" :min="0.1" :max="1" :step="0.05" label="磁感应强度" label-tex="B" accent="teal" />
      <div class="amp-readout">
        <Latex tex="F" /> <span class="amp-eq">=</span>
        <span class="amp-value">{{ force.toFixed(2) }}</span>
        <span class="amp-unit">N</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.amp-mag {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 1.4rem;
  align-items: center;
  width: 100%;
}

.amp-fig,
.amp-controls {
  min-width: 0;
}

.amp-controls {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.amp-readout {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  padding: 0.5rem 0.9rem;
  font-size: 1.05rem;
  border: 1px solid var(--c-border);
  border-radius: 0.9rem;
  background: color-mix(in srgb, var(--c-accent) 6%, transparent);
}

.amp-eq {
  color: var(--c-text-dim);
}

.amp-value {
  display: inline-block;
  min-width: 4.4rem;
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-family: "JetBrains Mono", monospace;
  color: var(--c-accent);
}

.amp-unit {
  color: var(--c-text-dim);
}
</style>
