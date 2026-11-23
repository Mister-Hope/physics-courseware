<template>
  <!-- 电阻应变片：拉伸时金属丝变长变细、电阻变大；压缩时变短变粗、电阻变小 -->
  <svg viewBox="0 0 460 250" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="电阻应变片拉伸与压缩示意图">
    <text x="128" y="42" text-anchor="middle" font-size="13" fill="var(--c-text)">拉伸</text>
    <rect x="48" y="110" width="160" height="56" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <path d="M 60 122 H 196 V 138 H 60 V 154 H 196" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" />
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <line x1="60" y1="122" x2="38" y2="122" />
      <line x1="196" y1="154" x2="218" y2="154" />
    </g>
    <g fill="var(--c-text-dim)">
      <circle cx="38" cy="122" r="3" />
      <circle cx="218" cy="154" r="3" />
    </g>
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 48, y: 138 }" :to="{ x: 18, y: 138 }" stroke="var(--c-danger)" :stroke-width="2.4" :head-size="10" />
      <CourseArrow :from="{ x: 208, y: 138 }" :to="{ x: 238, y: 138 }" stroke="var(--c-danger)" :stroke-width="2.4" :head-size="10" />
      <text x="128" y="204" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Math" font-style="italic">L</tspan> 变长，<tspan font-family="KaTeX_Math" font-style="italic">S</tspan> 变小
      </text>
    </g>
    <text x="330" y="42" text-anchor="middle" font-size="13" fill="var(--c-text)">压缩</text>
    <rect x="262" y="110" width="120" height="56" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <path d="M 274 122 H 370 V 138 H 274 V 154 H 370" fill="none" stroke="var(--c-accent)" stroke-width="4.4" stroke-linejoin="round" stroke-linecap="round" />
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <line x1="274" y1="122" x2="252" y2="122" />
      <line x1="370" y1="154" x2="392" y2="154" />
    </g>
    <g fill="var(--c-text-dim)">
      <circle cx="252" cy="122" r="3" />
      <circle cx="392" cy="154" r="3" />
    </g>
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 238, y: 138 }" :to="{ x: 262, y: 138 }" stroke="var(--c-danger)" :stroke-width="2.4" :head-size="10" />
      <CourseArrow :from="{ x: 408, y: 138 }" :to="{ x: 382, y: 138 }" stroke="var(--c-danger)" :stroke-width="2.4" :head-size="10" />
      <text x="330" y="204" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Math" font-style="italic">L</tspan> 变短，<tspan font-family="KaTeX_Math" font-style="italic">S</tspan> 变大
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>
