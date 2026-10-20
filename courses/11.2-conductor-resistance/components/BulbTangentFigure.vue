<script setup lang="ts">
/**
 * 例题页（非线性元件之后）：小灯泡的 I–U 图线与过 P 点的切线。 横轴 U、纵轴 I；曲线取 I = 1.6√U，P 点 (U₁, I₂) = (4, 3.2)， 该点切线斜率 dI/dU
 * = 0.4 ⇒ 切线在 I 轴上的截距 I₁ = I₂ − 0.4·U₁ = 1.6（即 N 点）。 于是 U₁/(I₂−I₁) 正好是切线斜率的倒数——选项 D 的干扰项由此而来。
 * 坐标轴上不标刻度数字，只用符号 I₁ / I₂ / U₁。 ⚠️ CoordAxes 的曲线用 `stroke`（不是 SimpleAxis 的 `color`）；PointLabel 的
 * anchor 没有 "bottom"。
 */
const U1 = 4;
const I2 = 3.2;
const I1 = 1.6;

const curves = [
  // 小灯泡的 I–U 图线：越来越平（电阻随温度升高而增大）
  { formula: (u: number): number => 1.6 * Math.sqrt(u), color: "var(--c-accent-2)", width: 3 },
  // 过 P 点的切线 PN
  {
    points: [
      { x: 0, y: I1 },
      { x: 4.7, y: I1 + 0.4 * 4.7 },
    ],
    color: "var(--c-text-dim)",
    width: 2,
  },
  // PM：P 到 I 轴的垂线
  {
    points: [
      { x: 0, y: I2 },
      { x: U1, y: I2 },
    ],
    color: "var(--c-text-dim)",
    width: 1.2,
    dashed: true,
  },
  // PQ：P 到 U 轴的垂线
  {
    points: [
      { x: U1, y: 0 },
      { x: U1, y: I2 },
    ],
    color: "var(--c-text-dim)",
    width: 1.2,
    dashed: true,
  },
];

const labels = [
  { x: U1, y: I2, tex: "P", anchor: "top-right", dot: 4.5 },
  { x: 0, y: I2, tex: "I_2", anchor: "left" },
  { x: 0, y: I2, tex: "M", anchor: "right" },
  { x: 0, y: I1, tex: "I_1", anchor: "left" },
  { x: 0, y: I1, tex: "N", anchor: "right", dot: 4 },
  { x: U1, y: 0, tex: "Q", anchor: "top-left" },
  { x: U1, y: 0, tex: "U_1", anchor: "center", dy: 18 },
];
</script>

<template>
  <div class="btf">
    <CoordAxes
      :x-range="[0, 5.2]"
      :y-range="[0, 4.2]"
      :x-axis="{ quantity: 'U' }"
      :y-axis="{ quantity: 'I' }"
      :curves="curves"
      :labels="labels"
      :ticks="{ labels: false }"
      :view="{ width: 340, height: 300 }"
    />
  </div>
</template>

<style scoped>
/* `.ex-fig` 用 max-content 取宽，所以这里必须给固有宽度，否则图栏塌成 0 */
.btf {
  width: 300px;
}
</style>
