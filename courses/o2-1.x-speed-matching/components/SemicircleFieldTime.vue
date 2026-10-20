<!--
  选必二 1.x《复合场中的配速法与摆线运动》· 章末补充例题（例 9）配图
  ── 题面（slides.md 给出，本组件只画图）──
     xOy 平面的第 I、IV 象限内有一圆心 O、半径 R 的半圆形匀强磁场（边界无磁场）；
     线状粒子源从 y 轴左侧平行于 +x 不断射入质量为 m、电荷量 +q、速度 v0 的粒子；
     B = mv0/(2qR)、垂直纸面向里 ⟹ 轨迹半径 r = mv0/(qB) = 2R，且圆心 O′ 必在 y 轴上。
  ── 分步（step）──
     step 0（试卷原图）：xOy 坐标轴 + 圆心 O + 半径 R 的半圆形磁场（虚线边界、半圆内 × 点阵）
             + 线状粒子源（一排水平箭头，标 v0）+ 半径 R 标注。不含任何分析标注。
     step ≥1：临界情形的轨迹 —— 半径 r = 2R 的粗弧 D′→E′、圆心 O′（在 y 轴上）与半径 O′D′，标 2R。
     step ≥2：标入射点 D′、出射点 E′（边界圆弧上）与圆心角 α（O′ 处、O′D′ 与 O′E′ 之间），
             用水平虚线把 E′ 到 y 轴的距离 x_E 标出来，图上写 sinα = x_E/r。
     step ≥3：临界位置 —— E′ 恰在 x 轴上（半圆边界最右点、x_E = R）加高亮环，并标 α_max = π/6、t = T/12。
  ── 几何（全部按题给条件精确算，不是描图）──
     取 R = 150（viewBox 用户单位，按 16px 体系）；数学坐标（y 向上）→ SVG 坐标（y 向下）：
     X = x + 225、Y = 300 − y。于是
       O = (225, 300)、O′ = (0, √3R) = (225, 40.19)、D′ = (0, (√3−2)R) = (225, 340.19)、E′ = (R, 0) = (375, 300)。
     轨迹半径 2R = 300，圆弧按 φ ∈ [0, π/6] 采样：x = 2R·sinφ、y = O′y + 2R·cosφ
     （φ = 0 落在 D′、φ = π/6 落在 E′）——|O′D′| = |O′E′| = 2R、∠D′O′E′ = π/6，与题解一致。
     轨迹圆其余部分在画布外（半径 2R 远大于画幅），只画磁场内那一小段粗弧，避免喧宾夺主。
  ── 图内标注 ──
     ⛔ SVG 的 <text> 里排不了下标：写成 `v<tspan>0</tspan>` 会被格式化折行，
     两个文本节点之间的换行在 SVG 里渲染成一个空格（第 17 页 v₀ 实拍是 "v ₀"）——
     所以带下标 / 撇号的量（v₀、2R、O′、D′、E′、x_E、α_max…）一律交给共享 <ChartLabel>
     （HTML 覆盖层 + 真 KaTeX，字号按屏幕 px 给，两页缩放不同也同稿可读）。
-->
<script setup lang="ts">
import { useId } from "vue";

const { step = 0 } = defineProps<{
  /** 0 = 干净题干图；≥1 轨迹与 O′；≥2 D′/E′/α/x_E；≥3 临界位置与 α_max */
  step?: number;
}>();

/* ═══════════════ 版面常量（viewBox 用户单位） ═══════════════ */
const VB_W = 480;
const VB_H = 470;
/** 磁场半径 R */
const R = 150;
/** 轨迹半径 r = 2R */
const TRAJ_R = 2 * R;
/** 圆心角 α（临界情形 = π/6） */
const ALPHA = Math.PI / 6;
const SQRT3 = Math.sqrt(3);

