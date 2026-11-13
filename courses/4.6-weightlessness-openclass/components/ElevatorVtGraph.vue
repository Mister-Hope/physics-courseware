<script setup lang="ts">
import { computed } from "vue";

import {
  DOWN_START,
  PHASE_ACCEL,
  PHASE_CONST,
  PHASE_DECEL,
  TOTAL,
  TRIP,
} from "../composables/elevatorReading";

/**
 * 第 8 页（电梯的运动）：电梯上升、下降全过程的 v–t 图像
 *
 * - 上升：0 → 加速（v 从 0 升到 v_max）→ 匀速（水平段）→ 减速（回到 0）；下降镜像到横轴下方
 * - 虚线按「加速 / 匀速 / 减速」三段的交界切开，并在每段上方（上升）/下方（下降）标注段名
 * - 只画形态、不标速度刻度：纵轴只有 v 的符号，不写数值（定性页）
 */
const X_MAX = TOTAL + 0.3;
const Y_LIMIT = 1.3;
const DT = 0.02;

/**
 * V–t 图上「变加速」段的长度（占单个阶段的比例）
 *
 * 加速度是渐变的（突变会让人猛一沉），积分出来的 v 在起停处就是一段圆弧。 这里把圆弧画得比 F–t 更长一点（0.45 而非 0.25），让「加速度在变」这件事在投影上看得见。
 */
const VT_RAMP = 0.45;

/** 圆角梯形：两端各 VT_RAMP 平滑升/降，中间保持 1（返回 0~1 的加速度系数） */
const shape = (u: number): number => {
  if (u <= 0 || u >= 1) return 0;
  if (u < VT_RAMP) return 0.5 - 0.5 * Math.cos((Math.PI * u) / VT_RAMP);
  if (u > 1 - VT_RAMP) return 0.5 - 0.5 * Math.cos((Math.PI * (1 - u)) / VT_RAMP);
  return 1;
};

/** 上升全程的加速度（向上为正）：加速段 +、匀速段 0、减速段 − */
const vtAccelAt = (t: number): number => {
  if (t < 0 || t >= TRIP) return 0;
  if (t < PHASE_ACCEL) return shape(t / PHASE_ACCEL);
  if (t < PHASE_ACCEL + PHASE_CONST) return 0;
  return -shape((t - PHASE_ACCEL - PHASE_CONST) / PHASE_DECEL);
};

/** 单程速度（0 → v_max → 0）：对平滑加速度积分，起停自然带圆角，不是硬折线 */
const upSamples = ((): { t: number; v: number }[] => {
  const samples: { t: number; v: number }[] = [{ t: 0, v: 0 }];
  let v = 0;
  for (let t = DT; t <= TRIP + 1e-9; t += DT) {
    v += vtAccelAt(t - DT / 2) * DT;
    samples.push({ t: Math.min(TRIP, t), v });
  }
  const peak = Math.max(...samples.map((sample) => sample.v)) || 1;
  return samples.map((sample) => ({ t: sample.t, v: sample.v / peak }));
})();

/** 上升、下降各画一条（中间停顿时不连线，留出真实的"停一下"） */
const UP_POINTS = upSamples.map((sample) => ({ x: sample.t, y: sample.v }));
const DOWN_POINTS = upSamples
  .slice(1)
  .map((sample) => ({ x: DOWN_START + sample.t, y: -sample.v }));

const curves = computed(() => [
  { points: UP_POINTS, color: "var(--c-accent)", width: 3 },
  { points: DOWN_POINTS, color: "var(--c-accent)", width: 3 },
]);

/** 速度进入平台（|v| ≥ 98% v_max）的起止时刻：虚线与段名都挂在这两个真实时刻上 */
const FLAT = 0.98;
const flatStart = upSamples.find((sample) => sample.v >= FLAT)?.t ?? PHASE_ACCEL;
let flatEnd = flatStart;

for (const sample of upSamples) if (sample.v >= FLAT) flatEnd = sample.t;

/** 三段交界（虚线位置）：加速段结束、减速段开始 */
const UP_EDGES = [flatStart, flatEnd];
const DOWN_EDGES = [DOWN_START + flatStart, DOWN_START + flatEnd];

/** 三段中心（标注文字位置）：各自落在自己那一段的正中 */
const UP_LABELS = [
  { t: flatStart / 2, text: "加速" },
  { t: (flatStart + flatEnd) / 2, text: "匀速" },
  { t: (flatEnd + TRIP) / 2, text: "减速" },
];
const DOWN_LABELS = UP_LABELS.map((label) => ({ t: DOWN_START + label.t, text: label.text }));

/** 两次运行之间的停顿（v = 0） */
const REST_T = (TRIP + DOWN_START) / 2;

const VIEW = { width: 470, height: 260 };
</script>

<template>
  <div class="vt-graph">
    <CoordAxes
      :x-range="[0, X_MAX]"
      :y-range="[-Y_LIMIT, Y_LIMIT]"
      :x-axis="{ quantity: 't', unit: 's' }"
      :y-axis="{ quantity: 'v' }"
      :ticks="{ x: [0, 4, 8, 12, 16, 20, 24], y: [] }"
      :curves="curves"
      :view="VIEW"
    >
      <template #overlay="{ x, y, plot, px2user }">
        <g>
          <line
            v-for="edge in [...UP_EDGES, ...DOWN_EDGES]"
            :key="`vt-edge-${edge}`"
            :x1="x(edge)"
            :y1="plot.top"
            :x2="x(edge)"
            :y2="plot.bottom"
            :stroke="'color-mix(in srgb, var(--c-text-dim) 42%, transparent)'"
            :stroke-width="1.3 * px2user"
            stroke-dasharray="7 6"
          />
          <text
            v-for="label in UP_LABELS"
            :key="`vt-up-${label.text}`"
            :x="x(label.t)"
            :y="y(-0.55)"
            text-anchor="middle"
            font-family="KaTeX_Main, system-ui, sans-serif"
            :font-size="15 * px2user"
            :fill="'var(--c-text-dim)'"
            >{{ label.text }}</text
          >
          <text
            :x="x(REST_T)"
            :y="y(0.26)"
            text-anchor="middle"
            font-family="KaTeX_Main, system-ui, sans-serif"
            :font-size="13 * px2user"
            fill="var(--c-text-dim)"
            >静止</text
          >
          <text
            v-for="label in DOWN_LABELS"
            :key="`vt-down-${label.text}`"
            :x="x(label.t)"
            :y="y(0.55)"
            text-anchor="middle"
            font-family="KaTeX_Main, system-ui, sans-serif"
            :font-size="15 * px2user"
            :fill="'var(--c-text-dim)'"
            >{{ label.text }}</text
          >
        </g>
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.vt-graph {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
}
</style>
