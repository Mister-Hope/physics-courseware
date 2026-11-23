<script setup lang="ts">
const curves = [
  {
    formula: (t: number): number => 1.5 + 0.32 * Math.sin(4 * Math.PI * t),
    samples: 500,
    color: "var(--c-accent)",
    width: 2.4,
  },
  {
    formula: (t: number): number => 0.5 + 0.32 * Math.sin(6 * Math.PI * t),
    samples: 500,
    color: "var(--c-sky)",
    width: 2.4,
  },
];

const labels = [
  { x: -0.05, y: 1.5, tex: "do", anchor: "right", size: 14, color: "var(--c-accent)" },
  { x: -0.05, y: 0.5, tex: "sol", anchor: "right", size: 14, color: "var(--c-sky)" },
];
</script>

<template>
  <CoordAxes
    :x-range="[-0.12, 1]"
    :y-range="[0, 2]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [0, 0.5, 1], y: [], origin: false }"
    :view="{ width: 900, height: 220 }"
  />
</template>
