<script setup lang="ts">
import { computed } from "vue";

import {
  DOWN_START,
  PHASE_ACCEL,
  PHASE_CONST,
  PHASE_DECEL,
  TOTAL,
  TRIP,
  accelNormAt,
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

/** 单程速度（0 → v_max → 0）：对平滑加速度积分，起停自然带圆角，不是硬折线 */
const upSamples = ((): { t: number; v: number }[] => {
  const samples: { t: number; v: number }[] = [{ t: 0, v: 0 }];
  let v = 0;
  for (let t = DT; t <= TRIP + 1e-9; t += DT) {
    v += accelNormAt(t - DT / 2) * DT;
    samples.push({ t: Math.min(TRIP, t), v });
  }
  const peak = Math.max(...samples.map((sample) => sample.v)) || 1;
  return samples.map((sample) => ({ t: sample.t, v: sample.v / peak }));
})();

/** 一条连续的 v–t 折线：上升 → 静止（沿横轴）→ 下降，中间不留断口 */
const VT_POINTS = [
  ...upSamples.map((sample) => ({ x: sample.t, y: sample.v })),
  { x: TRIP, y: 0 },
  { x: DOWN_START, y: 0 },
  ...upSamples.slice(1).map((sample) => ({ x: DOWN_START + sample.t, y: -sample.v })),
];

const curves = computed(() => [{ points: VT_POINTS, color: "var(--c-accent)", width: 3 }]);

/** 三段交界（虚线位置） */
const UP_EDGES = [PHASE_ACCEL, PHASE_ACCEL + PHASE_CONST, TRIP];
const DOWN_EDGES = [
  DOWN_START + PHASE_ACCEL,
  DOWN_START + PHASE_ACCEL + PHASE_CONST,
  DOWN_START + TRIP,
];

/** 三段中心（标注文字位置） */
const UP_LABELS = [
  { t: PHASE_ACCEL / 2, text: "加速" },
  { t: PHASE_ACCEL + PHASE_CONST / 2, text: "匀速" },
  { t: PHASE_ACCEL + PHASE_CONST + PHASE_DECEL / 2, text: "减速" },
];
const DOWN_LABELS = UP_LABELS.map((label) => ({ t: DOWN_START + label.t, text: label.text }));

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
