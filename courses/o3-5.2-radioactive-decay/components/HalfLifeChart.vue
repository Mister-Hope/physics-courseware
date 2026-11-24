<!-- 第 9 页：剩余原子核数随时间的衰减曲线，按半衰期分步标注 1/2、1/4、1/8 -->
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

const { $clicks } = useSlideContext();
const T = 3.8;

const remaining = (t: number): number => (1 / 2) ** (t / T);

const halfLives = [T, 2 * T, 3 * T];

const xAxis = { quantity: "t", unit: "d", side: "below" as const };
const yAxis = { quantity: "N/N", sub: "0", side: "left" as const };

const curves = computed(() => {
  const guides = halfLives.map((t, index) => ({
    points: [
      { x: t, y: 0 },
      { x: t, y: remaining(t) },
    ],
    color: "var(--c-accent)",
    width: 1.2,
    dashed: true,
    opacity: 0.5,
    showAt: index + 1,
  }));
  return [
    {
      formula: remaining,
      samples: 120,
      color: "var(--c-accent)",
      width: 3,
    },
    ...guides,
  ];
});

const labels = computed(() =>
  halfLives.map((t, index) => ({
    x: t,
    y: remaining(t),
    tex: String.raw`\frac{1}{2^{${index + 1}}}`,
    anchor: "top" as const,
    color: "var(--c-accent)",
    dot: true,
    halo: true,
    showAt: index + 1,
  })),
);
</script>

<template>
  <CoordAxes
    :x-range="[0, 12.6]"
    :y-range="[0, 1.15]"
    :x-axis="xAxis"
    :y-axis="yAxis"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: halfLives, y: [0.5, 1] }"
    :view="{ width: 470, height: 300 }"
    :step="$clicks"
  />
</template>
