<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

import { SQUAT_CURVE, SQUAT_CURVE_STEP } from "../composables/squatCurve";

/**
 * 体重计示数 F 随时间 t 的变化（§4.6 第 9 页）
 *
 * 曲线不是拟合出来的：人教社《物理 必修 第一册》P110 图 4.6-5「下蹲、站起两个过程」 在 PDF 里是一条矢量路径，转成 SVG 后展开成 1028 个点，再按图上网格标定坐标换算成
 * (t, F)，见 `composables/squatCurve.ts`。所以曲线保留了真实测量的特征（蹲下去时示数 先掉下去、蹬地时冲高并带一个肩部），但静止段的余振被拉平（电子秤不会有）。
 *
 * 分段（加速 / 减速的边界、极值点）全部由**数据本身**算出来： 加速度 a = 0 ⟺ 示数 F 穿过 mg，所以「加速段」与「减速段」的分界就是曲线过 mg 的时刻；
 * 虚线、圆点、判读文字都挂在这些真实时刻上，不会和峰值错位。
 *
 * - `mode="squat"`：只下蹲；`mode="rise"`：只站起；`mode="both"`：先下蹲、再站起。
 * - 跟随翻页分步（4 次点击，只新增、不删已有元素）： 0 实测曲线 → 1 mg 水平参考虚线 → 2 分段竖直虚线 → 3 波瓣着色与失重/超重判读 → 4 底部阶段名与加速度方向。
 */
const { mode = "squat", stepOffset = 0 } = defineProps<{
  mode?: "squat" | "rise" | "both";
  /** 页面在前几次点击里显示别的内容时，用它在外面统一扣掉 */
  stepOffset?: number;
}>();

const { $clicks } = useSlideContext();

/** 页面共 4 次点击（0~4），多按不越界 */
const step = computed(() => Math.max(0, Math.min($clicks.value - stepOffset, 4)));

/** M = 60 kg、g = 10 m/s² 时的重力，作为参考线（教材图是 500 N，本课统一按 600 N 等比放大） */
const MG = 600;

const X_MAX = computed(() => (mode === "both" ? 8 : mode === "squat" ? 3.4 : 2.4));
const VIEW_W = 660;
const VIEW_H = 400;

/** 某一时刻示数相对 mg 的比值（对采样数据做线性插值） */
const ratioAt = (t: number): number => {
  const pos = Math.min(Math.max(t / SQUAT_CURVE_STEP, 0), SQUAT_CURVE.length - 1);
  const i = Math.floor(pos);
  const next = Math.min(i + 1, SQUAT_CURVE.length - 1);
  const a = SQUAT_CURVE[i] ?? 1;
  const b = SQUAT_CURVE[next] ?? a;

  return a + (b - a) * (pos - i);
};

/** 某一时刻秤的示数（N） */
const modelAt = (t: number): number => MG * ratioAt(t);

/** 扫描步长（找动作区间、极值、过零点都用它） */
const SCAN = 0.01;
/** 判定「动作中」的阈值：偏离 mg 超过 2% */
const MOVE_EPS = 0.02;
/** 两段动作之间允许的短暂回零间隙（s） */
const MERGE_GAP = 0.14;
/** 动作段最短时长（s），太短的是噪声 */
const MIN_SPAN = 0.4;

/** 动作区间：|F − mg| > 2% 的连续时间段，全部由数据识别（不写死时刻） */
const ranges = computed<readonly (readonly [number, number])[]>(() => {
  const total = X_MAX.value;
  const flags: boolean[] = [];

  for (let t = 0; t <= total + 1e-9; t += SCAN) flags.push(Math.abs(ratioAt(t) - 1) > MOVE_EPS);

  const spans: [number, number][] = [];
  let start = -1;
  let quiet = 0;

  flags.forEach((active, index) => {
    const t = index * SCAN;

    if (active) {
      if (start < 0) start = t;
      quiet = 0;
      return;
    }

    if (start >= 0) {
      quiet += SCAN;
      if (quiet > MERGE_GAP) {
        spans.push([start, t - quiet]);
        start = -1;
        quiet = 0;
      }
    }
  });
  if (start >= 0) spans.push([start, flags.length * SCAN - quiet]);

  return spans.filter(([a, b]) => b - a >= MIN_SPAN);
});

