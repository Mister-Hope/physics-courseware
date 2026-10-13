<script setup lang="ts">
/**
 * 弯道横截面（外轨高于内轨）—— 6.4 生活中的圆周运动 干净版：倾斜的路基断面（含下方斜线阴影）、两条钢轨（外轨高、内轨低）、平放在轨道上的车厢， 以及路基倾角 θ（水平参考虚线 + 圆弧 + 标注）。 `showForces` 打开后再补上钢轨对火车的支持力 F_N（垂直路面）、重力 G
 * 与二者沿水平方向指向圆心的合力 F_合： 三个力都从车厢的几何中心出发，用虚线补出平行四边形（G + F_N = F_合）。 分步用 visibility 占位（只隐藏不删除），点击出现受力时已画出的内容不会位移。
 *
 * 几何按"局部坐标系"书写：原点在路基顶面上（θ 的顶点），局部 x 沿顶面向右上， 局部 y 垂直于顶面、指向路基内部；静态部分整体放进 `translate(P) rotate(-15)`， 受力与标注用 toPage() 换算成页面坐标，两者严格对齐。
 */
const { showForces = false } = defineProps<{
  /** 点击后出现：G、F_N 与合力 F_合，以及平行四边形虚线 */
  showForces?: boolean;
}>();

/** 路基倾角（示意图取 15°：既看得出高度差，又能把合力画清楚） */
const ANG = (15 * Math.PI) / 180;
const COS = Math.cos(ANG);
const SIN = Math.sin(ANG);
const TAN = Math.tan(ANG);

/** 局部坐标原点（θ 顶点）：路基顶面左端、水平参考虚线与路基的交点 */
const P = { x: 60, y: 234 };

// 局部坐标 → 页面坐标
const toPage = (lx: number, ly: number): { x: number; y: number } => ({
  x: P.x + lx * COS + ly * SIN,
  y: P.y - lx * SIN + ly * COS,
});

/* ── 路基断面与钢轨（局部坐标） ── */
const SLAB = { left: -18, right: 286, thick: 17 };
const RAIL_W = 14;
const RAIL_H = 9;
const INNER_RAIL = 76;
const OUTER_RAIL = 208;

/* ── 车厢（局部坐标）：车厢体、转向架与车轮 ── */
const CAR = { x: 64, y: -126, w: 166, h: 68, r: 11 };
const BOGIE = { x: 74, y: -62, w: 150, h: 30 };
const WHEEL_R = 13;
/** 车轮正好落在各自钢轨顶面上（外轨那侧整体被抬得更高） */
const WHEELS = [
  { x: INNER_RAIL + RAIL_W / 2, y: -22, stroke: "#94a3b8" },
  { x: OUTER_RAIL + RAIL_W / 2, y: -22, stroke: "#cbd5e1" },
];
/** 车厢几何中心（受力都从这里出发） */
const carCenter = toPage(CAR.x + CAR.w / 2, CAR.y + CAR.h / 2);

/* ── 受力：G 竖直向下、F_N 垂直路面、F_合 水平指向圆心，三者构成平行四边形 ── */
/** 重力矢量长度：尖端正好留在路面上方（画进路基里就糊了） */
const G_LEN = 88;
const gTip = { x: carCenter.x, y: carCenter.y + G_LEN };
/** 支持力垂直路面，长度取 G/cosθ，合力才严格水平 */
const nTip = { x: carCenter.x - G_LEN * TAN, y: carCenter.y - G_LEN };
/** 二者合力严格水平、指向圆心 */
const fTip = { x: carCenter.x - G_LEN * TAN, y: carCenter.y };

/* ── 内轨 / 外轨标注：贴在路基断面里、各自钢轨的正下方 ── */
const innerLabel = toPage(INNER_RAIL + RAIL_W / 2, 11);
const outerLabel = toPage(OUTER_RAIL + RAIL_W / 2, 11);

