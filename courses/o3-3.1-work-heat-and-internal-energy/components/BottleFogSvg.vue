<!-- 第 7 页：瓶塞跳出，瓶内气体对外做功、内能减少，水蒸气液化出现白雾 -->
<template>
  <svg viewBox="78 14 176 244" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M150 54 L150 96 Q150 102 144 106 L128 120 Q120 126 120 136 L120 228 Q120 246 138 246 L186 246 Q204 246 204 228 L204 136 Q204 126 196 120 L180 106 Q174 102 174 96 L174 54"
      fill="var(--c-bg-soft)"
      fill-opacity=".55"
      stroke="var(--c-text-dim)"
      stroke-width="2.5"
    />
    <path d="M120 202 L204 202 L204 228 Q204 246 186 246 L138 246 Q120 246 120 228 Z" fill="var(--c-velocity)" opacity=".18" />
    <line x1="120" y1="202" x2="204" y2="202" stroke="var(--c-velocity)" stroke-width="1.5" opacity=".5" />
    <g :transform="popped ? 'translate(10 -20) rotate(18 160 49)' : undefined">
      <rect x="146" y="42" width="28" height="14" rx="3" fill="var(--c-neutral-600)" stroke="var(--c-text-dim)" stroke-width="1.5" />
    </g>
    <g v-if="popped">
      <circle cx="132" cy="120" r="6" fill="var(--c-text)" opacity=".18" />
      <circle cx="150" cy="110" r="8" fill="var(--c-text)" opacity=".2" />
      <circle cx="170" cy="124" r="7" fill="var(--c-text)" opacity=".2" />
      <circle cx="188" cy="112" r="5" fill="var(--c-text)" opacity=".16" />
      <circle cx="140" cy="144" r="7" fill="var(--c-text)" opacity=".16" />
      <circle cx="180" cy="146" r="6" fill="var(--c-text)" opacity=".14" />
      <path d="M140 70 q-10 -4 -14 -12" fill="none" stroke="var(--c-text)" stroke-width="2" opacity=".35" stroke-linecap="round" />
      <path d="M180 70 q10 -4 14 -12" fill="none" stroke="var(--c-text)" stroke-width="2" opacity=".35" stroke-linecap="round" />
      <CourseArrow :from="{ x: 236, y: 96 }" :to="{ x: 236, y: 36 }" stroke="var(--c-accent)" :stroke-width="2.5" :head-size="8" />
    </g>
    <text x="210" y="44" font-size="11" fill="var(--c-text-dim)">塞子</text>
    <text v-if="popped" x="108" y="128" font-size="11" text-anchor="end" fill="var(--c-text-dim)">白雾</text>
    <text x="160" y="228" font-size="11" text-anchor="middle" fill="var(--c-text-dim)">水</text>
  </svg>
</template>

<script setup lang="ts">
const { popped = false } = defineProps<{ popped?: boolean }>();
</script>