/** 原点 O（SVG 坐标，y 向下） */
const O = { x: 225, y: 300 };
/** 临界情形：轨迹圆心 O′ = (0, √3R) */
const O_PRIME = { x: O.x, y: O.y - SQRT3 * R };
/** 临界情形：入射点 D′ = (0, (√3−2)R)（y 轴上、O 下方） */
const D_PRIME = { x: O.x, y: O.y + (2 - SQRT3) * R };
/** 临界情形：出射点 E′ = (R, 0)（半圆边界与 x 轴的交点，也是圆弧最右点） */
const E_PRIME = { x: O.x + R, y: O.y };

/** 半圆形磁场边界（右半个圆：正上方 → 正下方，x ≥ 0） */
const FIELD_PATH = `M ${O.x} ${O.y - R} A ${R} ${R} 0 0 1 ${O.x} ${O.y + R} Z`;

/** 磁场半径 R 的半径线方向（65°：避开 × 点阵与 O′E′ 这根弦） */
const R_LINE = {
  x: O.x + R * Math.cos((65 * Math.PI) / 180),
  y: O.y - R * Math.sin((65 * Math.PI) / 180),
};

/** × 点阵：间距 44、3 列 × 6 行，横竖都关于 x 轴/场区对称，只把越出半圆的角上几个裁掉 */
const DOT = { x: O.x + 22, y: O.y - 110 };

/** 线状粒子源的水平箭头所在高度（跨满磁场直径；中间只给 O、D′ 两个标注留出空档） */
const SOURCE_ROWS = [158, 202, 246, 282, 362, 406, 450];

