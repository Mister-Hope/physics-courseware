<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const labels = [
  { x: 0, y: 0, text: "O", anchor: "bottom", dy: 4 },
  {
    x: 0.25,
    y: 1,
    text: "M",
    anchor: "top",
    dx: -12,
    dy: -4,
    dot: 3,
    dotColor: "var(--c-accent)",
    showAt: 1,
  },
  {
    x: 0.75,
    y: -1,
    text: "M′",
    anchor: "bottom",
    dy: 4,
    dot: 3,
    dotColor: "var(--c-accent)",
    showAt: 1,
  },
  { x: 1.02, y: 0.16, tex: "T", anchor: "right", size: 15, showAt: 1 },
];
</script>

<template>
  <CoordAxes
    :step="step"
    :x-range="[0, 1.25]"
    :y-range="[-1.2, 1.2]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :y-axis="{ quantity: 'x', unit: 'm' }"
    :curves="[
      {
        formula: (t: number) => Math.sin(2 * Math.PI * t),
        samples: 240,
        color: 'var(--c-accent)',
        width: 2.6,
      },
    ]"
    :labels="labels"
    :ticks="{ x: [0, 0.25, 0.5, 0.75, 1], y: [-1, 0, 1], grid: false, origin: false }"
    :view="{ width: 640, height: 300 }"
  />
</template>