/* ── 倾角 θ：水平参考虚线端点与圆弧 ── */
const THETA_R = 62;
/** 水平参考线端点（从 P 沿水平方向向右） */
const thetaRef = { x: P.x + THETA_R, y: P.y };
/** 圆弧：从沿路基顶面（局部角 0°）转到水平（局部角 15°，即页面上的水平方向） */
const thetaArc = Array.from({ length: 17 }, (_, i) => {
  const phi = (i / 16) * ANG;
  const point = toPage(THETA_R * Math.cos(phi), THETA_R * Math.sin(phi));

  return `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
}).join(" ");
</script>

<template>
  <div class="banked">
    <svg viewBox="36 4 312 269" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="弯道横截面：外轨高于内轨，标出倾角与火车受到的力">
      <defs>
        <linearGradient id="banked-slab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(71,85,105,0.95)" />
          <stop offset="1" stop-color="rgba(23,33,55,0.92)" />
        </linearGradient>
        <linearGradient id="banked-car" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(96,165,250,0.36)" />
          <stop offset="1" stop-color="rgba(37,99,235,0.20)" />
        </linearGradient>
      </defs>
      <!-- 路基断面 + 两条钢轨 + 车厢（整体绕原点转 -15°，外轨那一端抬高） -->
      <g :transform="`translate(${P.x} ${P.y}) rotate(-15)`">
        <rect :x="SLAB.left" y="0" :width="SLAB.right - SLAB.left" :height="SLAB.thick" fill="url(#banked-slab)" />
        <SurfaceHatch
          :from="{ x: SLAB.left, y: SLAB.thick }"
          :to="{ x: SLAB.right, y: SLAB.thick }"
          side="below"
          :thickness="13"
          :gap="20"
          color="rgba(148,163,184,0.55)"
          :line-width="1.6"
          :hatch-width="1.1"
        />
        <!-- 内轨（低）与外轨（高） -->
        <rect :x="INNER_RAIL" :y="-RAIL_H" :width="RAIL_W" :height="RAIL_H" fill="#94a3b8" />
        <rect :x="INNER_RAIL" :y="-RAIL_H" :width="RAIL_W" height="2.6" fill="#cbd5e1" />
        <rect :x="OUTER_RAIL" :y="-RAIL_H" :width="RAIL_W" :height="RAIL_H" fill="#cbd5e1" />
        <rect :x="OUTER_RAIL" :y="-RAIL_H" :width="RAIL_W" height="2.6" fill="#f1f5f9" />
        <!-- 车厢：车轮 → 转向架 → 车厢体 -->
        <circle v-for="wheel in WHEELS" :key="wheel.x" :cx="wheel.x" :cy="wheel.y" :r="WHEEL_R" fill="#1e293b" :stroke="wheel.stroke" stroke-width="1.8" />
        <rect :x="BOGIE.x" :y="BOGIE.y" :width="BOGIE.w" :height="BOGIE.h" rx="4" fill="#1e293b" stroke="rgba(148,163,184,0.45)" stroke-width="1.2" />
        <rect :x="CAR.x" :y="CAR.y" :width="CAR.w" :height="CAR.h" :rx="CAR.r" fill="url(#banked-car)" stroke="#60a5fa" stroke-width="2.4" />
        <rect :x="CAR.x + 12" :y="CAR.y + 7" :width="CAR.w - 24" height="22" rx="6" fill="rgba(191,219,254,0.13)" />
      </g>
      <!-- 倾角 θ：水平参考虚线 + 圆弧 + 标注 -->
      <line :x1="P.x" :y1="P.y" :x2="thetaRef.x" :y2="thetaRef.y" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="7 6" opacity="0.7" />
      <path :d="thetaArc" fill="none" stroke="#e2a846" stroke-width="2.2" />
      <text
        x="112"
        y="228"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#e2a846"
        stroke="#0b1020"
        stroke-width="4"
        paint-order="stroke"
      >
        θ
      </text>
      <!-- 钢轨标注 -->
      <text :x="innerLabel.x" :y="innerLabel.y" text-anchor="middle" font-size="16" fill="#94a3b8">内轨</text>
      <text :x="outerLabel.x" :y="outerLabel.y" text-anchor="middle" font-size="16" fill="#cbd5e1">外轨</text>
      <g :class="{ 'vp-hidden': !showForces }">
        <!-- 平行四边形虚线：G 与 F_N 合成 F_合 -->
        <line :x1="gTip.x" :y1="gTip.y" :x2="fTip.x" :y2="fTip.y" stroke="rgba(148,163,184,0.6)" stroke-width="1.4" stroke-dasharray="7 6" />
        <line :x1="nTip.x" :y1="nTip.y" :x2="fTip.x" :y2="fTip.y" stroke="rgba(148,163,184,0.6)" stroke-width="1.4" stroke-dasharray="7 6" />
        <!-- 三个力都从车厢几何中心出发 -->
        <CourseArrow :from="carCenter" :to="gTip" stroke="#f87171" :stroke-width="3.6" />
        <CourseArrow :from="carCenter" :to="nTip" stroke="#2dd4bf" :stroke-width="3.6" />
        <CourseArrow :from="carCenter" :to="fTip" stroke="#e2a846" :stroke-width="4.2" />
        <text
          :x="gTip.x + 12"
          :y="gTip.y - 3"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="#f87171"
          stroke="#0b1020"
          stroke-width="4"
          paint-order="stroke"
        >
          G
        </text>
        <text
          :x="nTip.x + 12"
          :y="nTip.y + 8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="#2dd4bf"
          stroke="#0b1020"
          stroke-width="4"
          paint-order="stroke"
        >
          F
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="15" dy="4">N</tspan>
        </text>
        <text
          :x="fTip.x - 10"
          :y="fTip.y + 8"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="#e2a846"
          stroke="#0b1020"
          stroke-width="4"
          paint-order="stroke"
        >
          F
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="15" dy="4">合</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.banked {
  min-width: 0;
}

.banked svg {
  display: block;
  width: 100%;
  height: auto;
}

.vp-hidden {
  visibility: hidden;
}
</style>
