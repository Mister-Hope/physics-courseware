<!-- 4.5 光的衍射：屏上条纹示意（单缝/双缝/白光） -->
<template>
  <svg viewBox="0 0 620 180" width="620" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="white-fringe" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#f87171" />
        <stop offset="0.35" stop-color="#fbbf24" />
        <stop offset="0.6" stop-color="#e2a846" />
        <stop offset="1" stop-color="#60a5fa" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="618" height="178" rx="10" fill="var(--c-neutral-900)" stroke="var(--c-border)" stroke-width="1" />
    <g v-if="mode === 'double'">
      <rect v-for="x in doubleX" :key="x" :x="x" y="42" width="26" height="96" rx="2" fill="var(--c-accent)" opacity="0.9" />
    </g>
    <g v-else-if="mode === 'white'">
      <rect x="276" y="34" width="68" height="112" rx="2" fill="var(--c-text)" opacity="0.96" />
      <rect x="236" y="48" width="28" height="84" rx="2" fill="url(#white-fringe)" opacity="0.85" />
      <rect x="356" y="48" width="28" height="84" rx="2" fill="url(#white-fringe)" opacity="0.85" />
      <rect x="202" y="60" width="22" height="60" rx="2" fill="#60a5fa" opacity="0.5" />
      <rect x="396" y="60" width="22" height="60" rx="2" fill="#f87171" opacity="0.5" />
      <rect x="174" y="70" width="16" height="40" rx="2" fill="#fbbf24" opacity="0.35" />
      <rect x="430" y="70" width="16" height="40" rx="2" fill="#60a5fa" opacity="0.35" />
    </g>
    <g v-else>
      <rect x="244" y="30" width="132" height="120" rx="2" fill="var(--c-accent)" opacity="0.95" />
      <rect x="184" y="48" width="38" height="84" rx="2" fill="var(--c-accent)" opacity="0.55" />
      <rect x="398" y="48" width="38" height="84" rx="2" fill="var(--c-accent)" opacity="0.55" />
      <rect x="148" y="60" width="24" height="60" rx="2" fill="var(--c-accent)" opacity="0.35" />
      <rect x="448" y="60" width="24" height="60" rx="2" fill="var(--c-accent)" opacity="0.35" />
      <rect x="120" y="70" width="16" height="40" rx="2" fill="var(--c-accent)" opacity="0.22" />
      <rect x="484" y="70" width="16" height="40" rx="2" fill="var(--c-accent)" opacity="0.22" />
    </g>
    <text x="24" y="164" fill="var(--c-text-mute)" font-size="10">屏上条纹</text>
  </svg>
</template>

<script setup lang="ts">
const { mode = "single" } = defineProps<{ mode?: "single" | "double" | "white" }>();
const doubleX = [160, 210, 260, 310, 360, 410, 460];
</script>
