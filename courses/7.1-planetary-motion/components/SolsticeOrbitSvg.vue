<script setup lang="ts">
/** 练习二（二十四节气 · 地球公转）：虚线椭圆是地球的公转轨道，太阳在右侧焦点上。 冬至在长轴右端（离太阳最近，约为近日点），夏至在长轴左端（约为远日点），春分、秋分在短轴两端； 地球公转方向是逆时针（正对纸面）。点开解析后才补上“近日点 / 远日点”与公转方向箭头。 */
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();

/** 椭圆中心、半长轴、离心率 */
const C = { x: 258, y: 152 };
const A = 145;
const ECC = 0.5;
const B = A * Math.sqrt(1 - ECC * ECC);
const FC = A * ECC;
/** 太阳所在的右焦点 */
const SUN = { x: C.x + FC, y: C.y };
/** 四个节点：冬至（右，近）、春分（上）、夏至（左，远）、秋分（下） */
const WINTER = { x: C.x + A, y: C.y };
const SPRING = { x: C.x, y: C.y - B };
const SUMMER = { x: C.x - A, y: C.y };
const AUTUMN = { x: C.x, y: C.y + B };
const aria = "地球沿椭圆轨道绕太阳公转的示意图：太阳在右侧焦点上，长轴两端分别是冬至与夏至，短轴两端分别是春分与秋分，公转方向为逆时针。";
</script>

<template>
  <svg viewBox="0 0 520 300" width="340" height="196" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <ellipse :cx="C.x" :cy="C.y" :rx="A" :ry="B" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="7 6" opacity="0.75" />
    <CelestialSun :x="SUN.x" :y="SUN.y" :r="18" label="太阳" :label-size="20" />
    <circle :cx="WINTER.x" :cy="WINTER.y" r="6" fill="#7dd3fc" />
    <circle :cx="SPRING.x" :cy="SPRING.y" r="6" fill="#7dd3fc" />
    <circle :cx="SUMMER.x" :cy="SUMMER.y" r="6" fill="#7dd3fc" />
    <circle :cx="AUTUMN.x" :cy="AUTUMN.y" r="6" fill="#7dd3fc" />
    <text :x="WINTER.x + 12" :y="WINTER.y + 6" font-size="22" fill="#e2e8f0" class="so-halo">冬至</text>
    <text :x="SPRING.x + 74" :y="SPRING.y + 4" font-size="22" fill="#e2e8f0" class="so-halo">春分</text>
    <text :x="SUMMER.x - 12" :y="SUMMER.y + 6" text-anchor="end" font-size="22" fill="#e2e8f0" class="so-halo">夏至</text>
    <text :x="AUTUMN.x - 74" :y="AUTUMN.y + 6" text-anchor="end" font-size="22" fill="#e2e8f0" class="so-halo">秋分</text>
    <g v-if="showAnalysis">
      <CourseArrow :from="{ x: SUN.x + 96, y: C.y - 74 }" :to="{ x: SUN.x + 40, y: C.y - 110 }" stroke="#60a5fa" stroke-width="2.4" />
      <text :x="SUN.x + 106" :y="C.y - 62" font-size="18" fill="#60a5fa" class="so-halo">公转方向</text>
      <text :x="WINTER.x + 12" :y="WINTER.y + 30" font-size="18" fill="#e2a846" class="so-halo">近日点附近</text>
      <text :x="SUMMER.x - 12" :y="SUMMER.y + 30" text-anchor="end" font-size="18" fill="#e2a846" class="so-halo">远日点附近</text>
    </g>
  </svg>
</template>

<style scoped>
/* 图内小字压在轨道上时加描边光晕 */
.so-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
