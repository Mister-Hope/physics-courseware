<!--
  P9 交互：探究感应电流产生的条件（图 13.3-3）。
  线圈 A 套在线圈 B 里：A 接电源 + 开关 + 滑动变阻器，B 两端接灵敏电流计（沿轴向看，A 在内、B 在外）。
  操作：闭合开关 / 断开开关 / 迅速移动滑片 → A 中电流变化 → 磁场强弱变化 → 穿过 B 的磁通量变化
  ⇒ 灵敏电流计指针只在变化过程中偏转，稳定后回零。
  组件只给「线圈 A 的电流状态 + 指针现象」，不显示「B 中有没有感应电流」的文字结论（由页面表格逐击给出）。
  内部按闭合电路欧姆定律 I = E/(R+r) 计算电流，指针偏角 ∝ |dI/dt|；屏幕不出现公式与数值。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/** 电源电动势（V）、内阻（Ω）、变阻器阻值范围（Ω）——只用于内部计算，不上屏 */
const E = 6;
const R_INNER = 1;
const R_MIN = 1;
const R_MAX = 5;
const I_PEAK = E / (R_MIN + R_INNER); // 6 A，用于归一化
const NEEDLE_MAX = 30;
/** 变阻器滑片位置范围：快速移动时在两端之间来回 */
const POS_RIGHT = 0.68;
const POS_LEFT = 0.26;
const SLIDER_DURATION = 160;
const TAU = 250; // ms，开关通断时电流变化的指数时间常数

const resAt = (pos: number): number => R_MIN + (R_MAX - R_MIN) * pos;
const currentAt = (pos: number): number => E / (resAt(pos) + R_INNER) / I_PEAK;

const closed = ref(false);
const sliding = ref(false);
const pos = ref(POS_RIGHT);
/** 线圈 A 中的电流（0–1 归一化） */
const current = ref(0);
const angle = ref(0);

let raf = 0;
let lastTime = 0;
let startTime = 0;
let startCurrent = 0;
let targetCurrent = 0;
let slideStartPos = POS_RIGHT;
let slideTargetPos = POS_RIGHT;
/** 指针偏角系数：dI/dt 约 1.8 /s 时满偏 */
const ANGLE_K = NEEDLE_MAX / 1.8;

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const tick = (now: number): void => {
  raf = 0;
  const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
  lastTime = now;
  let didt = 0;

  if (sliding.value) {
    const p = Math.min(1, (now - startTime) / SLIDER_DURATION);
    const prev = current.value;
    pos.value = slideStartPos + (slideTargetPos - slideStartPos) * p;
    current.value = currentAt(pos.value);
    didt = (current.value - prev) / dt;
    if (p >= 1) {
      sliding.value = false;
      targetCurrent = current.value;
      didt = 0;
    }
  } else {
    const decay = Math.exp(-(now - startTime) / TAU);
    current.value = targetCurrent + (startCurrent - targetCurrent) * decay;
    didt = (-(startCurrent - targetCurrent) / (TAU / 1000)) * decay;
  }

  const target = clamp(didt * ANGLE_K, -NEEDLE_MAX, NEEDLE_MAX);
  angle.value += (target - angle.value) * Math.min(1, dt * 16);

  const currentBusy = sliding.value || Math.abs(current.value - targetCurrent) > 0.004;
  const angleBusy = Math.abs(angle.value) > 0.3;
  if (currentBusy || angleBusy) {
    raf = requestAnimationFrame(tick);
  } else {
    current.value = targetCurrent;
    angle.value = 0;
  }
};

const ensureLoop = (): void => {
  if (raf) return;
  lastTime = performance.now();
  raf = requestAnimationFrame(tick);
};

const setClosed = (on: boolean): void => {
  if (closed.value === on || sliding.value) return;
  closed.value = on;
  startCurrent = current.value;
  targetCurrent = on ? currentAt(pos.value) : 0;
  startTime = performance.now();
  ensureLoop();
};

