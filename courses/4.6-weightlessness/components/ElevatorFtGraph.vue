<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";
import {
  DOWN_START,
  PHASE_ACCEL,
  PHASE_CONST,
  PHASE_DECEL,
  READING_BASE,
  READING_DOWN_MIN,
  READING_DOWN_PEAK,
  READING_UP_MIN,
  READING_UP_PEAK,
  TOTAL,
  TRIP,
  readingAtTimeline,
} from "../composables/elevatorReading";

/**
 * 电梯"上升一趟 + 下降一趟"过程中的示数–时间图（§4.6 第 7 页右侧）
 *
 * 数据与电梯模拟共用 `composables/elevatorReading.ts`（视频原读数，kg 口径）：
 * 静止 11.36 → 上升加速 12.58 → 匀速 11.36 → 上升减速 10.08 → 静止 → 下降加速 10.20 → 匀速 → 下降减速 12.54 → 静止。
 *
 * 跟随翻页分步：静止参考线常显 → 1 出上升曲线（高于参考线红、低于蓝）→ 2 出下降曲线。
 * 曲线比参考线高 = 示数大于重力（超重），低 = 示数小于重力（失重）；文字定义在页面左侧给出。
 *
 * 坐标轴、刻度、轴量标签交给共享 `CoordAxes`；色块、极值标注放在 `#overlay` 插槽里。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 2)));

const X_MAX = TOTAL + 0.2;
const Y_MIN = 9.6;
const Y_MAX = 13.3;
const VIEW_W = 470;
const VIEW_H = 330;

const OVER_FILL = "rgb(248 113 113 / 22%)";
const UNDER_FILL = "rgb(96 165 250 / 22%)";
const OVER_COLOR = "#f87171";
const UNDER_COLOR = "#60a5fa";

function sample(from: number, to: number, count: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i <= count; i++) {
    const t = from + ((to - from) * i) / count;
    points.push({ x: t, y: readingAtTimeline(t) });
  }

  return points;
}

const UP_POINTS = sample(0, TRIP, 220);
const DOWN_POINTS = sample(DOWN_START, TOTAL, 220);
const BASE_LINE = [
  { x: 0, y: READING_BASE },
  { x: X_MAX, y: READING_BASE },
];

interface CurveSpec {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  dashed?: boolean;
}

const curves = computed(() => {
  const list: CurveSpec[] = [
    { points: BASE_LINE, color: OVER_COLOR, width: 2, dashed: true },
  ];

  if (step.value >= 1) {
    list.push({ points: UP_POINTS, color: "var(--c-accent)", width: 3.4 });
  }

  if (step.value >= 2) {
    list.push({ points: DOWN_POINTS, color: "var(--c-accent)", width: 3.4 });
  }

  return list;
});

interface Region {
  from: number;
  to: number;
  fill: string;
}

/** 高于参考线（示数大于重力）填红、低于填蓝 */
const UP_REGIONS: Region[] = [
  { from: 0, to: PHASE_ACCEL, fill: OVER_FILL },
  { from: PHASE_ACCEL + PHASE_CONST, to: TRIP, fill: UNDER_FILL },
];

const DOWN_REGIONS: Region[] = [
  { from: DOWN_START, to: DOWN_START + PHASE_ACCEL, fill: UNDER_FILL },
  { from: DOWN_START + PHASE_ACCEL + PHASE_CONST, to: TOTAL, fill: OVER_FILL },
];

/** 曲线与静止参考线之间围出的色块 */
function buildFill(from: number, to: number, mapX: (v: number) => number, mapY: (v: number) => number): string {
  const SEGMENT_COUNT = 56;
  const pts: string[] = [`M ${mapX(from).toFixed(2)} ${mapY(READING_BASE).toFixed(2)}`];

  for (let i = 0; i <= SEGMENT_COUNT; i++) {
    const t = from + ((to - from) * i) / SEGMENT_COUNT;
    pts.push(`L ${mapX(t).toFixed(2)} ${mapY(readingAtTimeline(t)).toFixed(2)}`);
  }

  pts.push(`L ${mapX(to).toFixed(2)} ${mapY(READING_BASE).toFixed(2)} Z`);
  return pts.join(" ");
}

interface Extreme {
  t: number;
  value: number;
  color: string;
  above: boolean;
}

/** 加速段 / 减速段的中点：sin² 型加速度的峰（也就是示数最大值、最小值）正好落在这里 */
const ACCEL_MID = PHASE_ACCEL / 2;
const DECEL_MID = PHASE_ACCEL + PHASE_CONST + PHASE_DECEL / 2;

