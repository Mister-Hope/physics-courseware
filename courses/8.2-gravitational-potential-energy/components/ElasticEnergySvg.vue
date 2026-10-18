<script setup lang="ts">
/**
 * 第 16 页示意图：弹性势能的三类实例（教材图 8.2-6 口径）——压缩的弹簧、拉开的弓、弯曲的撑竿。
 *
 * 定性示意图，不标任何数值。viewBox 580×250，页面里按 380px 宽渲染（≈164px 高）。
 */

/** 弹簧折线：从 (x0, y) 到 (x1, y)，圈距固定、圈数随长度变化 */
const spring = (x0: number, x1: number, y: number, amp = 12) => {
  const lead = 12;
  const xs = x0 + lead;
  const xe = x1 - lead;
  const coils = Math.max(4, Math.round((xe - xs) / 24));
  const step = (xe - xs) / (coils * 2);
  let d = `M ${x0} ${y} L ${xs} ${y}`;

  for (let i = 1; i <= coils * 2; i++) d += ` L ${(xs + i * step).toFixed(1)} ${(i % 2 ? y - amp : y + amp).toFixed(1)}`;

  return `${d} L ${x1} ${y}`;
};

const SPRING_D = spring(64, 160, 120);
</script>

<template>
  <svg viewBox="0 0 580 250" width="100%" style="max-width: 380px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="压缩的弹簧、拉开的弓、弯曲的撑竿">
    <SurfaceHatch :from="{ x: 58, y: 60 }" :to="{ x: 58, y: 190 }" side="left" :thickness="11" :gap="17" />
    <path :d="SPRING_D" fill="none" stroke="var(--c-physics)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="160" y="70" width="10" height="100" rx="3" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />

    <path d="M 300 60 Q 365 130 300 200" fill="none" stroke="var(--c-accent)" stroke-width="5" stroke-linecap="round" />
    <path d="M 300 60 L 252 130 L 300 200" fill="none" stroke="var(--c-text-dim)" stroke-width="2.2" stroke-linejoin="round" />

    <SurfaceHatch :from="{ x: 400, y: 214 }" :to="{ x: 556, y: 214 }" side="below" :thickness="11" :gap="18" />
    <path d="M 486 212 C 486 156 442 110 410 56" fill="none" stroke="var(--c-physics)" stroke-width="9" stroke-linecap="round" />

    <text x="115" y="240" font-size="17" fill="var(--c-text-dim)" text-anchor="middle">压缩的弹簧</text>
    <text x="300" y="240" font-size="17" fill="var(--c-text-dim)" text-anchor="middle">拉开的弓</text>
    <text x="470" y="240" font-size="17" fill="var(--c-text-dim)" text-anchor="middle">弯曲的撑竿</text>
  </svg>
</template>
