<template>
  <div class="rd">
    <div class="rd-controls">
      <CourseSlider
        v-model="shellMass"
        :min="5"
        :max="50"
        :step="1"
        label="炮弹质量"
        label-tex="m"
        label-width="6.8rem"
        accent="gold"
      >
        <template #value>{{ shellMass }} kg</template>
      </CourseSlider>
      <CourseSlider
        v-model="cannonMass"
        :min="500"
        :max="5000"
        :step="100"
        label="炮身质量"
        label-tex="M"
        label-width="6.8rem"
        accent="teal"
      >
        <template #value>{{ cannonMass }} kg</template>
      </CourseSlider>
    </div>
    <div class="rd-readout">
      <div class="rd-cell">
        <div class="rd-label">炮弹速度</div>
        <div class="rd-value">800 <span>m/s</span></div>
      </div>
      <div class="rd-cell">
        <div class="rd-label">炮身反冲速度</div>
        <div class="rd-value">{{ recoilText }} <span>m/s</span></div>
      </div>
      <div class="rd-cell">
        <div class="rd-label">速率比 <Latex tex="v/V" /></div>
        <div class="rd-value">{{ ratioText }}</div>
      </div>
    </div>
    <div class="rd-bar">
      <div class="rd-fill" :style="{ width: barWidth }"></div>
    </div>
    <div class="rd-scale"><span>0</span><span>80 m/s</span></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const SHELL_SPEED = 800;
const shellMass = ref(10);
const cannonMass = ref(1000);
const recoil = computed(() => (shellMass.value * SHELL_SPEED) / cannonMass.value);
const ratio = computed(() => cannonMass.value / shellMass.value);
const recoilText = computed(() =>
  recoil.value >= 10 ? recoil.value.toFixed(1) : recoil.value.toFixed(2),
);
const ratioText = computed(() =>
  ratio.value >= 100 ? ratio.value.toFixed(1) : ratio.value.toFixed(2),
);
const barWidth = computed(() => `${Math.min(100, (recoil.value / 80) * 100)}%`);
</script>

<style scoped>
.rd {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rd-controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

.rd-readout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}

.rd-cell {
  padding: 0.42rem 0.75rem 0.38rem;
  border: 1px solid var(--c-border);
  border-radius: 0.8rem;
  background: var(--c-surface);
}

.rd-label {
  color: var(--c-text-dim);
  font-size: 0.76rem;
}

.rd-value {
  margin-top: 0.1rem;

  color: var(--c-accent);

  font-weight: 700;
  font-size: 1.28rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.25;
}

.rd-value span {
  color: var(--c-text-dim);
  font-weight: 500;
  font-size: 0.78rem;
}

.rd-bar {
  overflow: hidden;
  height: 0.7rem;
  border-radius: 999px;
  background: var(--c-neutral-700);
}

.rd-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--c-accent), var(--c-accent-2));
  transition: width 0.2s ease;
}

.rd-scale {
  display: flex;
  justify-content: space-between;

  margin-top: -0.3rem;

  color: var(--c-text-mute);

  font-size: 0.68rem;
}
</style>
