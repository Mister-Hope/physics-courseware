<!--
  选必二 1.x《复合场中的配速法与摆线运动》——第 (3) 问（管内排满小球，谁能到 y = 9v0²/(16g)）的配图。
  ── 题设（题干由 slides.md 给出，本组件只画图）──
     小车以 v0 向右匀速；车上竖直、光滑、绝缘的细管（管长 L = 2v0²/(9g)）从磁场竖直边界进入匀强磁场
     （B 垂直纸面向里，由第 (1) 问得 qB/m = 2g/v0）。小车的平动让每个球都获得水平速度 v0 ⟹
     每个球受 qv0B = 2mg 的向上洛伦兹力，与 mg 相抵后合力 mg ⟹ 管内每个球都以 a = g 匀加速上升、
     彼此不挤压；离管口深度 h 的球出管时 v_y = √(2gh)。第 (3) 问里第一、四象限都有同样的磁场，
     管内还"均匀紧密排满"大量同样的球，问能到 y = 9v0²/(16g) 的球占总数的比例。
  ── 两栏各自成比例（左栏是"管内"放大示意，右栏是"管外"磁场区里的真实几何，两栏不共用同一比例尺）──
     左栏：细管（管口在 MN 上、管底封闭）+ 管内均匀排满 9 个小球 + 管长 L 的尺寸线；分界虚线把管分成两段——
           靠管口 h_min = 9v0²/(128g) 的那一段（占 h_min/L = 81/256，圆顶够不着目标高度）与下方
           175/256 长的一段（能到达）。球在管内均匀排布 ⟹ 按深度取比例，答案 = 1 − 81/256 = 175/256。
     右栏：管外配速法的极值几何——出管速度分解为"抵消重力的匀速分量 v_d = v0/2（水平向右）"+
           "剩余匀速圆周分量 u = √(v0²/4 + v_y²)"，圆半径 ρ = u·v0/(2g)，**圆心恒在 y = v0²/(4g)**，
           圆顶（最高点）= v0²/(4g) + ρ。三个球画在一起对照：浅球（h 小）圆顶低于目标线、临界球
           （ρ = 5v0²/(16g)、v_y = 3v0/8）圆顶恰好落在目标线上、最深的球（h = L，v_y = 2v0/3）高出目标线。
  ── 一处比题干更细、但与本页结论完全一致的真实几何（画图按它定位）──
     球在管内以 a = g 从静止（相对管）上升，升到管口用 t = v_y/g，这段时间里管口已右移 v0·t = 2Δx
     （Δx = v0·v_y/(2g)）⟹ 出管点在 (2Δx, 0) 而不是原点 O；每个球的圆都过 O、圆心在 (Δx, v0²/(4g))，
     圆顶横坐标正好是 Δx > 0（落在磁场区里）——"圆顶 = 最高点"因此成立，ρ ≥ 5v0²/(16g) 的判据也成立。
  ── 分步（页面传 :step="$clicks"）──
     step 0：干净题目图 = 细管 + 管内球列 + 管长 L 的尺寸线 + y 轴（磁场竖直边界）+ MN + O + 裸 × 磁场阵列；
     step 1：管内说明 = 栏标题"出管速度 v_y = √(2gh)"、"每个球 a = g，越深出管口越快"、管长 L 的值，
             以及管口向上的 v_y 箭头；
     step 2：管外配速法 = 圆心线 + 三个圆（圆顶高度对比）+ 半径 ρ + 出管速度分解（v_d = v0/2 与 u）
             + 圆心/圆顶/出管点标记 + 管外栏标题与图例前两行；
     step 3：极值判据 = 目标高度线 y = 9v0²/(16g)、临界圆顶（恰好相切）与图例"临界"行，
             以及左栏 81/256 分段（分界虚线 + 两段尺寸双箭头 + "圆顶够不着 81/256"与"能到达 175/256"）。
  ── 画法约定 ──
     磁场叉点阵一律用共享 <FieldDots>（裸 ×，不手画）；箭头一律 <CourseArrow>（自带 marker、尖端落在终点）；
     本组件不画完整坐标轴（整题带坐标系的题目图由 CartTubeField 负责），只画 MN、y 轴边界、O 点与 y 方向箭头；
     颜色只用正本 token（速度 --c-velocity、磁场/重点 --c-accent、正文 --c-text、次要 --c-text-dim、辅助线 --c-line）。
     SVG 里用不了 <Latex>：量用 KaTeX_Math 斜体、数字/单位/中文用 KaTeX_Main（slidev-svg.md §1）；
     上下标与希腊字母在 SVG 里只能靠 tspan 的 dy/dx 叠放、以及 KaTeX_Math 字体自带的 ρ 字形。
     渲染宽约 500px（viewBox 宽 600 ⟹ 缩放 ≈ 0.83），字号 / 线宽按这个比例给足，别只剩七八像素。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 分步：0 干净题目图 / 1 管内出管速度 / 2 管外配速法与圆 / 3 阈值线、临界圆与 81/256 分段 */
  step?: number;
}>();

