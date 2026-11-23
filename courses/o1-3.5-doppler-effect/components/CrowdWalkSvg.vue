<!-- 第 4 页：模拟实验——队伍每分钟经过 30 人，观察者逆着走、顺着走时的“过人频率” -->
<template>
  <svg viewBox="0 0 660 214" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="530" cy="14" r="6" fill="var(--c-physics-light)" />
    <text x="542" y="19" font-size="12" fill="var(--c-text-dim)">观察者</text>
    <g v-for="(row, i) in rows" :key="row.key" v-show="i === 0 || step >= i">
      <text :x="16" :y="row.y + 5" font-size="14" fill="var(--c-text-dim)">{{ row.label }}</text>
      <g opacity="0.55" stroke="var(--c-text-dim)" stroke-width="1.2" fill="none">
        <line :x1="150" :y1="row.y - 26" :x2="496" :y2="row.y - 26" />
        <path :d="`M 496 ${row.y - 26} l -9 -4 v 8 z`" fill="var(--c-text-dim)" stroke="none" />
      </g>
      <circle v-for="p in people" :key="p" :cx="p" :cy="row.y" r="6" fill="var(--c-accent)" opacity="0.8" />
      <circle cx="566" :cy="row.y" r="8" fill="var(--c-physics-light)" />
      <g v-if="row.dir !== 0">
        <line :x1="566 + row.dir * 20" :y1="row.y" :x2="566 + row.dir * 48" :y2="row.y" stroke="var(--c-physics)" stroke-width="2" stroke-linecap="round" />
        <path :d="`M ${566 + row.dir * 48} ${row.y} l ${-row.dir * 8} -4.5 v 9 z`" fill="var(--c-physics)" />
      </g>
      <text x="648" :y="row.y + 27" text-anchor="end" font-size="14" fill="var(--c-text)">
        <template v-if="i === 0">30 人/分</template>
        <template v-else-if="row.dir < 0">多于 30 人/分</template>
        <template v-else>少于 30 人/分</template>
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

interface Row {
  key: string;
  y: number;
  label: string;
  dir: number;
}

const rows: Row[] = [
  { key: "still", y: 52, label: "观察者不动", dir: 0 },
  { key: "against", y: 116, label: "逆着队伍走", dir: -1 },
  { key: "along", y: 180, label: "顺着队伍走", dir: 1 },
];

const people: number[] = [0, 1, 2, 3, 4, 5, 6].map((i) => 158 + i * 48);
</script>
