<script setup lang="ts">
import { computed } from "vue";

/**
 * 第二课时「恒定加速度启动 → 恒定功率」的两幅图像（左右并排）： v–t ：先是一段直线（匀加速），到 v₁ 之后转为斜率渐小的曲线，渐近于 v_max F–1/v ：先是一段水平线（牵引力恒定
 * f₀+ma），到 1/v₁ 之后转为过原点的直线（F = P₀·1/v） 模型：阻力严格恒定 f₀ = 1800 N（题设），m = 1500 kg，P₀ = 60 kW，a = 1.5
 * m/s²。
 */
const F0 = 1800;
const M = 1500;
const P0 = 60_000;
const A = 1.5;

const F1 = F0 + M * A; // 匀加速阶段的牵引力 4050 N
const V1 = P0 / F1; // 匀加速能到的最大速度 ≈14.8 m/s
const T1 = V1 / A; // 换挡时刻 ≈9.9 s
const V_MAX = P0 / F0; // ≈33.3 m/s

/** 阶段二 v(t)：dv/dt = (P₀/v − f₀)/m */
const phase2 = computed(() => {
  const DT = 0.02;
  const out: { x: number; y: number }[] = [];
  let v = V1;
  let t = T1;
  for (let i = 0; i < 3000; i += 1) {
    if (i % 10 === 0) out.push({ x: Number(t.toFixed(2)), y: Number(v.toFixed(3)) });
    v += ((P0 / v - F0) / M) * DT;
    t += DT;
    if (v > V_MAX * 0.997) break;
  }
  return out;
});

const vtCurves = computed(() => [
  {
    points: [
      { x: 0, y: 0 },
      { x: Number(T1.toFixed(2)), y: Number(V1.toFixed(2)) },
    ],
    stroke: "var(--c-accent)",
    width: 3.2,
  },
  { points: phase2.value, stroke: "var(--c-accent)", width: 3.2 },
  {
    points: [
      { x: 0, y: V_MAX },
      { x: 60, y: V_MAX },
    ],
    stroke: "var(--c-ok)",
    width: 1.8,
    dashed: "7 5",
    opacity: 0.8,
  },
]);

const vtLabels = computed(() => [
  {
    x: V1 ? T1 : 0,
    y: V1,
    tex: "v_1",
    anchor: "bottom-left" as const,
    size: 17,
    color: "var(--c-accent)",
    halo: true,
    dot: 4.5,
  },
  {
    x: 44,
    y: V_MAX - 2.6,
    tex: "v_{\\max}",
    anchor: "bottom-right" as const,
    size: 17,
    color: "var(--c-ok)",
    halo: true,
  },
]);

const fvCurves = computed(() => [
  {
    points: [
      { x: Number((1 / V1).toFixed(4)), y: F1 },
      { x: 0.42, y: F1 },
    ],
    stroke: "var(--c-accent)",
    width: 3.2,
  },
  {
    points: [
      { x: Number((F0 / P0).toFixed(4)), y: F0 },
      { x: Number((1 / V1).toFixed(4)), y: F1 },
    ],
    stroke: "var(--c-accent)",
    width: 3.2,
  },
]);

const fvLabels = computed(() => [
  {
    x: 0.2,
    y: F1 + 260,
    tex: "F = f_0 + ma",
    anchor: "bottom-left" as const,
    size: 16,
    color: "var(--c-accent)",
    halo: true,
  },
  {
    x: Number((1 / V1).toFixed(4)),
    y: F1,
    tex: "\\frac{1}{v_1}",
    anchor: "bottom-left" as const,
    size: 15,
    color: "var(--c-text-dim)",
    halo: true,
    dot: 4,
  },
  {
    x: Number((F0 / P0).toFixed(4)),
    y: F0 - 200,
    tex: "\\frac{f_0}{P_0}",
    anchor: "top-left" as const,
    size: 15,
    color: "var(--c-ok)",
    halo: true,
    dot: 4,
  },
]);
</script>

<template>
  <div class="phase-graphs">
    <div class="phase-graph">
      <CoordAxes
        :x-range="[0, 60]"
        :y-range="[0, 38]"
        :x-axis="{ quantity: 't', unit: 's' }"
        :y-axis="{ quantity: 'v', unit: 'm/s' }"
        :ticks="{ labels: false }"
        :curves="vtCurves"
        :labels="vtLabels"
        :view="{ width: 400, height: 250 }"
      />
    </div>
    <div class="phase-graph">
      <CoordAxes
        :x-range="[0, 0.42]"
        :y-range="[0, 5000]"
        :x-axis="{ quantity: '1/v' }"
        :y-axis="{ quantity: 'F', unit: 'N' }"
        :ticks="{ labels: false }"
        :curves="fvCurves"
        :labels="fvLabels"
        :view="{ width: 400, height: 250 }"
      />
    </div>
  </div>
</template>

<style scoped>
.phase-graphs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  width: 100%;
}

.phase-graph {
  min-width: 0;
}
</style>
