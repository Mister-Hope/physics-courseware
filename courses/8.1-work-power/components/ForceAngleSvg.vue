<script setup lang="ts">
/**
 * 第一课时第 3 页（功的定义与表达式）推导图：力 F 与位移 x 成 α 角，把 F 分解为沿位移的 F₁ 与垂直位移的 F₂。
 * 干净版（showDecomp = false）只有物块、力 F、夹角 α 与位移 x；点击后再补上两个分力与直角标记。
 * 位移箭头与 F 都从**力的作用点（物块几何中心 C）**起笔，夹角弧也以 C 为圆心——角的"两条边"共点。
 */
const { showDecomp = false } = defineProps<{
  /** 点击后出现：分力 F₁（沿位移）、F₂（垂直位移）与直角标记 */
  showDecomp?: boolean;
}>();

/** 力的作用点＝物块几何中心；F 与水平（位移方向）成 40° */
const C = { x: 228, y: 223 };
const R = 200;
const ANG = (40 * Math.PI) / 180;
const tip = { x: C.x + R * Math.cos(ANG), y: C.y - R * Math.sin(ANG) };
</script>

<template>
  <svg viewBox="25 60 570 215" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="斜向拉力分解为沿位移方向与垂直位移方向两个分力">
    <SurfaceHatch :from="{ x: 30, y: 250 }" :to="{ x: 590, y: 250 }" side="below" :thickness="15" :gap="24" />
    <rect x="180" y="196" width="96" height="54" rx="9" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <path d="M 290 223 A 62 62 0 0 0 275.5 183.1" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="288" y="168" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-text-dim)">α</text>
    <CourseArrow
      :from="C"
      :to="{ x: 520, y: 223 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.8"
      stroke-dasharray="8 6"
      label="x"
      :label-dy="-12"
    />
    <CourseArrow :from="C" :to="tip" stroke="var(--c-accent)" :stroke-width="3.6" label="F" :label-dx="10" :label-dy="-13" />
    <g v-if="showDecomp">
      <CourseArrow :from="C" :to="{ x: tip.x, y: C.y }" stroke="var(--c-physics)" :stroke-width="3" stroke-dasharray="10 6" />
      <CourseArrow :from="C" :to="{ x: C.x, y: tip.y }" stroke="var(--c-physics)" :stroke-width="3" stroke-dasharray="10 6" />
      <path d="M 250 223 L 250 201 L 228 201" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <text x="305" y="212" text-anchor="middle" fill="var(--c-physics)" font-size="20" class="fa-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="14" dy="5">1</tspan>
      </text>
      <text x="210" y="166" text-anchor="end" fill="var(--c-physics)" font-size="20" class="fa-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="14" dy="5">2</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.fa-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