const UP_EXTREMES: Extreme[] = [
  { t: ACCEL_MID, value: READING_UP_PEAK, color: OVER_COLOR, above: true },
  { t: DECEL_MID, value: READING_UP_MIN, color: UNDER_COLOR, above: false },
];

const DOWN_EXTREMES: Extreme[] = [
  { t: DOWN_START + ACCEL_MID, value: READING_DOWN_MIN, color: UNDER_COLOR, above: false },
  { t: DOWN_START + DECEL_MID, value: READING_DOWN_PEAK, color: OVER_COLOR, above: true },
];

/** 两趟过程的标题位置（曲线所在区间的水平中点） */
const UP_TITLE_X = (PHASE_ACCEL + PHASE_CONST) / 2 + 0.1;
const DOWN_TITLE_X = DOWN_START + (PHASE_ACCEL + PHASE_CONST) / 2 + 0.1;
</script>

<template>
  <div class="efg">
    <CoordAxes
      :x-range="[0, X_MAX]"
      :y-range="[Y_MIN, Y_MAX]"
      :x-axis="{ quantity: 't', unit: 's' }"
      :y-axis="{ quantity: '示数' }"
      :ticks="{ x: [0, 4, 8, 12, 16, 20, 24], y: [10, 11, 12, 13] }"
      :view="{ width: VIEW_W, height: VIEW_H }"
      :curves="curves"
    >
      <template #overlay="{ x, y, px2user }">
        <!-- Step 1：静止时的示数参考线 -->
        <text
          :x="x(PHASE_ACCEL + PHASE_CONST / 2)"
          :y="y(READING_BASE) - 8 * px2user"
          text-anchor="middle"
          :font-size="13 * px2user"
          font-family="KaTeX_Main, ui-sans-serif, system-ui"
          font-weight="700"
          fill="var(--c-force)"
        >
          静止 11.36
        </text>

        <!-- Step 1：上升过程——高于参考线（超重）填红、低于（失重）填蓝，标出两个极值 -->
        <g v-if="step >= 1">
          <path
            v-for="(region, i) in UP_REGIONS"
            :key="`up-fill-${i}`"
            :d="buildFill(region.from, region.to, x, y)"
            :fill="region.fill"
          />
          <text
            :x="x(UP_TITLE_X)"
            :y="y(Y_MAX) + 18 * px2user"
            text-anchor="middle"
            :font-size="14 * px2user"
            font-weight="600"
            fill="var(--c-accent)"
            opacity="0.85"
          >
            上升
          </text>
          <g v-for="ext in UP_EXTREMES" :key="`up-ext-${ext.t}`">
            <circle :cx="x(ext.t)" :cy="y(ext.value)" :r="3.4 * px2user" :fill="ext.color" />
            <text
              :x="x(ext.t)"
              :y="ext.above ? y(ext.value) - 9 * px2user : y(ext.value) + 16 * px2user"
              text-anchor="middle"
              :font-size="14 * px2user"
              font-family="KaTeX_Main, ui-sans-serif, system-ui"
              font-weight="700"
              :fill="ext.color"
            >
              {{ ext.value.toFixed(2) }}
            </text>
          </g>
        </g>

        <!-- Step 2：下降过程 -->
        <g v-if="step >= 2">
          <path
            v-for="(region, i) in DOWN_REGIONS"
            :key="`down-fill-${i}`"
            :d="buildFill(region.from, region.to, x, y)"
            :fill="region.fill"
          />
          <text
            :x="x(DOWN_TITLE_X)"
            :y="y(Y_MAX) + 18 * px2user"
            text-anchor="middle"
            :font-size="14 * px2user"
            font-weight="600"
            fill="var(--c-accent)"
            opacity="0.85"
          >
            下降
          </text>
          <g v-for="ext in DOWN_EXTREMES" :key="`down-ext-${ext.t}`">
            <circle :cx="x(ext.t)" :cy="y(ext.value)" :r="3.4 * px2user" :fill="ext.color" />
            <text
              :x="x(ext.t)"
              :y="ext.above ? y(ext.value) - 9 * px2user : y(ext.value) + 16 * px2user"
              text-anchor="middle"
              :font-size="14 * px2user"
              font-family="KaTeX_Main, ui-sans-serif, system-ui"
              font-weight="700"
              :fill="ext.color"
            >
              {{ ext.value.toFixed(2) }}
            </text>
          </g>
        </g>
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.efg {
  width: 100%;
  min-width: 0;
}
</style>
