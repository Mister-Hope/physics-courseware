<!--
  选必二 1.x《复合场中的配速法与摆线运动》· 末尾补充例 11（原第 6 题）配图
  题面（slides.md 给出，本组件只画图）：两个同心圆 R / 2R；小圆内磁场 B 垂直水平面向里（×），
  环形区域内磁场方向相反、垂直水平面向外（·，大小 B′ 待求）；圆心处的粒子源 S 沿各个方向
  发射速率 v = qBR/m 的正电粒子，要把所有粒子束缚在 2R 圆内，求 B′ 的最小值（答案 r = 3R/5，C）。
  ── 三种用法（同一个组件被第 29–31 页共用）──
    mode="stem"（第 29 页，干净题目图）：只画试卷上本来就有 / 题给的东西 ——
        两个同心圆、小圆内 ×、环形区域 ·、圆心粒子源 S 与几条发射方向的短箭头、R / 2R 标注。
        ⛔ 不出现轨迹圆、S₁、O₂、A、辅助线、角度。
    mode="inner"（第 30 页解析一，:step="$clicks"）：
        step 0 干净图；step 1 小圆内半径 R 的轨迹弧（S→A）+ 轨迹圆心 S₁ + 出射点 A；
        step 2 等边三角形 S S₁A（虚线三边）+ A 处 60°、出射速度 v 与半径 SA 外延的 30°。
    mode="annulus"（第 31 页解析二，:step="$clicks"）：
        step 1 环形区域内的轨迹弧（A 出发、向外凸、过大圆切点 T 回到小圆上的 A′）+ 轨迹圆心 O₂；
        step 2 △OAO₂（虚线三边）+ A 处 120° + OO₂ = 2R − r；
        step 3 半径 r + 相切点 T 强调（O₂T = r，恰相切）。
  ── 几何（viewBox 480×480，画布 y 向下；R = 110 用户单位）──
    圆心 O = S = (240, 240)，小圆 R = 110、大圆 2R = 220。取出射点 A 在 60° 处：
      A = (295, 144.74)；小圆内轨迹半径 r₀ = R ⟹ S₁ = (185, 144.74)，△SS₁A 三边都是 R（等边）；
      A 处出射速度沿 +y（与 SA 成 30°、与 AO₂ 垂直）。
    环形区域内磁场反向 ⟹ 曲率反向，轨迹圆心在 A 的 +x 侧：AO₂ = r = 3R/5 = 66 ⟹ O₂ = (361, 144.74)；
      |OO₂| = √(1.1² + 0.866²)·R = 1.4R = 2R − r（即相切），切点 T = 2R·单位向量(OO₂) = (412.86, 103.91)。
    环内轨迹弧：圆心 O₂、半径 r，从 A 顺时针（画布上屏幕角增大）绕 283.6° 到小圆另一交点
      A′ = (345.51, 208.89)（两圆交点公式解出，另一个交点正是 A）。
    所有坐标都由上面的几何（R、r = 3R/5、各角 60°/30°/120°）算出，不是照样子描的。
  ── 画法约定 ──
    圆 / 环形区域的磁场阵列用 <FieldDots> + <clipPath>（环形用 evenodd 双圆路径）裁剪；
    轨迹弧按屏幕角度采样成折线（<path>），箭头一律 <CourseArrow>；
    带下标的点名（S₁、O₂）拆成两个 <text>（斜体 KaTeX_Math + 小一号下标），
    ⛔ 不用 <tspan>：oxfmt 会把文本节点与 tspan 折成两行，SVG 里就会多出一个空格（"S 1"）。
-->

<script setup lang="ts">
const { mode = "stem", step = 0 } = defineProps<{
  /** Stem = 干净题目图；inner = 解析（一）小圆内；annulus = 解析（二）环形区域 */
  mode?: "stem" | "inner" | "annulus";
  /** 分步：inner 0/1/2；annulus 0/1/2/3（页面传 $clicks） */
  step?: number;
}>();

/* ══════════ 画布与字体 ══════════ */
const VB = 480;
const CX = 240;
const CY = 240;
/** 小圆半径；大圆 = 2R */
const R = 110;

