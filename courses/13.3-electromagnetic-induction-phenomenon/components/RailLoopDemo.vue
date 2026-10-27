<!--
  P8 交互：U 形导轨 + 金属棒 AB + 灵敏电流计，匀强磁场垂直纸面向里（FieldDots）。
  点「向右 / 向左滑动」：AB 沿导轨滑动 → 回路面积 S 变化 → 磁通量 Φ = BS 变化 → 灵敏电流计指针偏转；
  停止后指针回零。物理量只作定性读数（变大 / 变小 / 不变），不出现数值与刻度。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/** 导轨几何（viewBox 580 × 330） */
const RAIL_TOP = 80;
const RAIL_BOTTOM = 280;
const LEFT_X = 100;
const RIGHT_X = 560;
const ROD_MIN = 210;
const ROD_MAX = 520;
/** 每次点击滑动的屏幕距离与时长 */
const SLIDE_PX = 155;
const DURATION = 700;
/** 指针满偏角与参考速度 */
const NEEDLE_MAX = 34;
const V_REF = 620;

const rodX = ref(ROD_MIN + 62);
const angle = ref(0);
const moving = ref(false);
const moveDir = ref<1 | -1>(1);

let startX = rodX.value;
let targetX = rodX.value;
let startTime = 0;
let raf = 0;
let lastTime = 0;
let velocity = 0;

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const tick = (now: number): void => {
  raf = 0;
  const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
  lastTime = now;

  if (moving.value) {
    const p = Math.min(1, (now - startTime) / DURATION);
    const ease = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    const x = startX + (targetX - startX) * ease;
    velocity = (x - rodX.value) / dt;
    rodX.value = x;
    if (p >= 1) {
      moving.value = false;
      velocity = 0;
    }
  } else {
    velocity *= 0.82;
  }

  const target = moving.value
    ? clamp(
        -moveDir.value * NEEDLE_MAX * Math.min(1, Math.abs(velocity) / V_REF),
        -NEEDLE_MAX,
        NEEDLE_MAX,
      )
    : 0;
  angle.value += (target - angle.value) * Math.min(1, dt * 14);

  const busy = moving.value || Math.abs(angle.value) > 0.3 || Math.abs(target - angle.value) > 0.3;
  if (busy) {
    raf = requestAnimationFrame(tick);
  } else {
    angle.value = 0;
    velocity = 0;
  }
};

const ensureLoop = (): void => {
  if (raf) return;
  lastTime = performance.now();
  raf = requestAnimationFrame(tick);
};

const slide = (dir: 1 | -1): void => {
  if (moving.value) return;
  const next = clamp(rodX.value + dir * SLIDE_PX, ROD_MIN, ROD_MAX);
  if (next === rodX.value) return;
  startX = rodX.value;
  targetX = next;
  moveDir.value = dir;
  startTime = performance.now();
  moving.value = true;
  ensureLoop();
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const canLeft = computed(() => !moving.value && rodX.value > ROD_MIN + 0.5);
const canRight = computed(() => !moving.value && rodX.value < ROD_MAX - 0.5);
const changing = computed(() => (moving.value ? (moveDir.value > 0 ? "变大" : "变小") : "不变"));
const meterText = computed(() => (moving.value ? "偏转" : "不偏转"));
</script>

<template>
  <div class="ei-panel">
    <svg viewBox="0 0 580 330" xmlns="http://www.w3.org/2000/svg" class="ei-svg">
      <!-- 回路面积（淡金填充，随棒移动变化）-->
      <rect
        :x="LEFT_X"
        :y="RAIL_TOP"
        :width="rodX - LEFT_X"
        :height="RAIL_BOTTOM - RAIL_TOP"
        fill="var(--c-accent)"
        opacity="0.1"
      />
      <!-- 匀强磁场：垂直纸面向里，铺满整个画面（导轨内外都有，体现"磁场遍布整个空间"） -->
      <FieldDots :x="30" :y="30" :cols="14" :rows="8" :spacing="42" dir="in" />
      <!-- 导轨与固定端（左侧）-->
      <g fill="none" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round">
        <path :d="`M ${LEFT_X} ${RAIL_TOP} H ${RIGHT_X}`" />
        <path :d="`M ${LEFT_X} ${RAIL_BOTTOM} H ${RIGHT_X}`" />
        <path :d="`M ${LEFT_X} ${RAIL_TOP} V 160`" />
        <path :d="`M ${LEFT_X} 200 V ${RAIL_BOTTOM}`" />
      </g>
      <!-- 金属棒 AB -->
      <line
        :x1="rodX"
        :y1="RAIL_TOP"
        :x2="rodX"
        :y2="RAIL_BOTTOM"
        stroke="var(--c-accent-2)"
        stroke-width="6"
        stroke-linecap="round"
      />
      <!-- 灵敏电流计：串在竖直导线上，导线止于上下两个接线柱（terminals="vertical"） -->
      <Galvanometer
        :x="LEFT_X"
        :y="180"
        :r="20"
        terminals="vertical"
        :angle="angle"
        fill="var(--c-bg-soft)"
      />
      <text
        :x="LEFT_X"
        y="228"
        text-anchor="middle"
        font-size="16"
        fill="var(--c-text-dim)"
        stroke="var(--c-bg)"
        stroke-width="3"
        paint-order="stroke"
      >
        灵敏电流计
      </text>
      <!-- 回路顶点 A B C D -->
      <text
        :x="rodX - 12"
        :y="RAIL_TOP - 8"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="var(--c-text)"
        stroke="var(--c-bg)"
        stroke-width="4"
        paint-order="stroke"
      >
        A
      </text>
      <text
        :x="rodX + 12"
        :y="RAIL_TOP - 8"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="var(--c-text)"
        stroke="var(--c-bg)"
        stroke-width="4"
        paint-order="stroke"
      >
        B
      </text>
      <text
        :x="LEFT_X - 14"
        :y="RAIL_TOP - 8"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="var(--c-text-dim)"
        stroke="var(--c-bg)"
        stroke-width="4"
        paint-order="stroke"
      >
        D
      </text>
      <text
        :x="LEFT_X - 14"
        :y="RAIL_BOTTOM + 24"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="var(--c-text-dim)"
        stroke="var(--c-bg)"
        stroke-width="4"
        paint-order="stroke"
      >
        C
      </text>
      <!-- 滑动方向（只在移动时出现）-->
      <CourseArrow
        v-if="moving"
        :from="{ x: rodX, y: 52 }"
        :to="{ x: rodX + moveDir * 52, y: 52 }"
        stroke="var(--c-accent-2)"
        :stroke-width="2.6"
      />
    </svg>
    <div class="ei-read">
      <span class="ei-item"
        >回路面积 <Latex tex="S" />：<strong>{{ changing }}</strong></span
      >
      <span class="ei-item"
        >磁通量 <Latex tex="\Phi = BS" />：<strong>{{ changing }}</strong></span
      >
      <span class="ei-item"
        >灵敏电流计：<strong>{{ meterText }}</strong></span
      >
    </div>
    <div class="ei-bar">
      <button type="button" class="ei-btn" :disabled="!canLeft" @click="slide(-1)">向左滑动</button>
      <button type="button" class="ei-btn" :disabled="!canRight" @click="slide(1)">向右滑动</button>
    </div>
  </div>
</template>
