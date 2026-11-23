<!-- 第 6 页：两组同心圆（实线为波峰、虚线为波谷），M 处峰峰相遇、N 处峰谷相遇 -->
<template>
  <svg viewBox="95 8 470 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke-width="1.5">
      <circle
        v-for="ring in rings"
        :key="ring.key"
        :cx="ring.cx"
        :cy="ring.cy"
        :r="ring.r"
        :stroke="ring.stroke"
        :stroke-dasharray="ring.dash"
        :opacity="ring.opacity"
      />
    </g>
    <g v-if="step >= 1">
      <circle cx="330" cy="119" r="5.5" fill="var(--c-accent)" />
      <text x="330" y="101" text-anchor="middle" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">M</text>
    </g>
    <g v-if="step >= 2">
      <circle cx="298" cy="84" r="5.5" fill="var(--c-velocity)" />
      <text x="272" y="74" text-anchor="middle" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="var(--c-velocity)">N</text>
    </g>
    <circle cx="250" cy="160" r="5.5" fill="var(--c-accent)" />
    <circle cx="410" cy="160" r="5.5" fill="var(--c-physics)" />
    <text x="232" y="186" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">
      S<tspan dy="4" font-size="10">1</tspan>
    </text>
    <text x="428" y="186" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">
      S<tspan dy="4" font-size="10">2</tspan>
    </text>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

interface Ring {
  key: string;
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  dash: string;
  opacity: number;
}

const makeRings = (cx: number, cy: number, color: string, tag: string): Ring[] =>
  [45, 90, 135].map((r, i) => ({
    key: `${tag}${r}`,
    cx,
    cy,
    r,
    stroke: color,
    dash: i === 1 ? "" : "6 7",
    opacity: i === 1 ? 0.75 : 0.5,
  }));

const rings: Ring[] = [...makeRings(250, 160, "var(--c-accent)", "a"), ...makeRings(410, 160, "var(--c-physics)", "b")];
</script>