/** 轨迹圆弧 D′→E′：圆心 O′、半径 2R，φ 从 0 到 π/6 */
const TRAJECTORY_D = ((): string => {
  const n = 36;
  const parts: string[] = [];

  for (let i = 0; i <= n; i += 1) {
    const phi = (ALPHA * i) / n;
    const x = O.x + TRAJ_R * Math.sin(phi);
    const y = O_PRIME.y + TRAJ_R * Math.cos(phi);

    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return parts.join(" ");
})();

/** 圆心角 α 的角弧（O′ 处，半径 52，从 O′D′ 方向 90° 转到 O′E′ 方向 60°） */
const ALPHA_ARC_D = ((): string => {
  const radius = 52;
  const n = 8;
  const parts: string[] = [];

  for (let i = 0; i <= n; i += 1) {
    const deg = 90 - (30 * i) / n;
    const angle = (deg * Math.PI) / 180;
    const x = O_PRIME.x + radius * Math.cos(angle);
    const y = O_PRIME.y + radius * Math.sin(angle);

    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return parts.join(" ");
})();

/* ── 两个磁场实例可能同时挂在 Slidev 的页面树里，clipPath 的 id 必须逐实例唯一 ── */
const clipId = `semicircle-time-clip-${useId()}`;
const clipUrl = `url(#${clipId})`;

/* ═══════════════ 图内标注（ChartLabel 按容器百分比定位） ═══════════════ */
const pctX = (x: number): number => (x / VB_W) * 100;
const pctY = (y: number): number => (y / VB_H) * 100;

interface FigLabel {
  key: string;
  tex: string;
  /** 标注点（viewBox 用户单位） */
  x: number;
  y: number;
  anchor: "center" | "left" | "right";
  size: number;
  color: string;
  /** Step ≥ from 才出现 */
  from: number;
}

const LABELS: FigLabel[] = [
  {
    key: "x",
    tex: "x",
    x: 452,
    y: 281,
    anchor: "center",
    size: 16,
    color: "var(--c-text-dim)",
    from: 0,
  },
  {
    key: "y",
    tex: "y",
    x: 239,
    y: 24,
    anchor: "right",
    size: 16,
    color: "var(--c-text-dim)",
    from: 0,
  },
  { key: "O", tex: "O", x: 215, y: 316, anchor: "left", size: 15, color: "var(--c-text)", from: 0 },
  {
    key: "v0",
    tex: "v_0",
    x: 185,
    y: 132,
    anchor: "center",
    size: 16,
    color: "var(--c-velocity)",
    from: 0,
  },
  {
    key: "R",
    tex: "R",
    x: 258,
    y: 250,
    anchor: "right",
    size: 15,
    color: "var(--c-text-dim)",
    from: 0,
  },
  {
    key: "O'",
    tex: "O'",
    x: 219,
    y: 43,
    anchor: "left",
    size: 15,
    color: "var(--c-text)",
    from: 1,
  },
  {
    key: "2R",
    tex: "2R",
    x: 238,
    y: 128,
    anchor: "right",
    size: 15,
    color: "var(--c-text)",
    from: 1,
  },
  {
    key: "D'",
    tex: "D'",
    x: 215,
    y: 344,
    anchor: "left",
    size: 15,
    color: "var(--c-accent)",
    from: 2,
  },
  {
    key: "E'",
    tex: "E'",
    x: 384,
    y: 283,
    anchor: "right",
    size: 15,
    color: "var(--c-accent)",
    from: 2,
  },
  {
    key: "alpha",
    tex: "\\alpha",
    x: 238,
    y: 104,
    anchor: "center",
    size: 15,
    color: "var(--c-accent)",
    from: 2,
  },
  {
    key: "sin-alpha",
    tex: "\\sin\\alpha=\\dfrac{x_E}{r}",
    x: 296,
    y: 50,
    anchor: "right",
    size: 15,
    color: "var(--c-text)",
    from: 2,
  },
  {
    key: "alpha-max",
    tex: "\\alpha_{\\max}=\\dfrac{\\pi}{6}",
    x: 296,
    y: 116,
    anchor: "right",
    size: 15,
    color: "var(--c-accent)",
    from: 3,
  },
  {
    key: "t",
    tex: "t=\\dfrac{T}{12}",
    x: 384,
    y: 372,
    anchor: "right",
    size: 15,
    color: "var(--c-accent)",
    from: 3,
  },
];
</script>

<template>
  <div class="fig-semicircle-time">
    <svg
      class="fig-svg"
      :viewBox="`0 0 ${VB_W} ${VB_H}`"
      :width="VB_W"
      :height="VB_H"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath :id="clipId">
          <path :d="FIELD_PATH" />
        </clipPath>
      </defs>

      <!-- ① 磁场：隆起在 x > 0 半圆里的裸 × 点阵（垂直纸面向里），用半圆 clipPath 把左半边与圆外裁掉 -->
      <g :clip-path="clipUrl">
        <FieldDots
          :x="DOT.x"
          :y="DOT.y"
          :cols="3"
          :rows="6"
          :spacing="44"
          :size="5"
          :line-width="1.8"
        />
      </g>
      <path
        :d="FIELD_PATH"
        fill="none"
        stroke="var(--c-field)"
        stroke-width="2"
        stroke-dasharray="9 7"
        stroke-linecap="round"
      />

      <!-- ② xOy 坐标轴 -->
      <CourseArrow
        :from="{ x: 28, y: O.y }"
        :to="{ x: 470, y: O.y }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.8"
      />
      <CourseArrow
        :from="{ x: O.x, y: 464 }"
        :to="{ x: O.x, y: 14 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.8"
      />

      <!-- ③ 线状粒子源：从 y 轴左侧平行于 +x 射入的一排水平箭头（v0 方向） -->
      <CourseArrow
        v-for="row in SOURCE_ROWS"
        :key="`source-${row}`"
        :from="{ x: 40, y: row }"
        :to="{ x: 220, y: row }"
        stroke="var(--c-velocity)"
        :stroke-width="2.6"
      />

      <!-- ④ 磁场半径 R：从 O 到圆边界的一根半径线 -->
      <line
        :x1="O.x"
        :y1="O.y"
        :x2="R_LINE.x"
        :y2="R_LINE.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="5 4"
      />

      <!-- ⑤ step ≥1：半径 r = 2R 的轨迹圆弧 D′→E′ + 圆心 O′ + 半径 O′D′（沿 y 轴） -->
      <g v-if="step >= 1">
        <path
          :d="TRAJECTORY_D"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="3.2"
          stroke-linecap="round"
        />
        <line
          :x1="O_PRIME.x"
          :y1="O_PRIME.y"
          :x2="D_PRIME.x"
          :y2="D_PRIME.y"
          stroke="var(--c-text)"
          stroke-width="2.2"
          stroke-dasharray="8 6"
        />
        <circle :cx="O_PRIME.x" :cy="O_PRIME.y" r="3.8" fill="var(--c-text)" />
      </g>

      <!-- ⑥ step ≥2：第二条半径 O′E′ + 圆心角 α 的角弧 + x_E 的水平虚线（与 x 轴重合的一段）+ 两个端点 -->
      <g v-if="step >= 2">
        <line
          :x1="O_PRIME.x"
          :y1="O_PRIME.y"
          :x2="E_PRIME.x"
          :y2="E_PRIME.y"
          stroke="var(--c-text)"
          stroke-width="2.2"
          stroke-dasharray="8 6"
        />
        <path
          :d="ALPHA_ARC_D"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <line
          :x1="O.x"
          :y1="O.y"
          :x2="E_PRIME.x"
          :y2="E_PRIME.y"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-dasharray="8 5"
          stroke-linecap="round"
        />
        <circle :cx="D_PRIME.x" :cy="D_PRIME.y" r="4.4" fill="var(--c-accent)" />
        <circle :cx="E_PRIME.x" :cy="E_PRIME.y" r="4.4" fill="var(--c-accent)" />
      </g>

      <!-- ⑦ step ≥3：E′ 落在 x 轴上（半圆最右点）—— 加高亮环 -->
      <circle
        v-if="step >= 3"
        :cx="E_PRIME.x"
        :cy="E_PRIME.y"
        r="11"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2"
      />

      <!-- 圆心 O 常显（题干图上的 O 就是磁场圆心） -->
      <circle :cx="O.x" :cy="O.y" r="3.4" fill="var(--c-text)" />
    </svg>

    <!-- ⑧ 图内标注：真 KaTeX 覆盖层（带下标/撇号的量必须走这里） -->
    <ChartLabel
      v-for="label in LABELS"
      :key="label.key"
      :x-percent="pctX(label.x)"
      :y-percent="pctY(label.y)"
      :parts="[{ tex: label.tex }]"
      :anchor="label.anchor"
      :size="label.size"
      :color="label.color"
      :visible="step >= label.from"
      halo
    />
    <ChartLabel
      :x-percent="pctX(384)"
      :y-percent="pctY(330)"
      :parts="[{ tex: 'x_E' }]"
      :anchor="'right'"
      :size="15"
      color="var(--c-accent)"
      :visible="step === 2"
      halo
    />
    <ChartLabel
      :x-percent="pctX(384)"
      :y-percent="pctY(330)"
      :parts="[{ tex: 'x_E=R' }]"
      :anchor="'right'"
      :size="15"
      color="var(--c-accent)"
      :visible="step >= 3"
      halo
    />
  </div>
</template>

<style scoped>
/* 解页图栏约 452px 宽；图宽 480 / 高 470（高宽比 0.979）⟹ 解页成图约 452×443，
   仍在课程样式 `.qp-fig svg { max-height: 460px }` 以内（不会触发布局盒缩放、ChartLabel 的百分比才不会错位）。
   题干页图栏约 348px 宽，同组件自动缩到 348×341。 */
.fig-semicircle-time {
  --fig-max: 500px;

  position: relative;
  width: 100%;
  max-width: var(--fig-max);
  margin: 0 auto;
}

.fig-semicircle-time .fig-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
