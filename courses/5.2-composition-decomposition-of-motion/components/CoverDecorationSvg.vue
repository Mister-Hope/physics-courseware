<script setup lang="ts">
/** 封面装饰：一个斜向的合矢量 + 两个互相垂直的分矢量（虚线平行四边形）。 */
</script>

<template>
  <svg viewBox="0 0 220 150" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="26" y1="126" x2="176" y2="126" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.35" />
    <line x1="26" y1="126" x2="26" y2="34" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.35" />
    <line x1="176" y1="126" x2="176" y2="52" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.35" />
    <line x1="26" y1="34" x2="176" y2="52" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.35" />
    <line x1="26" y1="126" x2="170" y2="126" stroke="#60a5fa" stroke-width="2.4" stroke-linecap="round" />
    <polygon points="176,126 164,121 164,131" fill="#60a5fa" />
    <line x1="26" y1="126" x2="26" y2="40" stroke="#e2a846" stroke-width="2.4" stroke-linecap="round" />
    <polygon points="26,34 21,46 31,46" fill="#e2a846" />
    <line x1="26" y1="126" x2="176" y2="52" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity="0.85" />
    <polygon points="181,49 168,49 174,60" fill="currentColor" opacity="0.85" />
  </svg>
</template>
