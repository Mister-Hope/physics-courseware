<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 10 页 例④：光滑斜面上两物块用轻绳相连下滑，无外力时整体加速度为 a，绳中拉力 F_T 未知；两物块沿斜面向下的加速度箭头属分析标注，受 showForces 控制（默认不显示） -->
  <svg viewBox="0 0 380 260" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg">
    <path d="M 60 220 L 340 220 L 340 70 Z" fill="rgba(148,163,184,0.14)" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" />
    <SurfaceHatch :from="{ x: 52, y: 220 }" :to="{ x: 348, y: 220 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <path d="M 105 220 A 45 45 0 0 0 99.7 198.7" fill="none" stroke="#94a3b8" stroke-width="1.6" />
    <text x="100" y="209" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#e2e8f0" text-anchor="middle">θ</text>
    <g transform="translate(60,220) rotate(-28.2)">
      <rect x="77" y="-30" width="46" height="30" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
      <rect x="177" y="-30" width="46" height="30" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
      <line x1="123" y1="-15" x2="177" y2="-15" stroke="#cbd5e1" stroke-width="1.6" />
    </g>
    <text x="126" y="136" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f1f5f9" text-anchor="middle">
      m
      <tspan dy="3" font-size="10">2</tspan>
    </text>
    <text x="214" y="89" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f1f5f9" text-anchor="middle">
      m
      <tspan dy="3" font-size="10">1</tspan>
    </text>
    <text x="156" y="116" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#e2a846" text-anchor="start">
      F
      <tspan dy="3" font-size="10">T</tspan>
    </text>
    <text x="174" y="116" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#e2a846" text-anchor="start">= ?</text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 141, y: 160 }" :to="{ x: 104, y: 180 }" stroke="#2dd4bf" :stroke-width="2.6" label="a" :label-dx="-2" :label-dy="20" />
      <CourseArrow :from="{ x: 229, y: 112 }" :to="{ x: 192, y: 132 }" stroke="#2dd4bf" :stroke-width="2.6" label="a" :label-dx="-2" :label-dy="20" />
    </g>
    <text x="285" y="92" font-size="12" fill="#94a3b8" text-anchor="middle">光滑</text>
  </svg>
</template>
