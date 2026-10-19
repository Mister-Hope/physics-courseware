<script setup lang="ts">
// 练习 5 图：五条左密右疏的电场线，A、C 在同一条线上，B 在另一条上
// show-e：过 A、C 作切线；show-f：负电荷在 B 受的电场力沿切线反向
defineProps<{ showE?: boolean; showF?: boolean }>();

const LINES = [90, 120, 150, 180, 210];
const linePath = (yLeft: number, yRight: number): string => `M 55 ${yLeft} C 175 ${yLeft} 335 ${yRight} 455 ${yRight}`;
const paths = LINES.map((y) => linePath(150 + (y - 150) * 0.55, 150 + (y - 150) * 1.7));
</script>

<template>
  <svg viewBox="0 0 500 300" width="360" height="216">
    <defs>
      <marker id="fpe-e" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-force)" />
      </marker>
      <marker id="fpe-f" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-velocity)" />
      </marker>
    </defs>
    <path v-for="(d, i) in paths" :key="i" :d="d" stroke="var(--c-field)" stroke-opacity="0.75" stroke-width="2" fill="none" marker-end="url(#fpe-e)" />
    <g v-if="showE">
      <line x1="82" y1="150" x2="158" y2="141" stroke="var(--c-force)" stroke-width="2.6" stroke-dasharray="6 4" />
      <line x1="242" y1="137" x2="318" y2="118" stroke="var(--c-force)" stroke-width="2.6" stroke-dasharray="6 4" />
      <text x="96" y="128" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-force)">E</text>
      <text x="292" y="106" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-force)">E</text>
    </g>
    <g v-if="showF">
      <line x1="398" y1="180" x2="330" y2="188" stroke="var(--c-velocity)" stroke-width="3.2" marker-end="url(#fpe-f)" />
      <text x="352" y="210" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-velocity)">F</text>
    </g>
    <circle cx="110" cy="150" r="5" fill="var(--c-gold)" />
    <text x="110" y="172" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-gold)">A</text>
    <circle cx="280" cy="125" r="5" fill="var(--c-gold)" />
    <text x="280" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-gold)">C</text>
    <circle cx="400" cy="183" r="15" fill="var(--c-velocity)" fill-opacity="0.9" />
    <text x="400" y="183" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#fff">−</text>
    <text x="430" y="166" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-gold)">B</text>
  </svg>
</template>
