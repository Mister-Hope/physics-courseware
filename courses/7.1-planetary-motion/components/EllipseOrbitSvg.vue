<script setup lang="ts">
/** 第 3 页：开普勒第一定律的轨道几何——椭圆轨道、太阳在右侧焦点、另一焦点空着、半长轴 a、近日点与远日点。 `showGeometry` 为 false 时只画轨道 + 太阳 + 行星（分步呈现用：先出图，再出几何标注）。 */
const { showGeometry = true } = defineProps<{ showGeometry?: boolean }>();

/** 椭圆中心、半长轴、离心率（夸张到 0.5，课本量级的椭圆肉眼看不出来） */
const C = { x: 205, y: 152 };
const A = 138;
const E = 0.5;
const B = A * Math.sqrt(1 - E * E);
/** 焦点到中心的距离 c = ae */
const FC = A * E;
/** 太阳所在焦点（右）与空着的另一焦点（左） */
const SUN = { x: C.x + FC, y: C.y };
const FOCUS_2 = { x: C.x - FC, y: C.y };
/** 近日点（离太阳最近的顶点，在右）与远日点（左） */
const PERI = { x: C.x + A, y: C.y };
const APHE = { x: C.x - A, y: C.y };
/** 行星所在位置：参数角 250°（图上左上方） */
const PLANET_ANG = 250;
const rad = (PLANET_ANG * Math.PI) / 180;
const PLANET = { x: C.x + A * Math.cos(rad), y: C.y + B * Math.sin(rad) };
/** 半长轴尺寸线（画在长轴上方 14） */
const DIM_Y = C.y - 14;
const DIM_MID = { x: C.x - A / 2, y: DIM_Y };
const aria = "椭圆轨道，太阳在右侧的一个焦点上，另一个焦点空着；长轴两端的顶点分别是近日点与远日点，半长轴记为 a。";
</script>

<template>
  <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <ellipse :cx="C.x" :cy="C.y" :rx="A" :ry="B" fill="none" stroke="#e2a846" stroke-width="2.2" opacity="0.75" />
    <g v-if="showGeometry">
      <line :x1="APHE.x" :y1="C.y" :x2="PERI.x" :y2="C.y" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.5" />
      <CourseArrow :from="DIM_MID" :to="{ x: C.x, y: DIM_Y }" stroke="#e2a846" stroke-width="1.8" />
      <CourseArrow :from="DIM_MID" :to="{ x: APHE.x + 6, y: DIM_Y }" stroke="#e2a846" stroke-width="1.8" />
      <circle :cx="FOCUS_2.x" :cy="FOCUS_2.y" r="5.5" fill="none" stroke="#94a3b8" stroke-width="1.8" opacity="0.9" />
      <line :x1="C.x - 5" :y1="C.y" :x2="C.x + 5" :y2="C.y" stroke="#94a3b8" stroke-width="1.4" opacity="0.55" />
      <line :x1="C.x" :y1="C.y - 5" :x2="C.x" :y2="C.y + 5" stroke="#94a3b8" stroke-width="1.4" opacity="0.55" />
    </g>
    <line :x1="SUN.x" :y1="SUN.y" :x2="PLANET.x" :y2="PLANET.y" stroke="#60a5fa" stroke-width="1.3" stroke-dasharray="5 5" opacity="0.45" />
    <CelestialSun :x="SUN.x" :y="SUN.y" :r="24" label="太阳" :label-size="17" />
    <CelestialPlanet :x="PLANET.x" :y="PLANET.y" :r="9" variant="blue" label="行星" :label-size="16" />
    <g v-if="showGeometry">
      <text :x="DIM_MID.x" :y="DIM_Y - 10" text-anchor="middle" font-size="20" font-family="KaTeX_Math" font-style="italic" fill="#e2a846" class="eo-halo">
        a
      </text>
      <text :x="FOCUS_2.x" :y="FOCUS_2.y + 26" text-anchor="middle" font-size="15" fill="#94a3b8" class="eo-halo">焦点</text>
      <text :x="PERI.x + 8" :y="PERI.y + 6" font-size="15" fill="#94a3b8" class="eo-halo">近日点</text>
      <text :x="APHE.x - 8" :y="APHE.y + 6" text-anchor="end" font-size="15" fill="#94a3b8" class="eo-halo">远日点</text>
    </g>
  </svg>
</template>

<style scoped>
/* 图内小字压在轨道线上时加描边光晕，保证读得清 */
.eo-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
