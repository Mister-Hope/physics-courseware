<script setup lang="ts">
// 调谐质量阻尼器（TMD）：弹簧、阻尼器、质量块，弹力与驱动力方向相反
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 760 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="40" y1="282" x2="720" y2="282" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-linecap="round" />
    <rect x="260" y="80" width="240" height="200" rx="10" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <line x1="272" y1="122" x2="488" y2="122" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.3" />
    <line x1="272" y1="164" x2="488" y2="164" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.3" />
    <line x1="272" y1="206" x2="488" y2="206" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.3" />
    <line x1="272" y1="248" x2="488" y2="248" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.3" />
    <rect x="330" y="24" width="100" height="36" rx="6" fill="var(--c-physics)" opacity="0.85" />
    <path d="M 380 60 l -12 6 l 24 6 l -24 6 l 24 6 l -12 6" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linejoin="round" />
    <rect x="440" y="58" width="36" height="22" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.6" />
    <line x1="430" y1="69" x2="440" y2="69" stroke="var(--c-accent-2)" stroke-width="2" />
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 512, y: 118 }" :to="{ x: 586, y: 118 }" stroke="var(--c-danger)" :stroke-width="2.6" label="F驱" />
      <CourseArrow :from="{ x: 470, y: 156 }" :to="{ x: 394, y: 156 }" stroke="var(--c-physics)" :stroke-width="2.6" label="F弹" />
    </g>
    <text x="380" y="18" text-anchor="middle" font-size="12" fill="var(--c-physics)">调谐质量阻尼器（TMD）</text>
    <text x="380" y="272" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">主结构</text>
  </svg>
</template>
