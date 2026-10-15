<script setup lang="ts">
/** 第 5 页：开普勒第一定律的轨道图——行星沿椭圆轨道绕太阳运行，太阳画在椭圆的一个焦点上（不在中心）。 `showGeometry` 为 false 时只画轨道、太阳与行星；为 true 时补上中心十字与另一个空着的焦点， 让学生一眼看出“太阳不在椭圆的中心”。 */
const { showGeometry = true } = defineProps<{ showGeometry?: boolean }>();

/** 椭圆中心、半长轴、离心率（夸张到 0.5，课本量级的椭圆肉眼看不出来） */
const C = { x: 180, y: 145 };
const A = 118;
const E = 0.5;
const B = A * Math.sqrt(1 - E * E);
/** 焦点到中心的距离 c = ae */
const FC = A * E;
/** 太阳所在焦点（右）与空着的另一焦点（左） */
const SUN = { x: C.x + FC, y: C.y };
const FOCUS_2 = { x: C.x - FC, y: C.y };
/** 行星所在位置：参数角 250°（图上左上方） */
const PLANET_ANG = 250;
const rad = (PLANET_ANG * Math.PI) / 180;
const PLANET = { x: C.x + A * Math.cos(rad), y: C.y + B * Math.sin(rad) };
const aria = "椭圆轨道：行星沿椭圆绕太阳运行，太阳在椭圆右侧的一个焦点上，椭圆的中心与另一个焦点都是空的。";
</script>

<template>
  <svg viewBox="0 0 380 290" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <ellipse :cx="C.x" :cy="C.y" :rx="A" :ry="B" fill="none" stroke="#e2a846" stroke-width="2.4" opacity="0.8" />
    <g v-if="showGeometry">
      <line :x1="C.x - A" :y1="C.y" :x2="C.x + A" :y2="C.y" stroke="#94a3b8" stroke-width="1.1" stroke-dasharray="6 6" opacity="0.35" />
      <circle :cx="FOCUS_2.x" :cy="FOCUS_2.y" r="5.5" fill="none" stroke="#94a3b8" stroke-width="1.8" opacity="0.85" />
      <line :x1="C.x - 5" :y1="C.y" :x2="C.x + 5" :y2="C.y" stroke="#94a3b8" stroke-width="1.4" opacity="0.6" />
      <line :x1="C.x" :y1="C.y - 5" :x2="C.x" :y2="C.y + 5" stroke="#94a3b8" stroke-width="1.4" opacity="0.6" />
      <text :x="C.x" :y="C.y + 26" text-anchor="middle" font-size="15" fill="#94a3b8" class="eo-halo">中心</text>
      <text :x="FOCUS_2.x" :y="FOCUS_2.y + 26" text-anchor="middle" font-size="15" fill="#94a3b8" class="eo-halo">焦点</text>
    </g>
    <line :x1="SUN.x" :y1="SUN.y" :x2="PLANET.x" :y2="PLANET.y" stroke="#60a5fa" stroke-width="1.3" stroke-dasharray="5 5" opacity="0.5" />
    <CelestialSun :x="SUN.x" :y="SUN.y" :r="24" label="太阳" :label-size="17" />
    <CelestialPlanet :x="PLANET.x" :y="PLANET.y" :r="9" variant="blue" label="行星" :label-size="16" />
  </svg>
</template>

<style scoped>
/* 图内小字压在轨道/虚线上时加描边光晕 */
.eo-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
