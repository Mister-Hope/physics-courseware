<template>
  <!-- P13 霍尔效应：矩形导体通电流 I，磁场垂直纸面向里，载流子受洛伦兹力向一侧偏转，两侧面间出现霍尔电压 -->
  <svg viewBox="0 0 440 280" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="霍尔效应示意图">
    <rect x="70" y="94" width="260" height="96" rx="2" fill="var(--c-neutral-700)" fill-opacity="0.45" stroke="var(--c-neutral-500)" stroke-width="1.8" />
    <FieldDots :x="110" :y="112" :cols="4" :rows="2" :spacing="56" dir="in" :size="4" color="var(--c-neutral-300)" />
    <text x="76" y="88" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">B</text>
    <text x="92" y="88" font-size="10" fill="var(--c-text-dim)">垂直纸面向里</text>
    <g stroke="var(--c-text)" stroke-width="2.2" stroke-linecap="round">
      <line x1="20" y1="142" x2="70" y2="142" />
      <line x1="330" y1="142" x2="410" y2="142" />
    </g>
    <CourseArrow :from="{ x: 108, y: 66 }" :to="{ x: 196, y: 66 }" stroke="var(--c-accent-2)" :stroke-width="2.4" :head-size="10" />
    <text x="202" y="72" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">I</text>
    <g fill="var(--c-velocity)">
      <circle cx="140" cy="142" r="5" />
      <circle cx="210" cy="142" r="5" />
      <circle cx="300" cy="142" r="5" />
    </g>
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 140, y: 133 }" :to="{ x: 140, y: 108 }" stroke="var(--c-danger)" :stroke-width="2" :head-size="7" />
      <CourseArrow :from="{ x: 210, y: 133 }" :to="{ x: 210, y: 108 }" stroke="var(--c-danger)" :stroke-width="2" :head-size="7" />
      <CourseArrow :from="{ x: 300, y: 133 }" :to="{ x: 300, y: 108 }" stroke="var(--c-danger)" :stroke-width="2" :head-size="7" />
      <text x="146" y="120" font-size="12" font-family="KaTeX_Math" font-style="italic" fill="var(--c-danger)">F</text>
    </g>
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 250, y: 142 }" :to="{ x: 250, y: 100 }" stroke="var(--c-accent)" :stroke-width="1.6" :head-size="6" />
      <CourseArrow :from="{ x: 250, y: 142 }" :to="{ x: 250, y: 184 }" stroke="var(--c-accent)" :stroke-width="1.6" :head-size="6" />
      <text x="258" y="140" font-size="12" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">U<tspan dy="3" font-size="8">H</tspan></text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>
