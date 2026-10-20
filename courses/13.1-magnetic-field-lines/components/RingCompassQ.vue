<script setup lang="ts">
/**
 * 练习 2 题目图（13.1 P19，对应教材 13.1 练习与应用第 5 题） 干净的题目图：纸面内的圆形导线环 + 逆时针电流箭头 + 环心小磁针（不给结论）。 showField（点击
 * 1）：环心标出轴线磁场方向（垂直纸面向外，⊙）； showAnswer（点击 2）：小磁针 N 极指向纸外（红色 ⊙ 标 N）。
 */
import { computed } from "vue";

const { showField = false, showAnswer = false } = defineProps<{
  showField?: boolean;
  showAnswer?: boolean;
}>();

const W = 560;
const H = 440;
const CX = 280;
const CY = 220;
const R = 130;

/** 逆时针（纸面内）电流箭头：切向 (sinθ, −cosθ) */
const angleList = [0, 90, 180, 270];
const arrows = computed(() =>
  angleList.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const px = CX + R * Math.cos(rad);
    const py = CY + R * Math.sin(rad);
    const tx = Math.sin(rad);
    const ty = -Math.cos(rad);
    return {
      from: { x: px - 22 * tx, y: py - 22 * ty },
      to: { x: px + 22 * tx, y: py + 22 * ty },
    };
  }),
);
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <!-- 导线环 -->
    <circle :cx="CX" :cy="CY" :r="R" fill="none" stroke="var(--c-text)" stroke-width="4" />
    <CourseArrow
      v-for="(a, i) in arrows"
      :key="i"
      :from="a.from"
      :to="a.to"
      stroke="var(--c-force)"
      :stroke-width="2.8"
    />
    <text
      :x="CX + R + 14"
      :y="CY - 8"
      font-size="16"
      fill="var(--c-force)"
      font-family="KaTeX_Math"
      font-style="italic"
    >
      I
    </text>

    <!-- 环心小磁针（题目只给位置，不给结论） -->
    <circle
      :cx="CX"
      :cy="CY"
      r="30"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.2"
      stroke-dasharray="5 5"
      opacity="0.6"
    />

    <!-- 点击 1：轴线磁场垂直纸面向外 -->
    <g v-if="showField">
      <FieldMark :x="CX + 82" :y="CY - 82" dir="out" :r="13" label="B" />
    </g>

    <!-- 点击 2：N 极指向纸外 -->
    <g v-if="showAnswer">
      <circle :cx="CX" :cy="CY" r="13" fill="none" stroke="var(--c-danger)" stroke-width="2.6" />
      <circle :cx="CX" :cy="CY" r="4.5" fill="var(--c-danger)" />
      <text
        :x="CX + 22"
        :y="CY - 14"
        font-size="15"
        fill="var(--c-danger)"
        font-family="KaTeX_Main"
      >
        N
      </text>
    </g>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
