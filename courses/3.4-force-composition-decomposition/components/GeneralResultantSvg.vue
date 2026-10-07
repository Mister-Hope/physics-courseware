<script setup lang="ts">
/**
 * 一般夹角下求合力：以 F₁ 的方向为 x 轴，把 F₂ 正交分解成 F₂cosθ、F₂sinθ， 两个方向分别合成后再用勾股合成——全程不用余弦定理。
 *
 * 作图是"首尾相接"的作法：F₂ 平移到 F₁ 的末端（虚线），从 origin 连到它的终点就是合力 F； origin—F₁—(F₁+F₂)—F₂ 是同一个平行四边形。 对角线终点**必须**是 origin + F₁ + F₂，否则合力的水平分量会退化成 F₁（踩过：把对角顶点写成 (tip1.x,
 * tip2.y)）。
 */
/** 视图框（用户单位，紧贴图形、去掉空白） */
const VIEW = { minX: 20, minY: 88, width: 380, height: 160 };
/** 共同起点 origin、两条力的大小（用户单位）、夹角、x 轴画到哪里 */
const origin = { x: 40, y: 215 };
const F1_LEN = 140;
const F2_LEN = 130;
const THETA = (45 * Math.PI) / 180;
const AXIS_END = 386;

/** F₂ 的矢量（屏幕坐标）、F₁ 的末端、F₂ 的末端 */
const vec2 = { x: F2_LEN * Math.cos(THETA), y: -F2_LEN * Math.sin(THETA) };
const tip1 = { x: origin.x + F1_LEN, y: origin.y };
const tip2 = { x: origin.x + vec2.x, y: origin.y + vec2.y };
/** 对角顶点＝origin + F₁ + F₂（F₂ 平移过去、与 F₁ 首尾相接后的终点） */
const corner = { x: tip1.x + vec2.x, y: tip1.y + vec2.y };
/** F₂ 的竖直分量落到 x 轴上的位置 */
const foot = { x: tip2.x, y: origin.y };
/** θ 圆弧与它的标注位置 */
const ARC_R = 45;
const arcEnd = { x: origin.x + ARC_R * Math.cos(THETA), y: origin.y - ARC_R * Math.sin(THETA) };
const thetaLabel = {
  x: origin.x + 62 * Math.cos(THETA / 2),
  y: origin.y - 62 * Math.sin(THETA / 2),
};

const pctX = (value: number): number => ((value - VIEW.minX) / VIEW.width) * 100;
const pctY = (value: number): number => ((value - VIEW.minY) / VIEW.height) * 100;
</script>

<template>
  <div class="gr-figure">
    <svg :viewBox="`${VIEW.minX} ${VIEW.minY} ${VIEW.width} ${VIEW.height}`">
      <!-- x 轴（以 F₁ 的方向为 x 轴） -->
      <line :x1="origin.x" :y1="origin.y" :x2="AXIS_END" :y2="origin.y" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="7 6" opacity="0.5" />
      <!-- F₂ 的竖直分量：从 F₂ 末端落到 x 轴 -->
      <line :x1="tip2.x" :y1="tip2.y" :x2="foot.x" :y2="foot.y" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.6" />
      <!-- 平移过去的 F₂（与 F₁ 首尾相接）与 F₁ 的平行线 -->
      <line :x1="tip1.x" :y1="tip1.y" :x2="corner.x" :y2="corner.y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.7" />
      <line :x1="tip2.x" :y1="tip2.y" :x2="corner.x" :y2="corner.y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.7" />
      <!-- θ 圆弧 -->
      <path
        :d="`M ${origin.x + ARC_R} ${origin.y} A ${ARC_R} ${ARC_R} 0 0 0 ${arcEnd.x} ${arcEnd.y}`"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="2"
      />
      <CourseArrow :from="origin" :to="tip1" stroke="var(--c-accent)" stroke-width="3.6" pointer-events="none" />
      <CourseArrow :from="origin" :to="tip2" stroke="var(--c-accent-2)" stroke-width="3.6" pointer-events="none" />
      <CourseArrow :from="origin" :to="corner" stroke="var(--c-physics)" stroke-width="3.8" pointer-events="none" />
    </svg>
    <ChartLabel
      :x-percent="pctX((origin.x + tip1.x) / 2)"
      :y-percent="pctY(origin.y)"
      :parts="[{ tex: 'F_1' }]"
      anchor="bottom-left"
      :dy="10"
      color="var(--c-accent)"
      halo
    />
    <ChartLabel
      :x-percent="pctX((tip1.x + corner.x) / 2)"
      :y-percent="pctY(origin.y)"
      :parts="[{ tex: 'F_2\\cos\\theta' }]"
      anchor="bottom-left"
      :dy="10"
      color="var(--c-text-dim)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tip2.x)"
      :y-percent="pctY(tip2.y)"
      :parts="[{ tex: 'F_2' }]"
      anchor="top-left"
      :dx="-6"
      :dy="-6"
      color="var(--c-accent-2)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(corner.x)"
      :y-percent="pctY(corner.y)"
      :parts="[{ tex: 'F' }]"
      anchor="top-right"
      :dx="4"
      :dy="-6"
      color="var(--c-physics)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(foot.x)"
      :y-percent="pctY((tip2.y + foot.y) / 2)"
      :parts="[{ tex: 'F_2\\sin\\theta' }]"
      anchor="right"
      :dx="8"
      color="var(--c-accent-2)"
      halo
    />
    <ChartLabel :x-percent="pctX(thetaLabel.x)" :y-percent="pctY(thetaLabel.y)" :parts="[{ tex: '\\theta' }]" color="var(--c-accent-2)" />
    <ChartLabel :x-percent="pctX(AXIS_END)" :y-percent="pctY(origin.y)" :parts="[{ tex: 'x' }]" anchor="left" :dx="-10" color="var(--c-text-dim)" />
  </div>
</template>

<style scoped>
.gr-figure {
  position: relative;
  min-width: 0;
}

.gr-figure svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
