<script setup lang="ts">
// 用于第 21 页（例题：画出物体由 A 到 D 的轨迹，教材 §5.1 第 5 题）：
// 题目图常显（A、B、C 的位置与 A 点速度 v）；点击后依次出现三段合力方向与对应的轨迹。
// 分步由页面传 :step="$clicks" 控制（固定尺寸 SVG 内部用 v-if 不会顶跑页面元素）。
const { step = 0 } = defineProps<{ step?: number }>();

interface Point {
  x: number;
  y: number;
}

const pointA: Point = { x: 80, y: 140 };
const pointB: Point = { x: 300, y: 250 };
const C: Point = { x: 430, y: 250 };
const pointD: Point = { x: 560, y: 168 };

const vTip: Point = { x: pointA.x + 108, y: pointA.y };
/** 三段合力（题目给的方向："向前但偏右" → 图中偏下；"向前但偏左" → 图中偏上） */
const f1Tip: Point = { x: pointA.x + 82, y: pointA.y + 62 };
const f2Tip: Point = { x: pointB.x + 96, y: pointB.y };
const f3Tip: Point = { x: C.x + 82, y: C.y - 62 };

const pathAB = `M ${pointA.x} ${pointA.y} C 170 250 240 250 ${pointB.x} ${pointB.y}`;
const pathCD = `M ${C.x} ${C.y} C 486 250 542 226 ${pointD.x} ${pointD.y}`;
</script>

<template>
  <svg viewBox="0 0 620 400" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="26" y="36" font-family="KaTeX_Main" font-size="22" fill="#94a3b8">俯视图：沿前进方向看</text>
    <text x="24" y="92" font-family="KaTeX_Main" font-size="22" fill="#94a3b8">左侧</text>
    <text x="24" y="338" font-family="KaTeX_Main" font-size="22" fill="#94a3b8">右侧</text>
    <CourseArrow :from="pointA" :to="vTip" stroke="#60a5fa" stroke-width="3.4" label="v" :label-dx="0" :label-dy="30" />
    <text x="112" y="118" font-family="KaTeX_Main" font-size="22" fill="#60a5fa">前进方向</text>
    <circle :cx="pointA.x" :cy="pointA.y" r="7" fill="#f1f5f9" />
    <circle :cx="pointB.x" :cy="pointB.y" r="7" fill="#f1f5f9" />
    <circle :cx="C.x" :cy="C.y" r="7" fill="#f1f5f9" />
    <text :x="pointA.x - 6" :y="pointA.y - 16" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#f1f5f9">A</text>
    <text :x="pointB.x - 6" :y="pointB.y - 16" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#f1f5f9">B</text>
    <text :x="C.x - 6" :y="C.y + 38" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#f1f5f9">C</text>
    <g v-if="step >= 1">
      <path :d="pathAB" fill="none" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round" />
      <CourseArrow :from="pointA" :to="f1Tip" stroke="#e2a846" stroke-width="3.6" label="合力" :label-dx="34" :label-dy="-10" />
    </g>
    <g v-if="step >= 2">
      <line :x1="pointB.x" :y1="pointB.y" :x2="C.x" :y2="C.y" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round" />
      <CourseArrow :from="pointB" :to="f2Tip" stroke="#e2a846" stroke-width="3.6" label="合力" :label-dx="14" :label-dy="-18" />
    </g>
    <g v-if="step >= 3">
      <path :d="pathCD" fill="none" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round" />
      <CourseArrow :from="C" :to="f3Tip" stroke="#e2a846" stroke-width="3.6" label="合力" :label-dx="26" :label-dy="-16" />
      <circle :cx="pointD.x" :cy="pointD.y" r="7" fill="#f1f5f9" />
      <text :x="pointD.x - 4" :y="pointD.y - 16" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#f1f5f9">D</text>
    </g>
  </svg>
</template>
