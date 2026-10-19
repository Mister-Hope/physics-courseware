<!--
  第一课时第 3 页（功的定义与表达式）推导图（精修美化版）
  
  物理逻辑与视觉规约：
    1. 力的平行四边形分解（长方形闭合）：
       - 两个分力 F₁（沿位移方向）与 F₂（垂直位移方向）均为【实线粗箭头】；
       - 另两条边为【虚线】，分别连接 F₁ 尖端与 F 尖端、F₂ 尖端与 F 尖端，构成闭合长方形（平行四边形分解）；
    2. 位移矢量 x 采用【实线箭头】：
       - 标在水平位移方向上，实线绘制；
       - 位移文字 x 避开 F₁，排布在箭头右上方，杜绝文字重叠；
    3. 纯图形物理推导，原生宽高比自适应，无多余外框干扰。
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** 点击后出现：分力 F₁、F₂、平行四边形长方形虚线边与直角标记 */
    showDecomp?: boolean;
    /** 兼容 Slidev step: step >= 1 展开分解 */
    step?: number;
  }>(),
  {
    showDecomp: false,
    step: 0,
  },
);

/** 力的作用点＝物块几何中心 C；F 与水平（位移方向）成 40° */
const C = { x: 228, y: 223 };
const R = 200;
const ANG = (40 * Math.PI) / 180;

// 合力 F 尖端
const tip = {
  x: C.x + R * Math.cos(ANG), // ~381.2
  y: C.y - R * Math.sin(ANG), // ~94.4
};

// 水平分力 F₁ 尖端 (381.2, 223)
const f1Tip = { x: tip.x, y: C.y };

// 竖直分力 F₂ 尖端 (228, 94.4)
const f2Tip = { x: C.x, y: tip.y };

// 水平位移 x 终点 (525, 223)
const xTip = { x: 525, y: 223 };

// 夹角 α 弧线（半径 62 px）
const arcR = 62;
const arcFrom = { x: C.x + arcR, y: C.y }; // (290, 223)
const arcTo = {
  x: C.x + arcR * Math.cos(ANG), // ~275.5
  y: C.y - arcR * Math.sin(ANG), // ~183.1
};
const arcPath = `M ${arcFrom.x.toFixed(1)} ${arcFrom.y.toFixed(1)} A ${arcR} ${arcR} 0 0 0 ${arcTo.x.toFixed(1)} ${arcTo.y.toFixed(1)}`;

// 直角标记（在分力 F₁ 与 F₂ 垂直夹角处）
const s = 14;
const rightAnglePath = `M ${C.x + s} ${C.y} L ${C.x + s} ${C.y - s} L ${C.x} ${C.y - s}`;

// 是否显示分解
const isDecomposed = () => props.showDecomp || (props.step ?? 0) >= 1;

// 文字光晕
const HALO = {
  stroke: "var(--c-bg, #0f1425)",
  "stroke-width": 3.6,
  "paint-order": "stroke",
} as const;
</script>

