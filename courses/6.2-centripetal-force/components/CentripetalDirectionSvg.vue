<script setup lang="ts">
// 第 8 页：向心力的方向 —— 物体运动到圆周上不同位置，向心力都指向圆心，
// 所以它的方向时刻在改变（向心力是变力）。四个位置各画一对 v（切线）与 F_n（指向圆心）。
const O = { x: 330, y: 205 };
const R = 125;
const L = 62;

/** 四个位置：右 → 上 → 左 → 下（屏幕上逆时针），切线方向依次为 上/左/下/右 */
const points = [
  { p: { x: O.x + R, y: O.y }, v: { x: O.x + R, y: O.y - L } },
  { p: { x: O.x, y: O.y - R }, v: { x: O.x - L, y: O.y - R } },
  { p: { x: O.x - R, y: O.y }, v: { x: O.x - R, y: O.y + L } },
  { p: { x: O.x, y: O.y + R }, v: { x: O.x + L, y: O.y + R } },
].map((item) => ({
  ...item,
  f: {
    x: item.p.x + ((O.x - item.p.x) / Math.hypot(O.x - item.p.x, O.y - item.p.y)) * L,
    y: item.p.y + ((O.y - item.p.y) / Math.hypot(O.x - item.p.x, O.y - item.p.y)) * L,
  },
}));
</script>

<template>
  <svg viewBox="80 30 500 350" width="100%" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.55" />
    <circle :cx="O.x" :cy="O.y" r="3.8" fill="#94a3b8" />
    <text :x="O.x - 14" :y="O.y + 22" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#94a3b8" text-anchor="end">O</text>
    <g v-for="(item, index) in points" :key="index">
      <line :x1="O.x" :y1="O.y" :x2="item.p.x" :y2="item.p.y" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.45" />
      <CourseArrow :from="item.p" :to="item.v" stroke="#2dd4bf" :stroke-width="2.8" />
      <CourseArrow :from="item.p" :to="item.f" stroke="#e2a846" :stroke-width="3.2" />
      <circle :cx="item.p.x" :cy="item.p.y" r="6.5" fill="#f1f5f9" />
    </g>
    <text
      :x="O.x + R + 12"
      :y="O.y - L - 4"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="#2dd4bf"
      text-anchor="start"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      v
    </text>
    <text
      :x="O.x + R - L - 8"
      :y="O.y - 10"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="#e2a846"
      text-anchor="end"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      <tspan>F</tspan>
      <tspan dy="4" font-size="13">n</tspan>
    </text>
  </svg>
</template>
