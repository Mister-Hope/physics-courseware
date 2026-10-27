<script setup lang="ts">
/** 第 7 页：圆筒两端电压随时间的变化（方波）——定性图，纵轴只标 +u / −u。 */
const squareWave = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: 2, y: -1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 3, y: -1 },
  { x: 4, y: -1 },
];

const gridLines = [
  {
    points: [
      { x: 1, y: -1.5 },
      { x: 1, y: 1.55 },
    ],
    color: "var(--c-text-dim)",
    width: 1,
    dashed: true,
  },
  {
    points: [
      { x: 2, y: -1.5 },
      { x: 2, y: 1.55 },
    ],
    color: "var(--c-text-dim)",
    width: 1,
    dashed: true,
  },
];

const curves = [...gridLines, { points: squareWave, color: "var(--c-accent)", width: 3 }];

const labels = [
  { x: 0.12, y: 1.02, tex: "+u", anchor: "bottom-left", color: "var(--c-accent)", size: 18 },
  { x: 0.12, y: -1.02, tex: "-u", anchor: "top-left", color: "var(--c-accent)", size: 18 },
  { x: 1, y: -1.26, tex: String.raw`\dfrac{T}{2}`, anchor: "center", size: 17 },
  { x: 2, y: -1.26, tex: "T", anchor: "center", size: 17 },
];
</script>

<template>
  <CoordAxes
    :x-range="[0, 4]"
    :y-range="[-1.5, 1.55]"
    :x-axis="{ quantity: 't' }"
    :y-axis="{ quantity: 'u' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [], y: [], labels: false }"
    :view="{ width: 520, height: 280 }"
  />
</template>
