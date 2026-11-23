<script setup lang="ts">
// 封面装饰：单摆（悬点、摆线、摆球、摆动圆弧与摆角），右下角半透明
</script>

<template>
  <svg viewBox="0 0 340 200" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="98" y="18" width="144" height="8" rx="4" fill="var(--c-text-dim)" opacity="0.45" />
    <circle cx="170" cy="26" r="3.4" fill="var(--c-text-dim)" opacity="0.9" />
    <path d="M 104.3 131.2 A 124 124 0 0 0 235.7 131.2" fill="none" stroke="var(--c-accent)" stroke-width="1.5" stroke-dasharray="4 7" opacity="0.5" />
    <circle cx="104.3" cy="131.2" r="7" fill="var(--c-accent)" opacity="0.28" />
    <line x1="170" y1="26" x2="170" y2="172" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 6" opacity="0.35" />
    <path d="M 170 66 A 40 40 0 0 0 191.2 59.9" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.7" />
    <text x="196" y="56" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-text-dim)" opacity="0.8">θ</text>
    <line x1="170" y1="26" x2="235.7" y2="131.2" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.85" />
    <circle cx="235.7" cy="131.2" r="22" fill="var(--c-accent)" opacity="0.12" />
    <circle cx="235.7" cy="131.2" r="15" fill="var(--c-accent)" stroke="var(--c-accent-glow)" stroke-width="1.2" opacity="0.92" />
    <circle cx="230" cy="126" r="4" fill="var(--c-accent-light)" opacity="0.55" />
  </svg>
</template>
