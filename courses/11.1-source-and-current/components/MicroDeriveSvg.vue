<!--
  第 10 页配图：I = neSv 电流微观表达式推导图（精修动效版）
  教学核心：
    截面左侧长 L = vt 的一段柱体内共有 N = nSvt 个自由电子，
    它们在时间 t 内全部通过横截面 S，所以 q = neSvt ⇒ I = q/t = neSv。

  物理逻辑与视觉规约（完美继承第 9 页动效与 3D 导管架构）：
    1. 真实 3D 金属导线立体透视（两端椭圆截面 + 柱体金属光泽渐变）：
       - 左端截面椭圆：外侧观察面，整洁完整立体椭圆，中间绝无纵向灰线；
       - 右端截面椭圆：左半部分为虚线（透视穿透内壁），右半部分实线；
       - 上下母线高光线，晶格 Cu²⁺ 正离子固定背景微光阵列；
    2. 真实 60FPS 自由电子定向漂移流（右出左进，连续平滑循环刷新）：
       - 10 个小巧精致自由电子（r = 5.5px，发光微球，内嵌清晰减号 −）；
       - 每个电子均带有向右的定向漂移速度矢量微箭头（→ v）；
       - 伴随自然逼真的微观热运动微扰动与导体内壁弹性反射；
       - 电子漂移穿出右边界 (x >= 420) 后，在左边界 (x = 40) 相同纵坐标 y 平滑循环归位；
    3. 横截面 S：立体椭圆剖切（前实后虚，径向发光截面），顶部引线指示“横截面 S”；
    4. 自由电子数密度 n 与定向移动平均速率 v 标识严密规范；
    5. step >= 2 中间推导步骤与柱体 L = vt 展开：
       - 展开长度为 L = vt 的立体柱体微元（体积 V = SL = Svt），柱体通体淡金发光；
       - 柱体内自由电子高光识别（代表将在时间 t 内穿过 S 的 N 个电子）；
       - 柱体上方醒目标注：N = nSvt（柱体内自由电子数）；
       - 柱体下方精准尺寸线与标注：L = vt（柱长）；
       - 底部学术结论：通过电荷量 q = neSvt ⇒ 电流微观表达式 I = q/t = neSv；
    6. 纯净全局 CSS 变量（零 fallback 冗余），无固定 width 属性，完美自适应 Slidev。
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  /** 讲台/课件步进: 1: 导线基本参量 (数密度 n、横截面 S、定向漂移平均速率 v) + 自由电子定向流动 2: 展开微观柱体 (L = vt)、电子数 N = nSvt、电荷量 q = neSvt 与微观表达式 I = neSv 默认 2 */
  step?: number;
}

const { step = 2 } = defineProps<Props>();

// 文字光晕
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.4,
  "paint-order": "stroke",
} as const;

// ══════════════ 几何坐标常数（与第 9 页完美对齐） ══════════════
const X_MIN = 40;
const X_MAX = 420;
const Y_TOP = 70;
const Y_BOTTOM = 170;
const Y_MID = (Y_TOP + Y_BOTTOM) / 2; // 120
const RY = (Y_BOTTOM - Y_TOP) / 2; // 50
const RX = 10; // 截面椭圆半轴长
const R_ELEC = 5.5; // 电子半径小巧精致

// 碰撞边界
const BORDER_TOP = Y_TOP + R_ELEC + 3; // 78.5
const BORDER_BOTTOM = Y_BOTTOM - R_ELEC - 3; // 161.5

// 横截面 S 位置
const X_SEC = 336;

// 时间 t 内通过横截面的柱体微元左界 (L = vt = 150px)
const X_COL_START = 186;

// ══════════════ 晶格正离子固定背景 (2 行 × 8 列) ══════════════
const LATTICE_IONS = [
  // 上排 (y = 96)
  { x: 80, y: 96 },
  { x: 125, y: 96 },
  { x: 170, y: 96 },
  { x: 215, y: 96 },
  { x: 260, y: 96 },
  { x: 305, y: 96 },
  { x: 350, y: 96 },
  { x: 395, y: 96 },
  // 下排 (y = 144)
  { x: 80, y: 144 },
  { x: 125, y: 144 },
  { x: 170, y: 144 },
  { x: 215, y: 144 },
  { x: 260, y: 144 },
  { x: 305, y: 144 },
  { x: 350, y: 144 },
  { x: 395, y: 144 },
];

