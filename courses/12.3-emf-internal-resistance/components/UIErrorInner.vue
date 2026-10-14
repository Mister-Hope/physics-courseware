<script setup lang="ts">
import { computed } from "vue";

/**
 * 电流表内接法的 U-I 图像（图像法分析系统误差）： 两条线在纵轴上交于同一点——I = 0 时电流表不分压，测量电压就是真实路端电压（E_测 = E_0）；
 * 测量线的斜率绝对值包含电流表内阻，倾斜得更陡（r_测 = r_0 + R_A）。 step 1 → 测量线与数据点；step 2 → 真实线；step 3 → 斜率更陡的标注。
 */
const { step = 0 } = defineProps<{ step?: number }>();

/** 真实电动势 */
const E0 = 1.5;
/** 测量线上的几组数据点（内接法电流表分压使电压读数偏小） */
const DATA: readonly { readonly i: number; readonly u: number }[] = [
  { i: 0.3, u: 1.05 },
  { i: 0.6, u: 0.6 },
  { i: 0.9, u: 0.15 },
];

const curves = computed(() => [
  {
    points: [
      { x: 0, y: E0 },
      { x: 1, y: 0 },
    ],
    stroke: "var(--c-accent-2)",
    width: 3,
    showAt: 1,
  },
  {
    points: [
      { x: 0, y: E0 },
      { x: 1.5, y: 0 },
    ],
    stroke: "var(--c-danger)",
    width: 3,
    dashed: true,
    showAt: 2,
  },
]);

const labels = computed(() => [
  {
    x: 0.72,
    y: 0.42,
    parts: [{ text: "测量线" }],
    size: 17,
    color: "var(--c-accent-2)",
    showAt: 1,
  },
  {
    x: 0,
    y: E0,
    tex: "E_0",
    anchor: "top-right" as const,
    size: 19,
    halo: true,
    dot: 5,
    showAt: 2,
  },
  { x: 1.22, y: 0.62, parts: [{ text: "真实线" }], size: 17, color: "var(--c-danger)", showAt: 2 },
  {
    x: 0.62,
    y: 0.18,
    parts: [{ text: "斜率更大" }],
    size: 17,
    color: "var(--c-accent-2)",
    showAt: 3,
  },
]);
</script>

<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, 1.7]"
      :y-range="[0, 1.7]"
      :x-axis="{ quantity: 'I', unit: 'A' }"
      :y-axis="{ quantity: 'U', unit: 'V' }"
      :ticks="{ x: [0.5, 1, 1.5], y: [0.5, 1, 1.5] }"
      :view="{ width: 640, height: 420 }"
      :curves="curves"
      :labels="labels"
      :step="step"
    >
      <template #overlay="{ x, y, px2user }">
        <g
          v-if="step >= 1"
          stroke="var(--c-accent)"
          :stroke-width="1.8 * px2user"
          stroke-linecap="round"
        >
          <line
            v-for="point in DATA"
            :key="`cross-h-${point.i}`"
            :x1="x(point.i) - 6.5 * px2user"
            :y1="y(point.u)"
            :x2="x(point.i) + 6.5 * px2user"
            :y2="y(point.u)"
          />
          <line
            v-for="point in DATA"
            :key="`cross-v-${point.i}`"
            :x1="x(point.i)"
            :y1="y(point.u) - 6.5 * px2user"
            :x2="x(point.i)"
            :y2="y(point.u) + 6.5 * px2user"
          />
        </g>
      </template>
    </CoordAxes>
  </div>
</template>
