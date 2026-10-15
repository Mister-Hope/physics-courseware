<script setup lang="ts">
// 第 21 页：汽车沿曲线由 M 向 N 行驶、速度逐渐减小（俯视）。
// 图中先给出一个"与 v 垂直"的候选合力方向（灰色虚线）——它与"速度逐渐减小"矛盾；
// showCorrect 打开后再画出正确方向（指向曲线内侧偏后方，与 v 成钝角）。
const { showCorrect = false } = defineProps<{ showCorrect?: boolean }>();

/** 汽车位置 */
const P = { x: 370, y: 270 };
/** 速度（沿切线） */
const V = { x: 452, y: 223 };
/** 候选合力（与 v 垂直，指向曲线内侧） */
const CAND = { x: 322, y: 188 };
/** 正确合力（指向内侧偏后方） */
const F = { x: 284, y: 210 };
</script>

<template>
  <svg viewBox="90 110 450 240" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M 150 270 A 220 220 0 0 0 467 155" fill="none" stroke="var(--c-neutral-500)" stroke-width="3" stroke-linecap="round" />
    <text x="140" y="294" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text-dim)" text-anchor="middle">M</text>
    <text x="482" y="150" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text-dim)" text-anchor="start">N</text>
    <g transform="translate(370 270) rotate(-30)">
      <rect
        x="-22"
        y="-11"
        width="44"
        height="22"
        rx="6"
        fill="color-mix(in srgb, var(--c-accent) 28%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="1.8"
      />
    </g>
    <CourseArrow :from="P" :to="V" stroke="var(--c-physics)" :stroke-width="3" />
    <text
      :x="V.x + 6"
      :y="V.y + 20"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="var(--c-physics)"
      text-anchor="start"
      stroke="var(--c-bg-soft)"
      stroke-width="3.5"
      paint-order="stroke"
    >
      v
    </text>
    <g :style="{ opacity: showCorrect ? 0.55 : 1 }">
      <CourseArrow :from="P" :to="CAND" stroke="var(--c-text-dim)" :stroke-width="3" stroke-dasharray="8 6" />
      <text
        :x="CAND.x - 10"
        :y="CAND.y + 6"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="var(--c-text-dim)"
        text-anchor="end"
        stroke="var(--c-bg-soft)"
        stroke-width="3.5"
        paint-order="stroke"
      >
        F
      </text>
    </g>
    <g v-if="showCorrect">
      <CourseArrow :from="P" :to="F" stroke="var(--c-accent)" :stroke-width="3.4" />
      <text
        :x="F.x - 8"
        :y="F.y - 4"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="var(--c-accent)"
        text-anchor="end"
        stroke="var(--c-bg-soft)"
        stroke-width="3.5"
        paint-order="stroke"
      >
        F
      </text>
      <g stroke="var(--c-force)" stroke-width="3.4" stroke-linecap="round">
        <line x1="338" y1="221" x2="354" y2="237" />
        <line x1="338" y1="237" x2="354" y2="221" />
      </g>
    </g>
  </svg>
</template>
