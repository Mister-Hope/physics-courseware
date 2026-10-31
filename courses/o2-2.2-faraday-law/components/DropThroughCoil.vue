<!--
  P3 模拟实验（教材“做一做”）：强磁体从玻璃管上端由静止下落，穿过线圈，电压传感器记录 U-t。
  - 下落高度 20/30/40/50 cm：同一块磁体、同一个线圈，穿过线圈的磁通量变化量相同，
    下落越高、穿过越快 → 峰值电压越大。
  - 可加“线圈匝数 ×2”“强磁体”，验证峰值与匝数、磁通量变化量成正比。
  - 曲线按“磁体到达线圈”对齐，便于比较峰值；纵轴、横轴不标数值（定性）。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

interface Run {
  h: number;
  color: string;
  points: { x: number; y: number }[];
}

const HEIGHTS = [20, 30, 40, 50];
const COLORS = ["var(--c-accent)", "var(--c-velocity)", "var(--c-physics)", "var(--c-danger)"];

/** 装置几何（viewBox 300 × 340） */
const TUBE_TOP = 16;
const TUBE_BOTTOM = 336;
const COIL_Y = 286;

/** 释放点：越高的 h 越靠上 */
const startY = (h: number): number => COIL_Y - 4.6 * h;

const nTurns = ref(1);
const strong = ref(false);
const runs = ref<Run[]>([]);
const activeH = ref(0);
const magnetY = ref(startY(20));
const phase = ref<"idle" | "fall" | "reveal">("idle");

/** 当前释放高度（未选时按 20 cm 画基准线） */
const releaseY = computed(() => startY(activeH.value || 20));

let raf = 0;
let fallStart = 0;
let revealStart = 0;
let fallDuration = 700;
let fromY = 0;
let pending: Run | null = null;

/** 相对撞击速度（以 20 cm 为 1） */
const vRel = (h: number): number => Math.sqrt(h / 20);

/** 峰值电压（任意单位，只用于比较） */
const peakOf = (h: number): number => 0.4 * vRel(h) * nTurns.value * (strong.value ? 1.3 : 1);

/** U-t 脉冲半宽：速度越快越窄 */
const sigmaOf = (h: number): number => 0.085 / vRel(h);

/** 磁体穿过线圈时 U(t) 的双极脉冲（dΦ/dt 的形状），峰值归一为 peakOf */
const buildRun = (h: number): Run => {
  const peak = peakOf(h);
  const sigma = sigmaOf(h);
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i <= 80; i++) {
    const x = i / 80;
    const d = x - 0.5;
    const y = (peak / 0.6065) * (d / sigma) * Math.exp(-(d * d) / (2 * sigma * sigma));

    points.push({ x, y });
  }

  return { h, color: COLORS[HEIGHTS.indexOf(h)] ?? COLORS[0], points };
};

/** 先放一条 20 cm 的基准曲线，页面上来就不是空坐标轴 */
runs.value = [buildRun(20)];

const curves = computed(() =>
  runs.value.map((run) => ({
    points: run.points,
    color: run.color,
    width: 3.4,
  })),
);

const legend = computed(() => runs.value.map((run) => ({ h: run.h, color: run.color })));

const busy = computed(() => phase.value !== "idle");

const tick = (now: number): void => {
  raf = 0;

  if (phase.value === "fall" && pending) {
    const p = Math.min(1, (now - fallStart) / fallDuration);
    magnetY.value = fromY + (COIL_Y + 40 - fromY) * p * p;

    if (p >= 1) {
      phase.value = "reveal";
      revealStart = now;
    }
  } else if (phase.value === "reveal" && pending) {
    const p = Math.min(1, (now - revealStart) / 460);
    const shown: Run = {
      ...pending,
      points: pending.points.filter((point) => point.x <= p),
    };

    runs.value = [...runs.value.filter((run) => run.h !== shown.h), shown];

    if (p >= 1) {
      phase.value = "idle";
      pending = null;
      activeH.value = 0;
    }
  }

  if (phase.value !== "idle") raf = requestAnimationFrame(tick);
};

const drop = (h: number): void => {
  if (busy.value) return;

  activeH.value = h;
  pending = buildRun(h);
  fromY = startY(h);
  magnetY.value = fromY;
  fallStart = performance.now();
  fallDuration = 520 * Math.sqrt(h / 20);
  phase.value = "fall";
  raf = requestAnimationFrame(tick);
};

const reset = (): void => {
  if (busy.value) return;

  runs.value = [buildRun(20)];
  activeH.value = 0;
  magnetY.value = startY(20);
};

const toggleTurns = (): void => {
  if (busy.value) return;

  nTurns.value = nTurns.value === 1 ? 2 : 1;
  reset();
};

