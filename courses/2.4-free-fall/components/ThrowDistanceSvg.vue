<script setup lang="ts">
import { computed } from "vue";

/**
 * 例题「什么时候离抛出点 15 m」的示意图。
 *
 * 竖直上抛本来没有横向运动，这里**故意画成一条很细的抛物线**——让"先上升到最高点、再落下来"一眼看得出来。 水平方向只是按时间均匀铺开（纯画法，不是真的斜抛），竖直方向按真实高度画：h = v₀t − ½gt²（向上为正， v₀ = 20 m/s、g = 10 m/s²）。
 *
 * 图上要看清的三件事：抛出点 O 在 h = 0；**最高点在 h = 20 m（t = 2 s），比那两个 15 m 处都高**； O 上方 15 m 处，球上升途中（t = 1 s）与下落途中（t = 3 s）各经过一次；O 下方 15 m 处只在 t = 2 + √7 s 经过一次。
 */

/** 题目给定的抛出速度与重力加速度 */
const V_ZERO = 20;
const GRAVITY = 10;
/** 落到抛出点下方 15 m 的时刻 2 + √7（s）——轨迹就画到这里 */
const T_END = 2 + Math.sqrt(7);
/** 高度 → 画布：1 m 画成 6.8 个用户单位 */
const SCALE_Y = 6.8;
/** 抛出点画在 y = 172；轨迹起点 x = 150、按时间均匀铺开共占 62 宽（很细的一条抛物线） */
const ZERO_Y = 172;
const START_X = 150;
const SPAN_X = 62;
/** 尺寸箭头所在竖线，以及三条高度辅助线的横向范围 */
const RULE_X = 118;
const LEVEL_LEFT = 112;
const LEVEL_RIGHT = 218;
/** 上方 15 m、下方 15 m 两个高度，与两个尺寸箭头的中点 */
const LEVEL_UP_Y = Math.round(ZERO_Y - 15 * SCALE_Y);
const LEVEL_DOWN_Y = Math.round(ZERO_Y + 15 * SCALE_Y);
const UP_MID = Math.round((LEVEL_UP_Y + ZERO_Y) / 2);
const DOWN_MID = Math.round((ZERO_Y + LEVEL_DOWN_Y) / 2);

/**
 * T 时刻的高度：h = v₀t − ½gt²（向上为正，m）
 *
 * @param time 时间（s）
 * @returns 相对抛出点的高度（m，向下为负）
 */
const heightAt = (time: number): number => V_ZERO * time - 0.5 * GRAVITY * time * time;

/**
 * T 时刻在画布上的位置：横向按时间均匀铺开，纵向按真实高度
 *
 * @param time 时间（s）
 * @returns 画布坐标
 */
const pointAtTime = (time: number): { x: number; y: number } => ({
  x: Math.round((START_X + (time / T_END) * SPAN_X) * 10) / 10,
  y: Math.round((ZERO_Y - heightAt(time) * SCALE_Y) * 10) / 10,
});

/** 整条轨迹（从抛出到落到抛出点下方 15 m） */
const trajectory = computed(() => {
  const points: string[] = [];

  for (let index = 0; index <= 48; index += 1) {
    const { x, y } = pointAtTime((T_END * index) / 48);

    points.push(`${x},${y}`);
  }

  return `M ${points.join(" L ")}`;
});

/** 抛出点 O（t = 0） */
const throwPoint = pointAtTime(0);
/** 最高点（t = 2 s、20 m） */
const topPoint = pointAtTime(2);
/** 上升途中经过 15 m 处（t = 1 s） */
const risePoint = pointAtTime(1);
/** 下落途中经过 15 m 处（t = 3 s） */
const fallPoint = pointAtTime(3);
/** 抛出点下方 15 m 处（t = 2 + √7 s） */
const lowPoint = pointAtTime(T_END);
</script>

