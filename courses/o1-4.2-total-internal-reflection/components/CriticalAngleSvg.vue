<!-- 临界角推导：利用光路可逆，光从空气接近 90° 射入介质，折射角就是 C -->
<script setup lang="ts">
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
</script>

<template>
  <svg viewBox="0 0 600 250" class="critical-angle-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 左：空气 → 水 -->
    <rect x="10" y="14" width="270" height="116" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
    <rect x="10" y="130" width="270" height="100" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
    <line x1="10" y1="130" x2="280" y2="130" stroke="#93c5fd" stroke-width="1.5" />
    <line x1="150" y1="28" x2="150" y2="224" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="5 5" opacity=".5" />
    <CourseArrow :from="{ x: 24, y: 130 }" :to="{ x: 148, y: 130 }" stroke="#60a5fa" :stroke-width="2" :head-size="8" />
    <CourseArrow :from="{ x: 150, y: 130 }" :to="{ x: 225, y: 196 }" stroke="#e2a846" :stroke-width="2" :head-size="8" />
    <path d="M 150 176 A 46 46 0 0 1 179 163" fill="none" stroke="#e2a846" stroke-width="1.4" />
    <text x="182" y="178" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="18">C</text>
    <text x="44" y="120" fill="#60a5fa" font-family="KaTeX_Main" font-size="17">90°</text>
    <text x="140" y="34" fill="#cbd5e1" font-size="16" text-anchor="middle">空气 → 水</text>
    <text x="222" y="62" fill="#94a3b8" font-size="16">空气</text>
    <text x="222" y="212" fill="#93c5fd" font-size="16">水</text>

    <!-- 光路可逆 -->
    <g :style="{ visibility: step >= 1 ? 'visible' : 'hidden' }">
      <text x="295" y="124" fill="#e2a846" font-size="15" text-anchor="middle">光路可逆</text>
      <CourseArrow :from="{ x: 292, y: 138 }" :to="{ x: 316, y: 138 }" stroke="#e2a846" :stroke-width="1.6" :head-size="7" />
    </g>

    <!-- 右：水 → 空气 -->
    <g :opacity="step >= 1 ? 1 : 0.32">
      <rect x="320" y="14" width="270" height="116" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
      <rect x="320" y="130" width="270" height="100" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
      <line x1="320" y1="130" x2="590" y2="130" stroke="#93c5fd" stroke-width="1.5" />
      <line x1="450" y1="28" x2="450" y2="224" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="5 5" opacity=".5" />
      <CourseArrow :from="{ x: 375, y: 196 }" :to="{ x: 450, y: 130 }" stroke="#60a5fa" :stroke-width="2" :head-size="8" />
      <CourseArrow :from="{ x: 450, y: 130 }" :to="{ x: 576, y: 130 }" stroke="#e2a846" :stroke-width="2" :head-size="8" />
      <path d="M 450 176 A 46 46 0 0 0 419 163" fill="none" stroke="#60a5fa" stroke-width="1.4" />
      <text x="396" y="178" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="18">C</text>
      <text x="512" y="120" fill="#e2a846" font-family="KaTeX_Main" font-size="17">90°</text>
      <text x="440" y="34" fill="#cbd5e1" font-size="16" text-anchor="middle">水 → 空气</text>
      <text x="500" y="62" fill="#94a3b8" font-size="16">空气</text>
      <text x="500" y="212" fill="#93c5fd" font-size="16">水</text>
    </g>
  </svg>
</template>
