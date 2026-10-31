<!--
  选必二 1.x《复合场中的配速法与摆线运动》· 例 10（原第 8 题）题目图 / 解析图
  ── 题面 ──
     以直角三角形 AOC 为边界的匀强磁场（B 垂直纸面向里）：O 为直角顶点，AO = L 在 O 正上方、
     CO = 2L 在 O 正左侧；O 点放粒子源，同时向磁场内各个方向发射带正电粒子（速度大小均为 v0）。
  ── 取坐标（数学坐标，y 向上）──
     O = (0, 0)、A = (0, L)、C = (−2L, 0)，三角形内部即磁场区域。
  ── 三种 mode（由页面调用：stem 第 26 页 / part1 第 27 页 / part2 第 28 页）──
     stem  ：干净题目图 —— 只有试卷上本来就有的东西：三角形虚线边界、三角形内 × 点阵、
             O 点粒子源（一点 + 几条射向磁场内的短箭头）、顶点 A/C/O 与边长 L、2L。
             ⛔ 不出现轨迹、圆心、半径、辅助线、D 点。
     part1 ：step ≥1 轨迹为绕 C、半径 2L 的圆弧 O→D（沿 OA 射入时圆心恰是 C，D 在 AC 上、
             |CD| = 2L），并画出半径 CD；step ≥2 补 D 点与 CD、AD 段标注。
     part2 ：step ≥1 临界轨迹 —— 过 O、C 且与 AC 相切于 C 的圆弧（粒子恰好从 C 射出）；
             step ≥2 圆心 X、OC 中点 M、CM = MO = L、半径 XC / XO、直角标记 XM⟂OC 与 CX⟂AC、∠C；
             step ≥3 半径 r 与 sin∠C = L/r。
  ── 几何（全部由题给量推出，不手调）──
     part1：r = mv0/(qB) = 2L = CO ⟹ 圆心就是 C；D = C + 2L(cos∠C, sin∠C)，
            ∠C = arctan(AO/CO) = arctan(1/2) ⟹ AC = √5 L、AD = AC − CD = (√5 − 2)L。
     part2：临界圆过 O、C ⟹ 圆心 X 在 OC 的中垂线 x = −L 上；又与 AC 相切于 C ⟹ CX ⟂ AC
            ⟹ X = (−L, −2L)、r = √5 L；且 sin∠C = CM/CX = L/r = 1/√5（与 ∠ACO 一致）。
  ── 画布 ──
     用户单位里 L = 160；数学原点 O 落在画布 (446, 188)（y 轴翻转）。三种 mode 共用这一套坐标，
     只是 viewBox 取景不同：stem / part1 只取三角形附近（378 × 218），part2 还要装下
     (−L, −2L) 的圆心与左侧公式（480 × 522）。图注一律走 <ChartLabel>（屏幕 px 口径），
     所以三种 mode 下标注一样大，不受 viewBox 缩放影响。
  ── 尺寸 ──
     解析页图栏约 460–480px、图高上限 460px ⟹ part2 的 --fig-max = 422px（自然高 459px，不触顶、
     也不会被 max-height letterbox 把 ChartLabel 的百分比定位弄偏）；题目页图栏约 390px，按栏宽自动缩。
-->
<script setup lang="ts">
import { computed, useId } from "vue";

const { mode = "stem", step = 0 } = defineProps<{
  /** Stem = 第 26 页干净题目图；part1 = 第 27 页第(1)问；part2 = 第 28 页第(2)问 */
  mode?: "stem" | "part1" | "part2";
  /** 点击步数（解析页由页面传 `:step="$clicks"`；stem 不使用） */
  step?: number;
}>();

/** 图内标注方位（与共享 <ChartLabel> 的 anchor 同名） */
type Anchor =
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/* ═══════════ 几何（viewBox 用户单位） ═══════════ */
/** 题给长度 L 换算到用户单位 */
const L = 160;
/** 数学原点 O 的画布位置（x 向右、y 向下） */
const X0 = 446;
const Y0 = 188;
/** 数学坐标（y 向上）→ 画布坐标（y 向下） */
const px = (m: number): number => X0 + m;
const py = (m: number): number => Y0 - m;

