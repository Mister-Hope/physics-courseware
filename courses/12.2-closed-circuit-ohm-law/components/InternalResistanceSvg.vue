<!-- 第 6 页：电源的内阻——把电源看成"电动势 E 与内阻 r 串联"；showInner/showOuter 点击后标出内、外电压 -->
<template>
  <svg viewBox="0 0 720 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="50" width="180" height="210" rx="16" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.9" />
    <text x="120" y="40" text-anchor="middle" font-size="17" fill="var(--c-physics)">电源</text>
    <path d="M660 90 H112" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M660 90 V240" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M660 240 H120" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitBattery :x="120" :y="118" orientation="vertical" polarity emf="E" />
    <path d="M120 90 V110" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M120 126 V146" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitResistor :x="120" :y="170" orientation="vertical" label="r" />
    <path d="M120 194 V240" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitResistor :x="390" :y="90" label="R" />
    <path d="M112 90 H366" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M414 90 H660" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CourseArrow :from="{ x: 480, y: 98 }" :to="{ x: 560, y: 98 }" stroke="var(--c-accent)" stroke-width="2.4" label="I" />
    <CourseArrow :from="{ x: 300, y: 232 }" :to="{ x: 220, y: 232 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <g v-if="showOuter">
      <ChartLabel :x-percent="54" :y-percent="8" :parts="[{ tex: 'U_{\\text{外}} = IR' }]" size="19" color="var(--c-accent)" />
    </g>
    <g v-if="showInner">
      <ChartLabel :x-percent="26" :y-percent="94" :parts="[{ text: 'U' }, { text: '内', sub: true }, { text: ' = Ir' }]" size="19" />
    </g>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ showOuter?: boolean; showInner?: boolean }>();
</script>