const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";
const MAIN_FONT = "KaTeX_Main, 'PingFang SC', 'Microsoft YaHei', serif";
/** 图内文字压在磁场点阵上时的深色光晕（保证读得清） */
const HALO = { stroke: "#0f1425", "stroke-width": 4, "paint-order": "stroke" };

const SIN60 = Math.sqrt(3) / 2;

/** 物理坐标（以 R 为单位、y 向上、圆心为原点 S）→ 画布坐标（y 向下） */
const pt = (ux: number, uy: number): { x: number; y: number } => ({
  x: CX + ux * R,
  y: CY - uy * R,
});

/** 屏幕角度圆弧采样成折线（画布坐标，角度 y 向下；a0 → a1 线性扫过，每 ~1.5° 一段） */
const arcPath = (c: { x: number; y: number }, radius: number, a0: number, a1: number): string => {
  const n = Math.max(8, Math.ceil((Math.abs(a1 - a0) * 180) / Math.PI / 1.5));
  let d = "";

  for (let i = 0; i <= n; i += 1) {
    const a = a0 + ((a1 - a0) * i) / n;
    const p = {
      x: c.x + radius * Math.cos(a),
      y: c.y + radius * Math.sin(a),
    };

    d += `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)} `;
  }

  return d.trim();
};

/* ══════════ 关键点（全部由几何算出） ══════════ */
/** 圆心 = 粒子源 S */
const S = { x: CX, y: CY };
/** 出射点 A：小圆上 60° 处 */
const A = pt(0.5, SIN60);
/** 小圆内轨迹圆心 S₁：SS₁ = S₁A = SA = R ⟹ 等边三角形 */
const S1 = pt(-0.5, SIN60);
/** 环内轨迹半径 r = 3R/5（相切条件 (2R−r)² = R² + r² − 2Rr·cos120° 解出） */
const K_R = 3 / 5;
const R_IN = K_R * R;
/** AO₂ ⟂ 出射速度（+y）⟹ O₂ 在 A 正右方 r 处 */
const O2 = { x: A.x + R_IN, y: A.y };
/** |OO₂| = 1.4R = 2R − r */
const O2_LEN = Math.hypot(O2.x - S.x, O2.y - S.y);
/** 大圆上的切点 T：O、O₂、T 共线 */
const T = {
  x: S.x + ((O2.x - S.x) / O2_LEN) * (2 * R),
  y: S.y + ((O2.y - S.y) / O2_LEN) * (2 * R),
};
/** A′：小圆与环内轨迹圆的另一个交点（两圆交点公式；两个交点正是 A 与 A′） */
const A2 = ((): { x: number; y: number } => {
  const d = O2_LEN / R;
  /** 交点弦心距：a = (d² + R² − r²)/(2d) */
  const a = (d * d + 1 - K_R * K_R) / (2 * d);
  const h = Math.sqrt(1 - a * a);
  const ux = (O2.x - S.x) / O2_LEN;
  const uy = (O2.y - S.y) / O2_LEN;

  /** 交点 = O + R(a·u ± h·n)，n = (−uy, ux)；取"−"那支才是 A′（"+"那支是 A） */
  return {
    x: S.x + (a * ux - h * uy) * R,
    y: S.y + (a * uy + h * ux) * R,
  };
})();

