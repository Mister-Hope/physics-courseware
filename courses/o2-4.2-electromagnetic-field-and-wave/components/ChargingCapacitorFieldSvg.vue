<!--
  4.2 P4：变化的电场产生磁场
  —— 平行板电容器充电：极板间有电场 E（青绿，由正极板指向负极板）；
  极板间的电场变化时，在极板周围的空间激发磁场 B（金色环形场线，方向如图）。
  step >= 1 才显示磁场（点击只新增，不顶跑）。
-->
<template>
  <svg :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="select-none" aria-hidden="true">
    <defs>
      <filter :id="glowId" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <linearGradient :id="plateId" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#e8eef7" stop-opacity="0.95" />
        <stop offset="0.5" stop-color="#b9c6db" stop-opacity="0.95" />
        <stop offset="1" stop-color="#8b9ab3" stop-opacity="0.95" />
      </linearGradient>
    </defs>

    <!-- 磁场环（画在极板后面，避免盖住 E 箭头） -->
    <g v-if="step >= 1">
      <ellipse :cx="CX" :cy="CY" :rx="RING_RX" :ry="RING_RY" fill="none" stroke="var(--c-accent)" stroke-width="9" opacity="0.12" :filter="`url(#${glowId})`" />
      <ellipse :cx="CX" :cy="CY" :rx="RING_RX" :ry="RING_RY" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="9 7" />
      <CourseArrow v-for="a in ringArrows" :key="a.k" :from="a.from" :to="a.to" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="8" />
      <text :x="CX + RING_RX + 16" :y="CY + 6" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-accent)">B</text>
    </g>

    <!-- 两块极板 -->
    <rect :x="PLATE_L" :y="PLATE_Y" :width="PLATE_W" :height="PLATE_H" rx="4" :fill="`url(#${plateId})`" />
    <rect :x="PLATE_R" :y="PLATE_Y" :width="PLATE_W" :height="PLATE_H" rx="4" :fill="`url(#${plateId})`" />
    <text :x="PLATE_L - 18" :y="PLATE_Y + 30" text-anchor="middle" font-family="KaTeX_Main" font-size="24" fill="var(--c-danger)">+</text>
    <text :x="PLATE_R + PLATE_W + 18" :y="PLATE_Y + 30" text-anchor="middle" font-family="KaTeX_Main" font-size="24" fill="var(--c-velocity)">−</text>

    <!-- 极板间的电场 E -->
    <g v-for="y in eRows" :key="`e-${y}`">
      <line
        :x1="PLATE_L + PLATE_W + 2"
        :y1="y"
        :x2="PLATE_R - 2"
        :y2="y"
        stroke="var(--c-physics)"
        stroke-width="7"
        opacity="0.14"
        :filter="`url(#${glowId})`"
      />
      <CourseArrow :from="{ x: PLATE_L + PLATE_W + 2, y }" :to="{ x: PLATE_R - 2, y }" stroke="var(--c-physics)" :stroke-width="2.4" :head-size="8" />
    </g>
    <text :x="CX" :y="PLATE_Y - 16" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-physics)">E</text>
  </svg>
</template>

<script setup lang="ts">
import { useId } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const VIEW_W = 420;
const VIEW_H = 340;

const CX = VIEW_W / 2;
const CY = VIEW_H / 2 + 4;
const PLATE_W = 12;
const PLATE_H = 168;
const PLATE_Y = CY - PLATE_H / 2;
const PLATE_L = CX - 74;
const PLATE_R = CX + 74 - PLATE_W;

const RING_RX = 156;
const RING_RY = 128;

const glowId = `emcc-glow-${useId()}`;
const plateId = `emcc-plate-${useId()}`;

/** 极板间 E 的各根矢量所在的竖直位置 */
const eRows = [PLATE_Y + 30, PLATE_Y + 72, PLATE_Y + 114, PLATE_Y + 156];

interface Point {
  x: number;
  y: number;
}

/** 环上的切向箭头：在角度 θ 处给出沿环方向的短箭头 */
const tangentArrow = (deg: number): { k: string; from: Point; to: Point } => {
  const t = (deg * Math.PI) / 180;
  const px = CX + RING_RX * Math.cos(t);
  const py = CY - RING_RY * Math.sin(t);
  const dx = RING_RX * Math.sin(t);
  const dy = RING_RY * Math.cos(t);
  const len = Math.hypot(dx, dy) || 1;
  const half = 14;

  return {
    k: `t-${deg}`,
    from: { x: px - (dx / len) * half, y: py - (dy / len) * half },
    to: { x: px + (dx / len) * half, y: py + (dy / len) * half },
  };
};

const ringArrows = [30, 150, 270].map((deg) => tangentArrow(deg));
</script>
