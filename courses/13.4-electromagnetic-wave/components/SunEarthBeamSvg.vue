<!-- 第 6 页：太阳发出的电磁波穿过真空到达地球——电磁波的传播不需要介质 -->
<script setup lang="ts">
// 共享组件 CelestialSun / CelestialEarth 全局注册，直接用
</script>

<template>
  <svg viewBox="0 0 700 280" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="350" y="34" text-anchor="middle" font-size="14.5" fill="var(--c-text-soft)">太空（真空）</text>
    <line x1="180" y1="196" x2="560" y2="196" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="8 6" opacity="0.5" />
    <g transform="translate(88 140) scale(2.05)">
      <CelestialSun :radius="46" />
    </g>
    <text x="88" y="238" text-anchor="middle" font-size="13.5" fill="var(--c-text-soft)">太阳</text>
    <g stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" fill="none">
      <path d="M 168 118 q 16 -12 32 0 t 32 0 t 32 0 t 32 0 t 32 0" />
      <path d="M 168 150 q 16 -12 32 0 t 32 0 t 32 0 t 32 0 t 32 0" />
      <path d="M 168 182 q 16 -12 32 0 t 32 0 t 32 0 t 32 0 t 32 0" />
    </g>
    <text x="298" y="92" text-anchor="middle" font-size="14.5" fill="var(--c-accent)">电磁波（光）穿过真空</text>
    <g transform="translate(600 140) scale(1.0)">
      <CelestialEarth :radius="62" />
    </g>
    <text x="600" y="238" text-anchor="middle" font-size="13.5" fill="var(--c-text-soft)">地球</text>
    <CourseArrow :from="{ x: 350, y: 254 }" :to="{ x: 520, y: 254 }" stroke="var(--c-accent)" stroke-width="2.6" />
    <text x="344" y="259" text-anchor="end" font-size="13" fill="var(--c-text-soft)">传播方向</text>
  </svg>
</template>
