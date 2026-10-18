<script setup lang="ts">
import { computed } from "vue";

/**
 * 例题图（860×280，横向拉长压高度）：绳的一端固定在**运动方向前方的墙**上（这一段绳**靠下**，走 y=248）， 绕过**挂在物体右侧外面**的滑轮——物体右侧伸出一截**短连杆**接住滑轮轴，滑轮**不压在物体里**； 另一端用手以 F 拉着（这一段绳**靠上**）。
 *
 * - Slanted = false：两段绳都水平，物体前进 L 时绳头前进 2L ⇒ W = 2FL
 * - Slanted = true：手这段绳与水平成 α 角。两段绳拉力的夹角就是 α，合力 F合 = 2Fcos(α/2)、 方向与水平成 α/2 ⇒ W = 2FLcos²(α/2) = FL(1 + cos α)；绳头位移＝L 与 L 的平行四边形对角线 2Lcos(α/2)。 分步：页面传
 *   `:step="$clicks"`。力 F 与角 α 是题干量（常显），位移 / 合力 / 平行四边形点击后才出。
 */
const { slanted = false, step = 0 } = defineProps<{
  slanted?: boolean;
  /** 当前点击步数（页面传 $clicks） */
  step?: number;
}>();

const ALPHA = (40 * Math.PI) / 180; // 斜拉时"手这段绳"与水平方向的夹角
const OBJECT = { x1: 150, x2: 320, y1: 170, y2: 280 }; // 物体
const LINK = { from: 320, to: 348 }; // 物体右侧伸出的短连杆
const P = { x: 372, y: 224, r: 24 }; // 滑轮：挂在物体右侧外面
const ROPE2 = 210; // 手这段绳的长度
const F_LEN = 80; // 单个拉力的箭头长度
const L_LEN = 60; // 图上"物体位移 L"的长度（绳头位移＝2L）

const ang = computed(() => (slanted ? ALPHA : 0));
/** 手这段绳的方向（指向手） */
const uOut = computed(() => ({ x: Math.cos(ang.value), y: -Math.sin(ang.value) }));
/** 下方切点（通向墙上的固定点，靠下） */
const lowT = { x: P.x, y: P.y + P.r };
/** 上方出绳切点：n̂ = (sin α, −cos α) */
const outT = computed(() => ({ x: P.x + P.r * Math.sin(ang.value), y: P.y - P.r * Math.cos(ang.value) }));
/** 绳头（手的位置） */
const hand = computed(() => ({ x: outT.value.x + ROPE2 * uOut.value.x, y: outT.value.y + ROPE2 * uOut.value.y }));
/** 手拉绳的力 F：沿绳向外 */
const fTip = computed(() => ({ x: hand.value.x + F_LEN * uOut.value.x, y: hand.value.y + F_LEN * uOut.value.y }));
/** 绳在滑轮上的包角折线：从下方切点绕右侧到上方出绳切点 */
const wrapPath = computed(() => {
  const t0 = Math.PI / 2;
  const t1 = Math.atan2(-Math.cos(ang.value), Math.sin(ang.value));
  const n = 16;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = t0 + ((t1 - t0) * i) / n;
    return { x: P.x + P.r * Math.cos(t), y: P.y + P.r * Math.sin(t) };
  })
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
});

/* 方法一：两段绳拉力的合成 */
const half = computed(() => ang.value / 2);
const sideTip = { x: P.x + F_LEN, y: P.y };
const ropeTip = computed(() => ({ x: P.x + F_LEN * Math.cos(ang.value), y: P.y - F_LEN * Math.sin(ang.value) }));
const cornerTip = computed(() => ({ x: sideTip.x + ropeTip.value.x - P.x, y: sideTip.y + ropeTip.value.y - P.y }));
const arcPath = (radius: number, angle: number): string => {
  const p0 = { x: P.x + radius, y: P.y };
  const p1 = { x: P.x + radius * Math.cos(angle), y: P.y - radius * Math.sin(angle) };
  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${radius} ${radius} 0 0 0 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
};
const alphaArc = computed(() => arcPath(74, ang.value));
const halfArc = computed(() => arcPath(46, half.value));
const alphaAt = computed(() => ({ x: P.x + 60 * Math.cos(ang.value * 0.75), y: P.y - 60 * Math.sin(ang.value * 0.75) }));
const halfAt = computed(() => ({ x: P.x + 34 * Math.cos(ang.value * 0.2), y: P.y - 34 * Math.sin(ang.value * 0.2) }));
const rope2Mid = computed(() => ({ x: (outT.value.x + hand.value.x) / 2, y: (outT.value.y + hand.value.y) / 2 }));

/* 方法二：绳头位移的平行四边形（两条边都是 L） */
const H0 = { x: 640, y: 220 };
const dSide = { x: H0.x + L_LEN, y: H0.y };
const dRope = computed(() => ({ x: H0.x + L_LEN * Math.cos(ang.value), y: H0.y - L_LEN * Math.sin(ang.value) }));
const dDiag = computed(() => ({ x: dSide.x + dRope.value.x - H0.x, y: dRope.value.y }));
const diagLabel = computed(() => ({ x: (H0.x + dDiag.value.x) / 2, y: (H0.y + dDiag.value.y) / 2 - 42 }));
</script>

