<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 力传感器记录的示数 F 随时间 t 的变化（§4.6 第 9 页）
 *
 * 真实的下蹲、站起不是理想的正余弦，而是一个"卸力—加速—急停/蹬地"的过程：
 *
 * - 静止时示数本来就是平的；只有起蹲前、蹲住不动、站定后那一小段，重心晃会让示数微微跳动；
 * - 下蹲：先卸力（示数掉到 mg 以下），蹲到最低点时急停（示数突然顶上去再回落）；
 * - 站起：先蹬地（示数猛地跳到最大），随后加速上升、再减速上升（示数掉到 mg 以下）再回落。
 * - `mode="squat"`：只下蹲；`mode="rise"`：只站起；`mode="both"`：先下蹲、再站起（0~4.8 s）。
 * - 跟随翻页分步（共 4 次点击，只新增、不删已有元素）：
 *   0 实测曲线 → 1 mg 水平参考虚线 → 2 六条分段竖直虚线
 *   → 3 波瓣着色与失重/超重判读 → 4 底部阶段名与加速度方向。
 *
 * 坐标轴、刻度、轴量标签交给共享 `CoordAxes`；分段线、面积着色、文字判读放在 `#overlay` 插槽里。
 */
const { mode = "squat" } = defineProps<{ mode?: "squat" | "rise" | "both" }>();

const { $clicks } = useSlideContext();

/** 页面共 4 次点击（0~4），多按不越界 */
const step = computed(() => Math.max(0, Math.min($clicks.value, 4)));

/** M = 60 kg、g = 10 m/s² 时的重力，作为参考线 */
const MG = 600;

const X_MAX = computed(() => (mode === "both" ? 4.8 : 3.4));
const VIEW_W = 660;
const VIEW_H = 400;

/** 示数曲线的一帧：[时刻, 示数]（N） */
interface Keyframe {
  readonly t: number;
  readonly f: number;
}

/** 冲击尖峰（急停、蹬地）：窄脉冲，对应真实数据里突然跳变的那一两帧 */
interface Spike {
  readonly t: number;
  readonly amp: number;
  readonly halfWidth: number;
}

/** 关键帧：段内用 smoothstep 过渡，两端平缓、中段更快 */
const KEYFRAMES: Record<"squat" | "rise" | "both", readonly Keyframe[]> = {
  both: [
    { t: 0, f: MG },
    { t: 0.3, f: MG },
    { t: 0.4, f: MG },
    { t: 0.47, f: 505 },
    { t: 0.62, f: 484 },
    { t: 0.82, f: 481 },
    { t: 1.02, f: 506 },
    { t: 1.13, f: 553 },
    { t: 1.2, f: MG },
    { t: 1.3, f: 668 },
    { t: 1.45, f: 708 },
    { t: 1.57, f: 728 },
    { t: 1.63, f: 731 },
    { t: 1.7, f: 690 },
    { t: 1.78, f: 634 },
    { t: 1.86, f: 609 },
    { t: 1.95, f: MG },
    { t: 2.2, f: MG },
    { t: 2.55, f: MG },
    { t: 2.6, f: MG },
    { t: 2.68, f: 742 },
    { t: 2.8, f: 714 },
    { t: 2.95, f: 699 },
    { t: 3.1, f: 694 },
    { t: 3.28, f: 701 },
    { t: 3.4, f: 688 },
    { t: 3.48, f: 635 },
    { t: 3.58, f: 573 },
    { t: 3.7, f: 537 },
    { t: 3.85, f: 518 },
    { t: 4, f: 523 },
    { t: 4.1, f: 562 },
    { t: 4.2, f: MG },
    { t: 4.28, f: 612 },
    { t: 4.38, f: 601 },
    { t: 4.45, f: MG },
    { t: 4.8, f: MG },
  ],
  squat: [
    { t: 0, f: MG },
    { t: 0.3, f: MG },
    { t: 0.4, f: MG },
    { t: 0.47, f: 505 },
    { t: 0.62, f: 484 },
    { t: 0.82, f: 481 },
    { t: 1.02, f: 506 },
    { t: 1.13, f: 553 },
    { t: 1.2, f: MG },
    { t: 1.3, f: 668 },
    { t: 1.45, f: 708 },
    { t: 1.57, f: 728 },
    { t: 1.63, f: 731 },
    { t: 1.7, f: 690 },
    { t: 1.78, f: 634 },
    { t: 1.86, f: 609 },
    { t: 1.95, f: MG },
    { t: 2.2, f: MG },
    { t: 3.4, f: MG },
  ],
  rise: [
    { t: 0, f: MG },
    { t: 0.3, f: MG },
    { t: 0.4, f: MG },
    { t: 0.47, f: 742 },
    { t: 0.58, f: 714 },
    { t: 0.7, f: 699 },
    { t: 0.9, f: 694 },
    { t: 1.1, f: 701 },
    { t: 1.2, f: MG },
    { t: 1.3, f: 545 },
    { t: 1.42, f: 520 },
    { t: 1.55, f: 512 },
    { t: 1.7, f: 540 },
    { t: 1.85, f: 575 },
    { t: 1.95, f: MG },
    { t: 2.1, f: 612 },
    { t: 2.25, f: 601 },
    { t: 2.4, f: MG },
    { t: 3.4, f: MG },
  ],
};

