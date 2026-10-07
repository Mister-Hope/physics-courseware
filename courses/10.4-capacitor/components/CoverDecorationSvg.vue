<script setup lang="ts">
/** 封面 / 章节页右下角装饰图：平行板电容器示意 */
const { width = 300 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 200 140" :width="width" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="60" x2="85" y2="60" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    <rect x="85" y="8" width="10" height="104" rx="5" fill="none" stroke="currentColor" stroke-width="3" />
    <rect x="105" y="8" width="10" height="104" rx="5" fill="none" stroke="currentColor" stroke-width="3" />
    <line x1="115" y1="60" x2="170" y2="60" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    <line x1="50" y1="20" x2="50" y2="100" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.35" />
    <line x1="150" y1="20" x2="150" y2="100" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.35" />
    <text x="100" y="134" text-anchor="middle" style="font-size: 13px" fill="#94a3b8" opacity="0.7">平行板电容器</text>
  </svg>
</template>
