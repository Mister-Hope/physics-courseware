<script setup lang="ts">
// 第 13 页：三幅典型电场线——正点电荷 / 负点电荷 / 等量异种电荷。
// 图内不标任何刻度数字；方向一律用 CourseArrow。
const PLUS = { x: 150, y: 140 };
const MINUS = { x: 450, y: 140 };
const DIP_PLUS = { x: 690, y: 140 };
const DIP_MINUS = { x: 810, y: 140 };

function radial(cx: number, cy: number, count: number, rIn: number, rOut: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * Math.PI * 2) / count;
    return {
      from: { x: cx + Math.cos(a) * rIn, y: cy + Math.sin(a) * rIn },
      to: { x: cx + Math.cos(a) * rOut, y: cy + Math.sin(a) * rOut },
    };
  });
}

// 正电荷：场线沿半径向外；负电荷：场线沿半径向内
const OUT_LINES = radial(PLUS.x, PLUS.y, 8, 22, 90);
const IN_LINES = radial(MINUS.x, MINUS.y, 8, 90, 22);

// 等量异种电荷之间的场线（曲线，方向由 + 指向 −）
const DIP_CURVES = [
  "M 702 127 C 672 62 828 62 798 127",
  "M 705 133 C 725 95 775 95 795 133",
  "M 704 140 L 796 140",
  "M 705 147 C 725 185 775 185 795 147",
  "M 702 153 C 672 218 828 218 798 153",
];
// 各条曲线上画方向箭头的位置（曲线中点附近）与切线方向（沿 + → −）
const DIP_ARROWS = [
  { from: { x: 742, y: 78 }, to: { x: 762, y: 78 } },
  { from: { x: 742, y: 104 }, to: { x: 762, y: 104 } },
  { from: { x: 740, y: 140 }, to: { x: 760, y: 140 } },
  { from: { x: 742, y: 176 }, to: { x: 762, y: 176 } },
  { from: { x: 742, y: 202 }, to: { x: 762, y: 202 } },
];
</script>

<template>
  <svg viewBox="0 0 900 300" class="w-full h-full">
    <CourseArrow v-for="(line, i) in OUT_LINES" :key="`o${i}`" :from="line.from" :to="line.to" stroke="var(--c-field)" :stroke-width="2" />
    <circle :cx="PLUS.x" :cy="PLUS.y" r="16" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="PLUS.x" :y="PLUS.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#fff">+</text>
    <CourseArrow v-for="(line, i) in IN_LINES" :key="`i${i}`" :from="line.from" :to="line.to" stroke="var(--c-field)" :stroke-width="2" />
    <circle :cx="MINUS.x" :cy="MINUS.y" r="16" fill="var(--c-velocity)" fill-opacity="0.9" />
    <text :x="MINUS.x" :y="MINUS.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#fff">−</text>
    <path v-for="(d, i) in DIP_CURVES" :key="`d${i}`" :d="d" fill="none" stroke="var(--c-field)" stroke-width="2" />
    <CourseArrow v-for="(arrow, i) in DIP_ARROWS" :key="`da${i}`" :from="arrow.from" :to="arrow.to" stroke="var(--c-field)" :stroke-width="2.4" />
    <circle :cx="DIP_PLUS.x" :cy="DIP_PLUS.y" r="14" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="DIP_PLUS.x" :y="DIP_PLUS.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#fff">+</text>
    <circle :cx="DIP_MINUS.x" :cy="DIP_MINUS.y" r="14" fill="var(--c-velocity)" fill-opacity="0.9" />
    <text :x="DIP_MINUS.x" :y="DIP_MINUS.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#fff">−</text>
  </svg>
</template>
