<!--
  选必2 1.x《复合场中的配速法与摆线运动》章末综合题（例 7）配图：
  第 I 象限沿 −y 的匀强电场 E；第 II、III、IV 象限垂直纸面向外的匀强磁场 B（⊙）。
  正电粒子从 P(0, b) 以 v₀ 水平射入，经 Q(a, 0) 进第四象限，绕 IV→III→II 后回到 +y 轴。
  step 0：干净题目图（坐标轴、E / B 区域、P、Q、v₀、b、a 标注）；
  step ≥1：第一象限的类平抛轨迹 P→Q（解析第(1)问用）；
  step ≥2：Q 点速度 v、圆心 C / 半径 R、磁场中的圆周轨迹与 x 轴另一交点（解析第(2)问用）；
  step ≥3：回到 +y 轴处的速度方向与“与 +y 轴夹角小于 90°”的判据。
  几何按题给量 a、b 与一个落在合法区间内的 R 真实计算，不是照样子描的。
-->
<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{
  /** 显示到第几步分析：0 = 干净题目图 */
  step?: number;
}>();

const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";

/** 画布（viewBox 用户单位） */
const W = 470;
const H = 420;

/** 原点 O 与题给量 a、b（画布单位；几何比例与题干一致即可） */
const O = { x: 250, y: 190 };
const A = 140;
const BB = 80;
const P = { x: O.x, y: O.y - BB };
const Q = { x: O.x + A, y: O.y };
const X_LEFT = 42;
const X_END = 458;
const Y_TOP = 38;
const Y_BOT = 405;

/** 进入 Q 点时速度与 +x 轴夹角 θ：sinθ = 2b/√(a²+4b²)，cosθ = a/√(a²+4h²) */
const LEN = Math.hypot(A, 2 * BB);
const SIN = (2 * BB) / LEN;
const COS = A / LEN;
const THETA = Math.atan2(SIN, COS);

/** 取一个落在合法区间 a/(2sinθ) < R < a/sinθ 内的半径（画布单位） */
const R = 120;

/** 圆心 C（画布坐标；y 向下）：物理上 C = (a − R sinθ, −R cosθ) */
const C = { x: Q.x - R * SIN, y: Q.y + R * COS };
/** X_C = a − R sinθ（物理坐标里的圆心横坐标） */
const XC = C.x - O.x;

/** 物理坐标（y 向上）里的圆上点 → 画布坐标 */
const pt = (phi: number): { x: number; y: number } => ({
  x: C.x + R * Math.cos(phi),
  y: C.y - R * Math.sin(phi),
});

/** Q 点在圆上的极角（物理坐标）：∠(圆心→Q) 与 +x 轴夹角 = π/2 − θ */
const PHI_Q = Math.PI / 2 - THETA;

/** 回到 +y 轴处（圆上 x = 0 的上交点）的极角：cosφ = −x_C/R，取上半圆 */
const PHI_CROSS = Math.PI - Math.acos(XC / R);

/** 顺时针转过的终点（极角从 PHI_Q 一路减小） */
const PHI_STOP = PHI_CROSS - 2 * Math.PI;