const toggleStrong = (): void => {
  if (busy.value) return;

  strong.value = !strong.value;
  reset();
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});
</script>

<template>
  <div class="fl-panel">
    <div class="fl-drop">
      <!-- 左：玻璃管 + 线圈 + 电压传感器 -->
      <div class="fl-drop-fig">
        <svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg">
          <!-- 玻璃管 -->
          <rect
            x="120"
            :y="TUBE_TOP"
            width="60"
            :height="TUBE_BOTTOM - TUBE_TOP"
            rx="8"
            fill="color-mix(in srgb, var(--c-text) 5%, transparent)"
            stroke="var(--c-line)"
            stroke-width="1.6"
          />

          <!-- 释放高度 h -->
          <g stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="5 5">
            <line x1="96" :y1="releaseY" x2="204" :y2="releaseY" />
            <line x1="88" :y1="releaseY" x2="88" :y2="COIL_Y" />
            <line x1="83" :y1="releaseY" x2="93" :y2="releaseY" />
            <line x1="83" :y1="COIL_Y" x2="93" :y2="COIL_Y" />
          </g>
          <text
            x="78"
            :y="(releaseY + COIL_Y) / 2 + 5"
            text-anchor="end"
            font-family="KaTeX_Math, serif"
            font-style="italic"
            font-size="15"
            fill="var(--c-text-dim)"
          >
            h
          </text>

          <!-- 线圈：3 匝，轴竖直（共享 Solenoid，连续螺旋线）；两端落在右侧 (204, COIL_Y ∓ 21) -->
          <Solenoid
            :x="150"
            :y="COIL_Y"
            :length="42"
            :radius="54"
            :turns="3"
            orientation="vertical"
            direction="cw"
            :phase="0"
            :line-width="3"
            :back-opacity="0.35"
          />

          <!-- 线圈两端接电压传感器（两根引线，分别从上下端子接进盒子左侧） -->
          <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
            <path :d="`M 204 ${COIL_Y - 21} H 212 V 278 H 224`" />
            <path :d="`M 204 ${COIL_Y + 21} H 212 V 294 H 224`" />
          </g>
          <rect
            x="224"
            y="270"
            width="62"
            height="32"
            rx="6"
            fill="var(--c-surface)"
            stroke="var(--c-border)"
            stroke-width="1.4"
          />
          <text x="255" y="290" text-anchor="middle" font-size="10" fill="var(--c-text-dim)">
            电压传感器
          </text>

          <!-- 磁体（S 上、N 下；共享 BarMagnet） -->
          <BarMagnet
            :x="150"
            :y="magnetY"
            :length="38"
            :width="32"
            n-side="bottom"
            :label-size="12"
          />

          <!-- 下落方向 -->
          <CourseArrow
            :from="{ x: 196, y: magnetY - 30 }"
            :to="{ x: 196, y: magnetY + 6 }"
            stroke="var(--c-velocity)"
            :stroke-width="2.2"
          />
          <text
            x="206"
            :y="magnetY - 8"
            font-family="KaTeX_Math, serif"
            font-style="italic"
            font-size="16"
            fill="var(--c-velocity)"
          >
            v
          </text>
        </svg>
      </div>

      <!-- 右：U-t 曲线 -->
      <div class="fl-drop-chart">
        <CoordAxes
          :x-range="[0, 1]"
          :y-range="[-1.8, 1.8]"
          :x-axis="{ quantity: 't', unit: 's' }"
          :y-axis="{ quantity: 'U', unit: 'V' }"
          :curves="curves"
          :ticks="{ x: [], y: [] }"
          :view="{ width: 600, height: 240 }"
        />
        <div class="fl-legend">
          <span v-for="item in legend" :key="item.h">
            <i :style="{ background: item.color }" />{{ item.h }} cm
          </span>
        </div>
      </div>
    </div>

    <!-- 控制条 -->
    <div class="fl-bar">
      <span class="fl-pill">下落高度</span>
      <button
        v-for="h in HEIGHTS"
        :key="h"
        type="button"
        class="fl-btn"
        :class="{ on: activeH === h }"
        :disabled="busy"
        @click="drop(h)"
      >
        {{ h }} cm
      </button>
      <span class="fl-sep" />
      <button
        type="button"
        class="fl-btn"
        :class="{ on: nTurns === 2 }"
        :disabled="busy"
        @click="toggleTurns"
      >
        线圈匝数 ×2
      </button>
      <button
        type="button"
        class="fl-btn"
        :class="{ on: strong }"
        :disabled="busy"
        @click="toggleStrong"
      >
        强磁体
      </button>
      <button type="button" class="fl-btn" :disabled="busy || runs.length === 0" @click="reset">
        重来
      </button>
    </div>
  </div>
</template>