/** 冲击尖峰：蹲到底的急停、站起时的蹬地、下蹲起步时的卸力 */
const SPIKES: Record<"squat" | "rise" | "both", readonly Spike[]> = {
  both: [
    { t: 0.47, amp: -22, halfWidth: 0.045 },
    { t: 1.63, amp: 52, halfWidth: 0.05 },
    { t: 2.68, amp: 60, halfWidth: 0.055 },
  ],
  squat: [
    { t: 0.47, amp: -22, halfWidth: 0.045 },
    { t: 1.63, amp: 52, halfWidth: 0.05 },
  ],
  rise: [
    { t: 0.47, amp: 60, halfWidth: 0.055 },
    { t: 1.95, amp: 22, halfWidth: 0.045 },
  ],
};

/**
 * 在关键帧之间做 smoothstep 插值
 *
 * @param t 时刻（s）
 * @param keys 关键帧序列
 * @returns 该时刻的示数（N）
 */
const keyframeAt = (t: number, keys: readonly Keyframe[]): number => {
  const [first] = keys;
  const last = keys.at(-1);

  if (!first || !last || t <= first.t) return first?.f ?? MG;
  if (t >= last.t) return last.f;

  for (let i = 1; i < keys.length; i++) {
    const prev = keys[i - 1];
    const next = keys[i];

    if (t <= next.t && prev && next) {
      const u = (t - prev.t) / (next.t - prev.t);
      return prev.f + (next.f - prev.f) * (u * u * (3 - 2 * u));
    }
  }

  return last.f;
};

/**
 * 窄脉冲：`|t - t0| < halfWidth` 时叠加一个抛物线尖峰
 *
 * @param t 时刻（s）
 * @param spike 尖峰参数
 * @returns 该时刻叠加的示数（N）
 */
const spikeAt = (t: number, spike: Spike): number => {
  const u = (t - spike.t) / spike.halfWidth;

  return Math.abs(u) >= 1 ? 0 : spike.amp * (1 - u * u);
};

/** 不带噪声的理想模型：用于面积着色与极值判读 */
const modelAt = (t: number): number => {
  let f = keyframeAt(t, KEYFRAMES[mode]);

  for (const spike of SPIKES[mode]) f += spikeAt(t, spike);

  return f;
};

/**
 * 确定性伪随机：同一时刻永远得到同一个值，重渲染不会让曲线自己抖
 *
 * @param n 采样序号
 * @returns [0, 1) 的伪随机数
 */
const hashAt = (n: number): number => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;

  return v - Math.floor(v);
};

/**
 * 噪声包络：人静立时示数是平的，只有"起蹲前 / 蹲住不动 / 站定后"那一小段才有真实的重心晃动
 *
 * @param t 时刻（s）
 * @returns 0~1 的噪声强度
 */
const noiseEnvelope = (t: number): number => {
  const rampIn = Math.min(1, Math.max(0, (t - 0.22) / 0.11));
  const outStart = mode === "both" ? 4.16 : 2.3;
  const outEnd = mode === "both" ? 4.36 : 2.5;
  const rampOut = 1 - Math.min(1, Math.max(0, (t - outStart) / (outEnd - outStart)));

  return Math.min(rampIn, rampOut);
};

/** 真实传感器采样的抖动：约 26 次/s，静止时 ±8 N 左右 */
const noiseAt = (t: number): number => {
  const rate = 26;
  const u = t * rate;
  const index = Math.floor(u);
  const frac = u - index;
  const a = hashAt(index) * 2 - 1;
  const b = hashAt(index + 1) * 2 - 1;
  const w = frac * frac * (3 - 2 * frac);

  return (a * (1 - w) + b * w) * 8 * noiseEnvelope(t);
};

/**
 * 某一时刻力传感器的示数（N）= 理想模型 + 采样噪声
 *
 * @param t 时刻（s）
 * @returns 该时刻的示数（N）
 */
const curveAt = (t: number): number => modelAt(t) + noiseAt(t);

