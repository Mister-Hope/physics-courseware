<script setup lang="ts">
// 受迫振动装置：电动机通过连杆对弹簧振子施加周期性驱动力
import { computed } from "vue";

const { showForce = true } = defineProps<{ showForce?: boolean }>();

const SPRING_START = 155;
const SPRING_END = 400;
const SPRING_Y = 147;
const BASE = 170;

const springPath = computed(() => {
  const segments = 16;
  const step = (SPRING_END - SPRING_START) / segments;
  const points: string[] = [`M ${SPRING_START} ${SPRING_Y}`];
  for (let i = 1; i < segments; i += 1) {
    const x = SPRING_START + step * i;
    const y = SPRING_Y + (i % 2 === 1 ? -9 : 9);
    points.push(`L ${x.toFixed(1)} ${y}`);
  }
  points.push(`L ${SPRING_END} ${SPRING_Y}`);
  return points.join(" ");
});
</script>

<template>
  <svg viewBox="0 0 720 220" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <SurfaceHatch
      :from="{ x: 30, y: BASE }"
      :to="{ x: 690, y: BASE }"
      side="below"
      :thickness="10"
      :gap="24"
      color="var(--c-text-dim)"
      :line-width="2.2"
      :hatch-width="1.1"
    />
    <line x1="52" y1="92" x2="118" y2="92" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
    <circle cx="85" cy="118" r="26" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2.2" />
    <circle cx="85" cy="118" r="8" fill="var(--c-accent)" opacity="0.85" />
    <line x1="85" y1="118" x2="85" y2="144" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-linecap="round" />
    <line x1="85" y1="144" x2="155" y2="147" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="85" cy="144" r="3.5" fill="var(--c-text-dim)" />
    <circle cx="155" cy="147" r="3.5" fill="var(--c-text-dim)" />
    <line x1="85" y1="144" x2="85" y2="170" stroke="var(--c-text-dim)" stroke-width="2" />
    <path :d="springPath" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="400" y="124" width="60" height="46" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2" />
    <line x1="430" y1="124" x2="430" y2="170" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <path d="M 57 100 A 32 32 0 0 1 86 86" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
    <polygon points="86,86 78,88 82,94" fill="var(--c-accent)" />
    <text x="85" y="200" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">电动机</text>
    <text x="270" y="180" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">弹簧</text>
    <text x="430" y="200" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">物块</text>
    <g v-if="showForce">
      <CourseArrow :from="{ x: 178, y: 132 }" :to="{ x: 158, y: 132 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="6" />
      <CourseArrow :from="{ x: 182, y: 132 }" :to="{ x: 202, y: 132 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="6" />
      <text x="180" y="118" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-accent)">
        F<tspan font-size="10" dy="3">驱</tspan>
      </text>
    </g>
  </svg>
</template>
