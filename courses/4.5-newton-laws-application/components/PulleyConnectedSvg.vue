<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 6 页例题一：天花板下定滑轮，轻绳两端分别挂 m 与 3m 的物块（两块之间留出明显空隙，
       避免学生误以为它们之间有摩擦力）；受力与加速度箭头受 showForces 控制 -->
  <svg viewBox="0 0 400 300" width="100%" style="max-width: 440px" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="26" x2="360" y2="26" stroke="#94a3b8" stroke-width="3" />
    <line x1="80" y1="26" x2="66" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="136" y1="26" x2="122" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="200" y1="26" x2="186" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="264" y1="26" x2="250" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="320" y1="26" x2="306" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="200" y1="26" x2="200" y2="38" stroke="#94a3b8" stroke-width="2.4" />
    <circle cx="200" cy="72" r="34" fill="rgba(30,41,59,0.85)" stroke="#94a3b8" stroke-width="2.4" />
    <path d="M 166 72 A 34 34 0 0 1 234 72" fill="none" stroke="#cbd5e1" stroke-width="2.4" />
    <line x1="166" y1="72" x2="166" y2="200" stroke="#cbd5e1" stroke-width="2.4" />
    <line x1="234" y1="72" x2="234" y2="180" stroke="#cbd5e1" stroke-width="2.4" />
    <rect x="145" y="200" width="42" height="36" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2.2" />
    <rect x="213" y="180" width="42" height="36" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2.2" />
    <text x="166" y="224" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#e2e8f0">m</text>
    <text x="234" y="204" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#e2e8f0">
      <tspan font-family="KaTeX_Main">3</tspan>
      <tspan>m</tspan>
    </text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 166, y: 218 }" :to="{ x: 166, y: 268 }" stroke="#f87171" :stroke-width="3.4" />
      <text x="174" y="262" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f87171">mg</text>
      <CourseArrow :from="{ x: 166, y: 218 }" :to="{ x: 166, y: 170 }" stroke="#2dd4bf" :stroke-width="3.4" />
      <text x="174" y="184" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#2dd4bf">
        <tspan>F</tspan>
        <tspan dy="3" font-size="11">T</tspan>
      </text>
      <CourseArrow :from="{ x: 234, y: 198 }" :to="{ x: 234, y: 264 }" stroke="#f87171" :stroke-width="3.4" />
      <text x="242" y="258" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f87171">
        <tspan font-family="KaTeX_Main">3</tspan>
        <tspan>mg</tspan>
      </text>
      <CourseArrow :from="{ x: 234, y: 198 }" :to="{ x: 234, y: 146 }" stroke="#2dd4bf" :stroke-width="3.4" />
      <text x="242" y="160" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#2dd4bf">
        <tspan>F</tspan>
        <tspan dy="3" font-size="11">T</tspan>
      </text>
      <CourseArrow :from="{ x: 118, y: 252 }" :to="{ x: 118, y: 196 }" stroke="#60a5fa" :stroke-width="3" label="a" :label-dx="-18" :label-dy="4" />
      <CourseArrow :from="{ x: 282, y: 164 }" :to="{ x: 282, y: 220 }" stroke="#60a5fa" :stroke-width="3" label="a" :label-dx="20" :label-dy="4" />
    </g>
  </svg>
</template>
