<!-- 任意两个物体的相互吸引（第 7 页）：引力沿两物体连线，与 m1 m2 成正比、与 r^2 成反比 -->
<script setup lang="ts">
/** 两球球心 */
const LEFT = { x: 150, y: 82 };
const RIGHT = { x: 410, y: 82 };
const BODY_R = 34;
/** 两个力箭头在连线中点前后各停一步，避免完全重叠 */
const MEET_LEFT = 274;
const MEET_RIGHT = 286;
</script>

<template>
  <svg viewBox="0 0 560 150" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- 两球心之间的距离 -->
    <line :x1="LEFT.x" y1="26" :x2="RIGHT.x" y2="26" stroke="rgba(148,163,184,0.55)" stroke-width="1.5" stroke-dasharray="6 5" />
    <line :x1="LEFT.x" y1="18" :x2="LEFT.x" y2="34" stroke="rgba(148,163,184,0.55)" stroke-width="1.5" />
    <line :x1="RIGHT.x" y1="18" :x2="RIGHT.x" y2="34" stroke="rgba(148,163,184,0.55)" stroke-width="1.5" />
    <text
      :x="(LEFT.x + RIGHT.x) / 2"
      y="14"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      fill="#e2e8f0"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      r
    </text>

    <!-- 两个物体 -->
    <circle :cx="LEFT.x" :cy="LEFT.y" :r="BODY_R" fill="rgba(96,165,250,0.16)" stroke="#60a5fa" stroke-width="2.4" />
    <circle :cx="RIGHT.x" :cy="RIGHT.y" :r="BODY_R" fill="rgba(226,168,70,0.16)" stroke="#e2a846" stroke-width="2.4" />

    <!-- 两球球心：质量分布均匀的球体之间的万有引力，可以看成两球心处质点之间的引力 -->
    <circle :cx="LEFT.x" :cy="LEFT.y" r="3" fill="#e2e8f0" />
    <circle :cx="RIGHT.x" :cy="RIGHT.y" r="3" fill="#e2e8f0" />

    <!-- 双方受到的引力：都从各自几何中心出发，沿连线指向对方 -->
    <CourseArrow :from="LEFT" :to="{ x: MEET_LEFT, y: LEFT.y }" stroke="#f87171" :stroke-width="3.2" label="F" :label-dx="-4" :label-dy="-22" />
    <CourseArrow :from="RIGHT" :to="{ x: MEET_RIGHT, y: RIGHT.y }" stroke="#f87171" :stroke-width="3.2" label="F′" :label-dx="4" :label-dy="30" />

    <!-- 质量标注 -->
    <text :x="LEFT.x" y="134" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="#e2e8f0">
      m
      <tspan dy="6" font-size="16">1</tspan>
    </text>
    <text :x="RIGHT.x" y="134" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="#e2e8f0">
      m
      <tspan dy="6" font-size="16">2</tspan>
    </text>
  </svg>
</template>