/** 滑动变阻器（限流接法：线圈一端 + 滑片）：滑片接线端随 pos 移动，引线从这里接回线圈 A */
const RHEO = { x: 140, y: 250, length: 48, stub: 16 };
const sliderTerminal = computed(() => ({
  x: RHEO.x - RHEO.length / 2 + pos.value * RHEO.length,
  y: RHEO.y - RHEO.length / 6 / 2 - RHEO.stub,
}));

const moveSlider = (): void => {
  if (!closed.value || sliding.value) return;
  slideStartPos = pos.value;
  slideTargetPos = pos.value > 0.5 ? POS_LEFT : POS_RIGHT;
  startTime = performance.now();
  sliding.value = true;
  ensureLoop();
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const status = computed(() => {
  if (!closed.value && current.value < 0.05) return "线圈 A 无电流";
  if (sliding.value || Math.abs(current.value - targetCurrent) > 0.02) return "线圈 A 电流变化中";
  return "线圈 A 有电流（稳定）";
});
</script>

<template>
  <div class="ei-panel">
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" class="ei-svg">
      <!-- 线圈 A（内，蓝）：半径小的一圈立体螺旋线，与 B 共轴嵌套（先画内圈，外圈盖在上面更像"套在里面"）。
           phase 0 ⇒ 左端在上 (227,77)、右端在下 (343,133) -->
      <Solenoid
        :x="285"
        :y="105"
        :length="116"
        :radius="28"
        :turns="3.5"
        direction="ccw"
        :phase="0"
        color="var(--c-accent-2)"
        :line-width="3.1"
        :back-opacity="0.42"
      />
      <!-- 线圈 B（外，中性灰）：半径大的一圈立体螺旋线，把 A 套在里面。
           phase 0 ⇒ 左端在上 (209,51)、右端在下 (361,159) -->
      <Solenoid
        :x="285"
        :y="105"
        :length="152"
        :radius="54"
        :turns="4.5"
        direction="ccw"
        :phase="0"
        color="var(--c-neutral-300)"
        :line-width="2"
        :back-opacity="0.18"
      />
      <!-- 线圈 A 的引线与电路：电源、开关、滑动变阻器 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 227 77 H 170 V 40 H 40 V 82" />
        <path d="M 40 98 V 150" />
        <path d="M 40 190 V 250 H 116" />
        <path
          :d="`M 343 133 H 351 Q 355 133 355 137 V 210 H ${sliderTerminal.x} V ${sliderTerminal.y}`"
        />
      </g>
      <CircuitBattery :x="40" :y="90" orientation="vertical" polarity emf="E" />
      <CircuitSwitch :x="40" :y="170" orientation="vertical" label="S" :open="!closed" />
      <CircuitRheostat :x="140" :y="250" :slider="pos" />
      <!-- 线圈 B 的引线与灵敏电流计（导线止于表盘左右接线柱 408 / 452）-->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 361 159 H 385 V 110 H 408" />
        <path d="M 209 51 H 190 V 35 H 470 V 110 H 452" />
      </g>
      <Galvanometer :x="430" :y="110" :r="22" :angle="angle" />
      <text x="430" y="178" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        灵敏电流计
      </text>
      <!-- 图例 -->
      <g stroke-width="2.6">
        <line x1="22" y1="264" x2="46" y2="264" stroke="var(--c-accent-2)" />
        <line x1="150" y1="264" x2="174" y2="264" stroke="var(--c-neutral-300)" />
      </g>
      <text x="54" y="270" font-size="17" fill="var(--c-text-dim)">线圈 A</text>
      <text x="182" y="270" font-size="17" fill="var(--c-text-dim)">线圈 B</text>
    </svg>
    <div class="ei-read">
      <span class="ei-item"
        >仪表状态：<strong>{{ status }}</strong></span
      >
    </div>
    <div class="ei-bar">
      <button
        type="button"
        class="ei-btn"
        :class="{ on: closed }"
        :disabled="closed"
        @click="setClosed(true)"
      >
        闭合开关
      </button>
      <button type="button" class="ei-btn" :disabled="!closed" @click="setClosed(false)">
        断开开关
      </button>
      <button type="button" class="ei-btn" :disabled="!closed" @click="moveSlider">
        迅速移动滑片
      </button>
    </div>
  </div>
</template>
