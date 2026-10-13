<script setup lang="ts">
/** 6.1 线速度（第 3 页）：物体沿圆弧由 M 向 N 运动，Δt 内由 A 到 B 通过弧长 Δs；A 点的线速度沿切线方向。 */
const { showSolved = false } = defineProps<{ showSolved?: boolean }>();

interface Pt {
  x: number;
  y: number;
}

const O = { x: 150, y: 138 };
const R = 100;
const toXY = (deg: number, r = R): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: O.x + r * Math.cos(a), y: O.y - r * Math.sin(a) };
};
/**
 * 圆弧采样成折线
 *
 * @param a1 起始角度（度）
 * @param a2 终止角度（度）
 * @param r 半径
 * @param n 采样段数
 * @returns 折线的 path 数据
 */
const arcPath = (a1: number, a2: number, r = R, n = 40): string =>
  Array.from({ length: n + 1 }, (_, i) => {
    const p = toXY(a1 + ((a2 - a1) * i) / n, r);
    return `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");

const M = toXY(170);
const N = toXY(56);
const A = toXY(138);
const B = toXY(104);
const arcMN = arcPath(170, 56);
const arcAB = arcPath(138, 104);

/** A 点外法线单位矢量：v 箭头整体沿半径外移，免得箭杆趴在加粗的 Δs 金弧上糊成一条 */
const nA = { x: Math.cos((138 * Math.PI) / 180), y: -Math.sin((138 * Math.PI) / 180) };
/** 顺时针运动时 A 点切线方向为 (sinθ, cosθ)，箭头长度 44；尾端外移到半径 106 处（仍压在 A 点圆点外沿上） */
const V_OFFSET = 6;
const vFrom = { x: A.x + V_OFFSET * nA.x, y: A.y + V_OFFSET * nA.y };
const tangentTip = { x: vFrom.x + 44 * Math.sin((138 * Math.PI) / 180), y: vFrom.y + 44 * Math.cos((138 * Math.PI) / 180) };
/** Δs 标注放在弧线内侧（半径 70 处），不压弧线、也不与 v 箭头打架 */
const dsLabel = toXY(121, 70);
</script>

<template>
  <svg viewBox="27 24 231 222" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.28" />
    <path :d="arcMN" fill="none" stroke="currentColor" stroke-width="2.6" opacity="0.75" stroke-linecap="round" />
    <g v-if="showSolved">
      <line :x1="O.x" :y1="O.y" :x2="A.x" :y2="A.y" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 5" opacity="0.45" />
      <line :x1="O.x" :y1="O.y" :x2="B.x" :y2="B.y" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 5" opacity="0.45" />
      <path :d="arcAB" fill="none" stroke="#e2a846" stroke-width="5" stroke-linecap="round" />
      <circle :cx="B.x" :cy="B.y" r="4" fill="currentColor" opacity="0.85" />
      <CourseArrow :from="vFrom" :to="tangentTip" stroke="#e2a846" :stroke-width="3" stroke-linecap="round" label="v" :label-dx="-13" :label-dy="-7" />
      <text :x="dsLabel.x" :y="dsLabel.y" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">Δs</text>
    </g>
    <circle :cx="A.x" :cy="A.y" r="5" fill="#e2a846" />
    <circle :cx="O.x" :cy="O.y" r="3.5" fill="currentColor" opacity="0.8" />
    <circle :cx="M.x" :cy="M.y" r="4" fill="currentColor" opacity="0.85" />
    <circle :cx="N.x" :cy="N.y" r="4" fill="currentColor" opacity="0.85" />
    <text :x="O.x - 6" :y="O.y + 19" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">O</text>
    <text :x="M.x - 17" :y="M.y + 7" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">M</text>
    <text :x="N.x + 9" :y="N.y + 8" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">N</text>
    <text :x="A.x - 11" :y="A.y + 5" text-anchor="end" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">A</text>
    <text v-if="showSolved" :x="B.x + 11" :y="B.y + 7" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">B</text>
  </svg>
</template>
