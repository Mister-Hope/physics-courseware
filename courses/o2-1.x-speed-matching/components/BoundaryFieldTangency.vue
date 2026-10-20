<!--
  选必二 1.x《复合场中的配速法与摆线运动》章末补充例题（例 8）配图
  ── 题意 ──
     宽度为 d 的匀强磁场（左边界 PP′、右边界 QQ′，两线竖直），B 垂直纸面向里（×）；
     粒子从 PP′ 上某点以 v₀ 斜向右上、与边界成 45° 射入。欲使粒子不能从 QQ′ 射出，求 v₀ 的最大值。
  ── 两页共用、按 mode 切换版式 ──
     stem     ：第 21 页题干图 —— 只画试卷上本来就有的东西（两条边界、宽度 d、×、入射点与 v₀、45°、P/Q/P′/Q′）。
     positive ：第 22 页解析（一）正电荷 —— step 0 干净图；step ≥1 轨迹弧 + 轨迹圆 + 圆心 O + 切点 T；
                step ≥2 半径线（O→入射点、O→切点）+ 45° + 水平投影 R₁sin45°。
     negative ：第 23 页解析（二）负电荷 —— 同上，圆心 O′ 在磁场内，R₂ + R₂cos45° = d。
  ── 几何（按真实关系算，不是描图）──
     R = m·v₀/(qB)，45° 入射 ⟹ 半径与边界成 45°。
     正电荷：洛伦兹力指向左上 ⟹ 圆心在 PP′ 左侧；右端恰与 QQ′ 相切时
             圆心到 QQ′ 的距离 = R₁ ⟹ R₁sin45° + d = R₁ ⟹ R₁ = (2+√2)d ≈ 3.414d，轨迹弧 90°。
             整圆直径 2R₁ ≈ 6.83d ⟹ 正方形构图（圆在左、边界窄条在右，与解析图「甲」一致）。
     负电荷：洛伦兹力指向右下 ⟹ 圆心 O′ 在 PP′ 右侧磁场内；相切时
             R₂ + R₂cos45° = d ⟹ R₂ = (2−√2)d ≈ 0.586d，轨迹弧 270°（从 PP′ 上端绕一圈回到下端）。
  ── 视图约定 ──
     屏幕坐标 y 向下；角度一律用「屏幕角」（+x 轴起、顺时针为正），弧线采样成折线（不用 A 指令，免得 sweep 搞反）。
     带下标 / 算式的标注（v₀、R₁、R₁sin45°、R₂、R₂cos45°、O′）走共享 <ChartLabel>（HTML + 真 KaTeX）：
     SVG <text> 里写 `v<tspan>0</tspan>` 会被 oxfmt 拆行、渲染成 "v 0"，所以下标一律不进 SVG text。
     单字母（P/Q/P′/Q′、d、T、45°）才用 SVG <text>，字体 KaTeX_Math 斜体 / KaTeX_Main 正体。
-->
<script setup lang="ts">
interface Pt {
  x: number;
  y: number;
}

const { mode = "stem", step = 0 } = defineProps<{
  /** Stem = 题干干净图；positive / negative = 解析图（配合 step 分步显示） */
  mode?: "stem" | "positive" | "negative";
  /** 解析图显示到第几步（0 = 干净图）；页面传 :step="$clicks" */
  step?: number;
}>();

/* ═══════════ 通用工具 ═══════════ */
const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";
const MAIN_FONT = "KaTeX_Main, 'Times New Roman', serif";
const RAD = Math.PI / 180;
const { SQRT2 } = Math;
const C = {
  text: "var(--c-text)",
  dim: "var(--c-text-dim)",
  velocity: "var(--c-velocity)",
  accent: "var(--c-accent)",
};

/** 圆周上一点（屏幕角，度） */
const polar = (c: Pt, r: number, deg: number): Pt => ({
  x: c.x + r * Math.cos(deg * RAD),
  y: c.y + r * Math.sin(deg * RAD),
});

