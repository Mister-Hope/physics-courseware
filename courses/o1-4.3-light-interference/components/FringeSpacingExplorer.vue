<!-- 第 10 页：调波长 λ 与双缝间距 d，条纹间距 Δx = lλ/d 实时变化 -->
<template>
  <div class="li-explorer">
    <div class="figure li-fig-explorer">
      <svg viewBox="0 0 660 150" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="24" y="18" width="612" height="114" rx="8" fill="var(--c-surface)" />
        <g v-for="bar in bars" :key="bar.k">
          <rect
            :x="bar.x - 4"
            y="26"
            width="8"
            height="98"
            rx="3"
            :fill="lightColor"
            :opacity="bar.opacity"
          />
        </g>
        <line
          x1="24"
          y1="139"
          x2="636"
          y2="139"
          stroke="var(--c-text-mute)"
          stroke-width="1.2"
          stroke-dasharray="6 6"
        />
        <text x="30" y="132" font-size="12" fill="var(--c-text-dim)">屏</text>
      </svg>
    </div>
    <div class="li-explorer-row">
      <div class="li-explorer-label"><Latex tex="\lambda" /></div>
      <CourseSlider
        v-model="lambda"
        :min="400"
        :max="700"
        :step="10"
        layout="bare"
        aria-label="光的波长（纳米）"
      />
      <div class="li-explorer-value"><Latex :tex="lambdaLabel" /></div>
    </div>
    <div class="li-explorer-row">
      <div class="li-explorer-label"><Latex tex="d" /></div>
      <CourseSlider
        v-model="gap"
        :min="0.1"
        :max="0.5"
        :step="0.01"
        layout="bare"
        aria-label="双缝间距（毫米）"
      />
      <div class="li-explorer-value"><Latex :tex="gapLabel" /></div>
    </div>
    <div class="li-explorer-read">
      <Latex :tex="dxLabel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const lambda = ref(600);
const gap = ref(0.2);

const L = 1;

const spacingPx = computed(() => {
  const dxMm = ((L * (lambda.value * 1e-9)) / (gap.value * 1e-3)) * 1000;
  return Math.min(96, Math.max(14, dxMm * 26));
});

interface Bar {
  k: number;
  x: number;
  opacity: number;
}

const bars = computed<Bar[]>(() => {
  const list: Bar[] = [];
  const step = spacingPx.value;
  for (let k = -8; k <= 8; k += 1) {
    const x = 330 + k * step;
    if (x < 34 || x > 626) continue;
    list.push({ k, x, opacity: 0.95 - (0.42 * Math.abs(k)) / 9 });
  }
  return list;
});

const lightColor = computed(() => {
  const nm = lambda.value;
  if (nm >= 620) return "#f87171";
  if (nm >= 570) return "#fbbf24";
  if (nm >= 490) return "#4ade80";
  return "#60a5fa";
});

const lambdaLabel = computed(() => `\\lambda = ${lambda.value}\\ \\text{nm}`);
const gapLabel = computed(() => `d = ${gap.value.toFixed(2)}\\ \\text{mm}`);
const dxLabel = computed(() => {
  const mm = ((L * lambda.value * 1e-9) / (gap.value * 1e-3)) * 1000;
  const unit = mm >= 10 ? `${(mm / 10).toFixed(1)}\\ \\text{cm}` : `${mm.toFixed(2)}\\ \\text{mm}`;
  return `\\Delta x = \\dfrac{l\\lambda}{d} = ${unit}`;
});
</script>
