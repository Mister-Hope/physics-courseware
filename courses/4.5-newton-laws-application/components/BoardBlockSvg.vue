<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 9 页临界题：光滑水平面上的长木板 M 上放物块 m，水平恒力 F 拉木板；物块所受静摩擦力与整体加速度受 showForces 控制 -->
  <svg viewBox="0 0 400 240" width="100%" style="max-width: 440px" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 16, y: 190 }" :to="{ x: 384, y: 190 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <rect x="56" y="158" width="252" height="26" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2.2" />
    <rect x="128" y="114" width="64" height="44" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2.2" />
    <text x="84" y="177" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#e2e8f0">M</text>
    <text x="160" y="141" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#e2e8f0">m</text>
    <CourseArrow :from="{ x: 308, y: 171 }" :to="{ x: 366, y: 171 }" stroke="#e2a846" :stroke-width="3.2" label="F" :label-dx="4" :label-dy="-14" />
    <text x="330" y="213" font-size="12" fill="#94a3b8">光滑</text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 160, y: 136 }" :to="{ x: 222, y: 136 }" stroke="#2dd4bf" :stroke-width="3.2" />
      <text x="226" y="140" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#2dd4bf">
        <tspan>F</tspan>
        <tspan dy="3" font-size="10">f</tspan>
      </text>
      <CourseArrow :from="{ x: 232, y: 96 }" :to="{ x: 280, y: 96 }" stroke="#60a5fa" :stroke-width="2.8" label="a" :label-dx="4" :label-dy="-14" />
    </g>
  </svg>
</template>
