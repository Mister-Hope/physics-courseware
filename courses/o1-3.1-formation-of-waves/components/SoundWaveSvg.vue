<!-- 第 8 页：声波是纵波。音叉振动使邻近空气时密时疏，疏密相间向外传播 -->
<template>
  <svg viewBox="0 0 660 196" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M 74 54 V 96 Q 74 112 90 112 Q 106 112 106 96 V 54" fill="none" stroke="var(--c-accent)" stroke-width="6" stroke-linecap="round" />
    <line x1="90" y1="112" x2="90" y2="158" stroke="var(--c-accent)" stroke-width="6" stroke-linecap="round" />
    <rect x="72" y="158" width="36" height="9" rx="4.5" fill="var(--c-accent)" opacity="0.85" />
    <rect x="136" y="76" width="446" height="76" rx="10" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.35" />
    <circle v-for="(c, i) in dots" :key="i" :cx="c.x" cy="90" r="3.1" fill="var(--c-physics)" opacity="0.75" />
    <circle v-for="(c, i) in dots" :key="'b' + i" :cx="c.x" cy="114" r="3.1" fill="var(--c-physics)" opacity="0.75" />
    <line x1="252" y1="140" x2="252" y2="148" stroke="var(--c-accent-light)" stroke-width="1.2" opacity="0.7" />
    <line x1="356" y1="140" x2="356" y2="148" stroke="var(--c-accent-light)" stroke-width="1.2" opacity="0.7" />
    <text x="252" y="170" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-accent-light)">密部</text>
    <text x="356" y="170" text-anchor="middle" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-accent-light)">疏部</text>
    <CourseArrow :from="{ x: 470, y: 40 }" :to="{ x: 596, y: 40 }" stroke="var(--c-velocity)" :stroke-width="2.2" :dasharray="'7 5'" :head-size="10" />
    <text x="470" y="28" font-family="Nunito Sans, system-ui, sans-serif" font-size="13" fill="var(--c-velocity)">传播方向</text>
  </svg>
</template>

<script setup lang="ts">
const x0 = 150;
const spacing = 26;
const count = 17;
const perWave = 8;
const amp = (0.8 * spacing) / ((2 * Math.PI) / perWave);

const dots = Array.from({ length: count }, (_, k) => ({
  x: Number((x0 + k * spacing + amp * Math.sin((k * 2 * Math.PI) / perWave)).toFixed(2)),
}));
</script>
