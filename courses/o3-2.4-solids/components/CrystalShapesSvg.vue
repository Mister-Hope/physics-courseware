<script setup lang="ts">
// 食盐、松香、明矾、石英、雪花的外形对比
type Shape = "salt" | "rosin" | "alum" | "quartz" | "snowflake";

const { parts = ["salt", "rosin"] } = defineProps<{ parts?: Shape[] }>();

const labels: Record<Shape, string> = {
  salt: "食盐（立方体）",
  rosin: "松香（无规则）",
  alum: "明矾（八面体）",
  quartz: "石英（六棱柱）",
  snowflake: "雪花（六角）",
};

const slotWidth = 190;
const width = parts.length * slotWidth;
</script>

<template>
  <svg :viewBox="`0 0 ${width} 220`" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-for="(p, i) in parts" :key="p" :transform="`translate(${i * slotWidth + slotWidth / 2} 100)`">
      <template v-if="p === 'salt'">
        <path
          d="M -30 -30 L 0 -46 L 30 -30 L 30 26 L 0 42 L -30 26 Z"
          fill="var(--c-surface-solid)"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <path
          d="M -30 -30 L 0 -14 L 30 -30 M 0 -14 L 0 42 M 30 -30 L 30 26 L 0 42 L -30 26 L -30 -30"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.2"
          opacity="0.75"
        />
        <path d="M -30 26 L 0 10 L 30 26 M 0 10 L 0 -14" fill="none" stroke="var(--c-accent)" stroke-width="1" stroke-dasharray="4 4" opacity="0.45" />
      </template>
      <template v-else-if="p === 'rosin'">
        <path
          d="M -46 -14 C -52 10 -34 38 -4 42 C 24 46 46 30 48 6 C 50 -22 28 -40 0 -42 C -28 -44 -40 -34 -46 -14 Z"
          fill="rgb(226 168 70 / 22%)"
          stroke="var(--c-text-dim)"
          stroke-width="2"
        />
        <path d="M -22 -18 C -12 -8 6 -12 14 -2 M -8 14 C 2 22 14 20 24 12" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.5" />
      </template>
      <template v-else-if="p === 'alum'">
        <path d="M 0 -52 L 44 0 L 0 52 L -44 0 Z" fill="var(--c-surface-solid)" stroke="var(--c-sky)" stroke-width="2" stroke-linejoin="round" />
        <path d="M 0 -52 L 0 52 M -44 0 L 44 0" stroke="var(--c-sky)" stroke-width="1.2" opacity="0.7" />
        <path d="M -22 -26 L 22 26 M 22 -26 L -22 26" stroke="var(--c-sky)" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.4" />
      </template>
      <template v-else-if="p === 'quartz'">
        <path
          d="M 0 -60 L 30 -44 L 30 28 L 0 44 L -30 28 L -30 -44 Z"
          fill="var(--c-surface-solid)"
          stroke="var(--c-sky)"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <path d="M -30 -30 L 0 -14 L 30 -30 M -30 18 L 0 34 L 30 18 M 0 -14 L 0 34" fill="none" stroke="var(--c-sky)" stroke-width="1.2" opacity="0.7" />
        <path d="M -30 -44 L -30 -30 M 30 -44 L 30 -30 M -30 28 L -30 18 M 30 28 L 30 18" fill="none" stroke="var(--c-sky)" stroke-width="1.2" opacity="0.7" />
      </template>
      <template v-else>
        <g stroke="var(--c-sky)" stroke-width="2" stroke-linecap="round">
          <line x1="0" y1="-48" x2="0" y2="48" />
          <line x1="-42" y1="-24" x2="42" y2="24" />
          <line x1="-42" y1="24" x2="42" y2="-24" />
          <line x1="0" y1="-32" x2="-12" y2="-42" />
          <line x1="0" y1="-32" x2="12" y2="-42" />
          <line x1="0" y1="32" x2="-12" y2="42" />
          <line x1="0" y1="32" x2="12" y2="42" />
          <line x1="-28" y1="-16" x2="-38" y2="-10" />
          <line x1="-28" y1="16" x2="-38" y2="10" />
          <line x1="28" y1="-16" x2="38" y2="-10" />
          <line x1="28" y1="16" x2="38" y2="10" />
        </g>
        <circle cx="0" cy="0" r="2.6" fill="var(--c-sky)" />
      </template>
      <text y="86" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">{{ labels[p] }}</text>
    </g>
  </svg>
</template>
