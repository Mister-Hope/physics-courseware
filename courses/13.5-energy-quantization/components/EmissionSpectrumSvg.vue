<script setup lang="ts">
import { computed } from "vue";

import { GAP } from "./energyLevels";

/**
 * 第 14 页：原子的发射光谱——暗底上只有几条分立的亮线。
 *
 * 与 EnergyLevelDiagram 共用同一份能级差（energyLevels.ts 的 GAP）： 光子能量 hν = 能级差，能量差越大 ⇒ 频率越高 ⇒ 波长越短（λ ∝ 1/ΔE）。 谱线位置只由这条关系定性决定，不标任何波长数值、不标刻度。
 *
 * Step 0：只有图位；step 1：n = 3 → 2 那条亮线；step 2：n = 2 → 1 那条亮线（能量差更大、更靠短波一侧）。
 */

const { step = 0 } = defineProps<{ step?: number }>();

const X0 = 100;
const SPAN = 700;
const STRIP_Y = 44;
const STRIP_H = 76;

const SPEC_LINES = [
  /** N = 3 → n = 2，能量差小 → 波长长 → 靠右 */
  { tex: "h\\nu = E_3 - E_2", color: "#fb923c", showAt: 1, gap: GAP.threeTwo },
  /** N = 2 → n = 1，能量差大 → 波长短 → 靠左 */
  { tex: "h\\nu = E_2 - E_1", color: "#a78bfa", showAt: 2, gap: GAP.twoOne },
];

const invSum = SPEC_LINES.reduce((sum, line) => sum + 1 / line.gap, 0);

/** 亮线横坐标：λ ∝ 1/ΔE，把两条线的 1/ΔE 归一化到条带内（只作定性位置） */
const lineX = (gap: number): number => X0 + (SPAN * (1 / gap)) / invSum;

/** ChartLabel 按容器百分比定位：容器里 SVG 宽度 100%，百分比正好等于 viewBox 坐标 */
const xPercent = (x: number): number => (x / 900) * 100;
const labelYPercent = 20;
const visibleLines = computed(() => SPEC_LINES.filter((line) => step >= line.showAt));
</script>

<template>
  <div class="es">
    <svg viewBox="0 0 900 170" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="原子的发射光谱：暗色背景上只有几条分立的亮线">
      <rect x="40" :y="STRIP_Y" width="820" :height="STRIP_H" rx="10" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
      <g v-for="line in SPEC_LINES" :key="line.tex">
        <rect v-if="step >= line.showAt" :x="lineX(line.gap) - 7" :y="STRIP_Y + 4" width="14" :height="STRIP_H - 8" rx="7" :fill="line.color" opacity="0.22" />
        <rect v-if="step >= line.showAt" :x="lineX(line.gap) - 2.5" :y="STRIP_Y + 4" width="5" :height="STRIP_H - 8" rx="2.5" :fill="line.color" />
      </g>
      <CourseArrow :from="{ x: 40, y: 146 }" :to="{ x: 800, y: 146 }" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <text x="812" y="152" font-size="16" fill="var(--c-text-dim)">波长增大</text>
    </svg>
    <ChartLabel
      v-for="line in visibleLines"
      :key="line.tex"
      :x-percent="xPercent(lineX(line.gap))"
      :y-percent="labelYPercent"
      :parts="[{ tex: line.tex }]"
      anchor="center"
      :size="18"
      color="var(--c-text)"
    />
  </div>
</template>

<style scoped>
.es {
  position: relative;
  width: 100%;
  min-width: 0;
}

.es svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
