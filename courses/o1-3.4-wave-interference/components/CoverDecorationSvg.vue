<!-- 封面装饰：两个波源发出的圆形波前相遇，叠加出稳定的干涉图样 -->
<template>
  <svg viewBox="0 0 320 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
    <line x1="160" y1="12" x2="160" y2="178" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="6 7" opacity="0.5" />
    <circle cx="112" cy="95" r="5" fill="var(--c-accent)" />
    <circle cx="208" cy="95" r="5" fill="var(--c-physics)" />
    <circle cx="160" cy="40" r="3.2" fill="var(--c-accent)" opacity="0.85" />
    <circle cx="160" cy="95" r="3.2" fill="var(--c-accent)" opacity="0.85" />
    <circle cx="160" cy="150" r="3.2" fill="var(--c-accent)" opacity="0.85" />
  </svg>
</template>

<script setup lang="ts">
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
  [22, 44, 66, 88, 110].map((r, i) => ({
    key: `${tag}${r}`,
    cx,
    cy,
    r,
    stroke: color,
    dash: i % 2 === 0 ? "5 6" : "",
    opacity: 0.6 - i * 0.09,
  }));

const rings: Ring[] = [...makeRings(112, 95, "var(--c-accent)", "a"), ...makeRings(208, 95, "var(--c-physics)", "b")];
</script>
