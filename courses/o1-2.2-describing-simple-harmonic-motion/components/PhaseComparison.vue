<script setup lang="ts">
import { computed, ref } from "vue";

const delta = ref(Math.PI / 2);

const curves = computed(() => [
  {
    formula: (t: number): number => Math.sin(2 * Math.PI * t),
    samples: 500,
    color: "var(--c-accent)",
    width: 2.4,
  },
  {
    formula: (t: number): number => Math.sin(2 * Math.PI * t + delta.value),
    samples: 500,
    color: "var(--c-sky)",
    width: 2.4,
  },
]);

const status = computed(() => {
  const d = ((delta.value % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  if (d < 0.01) return "同相";
  if (Math.abs(d - Math.PI) < 0.01) return "反相";
  if (d < Math.PI) return "乙的相位比甲超前";
  return "乙的相位比甲落后";
});

const relation = computed(() => {
  const d = ((delta.value % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const forward = d < Math.PI ? d : 2 * Math.PI - d;
  return forward / Math.PI;
});
</script>

<template>
  <div class="shm-phase">
    <div class="shm-chart">
      <CoordAxes
        :x-range="[0, 2]"
        :y-range="[-1.2, 1.2]"
        :x-axis="{ quantity: 't', unit: 's' }"
        :y-axis="{ quantity: 'x', unit: 'm' }"
        :curves="curves"
        :ticks="{ x: [0, 0.5, 1, 1.5, 2], y: [-1, 0, 1], origin: false }"
        :view="{ width: 700, height: 320 }"
      />
    </div>
    <div class="shm-phase-controls">
      <CourseSlider
        v-model="delta"
        :min="0"
        :max="6.28"
        :step="0.26"
        label="相位差"
        accent="blue"
        layout="tight"
      />
      <div class="shm-phase-status">{{ status }}</div>
      <div class="shm-phase-readout">
        相位差 <Latex tex="\Delta\varphi" /> = {{ delta.toFixed(2) }} <Latex tex="\text{rad}" />（{{
          relation.toFixed(2)
        }}<Latex tex="\pi" />）
      </div>
      <div class="shm-formula"><Latex tex="\Delta\varphi=\varphi_2-\varphi_1" /></div>
      <div class="mini-note">两振动频率相同，相位差恒定。</div>
    </div>
  </div>
</template>
