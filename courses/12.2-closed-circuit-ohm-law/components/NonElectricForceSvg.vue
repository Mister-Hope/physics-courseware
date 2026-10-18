<!-- 第 4 页：电源内部剖面，正电荷在非静电力作用下从负极被推向正极（先画静电力，点击后出非静电力） -->
<template>
  <svg viewBox="0 0 560 380" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="180" y="70" width="200" height="250" rx="18" fill="none" stroke="var(--c-physics)" stroke-width="2" />
    <text x="280" y="52" text-anchor="middle" font-size="18" fill="var(--c-physics)">电源内部</text>
    <path d="M232 70 V58 H328 V70" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <text x="280" y="46" text-anchor="middle" font-size="17" fill="var(--c-physics)">+</text>
    <text x="280" y="352" text-anchor="middle" font-size="17" fill="var(--c-physics)">−</text>
    <path d="M258 320 V332 H302 V320" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <circle cx="280" cy="240" r="12" fill="var(--c-physics)" opacity="0.22" />
    <circle cx="280" cy="240" r="6.5" fill="var(--c-physics)" />
    <text x="304" y="248" font-size="16" fill="var(--c-physics)">q</text>
    <CourseArrow :from="{ x: 280, y: 240 }" :to="{ x: 280, y: 296 }" stroke="var(--c-physics)" stroke-width="2.8" label="F" />
    <CourseArrow v-if="showNonElectric" :from="{ x: 280, y: 240 }" :to="{ x: 280, y: 122 }" stroke="var(--c-accent-2)" stroke-width="3.4" label="F'" />
    <text v-if="showNonElectric" x="188" y="128" text-anchor="end" font-size="16" fill="var(--c-accent-2)">非静电力</text>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ showNonElectric?: boolean }>();
</script>
