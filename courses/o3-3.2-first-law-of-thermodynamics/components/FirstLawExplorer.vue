<!-- 第 6 页：Q、W 各取离散值，按 ΔU=Q+W 实时计算内能变化 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const options = [-200, 0, 200];
const q = ref(0);
const w = ref(0);
const deltaU = computed<number>(() => q.value + w.value);
const barWidth = computed<number>(() => Math.abs(deltaU.value) / 4);
const stateText = computed<string>(() => {
  if (deltaU.value > 0) return `内能增加 ${deltaU.value} J`;
  if (deltaU.value < 0) return `内能减少 ${-deltaU.value} J`;
  return "内能不变";
});
const qLabel = (value: number): string =>
  value > 0 ? "吸热 200 J" : value < 0 ? "放热 200 J" : "不传热";
const wLabel = (value: number): string =>
  value > 0 ? "外界做功 200 J" : value < 0 ? "对外做功 200 J" : "不做功";
</script>

<template>
  <div class="flx">
    <div class="flx-row">
      <span class="flx-key">Q</span>
      <button
        v-for="value in options"
        :key="`q${value}`"
        type="button"
        class="flx-btn"
        :class="{ 'flx-btn--on': q === value }"
        @click="q = value"
      >
        {{ qLabel(value) }}
      </button>
    </div>
    <div class="flx-row">
      <span class="flx-key">W</span>
      <button
        v-for="value in options"
        :key="`w${value}`"
        type="button"
        class="flx-btn"
        :class="{ 'flx-btn--on': w === value }"
        @click="w = value"
      >
        {{ wLabel(value) }}
      </button>
    </div>
    <div class="flx-result">
      <div class="flx-eq">
        <Latex tex="\Delta U=Q+W" />
        <span class="flx-nums"
          >= {{ q }} + {{ w }} = <strong>{{ deltaU }}</strong> <Latex tex="\text{ J}"
        /></span>
      </div>
      <div class="flx-state" :class="deltaU > 0 ? 'flx-up' : deltaU < 0 ? 'flx-down' : 'flx-flat'">
        {{ stateText }}
      </div>
    </div>
    <div class="flx-track">
      <div class="flx-axis"></div>
      <div
        class="flx-fill"
        :class="deltaU < 0 ? 'flx-fill--down' : ''"
        :style="
          deltaU >= 0
            ? { left: '50%', width: `${barWidth}%` }
            : { right: '50%', width: `${barWidth}%` }
        "
      ></div>
    </div>
    <div class="flx-scale">
      <span>内能减少</span>
      <span>内能增加</span>
    </div>
  </div>
</template>

<style scoped>
.flx {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.flx-row {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.flx-key {
  width: 1.6rem;
  color: var(--c-accent);
  font-weight: 700;
  font-size: 1.1rem;
}

.flx-btn {
  flex: 1;

  padding: 0.45rem 0.2rem;
  border: 1px solid var(--c-border);
  border-radius: 0.6rem;

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 0.82rem;

  cursor: pointer;

  transition: 0.15s;
}

.flx-btn--on {
  border-color: var(--c-accent);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.flx-result {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.3rem;
}

.flx-eq {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  font-size: 1rem;
}

.flx-eq :deep(.katex) {
  font-size: 1.06em;
}

.flx-nums {
  font-variant-numeric: tabular-nums;
}

.flx-state {
  font-weight: 700;
  font-size: 0.95rem;
}

.flx-up {
  color: var(--c-ok);
}

.flx-down {
  color: var(--c-danger);
}

.flx-flat {
  color: var(--c-text-dim);
}

.flx-track {
  position: relative;

  overflow: hidden;

  height: 12px;
  border-radius: 6px;

  background: var(--c-surface-solid);
}

.flx-axis {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;

  width: 2px;

  background: var(--c-border-glow);

  transform: translateX(-50%);
}

.flx-fill {
  position: absolute;
  top: 2px;
  bottom: 2px;

  border-radius: 4px;

  background: var(--c-ok);

  transition: width 0.2s;
}

.flx-fill--down {
  background: var(--c-danger);
}

.flx-scale {
  display: flex;
  justify-content: space-between;

  margin-top: -0.55rem;

  color: var(--c-text-dim);

  font-size: 0.72rem;
}
</style>
