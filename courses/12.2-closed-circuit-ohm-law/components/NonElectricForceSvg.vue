<!-- 第 4 页：电源内部剖面——静电力把正电荷往负极推，非静电力把正电荷从负极搬向正极 -->
<template>
  <svg viewBox="0 0 500 340" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="150" y="64" width="200" height="236" rx="18" fill="none" stroke="var(--c-physics)" stroke-width="2" />
    <text x="250" y="52" text-anchor="middle" font-size="18" font-weight="600" fill="var(--c-physics)">电源内部</text>
    <text x="250" y="92" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-physics)">+</text>
    <text x="250" y="288" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-physics)">−</text>
    <circle cx="250" cy="200" r="12" fill="var(--c-physics)" opacity="0.22" />
    <circle cx="250" cy="200" r="6.5" fill="var(--c-physics)" />
    <text x="274" y="207" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-physics)">q</text>
    <CourseArrow :from="{ x: 250, y: 200 }" :to="{ x: 250, y: 252 }" stroke="var(--c-physics)" :stroke-width="3" />
    <text x="270" y="247" font-size="17" fill="var(--c-physics)">静电力</text>
    <g v-if="showNonElectric">
      <CourseArrow :from="{ x: 250, y: 200 }" :to="{ x: 250, y: 132 }" stroke="var(--c-accent-2)" :stroke-width="3.4" />
      <text x="230" y="165" text-anchor="end" font-size="17" fill="var(--c-accent-2)">非静电力</text>
    </g>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ showNonElectric?: boolean }>();
</script>
