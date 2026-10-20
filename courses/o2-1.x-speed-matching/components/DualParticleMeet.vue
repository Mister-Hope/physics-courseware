<!--
  选必二 1.x《复合场中的配速法与摆线运动》· 章末补充例题（例 12）配图
  ── 题面（slides.md 给出，本组件只画图）──
     xOy 平面内充满垂直纸面向外（·）的匀强磁场 B；质子（质量 m、电荷量 e）某时刻从 (L₀, 0) 沿 −y 射入；
     α 粒子（质量 4m、电荷量 2e）同时从 (−L₀, 0) 射入、速度方向在 xOy 平面内（题图未给方向）。
     正电荷在向外的磁场中顺时针转；两粒子在原点相遇定出各自的轨迹。
  ── 分步（mode × step）──
     mode="stem"（第 32 页，干净题干图，随点击不出现任何分析标注）：
        xOy 坐标轴 + 全平面 · 点阵 + 两个入射点（−L₀ / L₀）+ 原点 O
        + 质子沿 −y 射入的速度箭头（v_p）；α 粒子只画点 + 标 α（方向未知，不画它的速度）。
     mode="proton"（第 33 页，:step="$clicks"）：
        step 0 干净图；step ≥1 质子圆周：C = (L₀/2, 0)、半径 r_p = L₀/2（圆过 (L₀,0) 与 O）+ 顺时针方向箭头；
        step ≥2 半径标注 r_p = L₀/2、原点经过点高亮、半圈用时 t = πm/(eB)。
     mode="alpha"（第 34 页 step 0/1/2；第 35 页 :step="$clicks + 2" 即 2/3/4）：
        step 0 干净图；
        step ≥1 两条镜像路径：从 (−L₀,0) 分别向右上 45°、左上 135° 入射的两支速度箭头
             + 两个半径相同的圆（圆心在弦 (−L₀,0)O 中垂线两侧）+ 顺时针走到 O 的两段弧
             （C₁ = (−L₀/2, −L₀/2) 小弧 π/2；C₂ = (−L₀/2, L₀/2) 大弧 3π/2，蓝色小弧 / 青色大弧）；
        step ≥2 两个圆心 C₁、C₂、两条弦与四条半径线、弦长 L₀、两段弧的圆心角弧线（先不标数字）；
        step ≥3 圆心角数字 θ = π/2（小弧）、θ = 3π/2（大弧）；
        step ≥4 两侧时间标注 t = πm/(eB)（小弧）、t = 3πm/(eB)（大弧）。
  ── 几何（全部按题给条件精确算，不是描图）──
     数学坐标（y 向上）→ SVG 坐标（y 向下）：X = ox + s·x、Y = oy − s·y，s = L₀ 的像素长。
     · 质子：圆心 (L₀/2, 0)、半径 L₀/2 —— 原点在圆上 ⟹ |L₀ − r_p| = r_p；从 (L₀,0) 顺时针转半圈到 O。
     · α：两条镜像路径满足弦长 L₀ = 2r_α·sin(θ/2)，时间条件再定出 θ = π/2 或 3π/2 ⟹ r_α = L₀/√2：
         C₁ = (−L₀/2, −L₀/2)：到 (−L₀,0) 的半径方向 135°、到 O 的方向 45° ⟹ 顺时针扫 90°（小弧），入射方向 (√2/2, √2/2)；
         C₂ = (−L₀/2, +L₀/2)：两个半径方向 225° / 315° ⟹ 顺时针扫 270°（大弧），入射方向 (−√2/2, √2/2)。
       两圆半径相同（≈0.707L₀），互相镜像于 x 轴。
     三个页面共用同一组件、但画幅不同（右栏宽度不同）：
         stem  540×360（题目页右栏约 420px）、proton 480×420、alpha 500×470（解析页右栏约 460–480px）。
  ── 图内标注 ──
     ⛔ SVG 的 <text> 里排不了下标：`v<tspan>p</tspan>` 会被格式化折行，两个文本节点之间的换行
     在 SVG 里渲染成一个空格（"v p" 裂开）。所以带上标 / 下标的量（v_p、−L₀、L₀、C₁、C₂、r_α、θ、t…）
     一律交给共享 <ChartLabel>（HTML 覆盖层 + 真 KaTeX）；只有坐标轴字母 x、y 用 SVG <text>
     （KaTeX_Math + font-style="italic"）。
