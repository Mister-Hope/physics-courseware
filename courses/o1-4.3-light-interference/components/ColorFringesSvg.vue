<!-- 第 9 页：红、黄、蓝三种单色光的干涉条纹间距（间距与波长成正比） -->
<template>
  <svg viewBox="0 0 660 236" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-for="row in rows" :key="row.name">
      <text :x="16" :y="row.y + 5" font-size="15" :fill="row.color" font-family="KaTeX_Math" font-style="italic">{{ row.name }}</text>
      <rect x="56" :y="row.y - 20" width="560" height="40" rx="6" fill="var(--c-surface)" />
      <g v-for="bar in row.bars" :key="bar.k">
        <rect :x="bar.x - 4" :y="row.y - 18" width="8" height="36" rx="3" :fill="row.color" :opacity="bar.opacity" />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Bar {
  k: number;
  x: number;
  opacity: number;
}

interface Row {
  name: string;
  color: string;
  y: number;
  bars: Bar[];
}

const CX = 336;

interface RowSpec {
  name: string;
  color: string;
  y: number;
  spacing: number;
  count: number;
}

const makeRow = ({ name, color, y, spacing, count }: RowSpec): Row => {
  const bars: Bar[] = [];
  for (let k = -count; k <= count; k += 1) bars.push({ k, x: CX + k * spacing, opacity: 0.95 - (0.5 * Math.abs(k)) / (count + 1) });
  return { name, color, y, bars };
};

const rows: Row[] = [
  makeRow({ name: "红", color: "#f87171", y: 56, spacing: 44, count: 5 }),
  makeRow({ name: "黄", color: "#fbbf24", y: 118, spacing: 36, count: 6 }),
  makeRow({ name: "蓝", color: "#60a5fa", y: 180, spacing: 28, count: 7 }),
];
</script>
