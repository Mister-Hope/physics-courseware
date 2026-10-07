<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 力传感器记录的示数 F 随时间 t 的变化（§4.6 第 3、13 页）
 *
 * - `mode="squat"`：下蹲——先加速下降（视重变小）→ 后减速下降（视重变大）→ 静止；
 * - `mode="rise"`：由蹲姿站起——先加速上升（视重变大）→ 后减速上升（视重变小）→ 静止；
 * - `step` 跟随翻页：1 出曲线 → 2 出分段与 mg 参考线 → 3 出"失重 / 超重"判读。
 *
 * 坐标轴、刻度、轴量标签交给共享 `CoordAxes`；分段线、文字判读放在 `#overlay` 插槽里。
 */
const props = withDefaults(defineProps<{ mode?: "squat" | "rise"; step?: number }>(), {
  mode: "squat",
});

const { $clicks } = useSlideContext();

const step = computed(() => {
  const raw = props.step ?? $clicks.value;

  return Math.max(0, Math.min(raw, 3));
});

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
  const first = props.mode === "squat" ? -120 : 120;
  const second = -first;

  if (t < 0.4 || t >= 2) return MG;
  if (t < 1.2) return MG + first * Math.sin((Math.PI * (t - 0.4)) / 0.8);

  return MG + second * Math.sin((Math.PI * (t - 1.2)) / 0.8);
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
  readonly label: string;
  /** 判读标注画在曲线极值的外侧：below 指画在下凹处下方 */
  readonly tag?: string;
  readonly tagSide?: "below" | "above";
  readonly tagColor?: string;
}

const phases = computed<readonly Phase[]>(() => {
  const first = props.mode === "squat" ? "加速下降" : "加速上升";

  return props.mode === "squat"
    ? [
        { mid: 0.8, label: first, tag: "失重", tagSide: "below", tagColor: "#60a5fa" },
        { mid: 1.6, label: "减速下降", tag: "超重", tagSide: "above", tagColor: "#f87171" },
        { mid: 2.7, label: "静止" },
      ]
    : [
        { mid: 0.8, label: first, tag: "超重", tagSide: "above", tagColor: "#f87171" },
        { mid: 1.6, label: "减速上升", tag: "失重", tagSide: "below", tagColor: "#60a5fa" },
        { mid: 2.7, label: "静止" },
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
        <g v-if="step >= 2">
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
          <text
            v-for="phase in phases"
            :key="`name-${phase.mid}`"
            :x="x(phase.mid)"
            :y="plot.bottom - 11 * px2user"
            text-anchor="middle"
            :font-size="17 * px2user"
            fill="#94a3b8"
          >
            {{ phase.label }}
          </text>
          <text
            :x="x(0.08)"
            :y="y(MG) - 7 * px2user"
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

        <g v-if="step >= 3">
          <template v-for="phase in phases" :key="`tag-${phase.mid}`">
            <text
              v-if="phase.tag"
              :x="x(phase.mid)"
              :y="phase.tagSide === 'above' ? y(870) : y(360)"
              text-anchor="middle"
              :font-size="17 * px2user"
              :fill="phase.tagColor"
              stroke="#0f1425"
              :stroke-width="3 * px2user"
              paint-order="stroke"
            >
              <tspan font-family="KaTeX_Math" font-style="italic">a</tspan>
              <tspan dx="5">{{ phase.tagSide === "above" ? "向上" : "向下" }}</tspan>
              <tspan dx="5">·</tspan>
              <tspan dx="5">{{ phase.tag }}</tspan>
            </text>
          </template>
        </g>
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.sfg-wrap {
  width: 100%;
  max-width: 620px;
  min-width: 0;
  margin: 0 auto;
}
</style>
