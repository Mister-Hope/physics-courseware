<script setup lang="ts">
// 第 11 页第 4 击：均匀带电球体（球壳）在球的外部产生的电场，
// 与位于球心、电荷量相等的点电荷在该点产生的电场相同（教材图 9.3-5 的意思）。
const O = { x: 120, y: 130 };
const RSPHERE = 62;
const P = { x: 330, y: 130 };

// 球内均匀分布的电荷（示意，表示"整个球体带电荷量 Q"）
const CHARGES = [
  { x: 120, y: 130 },
  { x: 92, y: 108 },
  { x: 146, y: 106 },
  { x: 96, y: 152 },
  { x: 148, y: 152 },
];
</script>

<template>
  <svg viewBox="0 0 460 260" class="w-full" style="height: 118px">
    <circle :cx="O.x" :cy="O.y" :r="RSPHERE" fill="var(--c-danger)" fill-opacity="0.08" stroke="var(--c-danger)" stroke-opacity="0.55" stroke-width="2" />
    <line :x1="O.x" :y1="O.y" :x2="O.x + RSPHERE" :y2="O.y" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <text :x="O.x + 34" :y="O.y - 10" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-neutral-500)">R</text>
    <text
      v-for="(charge, i) in CHARGES"
      :key="i"
      :x="charge.x"
      :y="charge.y"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="17"
      fill="var(--c-danger)"
    >+</text>
    <text :x="O.x" :y="O.y + RSPHERE + 34" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-danger)">Q</text>
    <line :x1="O.x" :y1="O.y" :x2="P.x" :y2="P.y" stroke="var(--c-neutral-500)" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 6" />
    <text :x="(O.x + P.x) / 2" :y="O.y - 12" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-neutral-500)">r</text>
    <circle :cx="P.x" :cy="P.y" r="6" fill="var(--c-accent)" />
    <text :x="P.x" :y="P.y + 28" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">P</text>
    <CourseArrow :from="P" :to="{ x: P.x + 82, y: P.y }" stroke="var(--c-force)" :stroke-width="3" />
    <text :x="P.x + 48" :y="P.y - 14" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-force)">E</text>
  </svg>
</template>
