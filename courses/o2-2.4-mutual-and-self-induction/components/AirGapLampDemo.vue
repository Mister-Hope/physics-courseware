<!--
  第 3 页演示：隔空点灯（互感）。
  左线圈 A 接电源与开关，右线圈 B 接小灯泡；两线圈之间只有空气、没有导线。
  合上 / 断开开关的瞬间，A 中电流变化 → 穿过 B 的磁通量变化
  → B 中产生感应电动势 → 灯闪亮；电流稳定后灯熄灭。

  灯亮度 ∝ |dI/dt|（用指数趋近模型实时算），不是写死的动画。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/** 电流变化的指数时间常数（ms） */
const TAU = 240;

const powered = ref(false);
/** 线圈 A 中的电流，0–1（相对值） */
const current = ref(0);
/** B 中的感应电动势，0–1（相对值）；灯亮度直接跟随它 */
const emf = ref(0);

let raf = 0;
let last = 0;
let startTime = 0;
let startCurrent = 0;
let targetCurrent = 0;

const clamp = (value: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, value));

const tick = (now: number): void => {
  raf = 0;
  const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
  last = now;

  // I(t) = target + (start − target)·e^(−t/τ)
  const decay = Math.exp(-(now - startTime) / TAU);
  current.value = targetCurrent + (startCurrent - targetCurrent) * decay;

  // dI/dt（每秒）：只在电流变化时非零，稳定后归零
  const didt = ((targetCurrent - startCurrent) / (TAU / 1000)) * decay;
  const targetEmf = clamp(Math.abs(didt) * 0.22, 0, 1);
  emf.value += (targetEmf - emf.value) * Math.min(1, dt * 26);

  const busy = Math.abs(current.value - targetCurrent) > 0.003 || emf.value > 0.006;

  if (busy) {
    raf = requestAnimationFrame(tick);
  } else {
    current.value = targetCurrent;
    emf.value = 0;
  }
};

const ensureLoop = (): void => {
  if (raf) return;
  last = performance.now();
  raf = requestAnimationFrame(tick);
};

const toggle = (on: boolean): void => {
  if (powered.value === on) return;
  powered.value = on;
  startCurrent = current.value;
  targetCurrent = on ? 1 : 0;
  startTime = performance.now();
  ensureLoop();
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const stateText = computed(() => {
  if (!powered.value) return current.value > 0.02 ? "A 中电流减小" : "A 中无电流";

  return current.value < 0.98 ? "A 中电流增大" : "A 中电流稳定";
});

/** 磁场强度：随 A 中电流出现、消失 */
const fieldOpacity = computed(() => 0.55 * current.value);
/** 灯亮度 */
const glow = computed(() => clamp(emf.value * 1.15, 0, 1));
</script>

<template>
  <div class="demo-panel">
    <svg viewBox="135 74 350 250" xmlns="http://www.w3.org/2000/svg" class="demo-svg">
      <!-- 穿过两只线圈的磁场（有电流才出现，电流变化时流动） -->
      <g
        class="field-flow"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.8"
        stroke-dasharray="12 10"
        :opacity="fieldOpacity"
      >
        <ellipse cx="306" cy="130" rx="122" ry="24" />
        <ellipse cx="306" cy="130" rx="132" ry="46" />
        <ellipse cx="306" cy="130" rx="140" ry="64" />
      </g>

      <!-- 线圈 A：4 匝 -->
      <g fill="none" stroke="var(--c-accent)" stroke-width="2.8">
        <ellipse cx="170" cy="130" rx="8" ry="30" />
        <ellipse cx="184" cy="130" rx="8" ry="30" />
        <ellipse cx="198" cy="130" rx="8" ry="30" />
        <ellipse cx="212" cy="130" rx="8" ry="30" />
      </g>

      <!-- 线圈 B：4 匝 -->
      <g fill="none" stroke="var(--c-accent-2)" stroke-width="2.8">
        <ellipse cx="400" cy="130" rx="8" ry="30" />
        <ellipse cx="414" cy="130" rx="8" ry="30" />
        <ellipse cx="428" cy="130" rx="8" ry="30" />
        <ellipse cx="442" cy="130" rx="8" ry="30" />
      </g>

      <!-- A 的电路 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 170 130 H 150 V 250 H 155" />
        <path d="M 195 250 H 227" />
        <path d="M 243 250 H 262 V 130 H 212" />
      </g>
      <CircuitSwitch :x="175" :y="250" label="S" :open="!powered" />
      <CircuitBattery :x="235" :y="250" polarity emf="E" />

      <!-- B 的电路 + 灯泡 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 400 130 H 380 V 250 H 414" />
        <path d="M 446 250 H 466 V 130 H 442" />
      </g>
      <circle
        :cx="430"
        :cy="250"
        :r="26 + 16 * glow"
        fill="var(--c-accent)"
        :opacity="0.42 * glow"
      />
      <CircuitBulb :x="430" :y="250" :r="16" />

      <!-- 图中的文字 -->
      <text x="191" y="84" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
        线圈 A
      </text>
      <text x="421" y="84" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
        线圈 B
      </text>
      <text x="430" y="292" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">
        小灯泡
      </text>
    </svg>

    <div class="demo-bar">
      <button
        type="button"
        class="demo-btn"
        :class="{ on: powered }"
        :disabled="powered"
        @click="toggle(true)"
      >
        接通
      </button>
      <button type="button" class="demo-btn" :disabled="!powered" @click="toggle(false)">
        断开
      </button>
      <span class="demo-pill">{{ stateText }}</span>
    </div>
  </div>
</template>
