<script setup lang="ts">
/**
 * 「车厢里打乒乓球」示意图（参考系辨析）。
 *
 * 先问后答：两个车厢与人物常显（题目情境），分析标注按点击分步出现——
 * - step >= 1：以车厢为参考系，球来回两个 v 箭头（等长 → 速度大小相同）；
 * - step >= 2：以地面为参考系，车厢速度 u、两个球速 u+v 与 u−v（都指向车厢前进方向）。
 *
 * viewBox 880×142：P11 正文曾顶出 49.9px，提问压成一行（≈30px）+ 本图收高（≈36px），
 * 合计约 66px，留出约 16px 余量。
 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg
    viewBox="0 0 880 142"
    width="100%"
    style="max-width: 790px; margin-inline: auto"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="车厢里两人打乒乓球：以车厢为参考系球速大小相同；以地面为参考系球速都沿车厢前进方向"
  >
    <!-- ═══ 左：以车厢为参考系 ═══ -->
    <rect x="18" y="18" width="392" height="100" rx="11" fill="var(--c-surface-solid)" fill-opacity="0.4" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <line x1="138" y1="106" x2="288" y2="106" stroke="var(--c-neutral-500)" stroke-width="3.5" />
    <line x1="148" y1="106" x2="148" y2="116" stroke="var(--c-neutral-500)" stroke-width="2.4" />
    <line x1="278" y1="106" x2="278" y2="116" stroke="var(--c-neutral-500)" stroke-width="2.4" />
    <line x1="213" y1="88" x2="213" y2="106" stroke="var(--c-neutral-300)" stroke-width="2" />
    <line x1="203" y1="88" x2="223" y2="88" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="92" cy="70" r="7" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <rect x="86" y="77" width="12" height="26" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="332" cy="70" r="7" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <rect x="326" y="77" width="12" height="26" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="213" cy="46" r="5" fill="var(--c-accent)" />
    <text x="214" y="134" font-size="15" fill="var(--c-text)" text-anchor="middle">以车厢为参考系</text>

    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 108, y: 34 }" :to="{ x: 188, y: 34 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
      <CourseArrow :from="{ x: 318, y: 34 }" :to="{ x: 238, y: 34 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
      <text x="148" y="24" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-velocity)" text-anchor="middle">v</text>
      <text x="278" y="24" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-velocity)" text-anchor="middle">v</text>
    </g>

    <!-- ═══ 右：以地面为参考系 ═══ -->
    <rect x="453" y="18" width="392" height="100" rx="11" fill="var(--c-surface-solid)" fill-opacity="0.4" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <line x1="573" y1="106" x2="723" y2="106" stroke="var(--c-neutral-500)" stroke-width="3.5" />
    <line x1="583" y1="106" x2="583" y2="116" stroke="var(--c-neutral-500)" stroke-width="2.4" />
    <line x1="713" y1="106" x2="713" y2="116" stroke="var(--c-neutral-500)" stroke-width="2.4" />
    <line x1="648" y1="88" x2="648" y2="106" stroke="var(--c-neutral-300)" stroke-width="2" />
    <line x1="638" y1="88" x2="658" y2="88" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="527" cy="70" r="7" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <rect x="521" y="77" width="12" height="26" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="767" cy="70" r="7" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <rect x="761" y="77" width="12" height="26" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <text x="649" y="134" font-size="15" fill="var(--c-text)" text-anchor="middle">以地面为参考系</text>

    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 700, y: 26 }" :to="{ x: 790, y: 26 }" stroke="var(--c-text-dim)" :stroke-width="2.4" />
      <text x="745" y="17" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)" text-anchor="middle">u</text>
      <CourseArrow :from="{ x: 475, y: 34 }" :to="{ x: 635, y: 34 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
      <text x="555" y="24" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-velocity)" text-anchor="middle">
        <tspan>u</tspan>
        <tspan font-family="KaTeX_Main" font-style="normal">+</tspan>
        <tspan>v</tspan>
      </text>
      <CourseArrow :from="{ x: 475, y: 54 }" :to="{ x: 575, y: 54 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
      <text x="585" y="51" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-velocity)">
        <tspan>u</tspan>
        <tspan font-family="KaTeX_Main" font-style="normal">−</tspan>
        <tspan>v</tspan>
      </text>
    </g>
  </svg>
</template>