<template>
  <svg
    viewBox="25 60 570 215"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="斜向拉力按平行四边形分解为沿位移方向与垂直位移方向两个分力"
    class="select-none overflow-visible"
    style="display: block; margin: 0 auto"
  >
    <defs>
      <!-- 滑块质感渐变 -->
      <linearGradient id="decomp-block-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--c-surface-solid, #1e293b)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
      </linearGradient>

      <!-- 夹角柔和微光扇形 -->
      <radialGradient id="decomp-alpha-glow" cx="0%" cy="100%" r="100%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.22" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0.03" />
      </radialGradient>
    </defs>

    <!-- 1. 地面剖面线 -->
    <SurfaceHatch
      :from="{ x: 30, y: 250 }"
      :to="{ x: 590, y: 250 }"
      side="below"
      :thickness="15"
      :gap="24"
      color="rgba(148, 163, 184, 0.45)"
      :line-width="2.2"
      :hatch-width="1.2"
    />

    <!-- 2. 滑块主体 (宽 96, 高 54, 中心 C 位于 (228, 223)) -->
    <g>
      <!-- 阴影 -->
      <rect x="182" y="248" width="92" height="3" rx="1.5" fill="rgba(0, 0, 0, 0.4)" />
      <!-- 主物块 -->
      <rect x="180" y="196" width="96" height="54" rx="8" fill="url(#decomp-block-grad)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <!-- 顶边高光饰条 -->
      <line x1="188" y1="197.5" x2="268" y2="197.5" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-linecap="round" />

      <!-- 几何中心受力点 C -->
      <circle :cx="C.x" :cy="C.y" r="3.4" fill="#0f172a" stroke="var(--c-accent)" stroke-width="1.6" />
      <circle :cx="C.x" :cy="C.y" r="1.4" fill="var(--c-accent)" />
    </g>

    <!-- 3. 水平位移 x 矢量 (用户要求：实线箭头) -->
    <CourseArrow :from="C" :to="xTip" stroke="var(--c-velocity, #38bdf8)" :stroke-width="2.8" label="x" :label-dx="12" :label-dy="-12" :head-size="9" />

    <!-- 4. 夹角 α 扇形微光与弧线 -->
    <path :d="`M ${C.x} ${C.y} L ${arcFrom.x} ${arcFrom.y} A ${arcR} ${arcR} 0 0 0 ${arcTo.x} ${arcTo.y} Z`" fill="url(#decomp-alpha-glow)" />
    <path :d="arcPath" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
    <text x="288" y="168" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-accent)" :style="HALO">α</text>

    <!-- 5. 力的平行四边形分解 (点击展示 / showDecomp) -->
    <g v-if="isDecomposed()">
      <!-- 直角标记 -->
      <path :d="rightAnglePath" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />

      <!-- 长方形另两条边：虚线闭合平行四边形 -->
      <!-- 边 1：从分力 F₁ 尖端向上引到合力 F 尖端 (垂直虚线) -->
      <line :x1="f1Tip.x" :y1="f1Tip.y" :x2="tip.x" :y2="tip.y" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="6 4" opacity="0.8" />
      <!-- 边 2：从分力 F₂ 尖端向右引到合力 F 尖端 (水平虚线) -->
      <line :x1="f2Tip.x" :y1="f2Tip.y" :x2="tip.x" :y2="tip.y" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="6 4" opacity="0.8" />

      <!-- 分力 F₁（沿位移方向）：实线粗箭头 -->
      <CourseArrow :from="C" :to="f1Tip" stroke="var(--c-physics)" :stroke-width="3.2" :head-size="10" />
      <!-- F₁ 文字标注（置于 F₁ 箭头上方中部，清晰醒目） -->
      <text :x="(C.x + f1Tip.x) / 2" :y="C.y - 10" text-anchor="middle" fill="var(--c-physics)" font-size="20" :style="HALO">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="14" dy="4">1</tspan>
      </text>

      <!-- 分力 F₂（垂直位移方向）：实线粗箭头 -->
      <CourseArrow :from="C" :to="f2Tip" stroke="var(--c-physics)" :stroke-width="3.2" :head-size="10" />
      <!-- F₂ 文字标注（置于 F₂ 箭头左侧中部） -->
      <text :x="C.x - 12" :y="(C.y + f2Tip.y) / 2 + 5" text-anchor="end" fill="var(--c-physics)" font-size="20" :style="HALO">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="14" dy="4">2</tspan>
      </text>
    </g>

    <!-- 6. 斜向拉力合力 F 矢量 (对角线实线箭头，置于顶层) -->
    <CourseArrow :from="C" :to="tip" stroke="var(--c-accent)" :stroke-width="3.6" label="F" :label-dx="10" :label-dy="-13" :head-size="11" />
  </svg>
</template>
