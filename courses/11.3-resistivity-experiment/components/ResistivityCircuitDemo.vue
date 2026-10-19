<script setup lang="ts">
/**
 * 第二课时：滑片联动演示。
 *
 * 拖动滑片 → 接入阻值变化 → 电流表、电压表读数按真实公式变化： I = E / (R接入 + R丝)，U = I·R丝，R接入 = 20 Ω × 滑片位置。 电阻丝的 R丝 = ρl/S
 * 由材料电阻率算出，不是写死的数字。 电流超过电流表量程（0.6 A）时给出提示——这正是"变阻器不能调到太小"的原因。
 */
import { computed, ref } from "vue";

import { WIRE, nominalResistance } from "./resistivityData";

const { step = 0 } = defineProps<{ step?: number }>();

const slider = ref(70);
const wireResistance = nominalResistance();
const accessResistance = computed(() => (WIRE.rheostatMax * slider.value) / 100);
const current = computed(() => WIRE.emf / (accessResistance.value + wireResistance));
const voltage = computed(() => current.value * wireResistance);
const overRange = computed(() => current.value > WIRE.ammeterRange);
</script>

<template>
  <div class="stack">
    <ResistivityCircuitSvg :slider="slider / 100" :step="step" />
    <CourseSlider v-model="slider" :min="0" :max="100" label="滑片位置" accent="blue" />
    <div class="rd-grid">
      <div class="rd-cell">
        <Latex :tex="`I = ${current.toFixed(3)}\\ \\text{A}`" />
      </div>
      <div class="rd-cell">
        <Latex :tex="`U = ${voltage.toFixed(3)}\\ \\text{V}`" />
      </div>
    </div>
    <div class="rd-status">
      <span v-if="overRange" class="rd-warn"
        >滑片不能再往左拨：电流已超过 <Latex tex="0.6\ \text{A}" /> 量程</span
      >
    </div>
  </div>
</template>

<style scoped>
.rd-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 1rem;
}

.rd-cell {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: center;

  min-width: 0;
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 0.75rem;

  background: var(--c-surface);

  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.rd-status {
  min-height: 1.4rem;
  font-size: 0.85rem;
}

.rd-warn {
  color: var(--c-danger);
}
</style>
