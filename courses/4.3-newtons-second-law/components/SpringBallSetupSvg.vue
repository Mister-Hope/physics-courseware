<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 13 页：轻质托盘弹簧小球下落模型的情境图——竖直固定的轻弹簧托着向下凹（两端翘起）的轻质托盘，托盘正上方高 h 处有一个质量为 m 的小球；重力 G 属分析标注，受 showForces 控制（默认不显示） -->
  <svg viewBox="0 0 360 320" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <SurfaceHatch :from="{ x: 20, y: 270 }" :to="{ x: 340, y: 270 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <rect x="160" y="264" width="40" height="6" rx="2" fill="rgba(148,163,184,0.25)" stroke="rgba(148,163,184,0.6)" stroke-width="1.6" />
    <path
      d="M 180 193 L 166 202 L 194 211 L 166 220 L 194 229 L 166 238 L 194 247 L 166 256 L 180 264"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M 138 168 L 180 186 L 222 168 L 222 175 L 180 193 L 138 175 Z"
      fill="rgba(203,213,225,0.18)"
      stroke="#cbd5e1"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <line x1="184" y1="75" x2="240" y2="75" stroke="rgba(148,163,184,0.7)" stroke-width="1.8" />
    <line x1="224" y1="186" x2="240" y2="186" stroke="rgba(148,163,184,0.7)" stroke-width="1.8" />
    <line x1="234" y1="75" x2="234" y2="186" stroke="rgba(148,163,184,0.75)" stroke-width="1.8" stroke-dasharray="7 5" />
    <text x="246" y="131" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#f1f5f9" stroke="#0f1425" stroke-width="3" paint-order="stroke">
      h
    </text>
    <circle cx="180" cy="55" r="20" fill="rgba(96,165,250,0.3)" stroke="#60a5fa" stroke-width="3" />
    <text x="180" y="51" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#f1f5f9" text-anchor="middle">m</text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 180, y: 55 }" :to="{ x: 180, y: 155 }" stroke="#f87171" stroke-width="3.2" />
      <text
        x="164"
        y="105"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="#f87171"
        text-anchor="end"
        dominant-baseline="middle"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        G
        <tspan font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#94a3b8" dx="4">= mg</tspan>
      </text>
    </g>
    <text x="130" y="182" font-size="13" fill="#cbd5e1" text-anchor="end">轻质托盘</text>
    <text x="212" y="232" font-size="13" fill="#cbd5e1">轻弹簧</text>
  </svg>
</template>
