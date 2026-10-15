<script setup lang="ts">
/**
 * 练习三（绕月探测器 · 圆轨道与椭圆轨道）：月球（半径 R）在左侧焦点上， 内圈是甲的圆形轨道（半径 R + R/2 = 1.5R），外圈是乙的椭圆轨道（近月点 A 与圆轨道相切，远月点 B 与 A 相距 6R）。 由 AB = 6R 得乙的半长轴 a = 3R；点开解析后补上 r甲 = 1.5R 与 a乙 =
 * 3R 的标注。
 */
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();

/** 月球的半径 R（用户单位）与月心位置（也是椭圆轨道的一个焦点） */
const R = 22;
const MOON = { x: 132, y: 128 };
/** 甲的圆轨道半径 r甲 = R + R/2 = 1.5R */
const R_CIRCLE = 1.5 * R;
/** 乙的椭圆：近月点 A 与圆轨道相切 ⇒ 焦距 c = r甲 = 1.5R，半长轴 a = AB/2 = 3R */
const A_SEMI = 3 * R;
const C_FOCAL = 1.5 * R;
const B_SEMI = Math.sqrt(A_SEMI ** 2 - C_FOCAL ** 2);
const ELLIPSE_CENTER = { x: MOON.x + C_FOCAL, y: MOON.y };
const A_POINT = { x: MOON.x - R_CIRCLE, y: MOON.y };
const B_POINT = { x: ELLIPSE_CENTER.x + A_SEMI, y: MOON.y };
const DIM_Y = MOON.y + 74;
const aria = "月球在左侧，内圈是甲的圆形轨道（半径 1.5R），外圈是乙的椭圆轨道，两轨道在左侧近月点 A 相切，远月点 B 与 A 相距 6R。";
</script>

<template>
  <svg viewBox="35 30 280 230" width="280" height="230" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <ellipse :cx="ELLIPSE_CENTER.x" :cy="ELLIPSE_CENTER.y" :rx="A_SEMI" :ry="B_SEMI" fill="none" stroke="#e2a846" stroke-width="2.2" opacity="0.75" />
    <circle :cx="MOON.x" :cy="MOON.y" :r="R_CIRCLE" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.8" />
    <CelestialMoon :x="MOON.x" :y="MOON.y" :r="R" />
    <circle :cx="A_POINT.x" :cy="A_POINT.y" r="4.6" fill="#7dd3fc" />
    <circle :cx="B_POINT.x" :cy="B_POINT.y" r="4.6" fill="#7dd3fc" />
    <text :x="A_POINT.x - 10" :y="A_POINT.y + 6" text-anchor="end" font-size="17" fill="#7dd3fc" class="mo-halo">A</text>
    <text :x="B_POINT.x + 10" :y="B_POINT.y + 6" font-size="17" fill="#7dd3fc" class="mo-halo">B</text>
    <text :x="MOON.x" :y="MOON.y - R_CIRCLE - 10" text-anchor="middle" font-size="17" fill="#60a5fa" class="mo-halo">甲（圆）</text>
    <text :x="ELLIPSE_CENTER.x + 18" :y="MOON.y - B_SEMI - 10" text-anchor="middle" font-size="17" fill="#e2a846" class="mo-halo">乙（椭圆）</text>

    <CourseArrow :from="{ x: (A_POINT.x + B_POINT.x) / 2, y: DIM_Y }" :to="{ x: A_POINT.x, y: DIM_Y }" stroke="#94a3b8" stroke-width="1.6" />
    <CourseArrow :from="{ x: (A_POINT.x + B_POINT.x) / 2, y: DIM_Y }" :to="{ x: B_POINT.x, y: DIM_Y }" stroke="#94a3b8" stroke-width="1.6" />
    <text :x="(A_POINT.x + B_POINT.x) / 2" :y="DIM_Y + 22" text-anchor="middle" font-size="16" fill="#94a3b8" class="mo-halo">
      AB = 6
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
    </text>
    <g v-if="showAnalysis">
      <line :x1="MOON.x" :y1="MOON.y" :x2="A_POINT.x" :y2="A_POINT.y" stroke="#60a5fa" stroke-width="1.8" stroke-dasharray="5 4" />
      <text :x="(MOON.x + A_POINT.x) / 2" :y="MOON.y + 34" text-anchor="middle" font-size="15" fill="#60a5fa" class="mo-halo">
        <tspan font-family="KaTeX_Math" font-style="italic">r</tspan>
        甲 = 1.5
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      </text>
      <text :x="(A_POINT.x + B_POINT.x) / 2" :y="DIM_Y - 12" text-anchor="middle" font-size="15" fill="#e2a846" class="mo-halo">
        <tspan font-family="KaTeX_Math" font-style="italic">a</tspan>
        乙 = 3
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
/* 图内小字压在轨道上时加描边光晕 */
.mo-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
