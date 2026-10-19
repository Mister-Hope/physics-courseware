<script setup lang="ts">
/**
 * 第 17 页：超导现象。电阻率 ρ 随温度 T 的变化（定性图，坐标轴上不标刻度数字）。 临界温度 T_c 靠近原点：T < T_c 时 ρ = 0；T_c 以上与普通金属一样，温度越高 ρ
 * 越大。 文字说明由页面右栏承载，组件只画图。
 */
const superconductor = {
  points: [
    { x: 0, y: 0 },
    { x: 1.2, y: 0 },
    { x: 1.2, y: 3.1 },
    { x: 2, y: 3.55 },
    { x: 3, y: 3.95 },
    { x: 4, y: 4.25 },
    { x: 5, y: 4.5 },
    { x: 6, y: 4.72 },
    { x: 7, y: 4.92 },
    { x: 8, y: 5.1 },
    { x: 8.5, y: 5.2 },
  ],
  color: "var(--c-accent-2)",
  width: 3.5,
};
</script>

<template>
  <div class="sc-wrap">
    <SimpleAxis
      :x-max="9"
      :y-max="5.6"
      :x-axis="{ quantity: 'T' }"
      :y-axis="{ quantity: 'ρ' }"
      :curves="[superconductor]"
      :point="{
        x: 1.2,
        y: 0,
        math: 'T',
        sub: 'c',
        color: 'var(--c-physics)',
        labelAt: 'bottom-right',
      }"
      :ticks="{ labels: false }"
      :view="{ width: 480, height: 400 }"
    />
  </div>
</template>

<style scoped>
.sc-wrap {
  display: grid;
  min-width: 0;
}
</style>
