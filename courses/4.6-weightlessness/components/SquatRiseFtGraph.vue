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
 * - 跟随翻页分步：1 出曲线 → 2 出分段、mg 参考线与着色波瓣 → 3 出极值点与"a 方向 · 超重/失重"判读。
 *
 * 坐标轴、刻度、轴量标签交给共享 `CoordAxes`；分段线、面积着色、文字判读放在 `#overlay` 插槽里。
 */
const { mode = "squat" } = defineProps<{ mode?: "squat" | "rise" | "both" }>();

const { $clicks } = useSlideContext();

const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

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

const curves = computed(() => {
  const list = [];

  if (step.value >= 1) {
    list.push({
      formula: curveAt,
      samples: mode === "both" ? 320 : 240,
      stroke: "var(--c-accent-2)",
      width: 3.5,
    });
  }

  if (step.value >= 2) {
    list.push({
      points: [
        { x: 0, y: MG },
        { x: X_MAX.value, y: MG },
      ],
      stroke: "#f87171",
      width: 2,
      dashed: true,
    });
  }

  return list;
});

interface Phase {
  readonly mid: number;
  readonly tRange: readonly [number, number];
  readonly label: string;
  /** 极值点：时刻与示数（N） */
  readonly peakT?: number;
  readonly peakY?: number;
  /** 判读标注：写"a 方向 · 超重/失重"，位置单独给（避免压住曲线） */
  readonly tag?: string;
  readonly tagSide?: "above" | "below";
  readonly tagT?: number;
  readonly tagY?: number;
  readonly tagColor?: string;
  readonly fillColor?: string;
}

/** 分段时刻（虚线分隔各运动阶段） */
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
        tag: "失重",
        tagSide: "below",
        tagT: 0.74,
        tagY: 412,
        tagColor: DOWN_COLOR,
        fillColor: DOWN_FILL,
      },
      {
        mid: 1.6,
        tRange: [1.2, 2],
        label: "减速下降",
        peakT: 1.63,
        peakY: 783,
        tag: "超重",
        tagSide: "above",
        tagT: 1.42,
        tagY: 845,
        tagColor: UP_COLOR,
        fillColor: UP_FILL,
      },
      { mid: 2.3, tRange: [2, 2.6], label: "静止" },
      {
        mid: 3,
        tRange: [2.6, 3.4],
        label: "加速上升",
        peakT: 2.68,
        peakY: 802,
        tag: "超重",
        tagSide: "above",
        tagT: 3.02,
        tagY: 862,
        tagColor: UP_COLOR,
        fillColor: UP_FILL,
      },
      {
        mid: 3.8,
        tRange: [3.4, 4.2],
        label: "减速上升",
        peakT: 3.85,
        peakY: 518,
        tag: "失重",
        tagSide: "below",
        tagT: 3.8,
        tagY: 405,
        tagColor: DOWN_COLOR,
        fillColor: DOWN_FILL,
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
        tag: "失重",
        tagSide: "below",
        tagT: 0.74,
        tagY: 412,
        tagColor: DOWN_COLOR,
        fillColor: DOWN_FILL,
      },
      {
        mid: 1.6,
        tRange: [1.2, 2],
        label: "减速下降",
        peakT: 1.63,
        peakY: 783,
        tag: "超重",
        tagSide: "above",
        tagT: 1.42,
        tagY: 845,
        tagColor: UP_COLOR,
        fillColor: UP_FILL,
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
      tag: "超重",
      tagSide: "above",
      tagT: 0.75,
      tagY: 862,
      tagColor: UP_COLOR,
      fillColor: UP_FILL,
    },
    {
      mid: 1.6,
      tRange: [1.2, 2],
      label: "减速上升",
      peakT: 1.55,
      peakY: 512,
      tag: "失重",
      tagSide: "below",
      tagT: 1.55,
      tagY: 405,
      tagColor: DOWN_COLOR,
      fillColor: DOWN_FILL,
    },
    { mid: 2.7, tRange: [2, X_MAX.value], label: "静止" },
  ];
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
    >
      <template #overlay="{ x, y, plot, px2user }">
        <!-- Step 2：分段虚线、超重/失重半透明面积着色、底部阶段名与 mg 基准线标注 -->
        <g v-if="step >= 2">
          <!-- F(t) 与 mg 之间围成的失重（蓝）/超重（红）面积波瓣 -->
          <template v-for="phase in phases" :key="`lobe-${phase.mid}`">
            <path
              v-if="phase.fillColor"
              :d="buildLobePath(phase.tRange[0], phase.tRange[1], x, y)"
              :fill="phase.fillColor"
            />
          </template>

          <!-- 各运动阶段的分界竖直虚线 -->
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

          <!-- 底部各运动阶段文字标注（含静止段） -->
          <text
            v-for="phase in phases"
            :key="`name-${phase.mid}`"
            :x="x(phase.mid)"
            :y="plot.bottom - 12 * px2user"
            text-anchor="middle"
            :font-size="16 * px2user"
            font-weight="500"
            fill="var(--c-neutral-300)"
          >
            {{ phase.label }}
          </text>

          <!-- Y 轴侧 mg 水平基准线标签 -->
          <text
            :x="x(0.06)"
            :y="y(MG) - 8 * px2user"
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

        <!-- Step 3：波峰/波谷极值点、偏离指示虚线与判读标签 -->
        <g v-if="step >= 3">
          <template v-for="phase in phases" :key="`tag-${phase.mid}`">
            <g v-if="phase.tag && phase.peakY !== undefined && phase.peakT !== undefined">
              <!-- 从 mg 基准线指向波峰/波谷的合力偏离虚线 -->
              <line
                :x1="x(phase.peakT)"
                :y1="y(MG)"
                :x2="x(phase.peakT)"
                :y2="y(phase.peakY)"
                :stroke="phase.tagColor"
                :stroke-width="1.6 * px2user"
                stroke-dasharray="3 3"
                opacity="0.8"
              />
              <!-- 曲线极值点高亮圆点 -->
              <circle
                :cx="x(phase.peakT)"
                :cy="y(phase.peakY)"
                :r="4.6 * px2user"
                :fill="phase.tagColor"
                stroke="var(--c-bg-soft)"
                :stroke-width="1.8 * px2user"
              />
              <!-- 判读：a 方向 · 超重/失重 -->
              <text
                :x="x(phase.tagT ?? phase.mid)"
                :y="y(phase.tagY ?? MG)"
                text-anchor="middle"
                :font-size="16.5 * px2user"
                font-weight="600"
                :fill="phase.tagColor"
                stroke="var(--c-bg-soft)"
                :stroke-width="3.2 * px2user"
                paint-order="stroke"
              >
                <tspan font-family="KaTeX_Math" font-style="italic">a</tspan>
                <tspan dx="4">{{ phase.tagSide === "above" ? "向上 ↑" : "向下 ↓" }}</tspan>
                <tspan dx="4">·</tspan>
                <tspan dx="4">{{ phase.tag }}</tspan>
              </text>
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
