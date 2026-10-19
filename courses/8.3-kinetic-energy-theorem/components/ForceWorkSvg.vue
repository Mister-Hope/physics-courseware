<script setup lang="ts">
/**
 * 第 2 页「动能的表达式（情境）」示意图：图 8.3-1。
 *
 * 光滑水平面上，物块在与运动方向相同的恒力 F 作用下发生一段位移 l，速度由 v₁ 增加到 v₂。 几何约束（旧稿踩过的坑）：
 *
 * - F 从物块**几何中心**出发；
 * - L 的尺寸线两端对准物块初、末位置的**几何中心**（不是虚线框边缘），否则图示自相矛盾。
 */

const BLOCK_W = 64;
const BLOCK_H = 52;
/** 水平面 y 坐标 */
const GROUND = 176;

/** 初位置物块（底边贴水平面） */
const START = { x: 80, y: GROUND - BLOCK_H };
/** 末位置虚影物块 */
const END = { x: 470, y: GROUND - BLOCK_H };

/** 物块几何中心：F 的起点、l 尺寸线的端点都取这里 */
const startCenter = { x: START.x + BLOCK_W / 2, y: START.y + BLOCK_H / 2 };
const endCenter = { x: END.x + BLOCK_W / 2, y: END.y + BLOCK_H / 2 };
</script>

<template>
  <svg
    viewBox="0 0 720 232"
    width="100%"
    style="max-width: 700px; margin-inline: auto"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="光滑水平面上物块在恒力作用下发生一段位移，速度由 v1 增到 v2"
  >
    <!-- 水平面 -->
    <SurfaceHatch :from="{ x: 20, y: GROUND }" :to="{ x: 700, y: GROUND }" side="below" :thickness="13" :gap="20" color="var(--c-text-dim)" :line-width="2.2" />
    <text x="698" y="163" font-size="16" fill="var(--c-text-dim)" text-anchor="end">光滑水平面</text>

    <!-- 末位置虚影（只表示"运动到了这里"） -->
    <rect
      :x="END.x"
      :y="END.y"
      :width="BLOCK_W"
      :height="BLOCK_H"
      rx="6"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-dasharray="8 6"
      stroke-opacity="0.55"
    />

    <!-- 物块（初位置） -->
    <rect :x="START.x" :y="START.y" :width="BLOCK_W" :height="BLOCK_H" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-accent)" stroke-width="2.2" />
    <text :x="startCenter.x" :y="GROUND - 6" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)" text-anchor="middle">m</text>

    <!-- 恒力 F：从物块几何中心出发 -->
    <CourseArrow
      :from="{ x: startCenter.x, y: startCenter.y }"
      :to="{ x: startCenter.x + 150, y: startCenter.y }"
      stroke="var(--c-force)"
      :stroke-width="3.4"
    />
    <text :x="startCenter.x + 164" :y="startCenter.y + 8" font-family="KaTeX_Math" font-style="italic" font-size="23" fill="var(--c-force)">F</text>

    <!-- 速度：画在物块上方旁侧；v₂ 箭头比 v₁ 长，体现速度增大 -->
    <CourseArrow :from="{ x: 78, y: 100 }" :to="{ x: 148, y: 100 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text x="113" y="88" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-velocity)" text-anchor="middle">
      <tspan>v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="14">1</tspan>
    </text>

    <CourseArrow :from="{ x: 466, y: 100 }" :to="{ x: 582, y: 100 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text x="524" y="88" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-velocity)" text-anchor="middle">
      <tspan>v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="14">2</tspan>
    </text>

    <!-- 位移 l：两端对准两个位置的几何中心 -->
    <line :x1="startCenter.x" y1="182" :x2="startCenter.x" y2="222" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line :x1="endCenter.x" y1="182" :x2="endCenter.x" y2="222" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line :x1="startCenter.x" y1="214" :x2="endCenter.x" y2="214" stroke="var(--c-accent)" stroke-width="2.4" />
    <line :x1="startCenter.x" y1="206" :x2="startCenter.x" y2="222" stroke="var(--c-accent)" stroke-width="2.4" />
    <line :x1="endCenter.x" y1="206" :x2="endCenter.x" y2="222" stroke="var(--c-accent)" stroke-width="2.4" />
    <text
      :x="(startCenter.x + endCenter.x) / 2"
      y="206"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="22"
      fill="var(--c-accent)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      l
    </text>
  </svg>
</template>
