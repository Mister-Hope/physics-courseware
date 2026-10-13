<script setup lang="ts">
// 第 19 页：把绳的拉力 F 分解为切向分力 F_t（改变速度大小）与法向分力 F_n（改变速度方向）。
// step ≥ 1：先出与速度同向的 F_t；step ≥ 2：再出指向圆心的 F_n 与分解用的虚线。
const { step = 0 } = defineProps<{ step?: number }>();

const O = { x: 360, y: 220 };
/** 沙袋位置（几何中心） */
const P = { x: 261, y: 121 };
/** 速度（沿切线） */
const V = { x: 197, y: 185 };
/** 绳的拉力 */
const F = { x: 311, y: 257 };
/** 法向分力：指向圆心 */
const FN = { x: 354, y: 214 };
/** 切向分力：与速度同向（使沙袋越来越快） */
const FT = { x: 218, y: 164 };
/** 绳画到拉力箭头之外，末端画一只手 */
const HAND = { x: 327, y: 299 };
</script>

<template>
  <svg viewBox="100 40 440 340" width="100%" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="O.x" :cy="O.y" r="140" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.55" />
    <circle :cx="O.x" :cy="O.y" r="3.8" fill="#94a3b8" />
    <text :x="O.x - 12" :y="O.y - 6" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#94a3b8" text-anchor="end">O</text>
    <line :x1="P.x" :y1="P.y" :x2="HAND.x" :y2="HAND.y" stroke="#94a3b8" stroke-width="2.4" stroke-linecap="round" />
    <circle :cx="HAND.x" :cy="HAND.y" r="12" fill="rgba(148,163,184,0.28)" stroke="#94a3b8" stroke-width="1.8" />
    <CourseArrow :from="P" :to="V" stroke="#2dd4bf" :stroke-width="3" />
    <g v-if="step >= 1">
      <line :x1="FT.x" :y1="FT.y" :x2="F.x" :y2="F.y" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.8" />
      <CourseArrow :from="P" :to="FT" stroke="#a78bfa" :stroke-width="3.4" />
      <text
        :x="FT.x - 12"
        :y="FT.y - 10"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="#a78bfa"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="14">t</tspan>
      </text>
    </g>
    <g v-if="step >= 2">
      <line :x1="FN.x" :y1="FN.y" :x2="F.x" :y2="F.y" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.8" />
      <CourseArrow :from="P" :to="FN" stroke="#e2a846" :stroke-width="3.4" />
      <text
        :x="FN.x + 2"
        :y="FN.y + 34"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="#e2a846"
        text-anchor="start"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="14">n</tspan>
      </text>
    </g>
    <CourseArrow :from="P" :to="F" stroke="#60a5fa" :stroke-width="3.4" />
    <text
      :x="F.x - 18"
      :y="F.y + 26"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="#60a5fa"
      text-anchor="end"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      F
    </text>
    <text
      :x="V.x - 12"
      :y="V.y + 14"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="#2dd4bf"
      text-anchor="end"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      v
    </text>
    <circle :cx="P.x" :cy="P.y" r="9" fill="#3a2f14" stroke="#e2a846" stroke-width="1.8" />
  </svg>
</template>
