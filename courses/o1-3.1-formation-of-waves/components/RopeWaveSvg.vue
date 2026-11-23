<!-- 第 3 页：绳波的产生与传播。抖动一次形成凸起向右传；红标记只上下振动，不随波迁移 -->
<template>
  <svg viewBox="0 0 660 220" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="28" y1="128" x2="632" y2="128" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.4" />
    <polyline :points="rope" fill="none" stroke="var(--c-accent)" stroke-width="3.2" stroke-linecap="round" />
    <line v-show="step >= 1" :x1="markerX" :y1="72" :x2="markerX" :y2="184" stroke="var(--c-danger)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.55" />
    <circle :cx="markerX" :cy="markerY" r="6" fill="var(--c-danger)" />
    <text :x="markerX + 12" y="96" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-danger)">红标记</text>
    <g v-show="step === 0">
      <line x1="40" y1="92" x2="40" y2="164" stroke="var(--c-physics)" stroke-width="2" />
      <path d="M 40 90 l -4.5 7 h 9 z" fill="var(--c-physics)" />
      <path d="M 40 166 l -4.5 -7 h 9 z" fill="var(--c-physics)" />
    </g>
    <g v-show="step >= 1">
      <CourseArrow :from="{ x: 372, y: 64 }" :to="{ x: 566, y: 64 }" stroke="var(--c-velocity)" :stroke-width="2.2" :dasharray="'7 5'" :head-size="11" />
      <text x="372" y="52" font-family="Nunito Sans, system-ui, sans-serif" font-size="14" fill="var(--c-velocity)">传播方向</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { step } = defineProps<{ step: number }>();

const axisY = 128;
const markerX = 300;
const amp = 34;
const lambda = 150;
const xFront = 415;

const pulseY = (x: number): number => axisY - 32 * Math.exp(-(((x - 210) * (x - 210)) / (2 * 30 * 30)));

const trainY = (x: number): number => (x <= xFront ? axisY - amp * Math.sin(((x - 40) / lambda) * Math.PI * 2) : axisY);

const ropeY = (x: number): number => {
  if (step === 0) return axisY;
  if (step === 1) return pulseY(x);
  return trainY(x);
};

const rope = computed(() =>
  Array.from({ length: 297 }, (_, i) => {
    const x = 40 + i * 2;
    return `${x},${ropeY(x).toFixed(2)}`;
  }).join(" "),
);

const markerY = computed(() => ropeY(markerX));
</script>
