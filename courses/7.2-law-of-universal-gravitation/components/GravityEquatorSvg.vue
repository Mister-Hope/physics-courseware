<!-- 重力与万有引力（第 11 页，赤道）：赤道上三个力方向相同，万有引力提供重力和随地球自转所需的向心力 —— F引 = mg + F向，所以测得的重力略小于万有引力（图中已把向心力放大） -->
<script setup lang="ts">
/** 地球与赤道上的物体 */
const EARTH = { x: 270, y: 165 };
const EARTH_R = 105;
const OBJECT = { x: EARTH.x + EARTH_R, y: EARTH.y };

/** 三条力的箭头：都从物体指向地心方向（赤道上三者方向相同），纵向错开一点方便看清 */
const ARROW_LEN = { gravity: 160, weight: 130, centripetal: 30 };
/**
 * 由箭头长度与纵向偏移，生成一条从物体出发、指向地心方向的力
 *
 * @param length 箭头长度（viewBox 用户单位）
 * @param dy 相对物体中心的纵向偏移（为了三条力错开看清）
 * @returns 箭头起点与终点
 */
const arrow = (length: number, dy: number): { from: { x: number; y: number }; to: { x: number; y: number } } => ({
  from: { x: OBJECT.x, y: OBJECT.y + dy },
  to: { x: OBJECT.x - length, y: OBJECT.y + dy },
});
const gravityArrow = arrow(ARROW_LEN.gravity, -15);
const weightArrow = arrow(ARROW_LEN.weight, 3);
const centripetalArrow = arrow(ARROW_LEN.centripetal, 21);
</script>

<template>
  <svg viewBox="0 0 560 330" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- 地轴与自转 -->
    <line :x1="EARTH.x" y1="18" :x2="EARTH.x" y2="300" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" stroke-dasharray="7 6" />
    <text :x="EARTH.x" y="14" text-anchor="middle" font-size="15" fill="#94a3b8">地轴</text>
    <ellipse :cx="EARTH.x" cy="52" rx="64" ry="18" fill="none" stroke="rgba(96,165,250,0.6)" stroke-width="1.6" stroke-dasharray="5 5" />
    <polygon :points="`${EARTH.x + 64},52 ${EARTH.x + 55},46 ${EARTH.x + 57},59`" fill="#60a5fa" />

    <!-- 赤道 -->
    <line
      :x1="EARTH.x - EARTH_R + 6"
      :y1="EARTH.y"
      :x2="EARTH.x + EARTH_R - 6"
      :y2="EARTH.y"
      stroke="rgba(148,163,184,0.4)"
      stroke-width="1.4"
      stroke-dasharray="6 5"
    />
    <text :x="EARTH.x - EARTH_R - 6" :y="EARTH.y + 6" text-anchor="end" font-size="15" fill="#94a3b8">赤道</text>

    <CelestialEarth :x="EARTH.x" :y="EARTH.y" :r="EARTH_R" />
    <text :x="EARTH.x - 14" y="300" text-anchor="end" font-size="15" fill="#94a3b8">地球</text>

    <!-- 赤道上的物体 -->
    <circle :cx="OBJECT.x" :cy="OBJECT.y" r="10" fill="rgba(226,168,70,0.25)" stroke="#e2a846" stroke-width="2.4" />

    <!-- 三个力：方向都指向地心 -->
    <CourseArrow :from="gravityArrow.from" :to="gravityArrow.to" stroke="#f87171" :stroke-width="3.4" />
    <CourseArrow :from="weightArrow.from" :to="weightArrow.to" stroke="#e2a846" :stroke-width="3.4" />
    <CourseArrow :from="centripetalArrow.from" :to="centripetalArrow.to" stroke="#60a5fa" :stroke-width="3.4" />

    <text :x="OBJECT.x + 18" :y="OBJECT.y - 12" font-size="16" fill="#f87171">万有引力</text>
    <text :x="OBJECT.x + 18" :y="OBJECT.y + 8" font-size="16" fill="#e2a846">重力</text>
    <text :x="OBJECT.x + 18" :y="OBJECT.y + 28" font-size="16" fill="#60a5fa">向心力</text>
  </svg>
</template>
