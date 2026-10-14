<script setup lang="ts">
/** 第 7 页：把“行星的轨道与圆有多接近”并排比出来。 左：离心率夸张到 0.6 的椭圆（看得出太阳在焦点、轨道是扁的）；右：地球轨道的真实比例 e = 0.0167， 实线是轨道、虚线是同样半长轴的圆——两条曲线几乎完全重合，这就是“按圆轨道处理”的依据。 */
/** 两个面板各自的中心与半长轴/半径 */
const LEFT = { x: 200, y: 138 };
const RIGHT = { x: 660, y: 138 };
const A = 120;
const LEFT_ECC = 0.6;
const RIGHT_ECC = 0.0167;
/** 夸张椭圆的半短轴与太阳所在焦点 */
const LEFT_B = A * Math.sqrt(1 - LEFT_ECC * LEFT_ECC);
const RIGHT_B = A * Math.sqrt(1 - RIGHT_ECC * RIGHT_ECC);
const LEFT_SUN = { x: LEFT.x + A * LEFT_ECC, y: LEFT.y };
const RIGHT_SUN = { x: RIGHT.x + A * RIGHT_ECC, y: RIGHT.y };
/** 两颗行星都画在参数角 140° 处 */
const ANG = (140 * Math.PI) / 180;
const LEFT_PLANET = { x: LEFT.x + A * Math.cos(ANG), y: LEFT.y + LEFT_B * Math.sin(ANG) };
const RIGHT_PLANET = { x: RIGHT.x + A * Math.cos(ANG), y: RIGHT.y + A * Math.sin(ANG) };
const aria = "左图是离心率 0.6 的夸张椭圆，能看出太阳在一个焦点上；右图是地球轨道的真实比例，轨道与虚线圆几乎重合。";
</script>

<template>
  <svg viewBox="0 0 880 300" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <line x1="440" y1="30" x2="440" y2="270" stroke="#94a3b8" stroke-width="1" opacity="0.2" />

    <ellipse :cx="LEFT.x" :cy="LEFT.y" :rx="A" :ry="LEFT_B" fill="none" stroke="#e2a846" stroke-width="2.4" opacity="0.8" />
    <CelestialSun :x="LEFT_SUN.x" :y="LEFT_SUN.y" :r="20" />
    <CelestialPlanet :x="LEFT_PLANET.x" :y="LEFT_PLANET.y" :r="9" variant="blue" />

    <ellipse :cx="RIGHT.x" :cy="RIGHT.y" :rx="A" :ry="RIGHT_B" fill="none" stroke="#e2a846" stroke-width="2.4" />
    <circle :cx="RIGHT.x" :cy="RIGHT.y" :r="A" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="7 6" opacity="0.85" />
    <line x1="468" y1="38" x2="500" y2="38" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="7 6" opacity="0.85" />
    <text x="508" y="44" font-size="15" fill="#94a3b8">圆</text>
    <line x1="468" y1="62" x2="500" y2="62" stroke="#e2a846" stroke-width="2.4" />
    <text x="508" y="68" font-size="15" fill="#94a3b8">轨道</text>
    <CelestialSun :x="RIGHT_SUN.x" :y="RIGHT_SUN.y" :r="20" />
    <CelestialPlanet :x="RIGHT_PLANET.x" :y="RIGHT_PLANET.y" :r="9" variant="blue" />

    <text :x="LEFT.x" y="282" text-anchor="middle" font-size="16" fill="#94a3b8">
      夸张的椭圆：
      <tspan font-family="KaTeX_Math" font-style="italic">e</tspan>
      = 0.6
    </text>
    <text :x="RIGHT.x" y="282" text-anchor="middle" font-size="16" fill="#94a3b8">
      地球轨道：
      <tspan font-family="KaTeX_Math" font-style="italic">e</tspan>
      = 0.0167，与虚线圆几乎重合
    </text>
  </svg>
</template>
