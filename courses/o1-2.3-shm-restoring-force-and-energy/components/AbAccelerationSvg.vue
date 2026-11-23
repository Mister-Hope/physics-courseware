<!-- 第 13 页：A、B 两点加速度求平衡位置；初始只给 A、B、加速度方向与 AB 长度，O 与两段距离随 showO 出现 -->
<script setup lang="ts">
const { showO = false } = defineProps<{
  showO?: boolean;
}>();

const A = { x: 80, y: 150 };
const B = { x: 440, y: 150 };
const O = { x: 224, y: 150 };
const ARROW_LEN = 70;
const aATo = { x: A.x + ARROW_LEN, y: A.y };
const aBTo = { x: B.x - ARROW_LEN, y: B.y };
const totalY = 205;
const partY = 250;
</script>

<template>
  <svg viewBox="0 0 520 300" class="em-ab-svg" role="img" aria-label="A、B 两点加速度方向与平衡位置示意图">
    <line :x1="A.x" :y1="A.y" :x2="B.x" :y2="B.y" stroke="var(--c-border-glow)" stroke-width="2" />
    <circle :cx="A.x" :cy="A.y" r="5" fill="var(--c-accent-2)" />
    <circle :cx="B.x" :cy="B.y" r="5" fill="var(--c-accent-2)" />
    <text :x="A.x" :y="A.y - 22" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">A</text>
    <text :x="B.x" :y="B.y - 22" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">B</text>
    <CourseArrow :from="A" :to="aATo" stroke="var(--c-accent-2)" stroke-width="2.8" />
    <CourseArrow :from="B" :to="aBTo" stroke="var(--c-accent-2)" stroke-width="2.8" />
    <text :x="A.x + ARROW_LEN / 2" :y="A.y - 14" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent-2)">
      a<tspan font-family="KaTeX_Main" font-size="13" font-style="normal" dy="4">A</tspan>
    </text>
    <text :x="B.x - ARROW_LEN / 2" :y="B.y - 14" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent-2)">
      a<tspan font-family="KaTeX_Main" font-size="13" font-style="normal" dy="4">B</tspan>
    </text>
    <line :x1="A.x" :y1="totalY" :x2="B.x" :y2="totalY" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line :x1="A.x" :y1="totalY - 10" :x2="A.x" :y2="totalY + 10" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line :x1="B.x" :y1="totalY - 10" :x2="B.x" :y2="totalY + 10" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text :x="(A.x + B.x) / 2" :y="totalY + 28" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-text-dim)">10 cm</text>
    <g v-if="showO">
      <circle :cx="O.x" :cy="O.y" r="6" fill="var(--c-accent)" />
      <text :x="O.x" :y="O.y - 22" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">O</text>
      <line :x1="A.x" :y1="partY" :x2="O.x" :y2="partY" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <line :x1="O.x" :y1="partY" :x2="B.x" :y2="partY" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <line :x1="A.x" :y1="partY - 10" :x2="A.x" :y2="partY + 10" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <line :x1="O.x" :y1="partY - 10" :x2="O.x" :y2="partY + 10" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <line :x1="B.x" :y1="partY - 10" :x2="B.x" :y2="partY + 10" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text :x="(A.x + O.x) / 2" :y="partY + 30" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">
        x<tspan font-family="KaTeX_Main" font-size="12" font-style="normal" dy="4">A</tspan
        ><tspan font-family="KaTeX_Main" font-size="18" font-style="normal" dy="0">=4 cm</tspan>
      </text>
      <text :x="(O.x + B.x) / 2" :y="partY + 30" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">
        x<tspan font-family="KaTeX_Main" font-size="12" font-style="normal" dy="4">B</tspan
        ><tspan font-family="KaTeX_Main" font-size="18" font-style="normal" dy="0">=6 cm</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.em-ab-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
