<!-- 例题 2（9.2 第 13 页）：三个带正电点电荷固定在等边三角形顶点，q₃ 所受静电力的受力分析 -->
<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();

// 等边三角形（viewBox 单位）：q1 左下、q2 右下、q3 正上
const Q = { q1: { x: 150, y: 290 }, q2: { x: 330, y: 290 }, q3: { x: 240, y: 134 } };
const L = 46; // F1 / F2 箭头长度（图示长度，合力按平行四边形定则取真长度）

// q3 受到 q1 的斥力方向（q1→q3 单位向量）与 q2 的斥力方向
const f1Tip = { x: Q.q3.x + L * 0.5, y: Q.q3.y - L * 0.866 };
const f2Tip = { x: Q.q3.x - L * 0.5, y: Q.q3.y - L * 0.866 };
const fTip = { x: Q.q3.x, y: Q.q3.y - 2 * L * 0.866 };
</script>

<template>
  <svg viewBox="0 0 480 340" width="460" xmlns="http://www.w3.org/2000/svg">
    <!-- 三角形边 -->
    <line :x1="Q.q1.x" :y1="Q.q1.y" :x2="Q.q2.x" :y2="Q.q2.y" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <line :x1="Q.q1.x" :y1="Q.q1.y" :x2="Q.q3.x" :y2="Q.q3.y" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <line :x1="Q.q2.x" :y1="Q.q2.y" :x2="Q.q3.x" :y2="Q.q3.y" stroke="var(--c-text-dim)" stroke-width="1.8" />

    <!-- 三个带正电的点电荷 -->
    <circle :cx="Q.q1.x" :cy="Q.q1.y" r="22" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="Q.q1.x" :y="Q.q1.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="26" fill="#fff">+</text>
    <circle :cx="Q.q2.x" :cy="Q.q2.y" r="22" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="Q.q2.x" :y="Q.q2.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="26" fill="#fff">+</text>
    <circle :cx="Q.q3.x" :cy="Q.q3.y" r="22" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="Q.q3.x" :y="Q.q3.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="26" fill="#fff">+</text>

    <!-- 电荷标签 -->
    <text :x="Q.q1.x" y="258" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">
      q
      <tspan font-size="12" dy="4">1</tspan>
    </text>
    <text :x="Q.q2.x" y="258" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">
      q
      <tspan font-size="12" dy="4">2</tspan>
    </text>
    <text :x="Q.q3.x" y="172" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">
      q
      <tspan font-size="12" dy="4">3</tspan>
    </text>

    <!-- 边长 -->
    <text x="240" y="322" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
      <tspan font-family="KaTeX_Math" font-style="italic">r</tspan>
      <tspan font-family="KaTeX_Main" font-style="normal">= 50 cm</tspan>
    </text>

    <!-- 受力分析（点击后出现） -->
    <g v-if="showForces">
      <line :x1="f1Tip.x" :y1="f1Tip.y" :x2="fTip.x" :y2="fTip.y" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.65" />
      <line :x1="f2Tip.x" :y1="f2Tip.y" :x2="fTip.x" :y2="fTip.y" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.65" />
      <path d="M 240 88 A 46 46 0 0 1 263 94.2" fill="none" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="4 4" />
      <text x="252" y="78" font-family="KaTeX_Main" font-size="14" fill="var(--c-text-dim)">30°</text>

      <CourseArrow :from="Q.q3" :to="f1Tip" stroke="var(--c-accent)" stroke-width="3.4" />
      <CourseArrow :from="Q.q3" :to="f2Tip" stroke="var(--c-accent)" stroke-width="3.4" />
      <CourseArrow :from="Q.q3" :to="fTip" stroke="var(--c-accent)" stroke-width="4.4" />

      <text x="272" y="116" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">
        F
        <tspan font-size="11" dy="4">1</tspan>
      </text>
      <text x="208" y="116" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">
        F
        <tspan font-size="11" dy="4">2</tspan>
      </text>
      <text x="232" y="70" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-accent)">F</text>
    </g>
  </svg>
</template>
