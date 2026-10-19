<script setup lang="ts">
/**
 * 第 11 页（例题 2）：等边三角形三个顶点上的点电荷，$q_3$ 所受静电力的合成。
 *
 * **常显（干净题目图，无箭头）**：等边三角形 + 三个带正电的小球 + 边长 $a = 50\ \text{cm}$。 `showForces` → $q_3$ 受到的两个斥力 $F_1$、$F_2$（从 $q_3$ 的**几何中心**出发、沿两条边向外，等长、夹角 $60^\circ$）；
 * `showParallelogram` → 平行四边形辅助虚线； `showResultant` → 合力 $F$（沿 $q_1$、$q_2$ 连线的垂直平分线向外）+ 半角 $30^\circ$ 标注。
 *
 * 尺寸：`#fig` 按 `width: max-content` 排版，⛔ 根 `<svg>` 必须给固有 `width`/`height`，否则图栏塌成 0。
 */
const {
  showForces = false,
  showParallelogram = false,
  showResultant = false,
} = defineProps<{
  showForces?: boolean;
  showParallelogram?: boolean;
  showResultant?: boolean;
}>();

const VB_W = 480;
const VB_H = 450;
const R = 18;

/** 等边三角形：q₁ 左下、q₂ 右下、q₃ 顶点（边长 240 用户单位） */
const Q1 = { x: 120, y: 380 };
const Q2 = { x: 360, y: 380 };
const Q3 = { x: 240, y: 172 };

/** 分力箭头长度；两个分力等长、与竖直方向各成 30°（合起来夹角 60°） */
const L = 80;
const SIN30 = 0.5;
const COS30 = 0.866;
const f1Tip = { x: Q3.x + L * SIN30, y: Q3.y - L * COS30 };
const f2Tip = { x: Q3.x - L * SIN30, y: Q3.y - L * COS30 };
/** 合力按平行四边形定则取真实长度：2L·cos30° */
const fTip = { x: Q3.x, y: Q3.y - 2 * L * COS30 };

const pct = (x: number, y: number) => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});
</script>

<template>
  <div class="ecf-host">
    <svg width="300" height="281" viewBox="0 0 480 450" xmlns="http://www.w3.org/2000/svg">
      <line :x1="Q1.x" :y1="Q1.y" :x2="Q2.x" :y2="Q2.y" stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.85" />
      <line :x1="Q1.x" :y1="Q1.y" :x2="Q3.x" :y2="Q3.y" stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.85" />
      <line :x1="Q2.x" :y1="Q2.y" :x2="Q3.x" :y2="Q3.y" stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.85" />
      <line :x1="Q1.x" y1="406" :x2="Q2.x" y2="406" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" />
      <line :x1="Q1.x" y1="398" :x2="Q1.x" y2="414" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line :x1="Q2.x" y1="398" :x2="Q2.x" y2="414" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <circle :cx="Q1.x" :cy="Q1.y" :r="R" fill="var(--c-danger)" fill-opacity="0.85" />
      <circle :cx="Q2.x" :cy="Q2.y" :r="R" fill="var(--c-danger)" fill-opacity="0.85" />
      <circle :cx="Q3.x" :cy="Q3.y" :r="R" fill="var(--c-danger)" fill-opacity="0.85" />
      <g v-if="showForces">
        <CourseArrow :from="Q3" :to="f1Tip" stroke="var(--c-force)" stroke-width="3" />
        <CourseArrow :from="Q3" :to="f2Tip" stroke="var(--c-force)" stroke-width="3" />
      </g>
      <g v-if="showParallelogram">
        <line :x1="f1Tip.x" :y1="f1Tip.y" :x2="fTip.x" :y2="fTip.y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
        <line :x1="f2Tip.x" :y1="f2Tip.y" :x2="fTip.x" :y2="fTip.y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
      </g>
      <g v-if="showResultant">
        <CourseArrow :from="Q3" :to="fTip" stroke="var(--c-accent)" stroke-width="3.6" />
        <path d="M 240 138 A 34 34 0 0 1 257 142.6" fill="none" stroke="var(--c-accent)" stroke-width="1.6" />
      </g>
      <!-- 电荷记号必须最后画：三支箭头都从 $q_3$ 的几何中心出发，合力更是一根竖直箭杆，
           若先画 "+" 会被吃掉竖笔、看起来像 "−"（正电被读成负电）。几何与尺寸一概不动。 -->
      <text :x="Q1.x" :y="Q1.y + 1" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="18" fill="#0c1122">+</text>
      <text :x="Q2.x" :y="Q2.y + 1" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="18" fill="#0c1122">+</text>
      <text :x="Q3.x" :y="Q3.y + 1" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="18" fill="#0c1122">+</text>
    </svg>
    <ChartLabel v-bind="pct(Q1.x, 352)" :parts="[{ tex: 'q_1' }]" :size="17" color="var(--c-accent)" halo />
    <ChartLabel v-bind="pct(Q2.x, 352)" :parts="[{ tex: 'q_2' }]" :size="17" color="var(--c-accent)" halo />
    <ChartLabel v-bind="pct(Q3.x, 134)" :parts="[{ tex: 'q_3' }]" :size="17" color="var(--c-accent)" halo />
    <ChartLabel v-bind="pct((Q1.x + Q2.x) / 2, 430)" :parts="[{ tex: 'a = 50\\ \\text{cm}' }]" :size="17" color="var(--c-text-dim)" />
    <ChartLabel v-bind="pct(f1Tip.x, f1Tip.y)" :parts="[{ tex: 'F_1' }]" :visible="showForces" anchor="left" :dx="12" :size="18" color="var(--c-force)" halo />
    <ChartLabel
      v-bind="pct(f2Tip.x, f2Tip.y)"
      :parts="[{ tex: 'F_2' }]"
      :visible="showForces"
      anchor="right"
      :dx="-12"
      :size="18"
      color="var(--c-force)"
      halo
    />
    <ChartLabel v-bind="pct(fTip.x, fTip.y)" :parts="[{ tex: 'F' }]" :visible="showResultant" :dx="18" :dy="-8" :size="18" color="var(--c-accent)" halo />
    <ChartLabel v-bind="pct(256, 110)" :parts="[{ tex: '30^\\circ' }]" :visible="showResultant" :size="15" color="var(--c-accent)" halo />
  </div>
</template>

<style scoped>
/* `exercise-split` 的 `#fig` 是 width: max-content ⇒ 必须给固有尺寸，否则整张图静默消失 */
.ecf-host {
  position: relative;
  width: 300px;
  height: 281px;
}

.ecf-host > svg {
  display: block;
}
</style>
