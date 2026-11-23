<!--
  4.2 P13：算一算：频率与波长（真实公式计算）
  —— c = 3.0×10^8 m/s，λ = c/f；拖动滑块改变频率 f（MHz），用 computed 真算波长 λ（m），
     上方波形按 λ 实时压缩/展开（波长越长，同一段距离内的周期数越少）。
-->
<template>
  <div class="em-explorer">
    <div class="figure">
      <CoordAxes
        :x-range="[0, 30]"
        :y-range="[-1.55, 1.5]"
        :x-axis="{ quantity: 'x', unit: 'm' }"
        :y-axis="{ quantity: 'E' }"
        :curves="curves"
        :ticks="{ x: [10, 20, 30], y: [] }"
        :view="{ width: 860, height: 188 }"
      />
    </div>
    <div class="em-explorer-row">
      <span class="em-explorer-read"><Latex :tex="`f = ${fMHz}\\ \\text{MHz}`" /></span>
      <CourseSlider
        v-model="fMHz"
        :min="10"
        :max="100"
        :step="1"
        layout="bare"
        aria-label="电磁波频率（兆赫兹）"
      />
      <span class="em-explorer-read"><Latex :tex="`\\lambda = ${lambdaText}\\ \\text{m}`" /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

/** 频率 f，单位 MHz；真空光速 c = 3.0×10^8 m/s ⇒ λ = 300 / f(MHz)，单位 m */
const fMHz = ref(30);
const lambda = computed(() => 300 / fMHz.value);
const lambdaText = computed(() => lambda.value.toFixed(1));

/** 上方波形：固定的 30 m 长度内，波长 λ 决定能放下几个完整波形 */
const curves = computed(() => [
  {
    formula: (x: number): number => Math.sin((2 * Math.PI * x) / lambda.value),
    color: "var(--c-physics)",
    width: 3,
  },
]);
</script>
