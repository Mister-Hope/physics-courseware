<!--
  第 9 页：输电电压与线路损耗。给定输送功率 P = 100 kW、输电线总电阻 r = 8 Ω
  （教材练习 5 的数据），拖动滑块改变输电电压 U，用真实公式算：
  I = P/U，P损 = I²r，损耗占比 = P损/P。条形图显示输送功率的去向。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

const VOLTAGE_MIN = 1; // kV
const VOLTAGE_MAX = 100; // kV
const POWER = 100; // kW，输送功率
const LINE_R = 8; // Ω，输电线总电阻

const u = ref(4); // kV，教材例题对应的输电电压

/** 输电线电流 I = P / U（kW / kV = A） */
const current = computed(() => POWER / u.value);

/** 功率损失 P损 = I²r（W） */
const lossW = computed(() => current.value ** 2 * LINE_R);

/** 损耗占输送功率的比例（%） */
const lossRatio = computed(() => (lossW.value / (POWER * 1000)) * 100);

const currentText = computed(() =>
  current.value >= 10 ? current.value.toFixed(1) : current.value.toFixed(2),
);

const lossText = computed(() => {
  const kw = lossW.value / 1000;
  if (kw >= 10) return kw.toFixed(1);
  if (kw >= 1) return kw.toFixed(2);
  return kw.toFixed(3);
});

const ratioText = computed(() => {
  const ratio = lossRatio.value;
  if (ratio >= 10) return ratio.toFixed(1);
  if (ratio >= 1) return ratio.toFixed(2);
  return ratio.toFixed(3);
});

const userRatio = computed(() => Math.max(0, 100 - lossRatio.value));
</script>

<template>
  <div class="pld">
    <CourseSlider
      v-model="u"
      :min="VOLTAGE_MIN"
      :max="VOLTAGE_MAX"
      :step="1"
      label="输电电压"
      label-tex="U"
    >
      <template #value>{{ u }}<Latex tex="\text{ kV}" /></template>
    </CourseSlider>
    <div class="pld-meta">
      输送功率 <Latex tex="P = 100\ \text{kW}" /><span class="pld-sep">·</span>输电线总电阻
      <Latex tex="r = 8\ \Omega" />
    </div>
    <div class="pld-readouts">
      <div class="pld-cell">
        <div class="pld-label">线路电流 <Latex tex="I" /></div>
        <div class="pld-value">
          {{ currentText }}<span class="pld-unit"><Latex tex="\text{ A}" /></span>
        </div>
      </div>
      <div class="pld-cell">
        <div class="pld-label">功率损失 <Latex tex="P_{\text{损}}" /></div>
        <div class="pld-value">
          {{ lossText }}<span class="pld-unit"><Latex tex="\text{ kW}" /></span>
        </div>
      </div>
      <div class="pld-cell">
        <div class="pld-label">损耗占比</div>
        <div class="pld-value">
          {{ ratioText }}<span class="pld-unit"><Latex tex="\%" /></span>
        </div>
      </div>
    </div>
    <div class="pld-bar" role="img" aria-label="输送功率中用户获得与线路损耗的比例">
      <div class="pld-bar-user" :style="{ width: `${userRatio}%` }"></div>
      <div class="pld-bar-loss" :style="{ width: `${lossRatio}%` }"></div>
    </div>
    <div class="pld-legend">
      <span><i class="pld-dot pld-dot-user"></i>用户得到</span>
      <span><i class="pld-dot pld-dot-loss"></i>线路损耗</span>
    </div>
  </div>
</template>

<style scoped>
.pld {
  display: flex;
  flex-direction: column;
  gap: 0.36rem;
}

.pld-meta {
  font-size: 0.8rem;
  color: var(--c-text-dim);
  text-align: center;
}

.pld-sep {
  margin: 0 0.5rem;
  opacity: 0.6;
}

.pld-readouts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.pld-cell {
  padding: 0.4rem 0.8rem 0.32rem;

  text-align: center;

  background: rgb(255 255 255 / 4%);
  border-radius: 1rem;
}

.pld-label {
  display: flex;
  gap: 0.25rem;
  align-items: baseline;
  justify-content: center;

  font-size: 0.78rem;
  color: var(--c-text-dim);
}

.pld-value {
  min-height: 1.9rem;

  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}

.pld-unit {
  margin-left: 0.15rem;

  font-size: 0.8rem;
  font-weight: 400;
  color: var(--c-text-dim);
}

.pld-bar {
  display: flex;
  overflow: hidden;

  height: 0.85rem;

  background: var(--c-surface);
  border-radius: 999px;
}

.pld-bar-user {
  background: var(--c-physics);
  transition: width 0.15s ease;
}

.pld-bar-loss {
  background: var(--c-danger);
  transition: width 0.15s ease;
}

.pld-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;

  font-size: 0.72rem;
  color: var(--c-text-dim);
}

.pld-legend span:last-child {
  text-align: right;
}

.pld-dot {
  display: inline-block;

  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.35rem;

  border-radius: 50%;
}

.pld-dot-user {
  background: var(--c-physics);
}

.pld-dot-loss {
  background: var(--c-danger);
}
</style>
