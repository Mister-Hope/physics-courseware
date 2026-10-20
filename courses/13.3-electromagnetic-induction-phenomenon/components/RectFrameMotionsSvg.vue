<!--
  P17 练习 1 的题目图：匀强磁场中矩形线框的三种运动（甲 上下 / 乙 左右 / 丙 绕轴转动）。
  磁场区域铺满线框的运动范围（否则"移出磁场"会让 Φ 变化，与原题"匀强磁场中"冲突）。
  第一眼只有干净题目图；"Φ 不变 / Φ 变化"按 :step 逐击出现（固定 SVG 内 v-if）。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 当前点击步：1 = 甲、2 = 乙、3 = 丙 */
  step?: number;
}>();

const PANELS = [
  { x: 0, name: "甲", motion: "vertical" as const, answerAt: 1, answer: "不变" },
  { x: 300, name: "乙", motion: "horizontal" as const, answerAt: 2, answer: "不变" },
  { x: 600, name: "丙", motion: "rotate" as const, answerAt: 3, answer: "变化" },
];
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 900 195" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g v-for="p in PANELS" :key="p.name">
        <text :x="p.x + 18" y="20" font-size="19" fill="var(--c-text-dim)">{{ p.name }}</text>
        <!-- 匀强磁场（垂直纸面向里），铺满线框的整个运动范围 -->
        <FieldDots :x="p.x + 30" :y="36" :cols="10" :rows="6" :spacing="22" dir="in" />
        <!-- 线框：丙 另画一个转过一定角度的虚线框（绕竖直轴转动 → 水平方向变窄）-->
        <rect
          v-if="p.motion === 'rotate'"
          :x="p.x + 124"
          y="56"
          width="50"
          height="56"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="2"
          stroke-dasharray="7 5"
          opacity="0.75"
        />
        <rect :x="p.x + 112" y="56" width="84" height="56" fill="none" stroke="var(--c-accent-2)" stroke-width="3" />
        <!-- 转轴 -->
        <line
          v-if="p.motion === 'rotate'"
          :x1="p.x + 154"
          y1="26"
          :x2="p.x + 154"
          y2="150"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
          stroke-dasharray="7 6"
        />
        <!-- 运动方向 -->
        <template v-if="p.motion === 'vertical'">
          <CourseArrow :from="{ x: p.x + 240, y: 84 }" :to="{ x: p.x + 240, y: 58 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
          <CourseArrow :from="{ x: p.x + 240, y: 84 }" :to="{ x: p.x + 240, y: 110 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
        </template>
        <template v-if="p.motion === 'horizontal'">
          <CourseArrow :from="{ x: p.x + 154, y: 152 }" :to="{ x: p.x + 114, y: 152 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
          <CourseArrow :from="{ x: p.x + 154, y: 152 }" :to="{ x: p.x + 194, y: 152 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
        </template>
        <!-- 答案：逐击出现 -->
        <text
          v-if="step >= p.answerAt"
          :x="p.x + 154"
          y="182"
          text-anchor="middle"
          font-size="18"
          :fill="p.motion === 'rotate' ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        >
          <tspan font-family="KaTeX_Math" font-style="italic">Φ</tspan>
          <tspan>{{ p.answer }}</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