-->
<script setup lang="ts">
import { computed } from "vue";

const { mode = "stem", step = 0 } = defineProps<{
  /** Stem = 干净题干图；proton = 质子过原点（step 0/1/2）；alpha = α 的两条镜像路径（step 0~4） */
  mode?: "stem" | "proton" | "alpha";
  /** 显示到第几步；只新增元素、不顶跑已可见的元素 */
  step?: number;
}>();

/** 画布上的点（viewBox 用户单位） */
interface Pt {
  x: number;
  y: number;
}

/** 一条箭头的两端 */
interface ArrowEnds {
  from: Pt;
  to: Pt;
}

/* ═══════════ 版面常量（viewBox 用户单位，按 16px 体系） ═══════════ */
/** 画幅 w/h + 原点 (ox, oy) + L₀ 的像素长 s：三页右栏宽度不同，各给一套 */
const VIEW = computed(() =>
  mode === "alpha"
    ? { w: 500, h: 470, ox: 296, oy: 235, s: 148 }
    : mode === "proton"
      ? { w: 480, h: 420, ox: 240, oy: 205, s: 176 }
      : { w: 540, h: 360, ox: 270, oy: 190, s: 150 },
);

/** 坐标轴两端（负半轴比正半轴略短，箭头尖端落在端点） */
const AXIS = computed(() =>
  mode === "alpha"
    ? { x0: 34, x1: 470, y0: 452, y1: 24 }
    : mode === "proton"
      ? { x0: 30, x1: 452, y0: 404, y1: 24 }
      : { x0: 36, x1: 508, y0: 338, y1: 28 },
);

/** · 点阵：铺满整幅画布的匀强磁场（间距 30、记号半长 5） */
const DOTS = computed(() =>
  mode === "alpha"
    ? { x: 44, y: 46, cols: 15, rows: 13 }
    : mode === "proton"
      ? { x: 44, y: 46, cols: 14, rows: 12 }
      : { x: 46, y: 52, cols: 16, rows: 10 },
);

/** 字体：量用 KaTeX_Math（斜体）、单位/点名用 KaTeX_Main（正体） */
const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";

/** α 小弧（C₁ 下侧、圆心角 π/2）配蓝；α 大弧（C₂ 上侧、圆心角 3π/2）配青 */
const SMALL_COLOR = "var(--c-velocity)";
const LARGE_COLOR = "var(--c-physics)";

/** α 轨迹半径 r_α = L₀/√2（以 L₀ 为单位） */
const R_ALPHA = 1 / Math.SQRT2;

/* ═══════════ 坐标换算与几何工具 ═══════════ */
const O = computed<Pt>(() => ({ x: VIEW.value.ox, y: VIEW.value.oy }));
const W = computed<number>(() => VIEW.value.w);
const H = computed<number>(() => VIEW.value.h);

/** 数学坐标（y 向上，单位 L₀）→ SVG 坐标（y 向下） */
const toSvg = (mx: number, my: number): Pt => ({
  x: O.value.x + mx * VIEW.value.s,
  y: O.value.y - my * VIEW.value.s,
});

interface ArcOptions {
  /** 圆心（数学坐标，单位 L₀） */
  cx: number;
  cy: number;
  /** 半径（单位 L₀） */
  r: number;
  /** 起 / 止极角（数学坐标，顺时针走 ⟹ phi1 < phi0） */
  phi0: number;
  phi1: number;
  /** 采样段数 */
  n?: number;
}

