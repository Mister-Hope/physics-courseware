<!--
  第 12 页：碰撞前后动量怎样分配。
  取 m₁=2 kg、m₂=3 kg、v₁=4 m/s、v₂=0，碰后 A 的速度用滑块设定，
  B 的速度由动量守恒真实算出：m₁v₁ = m₁v₁′ + m₂v₂′。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

const m1 = 2;
const m2 = 3;
const v1 = 4;

const v1After = ref(1);

const pTotal = computed(() => m1 * v1);
const p1After = computed(() => m1 * v1After.value);
const p2After = computed(() => pTotal.value - p1After.value);
const v2After = computed(() => p2After.value / m2);

const p1Percent = computed(() => (p1After.value / pTotal.value) * 100);
const p2Percent = computed(() => (p2After.value / pTotal.value) * 100);
</script>

<template>
  <div class="lab">
    <div class="lab-bars">
      <div class="lab-row">
        <span class="lab-name">碰前</span>
        <div class="lab-bar">
          <span class="lab-seg seg-a" :style="{ width: '100%' }">A</span>
        </div>
      </div>
      <div class="lab-row">
        <span class="lab-name">碰后</span>
        <div class="lab-bar">
          <span class="lab-seg seg-a" :style="{ width: `${p1Percent}%` }"
            ><span class="lab-tag">A</span></span
          >
          <span class="lab-seg seg-b" :style="{ width: `${p2Percent}%` }"
            ><span class="lab-tag">B</span></span
          >
        </div>
      </div>
      <div class="lab-row">
        <span class="lab-name">总动量</span>
        <div class="lab-bar lab-bar-total">
          <span class="lab-seg seg-total" :style="{ width: '100%' }">{{ pTotal.toFixed(1) }}</span>
        </div>
      </div>
    </div>
    <div class="lab-note">动量 / <Latex tex="\text{kg}\cdot\text{m/s}" /></div>
    <CourseSlider
      v-model="v1After"
      :min="0"
      :max="1.6"
      :step="0.1"
      label="碰后 A 的速度"
      label-tex="v_1'"
      label-width="8.6rem"
    />
    <div class="lab-readout">
      <div class="lab-cell">
        <div class="lab-key"><Latex tex="v_1'" /></div>
        <div class="lab-val">{{ v1After.toFixed(1) }}<Latex tex="\ \text{m/s}" /></div>
      </div>
      <div class="lab-cell">
        <div class="lab-key"><Latex tex="p_1'" /></div>
        <div class="lab-val">
          {{ p1After.toFixed(1) }}<Latex tex="\ \text{kg}\cdot\text{m/s}" />
        </div>
      </div>
      <div class="lab-cell">
        <div class="lab-key"><Latex tex="v_2'" /></div>
        <div class="lab-val">{{ v2After.toFixed(2) }}<Latex tex="\ \text{m/s}" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
}

.lab-bars {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.lab-row {
  display: grid;
  grid-template-columns: 5.6rem minmax(0, 1fr);
  gap: 0.7rem;
  align-items: center;
}

.lab-note {
  margin-top: -0.3rem;
  color: var(--c-text-dim);
  font-size: 0.82rem;
  text-align: right;
}

.lab-name {
  color: var(--c-text-dim);
  font-size: 1rem;
}

.lab-bar {
  display: flex;

  overflow: hidden;

  height: 2.1rem;
  border-radius: 0.6rem;

  background: rgb(255 255 255 / 6%);
}

.lab-seg {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  transition: width 0.25s ease;
}

.seg-a {
  border-right: 1px solid rgb(226 168 70 / 60%);
  background: rgb(226 168 70 / 28%);
  color: var(--c-accent);
}

.seg-b {
  background: rgb(96 165 250 / 24%);
  color: var(--c-velocity);
}

.lab-bar-total {
  height: 1.5rem;
}

.seg-total {
  background: rgb(148 163 184 / 18%);
  color: var(--c-text-dim);
}

.lab-tag {
  padding: 0 0.5rem;
}

.lab-readout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.lab-cell {
  padding: 0.6rem 0.9rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 0.9rem;
  background: rgb(255 255 255 / 5%);
}

.lab-key {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}

.lab-val {
  display: flex;
  gap: 0.15rem;
  align-items: baseline;

  font-weight: 700;
  font-size: 1.3rem;
  font-variant-numeric: tabular-nums;
}
</style>
