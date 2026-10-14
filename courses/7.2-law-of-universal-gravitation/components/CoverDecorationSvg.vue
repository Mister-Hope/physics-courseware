<!-- 封面装饰（第 1 页）：行星沿虚线轨道绕太阳运行 —— 正是这种运动引出了"太阳对行星的引力"这个问题 -->
<script setup lang="ts">
const { width = 360 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 340 150" :width="width" xmlns="http://www.w3.org/2000/svg" class="select-none overflow-visible" aria-hidden="true">
    <!-- 行星的公转轨道 -->
    <ellipse cx="58" cy="80" rx="158" ry="52" fill="none" stroke="rgba(148,163,184,0.38)" stroke-width="1.4" stroke-dasharray="7 6" />
    <!-- 月球绕地球的轨道 -->
    <ellipse
      cx="216"
      cy="80"
      rx="42"
      ry="27"
      fill="none"
      stroke="rgba(96,165,250,0.35)"
      stroke-width="1.2"
      stroke-dasharray="5 5"
      transform="rotate(-18 216 80)"
    />

    <CelestialSun :x="58" :y="80" :r="18" />
    <CelestialEarth :x="216" :y="80" :r="15" />
    <CelestialMoon :x="246" :y="62" :r="6.5" />
  </svg>
</template>
