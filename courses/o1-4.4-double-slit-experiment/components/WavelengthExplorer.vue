<!-- 第 12 页：算一算——拖动 a，按 Δx = a/(n−1)、λ = (d/l)Δx 反算波长 -->
<template>
  <div class="ds-explorer">
    <div class="figure ds-fig-screen">
      <svg viewBox="0 0 660 132" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect
          x="14"
          y="12"
          width="632"
          height="96"
          rx="6"
          fill="#0b1020"
          stroke="#c8d3ea"
          stroke-opacity="0.28"
          stroke-width="1.2"
        />
        <rect
          v-for="bar in bars"
          :key="bar.x"
          :x="bar.x"
          y="16"
          width="10"
          height="88"
          :fill="lightColor"
          :opacity="bar.opacity"
        />
      </svg>
    </div>
    <div class="ds-explorer-row">
      <span class="ds-explorer-label"><Latex tex="a" /></span>
      <CourseSlider
        v-model="a"
        :min="8"
        :max="14"
        :step="0.05"
        layout="bare"
        aria-label="6 条亮纹间距（毫米）"
      />
      <span class="ds-explorer-value"><Latex :tex="`a = ${a.toFixed(2)}\\ \\text{mm}`" /></span>
    </div>
    <div class="ds-read">
      <div class="ds-read-item">
        <div class="ds-read-label"><Latex tex="\Delta x = \dfrac{a}{n - 1}" /></div>
        <div class="ds-read-value">
          <Latex :tex="`\\Delta x = ${dx.toFixed(3)}\\ \\text{mm}`" />
        </div>
      </div>
      <div class="ds-read-item">
        <div class="ds-read-label"><Latex tex="\lambda = \dfrac{d}{l}\Delta x" /></div>
        <div class="ds-read-value">
          <Latex :tex="`\\lambda = ${lambda.toFixed(1)}\\ \\text{nm}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const d = 0.3;
const l = 1.2;
const count = 6;

const a = ref(10.9);
const dx = computed(() => a.value / (count - 1));
const lambda = computed(() => (d * dx.value * 1000) / l);

const lightColor = computed(() => {
  if (lambda.value >= 620) return "#f87171";
  if (lambda.value >= 570) return "#fbbf24";
  if (lambda.value >= 490) return "#4ade80";
  return "#60a5fa";
});

const bars = computed(() => {
  const spacing = Math.min(58, Math.max(26, dx.value * 20));
  const center = 330;
  return Array.from({ length: 17 }, (_, index) => {
    const offset = index - 8;
    return {
      x: center + offset * spacing - 5,
      opacity: 0.2 + 0.78 * Math.max(0, 1 - Math.abs(offset) / 9),
    };
  }).filter((bar) => bar.x > 18 && bar.x < 636);
});
</script>