/* ══════════ 轨迹弧与辅助线 ══════════ */
/** 小圆内轨迹：S → A（圆心 S₁、半径 R；屏幕角 60° → 0°） */
const ARC_INNER = arcPath(S1, R, Math.PI / 3, 0);
/** 环形区域轨迹：A → T → A′（圆心 O₂、半径 r；屏幕角 180° → 463.6°） */
const ARC_ANNULUS = ((): string => {
  const a0 = Math.PI;
  const a1 = Math.atan2(A2.y - O2.y, A2.x - O2.x) + 2 * Math.PI;

  return arcPath(O2, R_IN, a0, a1);
})();
/** 半径指示线（题给的 R / 2R）：左下 250°、右下 320° 各一条 */
const RL_R = pt(Math.cos((250 * Math.PI) / 180), Math.sin((250 * Math.PI) / 180));
const RL_2R = pt(2 * Math.cos((320 * Math.PI) / 180), 2 * Math.sin((320 * Math.PI) / 180));
const RADII_D = `M${S.x},${S.y} L${RL_R.x.toFixed(1)},${RL_R.y.toFixed(1)} M${S.x},${S.y} L${RL_2R.x.toFixed(1)},${RL_2R.y.toFixed(1)}`;
/**
 * 环形磁场区域：大圆挖掉小圆 —— 给 FieldDots 裁剪用。 两个圆**反向**画（外圈 sweep 0、内圈 sweep 1）⟹ 内圈绕数为 0，即使浏览器忽略 clip-rule（默认
 * nonzero 规则）也照样得到真正的环带。
 */
const RING_D =
  `M${CX},${CY - 2 * R} A${2 * R},${2 * R} 0 1 0 ${CX},${CY + 2 * R} A${2 * R},${2 * R} 0 1 0 ${CX},${CY - 2 * R} Z ` +
  `M${CX},${CY - R} A${R},${R} 0 1 1 ${CX},${CY + R} A${R},${R} 0 1 1 ${CX},${CY - R} Z`;
/** 等边三角形 S S₁ A（解析一） / △O A O₂（解析二） */
const TRI_INNER_D = `M${S.x},${S.y} L${S1.x},${S1.y} L${A.x},${A.y} Z`;
const TRI_OUTER_D = `M${S.x},${S.y} L${A.x},${A.y} L${O2.x},${O2.y} Z`;
/** 角标圆弧：A 处 60°（内）、30°（出射速度与半径外延）、120°（环内三角） */
const ARC_60 = arcPath(A, 26, (2 * Math.PI) / 3, Math.PI);
const ARC_30 = arcPath(A, 44, (3 * Math.PI) / 2, (5 * Math.PI) / 3);
const ARC_120 = arcPath(A, 24, 0, (2 * Math.PI) / 3);
/** 出射速度（画布 +y 向上 ⟹ 屏幕 -y）与其在 A 的尖端；SA 出射方向的外延线尖端 */
const V_TIP = { x: A.x, y: A.y - 58 };
const EXT_TIP = { x: A.x + 58 * Math.cos(-Math.PI / 3), y: A.y - 58 * Math.sin(Math.PI / 3) };
/** 粒子源向各个方向的短发射箭头（stem 用；四条正好落在 × 阵列的行列间空隙里） */
const EMIT_ARROWS = [0, 1, 2, 3].map((k) => {
  const a = (k * Math.PI) / 2;

  return {
    from: { x: S.x + 9 * Math.cos(a), y: S.y - 9 * Math.sin(a) },
    to: { x: S.x + 36 * Math.cos(a), y: S.y - 36 * Math.sin(a) },
  };
});
</script>

