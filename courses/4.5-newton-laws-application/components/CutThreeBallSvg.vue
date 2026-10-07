<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <!-- 第 7、8 页例题二：天花板下绳—甲(2m)—绳—乙(2m)—弹簧—丙(m)，最上端绳被剪断。
       弹簧用灰色画，丙的弹力箭头（青）才能压在弹簧上看得清；
       step>=1 显示丙的受力与 a=0，step>=3 显示甲、乙的加速度箭头 -->
  <svg viewBox="0 0 360 400" width="100%" style="max-width: 380px" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="26" x2="300" y2="26" stroke="#94a3b8" stroke-width="3" />
    <line x1="100" y1="26" x2="86" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="160" y1="26" x2="146" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="220" y1="26" x2="206" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="280" y1="26" x2="266" y2="12" stroke="#64748b" stroke-width="1.6" />
    <line x1="180" y1="26" x2="180" y2="78" stroke="#cbd5e1" stroke-width="2.4" />
    <line x1="170" y1="42" x2="190" y2="62" stroke="#f87171" stroke-width="3.2" />
    <line x1="190" y1="42" x2="170" y2="62" stroke="#f87171" stroke-width="3.2" />
    <circle cx="180" cy="102" r="24" fill="rgba(30,41,59,0.85)" stroke="#60a5fa" stroke-width="2.2" />
    <line x1="180" y1="126" x2="180" y2="148" stroke="#cbd5e1" stroke-width="2.4" />
    <circle cx="180" cy="172" r="24" fill="rgba(30,41,59,0.85)" stroke="#60a5fa" stroke-width="2.2" />
    <path
      d="M 180 196 L 180 201 L 166 209 L 194 221 L 166 233 L 194 245 L 166 257 L 180 260"
      fill="none"
      stroke="#94a3b8"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="180" cy="282" r="22" fill="rgba(30,41,59,0.85)" stroke="#2dd4bf" stroke-width="2.2" />
    <text x="146" y="109" text-anchor="end" font-size="16" fill="#94a3b8">甲</text>
    <text x="146" y="179" text-anchor="end" font-size="16" fill="#94a3b8">乙</text>
    <text x="146" y="289" text-anchor="end" font-size="16" fill="#94a3b8">丙</text>
    <text x="180" y="108" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f1f5f9">
      <tspan font-family="KaTeX_Main">2</tspan>
      <tspan>m</tspan>
    </text>
    <text x="180" y="178" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f1f5f9">
      <tspan font-family="KaTeX_Main">2</tspan>
      <tspan>m</tspan>
    </text>
    <text x="206" y="289" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f1f5f9">m</text>
    <text x="160" y="232" text-anchor="end" font-size="13" fill="#94a3b8">弹簧</text>
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 180, y: 282 }" :to="{ x: 180, y: 218 }" stroke="#2dd4bf" :stroke-width="4.2" />
      <text x="196" y="240" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#2dd4bf">
        <tspan>F</tspan>
        <tspan dy="3" font-size="11">弹</tspan>
      </text>
      <CourseArrow :from="{ x: 180, y: 282 }" :to="{ x: 180, y: 362 }" stroke="#f87171" :stroke-width="4.2" />
      <text x="172" y="356" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#f87171">mg</text>
      <text x="206" y="320" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#60a5fa">
        <tspan>a</tspan>
        <tspan font-family="KaTeX_Main" font-size="16" dx="4">= 0</tspan>
      </text>
    </g>
    <g v-if="step >= 3">
      <CourseArrow :from="{ x: 248, y: 104 }" :to="{ x: 248, y: 160 }" stroke="#60a5fa" :stroke-width="3.2" label="a" :label-dx="20" :label-dy="4" />
      <CourseArrow :from="{ x: 248, y: 176 }" :to="{ x: 248, y: 232 }" stroke="#60a5fa" :stroke-width="3.2" label="a" :label-dx="20" :label-dy="4" />
    </g>
  </svg>
</template>