<template>
  <svg viewBox="0 0 860 280" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="细绳一端固定在墙上、绕过物体右侧外面的滑轮后由手拉着">
    <SurfaceHatch :from="{ x: 16, y: 280 }" :to="{ x: 800, y: 280 }" side="below" :thickness="12" :gap="22" />
    <SurfaceHatch :from="{ x: 800, y: 14 }" :to="{ x: 800, y: 280 }" side="right" :thickness="12" :gap="20" />
    <!-- 物体 -->
    <rect
      :x="OBJECT.x1"
      :y="OBJECT.y1"
      :width="OBJECT.x2 - OBJECT.x1"
      :height="OBJECT.y2 - OBJECT.y1"
      rx="10"
      fill="var(--c-surface-solid)"
      stroke="var(--c-text-dim)"
      stroke-width="2.4"
    />
    <!-- 物体右侧伸出的一截短连杆，把滑轮吊在物体右侧外面 -->
    <line :x1="LINK.from" :y1="P.y" :x2="LINK.to" :y2="P.y" stroke="var(--c-text-dim)" stroke-width="5" stroke-linecap="round" />
    <circle :cx="P.x" :cy="P.y" :r="P.r" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <circle :cx="P.x" :cy="P.y" r="6" fill="var(--c-text-dim)" />
    <!-- 绳：下方一段通向墙上的固定点（靠下），绕右侧，上方一段由手拉（靠上） -->
    <line :x1="lowT.x" :y1="lowT.y" x2="800" y2="248" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path :d="wrapPath" fill="none" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line :x1="outT.x" :y1="outT.y" :x2="hand.x" :y2="hand.y" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <!-- 题干量：手拉绳的力 F -->
    <CourseArrow :from="hand" :to="fTip" stroke="var(--c-accent)" :stroke-width="3.4" label="F" :label-dy="-12" />
    <!-- 题干量（斜拉）：手这段绳与水平方向的夹角 α -->
    <g v-if="slanted">
      <path :d="alphaArc" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text :x="alphaAt.x" :y="alphaAt.y" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
    </g>
    <!-- 位移标注：物体前进 L -->
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 150, y: 110 }" :to="{ x: 210, y: 110 }" stroke="var(--c-velocity)" :stroke-width="2.6" stroke-dasharray="8 5" />
      <line x1="150" y1="98" x2="150" y2="122" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="4 4" />
      <line x1="210" y1="98" x2="210" y2="122" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="4 4" />
      <line x1="150" y1="122" x2="150" y2="168" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.7" />
      <line x1="210" y1="122" x2="210" y2="168" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.7" />
      <text x="180" y="90" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-velocity)">L</text>
    </g>
    <!-- 位移标注：水平拉时绳头前进 2L -->
    <g v-if="step >= 1 && !slanted">
      <CourseArrow :from="{ x: 522, y: 110 }" :to="{ x: 642, y: 110 }" stroke="var(--c-velocity)" :stroke-width="2.6" stroke-dasharray="8 5" />
      <line x1="522" y1="98" x2="522" y2="122" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="4 4" />
      <line x1="642" y1="98" x2="642" y2="122" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="4 4" />
      <line x1="582" y1="122" x2="582" y2="190" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.7" />
      <text x="582" y="90" text-anchor="middle" font-size="19" fill="var(--c-velocity)">
        <tspan font-family="KaTeX_Main">2</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">L</tspan>
      </text>
      <text x="582" y="214" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">绳头</text>
    </g>
    <!-- 方法一：两段绳的拉力 + 力的平行四边形 + 合力 -->
    <g v-if="slanted && step >= 2">
      <CourseArrow :from="{ x: 600, y: 248 }" :to="{ x: 675, y: 248 }" stroke="var(--c-accent)" :stroke-width="2.6" />
      <CourseArrow :from="rope2Mid" :to="{ x: rope2Mid.x + 72 * uOut.x, y: rope2Mid.y + 72 * uOut.y }" stroke="var(--c-accent)" :stroke-width="2.6" />
      <line :x1="sideTip.x" :y1="sideTip.y" :x2="cornerTip.x" :y2="cornerTip.y" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="6 5" />
      <line :x1="ropeTip.x" :y1="ropeTip.y" :x2="cornerTip.x" :y2="cornerTip.y" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="6 5" />
      <CourseArrow :from="P" :to="cornerTip" stroke="var(--c-physics)" :stroke-width="3.4" />
      <path :d="halfArc" fill="none" stroke="var(--c-physics)" stroke-width="1.6" />
      <text :x="halfAt.x" :y="halfAt.y" font-size="16" fill="var(--c-physics)" class="pw-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">α</tspan>
        <tspan font-family="KaTeX_Main">/2</tspan>
      </text>
      <text :x="cornerTip.x + 12" :y="cornerTip.y + 4" font-size="19" fill="var(--c-physics)" class="pw-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">合</tspan>
      </text>
    </g>
    <!-- 方法二：绳头位移的平行四边形 -->
    <g v-if="slanted && step >= 3">
      <line :x1="H0.x" :y1="H0.y" :x2="dSide.x" :y2="dSide.y" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="6 5" />
      <line :x1="H0.x" :y1="H0.y" :x2="dRope.x" :y2="dRope.y" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="6 5" />
      <line :x1="dSide.x" :y1="dSide.y" :x2="dDiag.x" :y2="dDiag.y" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="6 5" />
      <line :x1="dRope.x" :y1="dRope.y" :x2="dDiag.x" :y2="dDiag.y" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="6 5" />
      <CourseArrow :from="H0" :to="dDiag" stroke="var(--c-velocity)" :stroke-width="3" />
      <text :x="diagLabel.x" :y="diagLabel.y" text-anchor="middle" font-size="18" fill="var(--c-velocity)">
        <tspan font-family="KaTeX_Main">2</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">L</tspan>
        <tspan font-family="KaTeX_Main">cos(</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">α</tspan>
        <tspan font-family="KaTeX_Main">/2)</tspan>
      </text>
      <text x="693" y="242" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">绳头的位移</text>
    </g>
  </svg>
</template>

<style scoped>
.pw-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
