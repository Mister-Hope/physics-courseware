<!-- 第 11 页互动：油膜面积 S 改变时，由 d=V/S 实时算出分子直径 d。 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const V = 2e-11;
const S = ref(0.2);

const d = computed(() => V / S.value);
const radius = computed(() => 130 * Math.sqrt(S.value / 0.4));
const sTex = computed(() => `${S.value.toFixed(2)}\\ \\text{m}^2`);
const dTex = computed(() => {
  const [mantissa, exponent] = d.value.toExponential(1).split("e");
  return `${mantissa}\\times10^{${Number(exponent)}}\\ \\text{m}`;
});
</script>

<template>
  <div class="area-demo">
    <div class="area-figure">
      <svg viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect
          x="30"
          y="30"
          width="400"
          height="240"
          rx="12"
          fill="#0b2b4a"
          stroke="#94a3b8"
          stroke-width="1.6"
        />
        <circle
          cx="230"
          cy="150"
          :r="radius"
          fill="#e2a846"
          fill-opacity="0.18"
          stroke="#e2a846"
          stroke-width="2"
        />
        <text x="230" y="154" fill="#e2a846" font-size="12" text-anchor="middle">油膜</text>
        <text x="48" y="286" fill="#94a3b8" font-size="10">浅盘</text>
      </svg>
    </div>
    <div class="area-panel">
      <CourseSlider
        v-model="S"
        :min="0.05"
        :max="0.4"
        :step="0.01"
        label="油膜面积"
        label-tex="S"
        accent="gold"
      />
      <div class="area-readouts">
        <div class="area-readout">
          <span class="area-k">油膜面积 S</span>
          <span class="area-v"><Latex :tex="sTex" /></span>
        </div>
        <div class="area-readout">
          <span class="area-k">分子直径 d</span>
          <span class="area-v"><Latex :tex="dTex" /></span>
        </div>
      </div>
      <div class="area-hint">
        纯油酸体积取
        <Latex tex="V = 2.0\times10^{-11}\ \text{m}^3" />（某次实验数据）。油膜面积越大，算出的
        <Latex tex="d" /> 越小。
      </div>
    </div>
  </div>
</template>