/** 顺时针圆弧采样成折线（比手写 A 命令直观，不用纠结 sweep-flag 的朝向） */
const arcPath = ({ cx, cy, r, phi0, phi1, n = 64 }: ArcOptions): string => {
  const points: string[] = [];

  for (let i = 0; i <= n; i += 1) {
    const phi = phi0 + ((phi1 - phi0) * i) / n;
    const p = toSvg(cx + r * Math.cos(phi), cy + r * Math.sin(phi));

    points.push(`${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }

  return points.join(" ");
};

interface TangentOptions extends ArcOptions {
  /** 箭头半长（px） */
  half?: number;
  /** 整体沿外法向外移（px）：0 = 压在轨迹上，>0 = 浮在轨迹外侧 */
  offset?: number;
}

/**
 * 轨迹上的运动方向箭头：在极角 φ 处沿顺时针切向画一小段直箭头，并整体外移 offset。
 *
 * 数学切向 = (sinφ, −cosφ)，翻到 SVG 后 = (sinφ, cosφ)； 外法向从 (cosφ, sinφ) 翻成 (cosφ, −sinφ)。
 */
const tangentArrow = ({ cx, cy, r, phi, half = 17, offset = 8 }: TangentOptions): ArrowEnds => {
  const p = toSvg(cx + r * Math.cos(phi), cy + r * Math.sin(phi));
  const dir = { x: Math.sin(phi), y: Math.cos(phi) };
  const out = { x: Math.cos(phi), y: -Math.sin(phi) };
  const base = { x: p.x + out.x * offset, y: p.y + out.y * offset };

  return {
    from: { x: base.x - dir.x * half, y: base.y - dir.y * half },
    to: { x: base.x + dir.x * half, y: base.y + dir.y * half },
  };
};

/* ═══════════ 题给元素（三页常显） ═══════════ */
/** α 粒子入射点 (−L₀, 0) 与质子入射点 (L₀, 0) */
const ALPHA_ENTRY = computed<Pt>(() => toSvg(-1, 0));
const PROTON_ENTRY = computed<Pt>(() => toSvg(1, 0));
/** 质子沿 −y 射入的速度箭头（画在题图的入场点旁） */
const PROTON_VEL_TIP = computed<Pt>(() => ({
  x: PROTON_ENTRY.value.x,
  y: PROTON_ENTRY.value.y + 52,
}));

/* ═══════════ 质子（第 33 页） ═══════════ */
/** 圆心 C = (L₀/2, 0)、半径 r_p = L₀/2：圆过 (L₀,0) 与原点 */
const PROTON_C = computed<Pt>(() => toSvg(0.5, 0));
const PROTON_R = computed<number>(() => VIEW.value.s / 2);
/** 从 (L₀,0) 顺时针转过半圈到原点（φ 从 0 减到 −π） */
const PROTON_TRAVEL = computed<string>(() =>
  arcPath({ cx: 0.5, cy: 0, r: 0.5, phi0: 0, phi1: -Math.PI }),
);
/** 轨迹最低点的顺时针方向箭头：压在弧上，方向朝 −x */
const PROTON_TANGENT = computed<ArrowEnds>(() =>
  tangentArrow({ cx: 0.5, cy: 0, r: 0.5, phi: -Math.PI / 2, half: 19, offset: 0 }),
);
/** 直径 O→(L₀,0)：两段半径都落在这条线上，r_p 标注在它上方 */
const PROTON_DIAMETER = computed<ArrowEnds>(() => ({ from: toSvg(0, 0), to: toSvg(1, 0) }));

/* ═══════════ α 粒子（第 34、35 页） ═══════════ */
/** 两个镜像圆心：C₁ = (−L₀/2, −L₀/2)（小弧）、C₂ = (−L₀/2, L₀/2)（大弧） */
const C1 = computed<Pt>(() => toSvg(-0.5, -0.5));
const C2 = computed<Pt>(() => toSvg(-0.5, 0.5));
/** 从 (−L₀,0) 顺时针走到原点的两段弧（小弧扫 90°、大弧扫 270°） */
const SMALL_ARC = computed<string>(() =>
  arcPath({ cx: -0.5, cy: -0.5, r: R_ALPHA, phi0: (3 * Math.PI) / 4, phi1: Math.PI / 4 }),
);
const LARGE_ARC = computed<string>(() =>
  arcPath({ cx: -0.5, cy: 0.5, r: R_ALPHA, phi0: (5 * Math.PI) / 4, phi1: -Math.PI / 4 }),
);
/** 两段弧的圆心角弧线标记（半径 26px，先不标数字） */
const ANGLE_SMALL = computed<string>(() =>
  arcPath({
    cx: -0.5,
    cy: -0.5,
    r: 26 / VIEW.value.s,
    phi0: (3 * Math.PI) / 4,
    phi1: Math.PI / 4,
    n: 16,
  }),
);
const ANGLE_LARGE = computed<string>(() =>
  arcPath({
    cx: -0.5,
    cy: 0.5,
    r: 26 / VIEW.value.s,
    phi0: (5 * Math.PI) / 4,
    phi1: -Math.PI / 4,
    n: 72,
  }),
);
/** 两段弧顶点的顺时针方向箭头（浮在弧外侧） */
const SMALL_TANGENT = computed<ArrowEnds>(() =>
  tangentArrow({ cx: -0.5, cy: -0.5, r: R_ALPHA, phi: Math.PI / 2, offset: 8 }),
);
const LARGE_TANGENT = computed<ArrowEnds>(() =>
  tangentArrow({ cx: -0.5, cy: 0.5, r: R_ALPHA, phi: Math.PI / 2, offset: 7 }),
);
/** 圆心到弦（(−L₀,0)→O）两端的四条半径线 */
const RADII = computed<({ key: string } & ArrowEnds)[]>(() => [
  { key: "c1-a", from: C1.value, to: ALPHA_ENTRY.value },
  { key: "c1-o", from: C1.value, to: O.value },
  { key: "c2-a", from: C2.value, to: ALPHA_ENTRY.value },
  { key: "c2-o", from: C2.value, to: O.value },
]);
/** 弦 (−L₀,0)→O 就是 x 轴上的一段，用 accent 加粗高亮它 */
const CHORD = computed<ArrowEnds>(() => ({ from: ALPHA_ENTRY.value, to: O.value }));

/** 从 (−L₀,0) 出发、数学方向角 deg 的入射速度箭头（长度 46px；y 翻转后 dy 取负） */
const entryVelocity = (deg: number): ArrowEnds => {
  const angle = (deg * Math.PI) / 180;
  const start = toSvg(-1, 0);

  return {
    from: start,
    to: { x: start.x + Math.cos(angle) * 46, y: start.y - Math.sin(angle) * 46 },
  };
};
/** 小弧（C₁）：入射向右上 45°；大弧（C₂）：入射向左上 135° */
const VEL_SMALL = computed<ArrowEnds>(() => entryVelocity(45));
const VEL_LARGE = computed<ArrowEnds>(() => entryVelocity(135));

/* ═══════════ 图内标注（ChartLabel 按容器百分比定位，字号屏幕 px 口径） ═══════════ */
const pctX = (x: number): number => (x / W.value) * 100;
const pctY = (y: number): number => (y / H.value) * 100;

interface LabelSpec {
  key: string;
  /** KaTeX 源码（带下标 / 分式的量一律走 ChartLabel，SVG <text> 排不了） */
  tex: string;
  /** 文字中心（viewBox 用户单位）——位置避开轨迹与辅助线，见各条的注释 */
  x: number;
  y: number;
  /** Step ≥ from 才出现，默认 0 */
  from?: number;
  color?: string;
  size?: number;
}

type FigLabel = Required<LabelSpec>;

/**
 * 三套标注（坐标按各页画幅手排；标注点 = 文字中心）。
 *
 * - Stem / proton 的干净图：−L₀、L₀ 标在入射点下方，α 标在 α 入射点上方，v_p 标在速度箭头右侧。
 * - Proton：C 标在圆心的右下方、r_p 标在直径上方（避开圆周）、半圈用时标在圆的底部外侧。
 * - Alpha：C₁/C₂ 标在圆心外侧（避开圆心角弧线）、r_α 在 C₂→O 半径右侧、弦长 L₀ 在弦下方。
 * - Alpha：θ 标在角弧旁，两条路径的用时放在画幅底部（颜色与两段弧一一对应）。
 */
const FIG_LABELS: Record<"stem" | "proton" | "alpha", LabelSpec[]> = {
  alpha: [
    /* 干净图上的点名（常显） */
    { key: "O", tex: String.raw`O`, x: 296, y: 259 },
    { key: "minus-l0", tex: String.raw`-L_0`, x: 114, y: 224 },
    { key: "alpha", tex: String.raw`\alpha`, x: 150, y: 259, size: 16 },
    { key: "l0", tex: String.raw`L_0`, x: 429, y: 257 },
    { key: "vp", tex: String.raw`v_p`, x: 473, y: 267, color: "var(--c-velocity)", size: 16 },
    /* step ≥1：两条可能的入射方向 */
    { key: "v-small", tex: String.raw`v_\alpha`, x: 169, y: 191, from: 1, color: SMALL_COLOR },
    { key: "v-large", tex: String.raw`v_\alpha`, x: 104, y: 193, from: 1, color: LARGE_COLOR },
    /* step ≥2：两个圆心、半径符号、弦长 */
    { key: "c1", tex: String.raw`C_1`, x: 191, y: 318, from: 2, size: 16 },
    { key: "c2", tex: String.raw`C_2`, x: 184, y: 150, from: 2, size: 16 },
    {
      key: "r-alpha",
      tex: String.raw`r_\alpha`,
      x: 270,
      y: 187,
      from: 2,
      color: "var(--c-text-dim)",
    },
    { key: "chord", tex: String.raw`L_0`, x: 222, y: 250, from: 2, color: "var(--c-accent)" },
    /* step ≥3：圆心角数字 */
    {
      key: "theta-small",
      tex: String.raw`\theta=\pi/2`,
      x: 268,
      y: 300,
      from: 3,
      color: "var(--c-accent)",
    },
    {
      key: "theta-large",
      tex: String.raw`\theta=3\pi/2`,
      x: 222,
      y: 118,
      from: 3,
      color: "var(--c-accent)",
    },
    /* step ≥4：两条路径各自的用时 */
    {
      key: "t-small",
      tex: String.raw`t=\dfrac{\pi m}{eB}`,
      x: 150,
      y: 437,
      from: 4,
      color: SMALL_COLOR,
      size: 16,
    },
    {
      key: "t-large",
      tex: String.raw`t=\dfrac{3\pi m}{eB}`,
      x: 360,
      y: 437,
      from: 4,
      color: LARGE_COLOR,
      size: 16,
    },
  ],
  proton: [
    { key: "O", tex: String.raw`O`, x: 240, y: 229 },
    { key: "minus-l0", tex: String.raw`-L_0`, x: 64, y: 227 },
    { key: "alpha", tex: String.raw`\alpha`, x: 64, y: 183, size: 16 },
    { key: "l0", tex: String.raw`L_0`, x: 401, y: 227 },
    { key: "vp", tex: String.raw`v_p`, x: 445, y: 237, color: "var(--c-velocity)", size: 16 },
    { key: "c", tex: String.raw`C`, x: 348, y: 225, from: 1, size: 16 },
    { key: "rp", tex: String.raw`r_p=L_0/2`, x: 292, y: 182, from: 2, color: "var(--c-accent)" },
    {
      key: "tp",
      tex: String.raw`t=\dfrac{\pi m}{eB}`,
      x: 328,
      y: 341,
      from: 2,
      color: "var(--c-accent)",
      size: 16,
    },
  ],
  stem: [
    { key: "O", tex: String.raw`O`, x: 270, y: 214 },
    { key: "minus-l0", tex: String.raw`-L_0`, x: 120, y: 212 },
    { key: "l0", tex: String.raw`L_0`, x: 405, y: 212 },
    { key: "alpha", tex: String.raw`\alpha`, x: 120, y: 168, size: 16 },
    { key: "vp", tex: String.raw`v_p`, x: 446, y: 222, color: "var(--c-velocity)", size: 16 },
  ],
};

/** 补上默认的字号 / 颜色 / 起始步 */
const LABELS = computed<FigLabel[]>(() =>
  FIG_LABELS[mode].map((label) => ({
    key: label.key,
    tex: label.tex,
    x: label.x,
    y: label.y,
    from: label.from ?? 0,
    color: label.color ?? "var(--c-text)",
    size: label.size ?? 15,
  })),
);
</script>

<template>
  <div class="fig-dual-particle">
    <svg
      class="fig-svg"
      :viewBox="`0 0 ${W} ${H}`"
      :width="W"
      :height="H"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- ① 匀强磁场：全平面垂直纸面向外（·）的裸点阵 -->
      <FieldDots
        :x="DOTS.x"
        :y="DOTS.y"
        :cols="DOTS.cols"
        :rows="DOTS.rows"
        :spacing="30"
        :size="5"
        dir="out"
        :opacity="0.7"
      />

      <!-- ② xOy 坐标轴与轴字母 -->
      <CourseArrow
        :from="{ x: AXIS.x0, y: O.y }"
        :to="{ x: AXIS.x1, y: O.y }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.8"
      />
      <CourseArrow
        :from="{ x: O.x, y: AXIS.y0 }"
        :to="{ x: O.x, y: AXIS.y1 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.8"
      />
      <text
        :x="AXIS.x1 + 9"
        :y="O.y + 6"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
        fill="var(--c-text-dim)"
      >
        x
      </text>
      <text
        :x="O.x + 10"
        :y="38"
        :font-family="MATH_FONT"
        font-style="italic"
        font-size="16"
        fill="var(--c-text-dim)"
      >
        y
      </text>

      <!-- ③ 质子（第 33 页）：半径 r_p = L₀/2 的圆周轨迹 + 圆心 C + 方向箭头 -->
      <g v-if="mode === 'proton' && step >= 1">
        <circle
          :cx="PROTON_C.x"
          :cy="PROTON_C.y"
          :r="PROTON_R"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="2"
          opacity="0.45"
        />
        <path
          :d="PROTON_TRAVEL"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <circle :cx="PROTON_C.x" :cy="PROTON_C.y" r="3.6" fill="var(--c-text)" />
        <CourseArrow
          :from="PROTON_TANGENT.from"
          :to="PROTON_TANGENT.to"
          stroke="var(--c-velocity)"
          :stroke-width="3"
        />
      </g>

      <!-- ④ 质子（step ≥2）：直径上的两段半径（过 O 与 (L₀,0)） -->
      <g v-if="mode === 'proton' && step >= 2">
        <line
          :x1="PROTON_DIAMETER.from.x"
          :y1="PROTON_DIAMETER.from.y"
          :x2="PROTON_DIAMETER.to.x"
          :y2="PROTON_DIAMETER.to.y"
          stroke="var(--c-accent)"
          stroke-width="5"
          stroke-linecap="round"
          opacity="0.55"
        />
      </g>

      <!-- ⑤ α（第 34 页 step ≥1）：两条镜像圆周（虚线淡）+ 两段实际走过的弧（实线）+ 两个入射方向 + 方向箭头 -->
      <g v-if="mode === 'alpha' && step >= 1">
        <circle
          :cx="C1.x"
          :cy="C1.y"
          :r="R_ALPHA * VIEW.s"
          fill="none"
          :stroke="SMALL_COLOR"
          stroke-width="1.6"
          stroke-dasharray="5 7"
          opacity="0.28"
        />
        <circle
          :cx="C2.x"
          :cy="C2.y"
          :r="R_ALPHA * VIEW.s"
          fill="none"
          :stroke="LARGE_COLOR"
          stroke-width="1.6"
          stroke-dasharray="5 7"
          opacity="0.28"
        />
        <path
          :d="SMALL_ARC"
          fill="none"
          :stroke="SMALL_COLOR"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          :d="LARGE_ARC"
          fill="none"
          :stroke="LARGE_COLOR"
          stroke-width="3"
          stroke-linecap="round"
        />
        <CourseArrow
          :from="VEL_SMALL.from"
          :to="VEL_SMALL.to"
          :stroke="SMALL_COLOR"
          :stroke-width="3"
        />
        <CourseArrow
          :from="VEL_LARGE.from"
          :to="VEL_LARGE.to"
          :stroke="LARGE_COLOR"
          :stroke-width="3"
        />
        <CourseArrow
          :from="SMALL_TANGENT.from"
          :to="SMALL_TANGENT.to"
          :stroke="SMALL_COLOR"
          :stroke-width="3"
        />
        <CourseArrow
          :from="LARGE_TANGENT.from"
          :to="LARGE_TANGENT.to"
          :stroke="LARGE_COLOR"
          :stroke-width="3"
        />
      </g>

      <!-- ⑥ α（step ≥2）：弦 L₀ 高亮 + 四条半径线 + 两个圆心 + 两段圆心角弧线标记 -->
      <g v-if="mode === 'alpha' && step >= 2">
        <line
          :x1="CHORD.from.x"
          :y1="CHORD.from.y"
          :x2="CHORD.to.x"
          :y2="CHORD.to.y"
          stroke="var(--c-accent)"
          stroke-width="5"
          stroke-linecap="round"
          opacity="0.5"
        />
        <line
          v-for="radius in RADII"
          :key="radius.key"
          :x1="radius.from.x"
          :y1="radius.from.y"
          :x2="radius.to.x"
          :y2="radius.to.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.5"
          stroke-dasharray="6 5"
        />
        <circle :cx="C1.x" :cy="C1.y" r="3.6" fill="var(--c-text)" />
        <circle :cx="C2.x" :cy="C2.y" r="3.6" fill="var(--c-text)" />
        <path
          :d="ANGLE_SMALL"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          :d="ANGLE_LARGE"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>

      <!-- ⑦ 题给元素：两个入射点、原点、质子的入射速度（画在最上层，压在轨迹端点与坐标轴上） -->
      <circle :cx="ALPHA_ENTRY.x" :cy="ALPHA_ENTRY.y" r="3.6" fill="var(--c-text)" />
      <circle :cx="PROTON_ENTRY.x" :cy="PROTON_ENTRY.y" r="3.6" fill="var(--c-text)" />
      <CourseArrow
        :from="PROTON_ENTRY"
        :to="PROTON_VEL_TIP"
        stroke="var(--c-velocity)"
        :stroke-width="3"
      />
      <circle :cx="O.x" :cy="O.y" r="3.4" fill="var(--c-text)" />

      <!-- ⑧ 质子（step ≥2）：原点经过点高亮 —— 画在原点白点之上，accent 圆点 + 高亮环 -->
      <g v-if="mode === 'proton' && step >= 2">
        <circle :cx="O.x" :cy="O.y" r="11" fill="none" stroke="var(--c-accent)" stroke-width="2" />
        <circle :cx="O.x" :cy="O.y" r="5" fill="var(--c-accent)" />
      </g>
    </svg>

    <!-- ⑨ 图内标注：真 KaTeX 覆盖层（带下标 / 分式的量必须走这里） -->
    <ChartLabel
      v-for="label in LABELS"
      :key="label.key"
      :x-percent="pctX(label.x)"
      :y-percent="pctY(label.y)"
      :parts="[{ tex: label.tex }]"
      :size="label.size"
      :color="label.color"
      :visible="step >= label.from"
      halo
    />
  </div>
</template>

<style scoped>
/* 三页共用：题目页右栏约 420px（stem 540×360 缩到 ~420×280）；
   解析页右栏约 460–480px（proton 480×420、alpha 500×470 都落在 460 以内，
   不会被课程样式 `.qp-fig svg { max-height: 460px }` 压变形 —— 一旦触发 max-height，
   svg 会等比留白而 ChartLabel 仍按容器百分比定位，标注就会错位）。
   容器与 svg 同宽同高（ChartLabel 按容器百分比定位，两者必须一致）。 */
.fig-dual-particle {
  --fig-max: 480px;

  position: relative;
  width: 100%;
  max-width: var(--fig-max);
  margin: 0 auto;
}

.fig-dual-particle .fig-svg {
  display: block;
  width: 100%;
  max-width: var(--fig-max);
  height: auto;
}
</style>
