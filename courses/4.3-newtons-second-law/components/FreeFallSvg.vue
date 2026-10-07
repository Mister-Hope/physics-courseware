<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 6 页 例①：小球由静止释放（v_0 = 0 用 tspan 下标写在球右上侧），重力 G 从球心竖直向下、加速度 a 画在球心右侧与球错开；
       点击后出受力：G = mg 与 a = g 各写成同一个 <text> 里的 tspan 串，分别落在重力箭头中点左侧、加速度箭头中点右侧（受力分析部分受 showForces 控制） -->
  <svg viewBox="0 0 360 250" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 12, y: 210 }" :to="{ x: 348, y: 210 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <line x1="150" y1="86" x2="150" y2="210" stroke="rgba(148,163,184,0.55)" stroke-width="1.4" stroke-dasharray="7 5" />
    <circle cx="150" cy="70" r="16" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
    <text x="150" y="44" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#60a5fa" text-anchor="middle">m</text>
    <text x="205" y="58" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#94a3b8" text-anchor="start">
      <tspan>v</tspan>
      <tspan dy="3" font-size="10">0</tspan>
      <tspan dy="-3" dx="4" font-size="13">= 0</tspan>
    </text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 150, y: 70 }" :to="{ x: 150, y: 196 }" stroke="#f87171" :stroke-width="3.5" />
      <text x="138" y="133" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#f87171" text-anchor="end" dominant-baseline="middle">
        <tspan>G</tspan>
        <tspan dx="4" font-size="13">= mg</tspan>
      </text>
      <CourseArrow :from="{ x: 196, y: 70 }" :to="{ x: 196, y: 178 }" stroke="#2dd4bf" :stroke-width="2.6" />
      <text x="210" y="124" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#2dd4bf" text-anchor="start" dominant-baseline="middle">
        <tspan>a</tspan>
        <tspan dx="4" font-size="13">= g</tspan>
      </text>
    </g>
  </svg>
</template>
