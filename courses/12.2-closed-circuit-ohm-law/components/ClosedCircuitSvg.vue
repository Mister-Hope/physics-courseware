<!-- 第 3 页：闭合电路 = 外电路 + 内电路；showZones 时画出两侧虚线框与标注 -->
<template>
  <svg viewBox="0 0 640 320" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M140 90 H236" />
      <path d="M284 90 H520" />
      <path d="M140 240 H520" />
      <path d="M520 90 V153" />
      <path d="M520 177 V240" />
      <path d="M140 90 V157" />
      <path d="M140 173 V240" />
    </g>
    <CircuitBattery :x="140" :y="165" orientation="vertical" polarity emf="E" />
    <CircuitResistor :x="260" :y="90" label="R" />
    <CircuitBulb :x="520" :y="165" orientation="vertical" label="L" />
    <CourseArrow :from="{ x: 330, y: 98 }" :to="{ x: 400, y: 98 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" />
    <CourseArrow :from="{ x: 140, y: 210 }" :to="{ x: 140, y: 190 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <CourseArrow :from="{ x: 460, y: 248 }" :to="{ x: 390, y: 248 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <g v-if="showZones">
      <rect x="96" y="100" width="88" height="128" rx="14" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.9" />
      <rect x="184" y="50" width="444" height="250" rx="14" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.75" />
      <text x="520" y="38" text-anchor="middle" font-size="19" font-weight="600" fill="var(--c-accent)">外电路</text>
      <text x="140" y="272" text-anchor="middle" font-size="19" font-weight="600" fill="var(--c-physics)">内电路</text>
    </g>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ showZones?: boolean }>();
</script>
