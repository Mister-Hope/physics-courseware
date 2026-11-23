<!-- 全反射：入射角小于、等于、大于临界角三种情形 -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 640 250" class="critical-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 左：θ1 < C -->
    <rect x="10" y="14" width="190" height="100" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
    <rect x="10" y="150" width="190" height="84" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
    <line x1="10" y1="150" x2="200" y2="150" stroke="#93c5fd" stroke-width="1.4" />
    <line x1="105" y1="26" x2="105" y2="226" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".5" />
    <CourseArrow :from="{ x: 60, y: 218 }" :to="{ x: 105, y: 150 }" stroke="#60a5fa" :stroke-width="1.8" :head-size="7" />
    <CourseArrow :from="{ x: 105, y: 150 }" :to="{ x: 160, y: 214 }" stroke="#93c5fd" :stroke-width="1.6" :head-size="6" />
    <CourseArrow :from="{ x: 105, y: 150 }" :to="{ x: 177, y: 74 }" stroke="#e2a846" :stroke-width="1.8" :head-size="7" />
    <text x="105" y="30" fill="#cbd5e1" font-size="16" text-anchor="middle">θ₁ &lt; C</text>
    <text x="26" y="118" fill="#60a5fa" font-size="15">入射光</text>
    <text x="140" y="236" fill="#93c5fd" font-size="15">反射光</text>
    <text x="122" y="62" fill="#e2a846" font-size="15">折射光</text>
    <text x="18" y="176" fill="#93c5fd" font-size="15">介质</text>

    <!-- 中：θ1 = C -->
    <g :opacity="step >= 1 ? 1 : 0.32">
      <rect x="210" y="14" width="190" height="100" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
      <rect x="210" y="150" width="190" height="84" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
      <line x1="210" y1="150" x2="400" y2="150" stroke="#93c5fd" stroke-width="1.4" />
      <line x1="305" y1="26" x2="305" y2="226" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".5" />
      <CourseArrow :from="{ x: 238, y: 198 }" :to="{ x: 305, y: 150 }" stroke="#60a5fa" :stroke-width="1.8" :head-size="7" />
      <CourseArrow :from="{ x: 305, y: 150 }" :to="{ x: 372, y: 198 }" stroke="#93c5fd" :stroke-width="1.6" :head-size="6" />
      <CourseArrow :from="{ x: 305, y: 150 }" :to="{ x: 394, y: 150 }" stroke="#e2a846" :stroke-width="1.8" :head-size="7" />
      <text x="305" y="30" fill="#cbd5e1" font-size="16" text-anchor="middle">θ₁ = C</text>
      <text x="318" y="136" fill="#e2a846" font-size="15">折射光沿界面</text>
      <text x="218" y="176" fill="#93c5fd" font-size="15">介质</text>
    </g>

    <!-- 右：θ1 > C -->
    <g :opacity="step >= 2 ? 1 : 0.32">
      <rect x="410" y="14" width="190" height="100" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
      <rect x="410" y="150" width="190" height="84" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
      <line x1="410" y1="150" x2="600" y2="150" stroke="#93c5fd" stroke-width="1.4" />
      <line x1="505" y1="26" x2="505" y2="226" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".5" />
      <CourseArrow :from="{ x: 430, y: 186 }" :to="{ x: 505, y: 150 }" stroke="#60a5fa" :stroke-width="1.8" :head-size="7" />
      <CourseArrow :from="{ x: 505, y: 150 }" :to="{ x: 580, y: 186 }" stroke="#93c5fd" :stroke-width="1.8" :head-size="7" />
      <text x="505" y="30" fill="#cbd5e1" font-size="16" text-anchor="middle">θ₁ &gt; C</text>
      <text x="520" y="82" fill="#e2a846" font-size="16">只有反射光</text>
      <text x="520" y="104" fill="#e2a846" font-size="16">（全反射）</text>
      <text x="420" y="176" fill="#93c5fd" font-size="15">介质</text>
    </g>
  </svg>
</template>
