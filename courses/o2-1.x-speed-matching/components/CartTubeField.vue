<!--
  选必二 1.x《复合场中的配速法与摆线运动》· 末尾新增压轴例题（例 7）题目配图
  ── 题面（slides.md 给出，本组件只画图）──
     小车以 v0 向右匀速；车上固定竖直光滑绝缘细管（长 L）；管底有质量 m、电荷量 +q 的小球 A；
     管口所在水平面 MN 的**下方**（第四象限）有垂直纸面向里的匀强磁场（裸 × 阵列）；
     以小球刚经过磁场竖直边界为计时起点、此时刻管口处为原点 O 建 xOy（y 轴与磁场边界重合）。
  ── 分步（step）──
     step 0（常显的干净题目图）：地面 + 小车（+ 车的速度 v0）+ 细管（管口在 MN 上、管身与 y 轴共线）
             + 管底小球 A + MN/x 轴与 y 轴（M、N、O 标注）+ 磁场 × 阵列 + B 方位标注。
     step ≥1（点击后出「竖直方向」）：球旁的速度分解（水平 v0、竖直 vy）与从球心出发的两个竖直力
             （洛伦兹力 qv0B 竖直向上、重力 mg 竖直向下）—— 竖直方向合力恒定 ⟹ 匀加速。
     step ≥2（再加「水平方向」）：由 vy 产生的洛伦兹力 qvyB 水平向左，被管壁弹力 F_N 向右平衡 ——
             这正是"管对小球做功 W = qv0B·L"的来源。
     step ≥3（再加地面系轨迹）：管内段 x = v0t、y = ½gt² − L（开口向上的抛物线段，球随管右移又上升）
             → 管口 (x1 = 2v0²/(3g), 0) → MN 上方**无磁场** ⟹ 斜抛 → 再次经过 x 轴于 (2v0²/g, 0)。
  ── 几何（viewBox 560×360，y 向下；渲染宽约 430（题目页）/500（解析页）⟹ 约 0.8~0.9 倍缩放）──
     y 轴 + 磁场边界 x = 150：细管正中就落在它上面 —— 严格照"此刻管口处为原点 O"，不把管挪到右边；
     MN/x 轴 y = 130；地面 y = 268；管长 L 画成 95（管底球心 y = 225）；
     管口 (270,130)（横向 3L）、落点 (510,130)（横向 9L），两支路共用同一横向比例 3L ⇒ 120 单位：
     管内段 x = 150 + 120τ、y = 225 − 95τ²；斜抛段 x = 270 + 240s、y = 130 − 380s(1−s)（顶点高度 = L，
     是本题真实关系 vy²/2g = L）。横向被压缩（仿射缩放不改变抛物线形状），横向比例关系仍是真的。
     轴/管/地面是**示意图的组成元素**（不是数据坐标图，按 coordinate-axes 笔记 §1 最后一行的口径手写），
     箭头一律共享 <CourseArrow>、磁场阵列一律共享 <FieldDots>、地面一律共享 <SurfaceHatch>。
  ── 图内标注 ──
     ⛔ SVG 的 <text> 里排不了下标：写成 `v<tspan dy="3">0</tspan>` 会被 oxfmt 折成两行，
     两个文本节点之间的换行在 SVG 里渲染成一个**空格**（"v 0" 裂开，实拍确认）。所以带下标的量
     （v0 / vy / qv0B / qvyB / F_N / mg）一律交给共享 <ChartLabel>（HTML 覆盖层 + 真 KaTeX），
     只有无下标的点名（M、N、O、A、x、y、B）才用 SVG <text>。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 0 = 干净题目图；≥1 竖直方向受力与速度分解；≥2 加水平方向（qvyB 与 F_N）；≥3 加地面系轨迹与两次过 x 轴 */
  step?: number;
}>();

