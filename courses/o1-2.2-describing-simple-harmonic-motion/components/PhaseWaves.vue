<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const curves = [
  {
    formula: (t: number): number => Math.sin(2 * Math.PI * t),
    samples: 400,
    color: "var(--c-accent)",
    width: 2.4,
    showAt: 0,
  },
  {
    formula: (t: number): number => Math.cos(2 * Math.PI * t),
    samples: 400,
    color: "var(--c-sky)",
    width: 2.4,
    showAt: 1,
  },
  {
    formula: (t: number): number => -Math.sin(2 * Math.PI * t),
    samples: 400,
    color: "var(--c-physics)",
    width: 2.4,
    showAt: 2,
  },
];

const labels = [
  {
    x: 0,
    y: 0,
    tex: String.raw`\varphi=0`,
    anchor: "bottom-right",
    dx: 8,
    dy: 6,
    color: "var(--c-accent)",
    dot: 3,
    dotColor: "var(--c-accent)",
    showAt: 0,
  },
  {
    x: 0,
    y: 1,
    tex: String.raw`\varphi=\frac{\pi}{2}`,
    anchor: "right",
    dx: 10,
    color: "var(--c-sky)",
    dot: 3,
    dotColor: "var(--c-sky)",
    showAt: 1,
  },
  {
    x: 0,
    y: 0,
    tex: String.raw`\varphi=\pi`,
    anchor: "top-right",
    dx: 8,
    dy: -6,
    color: "var(--c-physics)",
    dot: 3,
    dotColor: "var(--c-physics)",
    showAt: 2,
  },
];
</script>

<template>
  <CoordAxes
    :step="step"
    :x-range="[0, 1.5]"
    :y-range="[-1.2, 1.2]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :y-axis="{ quantity: 'x', unit: 'm' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ x: [0, 0.5, 1], y: [-1, 0, 1], origin: false }"
    :view="{ width: 900, height: 300 }"
  />
</template>
