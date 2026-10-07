<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 7 页 例②：物块在水平面上向右滑动，速度 v 画在物块右侧（常显）；点击后出受力：G 竖直向下 82、F_N 竖直向上 82、F_f 水平向左 52，
       三者都从物块几何中心 (165,176) 出发 —— 通常 mu < 1，所以 G、F_N 明显比 F_f 长（受力分析部分受 showForces 控制） -->
  <svg viewBox="0 0 360 272" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 12, y: 200 }" :to="{ x: 348, y: 200 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <rect x="120" y="152" width="90" height="48" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
    <text x="192" y="170" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#e2e8f0" text-anchor="middle">M</text>
    <CourseArrow :from="{ x: 222, y: 170 }" :to="{ x: 302, y: 170 }" stroke="#60a5fa" :stroke-width="3" label="v" />
    <g v-if="showForces">
      <CourseArrow :from="{ x: 165, y: 176 }" :to="{ x: 165, y: 258 }" stroke="#f87171" :stroke-width="3.5" />
      <text x="157" y="230" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#f87171" text-anchor="end">
        <tspan>G</tspan>
        <tspan dx="4" font-size="12">= mg</tspan>
      </text>
      <CourseArrow :from="{ x: 165, y: 176 }" :to="{ x: 113, y: 176 }" stroke="#f87171" :stroke-width="3.5" />
      <text x="105" y="172" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#f87171" text-anchor="end">
        <tspan>F</tspan>
        <tspan dy="3" font-size="10">f</tspan>
      </text>
      <CourseArrow :from="{ x: 165, y: 176 }" :to="{ x: 165, y: 94 }" stroke="#2dd4bf" :stroke-width="3.5" />
      <text x="176" y="102" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#2dd4bf" text-anchor="start">
        <tspan>F</tspan>
        <tspan dy="3" font-size="10">N</tspan>
      </text>
    </g>
  </svg>
</template>