/* ═══════════ 版面（viewBox 用户单位，y 轴向下） ═══════════ */
const VB_W = 600;
const VB_H = 360;
/** 管口所在水平面 MN */
const MN_Y = 162;
/** y 轴 = 磁场竖直边界：第一、四象限（x > 0）都是垂直纸面向里的匀强磁场 */
const AXIS_X = 296;
/** 右栏比例尺：1 个 v0²/g 折成 200px */
const PX = 200;
/** 圆心恒在 MN 上方 v0²/(4g) ⟹ 50px */
const YC_Y = MN_Y - PX / 4;
/** 目标高度线 y = 9v0²/(16g) ⟹ MN 上方 112.5px */
const TARGET_Y = MN_Y - (PX * 9) / 16;
/** 右栏几条参考虚线的右端：再往右留给标注文字，免得线穿过字 */
const REF_R = 452;

/* ═══════════ 右栏几何：配速法的圆（v_y 以 v0 计） ═══════════ */
/** 圆半径 ρ = u·v0/(2g) =（v0²/(2g)）·√(1/4 + v_y²) */
const rho = (vy: number): number => (PX / 2) * Math.hypot(0.5, vy);
/** 圆心横坐标相对 O 的偏移 Δx =（v0²/(2g)）·v_y */
const dxc = (vy: number): number => (PX / 2) * vy;
/** 出管点：球上升的这段时间里管口已右移 v0·t = 2Δx */
const exitX = (vy: number): number => AXIS_X + 2 * dxc(vy);
/** 圆心（恒在 y = v0²/(4g) 这条线上） */
const centerOf = (vy: number) => ({ x: AXIS_X + dxc(vy), y: YC_Y });
/** 圆顶 = 最高点（= v0²/(4g) + ρ） */
const topOf = (vy: number) => ({ x: AXIS_X + dxc(vy), y: YC_Y - rho(vy) });
/** 最深的球 A：h = L = 2v0²/(9g) ⟹ v_y = √(2gL) = 2v0/3（就是第 (1) 问里那个球） */
const VY_A = 2 / 3;
/** 临界球：圆顶恰好落在目标线上 ⟹ ρ = 5v0²/(16g) ⟹ u = 5v0/8 ⟹ v_y = 3v0/8（h = 9v0²/(128g)） */
const VY_CRIT = 3 / 8;
/** 靠管口的浅球：h 远小于 h_min，圆顶明显够不着目标线 */
const VY_LOW = 1 / 10;
/** 三个代表球：颜色语义 = 速度蓝"能到达"、暖金"临界"、次要灰"到不了" */
const CIRCLES = [
  { vy: VY_A, color: "var(--c-velocity)", width: 3.4 },
  { vy: VY_CRIT, color: "var(--c-accent)", width: 3.4 },
  { vy: VY_LOW, color: "var(--c-text-dim)", width: 2.6 },
] as const;

/* 出管速度分解（画在最深的球 A 的出管点上——它最靠右，右侧留白最干净）：
   v = v_d + u：v_d = v0/2 水平向右（它的洛伦兹力竖直向上、恰好抵消 mg），u 是剩下的匀速圆周分量，
   方向正是该圆在出管点的切线方向；第三条斜边就是合速度 v（= 出管速度 (v0, v_y)）。 */
