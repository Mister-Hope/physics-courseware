<!-- 第 7 页：纵波。弹簧圈间距按正弦调制，形成疏密相间的波；密部、疏部标注 -->
<template>
  <svg viewBox="0 0 660 220" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line v-for="(b, i) in bars" :key="i" :x1="b.x" :x2="b.x" y1="86" y2="134" stroke="var(--c-accent)" stroke-width="3.2" stroke-linecap="round" />
    <line x1="180" y1="142" x2="180" y2="152" stroke="var(--c-accent-light)" stroke-width="1.2" opacity="0.7" />
    <line x1="290" y1="142" x2="290" y2="152" stroke="var(--c-accent-light)" stroke-width="1.2" opacity="0.7" />
    <text x="180" y="172" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-accent-light)">密部</text>
    <text x="290" y="172" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-accent-light)">疏部</text>
    <CourseArrow :from="{ x: 66, y: 110 }" :to="{ x: 30, y: 110 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="9" />
    <CourseArrow :from="{ x: 30, y: 110 }" :to="{ x: 66, y: 110 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="9" />
    <text x="48" y="78" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-physics)">振动方向</text>
    <CourseArrow :from="{ x: 320, y: 44 }" :to="{ x: 560, y: 44 }" stroke="var(--c-velocity)" :stroke-width="2.2" :dasharray="'7 5'" :head-size="11" />
    <text x="440" y="32" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-velocity)">传播方向</text>
  </svg>
</template>

<script setup lang="ts">
const x0 = 70;
const spacing = 22;
const count = 25;
const perWave = 10; // 每个波长包含的「间隔数」
const amp = (0.8 * spacing) / ((2 * Math.PI) / perWave);

const bars = Array.from({ length: count }, (_, k) => ({
  x: Number((x0 + k * spacing + amp * Math.sin((k * 2 * Math.PI) / perWave)).toFixed(2)),
}));
</script>
