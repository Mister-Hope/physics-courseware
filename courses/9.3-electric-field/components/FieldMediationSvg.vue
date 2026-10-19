<script setup lang="ts">
// 第 3 页：A（正）、B（负）两个带电体不接触却相互吸引。
// 常显：两个带电体 + 两队相互作用力（从各自几何中心出发）；
// showFieldA（第 1 击）：A 的电场；showFieldB（第 3 击）：B 的电场。
// 物理：A 为正电荷，电场线沿半径向外；B 为负电荷，电场线沿半径向内（指向 B）。
defineProps<{ showFieldA?: boolean; showFieldB?: boolean }>();

const A = { x: 130, y: 165 };
const B = { x: 290, y: 160 };

function radial(cx: number, cy: number, count: number, rIn: number, rOut: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * Math.PI * 2) / count;
    return {
      from: { x: cx + Math.cos(a) * rIn, y: cy + Math.sin(a) * rIn },
      to: { x: cx + Math.cos(a) * rOut, y: cy + Math.sin(a) * rOut },
    };
  });
}

const FIELD_A = radial(A.x, A.y, 6, 30, 108);
const FIELD_B = radial(B.x, B.y, 6, 108, 30);

// 相互作用力：沿 A、B 连线，方向相反、大小相等，都从带电体的几何中心出发
const F_ON_B = { from: { x: B.x, y: B.y }, to: { x: 214, y: 162.4 } };
const F_ON_A = { from: { x: A.x, y: A.y }, to: { x: 206, y: 162.6 } };
</script>

<template>
  <svg viewBox="0 0 420 300" class="w-full h-full">
    <g v-if="showFieldA">
      <CourseArrow v-for="(arrow, i) in FIELD_A" :key="`fa${i}`" :from="arrow.from" :to="arrow.to" stroke="var(--c-field)" :stroke-width="1.8" />
      <circle :cx="A.x" :cy="A.y" r="30" fill="none" stroke="var(--c-field)" stroke-opacity="0.25" stroke-dasharray="3 8" />
    </g>
    <g v-if="showFieldB">
      <CourseArrow v-for="(arrow, i) in FIELD_B" :key="`fb${i}`" :from="arrow.from" :to="arrow.to" stroke="var(--c-field)" :stroke-width="1.8" />
      <circle :cx="B.x" :cy="B.y" r="30" fill="none" stroke="var(--c-field)" stroke-opacity="0.25" stroke-dasharray="3 8" />
    </g>
    <CourseArrow :from="F_ON_B.from" :to="F_ON_B.to" stroke="var(--c-force)" :stroke-width="3" />
    <text :x="244" :y="144" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-force)">F</text>
    <text :x="256" :y="148" font-family="KaTeX_Main" font-size="11" fill="var(--c-force)">B</text>
    <CourseArrow :from="F_ON_A.from" :to="F_ON_A.to" stroke="var(--c-force)" :stroke-width="3" />
    <text :x="160" :y="146" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-force)">F</text>
    <text :x="172" :y="150" font-family="KaTeX_Main" font-size="11" fill="var(--c-force)">A</text>
    <circle :cx="A.x" :cy="A.y" r="22" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="A.x" :y="A.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#fff">+</text>
    <text :x="A.x" :y="A.y + 50" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-sky)">A</text>
    <circle :cx="B.x" :cy="B.y" r="22" fill="var(--c-velocity)" fill-opacity="0.9" />
    <text :x="B.x" :y="B.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#fff">−</text>
    <text :x="B.x" :y="B.y + 50" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-sky)">B</text>
  </svg>
</template>
