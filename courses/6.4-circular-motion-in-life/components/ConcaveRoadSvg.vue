<script setup lang="ts">
import { useId } from "vue";

/**
 * 汽车通过凹形路面最低点 —— 6.4 生活中的圆周运动 干净版只画凹形路面与最低点的汽车；`showForces` 打开后再补上重力 G、 支持力 F_N（明显比 G 长）与合力 F合（= F_N − G，竖直向上、与 F_N 同向）与半径 r 辅助虚线。 分步用 visibility
 * 占位（只隐藏不删除），点击时已画出的内容不会位移。
 */
const { showForces = false } = defineProps<{
  /** 点击后出现：G、F_N、F合 与半径 r 的辅助虚线 */
  showForces?: boolean;
}>();

/* ── 凹形路面：圆心在路面上方，谷底（最低点）在 (230, 216) ── */
const R = 196;
const O = { x: 230, y: 20 };
/** 圆弧半张角（度）：只画谷底附近这段圆弧，两侧再用**切线**平缓延伸到画布边缘 */
const HALF = 20;
/** 路面厚度（把路面线整体下移这么多，围出一条有厚度的路面） */
const SLAB = 11;
const VIEW_W = 460;
const VIEW_H = 300;

/** 圆弧的起止点（谷底居中、左右对称） */
const halfAngle = (HALF * Math.PI) / 180;
const arcStart = { x: O.x - R * Math.sin(halfAngle), y: O.y + R * Math.cos(halfAngle) };
const arcEnd = { x: O.x + R * Math.sin(halfAngle), y: O.y + R * Math.cos(halfAngle) };

/** 圆弧内除去两端点的中间点（两端点直接与切线相接，切线连续 = 看不出接缝） */
const arcPoints = Array.from({ length: 39 }, (_, i) => {
  const deg = -HALF + (2 * HALF * (i + 1)) / 40;
  const a = (deg * Math.PI) / 180;

  return { x: O.x + R * Math.sin(a), y: O.y + R * Math.cos(a) };
});

/** 切线斜率（路面两侧：每向右 1 单位下降这么多） */
const slope = Math.tan(halfAngle);
/** 路面的完整走向：左侧切线 → 圆弧 → 右侧切线，两端正好落在画布左右边界 */
const surfacePts = [{ x: 0, y: arcStart.y - slope * arcStart.x }, ...arcPoints, { x: VIEW_W, y: arcEnd.y - slope * (VIEW_W - arcEnd.x) }];

const toPath = (pts: { x: number; y: number }[]): string => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

/** 路面线 */
const surfacePath = toPath(surfacePts);
/** 路面向下平移 SLAB 后反向接回，围成"有厚度"的路面板 */
const slabPath = toPath([...surfacePts].reverse().map((p) => ({ x: p.x, y: p.y + SLAB })));
const roadBandPath = `${surfacePath} ${slabPath.replace(/^M/u, "L")} Z`;
/** 路面以下的土体：一路围到画布底边，用渐隐填充当阴影 */
const groundPath = `${surfacePath} L ${VIEW_W} ${VIEW_H} L 0 ${VIEW_H} Z`;

// 路面（圆弧段）在横坐标 x 处的高度——两个车轮正好贴在路面上
const surfaceY = (x: number): number => O.y + Math.sqrt(R * R - (x - O.x) ** 2);

/* ── 汽车：车轮贴路面、车身压在轮子上，整车对称于谷底竖线 ── */
const WHEEL_R = 12;
const wheelY = surfaceY(196) - WHEEL_R;
const bodyTop = wheelY - 33;
const bodyBottom = wheelY - 5;
const cabinTop = bodyTop - 21;
/** 受力起点：汽车的几何中心 */
const carCenter = { x: 230, y: (bodyTop + bodyBottom) / 2 };

/* ── 三力都从几何中心出发：F_N（向上，长）− G（向下，短）= F合（向上） ── */
const G_LEN = 58;
const FN_LEN = 100;
const gTip = { x: carCenter.x, y: carCenter.y + G_LEN };
const nTip = { x: carCenter.x, y: carCenter.y - FN_LEN };
/** 合力与 F_N 同向（竖直向上）：为不与 F_N 线段重叠，整条平移到右侧，用水平虚线对齐中心高度 */
const F_X = 300;
const fTip = { x: F_X, y: carCenter.y - (FN_LEN - G_LEN) };

