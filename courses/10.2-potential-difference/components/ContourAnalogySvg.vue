<script setup lang="ts">
/** 第 9 页：地图上的等高线 ↔ 电场中的等势线。右栏（等势线）由 showRight 控制，随第 1 次点击出现。 */
defineProps<{
  /** 显示右栏：全场辐向电场线与同心圆等势线 */
  showRight?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 360 360" width="360" height="360">
    <path
      d="M 66 92 C 66 38 106 18 180 18 C 254 18 294 38 294 92 C 294 146 254 166 180 166 C 106 166 66 146 66 92 Z"
      fill="none"
      stroke="var(--c-neutral-500)"
      stroke-width="1.6"
      opacity="0.9"
    />
    <path
      d="M 100 92 C 100 54 130 38 180 38 C 230 38 260 54 260 92 C 260 130 230 146 180 146 C 130 146 100 130 100 92 Z"
      fill="none"
      stroke="var(--c-neutral-500)"
      stroke-width="1.6"
      opacity="0.9"
    />
    <path
      d="M 136 92 C 136 68 154 56 180 56 C 206 56 224 68 224 92 C 224 116 206 128 180 128 C 154 128 136 116 136 92 Z"
      fill="none"
      stroke="var(--c-neutral-500)"
      stroke-width="1.6"
      opacity="0.9"
    />
    <text x="298" y="96" fill="var(--c-text-dim)" font-size="13" font-family="KaTeX_Main">100 m</text>
    <text x="264" y="82" fill="var(--c-text-dim)" font-size="12" font-family="KaTeX_Main">200 m</text>
    <text x="214" y="52" fill="var(--c-text-dim)" font-size="12" font-family="KaTeX_Main">300 m</text>
    <text x="180" y="182" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">地图上的等高线</text>
    <line x1="20" y1="198" x2="340" y2="198" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="5 5" />
    <g :style="{ visibility: showRight ? 'visible' : 'hidden' }">
      <circle cx="180" cy="276" r="72" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
      <circle cx="180" cy="276" r="48" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
      <circle cx="180" cy="276" r="24" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
      <CourseArrow :from="{ x: 180, y: 276 }" :to="{ x: 180, y: 210 }" stroke="var(--c-field)" stroke-width="1.6" />
      <CourseArrow :from="{ x: 180, y: 276 }" :to="{ x: 180, y: 342 }" stroke="var(--c-field)" stroke-width="1.6" />
      <CourseArrow :from="{ x: 180, y: 276 }" :to="{ x: 114, y: 276 }" stroke="var(--c-field)" stroke-width="1.6" />
      <CourseArrow :from="{ x: 180, y: 276 }" :to="{ x: 246, y: 276 }" stroke="var(--c-field)" stroke-width="1.6" />
      <circle cx="180" cy="276" r="6" fill="var(--c-force)" />
      <text x="180" y="281" text-anchor="middle" fill="var(--c-neutral-50)" font-size="11" font-weight="700">+</text>
      <text x="203" y="254" fill="var(--c-physics)" font-size="12" font-family="KaTeX_Main">30 V</text>
      <text x="221" y="237" fill="var(--c-physics)" font-size="12" font-family="KaTeX_Main">20 V</text>
      <text x="238" y="220" fill="var(--c-physics)" font-size="12" font-family="KaTeX_Main">10 V</text>
      <text x="180" y="352" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">电场中的等势线</text>
    </g>
  </svg>
</template>
