<script setup lang="ts">
/** 封面装饰（7.1 行星的运动）：太阳在椭圆的一个焦点上，一颗行星沿椭圆轨道运行，虚线圈出的长轴与另一焦点说明“太阳不在中心”。 只作装饰，尺寸与位置由 course-cover 的右下角插槽决定。 */
const C = { x: 124, y: 92 };
/** 半长轴（夸张一点，封面上要看得出是椭圆） */
const A = 68;
/** 离心率 */
const E = 0.46;
const B = A * Math.sqrt(1 - E * E);
const C_FOCAL = A * E;
/** 太阳所在的焦点（左侧）与空着的另一焦点 */
const SUN = { x: C.x - C_FOCAL, y: C.y };
const OTHER_FOCUS = { x: C.x + C_FOCAL, y: C.y };
/** 行星在轨道上的位置（参数角）与它的切线方向 */
const ANG = 208;
const rad = (ANG * Math.PI) / 180;
const PLANET = { x: C.x + A * Math.cos(rad), y: C.y + B * Math.sin(rad) };
</script>

<template>
  <svg viewBox="0 0 248 184" width="250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse :cx="C.x" :cy="C.y" :rx="A" :ry="B" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="7 6" opacity="0.42" />
    <line :x1="C.x - A" :y1="C.y" :x2="C.x + A" :y2="C.y" stroke="currentColor" stroke-width="1" stroke-dasharray="3 5" opacity="0.25" />
    <circle :cx="OTHER_FOCUS.x" :cy="OTHER_FOCUS.y" r="3" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.45" />
    <line :x1="SUN.x" :y1="SUN.y" :x2="PLANET.x" :y2="PLANET.y" stroke="#60a5fa" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.5" />
    <CelestialSun :x="SUN.x" :y="SUN.y" :r="21" />
    <CelestialPlanet :x="PLANET.x" :y="PLANET.y" :r="10" variant="blue" />
  </svg>
</template>