const O_PT = { x: px(0), y: py(0) };
const A_PT = { x: px(0), y: py(L) };
const C_PT = { x: px(-2 * L), y: py(0) };
const X_PT = { x: px(-L), y: py(-2 * L) };
const M_PT = { x: px(-L), y: py(0) };
const BASE_MID = { x: (C_PT.x + O_PT.x) / 2, y: Y0 };

/** ∠C = ∠ACO = arctan(AO / CO) = arctan(1/2) ≈ 26.565° */
const ANG_C = Math.atan(L / (2 * L));

/** 第(1)问：r = 2L，圆心恰是 C；D = C + 2L(cos∠C, sin∠C) 落在 AC 上，|CD| = 2L */
const R1 = 2 * L;
const D_PT = { x: C_PT.x + R1 * Math.cos(ANG_C), y: C_PT.y - R1 * Math.sin(ANG_C) };
const AD_MID = { x: (A_PT.x + D_PT.x) / 2, y: (A_PT.y + D_PT.y) / 2 };
/** CD 段标注：取 CD 中点朝圆弧一侧让开半径线 */
const CD_LABEL = { x: (C_PT.x + D_PT.x) / 2 + 8, y: (C_PT.y + D_PT.y) / 2 + 15 };

/** 第(2)问：临界圆过 O、C 且与 AC 相切于 C ⟹ X = (−L, −2L)、r = √5 L */
const R2 = Math.hypot(L, 2 * L);
/** 临界圆上 O、C 的极角（数学极角，逆时针为正） */
const PHI_O = Math.atan2(2 * L, L);
const PHI_C = Math.PI - PHI_O;

/** 圆弧采样成折线（圆心 c、半径 r、数学极角 from→to；画布 y 向下） */
const arcPath = (
  c: { x: number; y: number },
  r: number,
  [from, to]: [number, number],
  n = 48,
): string => {
  let d = "";

  for (let i = 0; i <= n; i += 1) {
    const phi = from + ((to - from) * i) / n;
    const x = c.x + r * Math.cos(phi);
    const y = c.y - r * Math.sin(phi);

    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }

  return d;
};

/** 第(1)问轨迹：绕 C、半径 2L，从 O 逆时针转到 D */
const ARC_1 = arcPath(C_PT, R1, [0, ANG_C]);
/** 第(2)问临界轨迹：绕 X、半径 √5L，从 O 转到 C（整段都在三角形内、与 AC 相切于 C） */
const ARC_2 = arcPath(X_PT, R2, [PHI_O, PHI_C]);
/** ∠C 的角弧（半径 22，从 CO 转到 CA） */
const ANGLE_C = arcPath(C_PT, 34, [0, ANG_C], 20);

/** 三角形顶点（磁场区域边界） */
const TRI_POINTS = `${C_PT.x},${C_PT.y} ${A_PT.x},${A_PT.y} ${O_PT.x},${O_PT.y}`;
/** 磁场 × 阵列裁进三角形用（不同页共用一个三角形，id 重复也无害） */
const clipId = `tfp-field-${useId()}`;

/**
 * 磁场 × 阵列（矩形网格，用 <clipPath> 裁成三角形）。
 *
 * 行列起点是按斜边界 AC（画布上 y = 251 − x/2）挑的：让每个 × 中心到 AC 的距离 f = y + x/2 − 251 都落在 16 的整数倍网格上（f ≡ 8 (mod
 * 16)），于是每个 × 的四条臂要么整条在三角形内、要么整条在外， 裁切后**不会留下半截 ×**（臂长 4.5 ⟹ 最贴边的一个也还有 1.25 用户单位余量）。
 */
const FIELD = {
  x: 134,
  y: 48,
  cols: 10,
  rows: 5,
  spacing: 32,
  size: 4.5,
  lineWidth: 2,
  opacity: 0.8,
};

