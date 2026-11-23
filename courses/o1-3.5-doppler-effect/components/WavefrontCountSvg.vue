<!-- 第 5 页：1 s 内通过观察者的波峰数——静止 3 个、靠近 6 个、远离 2 个（波速 120、λ₀ = 40、f₀ = 3 Hz 的示意） -->
<template>
  <svg viewBox="0 0 660 214" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-for="row in rows" :key="row.key">
      <text :x="16" :y="row.y + 5" font-size="14" fill="var(--c-text-dim)">{{ row.label }}</text>
      <text :x="648" :y="row.y - 34" text-anchor="end" font-size="14" fill="var(--c-accent)">1 s 内通过 {{ row.count }} 个波峰</text>
      <line :x1="150" :y1="row.y" :x2="620" :y2="row.y" stroke="var(--c-text-mute)" stroke-width="1" stroke-dasharray="5 5" opacity="0.5" />
      <line
        v-for="x in row.lines"
        :key="x"
        :x1="x"
        :y1="row.y - 22"
        :x2="x"
        :y2="row.y + 22"
        :stroke="row.color"
        stroke-width="1.8"
        opacity="0.75"
        stroke-linecap="round"
      />
      <circle cx="138" :cy="row.y" r="5.5" fill="var(--c-accent-light)" />
      <circle cx="628" :cy="row.y" r="7" fill="var(--c-physics-light)" />
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Row {
  key: string;
  label: string;
  y: number;
  count: number;
  lines: number[];
  color: string;
}

const makeLines = (spacing: number): number[] => {
  const xs: number[] = [];
  for (let x = 152; x <= 612; x += spacing) xs.push(x);
  return xs;
};

const rows: Row[] = [
  { key: "still", label: "相对静止", y: 58, count: 3, lines: makeLines(40), color: "var(--c-accent)" },
  { key: "near", label: "相互靠近", y: 126, count: 6, lines: makeLines(20), color: "var(--c-physics)" },
  { key: "far", label: "相互远离", y: 194, count: 2, lines: makeLines(60), color: "var(--c-velocity)" },
];
</script>
