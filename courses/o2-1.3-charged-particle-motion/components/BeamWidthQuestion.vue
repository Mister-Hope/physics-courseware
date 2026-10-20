<!--
  《带电粒子在匀强磁场中的运动》磁控束应用页·**问题页**配图
  —— 一束宽度 d1 的平行带电粒子束从左边射入，要求从右边射出时仍平行、方向不变、宽度变为 d2。
  中间虚线框是"要自己设计的磁场区域"，图上**不给任何答案**（四片叶形磁区留给学生想，在下一页）。
-->
<script setup lang="ts">
/** 画布：1000 × 300 */
const W = 1000;
const H = 300;

/** 束流轴线（屏幕 y） */
const AXIS = 150;

/** 入射 / 出射束的半宽（用户单位） */
const D1 = 84;
const D2 = 30;

/** 束线起点 / 终点横坐标 */
const X_IN = 36;
const X_OUT = 962;

/** 待设计磁区的虚线框 */
const BOX = { x: 372, y: 40, w: 256, h: 220 };
const BOX_R = 18;

/** 宽度标注线的横坐标 */
const DIM_L = 150;
const DIM_R = 872;

/** 平行束的束线高度（相对轴线，上下对称，含轴线上一条） */
const lines = (half: number): number[] => [
  AXIS - half,
  AXIS - half / 2,
  AXIS,
  AXIS + half / 2,
  AXIS + half,
];

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-beam-question">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="fig-svg"
      role="img"
      aria-label="宽度 d1 的平行粒子束射入待设计的磁场区域，从右侧射出时变成宽度 d2 的平行束"
    >
      <!-- 待设计的磁场区域：虚线框 + 问号 -->
      <rect
        :x="BOX.x"
        :y="BOX.y"
        :width="BOX.w"
        :height="BOX.h"
        :rx="BOX_R"
        fill="color-mix(in srgb, var(--c-accent) 5%, transparent)"
        stroke="var(--c-text-dim)"
        stroke-width="2.2"
        stroke-dasharray="12 9"
      />
      <text
        :x="BOX.x + BOX.w / 2"
        :y="BOX.y + BOX.h / 2 + 20"
        font-size="64"
        text-anchor="middle"
        fill="var(--c-accent)"
        font-family="KaTeX_Main, serif"
      >
        ?
      </text>

      <!-- 入射平行束（宽度 d1） -->
      <g fill="none" stroke="var(--c-force)" stroke-width="2" stroke-linecap="round" opacity="0.9">
        <line v-for="y in lines(D1)" :key="`in-${y}`" :x1="X_IN" :y1="y" :x2="BOX.x" :y2="y" />
      </g>

      <!-- 出射平行束（宽度 d2，方向不变） -->
      <g fill="none" stroke="var(--c-force)" stroke-width="2" stroke-linecap="round" opacity="0.9">
        <line
          v-for="y in lines(D2)"
          :key="`out-${y}`"
          :x1="BOX.x + BOX.w"
          :y1="y"
          :x2="X_OUT"
          :y2="y"
        />
      </g>

      <!-- 入射束宽度 d1 -->
      <CourseArrow
        :from="{ x: DIM_L, y: AXIS }"
        :to="{ x: DIM_L, y: AXIS - D1 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <CourseArrow
        :from="{ x: DIM_L, y: AXIS }"
        :to="{ x: DIM_L, y: AXIS + D1 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <text
        :x="DIM_L - 16"
        :y="AXIS + 9"
        font-size="24"
        text-anchor="end"
        fill="var(--c-text)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        d
        <tspan dx="1" dy="5" font-size="15" font-family="KaTeX_Main" font-style="normal">1</tspan>
      </text>

      <!-- 出射束宽度 d2 -->
      <CourseArrow
        :from="{ x: DIM_R, y: AXIS }"
        :to="{ x: DIM_R, y: AXIS - D2 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <CourseArrow
        :from="{ x: DIM_R, y: AXIS }"
        :to="{ x: DIM_R, y: AXIS + D2 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <text
        :x="DIM_R + 14"
        :y="AXIS + 9"
        font-size="24"
        text-anchor="start"
        fill="var(--c-text)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        d
        <tspan dx="1" dy="5" font-size="15" font-family="KaTeX_Main" font-style="normal">2</tspan>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.fig-beam-question {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

.fig-beam-question .fig-svg {
  width: 100%;
  max-width: none;
  height: 100%;
}
</style>
