<!--
  P10：感应电动势的微观来源。
  导线（竖直）以 v 向右运动，磁场垂直纸面向里；按正电荷分析：
  1 = 自由电荷随棒运动；2 = 洛伦兹力使正电荷向上、负电荷向下；3 = 两端堆积、棒内出现电场，
  直到电场力与洛伦兹力平衡，两端电势差稳定。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 1 = 电荷随棒运动；2 = 洛伦兹力；3 = 堆积与内电场 */
  step?: number;
}>();

/** 棒内三个自由电荷的纵坐标 */
const CHARGE_Y = [110, 160, 210];
</script>

<template>
  <svg viewBox="0 0 540 330" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <!-- 匀强磁场：垂直纸面向里 -->
    <FieldDots :x="80" :y="95" :cols="8" :rows="4" :spacing="48" dir="in" />

    <!-- 棒内电场（先画，压在电荷下面） -->
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 232, y: 70 }" :to="{ x: 232, y: 270 }" stroke="var(--c-physics)" :stroke-width="2.6" />
      <text x="266" y="252" font-family="KaTeX_Math, serif" font-style="italic" font-size="17" fill="var(--c-physics)">
        E
        <tspan dy="4" font-size="11">电</tspan>
      </text>
    </g>

    <!-- 导线：竖直 -->
    <rect x="228" y="55" width="32" height="230" rx="4" fill="color-mix(in srgb, var(--c-text) 14%, transparent)" stroke="var(--c-text)" stroke-width="2" />

    <!-- 运动方向 -->
    <CourseArrow :from="{ x: 266, y: 165 }" :to="{ x: 400, y: 165 }" stroke="var(--c-velocity)" :stroke-width="3" />
    <text x="410" y="172" font-family="KaTeX_Math, serif" font-style="italic" font-size="19" fill="var(--c-velocity)">v</text>

    <!-- 棒内自由电荷（按正电荷分析） -->
    <g v-for="(y, i) in CHARGE_Y" :key="i">
      <circle cx="244" :cy="y" r="6" fill="var(--c-danger)" />
      <text x="244" :y="y + 4" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="10" fill="#fff">+</text>

      <!-- 洛伦兹力：向上 -->
      <CourseArrow v-if="step >= 1" :from="{ x: 244, y: y - 10 }" :to="{ x: 244, y: y - 34 }" stroke="var(--c-danger)" :stroke-width="2.2" />
    </g>

    <text v-if="step >= 1" x="272" y="86" font-family="KaTeX_Math, serif" font-style="italic" font-size="17" fill="var(--c-danger)">
      F
      <tspan dy="4" font-size="11">洛</tspan>
    </text>

    <!-- 两端堆积的电荷 -->
    <g v-if="step >= 2">
      <g v-for="(x, i) in [230, 244, 258]" :key="'p' + i">
        <circle :cx="x" cy="46" r="7" fill="var(--c-danger)" />
        <text :x="x" y="50" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="11" fill="#fff">+</text>
      </g>
      <g v-for="(x, i) in [230, 244, 258]" :key="'n' + i">
        <circle :cx="x" cy="296" r="7" fill="var(--c-velocity)" />
        <text :x="x" y="300" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="11" fill="#fff">−</text>
      </g>
    </g>

    <!-- 两端电势差 U -->
    <g v-if="step >= 2" stroke="var(--c-text-dim)" stroke-width="1.2">
      <line x1="206" y1="55" x2="206" y2="285" />
      <line x1="200" y1="55" x2="212" y2="55" />
      <line x1="200" y1="285" x2="212" y2="285" />
    </g>
    <text v-if="step >= 2" x="198" y="175" text-anchor="end" font-family="KaTeX_Math, serif" font-style="italic" font-size="18" fill="var(--c-text-dim)">
      U
    </text>

    <!-- 教材口径：按正电荷分析 -->
    <text x="270" y="322" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">按正电荷分析</text>
  </svg>
</template>
