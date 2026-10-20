<script setup lang="ts">
/** 封面装饰（13.1）：条形磁体（左 S 蓝、右 N 红）+ 闭合磁感线（外部 N→S、内部 S→N 虚线）+ 小磁针。 磁感线由 magField 的两磁极模型生成；小磁针转角取该点磁场方向，方向与正文图一致。 */
import { barPoles, fieldAngle, seedsAround, traceLine } from "./magField";

const CX = 130;
const CY = 95;
const A = 60;
const BW = 15;
const poles = barPoles(CX, CY, A);
const bounds = { x: 6, y: 6, w: 248, h: 178 };
const lines: { d: string }[] = [];
for (const ang of [-90, -60, -30, 0, 30, 60, 90]) {
  const [seed] = seedsAround({ x: CX + A, y: CY, s: 1 }, 26, [ang]);
  const line = traceLine(seed, poles, bounds, { stopRadius: 10, maxSteps: 700 });
  if (line) lines.push({ d: line.d });
}

const needleX = 32;
const needleY = 148;
const needleDeg = (fieldAngle(needleX, needleY, poles) * 180) / Math.PI;

const inner = [
  { y: CY - 6, x1: CX - A + 8, x2: CX + A - 8 },
  { y: CY, x1: CX - A + 8, x2: CX + A - 8 },
  { y: CY + 6, x1: CX - A + 8, x2: CX + A - 8 },
];
</script>

<template>
  <svg viewBox="0 0 260 190" width="250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="var(--c-field)" stroke-width="1.6" opacity="0.85">
      <path v-for="(l, i) in lines" :key="i" :d="l.d" />
    </g>
    <rect :x="CX - A" :y="CY - BW" :width="A" :height="BW * 2" rx="6" fill="var(--c-velocity)" opacity="0.95" />
    <rect :x="CX" :y="CY - BW" :width="A" :height="BW * 2" rx="6" fill="var(--c-danger)" opacity="0.95" />
    <text :x="CX - A / 2" :y="CY + 6" text-anchor="middle" font-size="17" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text :x="CX + A / 2" :y="CY + 6" text-anchor="middle" font-size="17" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
    <g stroke="var(--c-physics)" stroke-width="1.3" stroke-dasharray="5 4" opacity="0.85">
      <line v-for="(l, i) in inner" :key="`i${i}`" :x1="l.x1" :y1="l.y" :x2="l.x2" :y2="l.y" />
    </g>
    <!-- 小磁针：N 红 S 蓝，指向该点磁场方向 -->
    <g :transform="`rotate(${needleDeg} ${needleX} ${needleY})`">
      <path :d="`M ${needleX} ${needleY - 6} L ${needleX + 22} ${needleY} L ${needleX} ${needleY + 6} Z`" fill="var(--c-danger)" />
      <path :d="`M ${needleX} ${needleY - 6} L ${needleX - 22} ${needleY} L ${needleX} ${needleY + 6} Z`" fill="var(--c-velocity)" />
    </g>
  </svg>
</template>
