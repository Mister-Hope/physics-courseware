<!--
  第 9 页演示：通电自感。
  两条并联支路：L 与 A₁ 串联、可调电阻 R 与 A₂ 串联，两灯规格相同。
  闭合开关：A₂ 立即亮，A₁ 被线圈"拖住"、慢慢变亮。
  可切换有无铁芯（离散两档）：有铁芯时 L 更大，A₁ 亮得更慢。
  灯亮度 ∝ 支路电流，电流用指数趋近模型实时算。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

interface Ramp {
  t0: number;
  from: number;
  to: number;
  tau: number;
}

const closed = ref(false);
const core = ref(true);
/** A₁ 支路电流（相对值 0–1） */
const iL = ref(0);
/** A₂ 支路电流（相对值 0–1） */
const iR = ref(0);

const rampL: Ramp = { t0: 0, from: 0, to: 0, tau: 340 };
const rampR: Ramp = { t0: 0, from: 0, to: 0, tau: 90 };

let raf = 0;

const tauL = (): number => (core.value ? 950 : 340);

const stepValue = (ramp: Ramp, now: number): number =>
  ramp.to + (ramp.from - ramp.to) * Math.exp(-(now - ramp.t0) / ramp.tau);

const tick = (): void => {
  raf = 0;
  const now = performance.now();

  iL.value = stepValue(rampL, now);
  iR.value = stepValue(rampR, now);

  const busyL = Math.abs(iL.value - rampL.to) > 0.004;
  const busyR = Math.abs(iR.value - rampR.to) > 0.004;

  if (busyL || busyR) {
    raf = requestAnimationFrame(tick);
  } else {
    iL.value = rampL.to;
    iR.value = rampR.to;
  }
};

const ensureLoop = (): void => {
  if (raf) return;
  raf = requestAnimationFrame(tick);
};

const setClosed = (on: boolean): void => {
  if (closed.value === on) return;
  closed.value = on;
  const now = performance.now();

  rampL.t0 = now;
  rampL.from = iL.value;
  rampL.to = on ? 1 : 0;
  rampL.tau = on ? tauL() : 110;

  rampR.t0 = now;
  rampR.from = iR.value;
  rampR.to = on ? 1 : 0;
  rampR.tau = 90;

  ensureLoop();
};

const toggleCore = (): void => {
  core.value = !core.value;

  if (closed.value) {
    rampL.t0 = performance.now();
    rampL.from = iL.value;
    rampL.to = 1;
    rampL.tau = tauL();
    ensureLoop();
  }
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const stateText = computed(() => {
  if (!closed.value) return iL.value > 0.02 ? "电流逐渐减小" : "开关断开";
  return iL.value < 0.97 ? "L 中电流增大" : "L 中电流稳定";
});
</script>

<template>
  <div class="demo-panel">
    <svg viewBox="140 60 470 285" xmlns="http://www.w3.org/2000/svg" class="demo-svg">
      <!-- 铁芯（离散切换） -->
      <rect
        v-if="core"
        x="156"
        y="90"
        width="28"
        height="76"
        rx="3"
        fill="var(--c-neutral-700)"
        opacity="0.5"
      />
      <!-- 导线：左右两条支路并联，中间一条接电源与开关 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 170 80 H 560" />
        <path d="M 170 80 V 99.2" />
        <path d="M 170 152.8 V 226" />
        <path d="M 170 258 V 330" />
        <path d="M 560 80 V 116" />
        <path d="M 560 164 V 226" />
        <path d="M 560 258 V 330" />
        <path d="M 170 330 H 560" />
        <path d="M 365 80 V 132" />
        <path d="M 365 172 V 232" />
        <path d="M 365 250 V 330" />
      </g>
      <!-- 节点圆点 -->
      <circle cx="365" cy="80" r="3.4" fill="var(--c-text)" />
      <circle cx="365" cy="330" r="3.4" fill="var(--c-text)" />
      <!-- 线圈 L：套在铁芯上的竖放连续螺旋线 3.5 匝，接线端落在上、下轮廓 (170,99.2) / (170,152.8) -->
      <Solenoid
        :x="170"
        :y="126"
        :length="36"
        :radius="26"
        :turns="3.5"
        direction="ccw"
        orientation="vertical"
        :phase="270"
        :line-width="2.8"
        :back-opacity="0.32"
      />
      <!-- A₁ -->
      <circle :cx="170" :cy="242" :r="26 + 12 * iL" fill="var(--c-accent)" :opacity="0.38 * iL" />
      <CircuitBulb :x="170" :y="242" :r="16" />
      <!-- R 与 A₂ -->
      <CircuitResistor :x="560" :y="140" orientation="vertical" label="R" />
      <circle :cx="560" :cy="242" :r="26 + 12 * iR" fill="var(--c-accent)" :opacity="0.38 * iR" />
      <CircuitBulb :x="560" :y="242" :r="16" />
      <!-- 中间支路：开关 + 电源 -->
      <CircuitSwitch :x="365" :y="152" orientation="vertical" label="S" :open="!closed" />
      <CircuitBattery :x="365" :y="241" orientation="vertical" polarity emf="E" />
      <!-- 标签 -->
      <text
        x="134"
        y="134"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-accent)"
      >
        L
      </text>
      <text x="194" y="248" font-size="16" fill="var(--c-text-dim)">A</text>
      <text x="203" y="253" font-size="11" fill="var(--c-text-dim)">1</text>
      <text x="584" y="248" font-size="16" fill="var(--c-text-dim)">A</text>
      <text x="593" y="253" font-size="11" fill="var(--c-text-dim)">2</text>
    </svg>

    <div class="demo-bar">
      <button
        type="button"
        class="demo-btn"
        :class="{ on: closed }"
        :disabled="closed"
        @click="setClosed(true)"
      >
        闭合
      </button>
      <button type="button" class="demo-btn" :disabled="!closed" @click="setClosed(false)">
        断开
      </button>
      <button type="button" class="demo-btn" @click="toggleCore">
        铁芯：{{ core ? "有" : "无" }}
      </button>
      <span class="demo-pill">{{ stateText }}</span>
    </div>
  </div>
</template>
