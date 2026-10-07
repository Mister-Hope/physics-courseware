<script setup lang="ts">
// 斜抛的初速度分解图，用于 5.4「一般的抛体运动」：把斜向右上的 v0 分解到水平与竖直两个方向。
// 常显：斜向 v0、它的两个分量 v0x / v0y、补齐矩形的两条浅色虚线、过 O 的水平参考线、夹角 θ。
// 图上不标任何数值（角度与大小都由符号表示）。
// 说明：下标单独用一个 <text> 跟着写（不用 <tspan>）——格式化工具会把带 <tspan> 的文字断成多行，
// 行间空白会在 SVG 里渲染成 "v 0" 这样的空隙。
/** 抛出点 O */
const origin = { x: 90, y: 250 };
/** 斜向初速度的末端（也是矩形的对角顶点） */
const vTip = { x: 400, y: 80 };
/** 水平分量末端 */
const xTip = { x: 400, y: 250 };
/** 竖直分量末端 */
const yTip = { x: 90, y: 80 };
/** 初速度与水平方向的夹角 θ 的圆弧（从水平方向逆时针量到 v0） */
const thetaR = 54;
const thetaLen = Math.hypot(vTip.x - origin.x, vTip.y - origin.y);
const thetaArc = `M ${origin.x + thetaR} ${origin.y} A ${thetaR} ${thetaR} 0 0 0 ${(origin.x + (thetaR * (vTip.x - origin.x)) / thetaLen).toFixed(1)} ${(origin.y + (thetaR * (vTip.y - origin.y)) / thetaLen).toFixed(1)}`;
</script>

<template>
  <div class="oblique-decompose">
    <svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="斜抛初速度的分解图">
      <line :x1="origin.x" :y1="origin.y" x2="470" :y2="origin.y" stroke="rgba(148,163,184,0.45)" stroke-width="1.4" />
      <line :x1="xTip.x" :y1="xTip.y" :x2="yTip.x" :y2="yTip.y" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" stroke-dasharray="7 6" />
      <line :x1="yTip.x" :y1="yTip.y" :x2="xTip.x" :y2="xTip.y" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" stroke-dasharray="7 6" />
      <CourseArrow :from="origin" :to="vTip" stroke="#e2a846" :stroke-width="3.2" />
      <CourseArrow :from="origin" :to="xTip" stroke="#60a5fa" :stroke-width="3" />
      <CourseArrow :from="origin" :to="yTip" stroke="#2dd4bf" :stroke-width="3" />
      <path :d="thetaArc" fill="none" stroke="#e2a846" stroke-width="1.8" />
      <circle :cx="origin.x" :cy="origin.y" r="4.5" fill="#e2e8f0" />
      <text x="236" y="150" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2a846">v</text>
      <text x="237" y="154" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">0</text>
      <text x="228" y="274" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#60a5fa">v</text>
      <text x="229" y="278" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#60a5fa">0x</text>
      <text x="76" y="170" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#2dd4bf">v</text>
      <text x="77" y="174" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#2dd4bf">0y</text>
      <text x="166" y="238" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2a846">θ</text>
      <text x="74" y="276" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">O</text>
    </svg>
  </div>
</template>

<style scoped>
.oblique-decompose {
  min-width: 0;
}

.oblique-decompose svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
