<script setup lang="ts">
// 第 18 页：手握细绳让沙袋在水平面内越转越快（俯视）。
// 加速转动时绳的拉力不再指向圆心 —— 它斜向沙袋运动的前方（showForce 控制是否画出）。
const { showForce = false } = defineProps<{ showForce?: boolean }>();

/** 圆周运动的圆心 */
const O = { x: 360, y: 220 };
/** 沙袋位置（几何中心） */
const P = { x: 261, y: 121 };
/** 速度（沿切线） */
const V = { x: 197, y: 185 };
/** 绳的拉力（与径向偏开一个角度，斜向运动前方） */
const F = { x: 311, y: 257 };
/** 绳画到拉力箭头之外，末端画一只手 */
const HAND = { x: 327, y: 299 };
</script>

<template>
  <svg viewBox="100 40 440 340" width="100%" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="O.x" :cy="O.y" r="140" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.55" />
    <circle :cx="O.x" :cy="O.y" r="3.8" fill="var(--c-text-dim)" />
    <text :x="O.x - 10" :y="O.y + 26" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text-dim)" text-anchor="end">O</text>
    <line :x1="O.x" :y1="O.y" :x2="P.x" :y2="P.y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.65" />
    <line :x1="P.x" :y1="P.y" :x2="HAND.x" :y2="HAND.y" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-linecap="round" />
    <circle :cx="HAND.x" :cy="HAND.y" r="12" fill="color-mix(in srgb, var(--c-text-dim) 28%, transparent)" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <CourseArrow :from="P" :to="V" stroke="var(--c-physics)" :stroke-width="3" />
    <g v-if="showForce">
      <CourseArrow :from="P" :to="F" stroke="var(--c-velocity)" :stroke-width="3.4" />
      <text
        :x="F.x - 18"
        :y="F.y + 26"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="var(--c-velocity)"
        text-anchor="end"
        stroke="var(--c-bg-soft)"
        stroke-width="4"
        paint-order="stroke"
      >
        F
      </text>
    </g>
    <text
      :x="V.x - 12"
      :y="V.y + 14"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="var(--c-physics)"
      text-anchor="end"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      v
    </text>
    <circle :cx="P.x" :cy="P.y" r="9" fill="color-mix(in srgb, var(--c-accent) 30%, transparent)" stroke="var(--c-accent)" stroke-width="1.8" />
  </svg>
</template>