<template>
  <div class="fig-concentric">
    <svg
      class="fig-svg"
      :viewBox="`0 0 ${VB} ${VB}`"
      :width="VB"
      :height="VB"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="cfc-inner-clip">
          <circle :cx="S.x" :cy="S.y" :r="R" />
        </clipPath>
        <clipPath id="cfc-ring-clip">
          <path :d="RING_D" clip-rule="evenodd" fill-rule="evenodd" />
        </clipPath>
      </defs>

      <!-- ① 磁场：小圆内垂直水平面向里（×）、环形区域内方向相反（·） -->
      <g clip-path="url(#cfc-inner-clip)">
        <FieldDots
          :x="140"
          :y="140"
          :cols="6"
          :rows="6"
          :spacing="40"
          :size="7.5"
          :line-width="2"
          dir="in"
        />
      </g>
      <g clip-path="url(#cfc-ring-clip)">
        <FieldDots :x="16" :y="16" :cols="8" :rows="8" :spacing="64" :size="9" dir="out" />
      </g>

      <!-- ② 两个同心圆（区域边界） + 半径 R / 2R 的指示线（题给量） -->
      <circle
        :cx="S.x"
        :cy="S.y"
        :r="2 * R"
        fill="none"
        stroke="color-mix(in srgb, var(--c-accent) 70%, transparent)"
        :stroke-width="2.8"
      />
      <circle
        :cx="S.x"
        :cy="S.y"
        :r="R"
        fill="none"
        stroke="color-mix(in srgb, var(--c-accent) 70%, transparent)"
        :stroke-width="3"
      />
      <path
        :d="RADII_D"
        fill="none"
        stroke="color-mix(in srgb, var(--c-text) 38%, transparent)"
        :stroke-width="1.6"
      />
      <text
        :x="205"
        :y="292"
        fill="var(--c-text-dim)"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
        text-anchor="middle"
        v-bind="HALO"
      >
        R
      </text>
      <text
        :x="384"
        :y="342"
        fill="var(--c-text-dim)"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
        text-anchor="middle"
        v-bind="HALO"
      >
        2R
      </text>

      <!-- ③ 粒子源 S：几条向各个方向的短发射箭头（只画在干净题目图上） -->
      <template v-if="mode === 'stem'">
        <CourseArrow
          v-for="(arrow, i) in EMIT_ARROWS"
          :key="`emit-${i}`"
          :from="arrow.from"
          :to="arrow.to"
          stroke="var(--c-velocity)"
          :stroke-width="1.8"
          :head-size="7"
        />
      </template>
      <circle :cx="S.x" :cy="S.y" r="4" fill="var(--c-text)" />
      <text
        :x="226"
        :y="260"
        fill="var(--c-text)"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
        text-anchor="end"
        v-bind="HALO"
      >
        S
      </text>

      <!-- ④ 解析（一）小圆内：轨迹弧 + 轨迹圆心 S₁ + 出射点 A -->
      <g v-if="mode === 'inner' && step >= 1">
        <path :d="ARC_INNER" fill="none" stroke="var(--c-velocity)" stroke-width="3" />
        <circle :cx="S1.x" :cy="S1.y" r="3.6" fill="var(--c-text-dim)" />
        <text
          :x="174"
          :y="128"
          fill="var(--c-text-dim)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="15"
          text-anchor="middle"
          v-bind="HALO"
        >
          S
        </text>
        <text
          :x="183.5"
          :y="132.5"
          fill="var(--c-text-dim)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="11"
          text-anchor="middle"
          v-bind="HALO"
        >
          1
        </text>
      </g>
      <g v-if="mode === 'inner' && step >= 1">
        <circle :cx="A.x" :cy="A.y" r="4.4" fill="var(--c-text)" />
        <text
          :x="278"
          :y="124"
          fill="var(--c-text)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          v-bind="HALO"
        >
          A
        </text>
      </g>

      <!-- ⑤ 解析（一）step 2：等边三角形 S S₁ A + 60° 角 + 出射速度 v 与半径成 30° -->
      <g v-if="mode === 'inner' && step >= 2">
        <path
          :d="TRI_INNER_D"
          fill="none"
          stroke="color-mix(in srgb, var(--c-text) 55%, transparent)"
          :stroke-width="1.6"
          stroke-dasharray="7 6"
        />
        <path :d="ARC_60" fill="none" stroke="var(--c-text)" :stroke-width="1.5" />
        <text
          :x="256.9"
          :y="166.7"
          fill="var(--c-text)"
          :font-family="MAIN_FONT"
          font-size="14"
          text-anchor="middle"
          v-bind="HALO"
        >
          60°
        </text>
        <CourseArrow :from="A" :to="V_TIP" stroke="var(--c-velocity)" :stroke-width="3" />
        <text
          :x="289"
          :y="78"
          fill="var(--c-velocity)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="16"
          text-anchor="end"
          v-bind="HALO"
        >
          v
        </text>
        <path
          :d="`M${A.x},${A.y} L${EXT_TIP.x.toFixed(1)},${EXT_TIP.y.toFixed(1)}`"
          fill="none"
          stroke="color-mix(in srgb, var(--c-text) 55%, transparent)"
          :stroke-width="1.5"
          stroke-dasharray="5 5"
        />
        <path :d="ARC_30" fill="none" stroke="var(--c-text)" :stroke-width="1.5" />
        <text
          :x="310"
          :y="88.7"
          fill="var(--c-text)"
          :font-family="MAIN_FONT"
          font-size="14"
          text-anchor="middle"
          v-bind="HALO"
        >
          30°
        </text>
      </g>

      <!-- ⑥ 解析（二）step 1：小圆内轨迹（前一步的路径）+ 环内轨迹弧 A→T→A′ + 圆心 O₂ -->
      <g v-if="mode === 'annulus' && step >= 1">
        <path :d="ARC_INNER" fill="none" stroke="var(--c-velocity)" stroke-width="2.4" />
        <path :d="ARC_ANNULUS" fill="none" stroke="var(--c-velocity)" stroke-width="3.2" />
        <circle :cx="O2.x" :cy="O2.y" r="3.6" fill="var(--c-text-dim)" />
        <text
          :x="371"
          :y="172"
          fill="var(--c-text-dim)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          v-bind="HALO"
        >
          O
        </text>
        <text
          :x="381"
          :y="176.5"
          fill="var(--c-text-dim)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="11"
          text-anchor="middle"
          v-bind="HALO"
        >
          2
        </text>
        <circle :cx="A.x" :cy="A.y" r="4.4" fill="var(--c-text)" />
        <text
          :x="278"
          :y="124"
          fill="var(--c-text)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          v-bind="HALO"
        >
          A
        </text>
        <circle :cx="A2.x" :cy="A2.y" r="4.4" fill="var(--c-text)" />
        <text
          :x="357"
          :y="196"
          fill="var(--c-text)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          v-bind="HALO"
        >
          A′
        </text>
      </g>

      <!-- ⑦ 解析（二）step 2：△O A O₂（虚线三边）+ A 处 120° + OO₂ = 2R − r -->
      <g v-if="mode === 'annulus' && step >= 2">
        <path
          :d="TRI_OUTER_D"
          fill="none"
          stroke="color-mix(in srgb, var(--c-text) 55%, transparent)"
          :stroke-width="1.6"
          stroke-dasharray="7 6"
        />
        <text
          :x="228"
          :y="232"
          fill="var(--c-text)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="16"
          text-anchor="end"
          v-bind="HALO"
        >
          O
        </text>
        <path :d="ARC_120" fill="none" stroke="var(--c-text)" :stroke-width="1.5" />
        <text
          :x="319"
          :y="163"
          fill="var(--c-text)"
          :font-family="MAIN_FONT"
          font-size="13"
          text-anchor="middle"
          v-bind="HALO"
        >
          120°
        </text>
        <text
          :x="315"
          :y="201"
          fill="var(--c-text-dim)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="13"
          text-anchor="middle"
          :transform="`rotate(-38.2 315 201)`"
          v-bind="HALO"
        >
          2R − r
        </text>
      </g>

      <!-- ⑧ 解析（二）step 3：半径 r + 相切点 T（O₂T = r，恰与大圆相切） -->
      <g v-if="mode === 'annulus' && step >= 3">
        <text
          :x="327"
          :y="137"
          fill="var(--c-text-dim)"
          :font-family="MATH_FONT"
          font-style="italic"
          font-size="15"
          text-anchor="middle"
          v-bind="HALO"
        >
          r
        </text>
        <path
          :d="`M${O2.x},${O2.y} L${T.x.toFixed(1)},${T.y.toFixed(1)}`"
          fill="none"
          stroke="color-mix(in srgb, var(--c-text) 55%, transparent)"
          :stroke-width="1.6"
          stroke-dasharray="7 6"
        />
        <circle :cx="T.x" :cy="T.y" r="4.2" fill="var(--c-physics)" />
        <text
          :x="377"
          :y="106"
          fill="var(--c-physics)"
          :font-family="MAIN_FONT"
          font-size="13"
          text-anchor="middle"
          v-bind="HALO"
        >
          恰相切
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.fig-concentric {
  --fig-max: 480px;

  width: 100%;
  max-width: var(--fig-max);
  margin: 0 auto;
}
</style>
