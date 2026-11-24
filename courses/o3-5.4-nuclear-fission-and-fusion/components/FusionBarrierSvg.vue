<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const reveal = (at: number): { visibility: "visible" | "hidden" } => ({
  visibility: step >= at ? "visible" : "hidden",
});
</script>

<template>
  <!-- 第 11 页：核聚变的库仑势垒示意。两个轻核靠近时受到库仑斥力，只有距离足够小、温度足够高才能聚变 -->
  <svg viewBox="0 0 460 320" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="核聚变需要克服库仑斥力示意图">
    <ellipse cx="230" cy="150" rx="150" ry="78" fill="var(--c-accent-soft)" opacity="0.5" :style="reveal(3)" />
    <circle cx="155" cy="150" r="24" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="2" />
    <circle cx="148" cy="144" r="4.5" fill="var(--c-danger)" />
    <circle cx="163" cy="152" r="4.5" fill="var(--c-danger)" />
    <circle cx="151" cy="160" r="4.5" fill="var(--c-text-dim)" />
    <circle cx="160" cy="140" r="4.5" fill="var(--c-text-dim)" />
    <circle cx="165" cy="160" r="4.5" fill="var(--c-text-dim)" />
    <circle cx="305" cy="150" r="24" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="2" />
    <circle cx="298" cy="144" r="4.5" fill="var(--c-danger)" />
    <circle cx="313" cy="152" r="4.5" fill="var(--c-danger)" />
    <circle cx="301" cy="160" r="4.5" fill="var(--c-text-dim)" />
    <circle cx="310" cy="140" r="4.5" fill="var(--c-text-dim)" />
    <circle cx="315" cy="160" r="4.5" fill="var(--c-text-dim)" />
    <g :style="reveal(1)">
      <CourseArrow :from="{ x: 128, y: 150 }" :to="{ x: 78, y: 150 }" stroke="var(--c-danger)" stroke-width="2.6" />
      <CourseArrow :from="{ x: 332, y: 150 }" :to="{ x: 382, y: 150 }" stroke="var(--c-danger)" stroke-width="2.6" />
      <text x="230" y="116" text-anchor="middle" font-size="14" fill="var(--c-danger)">库仑斥力</text>
    </g>
    <g :style="reveal(2)">
      <line x1="179" y1="204" x2="281" y2="204" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <line x1="179" y1="196" x2="179" y2="212" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <line x1="281" y1="196" x2="281" y2="212" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <text x="230" y="236" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">
        10<tspan dy="-7" font-size="10">−15</tspan><tspan dy="7"> m</tspan>
      </text>
    </g>
    <g :style="reveal(3)">
      <text x="230" y="300" text-anchor="middle" font-size="14" fill="var(--c-accent)">几百万开尔文</text>
    </g>
    <circle cx="392" cy="24" r="4.5" fill="var(--c-danger)" />
    <text x="402" y="28" font-size="12" fill="var(--c-text-dim)">质子</text>
    <circle cx="392" cy="44" r="4.5" fill="var(--c-text-dim)" />
    <text x="402" y="48" font-size="12" fill="var(--c-text-dim)">中子</text>
  </svg>
</template>
