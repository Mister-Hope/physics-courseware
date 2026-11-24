<!-- 4.5 光的衍射：宽缝与窄缝的对比（几何示意，不画真实光场） -->
<template>
  <svg viewBox="0 0 280 220" width="280" xmlns="http://www.w3.org/2000/svg">
    <line v-for="x in waveX" :key="x" :x1="x" y1="42" :x2="x" y2="178" stroke="var(--c-accent-2)" stroke-width="1.1" opacity="0.4" />
    <rect x="140" y="18" width="10" :height="slitTop - 18" rx="2" fill="var(--c-neutral-600)" stroke="var(--c-neutral-300)" stroke-width="0.8" />
    <rect x="140" :y="slitBottom" width="10" :height="202 - slitBottom" rx="2" fill="var(--c-neutral-600)" stroke="var(--c-neutral-300)" stroke-width="0.8" />
    <line x1="150" y1="110" :x2="236" :y2="110 - beamHalf" stroke="var(--c-accent)" stroke-width="1.5" opacity="0.85" />
    <line x1="150" y1="110" x2="236" y2="110" stroke="var(--c-accent)" stroke-width="2.2" opacity="0.9" />
    <line x1="150" y1="110" :x2="236" :y2="110 + beamHalf" stroke="var(--c-accent)" stroke-width="1.5" opacity="0.65" />
    <line v-if="variant === 'narrow'" x1="150" y1="110" x2="236" y2="64" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <line v-if="variant === 'narrow'" x1="150" y1="110" x2="236" y2="156" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <rect x="238" y="18" width="7" height="184" fill="var(--c-neutral-700)" opacity="0.9" />
    <rect x="247" width="14" :height="beamHalf * 2" :y="110 - beamHalf" fill="var(--c-accent)" opacity="0.85" />
    <rect v-if="variant === 'narrow'" x="247" y="38" width="14" height="10" fill="var(--c-accent)" opacity="0.45" />
    <rect v-if="variant === 'narrow'" x="247" y="172" width="14" height="10" fill="var(--c-accent)" opacity="0.45" />
    <text x="138" y="212" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">单缝</text>
    <text x="252" y="212" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">屏</text>
    <text x="24" y="30" fill="var(--c-text-mute)" font-size="11">平行光</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { variant = "wide" } = defineProps<{ variant?: "wide" | "narrow" }>();

const waveX = [32, 52, 72, 92, 112, 128];
const slitHalf = computed(() => (variant === "wide" ? 25 : 8));
const slitTop = computed(() => 110 - slitHalf.value);
const slitBottom = computed(() => 110 + slitHalf.value);
const beamHalf = computed(() => (variant === "wide" ? 14 : 54));
</script>