/* ═══════════ 版面常量（viewBox 用户单位，按 16px 体系） ═══════════ */
const VB_W = 560;
const VB_H = 360;
/** Y 轴 = 磁场竖直边界（细管正中压在它上面） */
const AXIS_X = 150;
/** X 轴 = M N = 管口所在水平面 */
const MN_Y = 130;
const GROUND_Y = 268;
/** 管长 L 在图上的纵向长度 */
const L_PX = 95;
/** 管内半径（管壁相对中心的偏移） */
const TUBE_HALF = 7;
const BALL_R = 6;
/** 球心初始位置：管底 */
const BALL = { x: AXIS_X, y: MN_Y + L_PX };
/** 管口：横向走 3L（= 2v0²/(3g)） */
const MOUTH = { x: AXIS_X + 120, y: MN_Y };
/** 再次经过 x 轴：横向再走 6L（合计 9L = 2v0²/g） */
const LAND = { x: MOUTH.x + 240, y: MN_Y };
/** 小车 */
const CART = { x: 105, y: 232, w: 90, h: 20 };
const WHEEL_R = 8;
const WHEELS = [
  { x: 124, y: GROUND_Y - WHEEL_R },
  { x: 176, y: GROUND_Y - WHEEL_R },
];
/** 字体：量用 KaTeX_Math（斜体）、单位/点名用 KaTeX_Main（正体） */
const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";
const MAIN_FONT = "KaTeX_Main, 'Times New Roman', serif";

