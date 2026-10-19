<script setup lang="ts">
import { computed } from "vue";

/**
 * 第二课时「真实车辆为什么有最高速度」——纯定性页（不标刻度数值、不写风阻次数）：
 *   牵引力 F = P/v 随速度增大而减小（额定功率下的双曲线）；
 *   阻力随速度增大而增大：地面摩擦与传动阻力大体不变（v = 0 处就有正截距），风阻随速度明显增大，
 *   所以阻力曲线越来越陡。
 * 两条线的交点处牵引力正好等于阻力 ⇒ 车不再加速，这就是真实车辆有最高速度的原因。
 */
const F0 = 1; // 与速度无关的那部分阻力（归一化）
const P = 3.2; // 额定功率（归一化）
const K = 0.42; // 风阻系数（归一化，只决定形状）
const N = 1.8; // 风阻随速度增长的指数（只决定形状，不上屏）
const V_TOP = 2.4; // 画到多大速度
const V_MIN = P / 5.1; // 牵引力曲线的起点（保证起点在纵轴范围内）

/** 两线交点：P/v = F0 + K·v^N（数值解，仅用于画图） */
const V_MAX = (() => {
  let lo = 0.2;
  let hi = V_TOP;
  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    if (P / mid > F0 + K * mid ** N) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
})();
const F_MAX = P / V_MAX;

const sample = (fn: (v: number) => number, from: number) =>
  Array.from({ length: 100 }, (_, i) => {
    const v = from + (V_TOP - from) * (i / 99);
    return { x: Number(v.toFixed(4)), y: Number(fn(v).toFixed(4)) };
  });

const curves = computed(() => [
  { points: sample((v) => P / v, V_MIN), stroke: "var(--c-accent)", width: 3.2 },
  { points: sample((v) => F0 + K * v ** N, 0), stroke: "var(--c-danger)", width: 3.2 },
  {
    points: [
      { x: V_MAX, y: 0 },
      { x: V_MAX, y: F_MAX },
    ],
    stroke: "var(--c-ok)",
    width: 1.5,
    dashed: "6 5",
    opacity: 0.85,
  },
  {
    points: [
      { x: 0, y: F_MAX },
      { x: V_MAX, y: F_MAX },
    ],
    stroke: "var(--c-ok)",
    width: 1.5,
    dashed: "6 5",
    opacity: 0.85,
  },
]);

const labels = computed(() => [
  {
    x: V_MIN + 0.12,
    y: P / (V_MIN + 0.12) - 0.34,
    tex: "F = \\frac{P}{v}",
    anchor: "left" as const,
    size: 18,
    color: "var(--c-accent)",
    halo: true,
  },
  { x: 2.12, y: F0 + K * 2.12 ** N + 0.32, text: "阻力", anchor: "right" as const, size: 17, color: "var(--c-danger)", halo: true },
  { x: V_MAX, y: F_MAX, dot: 5.5, color: "var(--c-ok)" },
  {
    x: V_MAX + 0.04,
    y: F_MAX + 0.34,
    tex: "F = F_{\\text{阻}}",
    anchor: "top-right" as const,
    size: 17,
    color: "var(--c-ok)",
    halo: true,
  },
  { x: V_MAX, y: 0, tex: "v_{\\max}", anchor: "top-left" as const, size: 18, color: "var(--c-ok)", halo: true },
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 2.42]"
    :y-range="[0, 5]"
    :x-axis="{ quantity: 'v' }"
    :y-axis="{ quantity: 'F' }"
    :ticks="{ labels: false }"
    :curves="curves"
    :labels="labels"
    :view="{ width: 700, height: 260 }"
  />
</template>
