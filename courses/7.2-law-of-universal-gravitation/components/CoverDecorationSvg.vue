<!-- 封面装饰（第 1 页）：行星沿圆形轨道绕太阳运行 —— 正是这种运动引出了"太阳对行星的引力"这个问题 -->
<script setup lang="ts">
const { width = 360 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 250 155" :width="width" xmlns="http://www.w3.org/2000/svg" class="select-none overflow-visible" aria-hidden="true">
    <!-- 行星的公转轨道：按圆处理 -->
    <circle cx="120" cy="80" r="72" fill="none" stroke="rgba(148,163,184,0.38)" stroke-width="1.6" stroke-dasharray="7 6" />
    <!-- 月球绕地球的轨道 -->
    <circle cx="184" cy="46" r="28" fill="none" stroke="rgba(96,165,250,0.35)" stroke-width="1.2" stroke-dasharray="5 5" />

    <CelestialSun :x="120" :y="80" :r="20" />
    <CelestialPlanet :x="61" :y="121" :r="9" variant="teal" />
    <CelestialEarth :x="184" :y="46" :r="15" />
    <CelestialMoon :x="198" :y="22" :r="6.5" />
  </svg>
</template>
