<!--
  选必2 1.x《复合场中的配速法与摆线运动》第 4 页「平抛运动给我们的启示」的配图。
  一条平抛抛物线，按等时间间隔点出 5 个位置（横向间距相等 = 水平匀速；纵向间距越来越大 = 竖直加速）。
  · step ≥ 1：在第 3 个点上做正交分解 —— v_x（金）、v_y（蓝）、真实速度 v（白）；
  · step ≥ 2：每个位置都画出同样长短的 v_x，并在竖直方向标 F_y = mg、水平方向标 F_x = 0，
    一眼看出「水平分速度处处一样」。
  抛物线用 y = ½gt² 的真实比例：x(t) = x₀ + v₀t、y(t) = y₀ + 14t²，等间隔 t = 0,1,2,3,4。
-->
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  /** 当前点击步（0 = 只有轨迹与等时间间隔点） */
  step?: number;
}>();

const step = computed(() => props.step ?? 0);

const W = 700;
const H = 300;
/** 等时间间隔的采样点：t = 0…4 */
const X0 = 72;
const Y0 = 46;
const DX = 108;
const DY = 13.6;
/** V_x 箭头的长度（各点相同）、v_y / v 的对应长度 */
const VX = 92;
const pointAt = (t: number): { x: number; y: number } => ({
  x: X0 + DX * t,
  y: Y0 + DY * t * t,
});
/** 第 3 个点（t = 2）上做速度分解 */
const P2 = pointAt(2);
/** 抛物线的连续路径（t 从 0 到 4 采样 64 段） */
const curveD = computed(() => {
  let d = "";

  for (let i = 0; i <= 64; i++) {
    const p = pointAt((i / 64) * 4);

    d += `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }

  return d.trim();
});
const dots = [0, 1, 2, 3, 4].map(pointAt);
/** T = 2 处的速度分量：v_y ∝ 2·DY·t = 54.4，按同一比例放大到 VX 于水平分量 */
const VY = (VX / DX) * (2 * DY * 2);
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.5, "paint-order": "stroke" };
</script>

<template>
  <div class="pr">
    <svg :viewBox="`0 0 ${W} ${H}`" class="pr-svg">
      <path :d="curveD" fill="none" stroke="var(--c-text-dim)" :stroke-width="2.4" opacity="0.9" />
      <circle
        v-for="(d, i) in dots"
        :key="i"
        :cx="d.x"
        :cy="d.y"
        r="5"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        :stroke-width="2"
      />
      <g v-if="step >= 2">
        <CourseArrow
          v-for="(d, i) in dots"
          :key="`vx-${i}`"
          :from="{ x: d.x, y: d.y }"
          :to="{ x: d.x + VX, y: d.y }"
          stroke="var(--c-accent)"
          :stroke-width="2.4"
          :head-size="8"
          :opacity="i === 0 ? 1 : 0.55"
        />
        <text
          :x="dots[0].x + VX / 2"
          :y="dots[0].y + 20"
          font-size="15"
          fill="var(--c-accent)"
          text-anchor="middle"
          :style="HALO"
        >
          <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
          <tspan font-family="KaTeX_Main" font-size="11" dy="4">0</tspan>
          <tspan font-family="KaTeX_Main">（不变）</tspan>
        </text>
      </g>
      <g v-if="step >= 1">
        <CourseArrow
          :from="P2"
          :to="{ x: P2.x + VX, y: P2.y }"
          stroke="var(--c-accent)"
          :stroke-width="2.8"
        />
        <CourseArrow
          :from="P2"
          :to="{ x: P2.x, y: P2.y + VY }"
          stroke="#60a5fa"
          :stroke-width="2.8"
        />
        <CourseArrow
          :from="P2"
          :to="{ x: P2.x + VX, y: P2.y + VY }"
          stroke="var(--c-text)"
          :stroke-width="2.6"
        />
        <text
          :x="P2.x + VX / 2 - 6"
          :y="P2.y + 22"
          font-size="16"
          text-anchor="middle"
          :style="HALO"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          v
          <tspan font-family="KaTeX_Main" font-size="11" dy="4">x</tspan>
        </text>
        <text
          :x="P2.x - 12"
          :y="P2.y + VY / 2 + 6"
          font-size="16"
          text-anchor="end"
          fill="#60a5fa"
          :style="HALO"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          v
          <tspan font-family="KaTeX_Main" font-size="11" dy="4">y</tspan>
        </text>
        <text
          :x="P2.x + VX / 2 + 14"
          :y="P2.y + VY / 2"
          font-size="17"
          :style="HALO"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          v
        </text>
      </g>
      <g v-if="step >= 2" font-size="16" :style="HALO">
        <path :d="`M ${dots[4].x + 26} ${dots[4].y} h 18`" stroke="#60a5fa" :stroke-width="2.4" />
        <text :x="dots[4].x + 50" :y="dots[4].y + 6" fill="#60a5fa">
          <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
          <tspan font-family="KaTeX_Main" font-size="11" dy="4">y</tspan>
          <tspan font-family="KaTeX_Main">=</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic">mg</tspan>
        </text>
        <text :x="X0 - 34" :y="Y0 - 22" fill="var(--c-accent)">
          <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
          <tspan font-family="KaTeX_Main" font-size="11" dy="4">x</tspan>
          <tspan font-family="KaTeX_Main">= 0</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.pr {
  width: 100%;
}

.pr-svg {
  display: block;
  width: 100%;
  max-width: 640px;
  height: auto;
  margin: 0 auto;
}
</style>
