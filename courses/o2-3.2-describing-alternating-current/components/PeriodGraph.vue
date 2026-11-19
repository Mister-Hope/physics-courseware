<!--
  第 2 页：一个或两个周期的正弦波形，只标 T/2、T（两周期时标到 2T）。
-->
<template>
  <div class="figure">
    <CoordAxes
      :x-range="[0, xMax]"
      :y-range="[-1.35, 1.35]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'u' }"
      :ticks="{ x: [], y: [], labels: false, origin: false }"
      :curves="curves"
      :labels="labels"
      :view="{ width: 820, height: 260 }"
    />
  </div>
</template>

<script setup lang="ts">
const { cycles = 2 } = defineProps<{ cycles?: 1 | 2 }>();

const { PI } = Math;
const xMax = cycles === 1 ? 6.6 : 13.2;

const curves = [
  {
    formula: (x: number): number => Math.sin(x),
    color: "var(--c-accent)",
    width: 3,
  },
];

const labels = [
  {
    x: PI / 2,
    y: 0,
    tex: String.raw`\frac{T}{4}`,
    anchor: "top" as const,
    dy: 16,
    size: 14,
    halo: true,
  },
  {
    x: PI,
    y: 0,
    tex: String.raw`\frac{T}{2}`,
    anchor: "top" as const,
    dy: 16,
    size: 14,
    halo: true,
  },
  { x: 2 * PI, y: 0, tex: "T", anchor: "top" as const, dy: 16, size: 14, halo: true },
  ...(cycles === 2
    ? [
        {
          x: 3 * PI,
          y: 0,
          tex: String.raw`\frac{3T}{2}`,
          anchor: "top" as const,
          dy: 16,
          size: 14,
          halo: true,
        },
        { x: 4 * PI, y: 0, tex: "2T", anchor: "top" as const, dy: 16, size: 14, halo: true },
      ]
    : []),
];
</script>
