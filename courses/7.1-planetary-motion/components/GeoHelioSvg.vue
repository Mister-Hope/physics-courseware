<script setup lang="ts">
/** 第 3 页：地心说与日心说并排对比。 左：托勒密的地心说——地球静止在宇宙中心，月球、太阳与其他星体各沿一层圆形轨道绕地球运行； 右：哥白尼的日心说——太阳静止在中心，地球与其他行星沿圆形轨道绕太阳运行。 两派都默认“天体沿圆轨道做匀速圆周运动”，这正是后来被开普勒推翻的前提。 */
/** 左半幅：地心说（中心 = 地球） */
const GEO = { cx: 110, cy: 128 };
const GEO_ORBITS = [46, 70, 92];
const toXY = (cx: number, cy: number, deg: number, r: number): { x: number; y: number } => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};
const GEO_MOON = toXY(GEO.cx, GEO.cy, -22, 46);
const GEO_SUN = toXY(GEO.cx, GEO.cy, 136, 70);
const GEO_PLANET = toXY(GEO.cx, GEO.cy, 34, 92);
/** 右半幅：日心说（中心 = 太阳） */
const HELIO = { cx: 330, cy: 128 };
const HELIO_ORBITS = [58, 84];
const HELIO_EARTH = toXY(HELIO.cx, HELIO.cy, -90, 58);
const HELIO_PLANET = toXY(HELIO.cx, HELIO.cy, 42, 84);
const aria = "左图地心说：地球在中心，月球、太阳和其他星体绕地球转；右图日心说：太阳在中心，地球和其他行星绕太阳转。";
</script>

<template>
  <svg viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <line x1="220" y1="36" x2="220" y2="252" stroke="#94a3b8" stroke-width="1" opacity="0.2" />
    <circle
      v-for="r in GEO_ORBITS"
      :key="`g${r}`"
      :cx="GEO.cx"
      :cy="GEO.cy"
      :r="r"
      fill="none"
      stroke="#94a3b8"
      stroke-width="1.2"
      stroke-dasharray="5 5"
      opacity="0.4"
    />
    <CelestialSun :x="GEO_SUN.x" :y="GEO_SUN.y" :r="13" />
    <CelestialMoon :x="GEO_MOON.x" :y="GEO_MOON.y" :r="8" />
    <CelestialPlanet :x="GEO_PLANET.x" :y="GEO_PLANET.y" :r="9" variant="red" />
    <CelestialEarth :x="GEO.cx" :y="GEO.cy" :r="28" label="地球" :label-size="16" />
    <text x="110" y="262" text-anchor="middle" font-size="18" fill="#e2a846">地心说</text>
    <circle
      v-for="r in HELIO_ORBITS"
      :key="`h${r}`"
      :cx="HELIO.cx"
      :cy="HELIO.cy"
      :r="r"
      fill="none"
      stroke="#94a3b8"
      stroke-width="1.2"
      stroke-dasharray="5 5"
      opacity="0.4"
    />
    <CelestialEarth :x="HELIO_EARTH.x" :y="HELIO_EARTH.y" :r="13" label="地球" :label-size="16" />
    <CelestialPlanet :x="HELIO_PLANET.x" :y="HELIO_PLANET.y" :r="9" variant="red" label="行星" :label-size="16" />
    <CelestialSun :x="HELIO.cx" :y="HELIO.cy" :r="17" label="太阳" :label-size="16" />
    <text x="330" y="262" text-anchor="middle" font-size="18" fill="#60a5fa">日心说</text>
  </svg>
</template>
