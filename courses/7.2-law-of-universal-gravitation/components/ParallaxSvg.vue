<!-- 月—地检验（第 6 页）：视差法测月地距离 —— 相距 L 的两地同时观测月球，两条视线的夹角 p 就是视差角 -->
<script setup lang="ts">
/** 地球与两个观测点 */
const EARTH = { x: 85, y: 205 };
const EARTH_R = 48;
const A = { x: EARTH.x + EARTH_R * 0.34, y: EARTH.y + EARTH_R * 0.94 };
const B = { x: EARTH.x - EARTH_R * 0.34, y: EARTH.y - EARTH_R * 0.94 };

/** 月球 */
const MOON = { x: 470, y: 80 };
const MOON_R = 14;

/**
 * 两点之间的单位方向向量
 *
 * @param from 起点
 * @param to 终点
 * @returns 从起点指向终点的单位向量
 */
const unit = (from: { x: number; y: number }, to: { x: number; y: number }): { x: number; y: number } => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;

  return { x: dx / length, y: dy / length };
};
const dirFromMoonToA = unit(MOON, A);
const dirFromMoonToB = unit(MOON, B);
const ARC_R = 60;
const arcStart = { x: MOON.x + dirFromMoonToA.x * ARC_R, y: MOON.y + dirFromMoonToA.y * ARC_R };
const arcEnd = { x: MOON.x + dirFromMoonToB.x * ARC_R, y: MOON.y + dirFromMoonToB.y * ARC_R };
const pLabel = {
  x: MOON.x + ((dirFromMoonToA.x + dirFromMoonToB.x) / 2) * 82 * 1.08,
  y: MOON.y + ((dirFromMoonToA.y + dirFromMoonToB.y) / 2) * 82 * 1.08,
};

/** 地心到月心的距离 r 的标记位置（放在连线的中垂方向上） */
const rLabel = ((): { x: number; y: number; mid: { x: number; y: number } } => {
  const d = unit(EARTH, MOON);
  const mid = { x: (EARTH.x + MOON.x) / 2, y: (EARTH.y + MOON.y) / 2 };

  return { x: mid.x + d.y * 26, y: mid.y - d.x * 26, mid };
})();
</script>

<template>
  <svg viewBox="0 0 560 300" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- 地心到月心的距离 -->
    <line :x1="EARTH.x" :y1="EARTH.y" :x2="MOON.x" :y2="MOON.y" stroke="rgba(148,163,184,0.45)" stroke-width="1.4" stroke-dasharray="7 6" />
    <text
      :x="rLabel.x"
      :y="rLabel.y"
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

    <!-- 两地的视线 -->
    <line :x1="A.x" :y1="A.y" :x2="MOON.x" :y2="MOON.y" stroke="rgba(96,165,250,0.75)" stroke-width="1.6" />
    <line :x1="B.x" :y1="B.y" :x2="MOON.x" :y2="MOON.y" stroke="rgba(226,168,70,0.75)" stroke-width="1.6" />

    <!-- 基线 AB -->
    <line :x1="A.x" :y1="A.y" :x2="B.x" :y2="B.y" stroke="rgba(148,163,184,0.9)" stroke-width="2" stroke-dasharray="5 4" />

    <!-- 视差角 p -->
    <path :d="`M ${arcStart.x} ${arcStart.y} A ${ARC_R} ${ARC_R} 0 0 1 ${arcEnd.x} ${arcEnd.y}`" fill="none" stroke="#2dd4bf" stroke-width="2.4" />
    <text
      :x="pLabel.x"
      :y="pLabel.y"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="22"
      fill="#2dd4bf"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      p
    </text>

    <!-- 地球与观测点 -->
    <CelestialEarth :x="EARTH.x" :y="EARTH.y" :r="EARTH_R" />
    <circle :cx="A.x" :cy="A.y" r="4.5" fill="#60a5fa" />
    <circle :cx="B.x" :cy="B.y" r="4.5" fill="#e2a846" />
    <text :x="A.x - 10" :y="A.y + 22" text-anchor="middle" font-size="16" fill="#60a5fa">A</text>
    <text :x="B.x - 12" :y="B.y - 6" text-anchor="middle" font-size="16" fill="#e2a846">B</text>
    <text :x="A.x + 16" :y="A.y + 8" font-size="15" fill="#94a3b8">基线 L</text>

    <!-- 月球 -->
    <CelestialMoon :x="MOON.x" :y="MOON.y" :r="MOON_R" label="月球" :label-dy="-30" :label-size="15" />
  </svg>
</template>
