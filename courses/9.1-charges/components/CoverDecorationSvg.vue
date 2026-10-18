<script setup lang="ts">
/** 封面右下角装饰：一对正、负点电荷及其相互作用（同种相斥、异种相吸） */
const { width = 300 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 200 140" :width="width" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="26" fill="none" stroke="currentColor" stroke-width="2.6" opacity="0.85" />
    <text x="64" y="64" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="28" fill="currentColor" opacity="0.9">+</text>
    <circle cx="150" cy="64" r="17" fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.6" />
    <text x="150" y="64" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="20" fill="currentColor" opacity="0.75">−</text>
    <path d="M 96 56 C 112 48 122 48 130 54" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.5" />
    <path d="M 96 72 C 112 80 122 80 130 74" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.5" />
    <path d="M 30 116 H 186" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.35" />
  </svg>
</template>