/** 粒子源：O 点射向磁场内的四条短箭头（"各个方向"） 角度上限 146°：再往上（≈150°）正对 O 点旁 (422,176) 那个 ×，箭头会压住它的臂。 */
const SOURCE_ARROWS = [92, 110, 128, 146].map((deg) => {
  const a = (deg * Math.PI) / 180;

  return {
    from: O_PT,
    to: { x: O_PT.x + 22 * Math.cos(a), y: O_PT.y - 22 * Math.sin(a) },
  };
});

/* ── 第(2)问的直角标记：沿两条实线各取一小段，画成"小方角" ── */
/** AC 方向的单位矢量（C → A，画布坐标） */
const U_CA = { x: 2 / Math.sqrt(5), y: -1 / Math.sqrt(5) };
/** CX 反向的单位矢量（C 指向 X 的延长线，画布坐标）—— 切线在 C 处与半径垂直 */
const U_CX_BACK = { x: -1 / Math.sqrt(5), y: -2 / Math.sqrt(5) };
/** XC 半径线延长到 C 之外一点，好让"CX ⟂ AC"的小方角踩在实线上 */
const C_EXT = { x: C_PT.x + 16 * U_CX_BACK.x, y: C_PT.y + 16 * U_CX_BACK.y };

/** CX ⟂ AC 的小方角：画在 C 的左上方（AC 与 CX 延长线之间）。 若画在右下方（CA 与 CX 之间），小方角会横跨虚线底边 CO，糊成一团。 */
const RIGHT_C = [
  `M${(C_PT.x + 11 * U_CA.x).toFixed(1)},${(C_PT.y + 11 * U_CA.y).toFixed(1)}`,
  `L${(C_PT.x + 11 * (U_CA.x + U_CX_BACK.x)).toFixed(1)},${(C_PT.y + 11 * (U_CA.y + U_CX_BACK.y)).toFixed(1)}`,
  `L${(C_PT.x + 11 * U_CX_BACK.x).toFixed(1)},${(C_PT.y + 11 * U_CX_BACK.y).toFixed(1)}`,
].join(" ");

/** XM ⟂ OC 的小方角：画在 M 的左下侧（右下方留给底边中点的 M 标注） */
const RIGHT_M = [
  `M${M_PT.x - 9},${M_PT.y}`,
  `L${M_PT.x - 9},${M_PT.y + 9}`,
  `L${M_PT.x},${M_PT.y + 9}`,
].join(" ");

/* ═══════════ 取景与尺寸 ═══════════ */
const isPart2 = computed(() => mode === "part2");
/** 画布取景：part2 要装下圆心 X(−L,−2L) 与左侧公式；stem / part1 只取三角形与标注 */
const VB = computed(() =>
  isPart2.value ? { x: 0, y: 0, w: 480, h: 522 } : { x: 100, y: 2, w: 378, h: 218 },
);
const viewBox = computed(() => `${VB.value.x} ${VB.value.y} ${VB.value.w} ${VB.value.h}`);
/** 图宽上限：part2 取 422px（自然高 459px，图高上限 460px 不触发裁切）；其余吃满图栏 */
const figMax = computed(() => (isPart2.value ? "422px" : "520px"));

/** 标注点 → 容器百分比（ChartLabel 按容器百分比定位，容器与 svg 同宽同高） */
const pctX = (x: number): number => ((x - VB.value.x) / VB.value.w) * 100;
const pctY = (y: number): number => ((y - VB.value.y) / VB.value.h) * 100;

/* ═══════════ 图注（真 KaTeX，屏幕 px 口径） ═══════════ */
interface FigLabel {
  key: string;
  tex: string;
  /** 标注点（viewBox 用户单位） */
  x: number;
  y: number;
  anchor: Anchor;
  size: number;
  color?: string;
  dx?: number;
  dy?: number;
}

