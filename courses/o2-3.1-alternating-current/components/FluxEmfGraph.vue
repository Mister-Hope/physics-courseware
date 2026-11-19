<!--
  第 6 页：磁通量 Φ 与感应电动势 e 随 t 的变化。两张图共用横轴范围，
  π/2 处画同一条虚线，方便看出“Φ 过零时 e 最大、Φ 最大时 e 为零”。
-->
<template>
  <div class="flux-emf">
    <CoordAxes
      :x-range="[0, 6.2832]"
      :y-range="[-1.5, 1.5]"
      :y-axis="{ quantity: 'Φ' }"
      :ticks="ticks"
      :curves="fluxCurves"
      :labels="fluxLabels"
      :view="{ width: 860, height: 150 }"
    />
    <CoordAxes
      :x-range="[0, 6.2832]"
      :y-range="[-1.5, 1.5]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'e' }"
      :ticks="bottomTicks"
      :curves="emfCurves"
      :labels="emfLabels"
      :view="{ width: 860, height: 170 }"
    />
  </div>
</template>

<script setup lang="ts">
const { PI } = Math;

const ticks = {
  x: [0, PI / 2, PI, (3 * PI) / 2, 2 * PI],
  y: [] as number[],
  labels: false,
  origin: false,
};

const bottomTicks = {
  ...ticks,
  origin: true,
};

const guideFlux = {
  points: [
    { x: PI / 2, y: -1.5 },
    { x: PI / 2, y: 1.5 },
  ],
  color: "var(--c-text-dim)",
  width: 1.2,
  dashed: true,
  opacity: 0.5,
};

const guideEmf = {
  points: [
    { x: PI / 2, y: -1.5 },
    { x: PI / 2, y: 1.5 },
  ],
  color: "var(--c-text-dim)",
  width: 1.2,
  dashed: true,
  opacity: 0.5,
};

const fluxCurves = [
  guideFlux,
  {
    formula: (x: number): number => Math.cos(x),
    color: "var(--c-accent)",
    width: 3,
  },
];

const emfCurves = [
  guideEmf,
  {
    formula: (x: number): number => Math.sin(x),
    color: "var(--c-accent-2)",
    width: 3,
  },
];

const fluxLabels = [
  {
    x: 0.12,
    y: 1,
    tex: String.raw`\Phi_m`,
    anchor: "top" as const,
    dx: 16,
    dy: -2,
    size: 15,
    halo: true,
    dot: true,
    dotColor: "var(--c-accent)",
  },
  {
    x: PI / 2,
    y: 0,
    dot: true,
    dotColor: "var(--c-text-dim)",
  },
];

const emfLabels = [
  {
    x: PI / 2,
    y: 1,
    tex: "E_m",
    anchor: "top" as const,
    dy: -2,
    size: 15,
    halo: true,
    dot: true,
    dotColor: "var(--c-accent-2)",
  },
  {
    x: 0,
    y: 0,
    dot: true,
    dotColor: "var(--c-text-dim)",
  },
  {
    x: PI / 2,
    y: 0,
    tex: String.raw`\frac{T}{4}`,
    anchor: "bottom" as const,
    dy: 22,
    size: 15,
    color: "var(--c-text-dim)",
  },
  {
    x: PI,
    y: 0,
    tex: String.raw`\frac{T}{2}`,
    anchor: "bottom" as const,
    dy: 22,
    size: 15,
    color: "var(--c-text-dim)",
  },
  {
    x: (3 * PI) / 2,
    y: 0,
    tex: String.raw`\frac{3T}{4}`,
    anchor: "bottom" as const,
    dy: 22,
    size: 15,
    color: "var(--c-text-dim)",
  },
  {
    x: 2 * PI,
    y: 0,
    tex: "T",
    anchor: "bottom" as const,
    dx: -6,
    dy: 22,
    size: 15,
    color: "var(--c-text-dim)",
  },
];
</script>

<style scoped>
.flux-emf {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
}
</style>
