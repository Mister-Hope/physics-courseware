<!--
  P1 / P13 封面装饰（course-cover 的默认插槽 → 右下角 .cover-decoration）
  —— 一片由少量金色实心点暗示的匀强磁场（垂直纸面向外，3×3），
     两条从同一点出发、半径不同的半圆轨迹（金色半径小、蓝色半径大），轨迹上各放一个带电小球：
     暗示"同一处出发、按质量分开落点"，但整体压暗、不给任何具体数值，不与封面标题争视线。
-->
<script setup lang="ts">
/** 两条半圆都从同一点出发、沿同一条水平基线向上凸起，只是半径不同 */
const BASE_X = 86;
const BASE_Y = 124;

/** 半径 r 的半圆：起点 (BASE_X, BASE_Y) → 终点 (BASE_X + 2r, BASE_Y)，向上凸起 */
const arcPath = (r: number): string => `M ${BASE_X} ${BASE_Y} A ${r} ${r} 0 0 1 ${BASE_X + 2 * r} ${BASE_Y}`;

const ARCS = [
  { r: 40, color: "var(--c-accent)", d: arcPath(40) },
  { r: 66, color: "var(--c-accent-2)", d: arcPath(66) },
];

/** 小球相位（屏幕坐标 y 向下）：两条弧上各一个，半径越大位置越靠外 */
const BALL_ANGLE = (-55 * Math.PI) / 180;
const BALLS = ARCS.map((arc) => ({
  color: arc.color,
  x: BASE_X + arc.r * (1 + Math.cos(BALL_ANGLE)),
  y: BASE_Y + arc.r * Math.sin(BALL_ANGLE),
}));
</script>

<template>
  <svg viewBox="0 0 260 170" width="300" xmlns="http://www.w3.org/2000/svg" class="fig-svg cd-cover" role="img" aria-label="匀强磁场中两条半径不同的半圆轨迹">
    <g opacity="0.7">
      <!-- 少量金色实心点＝垂直纸面向外的匀强磁场（裸点，不套圈） -->
      <FieldDots :x="110" :y="50" :cols="3" :rows="3" :spacing="30" dir="out" :size="5" :opacity="0.8" />
      <!-- 粒子自左侧水平射入，两条轨迹共用同一个出发点 -->
      <line x1="58" y1="124" x2="82" y2="124" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="6 5" stroke-linecap="round" />
      <circle cx="86" cy="124" r="3" fill="var(--c-text-dim)" />
      <path v-for="arc in ARCS" :key="arc.r" :d="arc.d" fill="none" :stroke="arc.color" stroke-width="2.6" stroke-linecap="round" />
      <circle v-for="ball in BALLS" :key="ball.color" :cx="ball.x" :cy="ball.y" r="4.4" :fill="ball.color" />
    </g>
  </svg>
</template>

<style scoped>
.fig-svg {
  display: block;
  margin: 0 auto;
}

.cd-cover {
  max-width: 100%;
}
</style>
