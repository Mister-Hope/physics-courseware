<!-- 引课（第 2 页）：苹果落向地面，月亮却绕着地球转 —— 让苹果落地的力和让月亮绕地球转的力，是不是同一种力？ -->
<script setup lang="ts">
/** 地球与月球（月球绕地球的圆轨道） */
const EARTH = { x: 390, y: 150 };
const EARTH_R = 46;
const MOON_ORBIT = 80;
const MOON_ANGLE = (-55 * Math.PI) / 180;
const moon = {
  x: EARTH.x + MOON_ORBIT * Math.cos(MOON_ANGLE),
  y: EARTH.y + MOON_ORBIT * Math.sin(MOON_ANGLE),
};

/** 树上的苹果与正在下落的苹果 */
const apples = [
  { x: 104, y: 104 },
  { x: 152, y: 86 },
  { x: 118, y: 134 },
];
const FALLING = { x: 172, y: 172 };
</script>

<template>
  <svg viewBox="0 0 520 250" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- 地面 -->
    <SurfaceHatch :from="{ x: 16, y: 228 }" :to="{ x: 236, y: 228 }" side="below" :thickness="14" :gap="22" />

    <!-- 苹果树 -->
    <path d="M 108 228 L 118 126 L 134 126 L 144 228 Z" fill="rgba(161,102,47,0.45)" stroke="rgba(161,102,47,0.85)" stroke-width="1.6" />
    <circle cx="126" cy="92" r="46" fill="rgba(74,222,128,0.14)" stroke="rgba(74,222,128,0.55)" stroke-width="1.6" />
    <circle cx="86" cy="112" r="32" fill="rgba(74,222,128,0.14)" stroke="rgba(74,222,128,0.55)" stroke-width="1.6" />
    <circle cx="168" cy="110" r="32" fill="rgba(74,222,128,0.14)" stroke="rgba(74,222,128,0.55)" stroke-width="1.6" />
    <circle cx="126" cy="62" r="26" fill="rgba(74,222,128,0.14)" stroke="rgba(74,222,128,0.55)" stroke-width="1.6" />

    <!-- 树上的苹果 -->
    <circle v-for="apple in apples" :key="`${apple.x}-${apple.y}`" :cx="apple.x" :cy="apple.y" r="5" fill="#f87171" />

    <!-- 下落的苹果与落向地面的方向 -->
    <line :x1="FALLING.x" y1="120" :x2="FALLING.x" y2="222" stroke="rgba(248,113,113,0.45)" stroke-width="1.4" stroke-dasharray="5 5" />
    <circle :cx="FALLING.x" :cy="FALLING.y" r="8" fill="#f87171" />
    <CourseArrow :from="{ x: FALLING.x, y: FALLING.y + 18 }" :to="{ x: FALLING.x, y: 224 }" stroke="#f87171" :stroke-width="2.6" />
    <text :x="FALLING.x + 16" :y="FALLING.y + 8" font-size="15" fill="#f87171">苹果</text>

    <!-- 地球与绕地球运行的月球 -->
    <circle :cx="EARTH.x" :cy="EARTH.y" :r="MOON_ORBIT" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="1.6" stroke-dasharray="7 6" />
    <CelestialEarth :x="EARTH.x" :y="EARTH.y" :r="EARTH_R" label="地球" :label-size="15" />
    <CelestialMoon :x="moon.x" :y="moon.y" :r="10" label="月球" :label-size="15" />
  </svg>
</template>