/** 在 [a, b] 内找曲线穿过 F = mg 的时刻（线性插值，升序） */
const crossingsOf = (a: number, b: number): number[] => {
  const list: number[] = [];
  let previous = ratioAt(a) - 1;

  for (let t = a + SCAN / 2; t <= b; t += SCAN / 2) {
    const current = ratioAt(t) - 1;
    if (previous === 0 || previous * current < 0) {
      const k = Math.abs(previous) / (Math.abs(previous) + Math.abs(current) || 1);
      list.push(t - SCAN / 2 + k * (SCAN / 2));
    }
    previous = current;
  }

  return list;
};

/** 在 [a, b] 内偏离 mg 最远的采样点 */
const extremeIn = (a: number, b: number): { t: number; f: number } => {
  let bestT = a;
  let bestF = modelAt(a);

  for (let t = a; t <= b + 1e-9; t += SCAN / 2) {
    const f = modelAt(t);
    if (Math.abs(f - MG) > Math.abs(bestF - MG)) {
      bestT = t;
      bestF = f;
    }
  }

  return { t: bestT, f: Math.round(bestF) };
};

interface Phase {
  readonly mid: number;
  readonly tRange: readonly [number, number];
  readonly label: string;
  /** 极值点：时刻与示数（N），用于圆点、偏离虚线与判读文字 */
  readonly peakT?: number;
  readonly peakY?: number;
  readonly flag?: string;
  readonly flagY?: number;
  readonly flagDx?: number;
  readonly accel?: "up" | "down";
  /** 同一对阶段名向两侧让开的偏移（屏幕 px）：-1 左移、1 右移、0 不动 */
  readonly pairSide?: -1 | 0 | 1;
  readonly color?: string;
  readonly fillColor?: string;
}

const DOWN_FILL = "rgba(96, 165, 250, 0.16)";
const UP_FILL = "rgba(248, 113, 113, 0.16)";
const DOWN_COLOR = "#60a5fa";
const UP_COLOR = "#f87171";

const phases = computed<readonly Phase[]>(() => {
  const total = X_MAX.value;
  const list: Phase[] = [];

  const pushRest = (from: number, to: number): void => {
    if (to - from > 0.05) {
      list.push({
        mid: (from + to) / 2,
        tRange: [from, to],
        label: to - from >= 0.8 ? "静止" : "",
      });
    }
  };

  ranges.value.forEach(([a, b], index) => {
    if (index === 0) pushRest(0, a);
    else pushRest(ranges.value[index - 1]?.[1] ?? 0, a);

    // 第一段是下蹲（下降过程），第二段是站起（上升过程）
    const descending = mode === "rise" ? false : index === 0;
    const dir = descending ? "下降" : "上升";

    // 加速段与减速段的分界 = 曲线穿过 mg 的时刻（离段中点最近的那个）
    const crossings = crossingsOf(a, b);
    const middle = crossings.length
      ? crossings.reduce((best, c) =>
          Math.abs(c - (a + b) / 2) < Math.abs(best - (a + b) / 2) ? c : best,
        )
      : (a + b) / 2;

    (
      [
        [a, middle, -1],
        [middle, b, 1],
      ] as const
    ).forEach(([t0, t1, side]) => {
      const { t: peakT, f: peakY } = extremeIn(t0, t1);
      const isUnder = peakY < MG;

      list.push({
        mid: (t0 + t1) / 2,
        tRange: [t0, t1],
        // 下降时"加速"对应失重；上升时"加速"对应超重
        label: `${isUnder === descending ? "加速" : "减速"}${dir}`,
        peakT,
        peakY,
        flag: isUnder ? "失重" : "超重",
        flagY: isUnder ? peakY - 54 : peakY + 46,
        ...(isUnder && !descending ? { flagDx: 26 } : {}),
        color: isUnder ? DOWN_COLOR : UP_COLOR,
        fillColor: isUnder ? DOWN_FILL : UP_FILL,
        accel: isUnder ? "down" : "up",
        pairSide: side,
      });
    });
  });

  const last = ranges.value[ranges.value.length - 1];
  pushRest(last ? last[1] : 0, total);

  return list;
});

/** 分段虚线：每段动作的起点、加速/减速分界、终点 */
const separators = computed(() => {
  const times = new Set<number>();

  for (const phase of phases.value) {
    if (phase.fillColor) {
      times.add(Number(phase.tRange[0].toFixed(3)));
      times.add(Number(phase.tRange[1].toFixed(3)));
    }
  }

  return [...times].sort((p, q) => p - q);
});

