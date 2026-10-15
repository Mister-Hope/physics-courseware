<!--
  选必2 1.x《复合场中的配速法与摆线运动》第 N 页题目示意图：
  匀强磁场（垂直纸面向里）中，细线吊一个带电绝缘小球，从等高的 A（右侧）、B（左侧）两点摆向最低点 O。
  · 常显（干净题目图）：天花板、磁场阵列、悬挂点 P、细线 P→O、两条半径虚线 P→A / P→B、A / B 处的虚线小球、
    O 处的实心小球，以及 A→O、B→O 两段摆动路径虚线弧（∠A / ∠B 的摆动弧半径 = 摆长）；
  · showAnalysis 打开（点击后）才画分析标注：过 O 的两个速度方向箭头（来自 B 侧向右、来自 A 侧向左）
    与两个洛伦兹力箭头（向上金色、向下蓝色），都在小球处起笔。
-->

<script setup lang="ts">
const { showAnalysis = false } = defineProps<{
  /** 点击后才画出速度、洛伦兹力这些分析标注 */
  showAnalysis?: boolean;
}>();

/** 画布（viewBox 用户单位） */
const W = 660;
const H = 420;
/** 天花板：一条水平线 + 上侧斜线阴影 */
const ceilingFrom = { x: 90, y: 52 };
const ceilingTo = { x: 570, y: 52 };
/** 垂直纸面向里的匀强磁场阵列：首个（左上角）记号中心 + 行列数、间距、记号尺寸（铺满整片区域、一行行连成「一片磁场」） */
const field = {
  x: 63,
  y: 100,
  cols: 6,
  rows: 4,
  spacing: 103,
  size: 12,
  lineWidth: 3.1,
  opacity: 0.9,
};
/** 悬挂点 P（在天花板上）与摆动最低点 O */
const P = { x: 330, y: 52 };
const O = { x: 330, y: 337 };
/** 左右两个等高的释放点：A 在悬挂点右侧、B 在左侧 */
const A = { x: 481, y: 294 };
const B = { x: 179, y: 294 };
/** 小球半径 */
const ballR = 19;
/** 摆长：P 到 A / B / O 的距离（三者相等），也是摆动路径弧的半径（兜底 ≥1，避免半径 0 的退化弧） */
const swingR = Math.hypot(A.x - P.x, A.y - P.y) || 1;
/**
 * 数值兜底：任何非有限值（NaN / ±Infinity）都退回 0，杜绝拼出 `A NaN` 这类非法 path
 *
 * @param value 待兜底的数值
 * @returns 有限数值
 */
const num = (value: number): number => (Number.isFinite(value) ? value : 0);
/**
 * 路径坐标统一保留 1 位小数，且保证是有限数
 *
 * @param value 坐标值
 * @returns 保留 1 位小数的字符串
 */
const px = (value: number): string => num(value).toFixed(1);
/** 摆动路径虚线弧：A→O 沿顺时针小弧、B→O 沿逆时针小弧 */
const arcFromA = `M ${px(A.x)} ${px(A.y)} A ${px(swingR)} ${px(swingR)} 0 0 1 ${px(O.x)} ${px(O.y)}`;
const arcFromB = `M ${px(B.x)} ${px(B.y)} A ${px(swingR)} ${px(swingR)} 0 0 0 ${px(O.x)} ${px(O.y)}`;
/** 速度箭头：球心左右各让出 vStartOffset 起笔，长为 vLength */
const vOffset = 10;
const vLength = 88;
/** 过 O 向右（来自 B 侧）的速度 */
const vRightFrom = { x: O.x + vOffset, y: O.y };
const vRightTo = { x: O.x + vOffset + vLength, y: O.y };
/** 过 O 向左（来自 A 侧）的速度 */
const vLeftFrom = { x: O.x - vOffset, y: O.y };
const vLeftTo = { x: O.x - vOffset - vLength, y: O.y };
/** 洛伦兹力箭头：从小球中心起笔，长为 forceLength */
const forceLength = 104;
const lorentzUpTo = { x: O.x, y: O.y - forceLength };
const lorentzDownTo = { x: O.x, y: O.y + forceLength };
/** 上屏文字统一加深色光晕 */
const halo = { stroke: "var(--c-bg)", "stroke-width": 3.5, "paint-order": "stroke" };
/** 带中文下标的文字：光晕收细，避免大号汉字被描边涂成实心块 */
const haloSub = { stroke: "var(--c-bg)", "stroke-width": 2.4, "paint-order": "stroke" };
/** 物理量（斜体）与单位/正体各自的字体栈 */
const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";
const MAIN_FONT = "KaTeX_Main, 'Times New Roman', serif";
</script>

