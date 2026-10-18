<script setup lang="ts">
/**
 * 第 2 页：正点电荷的电场线与等势线（教材「问题」的观察图）。
 *
 * 12 条径向电场线箭头 + 5 个同心等势圆。等势圆半径按「相邻等势线电势差相等」取： 点电荷 V ∝ 1/r，取 1/r 等间距 ⇒ r = [125, 91, 71, 59, 50]，半径间隔向内依次减小—— 靠近电荷处两种线都更密，正是本页要学生观察到的现象。
 */
const CX = 155;
const CY = 150;
/** 等势圆半径（用户单位）：由 1/r 等差反推，相邻两圆电势差相等 */
const RADII = [125, 91, 71, 59, 50];
const LINES = 12;
const R_FROM = 30;
const R_TO = 142;

const pointAt = (angle: number, r: number): { x: number; y: number } => ({
  x: CX + r * Math.cos(angle),
  y: CY + r * Math.sin(angle),
});

const fieldArrows = Array.from({ length: LINES }, (_, index) => {
  const angle = (index * Math.PI * 2) / LINES;

  return { from: pointAt(angle, R_FROM), to: pointAt(angle, R_TO) };
});
</script>

<template>
  <svg
    viewBox="0 0 340 300"
    width="340"
    height="300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="正点电荷的电场线与等势线：越靠近电荷，两种线都越密"
  >
    <circle
      v-for="(r, index) in RADII"
      :key="'eq-' + index"
      :cx="CX"
      :cy="CY"
      :r="r"
      fill="none"
      stroke="var(--c-physics)"
      stroke-width="2"
      stroke-dasharray="7 6"
      opacity="0.85"
    />
    <CourseArrow
      v-for="(arrow, index) in fieldArrows"
      :key="'f-' + index"
      :from="arrow.from"
      :to="arrow.to"
      stroke="var(--c-field)"
      stroke-width="2"
      opacity="0.7"
    />
    <circle :cx="CX" :cy="CY" r="15" fill="rgba(248,113,113,0.22)" stroke="var(--c-force)" stroke-width="2.4" />
    <text :x="CX" :y="CY" fill="var(--c-force)" font-size="22" font-family="KaTeX_Main" text-anchor="middle" dominant-baseline="central">+</text>
  </svg>
</template>
