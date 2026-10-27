<script setup lang="ts">
import { computed } from "vue";

/**
 * 电流表外接法的 U-I 图像（图像法分析系统误差）： 测量线（蓝色，外接法读数拟合）与真实线（红色虚线）在横轴上交于同一点—— U = 0 时电压表不分流，此时电流表读数等于真实的短路电流。
 * step 1 → 测量线与数据点；step 2 → 真实线；step 3 → 交点标注。
 */
const { step = 0 } = defineProps<{ step?: number }>();

/** 真实电动势与短路电流（示意值） */
const E0 = 1.5;
/** 外接法测得的电动势（电压表分流使测量值偏小） */
const E_MEAS = 1.25;
const I_SHORT = 1.5;
/** 测量线上的几组数据点 */
const DATA: readonly { readonly i: number; readonly u: number }[] = [
  { i: 0.3, u: 1.025 },
  { i: 0.6, u: 0.8 },
  { i: 0.9, u: 0.575 },
  { i: 1.2, u: 0.35 },
];

const curves = computed(() => [
  {
    points: [
      { x: 0, y: E_MEAS },
      { x: I_SHORT, y: 0 },
    ],
    stroke: "var(--c-accent-2)",
    width: 3,
    showAt: 1,
  },
  {
    points: [
      { x: 0, y: E0 },
      { x: I_SHORT, y: 0 },
    ],
    stroke: "var(--c-danger)",
    width: 3,
    dashed: true,
    showAt: 2,
  },
]);

const labels = computed(() => [
  {
    x: 0,
    y: E_MEAS,
    tex: String.raw`E_{\text{测}}`,
    anchor: "top-right" as const,
    size: 19,
    halo: true,
    dot: 5,
    showAt: 1,
  },
  { x: 0.9, y: 0.34, parts: [{ text: "测量线" }], size: 17, color: "var(--c-accent-2)", showAt: 1 },
  {
    x: 0,
    y: E0,
    tex: "E_0",
    anchor: "top-right" as const,
    size: 19,
    halo: true,
    dot: 5,
    color: "var(--c-danger)",
    showAt: 2,
  },
  { x: 1.12, y: 0.52, parts: [{ text: "真实线" }], size: 17, color: "var(--c-danger)", showAt: 2 },
  {
    x: I_SHORT,
    y: 0,
    tex: String.raw`I_{\text{短}}`,
    anchor: "top-left" as const,
    size: 19,
    halo: true,
    dot: 5,
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