/** 只有运动段才有"曲线与 mg 之间"的波瓣 */
const lobes = computed(() => phases.value.filter((phase) => Boolean(phase.fillColor)));

/** 直接画实测数据（采样点足够密，折线看不出拐角） */
const curveAt = (t: number): number => modelAt(t);

/** 生成区间 [tStart, tEnd] 上曲线 F(t) 与水平线 F = MG 围成的闭合填充路径 */
const buildLobePath = (
  tStart: number,
  tEnd: number,
  mapX: (v: number) => number,
  mapY: (v: number) => number,
): string => {
  const SEGMENT_COUNT = 64;
  const pts: string[] = [`M ${mapX(tStart).toFixed(2)} ${mapY(MG).toFixed(2)}`];

  for (let i = 1; i <= SEGMENT_COUNT; i++) {
    const t = tStart + ((tEnd - tStart) * i) / SEGMENT_COUNT;
    pts.push(`L ${mapX(t).toFixed(2)} ${mapY(modelAt(t)).toFixed(2)}`);
  }

  pts.push(`L ${mapX(tEnd).toFixed(2)} ${mapY(MG).toFixed(2)} Z`);
  return pts.join(" ");
};

/** 实测曲线常显；mg 参考虚线用 `showAt` 占位（隐藏时不删元素、不引起布局跳动） */
const curves = computed(() => [
  {
    formula: curveAt,
    samples: mode === "both" ? 400 : 300,
    color: "var(--c-accent-2)",
    width: 3.5,
  },
  {
    points: [
      { x: 0, y: MG },
      { x: X_MAX.value, y: MG },
    ],
    color: "var(--c-force)",
    width: 2,
    dashed: true,
    showAt: 1,
  },
]);

/** 底部阶段名字号（用户单位 ≈ 屏幕 px） */
const STAGE_FONT = 19;
/** 阶段名之上 "a" 的字号 */
const ACCEL_FONT = 23;
/** "a" 与箭头之间的横向间隔 */
const ACCEL_DX = 15;
/** 阶段名基线到 "a"/箭头基线的高度 */
const ACCEL_LIFT = 30;
/** 箭头总高与头部高度（用户单位） */
const ARROW_LEN = 22;
const ARROW_HEAD = 8;
const ARROW_HALF = 5.5;

interface StageItem {
  readonly key: string;
  readonly lines: readonly string[];
  readonly centerX: number;
  readonly bottomY: number;
  readonly accel?: "up" | "down";
  readonly color?: string;
  /** "a" 文字的落点 */
  readonly letterX?: number;
  readonly letterY?: number;
  /** 箭头：轴线起止 + 头部三角形 */
  readonly arrowX?: number;
  readonly arrowTailY?: number;
  readonly arrowTipY?: number;
  readonly arrowHeadY?: number;
}

const stageItems = (
  x: (value: number) => number,
  plot: { top: number; bottom: number; left: number; right: number },
  px2user: number,
): StageItem[] =>
  phases.value.map((phase) => {
    const bottomY = plot.bottom - 11 * px2user;
    const baseY = bottomY - ACCEL_LIFT * px2user;
    const arrowX = x(phase.mid) + ACCEL_DX * px2user;
    const up = phase.accel === "up";
    const tipY = up ? baseY - ARROW_LEN * px2user : baseY;
    const tailY = up ? baseY : baseY - ARROW_LEN * px2user;

    return {
      key: `stage-${phase.mid}`,
      lines: [phase.label],
      centerX: x(phase.mid) + (phase.pairSide ?? 0) * 9 * px2user,
      bottomY,
      accel: phase.accel,
      color: phase.color,
      letterX: x(phase.mid) - ACCEL_DX * 0.55 * px2user,
      letterY: up ? baseY + 4 * px2user : baseY - 6 * px2user,
      arrowX,
      arrowTailY: tailY,
      arrowTipY: tipY,
      arrowHeadY: up ? tipY + ARROW_HEAD * px2user : tipY - ARROW_HEAD * px2user,
    };
  });
</script>