/** 半径辅助虚线：从圆心竖直向下指向谷底，画到 F_N 箭头尖端之上（不与箭头叠在一起） */
const radiusDash = { y1: O.y + 6, y2: nTip.y - 20 };

const groundGradientId = `concave-ground-${useId()}`;
</script>

<template>
  <div>
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="汽车通过凹形路面最低点：重力竖直向下，支持力竖直向上且大于重力，合力竖直向上"
    >
      <defs>
        <linearGradient :id="groundGradientId" x1="0" y1="130" x2="0" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
          <stop offset="1" stop-color="color-mix(in srgb, var(--c-text-dim) 2%, transparent)" />
        </linearGradient>
      </defs>
      <!-- 路面：土体渐隐 + 有厚度的路面板 + 路面线 -->
      <path :d="groundPath" :fill="`url(#${groundGradientId})`" />
      <path :d="roadBandPath" fill="color-mix(in srgb, var(--c-text-dim) 24%, transparent)" />
      <path :d="surfacePath" fill="none" stroke="var(--c-text-dim)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 汽车：停在谷底，车轮贴在路面上 -->
      <g>
        <rect x="182" :y="bodyTop" width="96" :height="bodyBottom - bodyTop" rx="9" fill="color-mix(in srgb, var(--c-velocity) 22%, transparent)" stroke="var(--c-velocity)" stroke-width="2.4" />
        <path
          :d="`M 199 ${bodyTop} L 209 ${cabinTop} L 249 ${cabinTop} L 259 ${bodyTop}`"
          fill="color-mix(in srgb, var(--c-velocity) 22%, transparent)"
          stroke="var(--c-velocity)"
          stroke-width="2.4"
          stroke-linejoin="round"
        />
        <path :d="`M 206 ${bodyTop - 3} L 214 ${cabinTop + 5} L 244 ${cabinTop + 5} L 252 ${bodyTop - 3} Z`" fill="rgba(191,219,254,0.28)" />
        <circle cx="196" :cy="wheelY" :r="WHEEL_R" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
        <circle cx="264" :cy="wheelY" :r="WHEEL_R" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
        <circle cx="196" :cy="wheelY" r="4.4" fill="color-mix(in srgb, var(--c-text-dim) 90%, transparent)" />
        <circle cx="264" :cy="wheelY" r="4.4" fill="color-mix(in srgb, var(--c-text-dim) 90%, transparent)" />
      </g>
      <!-- 受力分析：点击后才出现（visibility 占位，不顶跑已有元素） -->
      <g :class="{ 'bridge-hidden': !showForces }">
        <line :x1="O.x" :y1="radiusDash.y1" :x2="O.x" :y2="radiusDash.y2" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="8 7" opacity="0.8" />
        <text :x="O.x + 11" y="48" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text-dim)">r</text>
        <line
          :x1="carCenter.x + 52"
          :y1="carCenter.y"
          :x2="F_X"
          :y2="carCenter.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="6 6"
          opacity="0.65"
        />
        <CourseArrow :from="carCenter" :to="gTip" stroke="var(--c-force)" :stroke-width="3.4" />
        <CourseArrow :from="carCenter" :to="nTip" stroke="var(--c-physics)" :stroke-width="3.4" />
        <CourseArrow :from="{ x: F_X, y: carCenter.y }" :to="fTip" stroke="var(--c-accent)" :stroke-width="3.4" />
        <text x="242" y="90" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-physics)">F</text>
        <text x="255" y="98" font-family="KaTeX_Main" font-size="13" fill="var(--c-physics)">N</text>
        <text x="242" y="243" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-force)">G</text>
        <text x="312" y="146" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-accent)">F</text>
        <text x="325" y="155" font-family="KaTeX_Main" font-size="13" fill="var(--c-accent)">合</text>
        <!-- 圆弧的圆心 O：半径 r 由它量起，与受力分析同时出现 -->
        <circle :cx="O.x" :cy="O.y" r="4.2" fill="var(--c-text-dim)" opacity="0.85" />
        <text x="212" y="40" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text-dim)">O</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.bridge-hidden {
  visibility: hidden;
}
</style>