const V0_PX = 76;
const DECO = {
  from: { x: exitX(VY_A), y: MN_Y },
  vdTip: { x: exitX(VY_A) + V0_PX / 2, y: MN_Y },
  uTip: { x: exitX(VY_A) + V0_PX, y: MN_Y - V0_PX * VY_A },
};

/* ═══════════ 左栏几何：细管、球列、管长 L 与 81/256 分段（放大示意，与右栏不同比例） ═══════════ */
const TUBE_CX = 120;
/** 管内半宽（球半径 8.5，直径略小于管径） */
const TUBE_HALF = 10;
const TUBE_WALL = 3.6;
const TUBE_BOTTOM = 332;
const BALL_R = 8.5;
/** h_min/L =（9v0²/(128g)）/（2v0²/(9g)）= 81/256：靠管口这一段的长度占比 */
const SPLIT_RATIO = 81 / 256;
const SPLIT_Y = MN_Y + (TUBE_BOTTOM - MN_Y) * SPLIT_RATIO;
/** 管内均匀紧密排布：靠管口 3 个（圆顶够不着）+ 下方 6 个（能到达）；分界正好落在两个球的间隙里 */
const BALLS_TOP = 3;
const BALLS_BOTTOM = 6;
const spread = (y0: number, y1: number, n: number): number[] => {
  const gap = (y1 - y0 - n * 2 * BALL_R) / (n + 1);
  return Array.from({ length: n }, (_, i) => y0 + gap * (i + 1) + BALL_R * (2 * i + 1));
};
const ballsTop = spread(MN_Y, SPLIT_Y, BALLS_TOP);
const ballsBottom = spread(SPLIT_Y, TUBE_BOTTOM, BALLS_BOTTOM);
/** 球的填色：分段讲清楚之前一律中性灰，step ≥ 3 才把"能到达"的那一段染成速度蓝 */
const ballFill = (isTop: boolean): string =>
  step >= 3 && !isTop ? "var(--c-velocity)" : "var(--c-text-dim)";
const ballOpacity = (isTop: boolean): number => (step >= 3 && !isTop ? 0.4 : 0.5);

/* 左栏尺寸线：管长 L 在 x = 52，两段的尺寸线在 x = 84；三条尺寸界线从 46 拉到 100 */
const DIM_L_X = 52;
const DIM_SEG_X = 84;
const DIM_TICK_FROM = 46;
const DIM_TICK_TO = 100;
const DIM_TICKS = [MN_Y, SPLIT_Y, TUBE_BOTTOM];

/* ═══════════ 字号、线宽与字体（渲染 ≈ 0.83 倍，按"最后一排看得清"给） ═══════════ */
const F_TITLE = 18;
const F_LABEL = 17;
const F_SMALL = 15;
const F_SUB = 12;
const F_STACK = 11;
/** 深底光晕：文字压在磁场阵列 / 弧线上也读得清 */
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
const HALO_S = { stroke: "var(--c-bg)", "stroke-width": 2.8, "paint-order": "stroke" } as const;
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const MAIN = "KaTeX_Main, 'Times New Roman', serif";
const LINE_W = 2.4;
const DASH = "9 8";
</script>

