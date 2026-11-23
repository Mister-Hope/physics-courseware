<!--
  第 18 页（教材习题 3）：以 P 为波源、沿绳向右传播的机械波，此刻刚好传到 Q。
  波形按 y = −A·sin(2π(x_Q − x)/λ) 真算：波前到达 Q 时 Q 在平衡位置、刚要向下运动；
  第 1 击标出传播方向与 Q 的运动方向，第 2 击标出 P 的起振方向（与 Q 相同）。
-->
<template>
  <svg viewBox="0 0 660 156" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="34" y1="86" x2="626" y2="86" stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="7 6" opacity="0.7" />
    <path :d="ropePath" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <line :x1="xQ" y1="86" x2="620" y2="86" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <circle :cx="xP" cy="86" r="4.6" fill="var(--c-physics)" />
    <circle :cx="xQ" cy="86" r="4.6" fill="var(--c-physics)" />
    <text :x="xP" y="118" text-anchor="middle" font-family="KaTeX_Math, Georgia, serif" font-style="italic" font-size="17" fill="var(--c-physics)">P</text>
    <text :x="xQ" y="118" text-anchor="middle" font-family="KaTeX_Math, Georgia, serif" font-style="italic" font-size="17" fill="var(--c-physics)">Q</text>
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 300, y: 36 }" :to="{ x: 526, y: 36 }" stroke="var(--c-velocity)" stroke-width="2.4" stroke-dasharray="9 6" :head-size="12" />
      <text x="404" y="22" text-anchor="middle" font-family="KaTeX_Main, Georgia, serif" font-size="15" fill="var(--c-velocity)">传播方向</text>
      <CourseArrow :from="{ x: xQ + 22, y: 74 }" :to="{ x: xQ + 22, y: 106 }" stroke="var(--c-physics)" stroke-width="2.4" :head-size="11" />
    </g>
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: xP - 22, y: 74 }" :to="{ x: xP - 22, y: 106 }" stroke="var(--c-accent)" stroke-width="2.4" :head-size="11" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const axisY = 86;
const amplitude = 30;
const wavelength = 160;
const xP = 70;
const xQ = 550;

const ropePath = Array.from({ length: 121 }, (_, index) => {
  const x = xP + (index * (xQ - xP)) / 120;
  const y = axisY + amplitude * Math.sin((2 * Math.PI * (xQ - x)) / wavelength);

  return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(" ");
</script>
