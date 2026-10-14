<script setup lang="ts">
import { computed } from "vue";

/**
 * 安阻法的第二种线性化形式：以 R 为纵轴、1/I 为横轴，R = E·(1/I) − r 是一条直线。 斜率就是电动势 E，纵轴截距为 −r（截距的绝对值即内阻）。 step 1 →
 * 直线；step 2 → 斜率与纵轴截距。
 */
const { step = 0 } = defineProps<{ step?: number }>();

const curves = computed(() => [
  {
    points: [
      { x: 0, y: -1 },
      { x: 1.75, y: 2.5 },
    ],
    stroke: "var(--c-accent-2)",
    width: 3,
    showAt: 1,
  },
]);

const labels = computed(() => [
  {
    x: 1.5,
    y: 2,
    tex: "k = E",
    anchor: "top-left" as const,
    size: 18,
    halo: true,
    dot: 5,
    showAt: 2,
  },
  {
    x: 0,
    y: -1,
    tex: "-r",
    anchor: "right" as const,
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
      :x-range="[-0.5, 1.75]"
      :y-range="[-1.5, 2.8]"
      :x-axis="{ quantity: '1/I', unit: 'A', sup: '-1' }"
      :y-axis="{ quantity: 'R', unit: 'Ω' }"
      :ticks="{ x: [0.5, 1, 1.5], y: [-1, 1, 2] }"
      :view="{ width: 640, height: 420 }"
      :curves="curves"
      :labels="labels"
      :step="step"
    />
  </div>
</template>