<template>
  <!-- 例题页：把上抛轨迹画成细长抛物线——最高点（20 m）在上方两个 15 m 处之上 -->
  <svg
    viewBox="0 0 360 340"
    role="img"
    aria-label="竖直上抛轨迹示意图：最高点 20 米；抛出点上方 15 米处球经过两次（t 为 1 秒与 3 秒），下方 15 米处经过一次（t 为 2 加根号 7 秒）"
  >
    <g stroke="rgba(148,163,184,0.3)" stroke-width="1" stroke-dasharray="5 5">
      <line :x1="LEVEL_LEFT" :y1="LEVEL_UP_Y" :x2="LEVEL_RIGHT" :y2="LEVEL_UP_Y" />
      <line :x1="LEVEL_LEFT" :y1="ZERO_Y" :x2="LEVEL_RIGHT" :y2="ZERO_Y" />
      <line :x1="LEVEL_LEFT" :y1="LEVEL_DOWN_Y" :x2="LEVEL_RIGHT" :y2="LEVEL_DOWN_Y" />
    </g>
    <CourseArrow :from="{ x: RULE_X, y: UP_MID }" :to="{ x: RULE_X, y: LEVEL_UP_Y }" stroke="#94a3b8" stroke-width="2" />
    <CourseArrow :from="{ x: RULE_X, y: UP_MID }" :to="{ x: RULE_X, y: ZERO_Y }" stroke="#94a3b8" stroke-width="2" />
    <CourseArrow :from="{ x: RULE_X, y: DOWN_MID }" :to="{ x: RULE_X, y: ZERO_Y }" stroke="#94a3b8" stroke-width="2" />
    <CourseArrow :from="{ x: RULE_X, y: DOWN_MID }" :to="{ x: RULE_X, y: LEVEL_DOWN_Y }" stroke="#94a3b8" stroke-width="2" />
    <path :d="trajectory" fill="none" stroke="#e2a846" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
    <circle :cx="throwPoint.x" :cy="throwPoint.y" r="8" fill="#e2a846" />
    <circle :cx="topPoint.x" :cy="topPoint.y" r="5" fill="#e2a846" />
    <circle :cx="risePoint.x" :cy="risePoint.y" r="5" fill="#60a5fa" />
    <circle :cx="fallPoint.x" :cy="fallPoint.y" r="5" fill="#2dd4bf" />
    <circle :cx="lowPoint.x" :cy="lowPoint.y" r="5" fill="#2dd4bf" />
    <text :x="topPoint.x" :y="topPoint.y - 10" text-anchor="middle" fill="#e2a846" font-size="16" class="tds-halo">
      <tspan>最高点</tspan>
      <tspan font-family="KaTeX_Main">20 m</tspan>
    </text>
    <text :x="risePoint.x - 8" :y="risePoint.y - 8" text-anchor="end" fill="#60a5fa" font-size="15" class="tds-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
      <tspan font-family="KaTeX_Main">= 1 s</tspan>
      <tspan font-size="14">（上升）</tspan>
    </text>
    <text :x="fallPoint.x + 10" :y="fallPoint.y - 8" fill="#2dd4bf" font-size="15" class="tds-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
      <tspan font-family="KaTeX_Main">= 3 s</tspan>
      <tspan font-size="14">（下落）</tspan>
    </text>
    <text :x="lowPoint.x + 12" :y="lowPoint.y + 2" fill="#2dd4bf" font-size="15" class="tds-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
      <tspan font-family="KaTeX_Main">= 2 + √7 s</tspan>
    </text>
    <text :x="lowPoint.x + 12" :y="lowPoint.y + 26" fill="#2dd4bf" font-size="14" class="tds-halo">（抛出点下方 15 m）</text>
    <text :x="RULE_X - 12" :y="UP_MID + 6" text-anchor="end" fill="#94a3b8" font-size="17" font-family="KaTeX_Main" class="tds-halo">15 m</text>
    <text :x="RULE_X - 12" :y="DOWN_MID + 6" text-anchor="end" fill="#94a3b8" font-size="17" font-family="KaTeX_Main" class="tds-halo">15 m</text>
    <text :x="throwPoint.x - 16" :y="throwPoint.y + 30" text-anchor="end" fill="#e2a846" font-size="17" class="tds-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">O</tspan>
      <tspan font-size="15">（抛出点）</tspan>
    </text>
  </svg>
</template>

<style scoped>
/* 图上文字压在轨迹/辅助线上时加描边光晕 */
.tds-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.4px;
}
</style>
