<script setup lang="ts">
// 第 20 页：v 与合力 F 的夹角决定加速还是减速（两幅对照图）。
// step ≥ 1：左图 θ < 90°，切向分力与 v 同向 → 加速的圆周运动；
// step ≥ 2：右图 θ > 90°，切向分力与 v 反向 → 减速的圆周运动。
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="112 38 478 204" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- ① θ < 90°：加速 -->
    <path d="M 137.5 150.9 A 105 105 0 0 0 242.5 150.9" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.7" />
    <CourseArrow :from="{ x: 190, y: 165 }" :to="{ x: 270, y: 165 }" stroke="#2dd4bf" :stroke-width="3" />
    <text
      x="284"
      y="173"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="#2dd4bf"
      text-anchor="start"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      v
    </text>
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 190, y: 165 }" :to="{ x: 234.4, y: 69.9 }" stroke="#e2a846" :stroke-width="3.4" />
      <path d="M 235 165 A 45 45 0 0 0 209 124.2" fill="none" stroke="#f1f5f9" stroke-width="2" opacity="0.9" />
      <text
        x="242"
        y="139"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="#f1f5f9"
        text-anchor="start"
        stroke="#0f1425"
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
        fill="#e2a846"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        F
      </text>
    </g>
    <circle cx="190" cy="165" r="8.5" fill="#f1f5f9" />
    <text v-if="step >= 1" x="190" y="226" font-family="KaTeX_Main" font-size="19" fill="#2dd4bf" text-anchor="middle">加速的圆周运动</text>

    <!-- ② θ > 90°：减速 -->
    <path d="M 447.5 150.9 A 105 105 0 0 0 552.5 150.9" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.7" />
    <CourseArrow :from="{ x: 500, y: 165 }" :to="{ x: 580, y: 165 }" stroke="#2dd4bf" :stroke-width="3" />
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 500, y: 165 }" :to="{ x: 455.6, y: 69.8 }" stroke="#e2a846" :stroke-width="3.4" />
      <path d="M 545 165 A 45 45 0 0 0 481 124.2" fill="none" stroke="#f1f5f9" stroke-width="2" opacity="0.9" />
      <text
        x="504"
        y="122"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="#f1f5f9"
        text-anchor="start"
        stroke="#0f1425"
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
        fill="#e2a846"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        F
      </text>
    </g>
    <circle cx="500" cy="165" r="8.5" fill="#f1f5f9" />
    <text v-if="step >= 2" x="500" y="226" font-family="KaTeX_Main" font-size="19" fill="#e2a846" text-anchor="middle">减速的圆周运动</text>
  </svg>
</template>
