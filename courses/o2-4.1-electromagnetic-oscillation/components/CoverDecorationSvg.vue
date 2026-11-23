<!--
  封面装饰：LC 回路（电容器 + 电感线圈）与回路内 q、i 两条正弦曲线，呼应电磁振荡。
  曲线由真实的正弦/余弦相位计算，不手调坐标。
-->
<script setup lang="ts">
/** 把函数曲线采样成 SVG 路径：x 从 x0 到 x1，v 为 -1~1 的归一化值 */
const wavePath = (fn: (t: number) => number, x0: number, x1: number, midY: number, amp: number): string => {
  const points: string[] = [];

  for (let x = x0; x <= x1; x += 2) {
    const v = fn((x - x0) / 60);
    points.push(`${x.toFixed(1)} ${(midY - amp * v).toFixed(1)}`);
  }

  return `M ${points.join(" L ")}`;
};

/** 电荷量 q ∝ cos：从极板电荷最多处起振 */
const qPath = wavePath((t) => Math.cos(2 * Math.PI * t), 74, 266, 110, 17);
/** 电流 i ∝ sin：与 q 相差四分之一个周期 */
const iPath = wavePath((t) => Math.sin(2 * Math.PI * t), 74, 266, 110, 17);
</script>

<template>
  <svg viewBox="0 0 340 210" width="340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 回路导线 -->
    <g fill="none" stroke="var(--c-neutral-500)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 56 62 H 150" />
      <path d="M 190 62 H 284" />
      <path d="M 56 62 V 152" />
      <path d="M 284 62 V 152" />
      <path d="M 56 152 H 110" />
      <path d="M 230 152 H 284" />
    </g>
    <!-- 电感线圈（四段半圆） -->
    <path
      d="M 110 152 a 15 15 0 0 1 30 0 a 15 15 0 0 1 30 0 a 15 15 0 0 1 30 0 a 15 15 0 0 1 30 0"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <!-- 电容器极板 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="2.4" stroke-linecap="round">
      <line x1="150" y1="42" x2="150" y2="82" />
      <line x1="190" y1="42" x2="190" y2="82" />
    </g>
    <!-- 极板电荷：左正右负 -->
    <g font-family="KaTeX_Main" font-size="13" text-anchor="middle">
      <text x="162" y="54" fill="var(--c-danger)">+</text>
      <text x="162" y="70" fill="var(--c-danger)">+</text>
      <text x="178" y="54" fill="var(--c-velocity)">−</text>
      <text x="178" y="70" fill="var(--c-velocity)">−</text>
    </g>
    <!-- q、i 曲线 -->
    <path :d="qPath" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" opacity="0.8" />
    <path :d="iPath" fill="none" stroke="var(--c-velocity)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="6 5" opacity="0.8" />
  </svg>
</template>
