<!-- 第 2 页：空气压缩引火仪。pressed 时活塞压下、硝化棉被点燃 -->
<template>
  <svg viewBox="78 40 204 230" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="94" y1="256" x2="226" y2="256" stroke="var(--c-text-dim)" stroke-width="2" opacity=".5" />
    <path d="M110 250 L110 92" fill="none" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <path d="M210 250 L210 92" fill="none" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <path d="M104 250 L216 250" fill="none" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <circle cx="160" cy="238" r="8" fill="var(--c-text)" opacity=".6" />
    <circle cx="148" cy="242" r="5" fill="var(--c-text)" opacity=".5" />
    <circle cx="172" cy="242" r="5" fill="var(--c-text)" opacity=".5" />
    <g v-if="pressed">
      <circle cx="160" cy="230" r="27" fill="var(--c-danger)" opacity=".14" />
      <path d="M160 234 Q149 217 160 202 Q168 215 166 225 Q174 213 178 223 Q178 232 168 236 Z" fill="var(--c-danger)" opacity=".85" />
      <path d="M160 234 Q155 223 161 214 Q166 223 164 232 Z" fill="var(--c-accent)" opacity=".9" />
    </g>
    <rect x="110" :y="pressed ? 196 : 118" width="100" height="12" rx="2" fill="var(--c-accent-2)" opacity=".85" />
    <rect x="154" :y="pressed ? 144 : 66" width="12" height="52" rx="3" fill="var(--c-text-dim)" opacity=".45" />
    <rect x="136" :y="pressed ? 132 : 54" width="48" height="9" rx="4" fill="var(--c-accent-2)" opacity=".7" />
    <g v-if="pressed">
      <CourseArrow :from="{ x: 250, y: 128 }" :to="{ x: 250, y: 194 }" stroke="var(--c-accent)" :stroke-width="3" :head-size="9" />
    </g>
    <text x="220" :y="pressed ? 222 : 142" font-size="12" fill="var(--c-text-dim)">活塞</text>
    <text x="92" y="184" font-size="12" text-anchor="end" fill="var(--c-text-dim)">筒</text>
    <text x="232" y="246" font-size="12" fill="var(--c-text-dim)">硝化棉</text>
  </svg>
</template>

<script setup lang="ts">
const { pressed = false } = defineProps<{ pressed?: boolean }>();
</script>
