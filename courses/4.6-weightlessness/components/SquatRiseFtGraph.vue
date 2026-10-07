<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 力传感器记录的示数 F 随时间 t 的变化（§4.6 第 3、13 页）
 *
 * - `mode="squat"`：下蹲——先加速下降（视重变小）→ 后减速下降（视重变大）→ 静止；
 * - `mode="rise"`：由蹲姿站起——先加速上升（视重变大）→ 后减速上升（视重变小）→ 静止；
 * - 跟随翻页分步：1 出曲线 → 2 出分段、mg 参考线与着色波瓣 → 3 出极值点与"失重 / 超重"判读。
 *
 * 坐标轴、刻度、轴量标签交给共享 `CoordAxes`；分段线、面积着色、文字判读放在 `#overlay` 插槽里。
 */
const { mode = "squat" } = defineProps<{ mode?: "squat" | "rise" }>();

const { $clicks } = useSlideContext();

const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

/** M = 60 kg、g = 10 m/s² 时的重力，作为参考线 */
const MG = 600;

const X_MAX = 3.4;
const VIEW_W = 660;
const VIEW_H = 400;

/**
 * 下蹲：先失重（曲线下凹）再超重（曲线上凸）；站起相反
 *
 * @param t 时刻（s）
 * @returns 该时刻力传感器的示数（N）
 */
const curveAt = (t: number): number => {
  const first = mode === "squat" ? -120 : 120;
  const second = -first;

  if (t < 0.4 || t >= 2) return MG;
  if (t < 1.2) return MG + first * Math.sin((Math.PI * (t - 0.4)) / 0.8);

  return MG + second * Math.sin((Math.PI * (t - 1.2)) / 0.8);
};

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
  const SEGMENT_COUNT = 48;
  const pts: string[] = [`M ${mapX(tStart).toFixed(2)} ${mapY(MG).toFixed(2)}`];

  for (let i = 1; i <= SEGMENT_COUNT; i++) {
    const t = tStart + ((tEnd - tStart) * i) / SEGMENT_COUNT;
    pts.push(`L ${mapX(t).toFixed(2)} ${mapY(curveAt(t)).toFixed(2)}`);
  }

  pts.push(`L ${mapX(tEnd).toFixed(2)} ${mapY(MG).toFixed(2)} Z`);
  return pts.join(" ");
};

const curves = computed(() => {
  const list = [];

  if (step.value >= 1)
    list.push({ formula: curveAt, samples: 160, stroke: "var(--c-accent-2)", width: 3.5 });

  if (step.value >= 2) {
    list.push({
      points: [
        { x: 0, y: MG },
        { x: X_MAX, y: MG },
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
  /** 极值点对应的力传感器读数（N） */
  readonly peakY?: number;
  /** 判读标注画在曲线极值的外侧：below 指画在下凹处下方 */
  readonly tag?: string;
  readonly tagSide?: "below" | "above";
  readonly tagColor?: string;
  readonly fillColor?: string;
}

const phases = computed<readonly Phase[]>(() => {
  const first = mode === "squat" ? "加速下降" : "加速上升";

  return mode === "squat"
    ? [
        { mid: 0.2, tRange: [0, 0.4], label: "静止" },
        {
          mid: 0.8,
          tRange: [0.4, 1.2],
          label: first,
          peakY: 480,
          tag: "失重",
          tagSide: "below",
          tagColor: "#60a5fa",
          fillColor: "rgba(96, 165, 250, 0.16)",
        },
        {
          mid: 1.6,
          tRange: [1.2, 2],
          label: "减速下降",
          peakY: 720,
          tag: "超重",
          tagSide: "above",
          tagColor: "#f87171",
          fillColor: "rgba(248, 113, 113, 0.16)",
        },
        { mid: 2.7, tRange: [2, X_MAX], label: "静止" },
      ]
    : [
        { mid: 0.2, tRange: [0, 0.4], label: "静止" },
        {
          mid: 0.8,
          tRange: [0.4, 1.2],
          label: first,
          peakY: 720,
          tag: "超重",
          tagSide: "above",
          tagColor: "#f87171",
          fillColor: "rgba(248, 113, 113, 0.16)",
        },
        {
          mid: 1.6,
          tRange: [1.2, 2],
          label: "减速上升",
          peakY: 480,
          tag: "失重",
          tagSide: "below",
          tagColor: "#60a5fa",
          fillColor: "rgba(96, 165, 250, 0.16)",
        },
        { mid: 2.7, tRange: [2, X_MAX], label: "静止" },
      ];
});
</script>

<template>
  <div class="sfg-wrap">
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

          <!-- 三个时刻分界竖直虚线 -->
          <line
            v-for="t0 in [0.4, 1.2, 2]"
            :key="`sep-${t0}`"
            :x1="x(t0)"
            :y1="plot.top"
            :x2="x(t0)"
            :y2="plot.bottom"
            stroke="rgba(148,163,184,0.38)"
            :stroke-width="1.4 * px2user"
            stroke-dasharray="7 6"
          />

          <!-- 底部各运动阶段文字标注（含 0~0.4s 初始静止段） -->
          <text
            v-for="phase in phases"
            :key="`name-${phase.mid}`"
            :x="x(phase.mid)"
            :y="plot.bottom - 12 * px2user"
            text-anchor="middle"
            :font-size="16 * px2user"
            font-weight="500"
            fill="#cbd5e1"
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
            fill="#f87171"
            stroke="#0f1425"
            :stroke-width="3 * px2user"
            paint-order="stroke"
          >
            mg
          </text>
        </g>

        <!-- Step 3：波峰/波谷极值点、偏离指示虚线与“a 方向 · 超重/失重”判读标签 -->
        <g v-if="step >= 3">
          <template v-for="phase in phases" :key="`tag-${phase.mid}`">
            <g v-if="phase.tag && phase.peakY !== undefined">
              <!-- 从 mg 基准线指向波峰/波谷的合力偏离虚线 -->
              <line
                :x1="x(phase.mid)"
                :y1="y(MG)"
                :x2="x(phase.mid)"
                :y2="y(phase.peakY)"
                :stroke="phase.tagColor"
                :stroke-width="1.6 * px2user"
                stroke-dasharray="3 3"
                opacity="0.8"
              />
              <!-- 曲线极值点高亮圆点 -->
              <circle
                :cx="x(phase.mid)"
                :cy="y(phase.peakY)"
                :r="4.6 * px2user"
                :fill="phase.tagColor"
                stroke="#0f1425"
                :stroke-width="1.8 * px2user"
              />
              <!-- 紧贴波峰上方 / 波谷下方的判读标签 -->
              <text
                :x="x(phase.mid)"
                :y="phase.tagSide === 'above' ? y(768) : y(408)"
                text-anchor="middle"
                :font-size="16.5 * px2user"
                font-weight="600"
                :fill="phase.tagColor"
                stroke="#0f1425"
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
.sfg-wrap {
  width: 100%;
  min-width: 0;
  max-width: 620px;
  margin: 0 auto;
}
</style>
