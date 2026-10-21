<script setup lang="ts">
/** 第 2 页引课：医用电子直线加速器原理示意——电子枪射出电子，经加速管加速后轰击重金属靶。点击后画出静电力。 */
defineProps<{ showForce?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 460 250" width="460" height="250" font-family="Inter, system-ui, sans-serif">
    <rect
      x="22"
      y="96"
      width="54"
      height="58"
      rx="9"
      fill="color-mix(in srgb, var(--c-surface-solid) 82%, transparent)"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
    />
    <line x1="35" y1="112" x2="35" y2="138" stroke="var(--c-accent)" stroke-width="3.4" stroke-linecap="round" />
    <line x1="52" y1="110" x2="52" y2="140" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <line x1="62" y1="110" x2="62" y2="140" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <path d="M 76 116 L 92 122 L 92 128 L 76 134 Z" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="92" y1="103" x2="376" y2="103" stroke="var(--c-text-dim)" stroke-width="2" stroke-opacity="0.75" />
    <line x1="92" y1="147" x2="376" y2="147" stroke="var(--c-text-dim)" stroke-width="2" stroke-opacity="0.75" />
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-opacity="0.8">
      <line x1="132" y1="103" x2="132" y2="147" />
      <line x1="172" y1="103" x2="172" y2="147" />
      <line x1="212" y1="103" x2="212" y2="147" />
      <line x1="252" y1="103" x2="252" y2="147" />
      <line x1="292" y1="103" x2="292" y2="147" />
      <line x1="332" y1="103" x2="332" y2="147" />
    </g>
    <CourseArrow :from="{ x: 96, y: 125 }" :to="{ x: 386, y: 125 }" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="7 5" opacity="0.85" />
    <line x1="392" y1="96" x2="410" y2="146" stroke="var(--c-text)" stroke-width="6" stroke-linecap="round" />
    <line x1="392" y1="96" x2="400" y2="121" stroke="var(--c-accent)" stroke-width="6" stroke-linecap="round" />
    <text x="49" y="184" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">电子枪</text>
    <text x="240" y="184" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">加速管</text>
    <text x="392" y="184" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">重金属靶</text>
    <g v-if="showForce">
      <circle cx="212" cy="125" r="8" fill="var(--c-velocity)" stroke="var(--c-text)" stroke-width="1.2" />
      <text x="212" y="129" text-anchor="middle" fill="var(--c-text)" font-size="11" font-weight="700">−</text>
      <CourseArrow :from="{ x: 224, y: 125 }" :to="{ x: 276, y: 125 }" stroke="var(--c-force)" stroke-width="2.8" label="F" :label-dx="0" :label-dy="-14" />
    </g>
  </svg>
</template>
