<script setup lang="ts">
import { computed } from "vue";

/**
 * 减法示意图（第 9 页）：同一起点 O 出发的 a = OA、b = OB，以及从 B 指向 A 的 BA = a − b。
 *
 * 为什么单独成组件、而不是直接写在 `slides.md` 里：图内标注要渲染**真 LaTeX**（`\overrightarrow{BA}`、 `\vec{a} -
 * \vec{b}`），代码块写法给不了；而坐标轴又必须交给共享 `CoordAxes`（旧图是手写的 x/y 轴 + O）。 于是做成薄壳：轴/刻度/O 归组件，三条矢量箭头与点标注走
 * `#overlay` + `labels`。
 *
 * 数据是"示意口径"：只保证三条矢量的方向、长度比与旧图一致（旧图 a、b 的斜率分别是 0.321 与 1.830， 这里 2.2/7 = 0.314、5.5/3 =
 * 1.833），不涉及具体物理量。
 */
interface Point {
  x: number;
  y: number;
}

/** 矢量 a 的终点 A（a 的坐标就是它） */
const tipA: Point = { x: 7, y: 2.2 };
/** 矢量 b 的终点 B */
const tipB: Point = { x: 3, y: 5.5 };

/**
 * 只第一象限、且不带刻度数字（旧图也没有刻度）：横轴 0–12、纵轴 0–7.5， 绘图区比例 1.6 与旧图（230 : 141）一致，三条矢量的夹角不失真。 横轴量标签放上侧（`side:
 * 'above'`），底部只留刻度短线的高度，图不必再长。
 */
const X_RANGE: [number, number] = [0, 12];
const Y_RANGE: [number, number] = [0, 7.5];
const VIEW = { width: 300, height: 226 };

/** 点标注走 `labels`（HTML + 真 KaTeX）：点名用 tex 渲染成斜体数学字，BA 的式子是真 LaTeX */
const labels = computed(() => [
  {
    x: tipA.x,
    y: tipA.y,
    tex: "A",
    anchor: "top-right" as const,
    color: "var(--c-accent)",
    size: 15,
    dot: 5,
    dotColor: "var(--c-accent)",
  },
  {
    x: tipB.x,
    y: tipB.y,
    tex: "B",
    anchor: "top-left" as const,
    color: "var(--c-accent-2)",
    size: 15,
    dot: 5,
    dotColor: "var(--c-accent-2)",
  },
  {
    x: 7.4,
    y: 4.5,
    tex: "\\overrightarrow{BA} = \\vec{a} - \\vec{b}",
    anchor: "left" as const,
    color: "var(--c-physics)",
    size: 17,
    halo: true,
  },
]);
</script>

<template>
  <div class="vs-figure">
    <CoordAxes
      :x-range="X_RANGE"
      :y-range="Y_RANGE"
      :x-axis="{ side: 'above' }"
      :ticks="{ x: [], y: [], labels: false }"
      :view="VIEW"
      :labels="labels"
    >
      <template #overlay="{ x, y }">
        <!-- a = OA、b = OB：同一起点 -->
        <CourseArrow
          :from="{ x: x(0), y: y(0) }"
          :to="{ x: x(tipA.x), y: y(tipA.y) }"
          :head-size="12"
          stroke="var(--c-accent)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="{ x: x(0), y: y(0) }"
          :to="{ x: x(tipB.x), y: y(tipB.y) }"
          :head-size="12"
          stroke="var(--c-accent-2)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <!-- BA = a − b：从 b 的终点指向 a 的终点 -->
        <CourseArrow
          :from="{ x: x(tipB.x), y: y(tipB.y) }"
          :to="{ x: x(tipA.x), y: y(tipA.y) }"
          :head-size="12"
          stroke="var(--c-physics)"
          stroke-width="3.2"
          stroke-dasharray="7 4"
          pointer-events="none"
        />
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
/* 旧图是"裸" SVG（没有卡片边框 / 底色），这里保持一致 */
.vs-figure {
  width: 100%;
  min-width: 0;
  max-width: 19rem;
}
</style>
