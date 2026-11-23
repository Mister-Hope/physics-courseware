<script setup lang="ts">
// 封面装饰：气垫导轨上的两个滑块相向而碰（本课实验装置）
</script>

<template>
  <svg viewBox="0 0 340 200" width="330" role="img" aria-label="气垫导轨上两个滑块相碰">
    <rect x="18" y="96" width="304" height="14" rx="7" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <circle v-for="i in 7" :key="i" :cx="30 + i * 40" cy="103" r="1.3" fill="currentColor" opacity="0.35" />
    <g stroke="currentColor" stroke-width="1.6" opacity="0.7">
      <path d="M 60 110 V 148 M 280 110 V 148" />
      <path d="M 44 148 H 76 M 264 148 H 296" />
    </g>
    <rect x="86" y="66" width="52" height="26" rx="5" fill="var(--c-accent-2)" opacity="0.22" stroke="var(--c-accent-2)" stroke-width="1.6" />
    <rect x="202" y="66" width="52" height="26" rx="5" fill="var(--c-accent)" opacity="0.2" stroke="var(--c-accent)" stroke-width="1.6" />
    <line x1="40" y1="79" x2="80" y2="79" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 80 74 L 88 79 L 80 84" fill="none" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="300" y1="79" x2="260" y2="79" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 260 74 L 252 79 L 260 84" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <g stroke="var(--c-accent)" stroke-width="1.4" opacity="0.9">
      <line x1="170" y1="52" x2="170" y2="74" />
      <line x1="161" y1="58" x2="179" y2="68" />
      <line x1="179" y1="58" x2="161" y2="68" />
    </g>
  </svg>
</template>
