<!-- 2.5 液体 P10：毛细现象——玻璃管中水面上升、塑料笔芯中水面下降，管径越小越明显 -->
<script setup lang="ts">
const glassTubes = [
  { cx: 56, r: 20, level: 134 },
  { cx: 110, r: 13, level: 110 },
  { cx: 164, r: 8, level: 88 },
];
const plasticTubes = [
  { cx: 276, r: 20, level: 176 },
  { cx: 330, r: 13, level: 188 },
  { cx: 384, r: 8, level: 200 },
];

const glassPath = (tube: { cx: number; r: number; level: number }): string => {
  const left = tube.cx - tube.r + 1.5;
  const right = tube.cx + tube.r - 1.5;
  return `M ${left} ${tube.level} Q ${tube.cx} ${tube.level + 12} ${right} ${tube.level} L ${right} 246 L ${left} 246 Z`;
};

const plasticPath = (tube: { cx: number; r: number; level: number }): string => {
  const left = tube.cx - tube.r + 1.5;
  const right = tube.cx + tube.r - 1.5;
  return `M ${left} ${tube.level + 8} Q ${tube.cx} ${tube.level - 10} ${right} ${tube.level + 8} L ${right} 246 L ${left} 246 Z`;
};
</script>

<template>
  <svg viewBox="0 0 440 296" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="150" width="192" height="100" fill="rgba(96,165,250,0.16)" />
    <rect x="234" y="150" width="192" height="100" fill="rgba(96,165,250,0.16)" />
    <line x1="14" y1="150" x2="206" y2="150" stroke="var(--c-velocity)" stroke-width="2" />
    <line x1="234" y1="150" x2="426" y2="150" stroke="var(--c-velocity)" stroke-width="2" />
    <g v-for="tube in glassTubes" :key="`g${tube.cx}`">
      <line :x1="tube.cx - tube.r" y1="34" :x2="tube.cx - tube.r" y2="250" stroke="var(--c-neutral-300)" stroke-width="2.6" />
      <line :x1="tube.cx + tube.r" y1="34" :x2="tube.cx + tube.r" y2="250" stroke="var(--c-neutral-300)" stroke-width="2.6" />
      <path :d="glassPath(tube)" fill="rgba(96,165,250,0.38)" stroke="var(--c-velocity)" stroke-width="1.4" />
    </g>
    <g v-for="tube in plasticTubes" :key="`p${tube.cx}`">
      <line :x1="tube.cx - tube.r" y1="34" :x2="tube.cx - tube.r" y2="250" stroke="var(--c-neutral-500)" stroke-width="2.6" />
      <line :x1="tube.cx + tube.r" y1="34" :x2="tube.cx + tube.r" y2="250" stroke="var(--c-neutral-500)" stroke-width="2.6" />
      <path :d="plasticPath(tube)" fill="rgba(96,165,250,0.38)" stroke="var(--c-velocity)" stroke-width="1.4" />
    </g>
    <text x="110" y="270" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">甲 玻璃管：浸润，液面上升</text>
    <text x="330" y="270" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">乙 塑料笔芯：不浸润，液面下降</text>
    <text x="220" y="290" font-size="13" fill="var(--c-text-mute)" text-anchor="middle">管的内径越小，上升（下降）越明显</text>
  </svg>
</template>