/** 磁场中的轨迹：Q → 第四象限 → 负 y 轴 → 第三象限 → x 轴负半轴 → 第二象限 → +y 轴 */
const arcD = computed(() => {
  const N = 90;
  let d = "";

  for (let i = 0; i <= N; i++) {
    const phi = PHI_Q + ((PHI_STOP - PHI_Q) * i) / N;
    const p = pt(phi);

    d += `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }

  return d.trim();
});

/** 第一象限类平抛轨迹：x = a·s，y = b·s²（画布坐标） */
const parabolaD = computed(() => {
  const N = 60;
  let d = "";

  for (let i = 0; i <= N; i++) {
    const s = i / N;
    const x = P.x + A * s;
    const y = P.y + BB * s * s;

    d += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }

  return d.trim();
});

/** 回到 +y 轴的位置（画布坐标） */
const CROSS = computed(() => ({
  x: O.x,
  y: C.y - Math.sqrt(R * R - XC * XC),
}));

/** 回到 +y 轴处的速度方向（画布坐标，y 向下）：顺时针、与半径垂直 */
const CROSS_VEL = computed(() => {
  const vx = Math.sqrt(R * R - XC * XC);
  const vy = XC;
  const len = Math.hypot(vx, vy);

  return { x: vx / len, y: -vy / len };
});

/** 回到 +y 轴处的速度箭头终点 */
const CROSS_TIP = computed(() => ({
  x: CROSS.value.x + CROSS_VEL.value.x * 54,
  y: CROSS.value.y + CROSS_VEL.value.y * 54,
}));

/** Q 点速度箭头终点（与抛物线相切：方向 (cosθ, sinθ)，画布 y 向下） */
const Q_TIP = { x: Q.x + COS * 52, y: Q.y + SIN * 52 };

/** 与 x 轴的另一交点（画布坐标）：x₂ = a − 2R sinθ */
const X2 = computed(() => ({ x: Q.x - 2 * R * SIN, y: O.y }));

/** E 场箭头：铺满第一象限的长箭头，箭头尖端尽量贴近 x 轴上方（题给元素 P、v₀ 处留白） */
const E_ARROWS = [
  { from: { x: 310, y: 52 }, to: { x: 310, y: 180 } },
  { from: { x: 355, y: 52 }, to: { x: 355, y: 180 } },
  { from: { x: 400, y: 52 }, to: { x: 400, y: 180 } },
  { from: { x: 443, y: 52 }, to: { x: 443, y: 180 } },
];
</script>

<template>
  <svg
    :viewBox="`0 0 ${W} ${H}`"
    role="img"
    aria-label="第一象限电场、其余三象限磁场中带电粒子的偏转与圆周运动"
  >
    <!-- 坐标轴 -->
    <CourseArrow
      :from="{ x: X_LEFT, y: O.y }"
      :to="{ x: X_END, y: O.y }"
      stroke="var(--c-text-dim)"
      :stroke-width="1.5"
    />
    <CourseArrow
      :from="{ x: O.x, y: Y_BOT }"
      :to="{ x: O.x, y: Y_TOP }"
      stroke="var(--c-text-dim)"
      :stroke-width="1.5"
    />
    <text
      :x="X_END + 4"
      :y="O.y + 17"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="16"
      fill="var(--c-text-dim)"
    >
      x
    </text>
    <text
      :x="O.x + 9"
      :y="Y_TOP + 3"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="16"
      fill="var(--c-text-dim)"
    >
      y
    </text>
    <text
      :x="O.x - 17"
      :y="O.y + 17"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="14"
      fill="var(--c-text-dim)"
    >
      O
    </text>

    <!-- 第 II、III、IV 象限：垂直纸面向外的磁场（裸点阵列） -->
    <FieldDots :x="74" :y="54" :cols="7" :rows="5" :spacing="24" dir="out" />
    <FieldDots :x="74" :y="226" :cols="7" :rows="7" :spacing="24" dir="out" />
    <FieldDots :x="322" :y="226" :cols="5" :rows="7" :spacing="24" dir="out" />

    <!-- 第 I 象限：沿 −y 的匀强电场 -->
    <CourseArrow
      v-for="(e, i) in E_ARROWS"
      :key="`e-${i}`"
      :from="e.from"
      :to="e.to"
      stroke="var(--c-physics)"
      :stroke-width="2.2"
    />
    <text
      x="310"
      y="42"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="16"
      fill="var(--c-physics)"
      text-anchor="middle"
    >
      E
    </text>

    <!-- 题给元素：P、Q、h、a、v₀ -->
    <circle :cx="P.x" :cy="P.y" r="3.4" fill="var(--c-text)" />
    <circle :cx="Q.x" :cy="Q.y" r="3.4" fill="var(--c-text)" />
    <text
      :x="P.x - 9"
      :y="P.y - 9"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="16"
      fill="var(--c-text)"
      text-anchor="end"
    >
      P
    </text>
    <text
      :x="Q.x + 8"
      :y="Q.y + 19"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="16"
      fill="var(--c-text)"
    >
      Q
    </text>
    <text
      :x="O.x - 9"
      :y="P.y + BB / 2 + 5"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="15"
      fill="var(--c-text-dim)"
      text-anchor="end"
    >
      b
    </text>
    <text
      :x="O.x + A / 2"
      :y="O.y + 21"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="15"
      fill="var(--c-text-dim)"
      text-anchor="middle"
    >
      a
    </text>
    <CourseArrow
      :from="P"
      :to="{ x: P.x + 52, y: P.y }"
      stroke="var(--c-velocity)"
      :stroke-width="3"
    />
    <text
      :x="P.x + 16"
      :y="P.y - 11"
      :font-family="MATH_FONT"
      font-style="italic"
      font-size="16"
      fill="var(--c-velocity)"
    >
      v
      <tspan dy="5" font-size="11">0</tspan>
    </text>

    <!-- 第(1)问：第一象限的类平抛轨迹 -->
    <g v-if="step >= 1">
      <path
        :d="parabolaD"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="2.4"
        stroke-dasharray="7 5"
      />
    </g>

    <!-- 第(2)问：Q 点速度、圆心 C、半径 R、磁场中的圆周轨迹 -->
    <g v-if="step >= 2">
      <circle
        :cx="C.x"
        :cy="C.y"
        :r="R"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.3"
        stroke-dasharray="5 6"
        opacity="0.5"
      />
      <path :d="arcD" fill="none" stroke="var(--c-velocity)" stroke-width="2.6" />
      <line
        :x1="C.x"
        :y1="C.y"
        :x2="Q.x"
        :y2="Q.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="4 4"
      />
      <circle :cx="C.x" :cy="C.y" r="3" fill="var(--c-text-dim)" />
      <text
        :x="C.x - 12"
        :y="C.y + 18"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="15"
        fill="var(--c-text-dim)"
      >
        C
      </text>
      <text
        :x="(C.x + Q.x) / 2 + 7"
        :y="(C.y + Q.y) / 2 + 14"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="15"
        fill="var(--c-text-dim)"
      >
        R
      </text>
      <CourseArrow :from="Q" :to="Q_TIP" stroke="var(--c-velocity)" :stroke-width="2.8" />
      <text
        :x="Q_TIP.x + 5"
        :y="Q_TIP.y + 5"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="15"
        fill="var(--c-velocity)"
      >
        v
      </text>
      <circle :cx="X2.x" :cy="X2.y" r="3.2" fill="var(--c-accent)" />
      <text
        :x="X2.x"
        :y="X2.y + 18"
        :font-family="MATH_FONT"
        font-size="13"
        fill="var(--c-accent)"
        text-anchor="middle"
      >
        <tspan font-style="italic">x</tspan>
        <tspan dy="4" font-size="10">2</tspan>
      </text>
    </g>

    <!-- 回到 +y 轴：速度方向与 +y 轴夹角判据 -->
    <g v-if="step >= 3">
      <circle :cx="CROSS.x" :cy="CROSS.y" r="3.6" fill="var(--c-accent)" />
      <CourseArrow :from="CROSS" :to="CROSS_TIP" stroke="var(--c-velocity)" :stroke-width="2.8" />
      <line
        :x1="C.x"
        :y1="C.y"
        :x2="O.x"
        :y2="C.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.3"
        stroke-dasharray="4 4"
      />
      <text
        :x="(C.x + O.x) / 2"
        :y="C.y - 6"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="13"
        fill="var(--c-text-dim)"
        text-anchor="middle"
      >
        x
        <tspan dy="3" font-size="10">C</tspan>
      </text>
      <text
        :x="CROSS_TIP.x - 5"
        :y="CROSS_TIP.y - 5"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="15"
        fill="var(--c-velocity)"
        text-anchor="end"
      >
        v′
      </text>
    </g>
  </svg>
</template>
