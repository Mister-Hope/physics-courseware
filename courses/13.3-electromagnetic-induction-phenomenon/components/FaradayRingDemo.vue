<!--
  P4 交互：1831 年法拉第的铁环实验（图 13.3-1）。
  线圈 A（左，接电源 + 开关）· 线圈 B（右，接电流表）绕在同一个铁环上。
  点「接通电源 / 断开电源」：A 中电流从无到有（或从有到无）→ 铁环中磁场变化 → 穿过 B 的磁通量变化
  ⇒ 只在通断瞬间电流表指针偏转，稳定后回零。
  组件只显示「线圈 A 的电流状态 + 指针现象」，不显示「B 中有没有电流」的文字结论（结论由页面点击给出）。
  屏幕不出现任何公式（感应电动势属选必二）；指针偏角只用真实模型 ∝ |ΔΦ/Δt| ∝ |ΔI_A/Δt| 驱动。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const C = { x: 290, y: 150 };
const RI = 50;
const RO = 76;
const RING_R = (RI + RO) / 2;
const TAU = 220; // ms，电流变化的指数时间常数
const NEEDLE_MAX = 30;

/** 环上某点（半径 r、角度 deg，SVG 坐标 y 向下） */
const pt = (r: number, deg: number): { x: number; y: number } => {
  const a = (deg * Math.PI) / 180;
  return {
    x: Math.round((C.x + r * Math.cos(a)) * 10) / 10,
    y: Math.round((C.y + r * Math.sin(a)) * 10) / 10,
  };
};

/** 线圈 A（左侧 4 匝）与线圈 B（右侧 4 匝）：每匝画成穿过环带的径向线段 */
const SEG_A = [150, 170, 190, 210].map((d) => ({ a: pt(RI, d), b: pt(RO, d) }));
const SEG_B = [-30, -10, 10, 30].map((d) => ({ a: pt(RI, d), b: pt(RO, d) }));
const OUTER_A = [150, 170, 190, 210].map((d) => pt(RO, d));
const OUTER_B = [-30, -10, 10, 30].map((d) => pt(RO, d));

const line = (p: { x: number; y: number }, q: { x: number; y: number }): string =>
  `M ${p.x} ${p.y} L ${q.x} ${q.y}`;
const poly = (ps: { x: number; y: number }[]): string =>
  ps.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

const leadTopA = pt(RO, 210);
const leadBottomA = pt(RO, 150);
const leadTopB = pt(RO, -30);
const leadBottomB = pt(RO, 30);

const powered = ref(false);
/** 线圈 A 中的电流（0–1，相对值） */
const current = ref(0);
/** 指针偏角（度） */
const angle = ref(0);

let raf = 0;
let lastTime = 0;
let startTime = 0;
let startCurrent = 0;
let targetCurrent = 0;

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const tick = (now: number): void => {
  raf = 0;
  const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
  lastTime = now;

  // 指数趋近：I(t) = target + (start − target)·e^(−t/τ)；dI/dt ∝ −(start − target)/τ
  const elapsed = now - startTime;
  const decay = Math.exp(-elapsed / TAU);
  current.value = targetCurrent + (startCurrent - targetCurrent) * decay;
  const didt = (-(startCurrent - targetCurrent) / (TAU / 1000)) * decay;

  const targetAngle = clamp(didt * NEEDLE_MAX * 0.24, -NEEDLE_MAX, NEEDLE_MAX);
  angle.value += (targetAngle - angle.value) * Math.min(1, dt * 16);

  const busy = Math.abs(current.value - targetCurrent) > 0.004 || Math.abs(angle.value) > 0.3;
  if (busy) {
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

const hasCurrent = computed(() => current.value > 0.08);
const statusText = computed(() => (hasCurrent.value ? "线圈 A 有电流" : "线圈 A 无电流"));
</script>

<template>
  <div class="ei-panel">
    <svg viewBox="0 0 580 300" xmlns="http://www.w3.org/2000/svg" class="ei-svg">
      <!-- 铁环 -->
      <circle
        :cx="C.x"
        :cy="C.y"
        :r="RING_R"
        fill="none"
        stroke="var(--c-neutral-700)"
        stroke-width="26"
      />
      <circle
        :cx="C.x"
        :cy="C.y"
        :r="RING_R"
        fill="none"
        stroke="var(--c-neutral-600)"
        stroke-width="26"
        opacity="0.3"
      />
      <!-- 铁环中的磁场：线圈 A 有电流时才出现 -->
      <circle
        v-if="hasCurrent"
        :cx="C.x"
        :cy="C.y"
        :r="RING_R"
        class="ei-ring-flow"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="4"
      />
      <text :x="C.x" :y="C.y + 6" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        铁环
      </text>
      <!-- 两个线圈的绕组 -->
      <g stroke="var(--c-accent)" stroke-width="3.4" stroke-linecap="round">
        <path v-for="(s, i) in SEG_A" :key="'sa' + i" :d="line(s.a, s.b)" />
        <path :d="poly(OUTER_A)" fill="none" />
        <path v-for="(s, i) in SEG_B" :key="'sb' + i" :d="line(s.a, s.b)" />
        <path :d="poly(OUTER_B)" fill="none" />
      </g>
      <!-- 线圈 A 的电路：引线 → 开关 → 电源 → 回到线圈 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path :d="line(leadTopA, { x: 170, y: leadTopA.y })" />
        <path d="M 130 112 H 110 V 142" />
        <path d="M 110 158 V 188 H 224" />
      </g>
      <CircuitBattery :x="110" :y="150" orientation="vertical" polarity emf="E" />
      <CircuitSwitch :x="150" :y="112" label="S" :open="!powered" />
      <!-- 线圈 B 的电路：引线 → 电流表 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path :d="line(leadTopB, { x: 430, y: leadTopB.y })" />
        <path d="M 430 112 V 128" />
        <path d="M 430 172 V 188 H 356" />
      </g>
      <PointerAmmeter :x="430" :y="150" :r="22" :angle="angle" />
      <!-- 元件标签 -->
      <text x="150" y="232" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        线圈 A
      </text>
      <text x="356" y="232" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        线圈 B
      </text>
      <text x="430" y="232" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        电流表
      </text>
    </svg>
    <div class="ei-bar">
      <button
        type="button"
        class="ei-btn"
        :class="{ on: powered }"
        :disabled="powered"
        @click="toggle(true)"
      >
        接通电源
      </button>
      <button type="button" class="ei-btn" :disabled="!powered" @click="toggle(false)">
        断开电源
      </button>
      <span class="ei-pill">仪表状态：{{ statusText }}</span>
    </div>
  </div>
</template>
