<script setup lang="ts">
// 「速度偏角与位移偏角的关系」几何图（对应教材 5.4 图 5.4-1 的推广），用于 5.4「平抛运动的速度 / 位移」。
// 常显：x、y 轴，抛物线轨迹，落点 P，位移 OP 的虚线 s 与位移偏角 α，P 处速度 v（沿切线）与速度偏角 θ；
// showReverse 打开后：把速度方向反向延长交 x 轴于 M，作 P 到 x 轴的垂足 N，
// 并用一对等长标记说明 M 是 ON 的中点（tanθ = 2tanα 的几何来源）。图上不标任何数值刻度。
const { showReverse = false } = defineProps<{ showReverse?: boolean }>();

/** 坐标原点 O（抛出点） */
const origin = { x: 90, y: 70 };
/** 落点 P */
const pointP = { x: 520, y: 300 };
/** 轨迹：以 x 为参量的抛物线（与平抛 y ∝ x² 一致），起点 O、终点 P */
const midX = (origin.x + pointP.x) / 2;
const trail = `M ${origin.x} ${origin.y} Q ${midX} ${origin.y} ${pointP.x} ${pointP.y}`;
/** P 处切线方向（速度方向）的单位矢量 */
const tangLen = Math.hypot(pointP.x - midX, pointP.y - origin.y);
const dirX = (pointP.x - midX) / tangLen;
const dirY = (pointP.y - origin.y) / tangLen;
/** 速度箭头 */
const vTip = { x: pointP.x + 78 * dirX, y: pointP.y + 78 * dirY };
/** 速度偏角 θ 的圆弧 */
const thetaR = 62;
const thetaArc = `M ${pointP.x + thetaR} ${pointP.y} A ${thetaR} ${thetaR} 0 0 1 ${(pointP.x + thetaR * dirX).toFixed(1)} ${(pointP.y + thetaR * dirY).toFixed(1)}`;
/** 位移偏角 α 的圆弧（从 x 轴量到 OP） */
const opLen = Math.hypot(pointP.x - origin.x, pointP.y - origin.y);
const opX = (pointP.x - origin.x) / opLen;
const opY = (pointP.y - origin.y) / opLen;
const alphaR = 76;
const alphaArc = `M ${origin.x + alphaR} ${origin.y} A ${alphaR} ${alphaR} 0 0 1 ${(origin.x + alphaR * opX).toFixed(1)} ${(origin.y + alphaR * opY).toFixed(1)}`;
/** 速度反向延长线与 x 轴的交点 M（= ON 的中点），以及垂足 N */
const mPt = { x: pointP.x - ((pointP.y - origin.y) / dirY) * dirX, y: origin.y };
const nPt = { x: pointP.x, y: origin.y };
const tick1X = (origin.x + mPt.x) / 2;
const tick2X = (mPt.x + nPt.x) / 2;
</script>

<template>
  <div class="angle-geometry">
    <svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="速度偏角与位移偏角的几何关系图">
      <CourseArrow :from="origin" :to="{ x: 600, y: 70 }" stroke="rgba(148,163,184,0.6)" :stroke-width="1.8" />
      <CourseArrow :from="origin" :to="{ x: 90, y: 352 }" stroke="rgba(148,163,184,0.6)" :stroke-width="1.8" />
      <text x="606" y="80" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#94a3b8">x</text>
      <text x="78" y="350" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#94a3b8">y</text>
      <line :x1="origin.x" :y1="origin.y" :x2="pointP.x" :y2="pointP.y" stroke="#2dd4bf" stroke-width="2" stroke-dasharray="8 6" opacity="0.85" />
      <path :d="trail" fill="none" stroke="#e2a846" stroke-width="2.6" />
      <path :d="alphaArc" fill="none" stroke="#2dd4bf" stroke-width="1.8" />
      <line :x1="360" :y1="pointP.y" :x2="584" :y2="pointP.y" stroke="rgba(148,163,184,0.45)" stroke-width="1.4" stroke-dasharray="7 6" />
      <CourseArrow :from="pointP" :to="vTip" stroke="#f87171" :stroke-width="3.2" />
      <path :d="thetaArc" fill="none" stroke="#f87171" stroke-width="1.8" />
      <circle :cx="pointP.x" :cy="pointP.y" r="4.5" fill="#e2e8f0" />
      <circle :cx="origin.x" :cy="origin.y" r="4.5" fill="#e2e8f0" />
      <text :x="pointP.x + 14" :y="pointP.y - 12" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">P</text>
      <text :x="origin.x - 8" :y="origin.y - 12" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">O</text>
      <text x="248" y="132" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#2dd4bf">α</text>
      <text x="390" y="212" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#2dd4bf">s</text>
      <text :x="vTip.x + 10" :y="vTip.y - 8" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#f87171">v</text>
      <text x="510" y="345" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#f87171">θ</text>
      <g v-if="showReverse">
        <line :x1="pointP.x" :y1="pointP.y" :x2="mPt.x" :y2="mPt.y" stroke="rgba(148,163,184,0.55)" stroke-width="1.6" stroke-dasharray="7 6" />
        <line :x1="pointP.x" :y1="pointP.y" :x2="nPt.x" :y2="nPt.y" stroke="rgba(148,163,184,0.55)" stroke-width="1.6" stroke-dasharray="7 6" />
        <line :x1="tick1X" y1="58" :x2="tick1X" y2="82" stroke="#2dd4bf" stroke-width="2.2" />
        <line :x1="tick2X" y1="58" :x2="tick2X" y2="82" stroke="#2dd4bf" stroke-width="2.2" />
        <circle :cx="mPt.x" :cy="mPt.y" r="3.4" fill="#e2e8f0" />
        <circle :cx="nPt.x" :cy="nPt.y" r="3.4" fill="#e2e8f0" />
        <text :x="mPt.x" y="52" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#cbd5e1">M</text>
        <text :x="nPt.x" y="52" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#cbd5e1">N</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.angle-geometry {
  min-width: 0;
}

.angle-geometry svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
