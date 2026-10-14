<script setup lang="ts">
/**
 * 第 6 页示意图：天王星轨道"古怪"→ 算出新行星的位置 → 伽勒观测到海王星。
 *
 * Step 0：太阳、按万有引力定律算出的天王星理论轨道、实际观测到的位置（两条轨道对不上）； step 1：亚当斯与勒维耶算出的未知行星轨道与预言位置； step 2：1846 年伽勒在预言位置附近找到的海王星。
 */
withDefaults(defineProps<{ step?: number }>(), { step: 0 });
</script>

<template>
  <svg viewBox="0 0 420 234" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="天王星轨道的偏差、算出的新行星轨道与海王星的预测位置">
    <path d="M 46 45 A 165 80 0 0 1 46 205" fill="none" stroke="rgba(148,163,184,0.55)" stroke-width="1.6" stroke-dasharray="7 6" />
    <path d="M 146 72 L 160 64 L 176 70 L 188 80 L 196 88" fill="none" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="146" cy="72" r="3.2" fill="#60a5fa" />
    <circle cx="176" cy="70" r="3.2" fill="#60a5fa" />
    <circle cx="196" cy="88" r="3.2" fill="#60a5fa" />
    <CelestialSun :x="46" :y="125" :r="19" label="太阳" :label-size="15" />
    <CelestialPlanet :x="176" :y="75.7" :r="13" variant="teal" label="天王星" :label-size="15" :label-dy="30" />
    <g font-size="13" fill="#94a3b8">
      <line x1="22" y1="213" x2="44" y2="213" stroke="rgba(148,163,184,0.75)" stroke-width="1.6" stroke-dasharray="7 6" />
      <text x="50" y="217">按万有引力定律算出的轨道</text>
      <line x1="22" y1="229" x2="44" y2="229" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" />
      <text x="50" y="233">实际观测到的位置</text>
    </g>
    <g v-if="step >= 1">
      <path d="M 180.8 36.5 A 235 108 0 0 1 273 153" fill="none" stroke="rgba(226,168,70,0.75)" stroke-width="1.8" stroke-dasharray="8 6" />
      <text x="196" y="30" font-size="13" fill="#e2a846">亚当斯、勒维耶算出的轨道</text>
      <circle cx="249.5" cy="71" r="10" fill="none" stroke="#e2a846" stroke-width="1.8" stroke-dasharray="4 3" />
      <text x="268" y="62" font-size="13" fill="#e2a846">预言位置</text>
    </g>
    <g v-if="step >= 2">
      <CelestialPlanet :x="249.5" :y="71" :r="13" variant="blue" label="海王星" :label-size="15" :label-dy="30" />
      <text x="249.5" y="124" text-anchor="middle" font-size="13" fill="#cbd5e1">1846 年伽勒在预言位置附近找到它</text>
    </g>
  </svg>
</template>
