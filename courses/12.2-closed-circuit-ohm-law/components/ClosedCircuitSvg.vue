<!-- 第 3 页：闭合电路 = 外电路 + 内电路；showZones 时画出两侧虚线框与标注 -->
<template>
  <svg viewBox="0 0 640 320" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M140 90 H520" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M140 240 H520" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M520 90 V240" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitBattery :x="140" :y="165" orientation="vertical" polarity emf="E" />
    <path d="M140 90 V157" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M140 173 V240" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitResistor :x="260" :y="90" label="R" />
    <path d="M140 90 H236" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M284 90 H520" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitBulb :x="520" :y="165" orientation="vertical" />
    <path d="M520 90 V153" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M520 177 V240" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <g v-if="showZones">
      <rect x="196" y="40" width="424" height="96" rx="14" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.75" />
      <text x="408" y="30" text-anchor="middle" font-size="17" fill="var(--c-accent)">外电路</text>
      <rect x="70" y="102" width="146" height="126" rx="14" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.9" />
      <text x="143" y="290" text-anchor="middle" font-size="17" fill="var(--c-physics)">内电路</text>
    </g>
    <CourseArrow :from="{ x: 330, y: 98 }" :to="{ x: 400, y: 98 }" stroke="var(--c-accent)" stroke-width="2.4" label="I" />
    <CourseArrow :from="{ x: 140, y: 208 }" :to="{ x: 140, y: 190 }" stroke="var(--c-accent)" stroke-width="2.4" />
  </svg>
</template>
<script setup lang="ts">
defineProps<{ showZones?: boolean }>();
</script>
