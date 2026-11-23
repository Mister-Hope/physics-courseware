<!-- 第 5 页：水槽干涉实验（俯视）：两根细杆固定在同一个振动片上，发出同频率的圆形波前 -->
<template>
  <svg viewBox="30 6 600 206" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <clipPath id="wi-tank-clip">
        <rect x="40" y="70" width="580" height="132" rx="10" />
      </clipPath>
    </defs>
    <rect x="40" y="70" width="580" height="132" rx="10" fill="var(--c-physics)" opacity="0.06" />
    <rect x="40" y="70" width="580" height="132" rx="10" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.55" />
    <g clip-path="url(#wi-tank-clip)" fill="none" stroke-width="1.4">
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
    <rect x="300" y="16" width="60" height="18" rx="5" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="330" y="10" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">振动片</text>
    <line x1="316" y1="34" x2="266" y2="70" stroke="var(--c-accent)" stroke-width="1.8" />
    <line x1="344" y1="34" x2="394" y2="70" stroke="var(--c-accent)" stroke-width="1.8" />
    <circle cx="266" cy="70" r="5" fill="var(--c-accent)" />
    <circle cx="394" cy="70" r="5" fill="var(--c-physics)" />
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
  [30, 60, 90, 120, 150].map((r, i) => ({
    key: `${tag}${r}`,
    cx,
    cy,
    r,
    stroke: color,
    dash: i % 2 === 0 ? "5 7" : "",
    opacity: 0.55 - i * 0.07,
  }));

const rings: Ring[] = [...makeRings(266, 70, "var(--c-accent)", "a"), ...makeRings(394, 70, "var(--c-physics)", "b")];
</script>
