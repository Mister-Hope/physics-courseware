<!-- 第 11 页：V 形弯曲导线的有效长度（B 垂直纸面向里） -->
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 });
const showEffective = computed(() => props.step >= 1);
const showForce = computed(() => props.step >= 2);
</script>

<template>
  <svg viewBox="0 0 480 340" class="course-fig" role="img" aria-label="V 形导线的有效长度">
    <rect
      x="50"
      y="22"
      width="380"
      height="296"
      rx="12"
      fill="color-mix(in srgb, var(--c-accent) 6%, transparent)"
      stroke="var(--c-accent)"
      stroke-width="1.5"
      stroke-dasharray="6 5"
    />
    <FieldDots :x="64" :y="36" dir="in" :cols="7" :rows="6" :spacing="48" :size="4" :line-width="1.4" opacity="0.6" />
    <polyline points="100,70 240,312 380,70" fill="none" stroke="var(--c-accent)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
    <CourseArrow :from="{ x: 130, y: 122 }" :to="{ x: 186, y: 219 }" stroke="var(--c-accent-2)" :stroke-width="3" />
    <CourseArrow :from="{ x: 294, y: 219 }" :to="{ x: 350, y: 122 }" stroke="var(--c-accent-2)" :stroke-width="3" />
    <text x="148" y="168" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent-2)">I</text>
    <text x="92" y="56" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">a</text>
    <text x="386" y="56" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">c</text>
    <text x="246" y="330" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">b</text>
    <text x="286" y="286" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text-dim)">60°</text>
    <g v-show="showEffective">
      <line x1="100" y1="70" x2="380" y2="70" stroke="var(--c-accent-light)" stroke-width="2" stroke-dasharray="8 5" />
      <text x="240" y="54" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent-light)">l</text>
    </g>
    <g v-show="showForce">
      <CourseArrow :from="{ x: 240, y: 150 }" :to="{ x: 240, y: 30 }" stroke="var(--c-force)" :stroke-width="3" label="F" />
    </g>
    <text x="402" y="32" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)">B</text>
  </svg>
</template>
