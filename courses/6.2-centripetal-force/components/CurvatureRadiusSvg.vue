<script setup lang="ts">
// 第 23 页：曲率半径 —— 曲线在某处的密切圆与该处的曲线相切，
// 这个圆的半径就是曲线在该处的曲率半径 ρ，它的倒数 k = 1/ρ 叫作曲率。
// 曲线取曲率半径 105 的抛物线弧，密切圆圆心 O′(215, 215)。
// step ≥ 1 才画出密切圆与半径（先给学生看的是一条弯曲的轨迹）。
const { step = 0 } = defineProps<{ step?: number }>();

const P = { x: 215, y: 110 };
const C = { x: 215, y: 215 };
</script>

<template>
  <svg viewBox="50 72 340 278" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g v-if="step >= 1">
      <circle :cx="C.x" :cy="C.y" r="105" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="9 7" opacity="0.85" />
      <line :x1="C.x" :y1="C.y" :x2="P.x" :y2="P.y" stroke="var(--c-accent)" stroke-width="2.2" />
      <circle :cx="C.x" :cy="C.y" r="3.6" fill="var(--c-accent)" />
      <text
        :x="C.x + 12"
        :y="C.y + 24"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="var(--c-accent)"
        text-anchor="start"
        stroke="var(--c-bg-soft)"
        stroke-width="4"
        paint-order="stroke"
      >
        O′
      </text>
      <text
        :x="C.x + 14"
        :y="C.y - 60"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="var(--c-accent)"
        text-anchor="start"
        stroke="var(--c-bg-soft)"
        stroke-width="4"
        paint-order="stroke"
      >
        ρ
      </text>
    </g>
    <path d="M 65 217 Q 215 3 365 217" fill="none" stroke="var(--c-text)" stroke-width="3.4" stroke-linecap="round" />
    <line x1="140" y1="110" x2="292" y2="110" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="7 6" opacity="0.7" />
    <circle :cx="P.x" :cy="P.y" r="6" fill="var(--c-text)" />
    <text
      :x="P.x + 10"
      :y="P.y - 12"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="var(--c-text)"
      text-anchor="start"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      P
    </text>
    <text x="150" y="94" font-family="KaTeX_Main" font-size="17" fill="var(--c-neutral-300)" text-anchor="middle" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      切线
    </text>
  </svg>
</template>