const labels = computed<FigLabel[]>(() => {
  const list: FigLabel[] = [
    { key: "A", tex: "A", x: A_PT.x, y: A_PT.y, anchor: "top-right", size: 16 },
    { key: "C", tex: "C", x: C_PT.x, y: C_PT.y, anchor: "bottom-left", size: 16 },
    { key: "O", tex: "O", x: O_PT.x, y: O_PT.y, anchor: "right", size: 16 },
    { key: "L", tex: "L", x: O_PT.x, y: Y0 - L / 2, anchor: "right", size: 15 },
  ];

  // 题目页 / 第(1)问：底边整段 CO = 2L。
  // part2 不画 2L —— 底边中点已有 M，2L 会被读成 MO = 2L（实际 MO = L）⟹ 改标 CM = MO = L。
  if (!isPart2.value) {
    list.push({
      key: "2L",
      tex: "2L",
      x: BASE_MID.x,
      y: BASE_MID.y,
      anchor: "bottom",
      size: 15,
    });
  }

  if (mode === "part1" && step >= 2) {
    list.push(
      { key: "D", tex: "D", x: D_PT.x, y: D_PT.y, anchor: "top-left", size: 16 },
      { key: "CD", tex: "CD", x: CD_LABEL.x, y: CD_LABEL.y, anchor: "center", size: 15 },
      { key: "AD", tex: "AD", x: AD_MID.x, y: AD_MID.y, anchor: "top", size: 15 },
    );
  }

  if (isPart2.value && step >= 2) {
    list.push(
      { key: "X", tex: "X", x: X_PT.x, y: X_PT.y, anchor: "left", size: 16, dx: -6 },
      // M 在底边中点上：标注下移让开 XM 的直角标记
      { key: "M", tex: "M", x: M_PT.x, y: M_PT.y, anchor: "bottom", size: 15, dy: 8 },
      // M 是 OC 中点 ⟹ CM = MO = L（左栏正文"设 M 为 OC 中点，CM = L"与之对应）
      { key: "CM", tex: "L", x: (C_PT.x + M_PT.x) / 2, y: Y0, anchor: "bottom", size: 15 },
      { key: "MO", tex: "L", x: (M_PT.x + O_PT.x) / 2, y: Y0, anchor: "bottom", size: 15 },
      { key: "angC", tex: String.raw`\angle C`, x: 148, y: 160, anchor: "center", size: 16 },
    );
  }

  if (isPart2.value && step >= 3) {
    list.push(
      {
        key: "r",
        tex: "r",
        x: (C_PT.x + X_PT.x) / 2,
        y: (C_PT.y + X_PT.y) / 2,
        anchor: "left",
        size: 16,
        color: "var(--c-accent)",
      },
      {
        key: "sinC",
        tex: String.raw`\sin\angle C = \dfrac{L}{r}`,
        x: 85,
        y: 345,
        anchor: "center",
        size: 15,
        color: "var(--c-accent)",
      },
    );
  }

  return list;
});
</script>