/** 采样成折线（两段轨迹都是抛物线，28 段足够平滑） */
const samplePath = (n: number, f: (t: number) => { x: number; y: number }): string =>
  Array.from({ length: n + 1 }, (_, i) => {
    const p = f(i / n);
    return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");

/** 管内地面系轨迹：x = v0t（3L ⇒ 120）、y = −L + ½gt²（τ = t/t₁） */
const TUBE_PATH = samplePath(28, (u) => ({ x: AXIS_X + 120 * u, y: BALL.y - L_PX * u * u }));
/** 管口后斜抛：Δx = 6L ⇒ 240，顶点高度 = L */
const FLIGHT_PATH = samplePath(28, (s) => ({
  x: MOUTH.x + 240 * s,
  y: MN_Y - 4 * L_PX * s * (1 - s),
}));

/** ChartLabel 按容器百分比定位（容器与 svg 同宽同高） */
const pct = (v: number, total: number): number => (v / total) * 100;

/** 图内的量与力标注（带下标 ⟹ 一律走 ChartLabel 的真 KaTeX） */
interface FigLabel {
  tex: string;
  /** 标注点（viewBox 用户单位） */
  x: number;
  y: number;
  /** 文字在点的哪一侧：center 压点 / left 正左 / right 正右 */
  anchor: "center" | "left" | "right";
  color: string;
  /** Step ≥ from 才出现 */
  from: number;
}
const LABELS: FigLabel[] = [
  { tex: "v_0", x: 76, y: 232, anchor: "center", color: "var(--c-velocity)", from: 0 },
  { tex: "v_0", x: 183, y: 200, anchor: "center", color: "var(--c-velocity)", from: 1 },
  { tex: "v_y", x: 162, y: 182, anchor: "right", color: "var(--c-velocity)", from: 1 },
  { tex: "qv_0B", x: 142, y: 184, anchor: "left", color: "var(--c-force)", from: 1 },
  { tex: "mg", x: 138, y: 236, anchor: "left", color: "var(--c-force)", from: 1 },
  { tex: "qv_yB", x: 106, y: 214, anchor: "left", color: "var(--c-force)", from: 2 },
  { tex: "F_N", x: 196, y: 232, anchor: "right", color: "var(--c-force)", from: 2 },
];

/** 两次经过 x 轴的坐标（分式只能靠 ChartLabel 排） */
const MOUTH_LABEL = { x: pct(214, VB_W), y: pct(104, VB_H) };
const LAND_LABEL = { x: pct(484, VB_W), y: pct(160, VB_H) };
</script>

<template>
  <div class="fig-cart-tube">
    <svg
      class="fig-svg"
      :viewBox="`0 0 ${VB_W} ${VB_H}`"
      :width="VB_W"
      :height="VB_H"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- ① 地面 -->
      <SurfaceHatch
        :from="{ x: 26, y: GROUND_Y }"
        :to="{ x: 542, y: GROUND_Y }"
        side="below"
        :thickness="10"
        :gap="18"
      />

      <!-- ② 磁场：第四象限（y 轴右侧、MN 下方）的裸 × 阵列（垂直纸面向里） -->
      <FieldDots :x="176" :y="148" :cols="10" :rows="4" :spacing="32" :size="7" :line-width="2.2" />
      <text
        :x="540"
        :y="258"
        fill="var(--c-accent)"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
        text-anchor="middle"
      >
        B
      </text>

      <!-- ③ 坐标轴：x 轴 = MN，y 轴 = 磁场竖直边界（从原点 O 向上） -->
      <CourseArrow
        :from="{ x: 36, y: MN_Y }"
        :to="{ x: 548, y: MN_Y }"
        stroke="var(--c-text)"
        :stroke-width="2.2"
        :head-size="12"
      />
      <CourseArrow
        :from="{ x: AXIS_X, y: MN_Y }"
        :to="{ x: AXIS_X, y: 38 }"
        stroke="var(--c-text)"
        :stroke-width="2.2"
        :head-size="12"
      />

      <!-- ④ 地面系轨迹（step ≥3）：管内上升段 + 管口后无磁场区的斜抛段 -->
      <g v-if="step >= 3">
        <path
          :d="TUBE_PATH"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-linecap="round"
          stroke-dasharray="9 6"
        />
        <path
          :d="FLIGHT_PATH"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2.8"
          stroke-linecap="round"
        />
        <circle :cx="MOUTH.x" :cy="MOUTH.y" r="4.6" fill="var(--c-accent)" />
        <circle :cx="LAND.x" :cy="LAND.y" r="4.6" fill="var(--c-accent)" />
      </g>

      <!-- ⑤ 小车（长方体 + 两轮）与车的速度 v0 -->
      <g>
        <rect
          :x="CART.x"
          :y="CART.y"
          :width="CART.w"
          :height="CART.h"
          rx="3"
          fill="var(--c-surface-solid)"
          stroke="var(--c-text-dim)"
          stroke-width="2"
        />
        <circle
          v-for="w in WHEELS"
          :key="w.x"
          :cx="w.x"
          :cy="w.y"
          :r="WHEEL_R"
          fill="var(--c-surface-solid)"
          stroke="var(--c-text-dim)"
          stroke-width="2"
        />
      </g>
      <CourseArrow
        :from="{ x: 56, y: 244 }"
        :to="{ x: 100, y: 244 }"
        stroke="var(--c-velocity)"
        :stroke-width="3"
      />

      <!-- ⑥ 细管（下端封闭、上端开口，管口落在 MN 上）与管底小球 A -->
      <g fill="none" stroke="var(--c-text)" stroke-width="2.4" stroke-linecap="round">
        <path :d="`M${AXIS_X - TUBE_HALF},${CART.y} V${MN_Y}`" />
        <path :d="`M${AXIS_X + TUBE_HALF},${CART.y} V${MN_Y}`" />
        <path :d="`M${AXIS_X - TUBE_HALF},${CART.y} H${AXIS_X + TUBE_HALF}`" />
      </g>
      <circle :cx="BALL.x" :cy="BALL.y" :r="BALL_R" fill="var(--c-text)" />
      <text
        :x="AXIS_X - TUBE_HALF - 6"
        :y="BALL.y - 6"
        fill="var(--c-text)"
        :font-family="MAIN_FONT"
        font-size="15"
        text-anchor="end"
      >
        A
      </text>

      <!-- ⑦ step ≥1：速度分解（球旁，蓝）+ 竖直方向的两个力（从球心出发，红） -->
      <g v-if="step >= 1">
        <CourseArrow
          :from="{ x: 162, y: 214 }"
          :to="{ x: 202, y: 214 }"
          stroke="var(--c-velocity)"
          :stroke-width="2.4"
        />
        <CourseArrow
          :from="{ x: 166, y: 218 }"
          :to="{ x: 166, y: 176 }"
          stroke="var(--c-velocity)"
          :stroke-width="2.4"
        />
        <CourseArrow
          :from="{ x: BALL.x, y: BALL.y }"
          :to="{ x: BALL.x, y: 176 }"
          stroke="var(--c-force)"
          :stroke-width="3"
        />
        <CourseArrow
          :from="{ x: BALL.x, y: BALL.y }"
          :to="{ x: BALL.x, y: 238 }"
          stroke="var(--c-force)"
          :stroke-width="3"
        />
      </g>

      <!-- ⑧ step ≥2：水平方向的一对力 —— 洛伦兹力 qvyB（左）与管壁弹力 F_N（右）平衡 -->
      <g v-if="step >= 2">
        <CourseArrow
          :from="{ x: BALL.x, y: BALL.y }"
          :to="{ x: 112, y: BALL.y }"
          stroke="var(--c-force)"
          :stroke-width="3"
        />
        <CourseArrow
          :from="{ x: BALL.x, y: BALL.y }"
          :to="{ x: 190, y: BALL.y }"
          stroke="var(--c-force)"
          :stroke-width="3"
        />
      </g>

      <!-- ⑨ 点名与坐标标注（常显，无下标 ⟹ 用 SVG text） -->
      <text
        :x="44"
        :y="118"
        fill="var(--c-text)"
        :font-family="MAIN_FONT"
        font-size="15"
        text-anchor="middle"
      >
        M
      </text>
      <text
        :x="424"
        :y="118"
        fill="var(--c-text)"
        :font-family="MAIN_FONT"
        font-size="15"
        text-anchor="middle"
      >
        N
      </text>
      <text
        :x="534"
        :y="112"
        fill="var(--c-text)"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
        text-anchor="middle"
      >
        x
      </text>
      <text
        :x="162"
        :y="48"
        fill="var(--c-text)"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
      >
        y
      </text>
      <text
        :x="136"
        :y="148"
        fill="var(--c-text)"
        :font-family="MAIN_FONT"
        font-size="15"
        text-anchor="end"
      >
        O
      </text>
    </svg>

    <!-- ⑩ 图内标注（HTML 覆盖层，真 KaTeX）：量与力 + 两次经过 x 轴的坐标 -->
    <ChartLabel
      v-for="l in LABELS"
      :key="`${l.tex}-${l.from}`"
      :visible="step >= l.from"
      :x-percent="pct(l.x, VB_W)"
      :y-percent="pct(l.y, VB_H)"
      :parts="[{ tex: l.tex }]"
      :anchor="l.anchor"
      :size="16"
      :color="l.color"
      halo
    />
    <ChartLabel
      v-if="step >= 3"
      :x-percent="MOUTH_LABEL.x"
      :y-percent="MOUTH_LABEL.y"
      :parts="[{ tex: 'x_1 = \\dfrac{2v_0^2}{3g}' }]"
      :size="18"
      color="var(--c-accent)"
      halo
    />
    <ChartLabel
      v-if="step >= 3"
      :x-percent="LAND_LABEL.x"
      :y-percent="LAND_LABEL.y"
      :parts="[{ tex: 'x = \\dfrac{2v_0^2}{g}' }]"
      :size="18"
      color="var(--c-accent)"
      halo
    />
  </div>
</template>

<style scoped>
/* 图栏宽度：题目页约 430px、解析页约 500px，540px 让两处都被栏宽限住、吃满可用面积。
   容器与 svg 同宽同高（ChartLabel 按容器百分比定位，两者必须一致）。 */
.fig-cart-tube {
  --fig-max: 540px;

  position: relative;
  width: 100%;
  max-width: var(--fig-max);
  margin: 0 auto;
}

.fig-cart-tube .fig-svg {
  width: 100%;
  max-width: var(--fig-max);
}
</style>
