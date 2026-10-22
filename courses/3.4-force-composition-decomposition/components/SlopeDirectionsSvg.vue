<script setup lang="ts">
import type { ChartLabelAnchor } from "../../../workspace/shared/components/label-text";

/**
 * 第 18 页：斜面上要说清的 8 个方向。
 *
 * 斜面上放一个物块，从物块的几何中心引出两对互相垂直的轴（中心在斜面表面上方，不是贴在表面上）：
 *
 * - 水平—竖直（蓝）：水平向右、水平向左、竖直向上、竖直向下
 * - 沿斜面—垂直斜面（金）：沿斜面向上、沿斜面向下、垂直斜面向上、垂直斜面向下
 *
 * 8 个标注按两级"壳层"摆（轴向半径小、斜向半径大），正好让相邻方向的文字错开、互不压字。 地面用共享的 `SurfaceHatch`（斜线只在表面下方一侧，不横穿地面）。
 */
const VIEW = { width: 600, height: 350 };
/** 地面高度、物块与斜面的接触点、斜面底端与顶端（倾角 30°） */
const GROUND_Y = 335;
const CONTACT = { x: 300, y: 175 };
const BASE = { x: 23, y: GROUND_Y };
const TOP = { x: 577, y: 15 };
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;
/** 物块半边长：中心沿外法线抬到斜面表面上方半个边长处 */
const BLOCK_HALF = 24;
/** 外法线方向（背离斜面）与沿斜面向上方向 */
const NORMAL = { x: -SIN30, y: -COS30 };
const ALONG = { x: COS30, y: -SIN30 };
/** 物块中心：8 个方向都从这里引出 */
const ORIGIN = {
  x: CONTACT.x + BLOCK_HALF * NORMAL.x,
  y: CONTACT.y + BLOCK_HALF * NORMAL.y,
};
/** 物块四个角（贴着斜面） */
const BLOCK_POINTS = [
  { x: ORIGIN.x + BLOCK_HALF * ALONG.x + BLOCK_HALF * NORMAL.x, y: ORIGIN.y + BLOCK_HALF * ALONG.y + BLOCK_HALF * NORMAL.y },
  { x: ORIGIN.x + BLOCK_HALF * ALONG.x - BLOCK_HALF * NORMAL.x, y: ORIGIN.y + BLOCK_HALF * ALONG.y - BLOCK_HALF * NORMAL.y },
  { x: ORIGIN.x - BLOCK_HALF * ALONG.x - BLOCK_HALF * NORMAL.x, y: ORIGIN.y - BLOCK_HALF * ALONG.y - BLOCK_HALF * NORMAL.y },
  { x: ORIGIN.x - BLOCK_HALF * ALONG.x + BLOCK_HALF * NORMAL.x, y: ORIGIN.y - BLOCK_HALF * ALONG.y + BLOCK_HALF * NORMAL.y },
];
/** 轴向与斜向的箭头长度 */
const R_AXIS = 115;
const R_SLOPE = 145;

interface Direction {
  text: string;
  /** 箭头尖端 */
  tip: { x: number; y: number };
  color: string;
  anchor: ChartLabelAnchor;
  dx: number;
  dy: number;
}

const dirs: Direction[] = [
  {
    text: "水平向右",
    tip: { x: ORIGIN.x + R_AXIS, y: ORIGIN.y },
    color: "var(--c-accent-2)",
    anchor: "right",
    dx: 12,
    dy: 0,
  },
  {
    text: "水平向左",
    tip: { x: ORIGIN.x - R_AXIS, y: ORIGIN.y },
    color: "var(--c-accent-2)",
    anchor: "left",
    dx: -12,
    dy: 0,
  },
  {
    text: "竖直向上",
    tip: { x: ORIGIN.x, y: ORIGIN.y - R_AXIS },
    color: "var(--c-accent-2)",
    anchor: "center",
    dx: 0,
    dy: -26,
  },
  {
    text: "竖直向下",
    tip: { x: ORIGIN.x, y: ORIGIN.y + R_AXIS },
    color: "var(--c-accent-2)",
    anchor: "center",
    dx: 0,
    dy: 26,
  },
  {
    text: "沿斜面向上",
    tip: { x: ORIGIN.x + R_SLOPE * COS30, y: ORIGIN.y - R_SLOPE * SIN30 },
    color: "var(--c-accent)",
    anchor: "right",
    dx: 12,
    dy: -6,
  },
  {
    text: "沿斜面向下",
    tip: { x: ORIGIN.x - R_SLOPE * COS30, y: ORIGIN.y + R_SLOPE * SIN30 },
    color: "var(--c-accent)",
    anchor: "left",
    dx: -12,
    dy: 8,
  },
  {
    text: "垂直斜面向上",
    tip: { x: ORIGIN.x - R_SLOPE * SIN30, y: ORIGIN.y - R_SLOPE * COS30 },
    color: "var(--c-accent)",
    anchor: "left",
    dx: -12,
    dy: 0,
  },
  {
    text: "垂直斜面向下",
    tip: { x: ORIGIN.x + R_SLOPE * SIN30, y: ORIGIN.y + R_SLOPE * COS30 },
    color: "var(--c-accent)",
    anchor: "right",
    dx: 12,
    dy: 0,
  },
];

const pctX = (value: number): number => (value / VIEW.width) * 100;
const pctY = (value: number): number => (value / VIEW.height) * 100;
</script>

<template>
  <div class="figure relative min-w-0">
    <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
      <!-- 地面：斜线只画在表面下方 -->
      <SurfaceHatch :from="{ x: 10, y: GROUND_Y }" :to="{ x: VIEW.width - 10, y: GROUND_Y }" side="below" :thickness="13" :gap="30" />
      <polygon :points="`${BASE.x},${BASE.y} ${TOP.x},${TOP.y} ${TOP.x},${GROUND_Y}`" fill="var(--c-accent-2)" fill-opacity="0.07" stroke="none" />
      <line :x1="BASE.x" :y1="BASE.y" :x2="TOP.x" :y2="TOP.y" stroke="var(--c-text-dim)" stroke-width="2.4" />
      <line :x1="TOP.x" :y1="TOP.y" :x2="TOP.x" :y2="GROUND_Y" stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.55" />
      <!-- 物块：坐在斜面上，8 个方向从它的中心引出 -->
      <polygon :points="BLOCK_POINTS.map((p) => `${p.x},${p.y}`).join(' ')" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="2.2" />
      <CourseArrow v-for="dir in dirs" :key="dir.text" :from="ORIGIN" :to="dir.tip" :stroke="dir.color" stroke-width="3.2" pointer-events="none" />
      <circle :cx="ORIGIN.x" :cy="ORIGIN.y" r="4.5" fill="var(--c-text)" />
    </svg>
    <ChartLabel
      v-for="dir in dirs"
      :key="`label-${dir.text}`"
      :x-percent="pctX(dir.tip.x)"
      :y-percent="pctY(dir.tip.y)"
      :parts="[{ text: dir.text }]"
      :anchor="dir.anchor"
      :dx="dir.dx"
      :dy="dir.dy"
      :color="dir.color"
      halo
    />
  </div>
</template>
