<!--
  第 7 页配图：一段导体与它的横截面（精修美化版）
  教学核心：时间 t 内有电荷量 q 通过该横截面（宏观电流定义式 I = q/t 的物理模型）
  
  物理逻辑与视觉规约：
    1. 真实 3D 金属导线立体透视：两端椭圆截面 + 上下母线高光；
    2. 左端截面椭圆：外侧观察面，整洁完整立体椭圆，中间绝无纵向灰线；
    3. 右端截面椭圆：左半部分为虚线（透视穿透内壁），右半部分为实线；
    4. 导线长度适度紧凑（x = 95 ~ 365），居中对称，杜绝两端多余空管；
    5. 时间 t 内通过横截面的电荷量 q：
       - 淡金色微光圆柱体微元（x = 170 ~ 250）；
       - 穿越横截面的单根受关注 CourseArrow，仅保留箭头上唯一的小 q 标注（杜绝图内重复标 q）；
       - 严谨克制：微观载流子与柱长 L = vt 统一移至第 10 页微观推导图，本图保持纯净宏观定义；
    6. 核心横截面 S：立体剖切椭圆（前实后虚），顶部垂直引线指示“横截面”；
    7. 纯净全局 CSS 变量（零 fallback 冗余），无固定 width 属性，完美自适应 Slidev。
-->
<script setup lang="ts">
// 文字光晕
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.4,
  "paint-order": "stroke",
} as const;

// ══════════════ 几何坐标常数 ══════════════
const Y_TOP = 34;
const Y_BOTTOM = 92;
const Y_MID = (Y_TOP + Y_BOTTOM) / 2; // 63
const RY = (Y_BOTTOM - Y_TOP) / 2; // 29
const RX = 8.5; // 截面椭圆半轴长

// 导线端点（紧凑精炼，居中对称）
const X_LEFT = 95;
const X_RIGHT = 365;

// 横截面 S 位置
const X_SEC = 250;

// 时间 t 内通过横截面的电荷柱体左侧起点
const X_COL_START = 170;
</script>

