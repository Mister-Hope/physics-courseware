<script setup lang="ts">
// 第 5 页：源电荷 +Q 周围的电场，与放入的试探电荷 q 无关（q 只是测量工具）。
// 图内只标量符号 Q、q、r，不写任何结论。
const Q = { x: 86, y: 140 };
const R = 130;

const LINES = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3;
  return {
    from: { x: Q.x + Math.cos(a) * 22, y: Q.y + Math.sin(a) * 22 },
    to: { x: Q.x + Math.cos(a) * 86, y: Q.y + Math.sin(a) * 86 },
  };
});
</script>

<template>
  <svg viewBox="0 0 420 280" class="w-full h-full">
    <circle :cx="Q.x" :cy="Q.y" :r="R" fill="none" stroke="var(--c-border)" stroke-dasharray="4 6" />
    <line :x1="Q.x" :y1="Q.y" :x2="Q.x + R" :y2="Q.y" stroke="var(--c-neutral-500)" stroke-opacity="0.5" stroke-width="1.6" />
    <CourseArrow
      v-for="(line, i) in LINES"
      :key="i"
      :from="line.from"
      :to="line.to"
      stroke="var(--c-field)"
      :stroke-width="1.8"
    />
    <circle :cx="Q.x" :cy="Q.y" r="16" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="Q.x" :y="Q.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#fff">+</text>
    <text :x="Q.x" :y="Q.y + 44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-danger)">Q</text>
    <text :x="Q.x + 66" :y="Q.y - 12" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-neutral-500)">r</text>
    <circle :cx="Q.x + R" :cy="Q.y" r="10" fill="var(--c-accent)" fill-opacity="0.9" />
    <text :x="Q.x + R" :y="Q.y - 22" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">q</text>
  </svg>
</template>
