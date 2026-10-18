<script setup lang="ts">
/** 封面装饰图：上为串联电路、下为并联电路的两个电阻组合示意 */
const { width = 300 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 220 150" :width="width" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.75">
      <path d="M 30 22 V 42" />
      <path d="M 30 58 V 70 H 190 V 22 H 174" />
      <path d="M 126 22 H 109" />
      <path d="M 61 22 H 30" />
    </g>
    <line x1="18" y1="34" x2="42" y2="34" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity="0.75" />
    <line x1="24" y1="46" x2="36" y2="46" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity="0.75" />
    <CircuitResistor :x="85" :y="22" color="currentColor" :line-width="2" />
    <CircuitResistor :x="150" :y="22" color="currentColor" :line-width="2" />
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.75">
      <path d="M 30 86 V 106" />
      <path d="M 30 122 V 140 H 190 V 86" />
      <path d="M 30 86 H 190" />
      <path d="M 90 86 V 89" />
      <path d="M 90 137 V 140" />
      <path d="M 150 86 V 89" />
      <path d="M 150 137 V 140" />
    </g>
    <line x1="18" y1="98" x2="42" y2="98" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity="0.75" />
    <line x1="24" y1="110" x2="36" y2="110" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity="0.75" />
    <circle cx="90" cy="86" r="3" fill="currentColor" opacity="0.75" />
    <circle cx="90" cy="140" r="3" fill="currentColor" opacity="0.75" />
    <circle cx="150" cy="86" r="3" fill="currentColor" opacity="0.75" />
    <circle cx="150" cy="140" r="3" fill="currentColor" opacity="0.75" />
    <CircuitResistor :x="90" :y="113" orientation="vertical" color="currentColor" :line-width="2" />
    <CircuitResistor :x="150" :y="113" orientation="vertical" color="currentColor" :line-width="2" />
  </svg>
</template>
