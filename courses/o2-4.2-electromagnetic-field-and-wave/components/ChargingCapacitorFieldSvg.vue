<!--
  4.2 P4：变化的电场产生磁场
  —— 平行板电容器充电：极板间存在电场 E（青绿，由正极板指向负极板）；
  极板间的电场变化时，在极板周围的空间产生磁场 B（金色虚线环，环流方向如图）。
  step >= 1 才显示磁场（点击只新增，不顶跑）。
-->
<template>
  <svg viewBox="0 0 340 280" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="108" y="80" width="10" height="134" rx="3" fill="var(--c-text)" opacity="0.9" />
    <rect x="222" y="80" width="10" height="134" rx="3" fill="var(--c-text)" opacity="0.9" />
    <text x="92" y="98" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-danger)">+</text>
    <text x="248" y="98" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-velocity)">−</text>
    <CourseArrow v-for="y in eRows" :key="`e-${y}`" :from="{ x: 122, y }" :to="{ x: 218, y }" stroke="var(--c-physics)" :stroke-width="2" :head-size="8" />
    <text x="170" y="66" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-physics)">E</text>
    <g v-if="step >= 1">
      <ellipse cx="170" cy="147" rx="118" ry="100" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.9" />
      <CourseArrow :from="{ x: 288, y: 161 }" :to="{ x: 288, y: 133 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="8" />
      <CourseArrow :from="{ x: 184, y: 47 }" :to="{ x: 156, y: 47 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="8" />
      <CourseArrow :from="{ x: 52, y: 133 }" :to="{ x: 52, y: 161 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="8" />
      <CourseArrow :from="{ x: 156, y: 247 }" :to="{ x: 184, y: 247 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="8" />
      <text x="302" y="92" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">B</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

/** 极板间 E 的各根矢量所在的竖直位置 */
const eRows = [102, 132, 162, 192];
</script>