<template>
  <div class="fig-swing">
    <svg :viewBox="`0 0 ${W} ${H}`" class="fig-svg">
      <SurfaceHatch
        :from="ceilingFrom"
        :to="ceilingTo"
        side="above"
        :thickness="26"
        :gap="40"
        :line-width="4"
        :hatch-width="2"
      />
      <FieldDots
        :x="field.x"
        :y="field.y"
        :cols="field.cols"
        :rows="field.rows"
        :spacing="field.spacing"
        :size="field.size"
        :line-width="field.lineWidth"
        :opacity="field.opacity"
        dir="in"
      />
      <path
        :d="arcFromA"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="3.7"
        stroke-dasharray="5 5"
        opacity="0.6"
      />
      <path
        :d="arcFromB"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="3.7"
        stroke-dasharray="5 5"
        opacity="0.6"
      />
      <line
        :x1="P.x"
        :y1="P.y"
        :x2="A.x"
        :y2="A.y"
        stroke="var(--c-text-dim)"
        stroke-width="2.6"
        stroke-dasharray="7 6"
      />
      <line
        :x1="P.x"
        :y1="P.y"
        :x2="B.x"
        :y2="B.y"
        stroke="var(--c-text-dim)"
        stroke-width="2.6"
        stroke-dasharray="7 6"
      />
      <line :x1="P.x" :y1="P.y" :x2="O.x" :y2="O.y" stroke="var(--c-text)" stroke-width="3.1" />
      <circle
        :cx="A.x"
        :cy="A.y"
        :r="ballR"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="3.1"
        stroke-dasharray="5 4"
      />
      <circle
        :cx="B.x"
        :cy="B.y"
        :r="ballR"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="3.1"
        stroke-dasharray="5 4"
      />
      <circle :cx="P.x" :cy="P.y" r="5.4" fill="var(--c-text)" />
      <circle
        :cx="O.x"
        :cy="O.y"
        :r="ballR"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        stroke-width="3.4"
      />
      <text
        :x="A.x + 28"
        :y="A.y + 30"
        font-size="31"
        fill="var(--c-text)"
        text-anchor="start"
        :font-family="MATH_FONT"
        font-style="italic"
        :style="halo"
      >
        A
      </text>
      <text
        :x="B.x - 28"
        :y="B.y + 30"
        font-size="31"
        fill="var(--c-text)"
        text-anchor="end"
        :font-family="MATH_FONT"
        font-style="italic"
        :style="halo"
      >
        B
      </text>
      <text
        :x="O.x - 26"
        :y="O.y + ballR + 24"
        font-size="31"
        fill="var(--c-text)"
        text-anchor="middle"
        :font-family="MATH_FONT"
        font-style="italic"
        :style="halo"
      >
        O
      </text>
      <g v-if="showAnalysis">
        <!-- 全仓配色约定：速度一律蓝、力一律红、磁场黄。
             v₁（来自 A 侧、向左）配 F洛1（向下）；v₂（来自 B 侧、向右）配 F洛2（向上）。 -->
        <CourseArrow
          :from="vRightFrom"
          :to="vRightTo"
          stroke="var(--c-velocity)"
          :stroke-width="4.8"
          :head-size="19"
        />
        <CourseArrow
          :from="vLeftFrom"
          :to="vLeftTo"
          stroke="var(--c-velocity)"
          :stroke-width="4.8"
          :head-size="19"
        />
        <CourseArrow
          :from="O"
          :to="lorentzUpTo"
          stroke="var(--c-force)"
          :stroke-width="4.8"
          :head-size="19"
        />
        <CourseArrow
          :from="O"
          :to="lorentzDownTo"
          stroke="var(--c-force)"
          :stroke-width="4.8"
          :head-size="19"
        />
        <text
          :x="(vRightFrom.x + vRightTo.x) / 2"
          :y="O.y - 16"
          font-size="29"
          fill="var(--c-velocity)"
          text-anchor="middle"
          :font-family="MATH_FONT"
          font-style="italic"
          :style="halo"
        >
          v
          <tspan :font-family="MATH_FONT" font-size="20" dy="7">2</tspan>
        </text>
        <text
          :x="(vLeftFrom.x + vLeftTo.x) / 2"
          :y="O.y - 16"
          font-size="29"
          fill="var(--c-velocity)"
          text-anchor="middle"
          :font-family="MATH_FONT"
          font-style="italic"
          :style="halo"
        >
          v
          <tspan :font-family="MATH_FONT" font-size="20" dy="7">1</tspan>
        </text>
        <text
          :x="O.x + 20"
          :y="lorentzUpTo.y + 7"
          font-size="29"
          fill="var(--c-force)"
          text-anchor="start"
          :style="haloSub"
        >
          <tspan :font-family="MATH_FONT" font-style="italic">F</tspan>
          <tspan :font-family="MAIN_FONT" font-size="20" dy="7">洛2</tspan>
        </text>
        <text
          :x="O.x + 20"
          :y="lorentzDownTo.y - 10"
          font-size="29"
          fill="var(--c-force)"
          text-anchor="start"
          :style="haloSub"
        >
          <tspan :font-family="MATH_FONT" font-style="italic">F</tspan>
          <tspan :font-family="MAIN_FONT" font-size="20" dy="7">洛1</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 根 div 与 svg 顶部对齐：不居中、不留外边距（父级 align-items: center 也压得住）；
   图宽上限交给共享的 .fig-svg（本课 style.css）读 --fig-max。
   第 2 页题目页图栏 ≈ 438px、第 3/4 页解析页图栏 ≈ 500px —— 540px 让两处都被栏宽限住、吃满可用面积 */
.fig-swing {
  display: block;
  align-self: flex-start;
  width: 100%;

  --fig-max: 540px;
}
</style>
