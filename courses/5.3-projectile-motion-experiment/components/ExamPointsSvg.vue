<script setup lang="ts">
/** 第 6–8 页：频闪照片上的 A、B、C 三点（带坐标尺）。 直接手写坐标系而不用 `CoordAxes`：平抛的 y 轴竖直**向下**为正，`CoordAxes` 的纵轴只能向上， 画出来箭头方向与物理约定相反；这里用 `CourseArrow` 画轴与箭头，刻度按 cm 标。 */
import { computed } from "vue";

/** 三点坐标（单位 cm）：A 为原点，y 竖直向下为正 */
const pointA = { x: 0, y: 0 };
const pointB = { x: 30, y: 20 };
const C = { x: 60, y: 50 };
/** 原点在 viewBox 里的位置与每 cm 的像素数 */
const OX = 72;
const OY = 56;
const UX = 6;
const UY = 5;
const toSvg = (point: { x: number; y: number }): { x: number; y: number } => ({ x: OX + point.x * UX, y: OY + point.y * UY });
const px = { pointA: toSvg(pointA), pointB: toSvg(pointB), pointC: toSvg(C) };
/** 刻度（cm） */
const xTicks = [10, 20, 30, 40, 50, 60];
const yTicks = [10, 20, 30, 40, 50];
const xGrid = computed(() => xTicks.map((v) => ({ v, x: OX + v * UX })));
const yGrid = computed(() => yTicks.map((v) => ({ v, y: OY + v * UY })));
const AXIS_END_X = OX + 66 * UX;
const AXIS_END_Y = OY + 54 * UY;
</script>

<template>
  <svg viewBox="0 0 560 380" width="100%" style="max-width: 520px" xmlns="http://www.w3.org/2000/svg">
    <g stroke="rgba(148,163,184,0.13)" stroke-width="1.2">
      <line v-for="tick in xGrid" :key="`gx-${tick.v}`" :x1="tick.x" :y1="OY" :x2="tick.x" :y2="AXIS_END_Y + 10" />
      <line v-for="tick in yGrid" :key="`gy-${tick.v}`" :x1="OX" :y1="tick.y" :x2="AXIS_END_X + 6" :y2="tick.y" />
    </g>
    <g stroke="rgba(148,163,184,0.4)" stroke-width="1.4" stroke-dasharray="6 5">
      <line :x1="OX" :y1="px.pointB.y" :x2="px.pointB.x" :y2="px.pointB.y" />
      <line :x1="px.pointB.x" :y1="OY" :x2="px.pointB.x" :y2="px.pointB.y" />
      <line :x1="OX" :y1="px.pointC.y" :x2="px.pointC.x" :y2="px.pointC.y" />
      <line :x1="px.pointC.x" :y1="OY" :x2="px.pointC.x" :y2="px.pointC.y" />
    </g>
    <CourseArrow :from="{ x: OX, y: OY }" :to="{ x: AXIS_END_X, y: OY }" stroke="#94a3b8" :stroke-width="2" />
    <CourseArrow :from="{ x: OX, y: OY }" :to="{ x: OX, y: AXIS_END_Y }" stroke="#94a3b8" :stroke-width="2" />
    <text :x="AXIS_END_X + 8" :y="OY + 7" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#cbd5e1">x</text>
    <text :x="AXIS_END_X + 22" :y="OY + 7" font-family="KaTeX_Main" font-size="16" fill="#94a3b8">/cm</text>
    <text :x="OX - 34" :y="AXIS_END_Y + 6" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#cbd5e1">y</text>
    <text :x="OX - 6" :y="AXIS_END_Y + 6" text-anchor="end" font-family="KaTeX_Main" font-size="16" fill="#94a3b8">/cm</text>
    <text v-for="tick in xGrid" :key="`tx-${tick.v}`" :x="tick.x" :y="OY + 22" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="#94a3b8">
      {{ tick.v }}
    </text>
    <text v-for="tick in yGrid" :key="`ty-${tick.v}`" :x="OX - 14" :y="tick.y + 5" text-anchor="end" font-family="KaTeX_Main" font-size="15" fill="#94a3b8">
      {{ tick.v }}
    </text>
    <circle :cx="px.pointA.x" :cy="px.pointA.y" r="6" fill="#e2a846" />
    <circle :cx="px.pointB.x" :cy="px.pointB.y" r="6" fill="#e2a846" />
    <circle :cx="px.pointC.x" :cy="px.pointC.y" r="6" fill="#e2a846" />
    <text :x="px.pointA.x + 16" :y="px.pointA.y + 28" font-size="19" font-weight="700" fill="#f1f5f9">A</text>
    <text :x="px.pointB.x + 14" :y="px.pointB.y - 12" font-size="19" font-weight="700" fill="#f1f5f9">B</text>
    <text :x="px.pointC.x + 14" :y="px.pointC.y - 12" font-size="19" font-weight="700" fill="#f1f5f9">C</text>
  </svg>
</template>