// ══════════════ 10 个自由电子 60FPS 动态漂移状态 ══════════════
interface DerivElectron {
  id: number;
  x: number;
  y: number;
  vx: number; // 热运动水平分速度
  vy: number; // 热运动垂直分速度
  scatterTimer: number; // 碰撞计时
}

// 初始均匀分布在导线各处，特别是在柱体与两端
const initialPositions = [
  { x: 65, y: 104 },
  { x: 110, y: 136 },
  { x: 155, y: 92 },
  { x: 205, y: 148 },
  { x: 235, y: 112 },
  { x: 270, y: 140 },
  { x: 295, y: 98 },
  { x: 325, y: 126 },
  { x: 365, y: 106 },
  { x: 400, y: 142 },
];

const DRIFT_SPEED = 1.35; // 定向漂移速率 (px/frame)

const electrons = ref<DerivElectron[]>(
  initialPositions.map((pos, i) => ({
    id: i,
    x: pos.x,
    y: pos.y,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.65,
    scatterTimer: Math.floor(Math.random() * 50) + 30,
  })),
);

let animationFrameId: number | null = null;
let lastTimestamp = 0;

const updatePhysics = (dt: number): void => {
  const timeScale = Math.min(Math.max(dt / 16.6, 0.5), 1.8);

  electrons.value.forEach((e) => {
    // 1. 微扰热运动散射
    e.scatterTimer -= timeScale;
    if (e.scatterTimer <= 0) {
      e.vx = (Math.random() - 0.5) * 0.5;
      e.vy = (Math.random() - 0.5) * 0.7;
      e.scatterTimer = Math.floor(Math.random() * 60) + 30;
    }

    // 2. 位移：向右定向漂移为主，叠加微热运动
    e.x += (DRIFT_SPEED + e.vx) * timeScale;
    e.y += e.vy * timeScale;

    // 3. 上下内壁弹性碰撞
    if (e.y <= BORDER_TOP) {
      e.y = BORDER_TOP;
      e.vy = Math.abs(e.vy);
    } else if (e.y >= BORDER_BOTTOM) {
      e.y = BORDER_BOTTOM;
      e.vy = -Math.abs(e.vy);
    }

    // 4. 右出左进循环刷新：穿出右侧 (x >= 420 + R_ELEC)，从左侧 (x = 40 - R_ELEC) 平滑归位
    if (e.x >= X_MAX + R_ELEC) e.x = X_MIN - R_ELEC;
  });
};

const tick = (timestamp: number): void => {
  if (lastTimestamp === 0) lastTimestamp = timestamp;

  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  updatePhysics(dt);
  animationFrameId = requestAnimationFrame(tick);
};

