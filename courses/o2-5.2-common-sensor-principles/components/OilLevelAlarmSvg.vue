<template>
  <!-- 低油位报警装置：热敏电阻探头浸在油中，与灯、电源串联；液面低时探头露出、温度升高、电阻减小、灯亮 -->
  <svg viewBox="0 0 420 300" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="低油位报警装置示意图">
    <g stroke="var(--c-neutral-500)" stroke-width="2.4" fill="none" stroke-linejoin="round">
      <path d="M 40 92 L 40 258 L 210 258 L 210 92" />
    </g>
    <rect x="42" :y="surface" width="166" :height="256 - surface" fill="var(--c-accent-2)" fill-opacity="0.16" />
    <line x1="42" :y1="surface" x2="208" :y2="surface" stroke="var(--c-accent-2)" stroke-width="1.4" opacity="0.65" />
    <text x="62" y="242" font-size="11" fill="var(--c-text-dim)">油</text>
    <g stroke="var(--c-text-dim)" stroke-width="2.2" stroke-linecap="round">
      <line x1="118" y1="26" x2="118" y2="158" />
      <line x1="142" y1="26" x2="142" y2="158" />
    </g>
    <rect x="106" y="158" width="48" height="34" rx="2" fill="var(--c-surface-solid)" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="130" y="181" text-anchor="middle" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">
      R<tspan font-size="9" dy="3" font-family="KaTeX_Main" font-style="normal">t</tspan>
    </text>
    <g stroke="var(--c-text-dim)" stroke-width="1" stroke-linecap="round" opacity="0.8">
      <line x1="218" y1="166" x2="156" y2="172" />
    </g>
    <text x="222" y="170" font-size="11" fill="var(--c-text-dim)">热敏电阻</text>
    <g v-if="lit">
      <circle cx="324" cy="82" r="28" fill="var(--c-accent)" fill-opacity="0.22" />
      <g stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.75">
        <line x1="324" y1="44" x2="324" y2="34" />
        <line x1="324" y1="120" x2="324" y2="130" />
        <line x1="286" y1="82" x2="276" y2="82" />
        <line x1="362" y1="82" x2="372" y2="82" />
      </g>
    </g>
    <CircuitBulb :x="324" :y="82" :r="16" :line-width="2" :color="lit ? 'var(--c-accent)' : 'var(--c-text-dim)'" />
    <text x="348" y="58" font-size="11" fill="var(--c-text-dim)">灯</text>
    <g stroke="var(--c-text)" stroke-width="1.6" fill="none" stroke-linecap="round">
      <path d="M 142 26 L 324 26 L 324 66" />
      <path d="M 324 98 L 324 192" />
      <path d="M 324 208 L 324 272 L 18 272 L 18 26 L 118 26" />
    </g>
    <CircuitBattery :x="324" :y="200" orientation="vertical" :line-width="1.8" />
    <text x="344" y="206" font-size="11" fill="var(--c-text-dim)">电源</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** 液面低（探头露出、灯亮） */
    low?: boolean;
  }>(),
  { low: false },
);

const surface = computed(() => (props.low ? 214 : 150));
const lit = computed(() => props.low);
</script>
