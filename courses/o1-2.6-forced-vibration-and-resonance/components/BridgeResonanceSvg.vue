<script setup lang="ts">
// 共振的防止：悬索桥在风的作用下可能发生扭转共振
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 760 280" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="40" y1="248" x2="720" y2="248" stroke="var(--c-sky)" stroke-width="2" opacity="0.5" />
    <line x1="160" y1="68" x2="160" y2="240" stroke="var(--c-text-dim)" stroke-width="5" stroke-linecap="round" />
    <line x1="600" y1="68" x2="600" y2="240" stroke="var(--c-text-dim)" stroke-width="5" stroke-linecap="round" />
    <line x1="146" y1="68" x2="174" y2="68" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <line x1="586" y1="68" x2="614" y2="68" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <path d="M 60 190 L 160 68 Q 380 252 600 68 L 700 190" fill="none" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line x1="60" y1="190" x2="700" y2="190" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <line x1="200" y1="101" x2="200" y2="190" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />
    <line x1="280" y1="145" x2="280" y2="190" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />
    <line x1="360" y1="160" x2="360" y2="190" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />
    <line x1="440" y1="145" x2="440" y2="190" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />
    <line x1="520" y1="101" x2="520" y2="190" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />
    <CourseArrow :from="{ x: 30, y: 120 }" :to="{ x: 100, y: 120 }" stroke="var(--c-sky)" :stroke-width="2.4" label="风" />
    <g v-if="step >= 1">
      <path d="M 60 190 Q 200 176 380 190 T 700 190" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="6 5" />
      <text x="600" y="172" text-anchor="middle" font-size="12" fill="var(--c-accent)">桥面扭转</text>
    </g>
    <text x="380" y="270" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">悬索桥</text>
  </svg>
</template>
