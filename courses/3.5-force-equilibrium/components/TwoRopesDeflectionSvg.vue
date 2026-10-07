<script setup lang="ts">
/**
 * 第 22 页：两段轻绳的偏角。
 *
 * - 第 0 步（题干）：只给情景 + 三个半透明的 B（高度错开：左边最低、右边最高，互不压住）， 并画出 A 到三个候选位置的虚线绳 —— 哪个才是真的先不说。
 * - 第 1 步（整体法）：把 A、B 用虚线框框起来，画出总重 2mg、两个水平外力和绳的拉力 F1。
 * - 第 2 步（隔离 B）：整体法的力自动隐藏，只留 B 自己的三力 —— 绳的拉力 F2、重力 mg、水平力 F。
 */
const { step = 0 } = defineProps<{ step?: number }>();

/** 天花板、悬挂点、两绳与两物块 */
const CEIL_Y = 30;
const pointO = { x: 140, y: CEIL_Y };
const pointA = { x: 103.6, y: 133.8 };
const pointB = { x: 166.7, y: 223.9 };
const BLOCK_W = 46;
const BLOCK_H = 20;

/** 三个候选位置：虚线左侧、正下方、右侧；高度错开，左边最低、右边最高 */
const ghosts = [
  { x: 112, y: 268 },
  { x: pointO.x, y: 246 },
  { x: pointB.x, y: pointB.y },
];
</script>

<template>
  <svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg">
    <!-- 天花板与悬点、竖直虚线 -->
    <line x1="40" y1="30" x2="320" y2="30" stroke="#94a3b8" stroke-width="3" />
    <line x1="70" y1="30" x2="56" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="120" y1="30" x2="106" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="170" y1="30" x2="156" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="220" y1="30" x2="206" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="270" y1="30" x2="256" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="140" y1="30" x2="140" y2="290" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.7" />
    <text x="144" y="24" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">O</text>

    <!-- 第一段绳与物块 A（题目已给） -->
    <line :x1="pointO.x" :y1="pointO.y" :x2="pointA.x" :y2="pointA.y" stroke="#94a3b8" stroke-width="2.2" />
    <rect
      :x="pointA.x - BLOCK_W / 2"
      :y="pointA.y - BLOCK_H / 2"
      :width="BLOCK_W"
      :height="BLOCK_H"
      rx="4"
      fill="rgba(96,165,250,0.16)"
      stroke="#60a5fa"
      stroke-width="2"
    />
    <text :x="pointA.x - 38" :y="pointA.y + 18" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="15">A</text>

    <!-- 第 0 步：三个候选位置（半透明）+ 三根虚线绳 -->
    <g v-if="step < 1">
      <template v-for="(ghost, index) in ghosts" :key="index">
        <line :x1="pointA.x" :y1="pointA.y" :x2="ghost.x" :y2="ghost.y" stroke="#60a5fa" stroke-width="1.8" stroke-dasharray="6 5" opacity="0.4" />
        <rect
          :x="ghost.x - BLOCK_W / 2"
          :y="ghost.y - BLOCK_H / 2"
          :width="BLOCK_W"
          :height="BLOCK_H"
          rx="4"
          fill="rgba(96,165,250,0.10)"
          stroke="#60a5fa"
          stroke-width="2"
          stroke-dasharray="5 4"
          opacity="0.5"
        />
        <text :x="ghost.x - BLOCK_W / 2 - 22" :y="ghost.y + 6" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="15" opacity="0.65">
          B
        </text>
      </template>
    </g>

    <!-- 第 1 步起：第二段绳、真正的 B、β 角（含竖直边界线）、水平力 F -->
    <g v-if="step >= 1">
      <line :x1="pointA.x" :y1="pointA.y" :x2="pointB.x" :y2="pointB.y" stroke="#94a3b8" stroke-width="2.2" />
      <line :x1="pointA.x" :y1="pointA.y" :x2="pointA.x" :y2="pointA.y + 64" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.7" />
      <rect
        :x="pointB.x - BLOCK_W / 2"
        :y="pointB.y - BLOCK_H / 2"
        :width="BLOCK_W"
        :height="BLOCK_H"
        rx="4"
        fill="rgba(96,165,250,0.16)"
        stroke="#60a5fa"
        stroke-width="2"
      />
      <text :x="pointB.x - 36" :y="pointB.y + 26" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="15">B</text>
      <path
        :d="`M ${pointA.x} ${pointA.y + 40} A 40 40 0 0 0 ${pointA.x + 22.9} ${pointA.y + 32.8}`"
        fill="none"
        stroke="#94a3b8"
        stroke-width="1.4"
        stroke-dasharray="5 4"
      />
      <text :x="pointA.x + 26" :y="pointA.y + 46" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="16">β</text>
      <CourseArrow
        :from="{ x: pointB.x + BLOCK_W / 2, y: pointB.y }"
        :to="{ x: pointB.x + BLOCK_W / 2 + 50, y: pointB.y }"
        :head-size="10"
        stroke="#e2a846"
        stroke-width="3"
      />
      <text :x="pointB.x + 34" :y="pointB.y - 6" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    </g>

    <!-- 两绳偏角 α -->
    <path d="M 140 75 A 45 45 0 0 0 125.1 72.5" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" />
    <text x="112" y="72" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="16">α</text>

    <!-- 题目给的水平外力 2F（作用在 A） -->
    <CourseArrow
      :from="{ x: pointA.x - BLOCK_W / 2, y: pointA.y }"
      :to="{ x: pointA.x - BLOCK_W / 2 - 50, y: pointA.y }"
      :head-size="10"
      stroke="#e2a846"
      stroke-width="3"
    />
    <text x="34" y="126" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">2F</text>

    <!-- 第 1 步：整体法（隔离 B 时自动隐藏） -->
    <g v-if="step === 1">
      <rect x="72" y="116" width="126" height="126" rx="10" fill="none" stroke="#e2a846" stroke-width="2" stroke-dasharray="8 6" />
      <CourseArrow :from="{ x: 135, y: 168 }" :to="{ x: 135, y: 214 }" :head-size="10" stroke="#f87171" stroke-width="3" />
      <text x="140" y="208" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">2mg</text>
      <CourseArrow :from="pointA" :to="{ x: 118.5, y: 91.3 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <text x="122" y="92" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="131" y="95" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    </g>

    <!-- 第 2 步：隔离 B —— 只留 B 自己的三力 -->
    <g v-if="step >= 2">
      <CourseArrow :from="pointB" :to="{ x: 140.9, y: 187 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <text x="118" y="192" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="127" y="195" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
      <CourseArrow :from="pointB" :to="{ x: pointB.x, y: 268 }" :head-size="10" stroke="#f87171" stroke-width="3" />
      <text :x="pointB.x + 6" :y="266" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">mg</text>
    </g>
  </svg>
</template>
