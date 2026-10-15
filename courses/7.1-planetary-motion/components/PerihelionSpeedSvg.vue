<script setup lang="ts">
/** 第 10 页：近日点与远日点的速度关系。 行星在近日点（离太阳最近，R₁ 最小）与远日点（R₂ 最大）的速度方向都与连线垂直， 由“相等时间扫过相等面积”推得 R₁V₁ = R₂V₂——近的点速度大、远的点速度小，图上用箭头长短直接体现。 */
/** 椭圆中心、半长轴、离心率 */
const C = { x: 205, y: 150 };
const A = 128;
const ECC = 0.66;
const B = A * Math.sqrt(1 - ECC * ECC);
const FC = A * ECC;
/** 太阳所在的右焦点；近日点在右顶点、远日点在左顶点 */
const SUN = { x: C.x + FC, y: C.y };
const PERI = { x: C.x + A, y: C.y };
const APHE = { x: C.x - A, y: C.y };
/** 两个位置的速度箭头：近日点速度大（箭头长）、远日点速度小（箭头短），都垂直于连线 */
const V_PERI_LEN = 56;
const V_APHE_LEN = 26;
const aria = "椭圆轨道：太阳在右侧焦点，近日点到太阳的距离 R₁ 最小、速度 V₁ 最大；远日点距离 R₂ 最大、速度 V₂ 最小；两处速度都与连线垂直。";
</script>

<template>
  <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <ellipse :cx="C.x" :cy="C.y" :rx="A" :ry="B" fill="none" stroke="#e2a846" stroke-width="2.2" opacity="0.75" />
    <line :x1="APHE.x" :y1="C.y" :x2="PERI.x" :y2="C.y" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.5" />

    <CelestialPlanet :x="PERI.x" :y="PERI.y" :r="7" variant="blue" />
    <CelestialPlanet :x="APHE.x" :y="APHE.y" :r="7" variant="blue" />
    <CourseArrow :from="PERI" :to="{ x: PERI.x, y: PERI.y + V_PERI_LEN }" stroke="#7dd3fc" stroke-width="3" />
    <CourseArrow :from="APHE" :to="{ x: APHE.x, y: APHE.y - V_APHE_LEN }" stroke="#7dd3fc" stroke-width="3" />

    <CelestialSun :x="SUN.x" :y="SUN.y" :r="20" />

    <text :x="PERI.x + 6" :y="C.y + 26" font-size="17" fill="#e2a846" class="ps-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-size="12" dy="4">1</tspan>
    </text>
    <text x="150" :y="C.y - 12" text-anchor="middle" font-size="17" fill="#e2a846" class="ps-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-size="12" dy="4">2</tspan>
    </text>
    <text :x="PERI.x - 12" :y="PERI.y + V_PERI_LEN + 4" text-anchor="end" font-size="17" fill="#7dd3fc" class="ps-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">V</tspan>
      <tspan font-size="12" dy="4">1</tspan>
    </text>
    <text :x="APHE.x + 12" :y="APHE.y - V_APHE_LEN - 4" font-size="17" fill="#7dd3fc" class="ps-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">V</tspan>
      <tspan font-size="12" dy="4">2</tspan>
    </text>
    <text :x="PERI.x + 6" :y="PERI.y - 26" font-size="15" fill="#94a3b8" class="ps-halo">近日点</text>
    <text :x="APHE.x - 6" :y="APHE.y - 26" text-anchor="end" font-size="15" fill="#94a3b8" class="ps-halo">远日点</text>
    <text :x="SUN.x - 4" :y="SUN.y + 62" text-anchor="end" font-size="16" fill="#fbbf24" class="ps-halo">太阳</text>
  </svg>
</template>

<style scoped>
/* 图内小字压在轨道/箭头上时加描边光晕 */
.ps-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
