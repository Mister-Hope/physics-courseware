<script setup lang="ts">
/**
 * 练习 1 题目图（13.1 P18，对应教材 13.1 练习与应用第 4 题）
 * 干净的题目图：导线垂直纸面（只画截面小圆、不标电流方向）、小磁针在导线正上方、N 极指向左。
 * showField（点击 1）：画出过磁针的磁感线圆与环绕箭头；showCurrent（点击 2）：导线截面标 ⊙（电流垂直纸面向外）。
 */
import { computed } from "vue";

const { showField = false, showCurrent = false } = defineProps<{
  showField?: boolean;
  showCurrent?: boolean;
}>();

const W = 440;
const H = 440;
const WX = 220;
const WY = 265;
const R = 14;
const circleR = 150;
const compass = { x: WX, y: WY - circleR, r: 26 };

/** 磁感线圆上的环绕箭头（逆时针：上方指向左、下方指向右） */
const arcs = computed(() => [
  { x1: WX + 26, y1: compass.y, x2: WX - 26, y2: compass.y },
  { x1: WX - 24, y1: WY + circleR, x2: WX + 24, y2: WY + circleR },
]);
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <!-- 导线截面 -->
    <circle :cx="WX" :cy="WY" :r="R" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="2.4" />
    <g v-if="showCurrent">
      <circle :cx="WX" :cy="WY" r="5" fill="var(--c-text)" />
      <text :x="WX + 26" :y="WY + 6" font-size="16" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">I</text>
    </g>

    <!-- 磁针（干净题图：N 极指向左） -->
    <g>
      <circle :cx="compass.x" :cy="compass.y" :r="compass.r" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.55" />
      <path :d="`M ${compass.x} ${compass.y - 7} L ${compass.x - 34} ${compass.y} L ${compass.x} ${compass.y + 7} Z`" fill="var(--c-danger)" />
      <path :d="`M ${compass.x} ${compass.y - 7} L ${compass.x + 34} ${compass.y} L ${compass.x} ${compass.y + 7} Z`" fill="var(--c-velocity)" />
      <text :x="compass.x - 46" :y="compass.y + 5" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">N</text>
    </g>

    <!-- 分析标注：磁感线圆 + 环绕箭头 -->
    <g v-if="showField">
      <circle :cx="WX" :cy="WY" :r="circleR" fill="none" stroke="var(--c-field)" stroke-width="2" stroke-dasharray="9 7" opacity="0.9" />
      <CourseArrow
        v-for="(a, i) in arcs"
        :key="i"
        :from="{ x: a.x1, y: a.y1 }"
        :to="{ x: a.x2, y: a.y2 }"
        stroke="var(--c-field)"
        :stroke-width="2.6"
      />
      <text :x="compass.x + 44" :y="compass.y - 34" font-size="15" fill="var(--c-field)" font-family="KaTeX_Math" font-style="italic">B</text>
    </g>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
