<script setup lang="ts">
// 封面装饰：中心正电荷 + 8 条带方向的径向电场线 + 虚线同心球面
// 对应教材：以点电荷为中心作球面，球面上各点的电场强度大小相等（虚线球面即为该球面）
const CX = 490;
const CY = 276;
const ARROWS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  return {
    from: { x: CX + Math.cos(a) * 42, y: CY + Math.sin(a) * 42 },
    to: { x: CX + Math.cos(a) * 244, y: CY + Math.sin(a) * 244 },
  };
});
</script>

<template>
  <svg viewBox="0 0 980 552" class="w-full h-full">
    <defs>
      <radialGradient id="cover-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-field)" stop-opacity="0.32" />
        <stop offset="55%" stop-color="var(--c-field)" stop-opacity="0.07" />
        <stop offset="100%" stop-color="var(--c-field)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="490" cy="276" r="252" fill="url(#cover-glow)" />
    <circle cx="490" cy="276" r="92" fill="none" stroke="var(--c-field)" stroke-opacity="0.22" stroke-dasharray="3 9" />
    <circle cx="490" cy="276" r="152" fill="none" stroke="var(--c-field)" stroke-opacity="0.16" stroke-dasharray="3 9" />
    <circle cx="490" cy="276" r="214" fill="none" stroke="var(--c-field)" stroke-opacity="0.1" stroke-dasharray="3 9" />
    <CourseArrow
      v-for="(arrow, i) in ARROWS"
      :key="i"
      :from="arrow.from"
      :to="arrow.to"
      stroke="var(--c-field)"
      :stroke-width="2.4"
    />
    <circle cx="490" cy="276" r="26" fill="var(--c-danger)" fill-opacity="0.92" />
    <text x="490" y="276" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="30" fill="#fff">+</text>
  </svg>
</template>
