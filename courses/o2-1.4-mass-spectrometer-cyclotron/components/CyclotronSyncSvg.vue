<!--
  第 9 页（教材「思考与讨论」）：半径变大、用时不变 —— 半圆一条比一条大，每条用时还是 T/2
  —— 上方三条半圆：圆心都在缝上、沿缝依次外移，上下交替（真实回旋加速器的轨迹结构）
     虚线半径 + r₁ < r₂ < r₃ 标注
  —— 下方时间条：三条**等长**的 T/2 时间条首尾相接排在时间轴 t 上（同样的节拍，一段接一段）
     弧与时间条按颜色一一对应
  图上不出现具体数值：只表达「半径变大、用时不变」这一条结论。
-->
<script setup lang="ts">
import { computed } from "vue";

const GAP_Y = 124; // 缝隙（水平线）的高度
const X0 = 40; // 第 1 条半圆的起点
const RADII = [42, 66, 90]; // 三条半圆的半径（r₁ < r₂ < r₃）
const BAR_LEN = 160; // 时间条长度：三条**等长**，就是「用时不变」
const AXIS_Y = 252; // 时间轴
const BAR_TOP = 222; // 时间条顶边（底边压在时间轴上）

interface Arc {
  r: number;
  cx: number;
  up: boolean;
  d: string;
}

/** 三条半圆：圆心沿缝依次外移（前一条的直径 + 本条半径），上下交替 */
const arcs = computed<Arc[]>(() => {
  let cursor = X0;
  return RADII.map((r, i) => {
    const cx = cursor + r;
    const up = i % 2 === 0;
    const d = `M ${cursor} ${GAP_Y} A ${r} ${r} 0 0 ${up ? 1 : 0} ${cursor + 2 * r} ${GAP_Y}`;
    cursor += 2 * r;
    return { r, cx, up, d };
  });
});

/** 时间条的刻度位置：四条刻度把三段**等长**的 T/2 分开（等长本身就是结论） */
const ticks = [0, 1, 2, 3].map((i) => X0 + i * BAR_LEN);

/** 半径虚线：圆心 → 弧顶 */
const radiusLine = (a: Arc): { x1: number; y1: number; x2: number; y2: number } => ({
  x1: a.cx,
  y1: GAP_Y,
  x2: a.cx,
  y2: a.up ? GAP_Y - a.r : GAP_Y + a.r,
});

/**
 * 弧顶旁的半径标签位置（上弧标在弧顶上方、下弧标在弧顶下方）
 *
 * @param a 半圆
 * @returns 标签基线起点
 */
const labelSpot = (a: Arc): { x: number; y: number } => ({
  x: a.cx,
  y: a.up ? GAP_Y - a.r - 14 : GAP_Y + a.r + 18,
});
</script>

<template>
  <div class="cs-wrap">
    <svg class="cs-svg" viewBox="0 0 640 296" xmlns="http://www.w3.org/2000/svg">
      <line class="cs-gap-line" :x1="24" :y1="GAP_Y" :x2="466" :y2="GAP_Y" />
      <g v-for="(a, i) in arcs" :key="i" :class="'cs-c' + i">
        <path class="cs-arc" :d="a.d" />
        <line class="cs-radius" :x1="radiusLine(a).x1" :y1="radiusLine(a).y1" :x2="radiusLine(a).x2" :y2="radiusLine(a).y2" />
        <text class="cs-rlabel" :x="labelSpot(a).x" :y="labelSpot(a).y">
          <tspan class="cs-math">r</tspan>
          <tspan class="cs-sub" dy="4">{{ i + 1 }}</tspan>
        </text>
      </g>
      <g v-for="(_, i) in arcs" :key="'bar' + i" :class="'cs-c' + i">
        <rect class="cs-bar" :x="X0 + i * BAR_LEN" :y="BAR_TOP" :width="BAR_LEN" :height="AXIS_Y - BAR_TOP" />
        <text class="cs-t2" :x="X0 + i * BAR_LEN + BAR_LEN / 2" :y="AXIS_Y + 24">
          <tspan class="cs-math">T</tspan>
          <tspan>/2</tspan>
        </text>
      </g>
      <CourseArrow :from="{ x: 32, y: AXIS_Y }" :to="{ x: 596, y: AXIS_Y }" stroke="var(--c-text-dim)" :stroke-width="2" />
      <g class="cs-tick">
        <line v-for="t in ticks" :key="t" :x1="t" :y1="AXIS_Y - 7" :x2="t" :y2="AXIS_Y + 7" />
      </g>
      <text class="cs-axis-label" :x="604" :y="AXIS_Y + 8">t</text>
    </svg>
  </div>
</template>

<style scoped>
.cs-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
}

.cs-svg {
  display: block;
  width: 100%;
  height: auto;
}

.cs-gap-line {
  stroke: color-mix(in srgb, var(--c-text-dim) 55%, transparent);
  stroke-dasharray: 6 6;
  stroke-width: 1.4;
}

.cs-c0 {
  --cs-color: var(--c-accent);
}

.cs-c1 {
  --cs-color: var(--c-accent-2);
}

.cs-c2 {
  --cs-color: var(--c-physics);
}

.cs-arc {
  fill: none;
  stroke: var(--cs-color);
  stroke-linecap: round;
  stroke-width: 3;
}

.cs-radius {
  stroke: color-mix(in srgb, var(--cs-color) 65%, transparent);
  stroke-dasharray: 6 5;
  stroke-width: 1.8;
}

.cs-bar {
  fill: color-mix(in srgb, var(--cs-color) 45%, transparent);
  stroke: var(--cs-color);
  stroke-width: 2;
}

.cs-tick {
  stroke: var(--c-text-dim);
  stroke-width: 1.6;
}

.cs-rlabel,
.cs-t2 {
  text-anchor: middle;
}

.cs-rlabel {
  font-size: 20px;
  fill: var(--cs-color);
}

.cs-t2 {
  font-size: 18px;
  fill: var(--cs-color);
}

.cs-axis-label {
  font-style: italic;
  font-size: 22px;
  font-family: "KaTeX_Math", serif;
  fill: var(--c-text-dim);
}

.cs-math {
  font-style: italic;
  font-family: "KaTeX_Math", serif;
}

.cs-sub {
  font-size: 14px;
  font-family: "KaTeX_Main", serif;
}
</style>
