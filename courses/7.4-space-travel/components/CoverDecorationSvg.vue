<script setup lang="ts">
/** 封面装饰（7.4 宇宙航行）：地球在左下方，卫星沿虚线轨道绕它运行；虚线向右上、右下分别指向月球与火星 ——一节课要讲的三件事（环绕地球、飞向月球、飞向火星）都在这张图里。 */

/** 绕地轨道（椭圆，只为构图好看，不是真实轨道比例） */
const ORBIT = { cx: 96, cy: 114, rx: 90, ry: 54 };

/** 卫星画在轨道的 −24° 处（与两条航迹的起点错开） */
const satAngle = (-24 * Math.PI) / 180;
const SAT = {
  x: ORBIT.cx + ORBIT.rx * Math.cos(satAngle),
  y: ORBIT.cy + ORBIT.ry * Math.sin(satAngle),
};

/** 背景星点 */
const STARS = [
  { x: 20, y: 30, r: 1.6 },
  { x: 74, y: 12, r: 1.2 },
  { x: 132, y: 26, r: 1.4 },
  { x: 196, y: 16, r: 1.2 },
  { x: 244, y: 96, r: 1.4 },
  { x: 166, y: 178, r: 1.3 },
  { x: 36, y: 186, r: 1.2 },
];
</script>

<template>
  <svg viewBox="0 0 300 210" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="currentColor">
      <circle v-for="star in STARS" :key="`${star.x}-${star.y}`" :cx="star.x" :cy="star.y" :r="star.r" opacity="0.5" />
    </g>
    <ellipse
      :cx="ORBIT.cx"
      :cy="ORBIT.cy"
      :rx="ORBIT.rx"
      :ry="ORBIT.ry"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-dasharray="6 6"
      opacity="0.45"
    />
    <path d="M 168 86 C 206 44 236 34 256 42" fill="none" stroke="rgba(226,168,70,0.6)" stroke-width="1.6" stroke-dasharray="5 6" />
    <path d="M 156 146 C 198 170 230 170 252 158" fill="none" stroke="rgba(226,168,70,0.6)" stroke-width="1.6" stroke-dasharray="5 6" />
    <g :transform="`translate(${SAT.x} ${SAT.y}) rotate(-24)`">
      <rect x="-27" y="-4.5" width="15" height="9" rx="1.4" fill="rgba(96,165,250,0.85)" />
      <rect x="12" y="-4.5" width="15" height="9" rx="1.4" fill="rgba(96,165,250,0.85)" />
      <line x1="-12" y1="0" x2="-8" y2="0" stroke="#94a3b8" stroke-width="1.3" />
      <line x1="8" y1="0" x2="12" y2="0" stroke="#94a3b8" stroke-width="1.3" />
      <rect x="-8" y="-5" width="16" height="10" rx="2" fill="#e2e8f0" />
    </g>
    <CelestialEarth :x="ORBIT.cx" :y="ORBIT.cy" :r="34" />
    <CelestialMoon :x="262" :y="42" :r="15" label="月球" :label-size="13" />
    <CelestialPlanet :x="260" :y="160" :r="13" variant="red" label="火星" :label-size="13" />
  </svg>
</template>
