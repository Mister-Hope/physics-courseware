<script setup lang="ts">
/** 第 12 页例题图：汽车在水平路面上行驶，题干给出速度 v 与阻力 F_阻； 点击后（匀速行驶的分析）才补上牵引力 F。 */
const { showAnalysis = false } = defineProps<{
  /** 点击后出现：牵引力 F（匀速时与阻力平衡） */
  showAnalysis?: boolean;
}>();

/** 汽车的几何中心：牵引力与阻力都从这里出发 */
const C = { x: 250, y: 172 };
</script>

<template>
  <svg viewBox="20 80 500 158" width="400" height="126" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="汽车在水平路面上以速度 v 行驶，受到阻力">
    <SurfaceHatch :from="{ x: 16, y: 216 }" :to="{ x: 504, y: 216 }" side="below" :thickness="14" :gap="23" />
    <path d="M 204 150 L 219 120 L 273 120 L 288 150 Z" fill="var(--c-surface-solid)" stroke="var(--c-velocity)" stroke-width="2.2" stroke-linejoin="round" />
    <path d="M 212 146 L 224 127 L 246 127 L 246 146 Z" fill="var(--c-velocity)" fill-opacity="0.35" />
    <path d="M 252 127 L 268 127 L 278 146 L 252 146 Z" fill="var(--c-velocity)" fill-opacity="0.35" />
    <rect x="160" y="150" width="180" height="42" rx="11" fill="var(--c-surface-solid)" stroke="var(--c-velocity)" stroke-width="2.4" />
    <circle cx="200" cy="200" r="16" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <circle cx="200" cy="200" r="6" fill="var(--c-text-dim)" />
    <circle cx="296" cy="200" r="16" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <circle cx="296" cy="200" r="6" fill="var(--c-text-dim)" />
    <CourseArrow :from="{ x: 262, y: 96 }" :to="{ x: 352, y: 96 }" stroke="var(--c-velocity)" :stroke-width="2.8" label="v" :label-dy="-11" />
    <CourseArrow :from="C" :to="{ x: 162, y: 172 }" stroke="var(--c-force)" :stroke-width="3" />
    <text x="188" y="158" font-size="18" fill="var(--c-force)" class="cp-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="13" dy="5">阻</tspan>
    </text>
    <g v-if="showAnalysis">
      <CourseArrow :from="C" :to="{ x: 340, y: 172 }" stroke="var(--c-accent)" :stroke-width="3.4" />
      <text x="348" y="166" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)" class="cp-lbl">F</text>
    </g>
  </svg>
</template>

<style scoped>
.cp-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
