<script setup lang="ts">
const curves = [
  {
    formula: (t: number): number => 2 * Math.sin((Math.PI * t) / 2 + Math.PI / 2),
    samples: 500,
    color: "var(--c-accent)",
    width: 2.4,
  },
  {
    formula: (t: number): number => 3 * Math.sin((Math.PI * t) / 2 + Math.PI / 4),
    samples: 500,
    color: "var(--c-sky)",
    width: 2.4,
  },
];
</script>

<template>
  <CoordAxes
    :x-range="[0, 5]"
    :y-range="[-3.5, 3.5]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :y-axis="{ quantity: 'x', unit: 'cm' }"
    :curves="curves"
    :ticks="{ x: [0, 1, 2, 3, 4], y: [-3, 0, 3], origin: false }"
    :view="{ width: 760, height: 220 }"
  />
</template>
