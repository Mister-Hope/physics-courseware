<!--
  第 15 页：波形图（y-x）与振动图像（y-t）上下并排对比。
  两张曲线的形状相同，但横坐标一个是「各质点的平衡位置」、一个是「时间」。
-->
<template>
  <div class="wv-compare">
    <div class="wv-compare-row">
      <div class="wv-compare-cap">
        <div class="wv-compare-name">波形图</div>
        <div class="wv-compare-note">
          <Latex tex="x" /> 轴：各质点的平衡位置<br /><Latex tex="y" /> 轴：某一时刻的位移
        </div>
      </div>
      <CoordAxes
        :x-range="[0, 8.4]"
        :y-range="[-1.4, 1.4]"
        :x-axis="{ quantity: 'x' }"
        :y-axis="{ quantity: 'y' }"
        :curves="curves"
        :ticks="{ x: [], y: [], labels: false, origin: false }"
        :view="{ width: 720, height: 120 }"
      />
    </div>
    <div class="wv-compare-row">
      <div class="wv-compare-cap">
        <div class="wv-compare-name">振动图像</div>
        <div class="wv-compare-note">
          <Latex tex="t" /> 轴：时刻<br /><Latex tex="y" /> 轴：某一质点的位移
        </div>
      </div>
      <CoordAxes
        :x-range="[0, 8.4]"
        :y-range="[-1.4, 1.4]"
        :x-axis="{ quantity: 't' }"
        :y-axis="{ quantity: 'y' }"
        :curves="curves"
        :ticks="{ x: [], y: [], labels: false, origin: false }"
        :view="{ width: 720, height: 120 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const curves = [
  {
    formula: (x: number): number => Math.sin((2 * Math.PI * x) / 4),
    color: "var(--c-accent)",
    width: 3,
  },
];
</script>
