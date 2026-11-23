<!--
  第 10 页：远距离输电的系统。发电站（约 10 kV）→ 升压变压器 → 高压输电线（总电阻 r）
  → 降压变电站（约 100 kV → 10 kV）→ 用户（220 V / 380 V）。
  step >= 1 时把输电线段与线路电阻点亮，强调损耗发生在这一段。
-->
<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const active = computed(() => step >= 1);
const wireStroke = computed(() => (active.value ? "var(--c-accent)" : "var(--c-neutral-500)"));
</script>

<template>
  <svg viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pc-box" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-surface)" />
        <stop offset="100%" stop-color="var(--c-surface-solid)" />
      </linearGradient>
    </defs>
    <rect x="8" y="56" width="106" height="72" rx="12" fill="url(#pc-box)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
    <text x="61" y="98" text-anchor="middle" font-size="13" fill="var(--c-text)">发电站</text>
    <text x="61" y="168" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="var(--c-text-dim)">10 kV</text>
    <CourseArrow :from="{ x: 116, y: 94 }" :to="{ x: 156, y: 94 }" stroke="var(--c-neutral-500)" :stroke-width="2" />
    <rect x="158" y="56" width="112" height="72" rx="12" fill="url(#pc-box)" stroke="var(--c-accent)" stroke-width="1.4" />
    <text x="214" y="98" text-anchor="middle" font-size="13" fill="var(--c-accent)">升压变压器</text>
    <text x="214" y="168" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="var(--c-text-dim)">几百 kV</text>
    <line x1="270" y1="108" x2="596" y2="108" stroke-width="2" :stroke="wireStroke" />
    <line x1="270" y1="84" x2="410" y2="84" stroke-width="2" :stroke="wireStroke" />
    <line x1="454" y1="84" x2="596" y2="84" stroke-width="2" :stroke="wireStroke" />
    <line v-if="active" x1="270" y1="84" x2="596" y2="84" stroke="var(--c-accent)" stroke-width="10" opacity="0.1" />
    <CircuitResistor :x="432" :y="84" orientation="horizontal" length="44" label="r" :color="active ? 'var(--c-accent)' : 'var(--c-text-dim)'" />
    <text x="432" y="40" text-anchor="middle" font-size="12" :fill="active ? 'var(--c-accent)' : 'var(--c-text-dim)'">高压输电线</text>
    <rect x="596" y="56" width="134" height="72" rx="12" fill="url(#pc-box)" stroke="var(--c-accent-2)" stroke-width="1.4" />
    <text x="663" y="98" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">降压变电站</text>
    <text x="663" y="168" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="var(--c-text-dim)">100 kV → 10 kV</text>
    <CourseArrow :from="{ x: 732, y: 94 }" :to="{ x: 768, y: 94 }" stroke="var(--c-neutral-500)" :stroke-width="2" />
    <rect x="770" y="56" width="122" height="72" rx="12" fill="url(#pc-box)" stroke="var(--c-physics)" stroke-width="1.4" />
    <text x="831" y="98" text-anchor="middle" font-size="13" fill="var(--c-physics)">用户</text>
    <text x="831" y="168" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="var(--c-text-dim)">220 V / 380 V</text>
  </svg>
</template>
