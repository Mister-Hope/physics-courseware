<script setup lang="ts">
// 第 20 页：v 与合力 F 的夹角决定加速还是减速（两幅对照图）。
// step ≥ 1：左图 θ < 90°，切向分力与 v 同向 → 加速的圆周运动；
// step ≥ 2：右图 θ > 90°，切向分力与 v 反向 → 减速的圆周运动。
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="112 38 478 204" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- ① θ < 90°：加速 -->
    <path d="M 137.5 150.9 A 105 105 0 0 0 242.5 150.9" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" opacity="0.7" />
    <CourseArrow :from="{ x: 190, y: 165 }" :to="{ x: 270, y: 165 }" stroke="var(--c-physics)" :stroke-width="3" />
    <text
      x="284"
      y="173"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="var(--c-physics)"
      text-anchor="start"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      v
    </text>
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 190, y: 165 }" :to="{ x: 234.4, y: 69.9 }" stroke="var(--c-accent)" :stroke-width="3.4" />
      <path d="M 235 165 A 45 45 0 0 0 209 124.2" fill="none" stroke="var(--c-text)" stroke-width="2" opacity="0.9" />
      <text
        x="242"
        y="139"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="var(--c-text)"
        text-anchor="start"
        stroke="var(--c-bg-soft)"
        stroke-width="4"
        paint-order="stroke"
      >
        θ
      </text>
      <text
        x="234"
        y="54"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="var(--c-accent)"
        text-anchor="middle"
        stroke="var(--c-bg-soft)"
        stroke-width="4"
        paint-order="stroke"
      >
        F
      </text>
    </g>
    <circle cx="190" cy="165" r="8.5" fill="var(--c-text)" />
    <text v-if="step >= 1" x="190" y="226" font-family="KaTeX_Main" font-size="19" fill="var(--c-physics)" text-anchor="middle">加速的圆周运动</text>

    <!-- ② θ > 90°：减速 -->
    <path d="M 447.5 150.9 A 105 105 0 0 0 552.5 150.9" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" opacity="0.7" />
    <CourseArrow :from="{ x: 500, y: 165 }" :to="{ x: 580, y: 165 }" stroke="var(--c-physics)" :stroke-width="3" />
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 500, y: 165 }" :to="{ x: 455.6, y: 69.8 }" stroke="var(--c-accent)" :stroke-width="3.4" />
      <path d="M 545 165 A 45 45 0 0 0 481 124.2" fill="none" stroke="var(--c-text)" stroke-width="2" opacity="0.9" />
      <text
        x="504"
        y="122"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="var(--c-text)"
        text-anchor="start"
        stroke="var(--c-bg-soft)"
        stroke-width="4"
        paint-order="stroke"
      >
        θ
      </text>
      <text
        x="456"
        y="54"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="var(--c-accent)"
        text-anchor="middle"
        stroke="var(--c-bg-soft)"
        stroke-width="4"
        paint-order="stroke"
      >
        F
      </text>
    </g>
    <circle cx="500" cy="165" r="8.5" fill="var(--c-text)" />
    <text v-if="step >= 2" x="500" y="226" font-family="KaTeX_Main" font-size="19" fill="var(--c-accent)" text-anchor="middle">减速的圆周运动</text>
  </svg>
</template>
