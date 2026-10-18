<script setup lang="ts">
/** 封面装饰图：多用电表表盘 + 选择开关旋钮的正面示意 */
const { width = 300 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 220 150" :width="width" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="16" width="172" height="120" rx="14" fill="none" stroke="currentColor" stroke-width="2" opacity="0.75" />
    <rect x="38" y="28" width="144" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.7" />
    <path d="M 60 78 A 62 62 0 0 1 160 78" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.7" />
    <line x1="110" y1="88" x2="140" y2="42" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="110" cy="88" r="3.5" fill="var(--c-accent)" />
    <circle cx="146" cy="112" r="22" fill="none" stroke="currentColor" stroke-width="2" opacity="0.75" />
    <line x1="146" y1="112" x2="146" y2="94" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.8" />
    <text x="62" y="120" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">V</text>
    <text x="88" y="120" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">mA</text>
    <text x="112" y="120" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent)">Ω</text>
    <path d="M 38 96 H 84" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.6" />
    <path d="M 38 96 V 116" fill="none" stroke="var(--c-danger)" stroke-width="2" opacity="0.8" />
    <path d="M 84 96 V 116" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="110" y="145" text-anchor="middle" style="font-size: 13px" fill="var(--c-text-dim)" opacity="0.7">练习使用多用电表</text>
  </svg>
</template>
