<script setup lang="ts">
/** 第 7 页：椭圆的几何量——长轴 2a（长轴方向的对称轴长度）、短轴 2b、半长轴 a、半短轴 b、焦距 2c（两焦点间距的一半为 c）、 以及两个焦点；图中把 a、b、c 都标在图上，配合页面上直接给出的 c² + b² = a²（数学课后会证明，物理里直接用）。 */
/** 椭圆中心、半长轴、离心率（画得扁一些，各条线才不挤在一起） */
const C = { x: 205, y: 150 };
const A = 125;
const ECC = 0.6;
const B = A * Math.sqrt(1 - ECC * ECC);
const FC = A * ECC;
/** 两个焦点 */
const F1 = { x: C.x - FC, y: C.y };
const F2 = { x: C.x + FC, y: C.y };
/** 长轴尺寸线（画在长轴上方 26）与短轴尺寸线（画在短轴右侧 22） */
const AXIS_DIM_Y = C.y - 26;
const MINOR_DIM_X = C.x + A / 2 + 102;
const aria = "椭圆：长轴 2a、短轴 2b、半长轴 a、半短轴 b、焦距 2c，两个焦点关于中心对称。";
</script>

<template>
  <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <ellipse :cx="C.x" :cy="C.y" :rx="A" :ry="B" fill="none" stroke="#e2a846" stroke-width="2.4" opacity="0.85" />

    <line :x1="C.x - A" :y1="C.y" :x2="C.x + A" :y2="C.y" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="7 6" opacity="0.5" />
    <line :x1="C.x" :y1="C.y - B" :x2="C.x" :y2="C.y + B" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="7 6" opacity="0.5" />

    <CourseArrow :from="{ x: C.x, y: AXIS_DIM_Y }" :to="{ x: C.x - A - 4, y: AXIS_DIM_Y }" stroke="#e2a846" stroke-width="1.8" />
    <CourseArrow :from="{ x: C.x, y: AXIS_DIM_Y }" :to="{ x: C.x + A + 4, y: AXIS_DIM_Y }" stroke="#e2a846" stroke-width="1.8" />
    <CourseArrow :from="{ x: MINOR_DIM_X, y: C.y }" :to="{ x: MINOR_DIM_X, y: C.y - B - 4 }" stroke="#60a5fa" stroke-width="1.8" />
    <CourseArrow :from="{ x: MINOR_DIM_X, y: C.y }" :to="{ x: MINOR_DIM_X, y: C.y + B + 4 }" stroke="#60a5fa" stroke-width="1.8" />

    <line :x1="C.x" :y1="C.y" :x2="C.x - A" :y2="C.y" stroke="#e2a846" stroke-width="3" opacity="0.9" />
    <line :x1="C.x" :y1="C.y" :x2="C.x" :y2="C.y - B" stroke="#60a5fa" stroke-width="3" opacity="0.9" />
    <line :x1="C.x" :y1="C.y" :x2="F2.x" :y2="C.y" stroke="#f87171" stroke-width="3" opacity="0.9" />

    <rect :x="C.x" :y="C.y - 13" width="13" height="13" fill="none" stroke="#94a3b8" stroke-width="1.1" opacity="0.55" />
    <circle :cx="C.x" :cy="C.y" r="3" fill="#e2e8f0" />
    <circle :cx="F1.x" :cy="F1.y" r="5" fill="none" stroke="#f87171" stroke-width="1.8" />
    <circle :cx="F2.x" :cy="F2.y" r="5" fill="none" stroke="#f87171" stroke-width="1.8" />
    <CourseArrow :from="{ x: C.x, y: C.y + 30 }" :to="{ x: F1.x, y: C.y + 30 }" stroke="#f87171" stroke-width="1.6" />
    <CourseArrow :from="{ x: C.x, y: C.y + 30 }" :to="{ x: F2.x, y: C.y + 30 }" stroke="#f87171" stroke-width="1.6" />

    <text :x="C.x" :y="AXIS_DIM_Y - 12" text-anchor="middle" font-size="16" fill="#e2a846">
      长轴
      <tspan font-family="KaTeX_Math" font-style="italic" dx="4">2a</tspan>
    </text>
    <text :x="MINOR_DIM_X" :y="C.y + B + 26" text-anchor="middle" font-size="16" fill="#60a5fa">
      短轴
      <tspan font-family="KaTeX_Math" font-style="italic" dx="4">2b</tspan>
    </text>
    <text :x="C.x - A / 2 + 18" :y="C.y - 12" text-anchor="middle" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="#e2a846" class="eg-halo">
      a
    </text>
    <text :x="C.x + 16" :y="C.y - B / 2" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="#60a5fa" class="eg-halo">b</text>
    <text :x="C.x + FC / 2 - 4" :y="C.y - 10" text-anchor="middle" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="#f87171" class="eg-halo">
      c
    </text>
    <text :x="C.x" :y="C.y + 54" text-anchor="middle" font-size="15" fill="#f87171" class="eg-halo">
      焦距
      <tspan font-family="KaTeX_Math" font-style="italic" dx="4">2c</tspan>
    </text>
    <text :x="F1.x - 22" :y="F1.y + 6" text-anchor="middle" font-size="15" fill="#f87171" class="eg-halo">焦点</text>
    <text :x="F2.x + 24" :y="F2.y + 6" text-anchor="middle" font-size="15" fill="#f87171" class="eg-halo">焦点</text>
  </svg>
</template>

<style scoped>
/* 图内小字压在轴线/虚线上时加描边光晕 */
.eg-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
