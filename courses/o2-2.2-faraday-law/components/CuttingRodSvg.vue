<!--
  P8：导线切割磁感线，E = Blv 的几何推导。
  step 1 = 初位置；step 2 = 末位置（虚线）与位移 vΔt；step 3 = 扫过的面积 ΔS。
  磁场垂直纸面向里（FieldDots 阵列已标清方向，不再加图例）。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 1 = 出现末位置与位移；2 = 出现扫过的面积 ΔS */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <!-- 导轨、左端电阻 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 230 80 H 120 V 136" />
      <path d="M 120 184 V 240 H 230" />
      <path d="M 230 80 H 470" />
      <path d="M 230 240 H 470" />
    </g>
    <CircuitResistor :x="120" :y="160" orientation="vertical" label="R" />

    <!-- 匀强磁场 -->
    <FieldDots :x="150" :y="100" :cols="8" :rows="4" :spacing="40" dir="in" />

    <!-- 扫过的面积 -->
    <rect v-if="step >= 2" x="230" y="80" width="110" height="160" fill="var(--c-accent)" opacity="0.13" />
    <text v-if="step >= 2" x="285" y="166" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="20" fill="var(--c-accent)">
      ΔS
    </text>

    <!-- 末位置（虚线棒） -->
    <template v-if="step >= 1">
      <line x1="340" y1="80" x2="340" y2="240" stroke="var(--c-accent)" stroke-width="4" stroke-dasharray="9 6" stroke-linecap="round" opacity="0.85" />
      <text x="348" y="74" font-size="13" fill="var(--c-text-dim)">M₁N₁</text>
    </template>

    <!-- 初位置导体棒 -->
    <line x1="230" y1="80" x2="230" y2="240" stroke="var(--c-accent)" stroke-width="5" stroke-linecap="round" />
    <text x="222" y="74" text-anchor="end" font-size="13" fill="var(--c-text-dim)">MN</text>

    <!-- 速度 -->
    <CourseArrow :from="{ x: 238, y: 54 }" :to="{ x: 332, y: 54 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text x="342" y="60" font-family="KaTeX_Math, serif" font-style="italic" font-size="18" fill="var(--c-velocity)">v</text>

    <!-- 位移 vΔt -->
    <g v-if="step >= 1" stroke="var(--c-text-dim)" stroke-width="1.2">
      <line x1="230" y1="272" x2="340" y2="272" />
      <line x1="230" y1="266" x2="230" y2="278" />
      <line x1="340" y1="266" x2="340" y2="278" />
    </g>
    <text v-if="step >= 1" x="285" y="292" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="var(--c-text-dim)">
      vΔt
    </text>

    <!-- 棒长 l -->
    <g stroke="var(--c-text-dim)" stroke-width="1.2">
      <line x1="206" y1="80" x2="206" y2="240" />
      <line x1="200" y1="80" x2="212" y2="80" />
      <line x1="200" y1="240" x2="212" y2="240" />
    </g>
    <text x="198" y="164" text-anchor="end" font-family="KaTeX_Math, serif" font-style="italic" font-size="17" fill="var(--c-text-dim)">l</text>
  </svg>
</template>
