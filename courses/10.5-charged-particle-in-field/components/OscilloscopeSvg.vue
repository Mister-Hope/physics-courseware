<script setup lang="ts">
/** 第 13 页：示波管结构示意（电子枪 → 偏转电极 → 荧光屏）。 step 控制标注出现：1 电子枪、2 偏转电极、3 荧光屏、4 不加电压时的中心亮斑。 */
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 560 300" width="560" height="300" font-family="Inter, system-ui, sans-serif">
    <path d="M 20 118 L 400 118 L 470 82 L 470 248 L 400 212 L 20 212 Z" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-opacity="0.4" />
    <line x1="100" y1="165" x2="466" y2="165" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-dasharray="6 5" stroke-opacity="0.35" />
    <rect
      x="40"
      y="140"
      width="52"
      height="50"
      rx="10"
      fill="color-mix(in srgb, var(--c-surface-solid) 80%, transparent)"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
    />
    <line x1="52" y1="152" x2="52" y2="178" stroke="var(--c-accent)" stroke-width="3.2" stroke-linecap="round" />
    <line x1="70" y1="150" x2="70" y2="180" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line x1="78" y1="150" x2="78" y2="180" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path d="M 92 152 L 106 160 L 106 170 L 92 178 Z" fill="none" stroke="var(--c-text-dim)" stroke-width="1.5" />
    <rect
      x="190"
      y="126"
      width="180"
      height="78"
      rx="12"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      stroke-dasharray="6 5"
      stroke-opacity="0.55"
    />
    <rect
      x="470"
      y="82"
      width="12"
      height="166"
      rx="3"
      fill="color-mix(in srgb, var(--c-surface-solid) 85%, transparent)"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
    />
    <g v-if="(step ?? 0) >= 2">
      <CourseArrow :from="{ x: 280, y: 165 }" :to="{ x: 248, y: 165 }" stroke="var(--c-field)" stroke-width="2" />
      <CourseArrow :from="{ x: 280, y: 165 }" :to="{ x: 312, y: 165 }" stroke="var(--c-field)" stroke-width="2" />
      <CourseArrow :from="{ x: 280, y: 165 }" :to="{ x: 280, y: 136 }" stroke="var(--c-field)" stroke-width="2" />
      <CourseArrow :from="{ x: 280, y: 165 }" :to="{ x: 280, y: 194 }" stroke="var(--c-field)" stroke-width="2" />
      <text x="318" y="170" fill="var(--c-field)" font-size="13" font-style="italic" font-family="KaTeX_Math">X</text>
      <text x="288" y="132" fill="var(--c-field)" font-size="13" font-style="italic" font-family="KaTeX_Math">Y</text>
    </g>
    <g v-if="(step ?? 0) >= 1">
      <line x1="66" y1="192" x2="66" y2="252" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 4" />
      <text x="66" y="274" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">电子枪</text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <line x1="280" y1="206" x2="280" y2="252" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 4" />
      <text x="280" y="274" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">偏转电极</text>
    </g>
    <g v-if="(step ?? 0) >= 3">
      <line x1="476" y1="250" x2="476" y2="264" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 4" />
      <text x="476" y="284" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">荧光屏</text>
    </g>
    <g v-if="(step ?? 0) >= 4">
      <circle cx="476" cy="165" r="11" fill="var(--c-velocity)" fill-opacity="0.18" />
      <circle cx="476" cy="165" r="5" fill="var(--c-velocity)" />
      <line x1="484" y1="165" x2="508" y2="165" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 4" />
      <text x="514" y="169" fill="var(--c-velocity)" font-size="14">亮斑</text>
    </g>
  </svg>
</template>
