<script setup lang="ts">
import { computed } from "vue";

/**
 * 伏阻法的 1/U – 1/R 图像：1/U = 1/E + (r/E)·(1/R) 是一条直线。 纵轴截距 a = 1/E → E = 1/a；斜率 k = r/E → r =
 * k/a；把直线外推到 1/U = 0，横轴截距为 −1/r → r = 1/b。 step 1 → 直线；step 2 → 纵轴截距与斜率；step 3 → 外推的横轴截距。
 */
const { step = 0 } = defineProps<{ step?: number }>();

const curves = computed(() => [
  {
    points: [
      { x: 0, y: 0.5 },
      { x: 2, y: 1.5 },
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
    showAt: 3,
  },
]);

const labels = computed(() => [
  {
    x: 0,
    y: 0.5,
    tex: "a = \\dfrac{1}{E}",
    anchor: "top-left" as const,
    size: 18,
    halo: true,
    dot: 5,
    showAt: 2,
  },
  {
    x: 2,
    y: 1.5,
    tex: "k = \\dfrac{r}{E}",
    anchor: "bottom-left" as const,
    size: 18,
    halo: true,
    dot: 5,
    showAt: 2,
  },
  {
    x: -1,
    y: 0,
    tex: "-\\dfrac{1}{r}",
    anchor: "top-left" as const,
    size: 18,
    halo: true,
    dot: 5,
    color: "var(--c-danger)",
    showAt: 3,
  },
]);
</script>

<template>
  <div class="figure">
    <CoordAxes
      :x-range="[-1.5, 2]"
      :y-range="[0, 1.6]"
      :x-axis="{ quantity: '1/R', unit: 'Ω', sup: '-1' }"
      :y-axis="{ quantity: '1/U', unit: 'V', sup: '-1' }"
      :ticks="{ x: [-1, 1, 2], y: [0.5, 1, 1.5] }"
      :view="{ width: 640, height: 420 }"
      :curves="curves"
      :labels="labels"
      :step="step"
    />
  </div>
</template>
