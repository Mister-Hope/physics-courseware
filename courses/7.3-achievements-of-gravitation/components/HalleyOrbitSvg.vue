<script setup lang="ts">
/**
 * 第 7 页示意图：哈雷彗星的椭圆轨道（太阳在一个焦点上）。
 *
 * Step 0：椭圆轨道、焦点上的太阳、正在远去的彗星； step 1：1531、1607、1682 三次记录落在几乎同一条轨道上（远日点、近日点尺度同时给出）； step 2：每次回归都发生在近日点附近——1986 年回归，下次在 2061 年前后。
 */
withDefaults(defineProps<{ step?: number }>(), { step: 0 });
</script>

<template>
  <svg viewBox="0 0 420 210" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="哈雷彗星的椭圆轨道、太阳与历次回归的位置">
    <ellipse cx="214.6" cy="102" rx="150" ry="62" fill="none" stroke="rgba(226,168,70,0.6)" stroke-width="1.8" stroke-dasharray="9 6" />
    <CelestialSun :x="78" :y="102" :r="9" :show-rays="false" label="太阳" :label-size="15" />
    <CelestialPlanet :x="70.4" :y="84.9" :r="8" variant="teal" label="哈雷彗星" :label-size="15" :label-dy="-15" />
    <CourseArrow :from="{ x: 70.4, y: 84.9 }" :to="{ x: 84.6, y: 66 }" stroke="#e2a846" stroke-width="2.4" :head-size="10" />
    <g v-if="step >= 1">
      <circle cx="65.4" cy="95.5" r="4.4" fill="none" stroke="#60a5fa" stroke-width="1.6" />
      <circle cx="68.4" cy="88.1" r="4.4" fill="none" stroke="#60a5fa" stroke-width="1.6" />
      <circle cx="73.6" cy="80.8" r="4.4" fill="none" stroke="#60a5fa" stroke-width="1.6" />
      <g font-family="KaTeX_Main" font-size="15" fill="#60a5fa" text-anchor="end">
        <text x="56" y="99">1531</text>
        <text x="56" y="90">1607</text>
        <text x="56" y="81">1682</text>
      </g>
      <circle cx="364.6" cy="102" r="3.4" fill="#94a3b8" />
      <g font-family="KaTeX_Main" font-size="15" fill="#94a3b8">
        <text x="370" y="99">远日点</text>
        <text x="370" y="115">35 AU</text>
      </g>
      <g font-family="KaTeX_Main" font-size="15" fill="#94a3b8">
        <text x="6" y="118">近日点</text>
        <text x="6" y="134">0.59 AU</text>
      </g>
      <text x="214.6" y="72" text-anchor="middle" font-size="15" fill="#e2a846">公转周期约 76 年</text>
    </g>
    <g v-if="step >= 2">
      <circle cx="64.6" cy="102" r="3.6" fill="#e2a846" />
      <text x="214.6" y="140" text-anchor="middle" font-size="15" fill="#e2a846">1986 年回归，下次在 2061 年前后</text>
    </g>
  </svg>
</template>