/**
 * 生成区间 [tStart, tEnd] 上曲线 F(t) 与水平线 F = MG 围成的闭合填充路径
 *
 * @param tStart 区间起点时刻（s）
 * @param tEnd 区间终点时刻（s）
 * @param mapX 时刻 → 屏幕横坐标
 * @param mapY 示数 → 屏幕纵坐标
 * @returns SVG `d` 属性字符串
 */
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
    samples: mode === "both" ? 320 : 240,
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

interface Phase {
  readonly mid: number;
  readonly tRange: readonly [number, number];
  readonly label: string;
  /** 极值点：时刻与示数（N），用于高亮圆点与偏离虚线 */
  readonly peakT?: number;
  readonly peakY?: number;
  /** 波瓣判读：失重 / 超重（画在极值外侧，避开曲线与引线） */
  readonly flag?: string;
  readonly flagY?: number;
  /** 判读文字的横向微调（用户单位）：极值贴着分隔虚线时把字挪开 */
  readonly flagDx?: number;
  /** 该段的加速度方向；静止段不画 */
  readonly accel?: "up" | "down";
  readonly color?: string;
  readonly fillColor?: string;
}

/** 分段时刻（虚线分隔各运动阶段）：把 5 段运动与两端静止分开 */
const separators = computed(() => (mode === "both" ? [0.4, 1.2, 2, 2.6, 3.4, 4.2] : [0.4, 1.2, 2]));

const DOWN_FILL = "rgba(96, 165, 250, 0.16)";
const UP_FILL = "rgba(248, 113, 113, 0.16)";
const DOWN_COLOR = "#60a5fa";
const UP_COLOR = "#f87171";

const phases = computed<readonly Phase[]>(() => {
  if (mode === "both") {
    return [
      { mid: 0.2, tRange: [0, 0.4], label: "静止" },
      {
        mid: 0.8,
        tRange: [0.4, 1.2],
        label: "加速下降",
        peakT: 0.82,
        peakY: 481,
        flag: "失重",
        flagY: 415,
        color: DOWN_COLOR,
        fillColor: DOWN_FILL,
        accel: "down",
      },
      {
        mid: 1.6,
        tRange: [1.2, 2],
        label: "减速下降",
        peakT: 1.63,
        peakY: 783,
        flag: "超重",
        flagY: 840,
        color: UP_COLOR,
        fillColor: UP_FILL,
        accel: "up",
      },
      { mid: 2.3, tRange: [2, 2.6], label: "静止" },
      {
        mid: 3,
        tRange: [2.6, 3.4],
        label: "加速上升",
        peakT: 2.68,
        peakY: 802,
        flag: "超重",
        flagY: 850,
        flagDx: 26,
        color: UP_COLOR,
        fillColor: UP_FILL,
        accel: "up",
      },
      {
        mid: 3.8,
        tRange: [3.4, 4.2],
        label: "减速上升",
        peakT: 3.85,
        peakY: 518,
        flag: "失重",
        flagY: 452,
        color: DOWN_COLOR,
        fillColor: DOWN_FILL,
        accel: "down",
      },
      { mid: 4.5, tRange: [4.2, X_MAX.value], label: "静止" },
    ];
  }

  if (mode === "squat") {
    return [
      { mid: 0.2, tRange: [0, 0.4], label: "静止" },
      {
        mid: 0.8,
        tRange: [0.4, 1.2],
        label: "加速下降",
        peakT: 0.82,
        peakY: 481,
        flag: "失重",
        flagY: 415,
        color: DOWN_COLOR,
        fillColor: DOWN_FILL,
        accel: "down",
      },
      {
        mid: 1.6,
        tRange: [1.2, 2],
        label: "减速下降",
        peakT: 1.63,
        peakY: 783,
        flag: "超重",
        flagY: 840,
        color: UP_COLOR,
        fillColor: UP_FILL,
        accel: "up",
      },
      { mid: 2.7, tRange: [2, X_MAX.value], label: "静止" },
    ];
  }

  return [
    { mid: 0.2, tRange: [0, 0.4], label: "静止" },
    {
      mid: 0.8,
      tRange: [0.4, 1.2],
      label: "加速上升",
      peakT: 0.47,
      peakY: 802,
      flag: "超重",
      flagY: 850,
      flagDx: 26,
      color: UP_COLOR,
      fillColor: UP_FILL,
      accel: "up",
    },
    {
      mid: 1.6,
      tRange: [1.2, 2],
      label: "减速上升",
      peakT: 1.55,
      peakY: 512,
      flag: "失重",
      flagY: 446,
      color: DOWN_COLOR,
      fillColor: DOWN_FILL,
      accel: "down",
    },
    { mid: 2.7, tRange: [2, X_MAX.value], label: "静止" },
  ];
});

