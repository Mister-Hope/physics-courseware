<!--
  选必2 1.x《复合场中的配速法与摆线运动》"绳断后半径变化"一页的题目图（俯视图）：
  光滑水平面上，细绳一端固定在 O、另一端拴一个带正电小球，小球绕 O 顺时针做匀速圆周运动；
  水平面处于垂直纸面向里的匀强磁场中（裸 × 阵列），某时刻细绳突然断裂。
  · 常显（题目图）：磁场阵列 + 虚线圆周轨迹 + O 与细绳 + 小球；
  · showAnalysis 打开后（点击）才画：小球速度 v（顺时针 ⇒ 左侧点速度向上）、洛伦兹力 F洛（**背离圆心向外**：
    正电荷 + 磁场垂直纸面向里 + 速度向上 ⟹ F = qv×B 指向左侧），以及绳断后小球的新圆周轨迹
    （圆心落在小球外侧的 (166, 240)、半径 46 —— 洛伦兹力就是这条新轨道的向心力，小球绕新圆心逆时针转，
    所以它先是离 O 越来越远。与原题答案一致：「由左手定则可知，小球受洛伦兹力背离圆心向外……
    小球将在洛伦兹力作用下绕逆时针方向做匀速圆周运动」）。
-->
<script setup lang="ts">
const { showAnalysis = false } = defineProps<{
  /** 点击步到了才画速度、洛伦兹力与绳断后的新轨迹；干净题目图时传 false */
  showAnalysis?: boolean;
}>();
</script>

<template>
  <div class="fig-string">
    <svg viewBox="0 0 660 460" class="fig-svg">
      <FieldDots
        :x="50"
        :y="62"
        :cols="6"
        :rows="4"
        :spacing="105"
        :size="12"
        :line-width="3.1"
        :opacity="0.9"
        dir="in"
      />
      <circle
        cx="330"
        cy="240"
        r="118"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="3.4"
        stroke-dasharray="7 6"
      />
      <line x1="330" y1="240" x2="212" y2="240" stroke="var(--c-text)" stroke-width="3.4" />
      <circle cx="330" cy="240" r="11" fill="var(--c-text)" />
      <circle
        cx="212"
        cy="240"
        r="17"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        stroke-width="3.8"
      />
      <text
        x="344"
        y="264"
        fill="var(--c-text)"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="34"
        :style="{ stroke: 'var(--c-bg)', 'stroke-width': 6.7, 'paint-order': 'stroke' }"
      >
        O
      </text>
      <g v-if="showAnalysis">
        <circle cx="166" cy="240" r="46" fill="none" stroke="var(--c-accent)" stroke-width="3.8" />
        <CourseArrow
          :from="{ x: 212, y: 240 }"
          :to="{ x: 212, y: 118 }"
          stroke="var(--c-velocity)"
          :stroke-width="5"
          :head-size="20"
        />
        <text
          x="198"
          y="168"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="34"
          text-anchor="end"
          :style="{ stroke: 'var(--c-bg)', 'stroke-width': 6.7, 'paint-order': 'stroke' }"
        >
          v
        </text>
        <!-- F = qv×B：正电荷、B 垂直纸面向里、v 向上 ⟹ F 水平向左（背离圆心 O） -->
        <CourseArrow
          :from="{ x: 212, y: 240 }"
          :to="{ x: 102, y: 240 }"
          stroke="var(--c-force)"
          :stroke-width="5"
          :head-size="20"
        />
        <text
          x="96"
          y="222"
          fill="var(--c-force)"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="34"
          text-anchor="end"
          :style="{ stroke: 'var(--c-bg)', 'stroke-width': 2.4, 'paint-order': 'stroke' }"
        >
          F
          <tspan font-family="KaTeX_Main" font-size="23" dy="8">洛</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 根 div 与 svg 顶部对齐：不居中、不留外边距（父级 align-items: center 也压得住）；
   图宽上限交给共享的 .fig-svg（本课 style.css）读 --fig-max
   —— 第 7 页题目页图栏 ≈ 438px、第 8 页解析页图栏 ≈ 500px，540px 让两处都被栏宽限住 */
.fig-string {
  display: block;
  align-self: flex-start;
  width: 100%;

  --fig-max: 540px;
}
</style>