onMounted(() => {
  lastTimestamp = 0;
  animationFrameId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  if (animationFrameId != null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
});
</script>

<template>
  <div class="deriv-figure-container select-none">
    <svg
      viewBox="0 0 460 252"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="I = neSv 电流微观表达式物理推导模型（动态漂移版）"
      class="select-none overflow-visible"
      style="display: block; margin: 0 auto"
    >
      <defs>
        <!-- 导线主体圆柱金属玻璃态渐变（与第 9 页完全一致） -->
        <linearGradient id="cmd-wire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.45)" />
          <stop offset="25%" stop-color="rgba(51, 65, 85, 0.25)" />
          <stop offset="50%" stop-color="rgba(96, 165, 250, 0.08)" />
          <stop offset="75%" stop-color="rgba(51, 65, 85, 0.25)" />
          <stop offset="100%" stop-color="rgba(30, 41, 59, 0.45)" />
        </linearGradient>

        <!-- 左端面椭圆立体明暗（无中间纵向灰线） -->
        <linearGradient id="cmd-cap-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.85)" />
          <stop offset="100%" stop-color="rgba(51, 65, 85, 0.4)" />
        </linearGradient>

        <!-- 右端面椭圆截面高光 -->
        <linearGradient id="cmd-cap-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(51, 65, 85, 0.5)" />
          <stop offset="100%" stop-color="rgba(96, 165, 250, 0.2)" />
        </linearGradient>

        <!-- 柱体微元金色发光渐变 (长 L = vt) -->
        <linearGradient id="cmd-column-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(226, 168, 70, 0.10)" />
          <stop offset="50%" stop-color="rgba(226, 168, 70, 0.22)" />
          <stop offset="100%" stop-color="rgba(226, 168, 70, 0.32)" />
        </linearGradient>

        <!-- 横截面 S 截面椭圆填充渐变 -->
        <radialGradient id="cmd-section-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.45)" />
          <stop offset="70%" stop-color="rgba(226, 168, 70, 0.25)" />
          <stop offset="100%" stop-color="rgba(226, 168, 70, 0.12)" />
        </radialGradient>

        <!-- 自由电子立体微球渐变 -->
        <radialGradient id="cmd-elec-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#bae6fd" />
          <stop offset="45%" stop-color="var(--c-accent-2)" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </radialGradient>

        <!-- 正离子立体金球渐变 -->
        <radialGradient id="cmd-ion-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fde68a" />
          <stop offset="60%" stop-color="rgba(226, 168, 70, 0.35)" />
          <stop offset="100%" stop-color="rgba(180, 83, 9, 0.18)" />
        </radialGradient>

        <!-- 导体内壁裁切蒙版 -->
        <clipPath id="cmd-conductor-clip">
          <rect :x="X_MIN" :y="Y_TOP" :width="X_MAX - X_MIN" :height="Y_BOTTOM - Y_TOP" rx="6" />
        </clipPath>
      </defs>

      <!-- ════════════════════════════════════════════════
           1. 导线外层圆柱体（立体透视轮廓：左端无灰线 · 右端前实后虚）
      ════════════════════════════════════════════════ -->
      <g>
        <!-- 导线主体填充 -->
        <path
          :d="`
            M ${X_MIN} ${Y_TOP}
            L ${X_MAX} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_MAX} ${Y_BOTTOM}
            L ${X_MIN} ${Y_BOTTOM}
            A ${RX} ${RY} 0 0 1 ${X_MIN} ${Y_TOP}
            Z
          `"
          fill="url(#cmd-wire-grad)"
        />

        <!-- 上下母线轮廓实线 -->
        <line :x1="X_MIN" :y1="Y_TOP" :x2="X_MAX" :y2="Y_TOP" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.9" />
        <line :x1="X_MIN" :y1="Y_BOTTOM" :x2="X_MAX" :y2="Y_BOTTOM" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.9" />

        <!-- 导线上方/下方高光轮廓线 -->
        <line :x1="X_MIN" :y1="Y_TOP + 1" :x2="X_MAX" :y2="Y_TOP + 1" stroke="rgba(255, 255, 255, 0.22)" stroke-width="1" />
        <line :x1="X_MIN" :y1="Y_BOTTOM - 1" :x2="X_MAX" :y2="Y_BOTTOM - 1" stroke="rgba(15, 23, 42, 0.7)" stroke-width="1" />

        <!-- 左端截面椭圆（外侧观察面，整洁完整立体椭圆，中间绝无任何纵向灰线） -->
        <ellipse :cx="X_MIN" :cy="Y_MID" :rx="RX" :ry="RY" fill="url(#cmd-cap-left)" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.95" />

        <!-- 右端截面椭圆底色填充 -->
        <ellipse :cx="X_MAX" :cy="Y_MID" :rx="RX" :ry="RY" fill="url(#cmd-cap-right)" stroke="none" />

        <!-- 右端截面椭圆轮廓：左半部分为虚线（透视穿透内壁） -->
        <path
          :d="`
            M ${X_MAX} ${Y_TOP}
            A ${RX} ${RY} 0 0 0 ${X_MAX} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-text)"
          stroke-width="1.6"
          stroke-dasharray="5 3.5"
          stroke-opacity="0.65"
        />

        <!-- 右端截面椭圆轮廓：右半部分为实线（外轮廓边线） -->
        <path
          :d="`
            M ${X_MAX} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_MAX} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-text)"
          stroke-width="1.6"
          stroke-opacity="0.95"
        />
      </g>

      <!-- ════════════════════════════════════════════════
           2. 晶格固定正离子背景（与第 9 页晶格一致）
      ════════════════════════════════════════════════ -->
      <g opacity="0.25" clip-path="url(#cmd-conductor-clip)">
        <g v-for="(ion, idx) in LATTICE_IONS" :key="`ion-${idx}`">
          <circle :cx="ion.x" :cy="ion.y" r="5" fill="url(#cmd-ion-grad)" stroke="var(--c-accent)" stroke-width="0.8" />
          <text :x="ion.x" :y="ion.y + 2.5" text-anchor="middle" font-size="7.5" font-weight="bold" fill="var(--c-accent)">+</text>
        </g>
      </g>

      <!-- ════════════════════════════════════════════════
           3. step >= 2: 柱体微元 (长 L = vt, 电子数 N = nSvt)
      ════════════════════════════════════════════════ -->
      <g v-if="step >= 2">
        <!-- 柱体微元筒身填充 (从 X_COL_START 到 X_SEC) -->
        <path
          :d="`
            M ${X_COL_START} ${Y_TOP}
            L ${X_SEC} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_SEC} ${Y_BOTTOM}
            L ${X_COL_START} ${Y_BOTTOM}
            A ${RX} ${RY} 0 0 0 ${X_COL_START} ${Y_TOP}
            Z
          `"
          fill="url(#cmd-column-grad)"
        />

        <!-- 柱体后侧截面椭圆（虚线透视） -->
        <path
          :d="`
            M ${X_COL_START} ${Y_TOP}
            A ${RX} ${RY} 0 0 0 ${X_COL_START} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          stroke-dasharray="5 3.5"
          stroke-opacity="0.6"
        />
        <path
          :d="`
            M ${X_COL_START} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_COL_START} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          stroke-dasharray="5 3.5"
          stroke-opacity="0.85"
        />

        <!-- 柱体上方标题：电子总数 N = nSvt -->
        <text
          :x="(X_COL_START + X_SEC) / 2"
          y="56"
          text-anchor="middle"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="18"
          font-weight="bold"
          fill="var(--c-accent)"
          :style="HALO"
        >
          N = nSvt
        </text>
        <text :x="(X_COL_START + X_SEC) / 2" y="40" text-anchor="middle" font-size="11" fill="var(--c-text-dim)" :style="HALO">柱体内自由电子总数</text>

        <!-- 尺寸双向界线与柱长 L = vt 标注 (y = 194) -->
        <line :x1="X_COL_START" :y1="Y_BOTTOM + 2" :x2="X_COL_START" y2="198" stroke="var(--c-text-dim)" stroke-width="1" stroke-opacity="0.5" />
        <line :x1="X_SEC" :y1="Y_BOTTOM + 2" :x2="X_SEC" y2="198" stroke="var(--c-accent)" stroke-width="1" stroke-opacity="0.6" />

        <line :x1="X_COL_START + 5" y1="194" :x2="X_SEC - 5" y2="194" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <polygon :points="`${X_COL_START},194 ${X_COL_START + 6},191.5 ${X_COL_START + 6},196.5`" fill="var(--c-text-dim)" />
        <polygon :points="`${X_SEC},194 ${X_SEC - 6},191.5 ${X_SEC - 6},196.5`" fill="var(--c-accent)" />

        <!-- 柱长文字（明确柱长 L = vt 与体积 V = SL = Svt） -->
        <text :x="(X_COL_START + X_SEC) / 2" y="212" text-anchor="middle" font-size="13" fill="var(--c-accent)" :style="HALO">
          <tspan font-family="KaTeX_Math, serif" font-style="italic" font-weight="bold">L = vt</tspan>
          <tspan font-size="11" fill="var(--c-text-dim)">（时间</tspan>
          <tspan font-family="KaTeX_Math, serif" font-style="italic" font-size="11.5" fill="var(--c-text-dim)">t</tspan>
          <tspan font-size="11" fill="var(--c-text-dim)">内穿过截面的柱长，柱体体积</tspan>
          <tspan font-family="KaTeX_Math, serif" font-style="italic" font-size="11.5" fill="var(--c-text-dim)">V = SL = Svt</tspan>
          <tspan font-size="11" fill="var(--c-text-dim)">）</tspan>
        </text>
      </g>

      <!-- ════════════════════════════════════════════════
           4. 10 个自由电子 60FPS 定向漂移层（裁切于内壁，右出左进）
      ════════════════════════════════════════════════ -->
      <g clip-path="url(#cmd-conductor-clip)">
        <g v-for="e in electrons" :key="`elec-${e.id}`">
          <!-- 向右定向移动速度微矢量箭头（醒目金色向右 →） -->
          <CourseArrow :from="{ x: e.x + R_ELEC, y: e.y }" :to="{ x: e.x + R_ELEC + 18, y: e.y }" stroke="var(--c-accent)" :stroke-width="2" :head-size="6.5" />

          <!-- 若在 step >= 2 且电子恰好位于柱体内，施加聚焦发光光晕 -->
          <circle v-if="step >= 2 && e.x >= X_COL_START && e.x <= X_SEC" :cx="e.x" :cy="e.y" :r="R_ELEC + 4" fill="var(--c-accent)" opacity="0.25" />

          <!-- 电子发光外晕 -->
          <circle :cx="e.x" :cy="e.y" :r="R_ELEC + 2" fill="var(--c-accent-2)" opacity="0.28" />

          <!-- 电子立体微球本体 (r = 5.5px) -->
          <circle :cx="e.x" :cy="e.y" :r="R_ELEC" fill="url(#cmd-elec-grad)" stroke="var(--c-accent-2)" stroke-width="1.2" />

          <!-- 减号「−」符号 -->
          <text :x="e.x" :y="e.y + 2.6" text-anchor="middle" font-family="KaTeX_Main, sans-serif" font-size="8.5" font-weight="bold" fill="#ffffff">−</text>
        </g>
      </g>

      <!-- ════════════════════════════════════════════════
           5. 横截面 S (立体剖切椭圆，前实后虚)
      ════════════════════════════════════════════════ -->
      <g>
        <!-- 截面椭圆底色填充 -->
        <ellipse :cx="X_SEC" :cy="Y_MID" :rx="RX" :ry="RY" fill="url(#cmd-section-grad)" />

        <!-- 后半圆弧（内壁虚线透视） -->
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

        <!-- 前半圆弧（外壁实线强对比） -->
        <path
          :d="`
            M ${X_SEC} ${Y_TOP}
            A ${RX} ${RY} 0 0 1 ${X_SEC} ${Y_BOTTOM}
          `"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2.2"
        />

        <!-- 横截面 S 标志引线与文字 -->
        <path
          :d="`
            M ${X_SEC} ${Y_TOP}
            L ${X_SEC} 38
          `"
          stroke="var(--c-accent)"
          stroke-width="1.2"
          stroke-dasharray="3 2"
          opacity="0.8"
        />
        <circle :cx="X_SEC" :cy="Y_TOP" r="2.2" fill="var(--c-accent)" />

        <text
          :x="X_SEC"
          y="32"
          text-anchor="middle"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="19"
          font-weight="bold"
          fill="var(--c-accent)"
          :style="HALO"
        >
          S
        </text>
        <text :x="X_SEC" y="18" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)" :style="HALO">横截面</text>
      </g>

      <!-- ════════════════════════════════════════════════
           6. 基础物理参量：自由电子数密度 n 与平均速率 v
      ════════════════════════════════════════════════ -->
      <g>
        <!-- 左侧数密度 n 标注 -->
        <g transform="translate(68, 120)">
          <rect
            x="-14"
            y="-15"
            width="28"
            height="30"
            rx="5"
            fill="rgba(59, 130, 246, 0.12)"
            stroke="var(--c-accent-2)"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <text
            x="0"
            y="6"
            text-anchor="middle"
            font-family="KaTeX_Math, serif"
            font-style="italic"
            font-size="20"
            font-weight="bold"
            fill="var(--c-accent-2)"
            :style="HALO"
          >
            n
          </text>
          <text x="0" y="27" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)" :style="HALO">数密度</text>
        </g>

        <!-- 上方电子定向移动速率矢量 v -->
        <CourseArrow :from="{ x: 110, y: 52 }" :to="{ x: 175, y: 52 }" stroke="var(--c-accent)" :stroke-width="2.2" label="v" :label-dy="-9" :head-size="7.5" />
        <text x="142" y="38" text-anchor="middle" font-size="11" fill="var(--c-text-dim)" :style="HALO">定向移动平均速率</text>
      </g>

      <!-- ════════════════════════════════════════════════
           7. 底部学术结论与微观公式推导 (step >= 2 完整呈现)
      ════════════════════════════════════════════════ -->
      <g v-if="step >= 2">
        <text x="230" y="238" text-anchor="middle" font-size="14" :style="HALO">
          <tspan fill="var(--c-text-dim)">通过电荷量</tspan>
          <tspan font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-accent)" font-weight="bold">q = Ne = neSvt</tspan>
          <tspan fill="var(--c-text-dim)">⇒ 电流微观表达式：</tspan>
          <tspan font-family="KaTeX_Math, serif" font-style="italic" font-size="16" font-weight="bold" fill="var(--c-accent)">I =</tspan>
          <tspan font-family="KaTeX_Math, serif" font-style="italic" font-size="16" font-weight="bold" fill="var(--c-accent)">q / t = neSv</tspan>
        </text>
      </g>
      <g v-else>
        <!-- step 1 引导 -->
        <text x="230" y="238" text-anchor="middle" font-size="13.5" fill="var(--c-text-dim)" :style="HALO">
          自由电子沿导线定向漂移 · 思考时间
          <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
          内有多少电荷穿过横截面
          <tspan font-family="KaTeX_Math" font-style="italic">S</tspan>
          ？（点击下一步展开柱体推导）
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.deriv-figure-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
