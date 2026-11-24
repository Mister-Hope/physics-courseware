<!-- 玻意耳定律实验室：拖动体积 V，压强按 p = C/V 实时计算，状态点在等温线上移动 -->
<script setup lang="ts">
import { computed, ref } from "vue";

/** 常量 C = pV，单位 kPa·mL */
const C = 2000;

const volume = ref(20);
const pressure = computed(() => C / volume.value);

const curves = computed(() => {
  const pts: { x: number; y: number }[] = [];
  for (let v = 4.5; v <= 30; v += 0.25) pts.push({ x: v, y: C / v });
  return [{ points: pts, color: "#e2a846", width: 2.8 }];
});

const labels = computed(() => [{ x: volume.value, y: pressure.value, dot: true }]);
</script>

<template>
  <div class="lab">
    <div class="lab-plot">
      <CoordAxes
        :x-range="[0, 32]"
        :y-range="[0, 440]"
        :x-axis="{ quantity: 'V', unit: 'mL', side: 'below' }"
        :y-axis="{ quantity: 'p', unit: 'kPa' }"
        :curves="curves"
        :labels="labels"
        :ticks="{ x: [5, 10, 20, 30], y: [100, 200, 300, 400] }"
        :view="{ width: 470, height: 300 }"
      />
    </div>
    <div class="lab-panel">
      <CourseSlider
        v-model="volume"
        :min="5"
        :max="30"
        :step="1"
        label="体积"
        label-tex="V"
        label-width="4.2rem"
      >
        <template #value>{{ volume }}<Latex tex="\ \text{mL}" /></template>
      </CourseSlider>
      <div class="lab-readout">
        <div class="lab-cell">
          <div class="lab-key">压强 <Latex tex="p" /></div>
          <div class="lab-val">{{ pressure.toFixed(0) }}<Latex tex="\ \text{kPa}" /></div>
        </div>
        <div class="lab-cell">
          <div class="lab-key"><Latex tex="pV" /></div>
          <div class="lab-val">
            {{ (pressure * volume).toFixed(0) }}<Latex tex="\ \text{kPa}\cdot\text{mL}" />
          </div>
        </div>
      </div>
      <div class="lab-note">
        <Latex tex="p = \dfrac{C}{V}" />，<Latex tex="C" /> 不变，<Latex tex="pV" /> 也不变。
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;

  width: 100%;
}

.lab-plot {
  width: 100%;
  min-width: 0;
}

.lab-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.lab-readout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.lab-cell {
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 0.9rem;
  background: rgb(255 255 255 / 5%);
}

.lab-key {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.lab-val {
  display: flex;
  gap: 0.15rem;
  align-items: baseline;

  margin-top: 0.15rem;

  font-weight: 700;
  font-size: 1.24rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.lab-val :deep(.katex) {
  font-size: 0.6em;
}

.lab-note {
  color: var(--c-text-dim);
  font-size: 0.95rem;
}
</style>
