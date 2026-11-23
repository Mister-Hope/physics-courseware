<!-- 第 13 页：动量与动能的实时计算。滑块改 m、v，p = mv，Ek = ½mv² 同步变化。 -->
<script setup>
import { computed, ref } from "vue";

const mass = ref(2);
const speed = ref(3);
const momentum = computed(() => mass.value * speed.value);
const energy = computed(() => 0.5 * mass.value * speed.value ** 2);
</script>

<template>
  <div class="momentum-lab">
    <div class="momentum-controls">
      <CourseSlider
        v-model="mass"
        label="质量"
        label-tex="m"
        :min="1"
        :max="5"
        :step="0.1"
        accent="gold"
        label-width="5.2rem"
      />
      <CourseSlider
        v-model="speed"
        label="速度"
        label-tex="v"
        :min="1"
        :max="8"
        :step="0.1"
        accent="blue"
        label-width="5.2rem"
      />
    </div>
    <div class="momentum-readouts">
      <div class="readout-row">
        <span class="readout-key"><Latex tex="p" /></span>
        <span class="readout-value">{{ momentum.toFixed(1) }}</span>
        <span class="readout-unit"><Latex tex="\text{kg·m/s}" /></span>
      </div>
      <div class="readout-row">
        <span class="readout-key"><Latex tex="E_{\mathrm{k}}" /></span>
        <span class="readout-value">{{ energy.toFixed(1) }}</span>
        <span class="readout-unit"><Latex tex="\text{J}" /></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.momentum-lab {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 1.6rem;
  align-items: center;
  width: 100%;
}
.momentum-controls {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.momentum-readouts {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.readout-row {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.35rem 0.7rem;
  border-radius: 0.6rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
}
.readout-key {
  flex: 0 0 2.2rem;
  color: var(--c-text-dim);
}
.readout-value {
  flex: 0 0 4.2rem;
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-size: 1.15rem;
  color: var(--c-accent);
}
.readout-unit {
  flex: 0 0 5.4rem;
  color: var(--c-text-dim);
  font-size: 0.85rem;
}
</style>
