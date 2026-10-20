<!-- 第 3 页：有闭合电路时变化的磁场产生感应电流；没有闭合电路时，空间里仍然产生电场 -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 820 260" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="180" y="28" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">有闭合电路</text>
    <g v-if="(step ?? 0) >= 1">
      <rect x="40" y="60" width="280" height="120" rx="10" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="7 5" />
      <FieldDots :x="82" :y="78" :cols="8" :rows="4" :spacing="28" :size="4" dir="in" color="var(--c-accent)" />
      <text x="180" y="230" text-anchor="middle" font-size="16" fill="var(--c-text)">
        变化的磁场
        <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
      </text>
      <path d="M 22 200 V 46 H 338 V 200" fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round" />
      <path d="M 22 200 H 154" fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round" />
      <path d="M 186 200 H 338" fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round" />
      <CircuitMeter :x="170" :y="200" kind="a" :r="16" />
      <text x="180" y="254" text-anchor="middle" font-size="15" fill="var(--c-accent)">感应电流，电流表有示数</text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <text x="590" y="28" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">没有闭合电路</text>
      <rect x="450" y="60" width="280" height="120" rx="10" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="7 5" />
      <FieldDots :x="492" :y="78" :cols="8" :rows="4" :spacing="28" :size="4" dir="in" color="var(--c-accent)" />
      <text x="590" y="230" text-anchor="middle" font-size="16" fill="var(--c-text)">
        变化的磁场
        <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
      </text>
      <rect x="428" y="42" width="324" height="160" rx="16" fill="none" stroke="var(--c-danger)" stroke-width="1.8" stroke-dasharray="5 6" />
      <text x="590" y="254" text-anchor="middle" font-size="16" fill="var(--c-danger)">
        空间中的电场
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
      </text>
    </g>
  </svg>
</template>
