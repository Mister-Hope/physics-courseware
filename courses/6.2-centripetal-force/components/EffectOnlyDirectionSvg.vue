<script setup lang="ts">
// 第 6 页：向心力的作用效果 —— 与速度方向始终垂直，速率不变、方向不断改变。
// v 与 F_n 在球处成直角（画出直角符号），直观说明"沿速度方向的分量为 0"。
const O = { x: 215, y: 155 };
const R = 100;
/** 速度箭头 / 向心力箭头长度（向心力画短一些，避开圆心标注） */
const V_LEN = 84;
const F_LEN = 62;

/** 小球位置（圆周上 45° 方向） */
const P = { x: O.x + R * Math.SQRT1_2, y: O.y - R * Math.SQRT1_2 };

/** 速度：沿切线（取屏幕右下方向） */
const V = { x: P.x + V_LEN * Math.SQRT1_2, y: P.y + V_LEN * Math.SQRT1_2 };
/** 向心力：指向圆心 */
const F = { x: P.x - F_LEN * Math.SQRT1_2, y: P.y + F_LEN * Math.SQRT1_2 };

/** 直角符号的三个顶点（沿两箭头内侧 24 单位） */
const uV = { x: Math.SQRT1_2, y: Math.SQRT1_2 };
const uF = { x: -Math.SQRT1_2, y: Math.SQRT1_2 };
const L = 24;
const RA = { x: P.x + L * uV.x, y: P.y + L * uV.y };
const RB = { x: RA.x + L * uF.x, y: RA.y + L * uF.y };
const RC = { x: P.x + L * uF.x, y: P.y + L * uF.y };
</script>

<template>
  <svg viewBox="100 40 300 250" width="100%" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="7 6" opacity="0.6" />
    <circle :cx="O.x" :cy="O.y" r="3.6" fill="var(--c-text-dim)" />
    <text :x="O.x - 14" :y="O.y + 22" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text-dim)" text-anchor="end">O</text>
    <line :x1="O.x" :y1="O.y" :x2="P.x" :y2="P.y" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="6 5" opacity="0.6" />
    <CourseArrow :from="P" :to="V" stroke="var(--c-physics)" :stroke-width="3.2" />
    <CourseArrow :from="P" :to="F" stroke="var(--c-accent)" :stroke-width="3.2" />
    <path :d="`M ${RA.x} ${RA.y} L ${RB.x} ${RB.y} L ${RC.x} ${RC.y}`" fill="none" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.9" />
    <text
      :x="V.x + 10"
      :y="V.y + 10"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="var(--c-physics)"
      text-anchor="start"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      v
    </text>
    <text
      :x="F.x + 8"
      :y="F.y + 30"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="var(--c-accent)"
      text-anchor="start"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      <tspan>F</tspan>
      <tspan dy="4" font-size="14">n</tspan>
    </text>
    <circle :cx="P.x" :cy="P.y" r="7.5" fill="var(--c-text)" />
  </svg>
</template>
