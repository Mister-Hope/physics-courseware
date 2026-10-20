<!--
  P7：闭合电路的一部分导体在磁场中的三种运动（甲 静止 / 乙 沿磁感线运动 / 丙 切割磁感线）。
  第一眼只有干净的装置图与运动方向；指针状态与"有/无感应电流"标注按 :step 逐击出现（固定 SVG 内 v-if，不顶跑版式）。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 当前点击步：1 = 甲出答案，2 = 乙出答案，3 = 丙出答案（指针偏转） */
  step?: number;
}>();

/** 三幅小图，每幅宽 300 */
const PANELS = [
  { x: 0, name: "甲", motion: "still" as const, answerAt: 1, answer: "无感应电流" },
  { x: 300, name: "乙", motion: "alongB" as const, answerAt: 2, answer: "无感应电流" },
  { x: 600, name: "丙", motion: "cut" as const, answerAt: 3, answer: "有感应电流" },
];
const FIELD_X = [55, 90, 125, 160];
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g v-for="p in PANELS" :key="p.name">
        <!-- 面板编号 -->
        <text :x="p.x + 24" y="30" font-size="20" fill="var(--c-text-dim)">{{ p.name }}</text>
        <!-- 蹄形磁体的两极（N 红 / S 蓝）-->
        <rect :x="p.x + 25" y="46" width="170" height="20" rx="3" fill="var(--c-danger)" />
        <rect :x="p.x + 25" y="206" width="170" height="20" rx="3" fill="var(--c-velocity)" />
        <text :x="p.x + 110" y="61" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-bg-soft)">N</text>
        <text :x="p.x + 110" y="221" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-bg-soft)">S</text>
        <!-- 磁感线（N → S，竖直向下）-->
        <CourseArrow
          v-for="(fx, i) in FIELD_X"
          :key="'f' + i"
          :from="{ x: p.x + fx, y: 74 }"
          :to="{ x: p.x + fx, y: 198 }"
          stroke="var(--c-accent)"
          :stroke-width="1.6"
        />
        <!-- 导体棒 AB -->
        <line :x1="p.x + 45" y1="136" :x2="p.x + 175" y2="136" stroke="var(--c-text)" stroke-width="3.5" stroke-linecap="round" />
        <text :x="p.x + 40" y="130" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">A</text>
        <text :x="p.x + 180" y="130" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">B</text>
        <!-- 引线与灵敏电流计 -->
        <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
          <path :d="`M ${p.x + 45} 136 H ${p.x + 14} V 252 H ${p.x + 208}`" />
          <path :d="`M ${p.x + 175} 136 H ${p.x + 278} V 252 H ${p.x + 256}`" />
        </g>
        <CircuitMeter :x="p.x + 232" :y="252" kind="a" :r="24" />
        <line
          :x1="p.x + 232"
          y1="252"
          :x2="p.x + 232"
          y2="233"
          :transform="`rotate(${p.motion === 'cut' && step >= 3 ? 36 : 0} ${p.x + 232} 252)`"
          stroke="var(--c-danger)"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <circle :cx="p.x + 232" cy="252" r="2.6" fill="var(--c-text)" />
        <!-- 运动方向：静止 / 沿磁感线（上下）/ 切割磁感线（左右）-->
        <text v-if="p.motion === 'still'" :x="p.x + 110" y="176" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">静止</text>
        <template v-if="p.motion === 'alongB'">
          <CourseArrow :from="{ x: p.x + 250, y: 136 }" :to="{ x: p.x + 250, y: 92 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
          <CourseArrow :from="{ x: p.x + 250, y: 136 }" :to="{ x: p.x + 250, y: 180 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
        </template>
        <template v-if="p.motion === 'cut'">
          <CourseArrow :from="{ x: p.x + 235, y: 176 }" :to="{ x: p.x + 197, y: 176 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
          <CourseArrow :from="{ x: p.x + 235, y: 176 }" :to="{ x: p.x + 273, y: 176 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
        </template>
        <!-- 答案：逐击出现 -->
        <text
          v-if="step >= p.answerAt"
          :x="p.x + 150"
          y="292"
          text-anchor="middle"
          font-size="18"
          :fill="p.motion === 'cut' ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        >
          {{ p.answer }}
        </text>
      </g>
    </svg>
  </div>
</template>
