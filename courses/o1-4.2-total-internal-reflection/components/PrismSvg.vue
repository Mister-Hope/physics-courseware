<!-- 全反射棱镜：光垂直射入，在斜边发生全反射，方向改变 90° -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 370 310" class="prism-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="prismGlass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1d4ed8" stop-opacity=".45" />
        <stop offset="1" stop-color="#0f2a4a" stop-opacity=".75" />
      </linearGradient>
    </defs>
    <polygon points="110,70 110,230 270,230" fill="url(#prismGlass)" stroke="#93c5fd" stroke-width="1.6" />
    <line x1="40" y1="150" x2="110" y2="150" stroke="#60a5fa" stroke-width="2.2" />
    <line x1="110" y1="150" x2="188" y2="150" stroke="#60a5fa" stroke-width="2.2" />
    <CourseArrow :from="{ x: 188, y: 150 }" :to="{ x: 188, y: 228 }" stroke="#f87171" :stroke-width="2.2" :head-size="8" />
    <CourseArrow :from="{ x: 188, y: 232 }" :to="{ x: 188, y: 298 }" stroke="#93c5fd" :stroke-width="2" :head-size="8" />
    <line x1="158" y1="180" x2="218" y2="120" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".6" />
    <g :opacity="step >= 1 ? 1 : 0">
      <path d="M 218 150 A 30 30 0 0 0 209 129" fill="none" stroke="#f87171" stroke-width="1.4" />
      <text x="226" y="132" fill="#f87171" font-size="16">45°</text>
      <text x="300" y="118" fill="#f87171" font-size="17">全反射</text>
    </g>
    <g :opacity="step >= 2 ? 1 : 0">
      <path d="M 218 150 A 30 30 0 0 1 188 180" fill="none" stroke="#e2a846" stroke-width="1.4" />
      <text x="226" y="178" fill="#e2a846" font-size="16">90°</text>
    </g>
    <text x="66" y="138" fill="#60a5fa" font-size="16">入射光</text>
    <text x="196" y="286" fill="#93c5fd" font-size="16">出射光</text>
    <text x="130" y="212" fill="#93c5fd" font-size="15">玻璃</text>
    <text x="28" y="190" fill="#94a3b8" font-size="15">空气</text>
    <text x="196" y="262" fill="#94a3b8" font-size="15">空气</text>
  </svg>
</template>
