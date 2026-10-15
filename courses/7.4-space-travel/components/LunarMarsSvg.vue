<script setup lang="ts">
/** 探月与深空探测（7.4）：地球在右侧，两条虚线航迹分别指向左上的月球与左下的火星 ——嫦娥四号实现月球背面软着陆、嫦娥五号带回月球样品，天问一号把祝融号火星车送上火星。 天体不用手画，直接用共享的 CelestialEarth / CelestialMoon / CelestialPlanet。 */
const MOON = { x: 128, y: 84, r: 50 };
const MARS = { x: 250, y: 248, r: 44 };
const EARTH = { x: 392, y: 192, r: 28 };

/** 地球 → 月球、地球 → 火星的虚线航迹（从两个球体的边缘出发） */
const TO_MOON = "M 366 181 C 300 100 240 78 174 103";
const TO_MARS = "M 366 202 C 335 240 320 240 291 232";

const STARS = [
  { x: 30, y: 30, r: 1.6 },
  { x: 74, y: 14, r: 1.2 },
  { x: 214, y: 36, r: 1.4 },
  { x: 330, y: 78, r: 1.3 },
  { x: 434, y: 52, r: 1.5 },
  { x: 40, y: 232, r: 1.3 },
  { x: 140, y: 300, r: 1.4 },
  { x: 430, y: 320, r: 1.2 },
];
</script>

<template>
  <svg viewBox="0 0 460 360" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="从地球出发的探月与探火航迹：月球与火星">
    <g fill="#94a3b8">
      <circle v-for="star in STARS" :key="`${star.x}-${star.y}`" :cx="star.x" :cy="star.y" :r="star.r" opacity="0.55" />
    </g>
    <path :d="TO_MOON" fill="none" stroke="rgba(226,168,70,0.65)" stroke-width="2" stroke-dasharray="7 6" />
    <path :d="TO_MARS" fill="none" stroke="rgba(226,168,70,0.65)" stroke-width="2" stroke-dasharray="7 6" />
    <CelestialMoon :x="MOON.x" :y="MOON.y" :r="MOON.r" label="月球" :label-size="19" />
    <text :x="MOON.x" :y="MOON.y + MOON.r + 64" text-anchor="middle" font-size="18" fill="#e2a846">嫦娥四号 · 嫦娥五号</text>
    <CelestialPlanet :x="MARS.x" :y="MARS.y" :r="MARS.r" variant="red" label="火星" :label-size="19" />
    <text :x="MARS.x" :y="MARS.y + MARS.r + 54" text-anchor="middle" font-size="18" fill="#f87171">天问一号 · 祝融号</text>
    <CelestialEarth :x="EARTH.x" :y="EARTH.y" :r="EARTH.r" label="地球" :label-size="17" />
  </svg>
</template>