/** 圆弧采样成折线路径（屏幕角从 from 扫到 to，度；段数按扫角自动取，15° 一段） */
const arcD = (c: Pt, r: number, from: number, to: number): string => {
  const n = Math.max(16, Math.round(Math.abs(to - from) / 15) * 8);

  return Array.from({ length: n + 1 }, (_, i) => {
    const p = polar(c, r, from + ((to - from) * i) / n);

    return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
};

/** 直角标记（两条互相垂直的短边） */
const rightAngleD = (corner: Pt, dx: number, dy: number): string =>
  `M${corner.x + dx},${corner.y} L${corner.x + dx},${corner.y + dy} L${corner.x},${corner.y + dy}`;

/** ChartLabel 用容器百分比定位（容器与 svg 同宽同高） */
const pct = (v: number, total: number): number => Math.round((v / total) * 10000) / 100;

/* ═══════════ 数据结构 ═══════════ */
interface MathLabel {
  /** KaTeX 源码 */
  tex: string;
  at: Pt;
  anchor: "center" | "left" | "right" | "bottom-right";
  color: string;
  size: number;
  /** Step ≥ from 才显示 */
  from: number;
}

interface TextLabel {
  text: string;
  at: Pt;
  anchor: "start" | "middle" | "end";
  font: "math" | "main";
  size: number;
  color: string;
  /** Step ≥ from 才显示 */
  from: number;
}

interface DotField {
  x: number;
  y: number;
  cols: number;
  rows: number;
  spacing: number;
}

interface Layout {
  /** ViewBox 尺寸 */
  W: number;
  H: number;
  /** ViewBox 原点（把内容在画布里居中；ChartLabel 的百分比要减掉） */
  vbX: number;
  vbY: number;
  /** 左边界 PP′ / 右边界 QQ′ 的 x */
  pp: number;
  qq: number;
  /** 两条边界线的上下端 */
  yTop: number;
  yBottom: number;
  /** 宽度 d 的尺寸线 y、d 标签位置 */
  dY: number;
  dLabel: Pt;
  /** 入射点、v₀ 箭头终点 */
  entry: Pt;
  vTip: Pt;
  /** 磁场 × 阵列（每段一个 FieldDots） */
  dots: DotField[];
  labels: MathLabel[];
  texts: TextLabel[];
}

/* ══════════════════════════════════════════════════
   ① stem：第 21 页题干图（干净图，只有试卷上本来就有的东西）
   边界间距 d = 210 用户单位；入射点在 PP′ 偏下处，v₀ 与边界成 45°。
   ══════════════════════════════════════════════════ */
const STEM_ENTRY: Pt = { x: 118, y: 300 };
const STEM_WEDGE = arcD(STEM_ENTRY, 45, 270, 315);

const STEM: Layout = {
  W: 386,
  H: 400,
  vbX: 31,
  vbY: 25,
  pp: 118,
  qq: 328,
  yTop: 100,
  yBottom: 356,
  dY: 100,
  dLabel: { x: 223, y: 88 },
  entry: STEM_ENTRY,
  vTip: { x: 188.7, y: 229.3 },
  dots: [{ x: 240, y: 150, cols: 2, rows: 3, spacing: 62 }],
  labels: [
    { tex: "v_0", at: { x: 200, y: 236 }, anchor: "right", color: C.velocity, size: 16, from: 0 },
  ],
  texts: [
    {
      text: "P",
      at: { x: 106, y: 88 },
      anchor: "end",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "Q",
      at: { x: 340, y: 88 },
      anchor: "start",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "P′",
      at: { x: 106, y: 370 },
      anchor: "end",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "Q′",
      at: { x: 340, y: 370 },
      anchor: "start",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "d",
      at: { x: 223, y: 88 },
      anchor: "middle",
      font: "math",
      size: 16,
      color: C.dim,
      from: 0,
    },
    {
      text: "45°",
      at: { x: 140, y: 246 },
      anchor: "middle",
      font: "main",
      size: 14,
      color: C.dim,
      from: 0,
    },
  ],
};

/* ══════════════════════════════════════════════════
   ② positive：第 22 页解析（一）正电荷
   圆心 O 在 PP′ 左侧，R₁ = (2+√2)d；轨迹弧从 PP′ 下交点经 QQ′ 切点回到 PP′ 上交点（90°）。
   正方形构图：整圆直径 2R₁ ≈ 6.83d 装进画布，磁场窄条贴在右侧、与圆相切。
   ══════════════════════════════════════════════════ */
const POS_D = 62;
const POS_R = (2 + SQRT2) * POS_D;
const POS_O: Pt = { x: 240, y: 250 };
const POS_PP = POS_O.x + POS_R / SQRT2;
const POS_QQ = POS_O.x + POS_R;
const POS_ENTRY: Pt = { x: POS_PP, y: POS_O.y + POS_R / SQRT2 };
const POS_EXIT: Pt = { x: POS_PP, y: POS_O.y - POS_R / SQRT2 };
const POS_T: Pt = { x: POS_QQ, y: POS_O.y };
const POS_ARC = arcD(POS_O, POS_R, 45, -45);
const POS_WEDGE = arcD(POS_ENTRY, 32, 270, 225);
const POS_RIGHT_ANGLE = rightAngleD(POS_T, -10, -10);

const POSITIVE: Layout = {
  W: 480,
  H: 470,
  vbX: 13,
  vbY: 11,
  pp: POS_PP,
  qq: POS_QQ,
  yTop: 76,
  yBottom: 430,
  dY: 430,
  dLabel: { x: (POS_PP + POS_QQ) / 2, y: 448 },
  entry: POS_ENTRY,
  vTip: { x: 420.8, y: 368.6 },
  dots: [
    { x: 420.7, y: 150, cols: 1, rows: 2, spacing: 55 },
    { x: 420.7, y: 320, cols: 1, rows: 1, spacing: 0 },
  ],
  labels: [
    { tex: "v_0", at: { x: 430, y: 388 }, anchor: "center", color: C.velocity, size: 16, from: 0 },
    { tex: "O", at: POS_O, anchor: "left", color: C.dim, size: 16, from: 1 },
    { tex: "R_1", at: { x: 345, y: 238 }, anchor: "center", color: C.accent, size: 15, from: 2 },
    {
      tex: "R_1\\sin45^\\circ",
      at: { x: 315, y: 268 },
      anchor: "center",
      color: C.accent,
      size: 15,
      from: 2,
    },
    { tex: "R_1", at: { x: 310, y: 344 }, anchor: "center", color: C.accent, size: 15, from: 2 },
  ],
  texts: [
    {
      text: "P",
      at: { x: 377.7, y: 66 },
      anchor: "end",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "Q",
      at: { x: 463.7, y: 66 },
      anchor: "start",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "P′",
      at: { x: 377.7, y: 448 },
      anchor: "end",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "Q′",
      at: { x: 463.7, y: 448 },
      anchor: "start",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "d",
      at: { x: (POS_PP + POS_QQ) / 2, y: 448 },
      anchor: "middle",
      font: "math",
      size: 16,
      color: C.dim,
      from: 0,
    },
    {
      text: "T",
      at: { x: 456, y: 242 },
      anchor: "start",
      font: "math",
      size: 15,
      color: C.accent,
      from: 1,
    },
    {
      text: "45°",
      at: { x: 371, y: 355 },
      anchor: "middle",
      font: "main",
      size: 14,
      color: C.dim,
      from: 2,
    },
  ],
};

/* ══════════════════════════════════════════════════
   ③ negative：第 23 页解析（二）负电荷
   圆心 O′ 在 PP′ 右侧磁场内，R₂ = (2−√2)d；轨迹从 PP′ 上交点顺时针绕 270° 回到 PP′ 下交点。
   ══════════════════════════════════════════════════ */
const NEG_D = 210;
const NEG_R = (2 - SQRT2) * NEG_D;
const NEG_PP = 150;
const NEG_QQ = NEG_PP + NEG_D;
const NEG_O: Pt = { x: NEG_QQ - NEG_R, y: 250 };
const NEG_ENTRY: Pt = { x: NEG_PP, y: NEG_O.y - NEG_R / SQRT2 };
const NEG_ARC = arcD(NEG_O, NEG_R, 225, 495);
const NEG_WEDGE = arcD(NEG_O, 30, 180, 225);
const NEG_RIGHT_ANGLE = rightAngleD({ x: NEG_QQ, y: NEG_O.y }, -10, -10);

const NEGATIVE: Layout = {
  W: 415,
  H: 425,
  vbX: 48,
  vbY: 40,
  pp: NEG_PP,
  qq: NEG_QQ,
  yTop: 120,
  yBottom: 388,
  dY: 388,
  dLabel: { x: (NEG_PP + NEG_QQ) / 2, y: 404 },
  entry: NEG_ENTRY,
  vTip: { x: 181.8, y: 131.2 },
  dots: [
    { x: 255, y: 145, cols: 1, rows: 2, spacing: 55 },
    { x: 255, y: 300, cols: 1, rows: 2, spacing: 55 },
  ],
  labels: [
    { tex: "v_0", at: { x: 198, y: 122 }, anchor: "center", color: C.velocity, size: 16, from: 0 },
    { tex: "O'", at: NEG_O, anchor: "bottom-right", color: C.dim, size: 16, from: 1 },
    { tex: "R_2", at: { x: 168, y: 205 }, anchor: "center", color: C.accent, size: 15, from: 2 },
    {
      tex: "R_2\\cos45^\\circ",
      at: { x: 193, y: 272 },
      anchor: "center",
      color: C.accent,
      size: 15,
      from: 2,
    },
    { tex: "R_2", at: { x: 315, y: 238 }, anchor: "center", color: C.accent, size: 15, from: 2 },
  ],
  texts: [
    {
      text: "P",
      at: { x: 138, y: 113 },
      anchor: "end",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "Q",
      at: { x: 372, y: 113 },
      anchor: "start",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "P′",
      at: { x: 138, y: 404 },
      anchor: "end",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "Q′",
      at: { x: 372, y: 404 },
      anchor: "start",
      font: "math",
      size: 17,
      color: C.text,
      from: 0,
    },
    {
      text: "d",
      at: { x: (NEG_PP + NEG_QQ) / 2, y: 404 },
      anchor: "middle",
      font: "math",
      size: 16,
      color: C.dim,
      from: 0,
    },
    {
      text: "T",
      at: { x: 364, y: 242 },
      anchor: "start",
      font: "math",
      size: 15,
      color: C.accent,
      from: 1,
    },
    {
      text: "45°",
      at: { x: 194, y: 232 },
      anchor: "middle",
      font: "main",
      size: 14,
      color: C.dim,
      from: 2,
    },
  ],
};

const L: Layout = mode === "positive" ? POSITIVE : mode === "negative" ? NEGATIVE : STEM;
</script>

<template>
  <div class="fig-boundary-tangency">
    <svg
      class="fig-svg"
      :viewBox="`${L.vbX} ${L.vbY} ${L.W} ${L.H}`"
      :width="L.W"
      :height="L.H"
      role="img"
      aria-label="宽度为 d 的匀强磁场边界与粒子在磁场中的圆周轨迹、圆心与相切关系"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- ① 两条平行边界线 PP′ / QQ′ -->
      <g stroke="var(--c-text-dim)" stroke-width="1.7" stroke-dasharray="7 6">
        <line :x1="L.pp" :y1="L.yTop" :x2="L.pp" :y2="L.yBottom" />
        <line :x1="L.qq" :y1="L.yTop" :x2="L.qq" :y2="L.yBottom" />
      </g>
      <!-- ② 磁场宽度 d（双向尺寸线 = 两条单头箭头，不用手写 marker） -->
      <CourseArrow
        :from="{ x: (L.pp + L.qq) / 2, y: L.dY }"
        :to="{ x: L.pp, y: L.dY }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.5"
        :head-size="9"
      />
      <CourseArrow
        :from="{ x: (L.pp + L.qq) / 2, y: L.dY }"
        :to="{ x: L.qq, y: L.dY }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.5"
        :head-size="9"
      />
      <!-- ③ 垂直纸面向里的磁场（× 阵列铺在两条边界之间） -->
      <FieldDots
        v-for="(dot, i) in L.dots"
        :key="`dot-${i}`"
        :x="dot.x"
        :y="dot.y"
        :cols="dot.cols"
        :rows="dot.rows"
        :spacing="dot.spacing"
        :size="5.5"
        :line-width="1.7"
        dir="in"
      />
      <!-- ④ 题给元素：入射点 + 沿 45° 射入的 v₀ -->
      <circle :cx="L.entry.x" :cy="L.entry.y" r="3.4" fill="var(--c-text)" />
      <CourseArrow :from="L.entry" :to="L.vTip" stroke="var(--c-velocity)" :stroke-width="3" />
      <!-- ⑤ 题给 45° 角（题干图用；解析图在 step 2 单独标注） -->
      <g v-if="mode === 'stem'">
        <path
          :d="STEM_WEDGE"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-linecap="round"
        />
      </g>
      <!-- ⑥ 正电荷解析：轨迹圆、轨迹弧、圆心、切点 → 半径与投影 -->
      <g v-if="mode === 'positive'">
        <g v-if="step >= 1">
          <circle
            :cx="POS_O.x"
            :cy="POS_O.y"
            :r="POS_R"
            fill="none"
            stroke="var(--c-velocity)"
            stroke-width="1.5"
            stroke-dasharray="6 7"
            opacity="0.45"
          />
          <path
            :d="POS_ARC"
            fill="none"
            stroke="var(--c-velocity)"
            stroke-width="2.8"
            stroke-linecap="round"
          />
          <circle :cx="POS_O.x" :cy="POS_O.y" r="3.2" fill="var(--c-text-dim)" />
          <circle :cx="POS_T.x" :cy="POS_T.y" r="4.4" fill="var(--c-accent)" />
        </g>
        <g v-if="step >= 2">
          <g stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 5">
            <line :x1="POS_O.x" :y1="POS_O.y" :x2="POS_ENTRY.x" :y2="POS_ENTRY.y" />
            <line :x1="POS_O.x" :y1="POS_O.y" :x2="POS_EXIT.x" :y2="POS_EXIT.y" />
          </g>
          <line
            :x1="POS_O.x"
            :y1="POS_O.y"
            :x2="POS_T.x"
            :y2="POS_T.y"
            stroke="var(--c-accent)"
            stroke-width="1.6"
            stroke-dasharray="6 5"
          />
          <path
            :d="POS_RIGHT_ANGLE"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.4"
            stroke-linecap="round"
          />
          <path
            :d="POS_WEDGE"
            fill="none"
            stroke="var(--c-text-dim)"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </g>
      </g>
      <!-- ⑦ 负电荷解析：轨迹弧、圆心、切点 → 半径与投影 -->
      <g v-if="mode === 'negative'">
        <g v-if="step >= 1">
          <path
            :d="NEG_ARC"
            fill="none"
            stroke="var(--c-velocity)"
            stroke-width="2.8"
            stroke-linecap="round"
          />
          <circle :cx="NEG_O.x" :cy="NEG_O.y" r="3.2" fill="var(--c-text-dim)" />
          <circle :cx="NEG_QQ" :cy="NEG_O.y" r="4.4" fill="var(--c-accent)" />
        </g>
        <g v-if="step >= 2">
          <g stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 5">
            <line :x1="NEG_O.x" :y1="NEG_O.y" :x2="NEG_ENTRY.x" :y2="NEG_ENTRY.y" />
          </g>
          <line
            :x1="NEG_PP"
            :y1="NEG_O.y"
            :x2="NEG_QQ"
            :y2="NEG_O.y"
            stroke="var(--c-accent)"
            stroke-width="1.6"
            stroke-dasharray="6 5"
          />
          <path
            :d="NEG_RIGHT_ANGLE"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.4"
            stroke-linecap="round"
          />
          <path
            :d="NEG_WEDGE"
            fill="none"
            stroke="var(--c-text-dim)"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </g>
      </g>
      <!-- ⑧ 单字母标注（无下标 ⟹ 可以用 SVG text） -->
      <text
        v-for="(t, i) in L.texts"
        v-show="step >= t.from"
        :key="`t-${i}`"
        :x="t.at.x"
        :y="t.at.y"
        :fill="t.color"
        :font-family="t.font === 'math' ? MATH_FONT : MAIN_FONT"
        :font-style="t.font === 'math' ? 'italic' : 'normal'"
        :font-size="t.size"
        :text-anchor="t.anchor"
      >
        {{ t.text }}
      </text>
    </svg>
    <!-- ⑨ 带下标 / 算式的标注（HTML 覆盖层，真 KaTeX） -->
    <ChartLabel
      v-for="(l, i) in L.labels"
      :key="`l-${i}`"
      :visible="step >= l.from"
      :x-percent="pct(l.at.x - L.vbX, L.W)"
      :y-percent="pct(l.at.y - L.vbY, L.H)"
      :parts="[{ tex: l.tex }]"
      :anchor="l.anchor"
      :size="l.size"
      :color="l.color"
      halo
    />
  </div>
</template>

<style scoped>
/* 图栏：题目页约 350–390px 宽（按栏宽缩），解析页约 460–480px 宽、图高上限 460px。
   viewBox 高宽比 ≤ 1.05，440px 时最高约 450px，两个页面都不会被 max-height 二次缩放——
   ChartLabel 按容器百分比定位，一旦 svg 被 letterbox 就会整体错位。 */
.fig-boundary-tangency {
  --fig-max: 440px;

  position: relative;
  width: 100%;
  max-width: var(--fig-max);
  margin: 0 auto;
}

.fig-boundary-tangency .fig-svg {
  display: block;

  width: 100%;
  max-width: var(--fig-max);
  height: auto;
  margin: 0 auto;
}
</style>
