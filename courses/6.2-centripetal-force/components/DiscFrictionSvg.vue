<script setup lang="ts">
// 第 14 页：圆盘上随盘一起转动的小物块（俯视）。
// showForces：画出物块受到的静摩擦力 —— 它沿半径指向圆心，就是物块做圆周运动的向心力。
const { showForces = false } = defineProps<{ showForces?: boolean }>();

const O = { x: 230, y: 168 };
/** 物块位置 */
const P = { x: 301, y: 113 };

const dir = (() => {
  const dx = O.x - P.x;
  const dy = O.y - P.y;
  const len = Math.hypot(dx, dy);

  return { x: dx / len, y: dy / len };
})();

/** 静摩擦力：指向圆心 */
const F = { x: P.x + dir.x * 62, y: P.y + dir.y * 62 };
</script>

<template>
  <svg viewBox="40 20 420 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="O.x" :cy="O.y" r="126" fill="rgba(148,163,184,0.07)" stroke="#64748b" stroke-width="1.8" />
    <path d="M 197.6 47.3 A 126 126 0 0 1 292.5 59.7" fill="none" stroke="#94a3b8" stroke-width="2.4" stroke-linecap="round" />
    <path d="M 300.3 64.2 L 287.5 62.9 L 293.5 54.5 Z" fill="#94a3b8" />
    <text x="252" y="34" font-family="KaTeX_Main" font-size="17" fill="#94a3b8" text-anchor="middle">匀速转动</text>
    <circle :cx="O.x" :cy="O.y" r="3.6" fill="#94a3b8" />
    <text :x="O.x - 12" :y="O.y + 22" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#94a3b8" text-anchor="end">O</text>
    <line :x1="O.x" :y1="O.y" :x2="P.x" :y2="P.y" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.7" />
    <text
      :x="258"
      :y="124"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="18"
      fill="#94a3b8"
      text-anchor="end"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      r
    </text>
    <rect :x="P.x - 12" :y="P.y - 12" width="24" height="24" rx="5" fill="rgba(226,168,70,0.28)" stroke="#e2a846" stroke-width="1.8" />
    <g v-if="showForces">
      <CourseArrow :from="P" :to="F" stroke="#2dd4bf" :stroke-width="3.4" />
      <text
        :x="F.x + 16"
        :y="F.y + 26"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="#2dd4bf"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="12">f</tspan>
      </text>
    </g>
  </svg>
</template>
