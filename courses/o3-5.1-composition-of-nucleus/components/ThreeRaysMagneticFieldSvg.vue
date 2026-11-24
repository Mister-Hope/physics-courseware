<!-- 5.1 射线在磁场中的偏转：铅容器小孔射出细束，磁场垂直纸面向里，α 向上偏、β 向下偏、γ 不偏 -->
<template>
  <svg viewBox="0 0 860 270" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="nucleus-b-into-page" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="5.5" fill="none" stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.45" />
        <path d="M 15 15 L 25 25 M 25 15 L 15 25" stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.45" />
      </pattern>
    </defs>
    <rect x="170" y="28" width="420" height="214" fill="url(#nucleus-b-into-page)" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="5 5" />
    <text x="176" y="20" font-size="14" fill="var(--c-text-dim)"><tspan font-family="KaTeX_Math" font-style="italic">B</tspan> 垂直纸面向里</text>
    <rect x="8" y="78" width="112" height="68" rx="6" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <rect x="8" y="154" width="112" height="72" rx="6" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <circle cx="52" cy="150" r="20" fill="var(--c-accent)" opacity="0.14" />
    <circle cx="52" cy="150" r="9" fill="var(--c-accent)" />
    <line x1="52" y1="150" x2="170" y2="150" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <text x="52" y="66" text-anchor="middle" font-size="14" fill="var(--c-accent)">放射源</text>
    <text x="58" y="244" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">铅容器</text>
    <g v-if="showSplit">
      <path d="M 170 150 C 220 150 340 74 590 74 L 790 74" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
      <path d="M 170 150 C 220 150 340 226 590 226 L 790 226" fill="none" stroke="var(--c-velocity)" stroke-width="2.6" stroke-linecap="round" />
      <path :d="gammaPath" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
    </g>
    <rect x="792" y="36" width="10" height="198" rx="2" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="797" y="250" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">感光底片</text>
    <g v-if="showSplit">
      <circle cx="797" cy="74" r="3.4" fill="var(--c-accent)" />
      <circle cx="797" cy="150" r="3.4" fill="var(--c-text-dim)" />
      <circle cx="797" cy="226" r="3.4" fill="var(--c-velocity)" />
    </g>
    <g v-if="showLabels">
      <text x="600" y="58" font-size="17" fill="var(--c-accent)"><tspan font-family="KaTeX_Math" font-style="italic">α</tspan> 射线（氦核流）</text>
      <text x="600" y="180" font-size="17" fill="var(--c-text-dim)"><tspan font-family="KaTeX_Math" font-style="italic">γ</tspan> 射线（光子）</text>
      <text x="600" y="252" font-size="17" fill="var(--c-velocity)"><tspan font-family="KaTeX_Math" font-style="italic">β</tspan> 射线（电子流）</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{
  /** 当前点击步数：1 显示三束偏转，3 显示三条射线的名称 */
  step?: number;
}>();

const showSplit = computed((): boolean => step >= 1);
const showLabels = computed((): boolean => step >= 3);

/** γ 射线的波浪线：沿 y=150 从 x=170 画到 x=790 */
const gammaPath = computed((): string => {
  let d = "M 170 150";
  for (let x = 170; x < 790; x += 16) d += " q 4 -10 8 0 q 4 10 8 0";
  return d;
});
</script>
