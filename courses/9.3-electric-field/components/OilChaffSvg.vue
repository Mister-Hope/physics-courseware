<script setup lang="ts">
// 第 14 页：模拟电场线——把头发碎屑悬浮在蓖麻油里，加上电场，
// 碎屑按该点电场强度的方向排列起来（教材图 9.3-9 为模拟正电荷电场线的照片）。
// 场源是油盘中央的一个正电荷电极；碎屑方向 = 该点真实场强方向（正点电荷的场线沿半径向外）。
const CX = 160;
const CY = 120;

// 每片碎屑：位于某个位置，朝向该点的半径方向（正点电荷的场强方向）
const CHAFF = [
  { r: 34, a: 0.35 },
  { r: 34, a: 1.1 },
  { r: 34, a: 2.0 },
  { r: 34, a: 2.9 },
  { r: 34, a: 3.8 },
  { r: 34, a: 4.7 },
  { r: 34, a: 5.6 },
  { r: 56, a: 0.15 },
  { r: 56, a: 0.75 },
  { r: 56, a: 1.45 },
  { r: 56, a: 2.2 },
  { r: 56, a: 3.0 },
  { r: 56, a: 3.7 },
  { r: 56, a: 4.4 },
  { r: 56, a: 5.1 },
  { r: 56, a: 5.8 },
  { r: 78, a: 0.5 },
  { r: 78, a: 1.35 },
  { r: 78, a: 2.4 },
  { r: 78, a: 3.3 },
  { r: 78, a: 4.2 },
  { r: 78, a: 5.2 },
];

const CHAFF_PIECES = CHAFF.map(({ r, a }) => {
  const x = CX + Math.cos(a) * r;
  const y = CY + Math.sin(a) * r;
  const deg = (a * 180) / Math.PI;
  return { x, y, deg };
});
</script>

<template>
  <svg viewBox="0 0 320 240" class="w-full h-full">
    <circle :cx="CX" :cy="CY" r="96" fill="var(--c-panel)" stroke="var(--c-line)" stroke-width="2" />
    <line :x1="CX" :y1="CY - 8" :x2="CX" y2="4" stroke="var(--c-line)" stroke-width="6" stroke-linecap="round" />
    <ellipse
      v-for="(piece, i) in CHAFF_PIECES"
      :key="i"
      :cx="piece.x"
      :cy="piece.y"
      rx="7"
      ry="2.2"
      :transform="`rotate(${piece.deg} ${piece.x} ${piece.y})`"
      fill="var(--c-gold)"
      fill-opacity="0.8"
    />
    <circle :cx="CX" :cy="CY" r="9" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="CX" :y="CY" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="12" fill="#fff">+</text>
  </svg>
</template>
