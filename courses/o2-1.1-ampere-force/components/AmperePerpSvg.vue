<!-- 第 8–9 页：导线与磁场垂直时的安培力（B 垂直纸面向里） -->
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ forceScale?: number }>(), { forceScale: 0.6 });
const forceLength = computed(() => 40 + 110 * Math.min(1, Math.max(0, props.forceScale)));
</script>

<template>
  <svg viewBox="0 0 480 300" class="course-fig" role="img" aria-label="导线与磁场垂直时的安培力">
    <rect
      x="70"
      y="45"
      width="340"
      height="230"
      rx="12"
      fill="color-mix(in srgb, var(--c-accent) 6%, transparent)"
      stroke="var(--c-accent)"
      stroke-width="1.5"
      stroke-dasharray="6 5"
    />
    <FieldDots :x="84" :y="56" dir="in" :cols="7" :rows="5" :spacing="48" :size="4" :line-width="1.4" opacity="0.7" />
    <text x="402" y="34" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)">B</text>
    <line x1="100" y1="170" x2="380" y2="170" stroke="var(--c-accent)" stroke-width="7" stroke-linecap="round" />
    <CourseArrow :from="{ x: 120, y: 170 }" :to="{ x: 200, y: 170 }" stroke="var(--c-accent-2)" :stroke-width="3" />
    <text x="145" y="158" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent-2)">I</text>
    <CourseArrow :from="{ x: 240, y: 170 }" :to="{ x: 240, y: 170 - forceLength }" stroke="var(--c-force)" :stroke-width="3" label="F" />
    <line x1="100" y1="214" x2="380" y2="214" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="100" y1="208" x2="100" y2="220" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="380" y1="208" x2="380" y2="220" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="240" y="240" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text-dim)">l</text>
  </svg>
</template>
