<!-- 2.1 回复力：振子在左端 / 平衡位置 / 右端三个位置所受的力都指向平衡位置 -->
<script setup lang="ts">
import { computed } from "vue";

const EQ = 176;
const OFFSET = 66;

const rows = [
  { label: "-A", x: -1 },
  { label: "0", x: 0 },
  { label: "+A", x: 1 },
];

const springLine = (ballX: number, y: number): string => {
  const start = 32;
  const end = ballX - 14;
  const coils = 7;
  const step = (end - start) / coils;
  const amp = 8;
  const pts: string[] = [`${start},${y}`];
  for (let i = 0; i < coils; i += 1) pts.push(`${start + step * (i + 0.5)},${y + (i % 2 === 0 ? -amp : amp)}`);
  pts.push(`${end},${y}`);
  return pts.join(" ");
};

const views = computed(() =>
  rows.map((row, index) => {
    const y = 52 + index * 82;
    const ballX = EQ + row.x * OFFSET;
    return {
      label: row.label,
      x: row.x,
      y,
      ballX,
      spring: springLine(ballX, y),
      showForce: row.x !== 0,
    };
  }),
);
</script>

<template>
  <svg viewBox="0 0 300 236" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="rf-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-danger)" />
      </marker>
    </defs>
    <g v-for="v in views" :key="v.label">
      <rect :x="20" :y="v.y - 26" width="7" height="52" fill="var(--c-neutral-500)" opacity="0.6" />
      <polyline :points="v.spring" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <line :x1="EQ" :y1="v.y - 32" :x2="EQ" :y2="v.y + 32" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.75" />
      <circle :cx="v.ballX" :cy="v.y" r="12" fill="rgba(226,168,70,.16)" stroke="var(--c-accent)" stroke-width="2" />
      <line
        v-if="v.showForce"
        :x1="v.ballX + (EQ - v.ballX > 0 ? 13 : -13)"
        :y1="v.y"
        :x2="EQ - (EQ - v.ballX > 0 ? 5 : -5)"
        :y2="v.y"
        stroke="var(--c-danger)"
        stroke-width="2.6"
        marker-end="url(#rf-arrow)"
      />
      <text
        v-if="v.showForce"
        :x="(v.ballX + EQ) / 2"
        :y="v.y - 12"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-danger)"
      >
        F
      </text>
      <text v-if="!v.showForce" :x="EQ + 24" :y="v.y - 12" text-anchor="start" font-family="KaTeX_Math" font-size="13" fill="var(--c-text-dim)">F = 0</text>
      <text
        :x="v.showForce ? v.ballX : EQ + 24"
        :y="v.y + 30"
        :text-anchor="v.showForce ? 'middle' : 'start'"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-text-dim)"
      >
        x = {{ v.label }}
      </text>
    </g>
  </svg>
</template>