<template>
  <div class="sq-graph-wrap">
    <CoordAxes
      :x-range="[0, X_MAX]"
      :y-range="[0, 900]"
      :x-axis="{ quantity: 't', unit: 's' }"
      :y-axis="{ quantity: 'F', unit: 'N' }"
      :ticks="{ labels: false }"
      :view="{ width: VIEW_W, height: VIEW_H }"
      :curves="curves"
      :step="step"
    >
      <template #overlay="{ x, y, plot, px2user }">
        <!-- Step 3：曲线与 mg 之间围成的失重（蓝）/超重（红）面积波瓣（画在分隔线之下） -->
        <g v-if="step >= 3">
          <path
            v-for="phase in lobes"
            :key="`lobe-${phase.mid}`"
            :d="buildLobePath(phase.tRange[0], phase.tRange[1], x, y)"
            :fill="phase.fillColor"
          />
        </g>
        <!-- Step 2：各运动阶段的分界竖直虚线 -->
        <g v-if="step >= 2">
          <line
            v-for="t0 in separators"
            :key="`sep-${t0}`"
            :x1="x(t0)"
            :y1="plot.top"
            :x2="x(t0)"
            :y2="plot.bottom"
            stroke="color-mix(in srgb, var(--c-text-dim) 38%, transparent)"
            :stroke-width="1.4 * px2user"
            stroke-dasharray="7 6"
          />
        </g>
        <!-- Step 1：mg 水平参考虚线的标注 -->
        <g v-if="step >= 1">
          <text
            :x="x(0.06)"
            :y="y(MG) - 11 * px2user"
            font-family="KaTeX_Math"
            font-style="italic"
            :font-size="17 * px2user"
            fill="var(--c-force)"
            stroke="var(--c-bg-soft)"
            :stroke-width="3 * px2user"
            paint-order="stroke"
          >
            mg
          </text>
        </g>
        <!-- Step 3：极值点圆点、偏离虚线，以及失重 / 超重判读 -->
        <g v-if="step >= 3">
          <template v-for="phase in phases" :key="`mark-${phase.mid}`">
            <g v-if="phase.peakT !== undefined && phase.peakY !== undefined && phase.color">
              <line
                :x1="x(phase.peakT)"
                :y1="y(MG)"
                :x2="x(phase.peakT)"
                :y2="y(phase.peakY)"
                :stroke="phase.color"
                :stroke-width="1.6 * px2user"
                stroke-dasharray="3 3"
                opacity="0.8"
              />
              <circle
                :cx="x(phase.peakT)"
                :cy="y(phase.peakY)"
                :r="4.6 * px2user"
                :fill="phase.color"
                stroke="var(--c-bg-soft)"
                :stroke-width="1.8 * px2user"
              />
              <text
                v-if="phase.flag && phase.flagY !== undefined"
                :x="x(phase.peakT) + (phase.flagDx ?? 0) * px2user"
                :y="y(phase.flagY)"
                text-anchor="middle"
                :font-size="16 * px2user"
                font-weight="600"
                :fill="phase.color"
                stroke="var(--c-bg-soft)"
                :stroke-width="3.2 * px2user"
                paint-order="stroke"
              >
                {{ phase.flag }}
              </text>
            </g>
          </template>
        </g>
        <!-- Step 4：底部阶段名 + 该段的加速度方向（"a" 与上下箭头放在文字上方） -->
        <g v-if="step >= 4">
          <template v-for="item in stageItems(x, plot, px2user)" :key="item.key">
            <text
              :x="item.centerX"
              :y="item.bottomY"
              text-anchor="middle"
              :font-size="STAGE_FONT * px2user"
              font-weight="500"
              fill="var(--c-neutral-300)"
            >
              {{ item.lines[0] }}
            </text>
            <g v-if="item.accel && item.arrowX !== undefined">
              <text
                :x="item.letterX"
                :y="item.letterY"
                text-anchor="middle"
                font-family="KaTeX_Math"
                font-style="italic"
                :font-size="ACCEL_FONT * px2user"
                :fill="item.color"
                stroke="var(--c-bg-soft)"
                :stroke-width="2.8 * px2user"
                paint-order="stroke"
              >
                a
              </text>
              <line
                :x1="item.arrowX"
                :y1="item.arrowTailY"
                :x2="item.arrowX"
                :y2="item.arrowHeadY"
                :stroke="item.color"
                :stroke-width="2.4 * px2user"
                stroke-linecap="round"
              />
              <path
                :d="`M ${item.arrowX - ARROW_HALF * px2user} ${item.arrowHeadY} L ${item.arrowX} ${item.arrowTipY} L ${item.arrowX + ARROW_HALF * px2user} ${item.arrowHeadY} Z`"
                :fill="item.color"
                stroke="none"
              />
            </g>
          </template>
        </g>
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.sq-graph-wrap {
  width: 100%;
  min-width: 0;
  max-width: 660px;
  margin: 0 auto;
}
</style>
