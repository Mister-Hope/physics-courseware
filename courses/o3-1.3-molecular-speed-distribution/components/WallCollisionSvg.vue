<!-- 1.3 第 8 页：分子与器壁碰撞（碰前、碰后动量大小相等、方向相反） -->
<template>
  <svg viewBox="0 0 420 196" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="330" y="22" width="16" height="150" rx="2" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="2" />
    <line x1="330" y1="52" x2="346" y2="34" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.7" />
    <line x1="330" y1="96" x2="346" y2="78" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.7" />
    <line x1="330" y1="140" x2="346" y2="122" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.7" />
    <text x="352" y="104" font-size="14" fill="var(--c-text-dim)">器壁</text>
    <text x="24" y="70" font-size="15" fill="var(--c-text-dim)">碰前</text>
    <circle cx="196" cy="66" r="13" fill="var(--c-accent)" opacity="0.9" />
    <CourseArrow :from="{ x: 214, y: 66 }" :to="{ x: 318, y: 66 }" stroke="var(--c-accent)" :head-size="9" />
    <text x="262" y="52" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">mv</text>
    <g v-show="step >= 1">
      <text x="24" y="154" font-size="15" fill="var(--c-text-dim)">碰后</text>
      <circle cx="196" cy="148" r="13" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="4 3" />
      <CourseArrow :from="{ x: 178, y: 148 }" :to="{ x: 74, y: 148 }" stroke="var(--c-accent)" :head-size="9" />
      <text x="108" y="134" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">−mv</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>()
</script>
