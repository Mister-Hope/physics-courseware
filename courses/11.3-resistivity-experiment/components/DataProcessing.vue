<script setup lang="ts">
/**
 * 第二课时：把三个测量值合成电阻率（真实计算，数字随数据变化）。
 *
 * R —— U-I 图线斜率（最小二乘，见 resistivityData.fittedResistance） S —— πd²/4 ρ —— SR/l 分步用 visibility 占位（不用
 * v-if），后面的行不会被顶跑。
 */
import { computed } from "vue";

import {
  WIRE,
  crossSection,
  fittedResistance,
  measuredResistivity,
  scientific,
} from "./resistivityData";

const { step = 0 } = defineProps<{ step?: number }>();

const resistance = fittedResistance();
const area = crossSection();
const resistivity = measuredResistivity();
const diameterMm = (WIRE.diameter * 1000).toFixed(3);

const resistanceTex = computed(() => `R = ${resistance.toFixed(2)}\\ \\Omega`);
const areaTex = computed(
  () =>
    `S = \\dfrac{\\pi d^2}{4} = \\dfrac{\\pi \\times (${diameterMm}\\ \\text{mm})^2}{4} = ${scientific(area)}\\ \\text{m}^2`,
);
const resistivityTex = computed(
  () =>
    `\\rho = \\dfrac{SR}{l} = \\dfrac{${scientific(area)} \\times ${resistance.toFixed(2)}}{${WIRE.length.toFixed(3)}}\\ \\Omega\\cdot\\text{m} = ${scientific(resistivity)}\\ \\Omega\\cdot\\text{m}`,
);
</script>

<template>
  <div class="stack">
    <div class="dp-row" :class="{ 'dp-hidden': step < 1 }">
      <span class="dp-tag">①</span>
      <span class="dp-text"><Latex :tex="resistanceTex" /></span>
    </div>
    <div class="dp-row" :class="{ 'dp-hidden': step < 2 }">
      <span class="dp-tag">②</span>
      <span class="dp-text"><Latex :tex="areaTex" /></span>
    </div>
    <div class="dp-row" :class="{ 'dp-hidden': step < 3 }">
      <span class="dp-tag">③</span>
      <span class="dp-text"><Latex :tex="resistivityTex" /></span>
    </div>
  </div>
</template>

<style scoped>
.dp-row {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;

  min-width: 0;

  overflow-wrap: anywhere;
}

.dp-tag {
  color: var(--c-accent);
  font-weight: 700;
}

.dp-text {
  min-width: 0;
}

.dp-hidden {
  visibility: hidden;
}
</style>
