<!-- 第 14 页练习一图：匀强电场中 A、B 沿电场方向相距 5 cm，C 与 B 相距 12 cm、BC 与电场方向成 60° -->
<script setup lang="ts">
defineProps<{
  /** 叠加上"沿电场方向的位移"分解（点击后才出） */
  showDecomp?: boolean;
}>();
</script>

<template>
  <svg
    viewBox="0 0 380 285"
    width="320"
    height="240"
    xmlns="http://www.w3.org/2000/svg"
    font-family="Inter, system-ui, sans-serif"
    role="img"
    aria-label="匀强电场中 A、B、C 三点的位置关系"
  >
    <CourseArrow v-for="y in [60, 135, 210]" :key="y" :from="{ x: 30, y }" :to="{ x: 350, y }" stroke="var(--c-field)" stroke-width="1.4" opacity="0.45" />
    <text x="362" y="56" text-anchor="end" fill="var(--c-accent)" font-size="19" font-style="italic" font-family="KaTeX_Math">E</text>
    <line x1="60" y1="210" x2="120" y2="210" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <line x1="120" y1="210" x2="192" y2="85.3" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <path d="M 150 210 A 30 30 0 0 0 135 184" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <text x="160" y="190" fill="var(--c-text-dim)" font-size="17">60°</text>
    <text x="90" y="198" text-anchor="middle" fill="var(--c-text-dim)" font-size="17">5 cm</text>
    <text x="184" y="150" fill="var(--c-text-dim)" font-size="17">12 cm</text>
    <circle cx="60" cy="210" r="4.5" fill="var(--c-accent)" />
    <circle cx="120" cy="210" r="4.5" fill="var(--c-accent)" />
    <circle cx="192" cy="85.3" r="4.5" fill="var(--c-accent)" />
    <text x="60" y="240" text-anchor="middle" fill="var(--c-accent)" font-size="19" font-family="KaTeX_Math" font-style="italic">A</text>
    <text x="120" y="240" text-anchor="middle" fill="var(--c-accent)" font-size="19" font-family="KaTeX_Math" font-style="italic">B</text>
    <text x="202" y="80" fill="var(--c-accent)" font-size="19" font-family="KaTeX_Math" font-style="italic">C</text>
    <g v-if="showDecomp">
      <line x1="192" y1="85.3" x2="192" y2="210" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="5 4" />
      <path d="M 182 210 L 182 200 L 192 200" fill="none" stroke="var(--c-text-dim)" stroke-width="1.3" />
      <line x1="120" y1="210" x2="192" y2="210" stroke="var(--c-accent-2)" stroke-width="4.5" stroke-linecap="round" />
      <line x1="120" y1="252" x2="192" y2="252" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line x1="120" y1="246" x2="120" y2="258" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line x1="192" y1="246" x2="192" y2="258" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <text x="156" y="274" text-anchor="middle" fill="var(--c-text-dim)" font-size="16">
        <tspan font-family="KaTeX_Math" font-style="italic">BC</tspan>
        <tspan font-family="KaTeX_Main">cos60°</tspan>
      </text>
    </g>
  </svg>
</template>
