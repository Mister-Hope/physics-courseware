<!-- 第 13 页：光谱中的吸收线——远离时向红端移动（红移），靠近时向蓝端移动（蓝移） -->
<template>
  <svg viewBox="0 0 660 236" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="dp-spectrum" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#7c3aed" />
        <stop offset="0.25" stop-color="#3b82f6" />
        <stop offset="0.5" stop-color="#22c55e" />
        <stop offset="0.75" stop-color="#eab308" />
        <stop offset="1" stop-color="#ef4444" />
      </linearGradient>
    </defs>
    <g v-for="row in rows" :key="row.key">
      <text :x="16" :y="row.y - 26" font-size="14" fill="var(--c-text-dim)">{{ row.label }}</text>
      <rect x="120" :y="row.y - 14" width="480" height="28" rx="4" fill="url(#dp-spectrum)" opacity="0.3" />
      <line v-for="x in row.rest" :key="`r${x}`" :x1="x" :y1="row.y - 14" :x2="x" :y2="row.y + 14" stroke="#f8fafc" stroke-width="2" opacity="0.75" />
      <line v-for="x in row.moved" :key="`m${x}`" :x1="x" :y1="row.y - 14" :x2="x" :y2="row.y + 14" :stroke="row.color" stroke-width="2.6" />
      <text :x="row.tipX" :y="row.y + 34" :fill="row.color" font-size="14" text-anchor="middle">{{ row.tip }}</text>
    </g>
    <text x="120" y="24" font-size="13" fill="var(--c-velocity)">蓝端</text>
    <text x="600" y="24" font-size="13" fill="#ef4444" text-anchor="end">红端</text>
  </svg>
</template>

<script setup lang="ts">
interface Row {
  key: string;
  label: string;
  y: number;
  rest: number[];
  moved: number[];
  color: string;
  tip: string;
  tipX: number;
}

const rows: Row[] = [
  {
    key: "away",
    label: "星球远离我们",
    y: 90,
    rest: [230, 350, 470],
    moved: [262, 382, 502],
    color: "#ef4444",
    tip: "谱线向红端移动",
    tipX: 520,
  },
  {
    key: "near",
    label: "星球靠近我们",
    y: 186,
    rest: [230, 350, 470],
    moved: [198, 318, 438],
    color: "var(--c-velocity)",
    tip: "谱线向蓝端移动",
    tipX: 300,
  },
];
</script>
