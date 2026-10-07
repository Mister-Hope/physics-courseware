<script setup lang="ts">
// 教材例题 1（从 10 m 高的平台边缘水平抛出）的题目图，用于 5.4「平抛运动的速度」。
// 干净状态只有题干元素：平台、抛出点 O、题目已给的初速度 v0、平台高度 h、地面、落点 P；
// showDecomp 打开后才在落点 P 处画落地速度的分解 vx、vy、v 与夹角 θ（不画轨迹，轨迹留给页面文字）。
// 说明：下标单独用一个 <text> 写（不用 <tspan>）——格式化工具会把带 <tspan> 的文字断成多行，
// 行间空白会在 SVG 里渲染成 "v 0" 这样的空隙。
const { showDecomp = false } = defineProps<{ showDecomp?: boolean }>();

/** 地面线高度，也是落点 P 所在位置 */
const GROUND_Y = 330;
/** 抛出点 O：平台顶面右端 */
const origin = { x: 200, y: 90 };
/** 落点 P */
const pointP = { x: 470, y: GROUND_Y };
/** 高度 h 的竖向尺寸线位置 */
const DIM_X = 48;
/** 落地速度两个分量的作图长度：vx 沿地面向右，vy 竖直向下 */
const VX = 74;
const VY = 46;
/** 两个分速度标注的落点（vx 在水平箭头旁、vy 在竖直箭头左侧） */
const lblVx = { x: pointP.x + 34, y: GROUND_Y - 16 };
const lblVy = { x: pointP.x - 14, y: GROUND_Y + 30 };
/** 合速度与水平方向夹角 θ 的圆弧（从地面水平方向量起，顺时针到 v） */
const thetaR = 34;
const hyp = Math.hypot(VX, VY);
const thetaArc = `M ${pointP.x + thetaR} ${GROUND_Y} A ${thetaR} ${thetaR} 0 0 1 ${(pointP.x + (thetaR * VX) / hyp).toFixed(1)} ${(GROUND_Y + (thetaR * VY) / hyp).toFixed(1)}`;
</script>

<template>
  <div class="example1">
    <svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="平台上水平抛出物体的题目图">
      <rect x="90" y="90" width="110" :height="GROUND_Y - 90" rx="4" fill="rgba(148,163,184,0.16)" stroke="rgba(148,163,184,0.55)" stroke-width="1.8" />
      <SurfaceHatch :from="{ x: 60, y: GROUND_Y }" :to="{ x: 600, y: GROUND_Y }" side="below" :thickness="13" />
      <line :x1="DIM_X" y1="90" :x2="DIM_X" :y2="GROUND_Y" stroke="#e2a846" stroke-width="1.6" />
      <line :x1="DIM_X - 10" y1="90" :x2="DIM_X + 10" y2="90" stroke="#e2a846" stroke-width="1.6" />
      <line :x1="DIM_X - 10" :y1="GROUND_Y" :x2="DIM_X + 10" :y2="GROUND_Y" stroke="#e2a846" stroke-width="1.6" />
      <text x="30" y="214" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2a846">h</text>
      <CourseArrow :from="origin" :to="{ x: 360, y: 90 }" stroke="#e2a846" :stroke-width="3" />
      <text x="252" y="74" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2a846">v</text>
      <text x="263" y="78" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">0</text>
      <circle :cx="origin.x" :cy="origin.y" r="4.5" fill="#e2e8f0" />
      <text :x="origin.x - 10" :y="origin.y - 14" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2e8f0">O</text>
      <circle :cx="pointP.x" :cy="pointP.y" r="4.5" fill="#e2e8f0" />
      <text :x="pointP.x - 14" :y="pointP.y - 14" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2e8f0">P</text>
      <g v-if="showDecomp">
        <CourseArrow :from="pointP" :to="{ x: pointP.x + VX, y: GROUND_Y }" stroke="#60a5fa" :stroke-width="3" />
        <CourseArrow :from="pointP" :to="{ x: pointP.x, y: GROUND_Y + VY }" stroke="#2dd4bf" :stroke-width="3" />
        <CourseArrow :from="pointP" :to="{ x: pointP.x + VX, y: GROUND_Y + VY }" stroke="#f87171" :stroke-width="3.4" />
        <path :d="thetaArc" fill="none" stroke="#f87171" stroke-width="1.8" />
        <text :x="lblVx.x" :y="lblVx.y" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#60a5fa">v</text>
        <text :x="lblVx.x + 1" :y="lblVx.y + 4" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#60a5fa">x</text>
        <text :x="lblVy.x" :y="lblVy.y" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#2dd4bf">v</text>
        <text :x="lblVy.x + 1" :y="lblVy.y + 4" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#2dd4bf">y</text>
        <text :x="pointP.x + VX + 8" :y="GROUND_Y + VY - 10" text-anchor="start" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#f87171">
          v
        </text>
        <text x="510" y="347" text-anchor="start" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#f87171">θ</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.example1 {
  min-width: 0;
}

.example1 svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
