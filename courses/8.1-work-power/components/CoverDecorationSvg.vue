<!--
  第 1 页封面装饰（第一课时·功 精修美化版）
  Slidev 封面右下角装饰图：力与位移成角时做功的示意图（严防 x 与 α 重合）
-->
<script setup lang="ts">
const Y_GROUND = 128;

// 物块：几何中心 O(62, 106)，宽 52，高 44
const O = { x: 62, y: 106 };
const BLOCK_W = 52;
const BLOCK_H = 44;
const BLOCK_RX = 8;
const BLOCK_X = O.x - BLOCK_W / 2; // 36
const BLOCK_Y = O.y - BLOCK_H / 2; // 84

// 水平位移 x：起点 O(62, 106)，长度 92 px，终点 (154, 106)
const X_LEN = 92;
const xTip = { x: O.x + X_LEN, y: O.y };

// 斜向拉力 F：倾角 34°，长度 86 px
const ANG = (34 * Math.PI) / 180;
const F_LEN = 86;
const fTip = {
  x: O.x + F_LEN * Math.cos(ANG), // ~133.3
  y: O.y - F_LEN * Math.sin(ANG), // ~57.9
};

// 夹角 α 弧线（半径 40 px）
const R = 40;
const arcFrom = { x: O.x + R, y: O.y }; // (102, 106)
const arcTo = {
  x: O.x + R * Math.cos(ANG), // ~95.2
  y: O.y - R * Math.sin(ANG), // ~83.6
};
const arcPath = `M ${arcFrom.x.toFixed(1)} ${arcFrom.y.toFixed(1)} A ${R} ${R} 0 0 0 ${arcTo.x.toFixed(1)} ${arcTo.y.toFixed(1)}`;

// 夹角 α 标注：靠近弧线平分角（17°），距离 O 点 27 px，位于弧线内侧，完全不干扰位移 x
const alphaAt = {
  x: O.x + (R - 14) * Math.cos(ANG / 2), // ~86.8
  y: O.y - (R - 14) * Math.sin(ANG / 2) + 2, // ~98.4
};

// 文字光晕
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.4,
  "paint-order": "stroke",
} as const;
</script>

<template>
  <svg
    viewBox="0 0 230 150"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    width="320"
    aria-label="力与位移成角时做功的示意图"
    class="select-none overflow-visible"
  >
    <defs>
      <!-- 物块渐变 -->
      <linearGradient id="work-block-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--c-surface-solid)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
      </linearGradient>
    </defs>

    <!-- 1. 地面剖面线 -->
    <SurfaceHatch
      :from="{ x: 20, y: Y_GROUND }"
      :to="{ x: 206, y: Y_GROUND }"
      side="below"
      :thickness="10"
      :gap="17"
      color="rgba(148, 163, 184, 0.45)"
      :line-width="2.2"
      :hatch-width="1.2"
    />

    <!-- 2. 滑块 -->
    <g>
      <!-- 阴影 -->
      <rect :x="BLOCK_X + 2" :y="Y_GROUND - 2" :width="BLOCK_W - 4" :height="3" rx="1.5" fill="rgba(0, 0, 0, 0.4)" />
      <!-- 主滑块 -->
      <rect
        :x="BLOCK_X"
        :y="BLOCK_Y"
        :width="BLOCK_W"
        :height="BLOCK_H"
        :rx="BLOCK_RX"
        fill="url(#work-block-grad)"
        stroke="rgba(148, 163, 184, 0.75)"
        stroke-width="2"
      />
      <!-- 顶边微高光 -->
      <line
        :x1="BLOCK_X + 6"
        :y1="BLOCK_Y + 1.2"
        :x2="BLOCK_X + BLOCK_W - 6"
        :y2="BLOCK_Y + 1.2"
        stroke="rgba(255, 255, 255, 0.3)"
        stroke-width="1"
        stroke-linecap="round"
      />
      <!-- 几何中心受力锚点 -->
      <circle :cx="O.x" :cy="O.y" r="3.2" fill="#0f172a" stroke="var(--c-accent)" stroke-width="1.4" />
      <circle :cx="O.x" :cy="O.y" r="1.2" fill="var(--c-accent)" />
    </g>

    <!-- 3. 水平位移 x 矢量（位移文字靠近箭头前端，彻底杜绝与夹角 α 重叠） -->
    <CourseArrow
      :from="O"
      :to="xTip"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
      stroke-dasharray="8 6"
      label="x"
      :label-dx="30"
      :label-dy="-11"
      :head-size="8.5"
    />

    <!-- 4. 夹角 α 弧线与标注（紧凑放置在 O 点弧线内侧，与 x 标号错开 50px 以上） -->
    <path :d="arcPath" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.85" />
    <text :x="alphaAt.x" :y="alphaAt.y" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)" :style="HALO">α</text>

    <!-- 5. 斜向拉力 F 矢量 -->
    <CourseArrow :from="O" :to="fTip" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dx="9" :label-dy="-12" :head-size="10" />
  </svg>
</template>
