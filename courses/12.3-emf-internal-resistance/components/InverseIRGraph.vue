<script setup lang="ts">
import { computed } from "vue";

/**
 * 安阻法的 1/I – R 图像：1/I = (1/E)·R + r/E 是一条直线。 斜率 k = 1/E → E = 1/k；纵轴截距 a = r/E → r = a/k；外推到 1/I =
 * 0 时横轴截距为 −r。 step 1 → 直线、斜率与纵轴截距；step 2 → 外推的横轴截距。
 */
const { step = 0 } = defineProps<{ step?: number }>();

const curves = computed(() => [
  {
    points: [
      { x: 0, y: 0.5 },
      { x: 3, y: 2 },
    ],
    stroke: "var(--c-accent-2)",
    width: 3,
    showAt: 1,
  },
  {
    points: [
      { x: 0, y: 0.5 },
      { x: -1, y: 0 },
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
    y: 0.5,
    tex: "a = \\dfrac{r}{E}",
    anchor: "top-left" as const,
    size: 18,
    halo: true,
    dot: 5,
    showAt: 1,
  },
  {
    x: 3,
    y: 2,
    tex: "k = \\dfrac{1}{E}",
    anchor: "bottom-left" as const,
    size: 18,
    halo: true,
    dot: 5,
    showAt: 1,
  },
  {
    x: -1,
    y: 0,
    tex: "-r",
    anchor: "top-left" as const,
    size: 18,
    halo: true,
    dot: 5,
    color: "var(--c-danger)",
    showAt: 2,
  },
]);
</script>

<template>
  <div class="figure">
    <CoordAxes
      :x-range="[-1.5, 3]"
      :y-range="[0, 2.2]"
      :x-axis="{ quantity: 'R', unit: 'Ω' }"
      :y-axis="{ quantity: '1/I', unit: 'A', sup: '-1' }"
      :ticks="{ x: [-1, 1, 2, 3], y: [0.5, 1, 1.5, 2] }"
      :view="{ width: 640, height: 420 }"
      :curves="curves"
      :labels="labels"
      :step="step"
    />
  </div>
</template>
