<script setup lang="ts">
// 第 18 页（习题 2）：无底塑料瓶 + 铁锯条 + 易拉罐金属片 + 静电起电机 —— 装置与题干极性常显，场强/烟尘路径点击后才出
defineProps<{ fieldAnalysis?: boolean; dustPath?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 420 300" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 280px">
    <path d="M 192 56 L 192 80 Q 192 92 120 96 L 120 252" fill="none" stroke="var(--c-text-mute)" stroke-opacity="0.6" stroke-width="1.8" />
    <path d="M 228 56 L 228 80 Q 228 92 300 96 L 300 252" fill="none" stroke="var(--c-text-mute)" stroke-opacity="0.6" stroke-width="1.8" />
    <rect x="152" y="104" width="11" height="144" rx="2" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.6" />
    <path d="M 152 110 L 146 120 L 152 128 L 146 138 L 152 146 L 146 156 L 152 164 L 146 174 L 152 182 L 146 192 L 152 200 L 146 210 L 152 218 L 146 228 L 152 236 L 146 244" fill="none" stroke="var(--c-text-mute)" stroke-opacity="0.6" stroke-width="1.6" />
    <rect x="252" y="126" width="14" height="116" rx="2" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.6" />
    <path d="M 157 248 L 157 280 L 322 280 L 322 202" fill="none" stroke="var(--c-text)" stroke-width="1.8" />
    <path d="M 259 242 L 259 290 L 372 290 L 372 202" fill="none" stroke="var(--c-text)" stroke-width="1.8" />
    <rect x="292" y="196" width="110" height="44" rx="8" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <circle cx="322" cy="196" r="4" fill="var(--c-text)" />
    <circle cx="372" cy="196" r="4" fill="var(--c-text)" />
    <text x="347" y="224" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">静电起电机</text>
    <text x="310" y="184" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-velocity)">−</text>
    <text x="384" y="184" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
    <text x="140" y="98" text-anchor="end" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">铁锯条</text>
    <text x="278" y="118" text-anchor="start" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">金属片</text>
    <ellipse cx="210" cy="246" rx="16" ry="4" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <path d="M 210 246 C 202 240 202 232 210 232 C 218 232 218 240 210 240" fill="none" stroke="var(--c-field)" stroke-width="1.6" />
    <text x="236" y="250" text-anchor="start" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-mute)">蚊香</text>
    <template v-if="fieldAnalysis">
      <path d="M 166 130 L 232 130 M 166 162 L 232 162 M 166 194 L 232 194" stroke="var(--c-field)" stroke-width="1.4" stroke-opacity="0.7" stroke-dasharray="5 4" />
      <text x="40" y="64" text-anchor="start" font-family="KaTeX_Main" font-size="11" fill="var(--c-field)">锯条尖端附近场强最大</text>
    </template>
    <template v-if="dustPath">
      <CourseArrow :from="{ x: 170, y: 140 }" :to="{ x: 244, y: 140 }" stroke="var(--c-velocity)" stroke-width="1.8" />
      <CourseArrow :from="{ x: 170, y: 178 }" :to="{ x: 244, y: 178 }" stroke="var(--c-velocity)" stroke-width="1.8" />
      <text x="210" y="270" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-velocity)">带负电烟尘 → 金属片</text>
    </template>
  </svg>
</template>
