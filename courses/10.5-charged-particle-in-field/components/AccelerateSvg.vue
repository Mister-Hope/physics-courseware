<script setup lang="ts">
/** 第 3、4 页：电子在平行金属板间由静止加速；点击后画出静电力 F。 */
defineProps<{ showForce?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 440 300" width="440" height="300" font-family="Inter, system-ui, sans-serif">
    <line x1="122" y1="32" x2="318" y2="32" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="118" y1="26" x2="118" y2="38" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="318" y1="26" x2="318" y2="38" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="220" y="22" text-anchor="middle" fill="var(--c-neutral-300)" font-size="14" font-style="italic" font-family="KaTeX_Math">U</text>
    <rect x="110" y="52" width="12" height="184" rx="3" fill="var(--c-velocity)" fill-opacity="0.28" stroke="var(--c-velocity)" stroke-width="1.6" />
    <rect x="318" y="52" width="12" height="184" rx="3" fill="var(--c-accent)" fill-opacity="0.28" stroke="var(--c-accent)" stroke-width="1.6" />
    <text x="116" y="150" text-anchor="middle" fill="var(--c-velocity)" font-size="15" font-weight="700">−</text>
    <text x="324" y="150" text-anchor="middle" fill="var(--c-accent)" font-size="15" font-weight="700">+</text>
    <CourseArrow :from="{ x: 316, y: 92 }" :to="{ x: 126, y: 92 }" stroke="var(--c-field)" stroke-width="2" opacity="0.8" />
    <CourseArrow :from="{ x: 316, y: 121 }" :to="{ x: 126, y: 121 }" stroke="var(--c-field)" stroke-width="2" opacity="0.8" />
    <CourseArrow :from="{ x: 316, y: 179 }" :to="{ x: 126, y: 179 }" stroke="var(--c-field)" stroke-width="2" opacity="0.8" />
    <CourseArrow :from="{ x: 316, y: 208 }" :to="{ x: 126, y: 208 }" stroke="var(--c-field)" stroke-width="2" opacity="0.8" />
    <text x="272" y="112" text-anchor="middle" fill="var(--c-field)" font-size="15" font-style="italic" font-family="KaTeX_Math">E</text>
    <circle cx="134" cy="150" r="9" fill="var(--c-velocity)" stroke="var(--c-text)" stroke-width="1.3" />
    <text x="134" y="154.5" text-anchor="middle" fill="var(--c-text)" font-size="12" font-weight="700">−</text>
    <line x1="122" y1="264" x2="318" y2="264" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="122" y1="258" x2="122" y2="270" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="318" y1="258" x2="318" y2="270" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="220" y="288" text-anchor="middle" fill="var(--c-neutral-300)" font-size="15" font-style="italic" font-family="KaTeX_Math">d</text>
    <g v-if="showForce">
      <CourseArrow :from="{ x: 148, y: 150 }" :to="{ x: 216, y: 150 }" stroke="var(--c-force)" stroke-width="2.8" label="F" :label-dx="0" :label-dy="-14" />
    </g>
  </svg>
</template>
