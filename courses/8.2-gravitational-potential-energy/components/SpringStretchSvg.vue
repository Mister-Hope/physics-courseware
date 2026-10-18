<script setup lang="ts">
/**
 * 第 17 页示意图：弹簧从自然长度被拉伸形变量 x 时，拉力 F 与形变量成正比。
 *
 * 上一行是自然长度，下一行是拉伸后的状态；F 沿弹簧轴线方向（不是把弹簧当刚体做受力分析）。
 * 定性示意图，只标符号。viewBox 580×240，页面里按 340px 宽渲染（≈141px 高）。
 */

/** 弹簧折线：从 (x0, y) 到 (x1, y)，圈距固定（与自然长度一致）、圈数随长度变化 */
const spring = (x0: number, x1: number, y: number, amp = 12) => {
  const lead = 12;
  const xs = x0 + lead;
  const xe = x1 - lead;
  const coils = Math.max(4, Math.round((xe - xs) / 24));
  const step = (xe - xs) / (coils * 2);
  let d = `M ${x0} ${y} L ${xs} ${y}`;

  for (let i = 1; i <= coils * 2; i++) {
    d += ` L ${(xs + i * step).toFixed(1)} ${(i % 2 ? y - amp : y + amp).toFixed(1)}`;
  }

  return `${d} L ${x1} ${y}`;
};

const NATURAL_D = spring(72, 250, 85);
const STRETCHED_D = spring(72, 400, 160);
</script>

<template>
  <svg viewBox="0 0 580 240" width="100%" style="max-width: 300px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="弹簧被拉伸形变量 x，拉力与形变量成正比">
    <SurfaceHatch :from="{ x: 70, y: 40 }" :to="{ x: 70, y: 190 }" side="left" :thickness="11" :gap="17" />
    <line x1="70" y1="40" x2="70" y2="190" stroke="var(--c-text-dim)" stroke-width="2.4" />

    <path :d="NATURAL_D" fill="none" stroke="var(--c-physics)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="250" y="70" width="10" height="30" rx="3" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="76" y="66" font-size="17" fill="var(--c-text-dim)" class="sss-lbl">自然长度</text>

    <path :d="STRETCHED_D" fill="none" stroke="var(--c-physics)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="400" y="145" width="10" height="30" rx="3" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="76" y="141" font-size="17" fill="var(--c-text-dim)" class="sss-lbl">拉伸后</text>
    <CourseArrow :from="{ x: 416, y: 160 }" :to="{ x: 510, y: 160 }" stroke="var(--c-force)" :stroke-width="3" label="F" :label-dx="8" :label-dy="-12" />

    <line x1="255" y1="85" x2="255" y2="205" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="5 5" />
    <line x1="405" y1="160" x2="405" y2="205" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="5 5" />
    <line x1="255" y1="205" x2="405" y2="205" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="255" y1="197" x2="255" y2="213" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="405" y1="197" x2="405" y2="213" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="330" y="196" font-size="21" fill="var(--c-accent)" text-anchor="middle" class="sss-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
    </text>
  </svg>
</template>

<style scoped>
.sss-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