/** 只有运动段才有"曲线与 mg 之间"的波瓣，静止段不生成路径 */
const lobes = computed(() => phases.value.filter((phase) => phase.fillColor !== undefined));

/** 底部阶段文字的字号（用户单位 ≈ 屏幕 px） */
const STAGE_FONT = 16;
/** 跟在阶段文字右侧的 `a` 字号 */
const ACCEL_FONT = 15;
/** `a` 字的宽度 */
const ACCEL_ADVANCE = 10;
/** 阶段文字与 `a` 的间距 */
const ACCEL_GAP = 6;
/** `a` 与箭头的间距 */
const ACCEL_ARROW_GAP = 2;
/** 箭头三角形的半宽 */
const ARROW_HALF = 3.5;
/** `a` + 箭头整块占的宽度 */
const ACCEL_WIDTH = ACCEL_ADVANCE + ACCEL_ARROW_GAP + ARROW_HALF * 2;

interface StageItem {
  readonly key: string;
  readonly label: string;
  /** 阶段文字的锚点（middle） */
  readonly textX: number;
  /** `a` 的起点（start） */
  readonly accelX: number;
  /** 箭头的竖直中心线 */
  readonly arrowX: number;
  readonly y: number;
  readonly accel?: "up" | "down";
  readonly color?: string;
}

/**
 * 底部阶段文字 + 加速度方向的排版：有 `a` 时把"文字 + a + 箭头"整组居中放进该段
 * （否则 4 字阶段名会把 `a` 挤出分隔线）
 *
 * @param x 时刻 → 屏幕横坐标
 * @param plot 绘图区四边（用户单位）
 * @param px2user 1 屏幕 px 等于多少用户单位
 * @returns 每段一项的定位数据
 */
const stageItems = (
  x: (value: number) => number,
  plot: { top: number; bottom: number; left: number; right: number },
  px2user: number,
): StageItem[] =>
  phases.value.map((phase) => {
    const font = STAGE_FONT * px2user;
    const half = (phase.label.length * font) / 2;
    const gap = phase.accel ? ACCEL_GAP * px2user : 0;
    const accelWidth = phase.accel ? ACCEL_WIDTH * px2user : 0;
    const left = x(phase.mid) - (half * 2 + gap + accelWidth) / 2;

    return {
      key: `stage-${phase.mid}`,
      label: phase.label,
      textX: left + half,
      accelX: left + half * 2 + gap,
      arrowX: left + half * 2 + gap + (ACCEL_ADVANCE + ACCEL_ARROW_GAP) * px2user,
      y: plot.bottom - 10 * px2user,
      accel: phase.accel,
      color: phase.color,
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
        <!-- Step 4：底部阶段名 + 该段的加速度方向（只写 a 与箭头） -->
        <g v-if="step >= 4">
          <template v-for="item in stageItems(x, plot, px2user)" :key="item.key">
            <text
              :x="item.textX"
              :y="item.y"
              text-anchor="middle"
              :font-size="STAGE_FONT * px2user"
              font-weight="500"
              fill="var(--c-neutral-300)"
            >
              {{ item.label }}
            </text>
            <g v-if="item.accel">
              <text
                :x="item.accelX"
                :y="item.y"
                font-family="KaTeX_Math"
                font-style="italic"
                :font-size="ACCEL_FONT * px2user"
                :fill="item.color"
                stroke="var(--c-bg-soft)"
                :stroke-width="2.6 * px2user"
                paint-order="stroke"
              >
                a
              </text>
              <g
                :stroke="item.color"
                :fill="item.color"
                :stroke-width="1.6 * px2user"
                stroke-linecap="round"
              >
                <line
                  :x1="item.arrowX"
                  :y1="item.accel === 'up' ? item.y - 1 * px2user : item.y - 12 * px2user"
                  :x2="item.arrowX"
                  :y2="item.accel === 'up' ? item.y - 8 * px2user : item.y - 5 * px2user"
                />
                <path
                  :d="item.accel === 'up'
                    ? `M ${item.arrowX - ARROW_HALF * px2user} ${item.y - 7 * px2user} L ${item.arrowX} ${item.y - 12.5 * px2user} L ${item.arrowX + ARROW_HALF * px2user} ${item.y - 7 * px2user} Z`
                    : `M ${item.arrowX - ARROW_HALF * px2user} ${item.y - 6 * px2user} L ${item.arrowX} ${item.y - 1.5 * px2user} L ${item.arrowX + ARROW_HALF * px2user} ${item.y - 6 * px2user} Z`"
                  stroke="none"
                />
              </g>
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
