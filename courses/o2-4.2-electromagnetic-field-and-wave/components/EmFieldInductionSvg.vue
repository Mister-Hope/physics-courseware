<!--
  4.2 P3：变化的磁场产生电场（教材图 4.2-1 的口径）
  —— 左：有闭合电路时，环中产生感应电流；右：撤去电路后，同一片变化的磁场仍在空间里产生电场。
  磁场 = 金（--c-accent，× 表示垂直纸面向里），电场 = 青绿（--c-physics，闭合的环形场线）。
  右半部分从第 0 步就显示（两片区域磁场相同）；step >= 2 才补上环形电场（点击只新增，不顶跑）。
-->
<template>
  <svg :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="select-none" aria-hidden="true">
    <defs>
      <filter :id="glowId" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <linearGradient :id="panelId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--c-surface)" stop-opacity="0.85" />
        <stop offset="1" stop-color="var(--c-surface)" stop-opacity="0.35" />
      </linearGradient>
    </defs>

    <!-- 两块面板的底 -->
    <rect :x="PANEL_A.x" :y="PANEL_A.y" :width="PANEL_W" :height="PANEL_H" rx="16" :fill="`url(#${panelId})`" stroke="var(--c-border)" stroke-width="1.2" />
    <rect
      :x="PANEL_B.x"
      :y="PANEL_B.y"
      :width="PANEL_W"
      :height="PANEL_H"
      rx="16"
      :fill="`url(#${panelId})`"
      stroke="var(--c-border)"
      stroke-width="1.2"
      stroke-dasharray="7 6"
    />
    <text :x="PANEL_A.cx" :y="PANEL_A.y - 14" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">有闭合电路</text>
    <text :x="PANEL_B.cx" :y="PANEL_B.y - 14" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">没有闭合电路</text>

    <!-- 变化磁场：两片区域里同样的 × 阵列 -->
    <FieldDots :x="dotsA.x" :y="dotsA.y" :cols="4" :rows="3" :spacing="30" dir="in" :size="5" :line-width="1.6" opacity="0.75" />
    <FieldDots :x="dotsB.x" :y="dotsB.y" :cols="4" :rows="3" :spacing="30" dir="in" :size="5" :line-width="1.6" opacity="0.75" />
    <text :x="dotsA.x + 45" :y="dotsA.y - 10" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">B</text>
    <text :x="dotsB.x + 45" :y="dotsB.y - 10" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">B</text>

    <!-- 左：闭合导体环中的感应电流 -->
    <ellipse
      :cx="PANEL_A.cx"
      :cy="RING_Y"
      :rx="RING_RX"
      :ry="RING_RY"
      fill="none"
      stroke="var(--c-physics)"
      stroke-width="9"
      opacity="0.14"
      :filter="`url(#${glowId})`"
    />
    <ellipse :cx="PANEL_A.cx" :cy="RING_Y" :rx="RING_RX" :ry="RING_RY" fill="none" stroke="var(--c-physics)" stroke-width="2.8" />
    <CourseArrow v-for="a in ringArrowsA" :key="a.k" :from="a.from" :to="a.to" stroke="var(--c-danger)" :stroke-width="2.2" :head-size="8" />
    <text :x="PANEL_A.cx + RING_RX + 16" :y="RING_Y + 6" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-danger)">I</text>

    <!-- 右：没有电路时，空间里仍有环形电场 -->
    <g v-if="step >= 2">
      <ellipse
        :cx="PANEL_B.cx"
        :cy="RING_Y"
        :rx="RING_RX"
        :ry="RING_RY"
        fill="none"
        stroke="var(--c-physics)"
        stroke-width="9"
        opacity="0.12"
        :filter="`url(#${glowId})`"
      />
      <ellipse :cx="PANEL_B.cx" :cy="RING_Y" :rx="RING_RX" :ry="RING_RY" fill="none" stroke="var(--c-physics)" stroke-width="2.4" stroke-dasharray="9 7" />
      <CourseArrow v-for="a in ringArrowsB" :key="a.k" :from="a.from" :to="a.to" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="8" />
      <text :x="PANEL_B.cx + RING_RX + 18" :y="RING_Y + 6" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-physics)">E</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useId } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const VIEW_W = 460;
const VIEW_H = 300;

const PANEL_W = 212;
const PANEL_H = 232;
const PANEL_A = { x: 8, y: 44, cx: 8 + PANEL_W / 2 };
const PANEL_B = { x: 240, y: 44, cx: 240 + PANEL_W / 2 };
const RING_Y = 202;
const RING_RX = 66;
const RING_RY = 50;

const glowId = `emfi-glow-${useId()}`;
const panelId = `emfi-panel-${useId()}`;

interface Point {
  x: number;
  y: number;
}

/** × 阵列的左上角记号中心：让 4×4 阵在面板里水平居中 */
const dotStart = (cx: number): Point => ({ x: cx - 45, y: 76 });
const dotsA = dotStart(PANEL_A.cx);
const dotsB = dotStart(PANEL_B.cx);

/** 环上的切向箭头：在角度 θ 处给出沿环方向的短箭头 */
const tangentArrow = (cx: number, deg: number): { k: string; from: Point; to: Point } => {
  const t = (deg * Math.PI) / 180;
  const px = cx + RING_RX * Math.cos(t);
  const py = RING_Y - RING_RY * Math.sin(t);
  // 顺时针方向的切线
  const dx = RING_RX * Math.sin(t);
  const dy = RING_RY * Math.cos(t);
  const len = Math.hypot(dx, dy) || 1;
  const half = 13;

  return {
    k: `t-${deg}`,
    from: { x: px - (dx / len) * half, y: py - (dy / len) * half },
    to: { x: px + (dx / len) * half, y: py + (dy / len) * half },
  };
};

const ringArrowsA = [30, 150, 270].map((deg) => tangentArrow(PANEL_A.cx, deg));
const ringArrowsB = [30, 150, 270].map((deg) => tangentArrow(PANEL_B.cx, deg));
</script>
