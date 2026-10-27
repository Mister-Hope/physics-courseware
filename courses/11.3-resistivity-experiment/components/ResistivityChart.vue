<script setup lang="ts">
/**
 * 第二课时：U-I 图与拟合直线（坐标轴一律用共享 <CoordAxes>，不手画）。
 *
 * 6 组测量点由 resistivityData 提供；拟合用最小二乘 R = Σ(IU)/Σ(I²)（过原点）， 斜率随数据真实计算，不写死。 step ≥1 描点，≥2
 * 画出过原点的拟合直线并标出斜率。
 */
import { computed } from "vue";

import { MEASURED_POINTS, fittedResistance } from "./resistivityData";

const { step = 0 } = defineProps<{ step?: number }>();

const slope = fittedResistance();

const curves = computed(() => [
  {
    points: [
      { x: 0, y: 0 },
      { x: 0.6, y: 0.6 * slope },
    ],
    stroke: "var(--c-accent)",
    width: 3,
    showAt: 2,
  },
]);

const labels = computed(() => [
  ...MEASURED_POINTS.map((point) => ({ x: point.i, y: point.u, dot: 5, showAt: 1 })),
  {
    x: 0.36,
    y: 0.94,
    tex: String.raw`R = \dfrac{U}{I}`,
    anchor: "top-right",
    size: 18,
    halo: true,
    showAt: 2,
  },
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 0.68]"
    :y-range="[0, 1.35]"
    :x-axis="{ quantity: 'I', unit: 'A' }"
    :y-axis="{ quantity: 'U', unit: 'V' }"
    :ticks="{ x: [0.2, 0.4, 0.6], y: [0.4, 0.8, 1.2] }"
    :view="{ width: 520, height: 400 }"
    :curves="curves"
    :labels="labels"
    :step="step"
  />
</template>
