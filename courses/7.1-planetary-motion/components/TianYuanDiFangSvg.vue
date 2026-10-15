<script setup lang="ts">
/** 第 2 页：天圆地方——古人把天看成一个扣在地上的圆形穹盖（“天圆如张盖”），把地看成一块方形的棋盘（“地方如棋局”）。 日月就挂在这层“天”上运行，所以古人相信天体的运动必然是最完美、最和谐的匀速圆周运动。 */
const DOME = { cx: 210, cy: 215, r: 158 };
/**
 * 穹盖（圆弧）上横坐标为 x 处的纵坐标——日月就画在这条弧上
 *
 * @param x 横坐标
 * @returns 圆弧上的纵坐标
 */
const arcY = (x: number): number => DOME.cy - Math.sqrt(DOME.r * DOME.r - (x - DOME.cx) ** 2);
const SUN = { x: 140, y: arcY(140) + 4 };
const MOON = { x: 274, y: arcY(274) + 4 };
/** 方形的大地（“棋局”上的格线） */
const GROUND = { x: 108, y: 215, w: 204, h: 60 };
const STARS = [
  { x: 210, y: 118 },
  { x: 168, y: 152 },
  { x: 254, y: 150 },
  { x: 126, y: 190 },
];
</script>

<template>
  <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      :d="`M ${DOME.cx - DOME.r} ${DOME.cy} A ${DOME.r} ${DOME.r} 0 0 1 ${DOME.cx + DOME.r} ${DOME.cy}`"
      fill="none"
      stroke="#94a3b8"
      stroke-width="2"
      opacity="0.7"
    />
    <circle v-for="(star, index) in STARS" :key="index" :cx="star.x" :cy="star.y" r="2.2" fill="#e2e8f0" opacity="0.5" />
    <CelestialSun :x="SUN.x" :y="SUN.y" :r="15" />
    <CelestialMoon :x="MOON.x" :y="MOON.y" :r="11" />
    <rect :x="GROUND.x" :y="GROUND.y" :width="GROUND.w" :height="GROUND.h" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.7" />
    <line
      :x1="GROUND.x + GROUND.w / 3"
      :y1="GROUND.y"
      :x2="GROUND.x + GROUND.w / 3"
      :y2="GROUND.y + GROUND.h"
      stroke="#94a3b8"
      stroke-width="1.1"
      opacity="0.35"
    />
    <line
      :x1="GROUND.x + (GROUND.w * 2) / 3"
      :y1="GROUND.y"
      :x2="GROUND.x + (GROUND.w * 2) / 3"
      :y2="GROUND.y + GROUND.h"
      stroke="#94a3b8"
      stroke-width="1.1"
      opacity="0.35"
    />
    <line
      :x1="GROUND.x"
      :y1="GROUND.y + GROUND.h / 2"
      :x2="GROUND.x + GROUND.w"
      :y2="GROUND.y + GROUND.h / 2"
      stroke="#94a3b8"
      stroke-width="1.1"
      opacity="0.35"
    />
    <text x="210" y="112" text-anchor="middle" font-size="30" fill="#e2a846">天</text>
    <text x="210" y="256" text-anchor="middle" font-size="21" fill="#60a5fa">地</text>
  </svg>
</template>
