<!-- 第 6 页：拖动位移滑块，实时观察回复力和加速度（k=10 N/m，m=0.5 kg，x∈[-0.12,0.12] m） -->
<script setup lang="ts">
import { computed, ref } from "vue";

const K = 10;
const M = 0.5;
const X_MAX = 0.12;

const x = ref(0.08);
const force = computed((): number => -K * x.value);
const acceleration = computed((): number => force.value / M);
const xText = computed((): string => x.value.toFixed(2));
const forceText = computed((): string => force.value.toFixed(2));
const accelText = computed((): string => acceleration.value.toFixed(2));
</script>

<template>
  <div class="em-lab">
    <div class="em-lab-figure">
      <SpringOscillatorSvg
        :x="x / X_MAX"
        :force="force"
        :acceleration="acceleration"
        show-force
        show-acceleration
        show-x
        :show-points="false"
      />
    </div>
    <div class="em-lab-control">
      <div class="em-lab-slider-head">
        <span>位移 <Latex tex="x" /></span>
        <span class="em-lab-unit">/ <Latex tex="\text{m}" /></span>
      </div>
      <CourseSlider
        v-model="x"
        :min="-X_MAX"
        :max="X_MAX"
        :step="0.01"
        layout="bare"
        accent="gold"
      />
      <div class="em-lab-readouts">
        <div class="em-lab-cell">
          <span class="em-lab-key"><Latex tex="x" /></span>
          <span class="em-lab-val">{{ xText }} <Latex tex="\text{m}" /></span>
        </div>
        <div class="em-lab-cell">
          <span class="em-lab-key"><Latex tex="F=-kx" /></span>
          <span class="em-lab-val">{{ forceText }} <Latex tex="\text{N}" /></span>
        </div>
        <div class="em-lab-cell">
          <span class="em-lab-key"><Latex tex="a=\frac{F}{m}" /></span>
          <span class="em-lab-val">{{ accelText }} <Latex tex="\text{m/s}^2" /></span>
        </div>
      </div>
      <div class="em-lab-note">
        取 <Latex tex="k=10\ \text{N/m}" />，<Latex tex="m=0.5\ \text{kg}" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.em-lab {
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  gap: 1rem;
  align-items: center;
}

.em-lab-figure {
  min-width: 0;
}

.em-lab-figure .em-spring-svg {
  width: 100%;
}

.em-lab-control {
  min-width: 0;
}

.em-lab-slider-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.35rem;
  font-size: 0.86rem;
  color: var(--c-text-dim);
}

.em-lab-unit {
  font-size: 0.78rem;
  color: var(--c-text-mute);
}

.em-lab-readouts {
  display: grid;
  gap: 0.35rem;
  margin-top: 0.7rem;
}

.em-lab-cell {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.28rem 0.6rem;
  background: var(--c-surface);
  border-left: 3px solid var(--c-accent-2);
  border-radius: 0.5rem;
}

.em-lab-cell:nth-child(3) {
  border-left-color: var(--c-accent);
}

.em-lab-key {
  font-size: 0.82rem;
  color: var(--c-text-dim);
  white-space: nowrap;
}

.em-lab-val {
  min-width: 5.4rem;
  font-size: 0.92rem;
  color: var(--c-text);
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.em-lab-note {
  margin-top: 0.45rem;
  font-size: 0.74rem;
  color: var(--c-text-mute);
  text-align: right;
}
</style>