<template>
  <div class="fig-reach">
    <svg
      :viewBox="`0 0 ${VB_W} ${VB_H}`"
      :width="VB_W"
      :height="VB_H"
      class="fig-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="tbr-field">
          <!-- 磁场只在 x > 0（第一、四象限）：圆是圆周分运动的轨迹，画到磁场边界为止 -->
          <rect :x="AXIS_X" y="0" :width="VB_W - AXIS_X" :height="VB_H" />
        </clipPath>
      </defs>
      <!-- ① 磁场：第一、四象限（x > 0）都是垂直纸面向里的匀强磁场，裸 × 铺满，画在最底层 -->
      <FieldDots
        :x="310"
        :y="26"
        :cols="6"
        :rows="7"
        :spacing="50"
        :size="8"
        :line-width="2.4"
        :opacity="0.34"
        dir="in"
      />
      <!-- ② 参考线：y 轴（磁场竖直边界 + y 方向小箭头）、MN 水平面、原点 O -->
      <CourseArrow
        :from="{ x: AXIS_X, y: 46 }"
        :to="{ x: AXIS_X, y: 24 }"
        stroke="var(--c-text-dim)"
        :stroke-width="LINE_W"
        :head-size="11"
      />
      <line
        :x1="AXIS_X"
        :y1="24"
        :x2="AXIS_X"
        :y2="336"
        stroke="var(--c-text-dim)"
        :stroke-width="LINE_W"
        :stroke-dasharray="DASH"
        opacity="0.8"
      />
      <line
        x1="30"
        :y1="MN_Y"
        x2="268"
        :y2="MN_Y"
        stroke="var(--c-text-dim)"
        :stroke-width="LINE_W"
        :stroke-dasharray="DASH"
        opacity="0.8"
      />
      <line
        x1="290"
        :y1="MN_Y"
        :x2="REF_R"
        :y2="MN_Y"
        stroke="var(--c-text-dim)"
        :stroke-width="LINE_W"
        :stroke-dasharray="DASH"
        opacity="0.8"
      />
      <circle :cx="AXIS_X" :cy="MN_Y" r="3.4" fill="var(--c-text)" />
      <g :style="HALO_S">
        <text
          :x="AXIS_X - 9"
          y="32"
          text-anchor="end"
          :font-size="F_LABEL"
          fill="var(--c-text)"
          :font-family="MATH"
          font-style="italic"
        >
          y
        </text>
        <text
          :x="AXIS_X - 9"
          :y="MN_Y + 16"
          text-anchor="end"
          :font-size="F_LABEL"
          fill="var(--c-text)"
          :font-family="MATH"
          font-style="italic"
        >
          O
        </text>
        <text
          x="264"
          :y="MN_Y - 9"
          text-anchor="end"
          :font-size="F_SMALL"
          fill="var(--c-text-dim)"
          :font-family="MATH"
          font-style="italic"
        >
          MN
        </text>
      </g>
      <!-- ③ 左栏：细管（管口在 MN 上、管底封闭）与管内均匀排满的球列 -->
      <line
        :x1="TUBE_CX - TUBE_HALF"
        :y1="MN_Y"
        :x2="TUBE_CX - TUBE_HALF"
        :y2="TUBE_BOTTOM"
        stroke="var(--c-text)"
        :stroke-width="TUBE_WALL"
      />
      <line
        :x1="TUBE_CX + TUBE_HALF"
        :y1="MN_Y"
        :x2="TUBE_CX + TUBE_HALF"
        :y2="TUBE_BOTTOM"
        stroke="var(--c-text)"
        :stroke-width="TUBE_WALL"
      />
      <line
        :x1="TUBE_CX - TUBE_HALF"
        :y1="TUBE_BOTTOM"
        :x2="TUBE_CX + TUBE_HALF"
        :y2="TUBE_BOTTOM"
        stroke="var(--c-text)"
        :stroke-width="TUBE_WALL"
      />
      <!-- 管长 L 的尺寸线（双箭头）与三条尺寸界线（同时给两段的尺寸线用） -->
      <line
        v-for="ty in DIM_TICKS"
        :key="`tick-${ty}`"
        :x1="DIM_TICK_FROM"
        :y1="ty"
        :x2="DIM_TICK_TO"
        :y2="ty"
        stroke="var(--c-text-dim)"
        :stroke-width="1.6"
        opacity="0.85"
      />
      <CourseArrow
        :from="{ x: DIM_L_X, y: (MN_Y + TUBE_BOTTOM) / 2 }"
        :to="{ x: DIM_L_X, y: MN_Y }"
        stroke="var(--c-text-dim)"
        :stroke-width="2.6"
        :head-size="11"
      />
      <CourseArrow
        :from="{ x: DIM_L_X, y: (MN_Y + TUBE_BOTTOM) / 2 }"
        :to="{ x: DIM_L_X, y: TUBE_BOTTOM }"
        stroke="var(--c-text-dim)"
        :stroke-width="2.6"
        :head-size="11"
      />
      <text
        :x="DIM_L_X - 8"
        :y="(MN_Y + TUBE_BOTTOM) / 2 + 7"
        text-anchor="end"
        :font-size="F_LABEL"
        fill="var(--c-text)"
        :font-family="MATH"
        font-style="italic"
      >
        L
      </text>
      <circle
        v-for="(by, i) in ballsTop"
        :key="`bt-${i}`"
        :cx="TUBE_CX"
        :cy="by"
        :r="BALL_R"
        :fill="ballFill(true)"
        :opacity="ballOpacity(true)"
        stroke="var(--c-text-dim)"
        :stroke-width="1.2"
      />
      <circle
        v-for="(by, i) in ballsBottom"
        :key="`bb-${i}`"
        :cx="TUBE_CX"
        :cy="by"
        :r="BALL_R"
        :fill="ballFill(false)"
        :opacity="ballOpacity(false)"
        stroke="var(--c-text-dim)"
        :stroke-width="1.2"
      />
      <!-- ④ step ≥ 1：管内说明（出管速度 v_y = √(2gh)）与管口向上的 v_y 箭头 -->
      <g v-if="step >= 1">
        <g :style="HALO">
          <text x="18" y="34" :font-size="F_TITLE" fill="var(--c-text)" :font-family="MAIN">
            管内：出管速度
            <tspan :font-family="MATH" font-style="italic">v</tspan>
            <tspan :font-size="F_SUB" dy="4" :font-family="MATH" font-style="italic">y</tspan>
            <tspan dy="-4" :font-family="MAIN"> = √(2gh)</tspan>
          </text>
          <text x="18" y="60" :font-size="F_SMALL" fill="var(--c-text-dim)" :font-family="MAIN">
            每个球
            <tspan :font-family="MATH" font-style="italic">a</tspan>
            <tspan :font-family="MAIN"> = </tspan>
            <tspan :font-family="MATH" font-style="italic">g</tspan>
            <tspan :font-family="MAIN">，越深出管口越快</tspan>
          </text>
          <text x="18" y="84" :font-size="F_SMALL" fill="var(--c-text-dim)" :font-family="MAIN">
            管长
            <tspan :font-family="MATH" font-style="italic">L</tspan>
            <tspan :font-family="MAIN"> = 2</tspan>
            <tspan :font-family="MATH" font-style="italic">v</tspan>
            <tspan :font-size="F_STACK" dy="4" :font-family="MATH" font-style="italic">0</tspan>
            <tspan :font-size="F_STACK" dy="-8" dx="-5.5" :font-family="MATH" font-style="italic">
              2
            </tspan>
            <tspan dy="4" dx="-5.5" :font-family="MAIN">/(9g)</tspan>
          </text>
          <text
            :x="TUBE_CX + 9"
            y="140"
            :font-size="F_LABEL"
            fill="var(--c-velocity)"
            :font-family="MATH"
            font-style="italic"
          >
            v
            <tspan :font-size="F_SUB" dy="4">y</tspan>
          </text>
        </g>
        <CourseArrow
          :from="{ x: TUBE_CX, y: MN_Y - 4 }"
          :to="{ x: TUBE_CX, y: 116 }"
          stroke="var(--c-velocity)"
          :stroke-width="3.4"
          :head-size="15"
        />
      </g>
      <!-- ⑤ step ≥ 2：管外配速法——圆心线、三个圆、半径 ρ、出管速度分解、栏标题与图例 -->
      <g v-if="step >= 2">
        <line
          x1="290"
          :y1="YC_Y"
          :x2="REF_R"
          :y2="YC_Y"
          stroke="var(--c-line)"
          :stroke-width="LINE_W"
          :stroke-dasharray="DASH"
        />
        <circle
          v-for="c in CIRCLES"
          :key="`cc-${c.vy}`"
          :cx="centerOf(c.vy).x"
          :cy="centerOf(c.vy).y"
          r="3.4"
          fill="var(--c-text-dim)"
        />
        <circle
          v-for="c in CIRCLES"
          :key="`cir-${c.vy}`"
          :cx="centerOf(c.vy).x"
          :cy="centerOf(c.vy).y"
          :r="rho(c.vy)"
          fill="none"
          :stroke="c.color"
          :stroke-width="c.width"
          clip-path="url(#tbr-field)"
        />
        <!-- 圆顶（最高点）：最深球与浅球先点出来；临界球的圆顶在 step 3 与目标线一起点 -->
        <circle :cx="topOf(VY_A).x" :cy="topOf(VY_A).y" r="4.6" fill="var(--c-velocity)" />
        <circle :cx="topOf(VY_LOW).x" :cy="topOf(VY_LOW).y" r="4.6" fill="var(--c-text-dim)" />
        <!-- 半径 ρ：临界圆的圆心 → 圆顶，这条竖线的长度就是 ρ -->
        <line
          :x1="centerOf(VY_CRIT).x"
          :y1="centerOf(VY_CRIT).y"
          :x2="topOf(VY_CRIT).x"
          :y2="topOf(VY_CRIT).y"
          stroke="var(--c-text-dim)"
          :stroke-width="LINE_W"
        />
        <!-- 出管速度分解：v_d 水平向右（抵消重力）+ u（圆周分量，沿该圆在出管点的切线）+ 合速度 v -->
        <CourseArrow
          :from="DECO.from"
          :to="DECO.vdTip"
          stroke="var(--c-velocity)"
          :stroke-width="3.4"
          :head-size="14"
        />
        <CourseArrow
          :from="DECO.vdTip"
          :to="DECO.uTip"
          stroke="var(--c-velocity)"
          :stroke-width="3.4"
          :head-size="14"
        />
        <CourseArrow
          :from="DECO.from"
          :to="DECO.uTip"
          stroke="var(--c-velocity)"
          :stroke-width="3"
          :head-size="13"
        />
        <circle :cx="DECO.from.x" :cy="DECO.from.y" r="3.6" fill="var(--c-velocity)" />
        <!-- 管外栏标题与几个直接标注 -->
        <g :style="HALO">
          <text
            x="320"
            y="300"
            :font-size="F_TITLE"
            fill="var(--c-text)"
            :font-family="MAIN"
          >
            管外：圆顶越高，能到的高度越高
          </text>
          <text
            :x="DECO.from.x + 19"
            y="180"
            text-anchor="middle"
            :font-size="F_SMALL"
            fill="var(--c-velocity)"
            :font-family="MATH"
            font-style="italic"
          >
            v
            <tspan :font-size="F_SUB" dy="4">0</tspan>
            <tspan dy="-4" :font-family="MAIN">/2</tspan>
          </text>
          <text
            x="512"
            y="132"
            text-anchor="middle"
            :font-size="F_SMALL"
            fill="var(--c-velocity)"
            :font-family="MATH"
            font-style="italic"
          >
            u
          </text>
          <text
            :x="centerOf(VY_CRIT).x - 10"
            y="88"
            text-anchor="end"
            :font-size="F_LABEL"
            fill="var(--c-text)"
            :font-family="MATH"
            font-style="italic"
          >
            ρ
          </text>
          <text x="456" y="72" :font-size="F_SMALL" fill="var(--c-text-dim)" :font-family="MAIN">
            圆心所在高度
          </text>
          <text x="456" y="90" :font-size="F_SMALL" fill="var(--c-text-dim)" :font-family="MAIN">
            <tspan :font-family="MATH" font-style="italic">y</tspan>
            <tspan :font-family="MAIN"> = </tspan>
            <tspan :font-family="MATH" font-style="italic">v</tspan>
            <tspan :font-size="F_STACK" dy="4" :font-family="MATH" font-style="italic">0</tspan>
            <tspan :font-size="F_STACK" dy="-8" dx="-5.5" :font-family="MATH" font-style="italic">
              2
            </tspan>
            <tspan dy="4" dx="-5.5" :font-family="MAIN">/(4g)</tspan>
          </text>
        </g>
        <!-- 图例：三个圆的颜色 → 三种结局（"临界"那一行在 step 3 随目标线一起出现） -->
        <line
          x1="456"
          y1="206"
          x2="478"
          y2="206"
          stroke="var(--c-velocity)"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <text x="484" y="211" :font-size="F_SMALL" fill="var(--c-velocity)" :font-family="MAIN">
          h 大：能到达
        </text>
        <line
          x1="456"
          y1="246"
          x2="478"
          y2="246"
          stroke="var(--c-text-dim)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <text x="484" y="251" :font-size="F_SMALL" fill="var(--c-text-dim)" :font-family="MAIN">
          h 小：到不了
        </text>
      </g>
      <!-- ⑥ step ≥ 3：目标高度线、临界圆顶（恰好相切）、左栏 81/256 分段 -->
      <g v-if="step >= 3">
        <line
          x1="300"
          :y1="TARGET_Y"
          :x2="REF_R"
          :y2="TARGET_Y"
          stroke="var(--c-accent)"
          :stroke-width="2.6"
          stroke-dasharray="12 8"
        />
        <circle :cx="topOf(VY_CRIT).x" :cy="topOf(VY_CRIT).y" r="4.6" fill="var(--c-accent)" />
        <line
          x1="456"
          y1="226"
          x2="478"
          y2="226"
          stroke="var(--c-accent)"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <text x="484" y="231" :font-size="F_SMALL" fill="var(--c-accent)" :font-family="MAIN">
          临界：刚好到达
        </text>
        <g :style="HALO">
          <text x="456" y="34" :font-size="F_SMALL" fill="var(--c-accent)" :font-family="MAIN">
            目标高度线
          </text>
          <text x="456" y="54" :font-size="F_SMALL" fill="var(--c-accent)" :font-family="MAIN">
            <tspan :font-family="MATH" font-style="italic">y</tspan>
            <tspan :font-family="MAIN"> = 9</tspan>
            <tspan :font-family="MATH" font-style="italic">v</tspan>
            <tspan :font-size="F_STACK" dy="4" :font-family="MATH" font-style="italic">0</tspan>
            <tspan :font-size="F_STACK" dy="-8" dx="-5.5" :font-family="MATH" font-style="italic">
              2
            </tspan>
            <tspan dy="4" dx="-5.5" :font-family="MAIN">/(16g)</tspan>
          </text>
        </g>
        <!-- 左栏：分界虚线（h_min = 9v0²/(128g)）、两段的尺寸双箭头、两段的结论 -->
        <line
          x1="92"
          :y1="SPLIT_Y"
          x2="264"
          :y2="SPLIT_Y"
          stroke="var(--c-accent)"
          :stroke-width="2.4"
          stroke-dasharray="10 8"
        />
        <CourseArrow
          :from="{ x: DIM_SEG_X, y: (MN_Y + SPLIT_Y) / 2 }"
          :to="{ x: DIM_SEG_X, y: MN_Y }"
          stroke="var(--c-text-dim)"
          :stroke-width="2.4"
          :head-size="10"
        />
        <CourseArrow
          :from="{ x: DIM_SEG_X, y: (MN_Y + SPLIT_Y) / 2 }"
          :to="{ x: DIM_SEG_X, y: SPLIT_Y }"
          stroke="var(--c-text-dim)"
          :stroke-width="2.4"
          :head-size="10"
        />
        <CourseArrow
          :from="{ x: DIM_SEG_X, y: (SPLIT_Y + TUBE_BOTTOM) / 2 }"
          :to="{ x: DIM_SEG_X, y: SPLIT_Y }"
          stroke="var(--c-text-dim)"
          :stroke-width="2.4"
          :head-size="10"
        />
        <CourseArrow
          :from="{ x: DIM_SEG_X, y: (SPLIT_Y + TUBE_BOTTOM) / 2 }"
          :to="{ x: DIM_SEG_X, y: TUBE_BOTTOM }"
          stroke="var(--c-text-dim)"
          :stroke-width="2.4"
          :head-size="10"
        />
        <g :style="HALO_S">
          <text x="142" y="186" :font-size="F_LABEL" fill="var(--c-text-dim)" :font-family="MAIN">
            圆顶够不着
          </text>
          <text x="142" y="208" :font-size="F_SMALL" fill="var(--c-accent)" :font-family="MAIN">
            81/256
          </text>
          <text x="142" y="268" :font-size="F_LABEL" fill="var(--c-text)" :font-family="MAIN">
            能到达
          </text>
          <text x="142" y="290" :font-size="F_SMALL" fill="var(--c-velocity)" :font-family="MAIN">
            175/256
          </text>
          <text x="230" y="209" :font-size="F_SMALL" fill="var(--c-accent)" :font-family="MATH">
            h
            <tspan :font-size="F_STACK" dy="4" :font-family="MAIN">min</tspan>
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 图占满所在栏：宽度上限交给共享的 .fig-svg 读 --fig-max（写在根类上只影响本图） */
.fig-reach {
  --fig-max: 540px;
  width: 100%;
}
</style>
