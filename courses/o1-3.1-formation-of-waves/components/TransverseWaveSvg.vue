<!-- 第 6 页：横波。质点上下振动、波向右传播，二者垂直；标出波峰与波谷 -->
<template>
  <svg viewBox="0 0 660 236" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="36" y1="120" x2="628" y2="120" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.4" />
    <polyline :points="curve" fill="none" stroke="var(--c-accent)" stroke-width="3.2" stroke-linecap="round" />
    <circle v-for="(p, i) in dots" :key="i" :cx="p.x" :cy="p.y" r="4.6" fill="var(--c-physics)" />
    <circle cx="105" cy="74" r="7" fill="none" stroke="var(--c-accent-light)" stroke-width="1.6" opacity="0.9" />
    <circle cx="195" cy="166" r="7" fill="none" stroke="var(--c-accent-light)" stroke-width="1.6" opacity="0.9" />
    <text x="105" y="52" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="15" fill="var(--c-accent-light)">波峰</text>
    <text x="195" y="202" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="15" fill="var(--c-accent-light)">波谷</text>
    <CourseArrow :from="{ x: 420, y: 120 }" :to="{ x: 420, y: 70 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="9" />
    <CourseArrow :from="{ x: 420, y: 120 }" :to="{ x: 420, y: 170 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="9" />
    <text x="400" y="86" text-anchor="end" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-physics)">振动方向</text>
    <CourseArrow :from="{ x: 340, y: 214 }" :to="{ x: 560, y: 214 }" stroke="var(--c-velocity)" :stroke-width="2.2" :dasharray="'7 5'" :head-size="11" />
    <text x="450" y="203" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-velocity)">传播方向</text>
  </svg>
</template>

<script setup lang="ts">
const x0 = 60;
const x1 = 620;
const axisY = 120;
const amp = 46;
const lambda = 180;

const waveY = (x: number): number => axisY - amp * Math.sin(((x - x0) / lambda) * Math.PI * 2);

const curve = Array.from({ length: 281 }, (_, i) => {
  const x = x0 + ((x1 - x0) * i) / 280;
  return `${x.toFixed(1)},${waveY(x).toFixed(1)}`;
}).join(" ");

const dots = [60, 105, 195, 240, 285, 375, 420, 465, 555, 600].map((x) => ({ x, y: waveY(x) }));
</script>