<template>
  <div class="current-definition-figure select-none">
    <svg
      viewBox="0 0 460 136"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="一段导体与它的横截面：时间 t 内通过横截面的电荷量 q"
      class="select-none overflow-visible"
      style="display: block; margin: 0 auto"
    >
      <defs>
        <!-- 导线主体圆柱金属玻璃态渐变 -->
        <linearGradient id="cd-wire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.45)" />
          <stop offset="25%" stop-color="rgba(51, 65, 85, 0.22)" />
          <stop offset="50%" stop-color="rgba(96, 165, 250, 0.08)" />
          <stop offset="75%" stop-color="rgba(51, 65, 85, 0.22)" />
          <stop offset="100%" stop-color="rgba(30, 41, 59, 0.45)" />
        </linearGradient>

        <!-- 左端面椭圆立体明暗 -->
        <linearGradient id="cd-cap-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.85)" />
          <stop offset="100%" stop-color="rgba(51, 65, 85, 0.4)" />
        </linearGradient>

        <!-- 右端面椭圆截面 -->
        <linearGradient id="cd-cap-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(51, 65, 85, 0.5)" />
          <stop offset="100%" stop-color="rgba(96, 165, 250, 0.18)" />
        </linearGradient>

        <!-- 电荷柱体金色发光渐变 (时间 t 内流经横截面的电荷) -->
        <linearGradient id="cd-charge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(226, 168, 70, 0.08)" />
          <stop offset="40%" stop-color="rgba(226, 168, 70, 0.22)" />
          <stop offset="100%" stop-color="rgba(226, 168, 70, 0.32)" />
        </linearGradient>

        <!-- 横截面 S 截面椭圆填充渐变 -->
        <radialGradient id="cd-section-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.45)" />
          <stop offset="70%" stop-color="rgba(226, 168, 70, 0.26)" />
          <stop offset="100%" stop-color="rgba(226, 168, 70, 0.12)" />
        </radialGradient>
      </defs>

      <!-- ════════════════════════════════════════════════
           1. 导线外层圆柱体（立体透视轮廓：左端无灰线 · 右端前实后虚）
      ════════════════════════════════════════════════ -->
      <g>
        <!-- 导线管身主体填充 (两端与椭圆平滑衔接，绝不产生左端垂直剖分灰线) -->
        <path
          :d="`
            M ${X_LEFT} ${Y_TOP}
            L ${X_RIGHT} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_RIGHT} ${Y_BOTTOM}
            L ${X_LEFT} ${Y_BOTTOM}
            A ${RX} ${RY} 0 0 1 ${X_LEFT} ${Y_TOP}
            Z
          `"
          fill="url(#cd-wire-grad)"
        />

        <!-- 上下母线轮廓实线 -->
        <line :x1="X_LEFT" :y1="Y_TOP" :x2="X_RIGHT" :y2="Y_TOP" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.9" />
        <line :x1="X_LEFT" :y1="Y_BOTTOM" :x2="X_RIGHT" :y2="Y_BOTTOM" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.9" />

        <!-- 导线上方/下方高光轮廓线 -->
        <line :x1="X_LEFT" :y1="Y_TOP + 1" :x2="X_RIGHT" :y2="Y_TOP + 1" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" />
        <line :x1="X_LEFT" :y1="Y_BOTTOM - 1" :x2="X_RIGHT" :y2="Y_BOTTOM - 1" stroke="rgba(15, 23, 42, 0.7)" stroke-width="1" />

        <!-- 左端截面椭圆（外侧观察面，整洁完整立体椭圆，中间绝无任何纵向灰线） -->
        <ellipse :cx="X_LEFT" :cy="Y_MID" :rx="RX" :ry="RY" fill="url(#cd-cap-left)" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.95" />

        <!-- 右端截面椭圆底色填充 -->
        <ellipse :cx="X_RIGHT" :cy="Y_MID" :rx="RX" :ry="RY" fill="url(#cd-cap-right)" stroke="none" />

        <!-- 右端截面椭圆轮廓：左半部分为虚线（透视穿透内壁） -->
        <path
          :d="`
            M ${X_RIGHT} ${Y_TOP}
            A ${RX} ${RY} 0 0 0 ${X_RIGHT} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-text)"
          stroke-width="1.6"
          stroke-dasharray="4 3"
          stroke-opacity="0.65"
        />

        <!-- 右端截面椭圆轮廓：右半部分为实线（外轮廓边线） -->
        <path
          :d="`
            M ${X_RIGHT} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_RIGHT} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-text)"
          stroke-width="1.6"
          stroke-opacity="0.95"
        />
      </g>

      <!-- ════════════════════════════════════════════════
           2. 时间 t 内通过横截面的那段柱体电荷量 q
      ════════════════════════════════════════════════ -->
      <g>
        <!-- 电荷柱体立体筒身 (从 X_COL_START 到 X_SEC，纯净淡金色微光，不加微观电子与文字堆叠) -->
        <path
          :d="`
            M ${X_COL_START} ${Y_TOP}
            L ${X_SEC} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_SEC} ${Y_BOTTOM}
            L ${X_COL_START} ${Y_BOTTOM}
            A ${RX} ${RY} 0 0 0 ${X_COL_START} ${Y_TOP}
            Z
          `"
          fill="url(#cd-charge-grad)"
        />

        <!-- 柱体后截面椭圆（虚线，表示电荷分段后壁透视） -->
        <path
          :d="`
            M ${X_COL_START} ${Y_TOP}
            A ${RX} ${RY} 0 0 0 ${X_COL_START} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          stroke-dasharray="4 3"
          stroke-opacity="0.55"
        />
        <path
          :d="`
            M ${X_COL_START} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_COL_START} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          stroke-dasharray="4 3"
          stroke-opacity="0.8"
        />
      </g>

      <!-- ════════════════════════════════════════════════
           3. 核心受关注物：横截面（立体剖切椭圆，前实后虚）
      ════════════════════════════════════════════════ -->
      <g>
        <!-- 横截面椭圆剖切面实体填充 -->
        <ellipse :cx="X_SEC" :cy="Y_MID" :rx="RX" :ry="RY" fill="url(#cd-section-grad)" />

        <!-- 横截面轮廓：后半圆弧（内壁虚线透视） -->
        <path
          :d="`
            M ${X_SEC} ${Y_TOP}
            A ${RX} ${RY} 0 0 0 ${X_SEC} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-dasharray="5 3.5"
        />

        <!-- 横截面轮廓：前半圆弧（外壁实线强对比） -->
        <path
          :d="`
            M ${X_SEC} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_SEC} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2.2"
        />

        <!-- 横截面指示文字（位于截面上方） -->
        <line :x1="X_SEC" :y1="Y_TOP" :x2="X_SEC" y2="24" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="3 2" opacity="0.85" />
        <circle :cx="X_SEC" :cy="Y_TOP" r="2.2" fill="var(--c-accent)" />

        <text :x="X_SEC" y="18" text-anchor="middle" font-size="14" font-weight="600" fill="var(--c-accent)" :style="HALO">横截面</text>
      </g>

      <!-- ════════════════════════════════════════════════
           4. 穿越横截面的电荷量 q 箭头（全图唯一标注小 q，绝无重复）
      ════════════════════════════════════════════════ -->
      <g>
        <CourseArrow
          :from="{ x: 140, y: Y_MID }"
          :to="{ x: 320, y: Y_MID }"
          stroke="var(--c-accent)"
          :stroke-width="2.8"
          label="q"
          :label-dx="-26"
          :label-dy="-14"
          :head-size="8.5"
        />
      </g>

      <!-- ════════════════════════════════════════════════
           5. 底部学术说明：时间 t 内通过横截面的电荷量 q
      ════════════════════════════════════════════════ -->
      <g>
        <text x="230" y="122" text-anchor="middle" font-size="16" :style="HALO">
          <tspan fill="var(--c-text-dim)">时间</tspan>
          <tspan font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-text)">t</tspan>
          <tspan fill="var(--c-text-dim)">内通过横截面的电荷量</tspan>
          <tspan font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-accent)">q</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.current-definition-figure {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
