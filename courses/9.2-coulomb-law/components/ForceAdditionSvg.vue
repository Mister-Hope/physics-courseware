<script setup lang="ts">
/**
 * 第 10 页：静电力的叠加（9-text.md 行 164、166）
 *
 * 点电荷 q 同时受到两个同种点电荷 q₁、q₂ 的斥力 F₁、F₂（两力等长、夹角 60°），
 * 按平行四边形定则合成得到合力 F = 2F₁cos30°（与例题 2 的几何完全同构）。
 * 三个力都从 q 的几何中心出发；线段长度按矢量合成的真实比例（对角线长度 = 合力大小）。
 */
const { showForces = false, showParallelogram = false, showResultant = false } = defineProps<{
  showForces?: boolean;
  showParallelogram?: boolean;
  showResultant?: boolean;
}>();

const VB_W = 520;
const VB_H = 320;

const Q = { x: 260, y: 140 };
const Q1 = { x: 170, y: 296 };
const Q2 = { x: 350, y: 296 };

/** 每个分力的长度（用户单位） */
const L = 56;
/** 两个斥力的方向：与竖直方向各成 30°（合起来 60°） */
const SIN30 = 0.5;
const COS30 = 0.866;

const f1Tip = { x: Q.x + L * SIN30, y: Q.y - L * COS30 };
const f2Tip = { x: Q.x - L * SIN30, y: Q.y - L * COS30 };
const fTip = { x: Q.x, y: Q.y - 2 * L * COS30 };

const pct = (x: number, y: number) => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});
</script>

<template>
  <div class="fa-host">
    <svg viewBox="0 0 520 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <circle :cx="Q1.x" :cy="Q1.y" r="15" fill="var(--c-danger)" fill-opacity="0.85" />
      <text
        :x="Q1.x"
        :y="Q1.y + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="17"
        fill="#0c1122"
      >
        +
      </text>
      <circle :cx="Q2.x" :cy="Q2.y" r="15" fill="var(--c-danger)" fill-opacity="0.85" />
      <text
        :x="Q2.x"
        :y="Q2.y + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="17"
        fill="#0c1122"
      >
        +
      </text>
      <circle :cx="Q.x" :cy="Q.y" r="15" fill="var(--c-danger)" fill-opacity="0.85" />
      <text
        :x="Q.x"
        :y="Q.y + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="17"
        fill="#0c1122"
      >
        +
      </text>
      <g v-if="showForces">
        <CourseArrow :from="Q" :to="f1Tip" stroke="var(--c-force)" stroke-width="3" />
        <CourseArrow :from="Q" :to="f2Tip" stroke="var(--c-force)" stroke-width="3" />
      </g>
      <g v-if="showParallelogram">
        <line :x1="f1Tip.x" :y1="f1Tip.y" :x2="fTip.x" :y2="fTip.y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
        <line :x1="f2Tip.x" :y1="f2Tip.y" :x2="fTip.x" :y2="fTip.y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
      </g>
      <g v-if="showResultant">
        <path d="M 260 110 A 30 30 0 0 1 275 114" fill="none" stroke="var(--c-accent)" stroke-width="1.6" />
        <CourseArrow :from="Q" :to="fTip" stroke="var(--c-accent)" stroke-width="3.6" />
      </g>
    </svg>
    <ChartLabel v-bind="pct(Q1.x, Q1.y)" :parts="[{ tex: 'q_1' }]" anchor="right" :dx="-18" :size="18" color="var(--c-accent)" />
    <ChartLabel v-bind="pct(Q2.x, Q2.y)" :parts="[{ tex: 'q_2' }]" anchor="left" :dx="18" :size="18" color="var(--c-accent)" />
    <ChartLabel v-bind="pct(Q.x, Q.y)" :parts="[{ tex: 'q' }]" anchor="right" :dx="-18" :size="18" color="var(--c-accent)" />
    <ChartLabel
      v-bind="pct(f1Tip.x, f1Tip.y)"
      :parts="[{ tex: 'F_1' }]"
      :visible="showForces"
      anchor="left"
      :dx="12"
      :size="18"
      color="var(--c-force)"
      halo
    />
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
    <ChartLabel
      v-bind="pct(fTip.x, fTip.y)"
      :parts="[{ tex: 'F' }]"
      :visible="showResultant"
      :dy="-16"
      :size="18"
      color="var(--c-accent)"
      halo
    />
    <ChartLabel
      v-bind="pct(296, 112)"
      :parts="[{ tex: '30^\\circ' }]"
      :visible="showResultant"
      :size="16"
      color="var(--c-accent)"
      halo
    />
  </div>
</template>

<style scoped>
.fa-host {
  position: relative;
  width: 100%;
}

.fa-host > svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