<template>
  <div class="fig-triangle-pass" :style="{ '--fig-max': figMax }">
    <svg
      class="fig-svg"
      :viewBox="viewBox"
      :width="VB.w"
      :height="VB.h"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="以直角三角形 AOC 为边界的匀强磁场：O 点粒子源的发射方向，以及圆弧轨迹与临界圆心的几何分析"
    >
      <defs>
        <clipPath :id="clipId">
          <polygon :points="TRI_POINTS" />
        </clipPath>
      </defs>
      <!-- ① 磁场区域：三角形内部垂直纸面向里的匀强磁场（× 阵列裁进三角形） -->
      <g :clip-path="`url(#${clipId})`">
        <FieldDots
          :x="FIELD.x"
          :y="FIELD.y"
          :cols="FIELD.cols"
          :rows="FIELD.rows"
          :spacing="FIELD.spacing"
          :size="FIELD.size"
          :line-width="FIELD.lineWidth"
          :opacity="FIELD.opacity"
          dir="in"
        />
      </g>
      <!-- ② 三角形边界：磁场区域边界，题目原图就是虚线 -->
      <polygon
        :points="TRI_POINTS"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="2"
        stroke-dasharray="8 6"
        stroke-linejoin="round"
      />
      <!-- ③ 粒子源：O 点 + 几条射向磁场内不同方向的短箭头 -->
      <CourseArrow
        v-for="(s, i) in SOURCE_ARROWS"
        :key="`src-${i}`"
        :from="s.from"
        :to="s.to"
        stroke="var(--c-text-dim)"
        :stroke-width="2.2"
        :head-size="6"
      />
      <circle :cx="O_PT.x" :cy="O_PT.y" r="4.5" fill="var(--c-text)" />
      <!-- ④ 第(1)问 step ≥1：沿 OA 射入时圆心恰是 C（CO = 2L = r），轨迹为绕 C 的圆弧 O→D -->
      <g v-if="mode === 'part1' && step >= 1">
        <circle
          :cx="C_PT.x"
          :cy="C_PT.y"
          r="5.5"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="2.2"
        />
        <line
          :x1="C_PT.x"
          :y1="C_PT.y"
          :x2="D_PT.x"
          :y2="D_PT.y"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          stroke-dasharray="7 5"
        />
        <path
          :d="ARC_1"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="2.8"
          stroke-linecap="round"
        />
      </g>
      <!-- ⑤ 第(1)问 step ≥2：补 D 点（CD、AD 段标注由 ChartLabel 出） -->
      <circle
        v-if="mode === 'part1' && step >= 2"
        :cx="D_PT.x"
        :cy="D_PT.y"
        r="3.8"
        fill="var(--c-accent)"
      />
      <!-- ⑥ 第(2)问 step ≥1：临界轨迹 —— 过 O、C 且与 AC 相切于 C，粒子恰好从 C 射出 -->
      <path
        v-if="mode === 'part2' && step >= 1"
        :d="ARC_2"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="2.8"
        stroke-linecap="round"
      />
      <!-- ⑦ 第(2)问 step ≥2：圆心 X、中点 M、两条半径、两处直角标记、∠C 角弧 -->
      <g v-if="mode === 'part2' && step >= 2">
        <line
          :x1="X_PT.x"
          :y1="X_PT.y"
          :x2="C_EXT.x"
          :y2="C_EXT.y"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          stroke-dasharray="7 5"
        />
        <line
          :x1="X_PT.x"
          :y1="X_PT.y"
          :x2="O_PT.x"
          :y2="O_PT.y"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          stroke-dasharray="7 5"
        />
        <line
          :x1="X_PT.x"
          :y1="X_PT.y"
          :x2="M_PT.x"
          :y2="M_PT.y"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          stroke-dasharray="7 5"
        />
        <path
          :d="RIGHT_C"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          :d="RIGHT_M"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          :d="ANGLE_C"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <circle :cx="M_PT.x" :cy="M_PT.y" r="3.4" fill="var(--c-text-dim)" />
        <circle
          :cx="X_PT.x"
          :cy="X_PT.y"
          r="5.5"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="2.2"
        />
      </g>
    </svg>
    <!-- ⑧ 图注：点、边长、段与公式（真 KaTeX，屏幕 px 口径） -->
    <ChartLabel
      v-for="l in labels"
      :key="l.key"
      :x-percent="pctX(l.x)"
      :y-percent="pctY(l.y)"
      :parts="[{ tex: l.tex }]"
      :anchor="l.anchor"
      :size="l.size"
      :color="l.color ?? 'var(--c-text)'"
      :dx="l.dx ?? 0"
      :dy="l.dy ?? 0"
      halo
    />
  </div>
</template>

<style scoped>
/* 图栏宽度：题目页约 390px、解析页约 460–480px；--fig-max 由组件按 mode 内联给出。
   容器与 svg 同宽同高（ChartLabel 按容器百分比定位，两者必须一致）。 */
.fig-triangle-pass {
  --fig-max: 520px;

  position: relative;
  width: 100%;
  max-width: var(--fig-max);
  margin: 0 auto;
}

.fig-triangle-pass .fig-svg {
  display: block;

  width: 100%;
  max-width: var(--fig-max);
  height: auto;
  margin: 0 auto;
}
</style>
