<!--
  第 22 页封面装饰（第二课时·功率 精修美化版）
  Slidev 封面右下角装饰图：牵引力沿运动方向驱动前进、功率 P = Fv 纯图形学术微光视觉
  
  物理逻辑与视觉规约：
    1. 做功快慢与动势感（Velocity & Momentum）：
       - 物块后方伴随流线型速度风痕光流（Speed Streaks），瞬间展现向右疾驰的动势；
       - 地面接触线配合轻微滑行微尘，打破静态呆板感；
    2. 牵引力 F 与瞬时速度 v 的严密视觉呼应：
       - 牵引力 F 从物块中心 O(62, 106) 起笔水平向右，高亮金色粗实线矢量；
       - 速度 v 画在物块上旁侧，天青蓝虚线矢量，二者同向共线呼应；
    3. 核心公式 P = Fv 学术级排版：
       - 顶部微光晶体徽标，公式物理量与下方矢量色彩严格 1:1 语义绑定（F 为金色，v 为天青蓝）；
       - 纯图形设计，零多余文字干扰，与第一课时封面装饰成套呼应。
-->
<script setup lang="ts">
const { width = 205 } = defineProps<{
  width?: number | string;
}>();

// 几何基础参数 (viewBox: 230 × 150，与第一课时严密统一)
const W = 230;
const H = 150;
const Y_GROUND = 128;

// 物块：几何中心 O(62, 106)，宽 52，高 44
const O = { x: 62, y: 106 };
const BLOCK_W = 52;
const BLOCK_H = 44;
const BLOCK_RX = 8;
const BLOCK_X = O.x - BLOCK_W / 2; // 36
const BLOCK_Y = O.y - BLOCK_H / 2; // 84

// 牵引力 F 终点：长度 90 px
const F_LEN = 90;
const fTip = { x: O.x + F_LEN, y: O.y }; // (152, 106)

// 速度 v 起终点：长度 88 px
const V_FROM = { x: 74, y: 68 };
const V_LEN = 88;
const vTip = { x: V_FROM.x + V_LEN, y: V_FROM.y }; // (162, 68)
</script>

<template>
  <svg
    :viewBox="`0 0 ${W} ${H}`"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="第二课时·功率：物体以速度 v 前进、牵引力沿运动方向，功率 P = Fv"
    class="select-none overflow-visible"
  >
    <defs>
      <!-- 物块主体渐变 -->
      <linearGradient id="power-block-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--c-surface-solid, #1e293b)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
      </linearGradient>

      <!-- 速度风痕渐变 (从左往右渐亮) -->
      <linearGradient id="streak-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0" />
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.65" />
      </linearGradient>

      <!-- 公式徽标微光渐变 -->
      <linearGradient id="badge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(15, 23, 42, 0.75)" />
        <stop offset="100%" stop-color="rgba(30, 41, 59, 0.7)" />
      </linearGradient>
    </defs>

    <!-- ════════ 1. 地面与下侧剖面线 ════════ -->
    <SurfaceHatch
      :from="{ x: 18, y: Y_GROUND }"
      :to="{ x: 212, y: Y_GROUND }"
      side="below"
      :thickness="10"
      :gap="16"
      color="rgba(148, 163, 184, 0.45)"
      :line-width="2.2"
      :hatch-width="1.2"
    />

    <!-- ════════ 2. 动势风痕光流 (Speed Streaks: 表征正在以速度 v 快速运动) ════════ -->
    <g opacity="0.85">
      <!-- 尾部流线 1 -->
      <line x1="8" y1="94" x2="34" y2="94" stroke="url(#streak-grad)" stroke-width="1.8" stroke-linecap="round" />
      <!-- 尾部流线 2 (长流线) -->
      <line x1="2" y1="106" x2="34" y2="106" stroke="url(#streak-grad)" stroke-width="2.2" stroke-linecap="round" />
      <!-- 尾部流线 3 -->
      <line x1="12" y1="118" x2="34" y2="118" stroke="url(#streak-grad)" stroke-width="1.6" stroke-linecap="round" />
      <!-- 物块底部滑行接触微光 -->
      <line x1="24" y1="127.5" x2="48" y2="127.5" stroke="#38bdf8" stroke-width="1.2" opacity="0.4" stroke-linecap="round" />
    </g>

    <!-- ════════ 3. 实体物块 ════════ -->
    <g>
      <!-- 物块阴影 -->
      <rect :x="BLOCK_X + 2" :y="Y_GROUND - 2" :width="BLOCK_W - 4" :height="3" rx="1.5" fill="rgba(0, 0, 0, 0.5)" />
      <!-- 主物块 -->
      <rect
        :x="BLOCK_X"
        :y="BLOCK_Y"
        :width="BLOCK_W"
        :height="BLOCK_H"
        :rx="BLOCK_RX"
        fill="url(#power-block-grad)"
        stroke="rgba(148, 163, 184, 0.7)"
        stroke-width="1.8"
      />
      <!-- 顶边高光饰条 -->
      <line
        :x1="BLOCK_X + 6"
        :y1="BLOCK_Y + 1.2"
        :x2="BLOCK_X + BLOCK_W - 6"
        :y2="BLOCK_Y + 1.2"
        stroke="rgba(255, 255, 255, 0.3)"
        stroke-width="1"
        stroke-linecap="round"
      />
      <!-- 中心受力锚点 (小圆孔) -->
      <circle :cx="O.x" :cy="O.y" r="3.2" fill="#0f172a" stroke="var(--c-accent, #e2a846)" stroke-width="1.4" />
      <circle :cx="O.x" :cy="O.y" r="1.2" fill="var(--c-accent, #e2a846)" />
    </g>

    <!-- ════════ 4. 速度矢量 v (在物块旁侧水平向前) ════════ -->
    <CourseArrow
      :from="V_FROM"
      :to="vTip"
      stroke="var(--c-velocity, #38bdf8)"
      :stroke-width="2.5"
      stroke-dasharray="7 5"
      label="v"
      :label-dy="-11"
      :head-size="8.5"
    />

    <!-- ════════ 5. 牵引力矢量 F (从几何中心出发沿运动方向) ════════ -->
    <CourseArrow :from="O" :to="fTip" stroke="var(--c-accent, #e2a846)" :stroke-width="3.2" label="F" :label-dy="-12" :head-size="10" />

    <!-- ════════ 6. 核心学术公式：P = F v ════════ -->
    <g transform="translate(172, 36)">
      <!-- 微透晶体公式胶囊底框 -->
      <rect x="-38" y="-18" width="76" height="26" rx="6" fill="url(#badge-grad)" stroke="rgba(148, 163, 184, 0.3)" stroke-width="1.1" />
      <!-- 公式文字（色彩语义1:1绑定：P能量金，F拉力金，v速度蓝） -->
      <text x="0" y="1" text-anchor="middle" dominant-baseline="middle" font-size="17">
        <tspan font-family="KaTeX_Math" font-style="italic" font-weight="bold" fill="var(--c-accent, #e2a846)">P</tspan>
        <tspan font-family="KaTeX_Main" fill="#94a3b8" dx="2">=</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic" font-weight="bold" fill="var(--c-accent, #e2a846)" dx="2">F</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic" font-weight="bold" fill="var(--c-velocity, #38bdf8)" dx="1">v</tspan>
      </text>
    </g>
  </svg>
</template>
