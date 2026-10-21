<!-- 第 9 页交互：把不同电荷量的试探电荷放到电场同一点 A，看电势能变、电势不变 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const { showPotential = false } = defineProps<{
  /** 是否揭晓 A 点电势的读数（false 时显示"？"，让学生先猜） */
  showPotential?: boolean;
}>();

/** A 点电势（由电场本身决定，固定为 100 V） */
const PHI_A = 100;

/** 试探电荷的电荷量，单位 nC */
const qNano = ref(1);

/** 电势能 Ep = qφ，单位 nJ（1 nC × 1 V = 1 nJ） */
const epNanoJoule = computed(() => qNano.value * PHI_A);

/** 读数：电荷量带正负号、保留一位小数（0 不带符号） */
const qText = computed(() => {
  if (qNano.value === 0) return "0.0";

  return `${qNano.value > 0 ? "+" : "-"}${Math.abs(qNano.value).toFixed(1)}`;
});

/** 读数：电势能带正负号、保留一位小数（0 不带符号） */
const epText = computed(() => {
  const { value } = epNanoJoule;

  if (Math.abs(value) < 0.05) return "0.0";

  return `${value > 0 ? "+" : "-"}${Math.abs(value).toFixed(1)}`;
});

/** 电势能条：以中线为 0，最大 300 nJ 对应半宽 */
const barStyle = computed(() => {
  const halfPercent = (Math.abs(epNanoJoule.value) / 300) * 50;

  return epNanoJoule.value >= 0
    ? { left: "50%", width: `${halfPercent}%` }
    : { left: `${50 - halfPercent}%`, width: `${halfPercent}%` };
});
</script>

<template>
  <div class="pp-lab">
    <CourseSlider
      v-model="qNano"
      :min="-3"
      :max="3"
      :step="0.1"
      label="试探电荷"
      label-tex="q"
      accent="blue"
      aria-label="试探电荷的电荷量"
    >
      <template #value>
        <span class="pp-number">{{ qText }}</span
        ><Latex tex="\text{ nC}" />
      </template>
    </CourseSlider>
    <div class="pp-grid">
      <div class="pp-cell">
        <div class="pp-cell-head">电势能 <Latex tex="E_p" /></div>
        <div class="pp-cell-value">
          <span class="pp-number">{{ epText }}</span
          ><Latex tex="\text{ nJ}" />
        </div>
        <div class="pp-bar" aria-hidden="true">
          <span class="pp-bar-zero"></span>
          <span class="pp-bar-fill" :style="barStyle"></span>
        </div>
        <div class="pp-cell-formula"><Latex tex="E_p = q\varphi_A" /></div>
      </div>
      <div class="pp-cell pp-cell-phi">
        <div class="pp-cell-head">电势 <Latex tex="\varphi_A" /></div>
        <div class="pp-cell-value">
          <template v-if="showPotential"
            ><span class="pp-number">100</span><Latex tex="\text{ V}"
          /></template>
          <span v-else class="pp-placeholder">？</span>
        </div>
        <div class="pp-cell-note" :class="{ 'pp-hidden': !showPotential }">由电场本身决定</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pp-lab {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  width: 100%;
  min-width: 0;
}

.pp-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.8rem;
  align-items: start;
}

.pp-cell {
  min-width: 0;
}

.pp-cell-phi {
  padding-left: 1.6rem;
  border-left: 1px solid var(--c-border);
}

.pp-cell-head {
  color: var(--c-text-dim);
  font-size: 0.95rem;
  line-height: 1.5;
}

.pp-cell-value {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;

  margin-top: 0.15rem;

  color: var(--c-text);

  font-weight: 700;
  font-size: 1.75rem;
  line-height: 1.25;
}

.pp-number {
  display: inline-block;
  min-width: 6.2ch;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.pp-bar {
  position: relative;

  overflow: hidden;

  height: 0.75rem;
  margin-top: 0.45rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: var(--c-surface-solid);
}

.pp-bar-zero {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;

  width: 1px;

  background: var(--c-text-dim);
}

.pp-bar-fill {
  position: absolute;
  top: 0;
  bottom: 0;

  border-radius: 999px;

  background: var(--c-accent);

  transition:
    left 0.12s linear,
    width 0.12s linear;
}

.pp-cell-formula,
.pp-cell-note {
  margin-top: 0.35rem;
  color: var(--c-text-dim);
  font-size: 0.95rem;
  line-height: 1.5;
}

.pp-placeholder {
  color: var(--c-text-dim);
  font-weight: 700;
}

.pp-hidden {
  visibility: hidden;
}
</style>
