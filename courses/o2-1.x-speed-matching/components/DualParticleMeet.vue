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

/* ═══════════ 版面常量（viewBox 用户单位，按 16px 体系） ═══════════ */
/** 画幅 + 原点 + L₀ 的像素长：三页右栏宽度不同，各给一套 */
const VIEW = computed(() => {
  if (mode === "alpha") {
    return { w: 500, h: 470, ox: 296, oy: 235, s: 148 };
  }
  if (mode === "proton") {
    return { w: 480, h: 420, ox: 240, oy: 205, s: 176 };
  }
  return { w: 540, h: 360, ox: 270, oy: 190, s: 150 };
});

/** 坐标轴两端（负半轴比正半轴略短，箭头尖端落在端点） */
const AXIS = computed(() => {
  if (mode === "alpha") return { x0: 34, x1: 470, y0: 452, y1: 24 };
  if (mode === "proton") return { x0: 30, x1: 452, y0: 404, y1: 24 };
  return { x0: 36, x1: 508, y0: 338, y1: 28 };
});

/** · 点阵：铺满整幅画布的匀强磁场（间距 30、记号半长 5） */
const DOTS = computed(() => {
  if (mode === "alpha") return { x: 44, y: 46, cols: 15, rows: 13 };
  if (mode === "proton") return { x: 44, y: 46, cols: 14, rows: 12 };
  return { x: 46, y: 52, cols: 16, rows: 10 };
});

/** 字体：量用 KaTeX_Math（斜体）、单位/点名用 KaTeX_Main（正体） */
const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";

/** α 小弧（C₁ 下侧、圆心角 π/2）与蓝；α 大弧（C₂ 上侧、圆心角 3π/2）与青 */
const SMALL_COLOR = "var(--c-velocity)";
const LARGE_COLOR = "var(--c-physics)";

/** α 轨迹半径 r_α = L₀/√2（以 L₀ 为单位） */
const R_ALPHA = 1 / Math.SQRT2;

/* ═══════════ 坐标换算与几何工具 ═══════════ */
const O = computed(() => ({ x: VIEW.value.ox, y: VIEW.value.oy }));
const W = computed(() => VIEW.value.w);
const H = computed(() => VIEW.value.h);

/** 数学坐标（y 向上，单位 L₀）→ SVG 坐标（y 向下） */
const P = (mx: number, my: number) => ({
  x: O.value.x + mx * VIEW.value.s,
  y: O.value.y - my * VIEW.value.s,
});

/** 顺时针圆弧（数学坐标下 φ 从 phi0 递减到 phi1）采样成折线 */
const arcPath = (cx: number, cy: number, r: number, phi0: number, phi1: number, n = 64): string => {
  const points: string[] = [];

  for (let i = 0; i <= n; i += 1) {
    const phi = phi0 + ((phi1 - phi0) * i) / n;
    const p = P(cx + r * Math.cos(phi), cy + r * Math.sin(phi));

    points.push(`${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }

  return points.join(" ");
};

/**
 * 轨迹上的运动方向箭头：在极角 φ 处沿顺时针切向画一小段直箭头，并整体外移 offset。 数学切向 = (sinφ, −cosφ)，翻到 SVG 后 = (sinφ, cosφ)；外法向从
 * (cosφ, sinφ) 翻成 (cosφ, −sinφ)。
 */
const tangentArrow = (cx: number, cy: number, r: number, phi: number, half = 17, offset = 8) => {
  const p = P(cx + r * Math.cos(phi), cy + r * Math.sin(phi));
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
const ALPHA_ENTRY = computed(() => P(-1, 0));
const PROTON_ENTRY = computed(() => P(1, 0));
/** 质子沿 −y 射入的速度箭头（画在题图的入场点旁） */
const PROTON_VEL_TIP = computed(() => ({ x: PROTON_ENTRY.value.x, y: PROTON_ENTRY.value.y + 52 }));

/* ═══════════ 质子（第 33 页） ═══════════ */
/** 圆心 C = (L₀/2, 0)、半径 r_p = L₀/2：圆过 (L₀,0) 与原点 */
const PROTON_C = computed(() => P(0.5, 0));
const PROTON_R = computed(() => VIEW.value.s / 2);
/** 从 (L₀,0) 顺时针转过半圈到原点（φ 从 0 减到 −π） */
const PROTON_TRAVEL = computed(() => arcPath(0.5, 0, 0.5, 0, -Math.PI));
/** 轨迹最低点的顺时针方向箭头（最低点处运动方向朝 −x） */
const PROTON_TANGENT = computed(() => tangentArrow(0.5, 0, 0.5, -Math.PI / 2, 19, 0));
/** 直径 O→(L₀,0)：两段半径都落在这条线上，r_p 标注在它上方 */
const PROTON_DIAMETER = computed(() => ({ from: P(0, 0), to: P(1, 0) }));

/* ═══════════ α 粒子（第 34、35 页） ═══════════ */
/** 两个镜像圆心：C₁ = (−L₀/2, −L₀/2)（小弧）、C₂ = (−L₀/2, L₀/2)（大弧） */
const C1 = computed(() => P(-0.5, -0.5));
const C2 = computed(() => P(-0.5, 0.5));
/** 从 (−L₀,0) 顺时针走到原点的两段弧 */
const SMALL_ARC = computed(() => arcPath(-0.5, -0.5, R_ALPHA, (3 * Math.PI) / 4, Math.PI / 4));
const LARGE_ARC = computed(() => arcPath(-0.5, 0.5, R_ALPHA, (5 * Math.PI) / 4, -Math.PI / 4));
/** 两段弧的圆心角弧线标记（半径 30px，先不标数字） */
const ANGLE_SMALL = computed(() =>
  arcPath(-0.5, -0.5, 26 / VIEW.value.s, (3 * Math.PI) / 4, Math.PI / 4, 16),
);
const ANGLE_LARGE = computed(() =>
  arcPath(-0.5, 0.5, 26 / VIEW.value.s, (5 * Math.PI) / 4, -Math.PI / 4, 72),
);
/** 两段弧顶点的顺时针方向箭头 */
const SMALL_TANGENT = computed(() => tangentArrow(-0.5, -0.5, R_ALPHA, Math.PI / 2, 17, 8));
const LARGE_TANGENT = computed(() => tangentArrow(-0.5, 0.5, R_ALPHA, Math.PI / 2, 17, 7));
/** 圆心到弦（(−L₀,0)→O）两端的四条半径线 */
const RADII = computed(() => [
  { key: "c1-a", from: C1.value, to: ALPHA_ENTRY.value },
  { key: "c1-o", from: C1.value, to: O.value },
  { key: "c2-a", from: C2.value, to: ALPHA_ENTRY.value },
  { key: "c2-o", from: C2.value, to: O.value },
]);
/** 弦 (−L₀,0)→O 就是 x 轴上的一段，用 accent 加粗高亮它 */
const CHORD = computed(() => ({ from: ALPHA_ENTRY.value, to: O.value }));

/** 从 (−L₀,0) 出发、数学方向角 deg 的入射速度箭头（长度 46px；y 翻转后 dy 取负） */
const entryVelocity = (deg: number) => {
  const angle = (deg * Math.PI) / 180;
  const start = P(-1, 0);

  return {
    from: start,
    to: { x: start.x + Math.cos(angle) * 46, y: start.y - Math.sin(angle) * 46 },
  };
};
/** 小弧（C₁）：入射向右上 45°；大弧（C₂）：入射向左上 135° */
const VEL_SMALL = computed(() => entryVelocity(45));
const VEL_LARGE = computed(() => entryVelocity(135));

/* ═══════════ 图内标注（ChartLabel 按容器百分比定位，字号屏幕 px 口径） ═══════════ */
const pctX = (x: number): number => (x / W.value) * 100;
const pctY = (y: number): number => (y / H.value) * 100;

interface FigLabel {
  key: string;
  tex: string;
  /** 标注中心（viewBox 用户单位） */
  x: number;
  y: number;
  color: string;
  size: number;
  /** Step ≥ from 才出现 */
  from: number;
}

/** 标注点都是"文字中心"，位置按各自画幅的空白区选定（见各条注释） */
const LABELS = computed<FigLabel[]>(() => {
  const labels: FigLabel[] = [];
  const mark = (
    key: string,
    tex: string,
    x: number,
    y: number,
    from = 0,
    color = "var(--c-text)",
    size = 15,
  ) => labels.push({ key, tex, x, y, from, color, size });

  if (mode === "alpha") {
    /* ── 干净图上的点名（常显）── */
    mark("O", "O", O.value.x, O.value.y + 24, 0, "var(--c-text)", 15);
    mark("minus-l0", "-L_0", 114, 224, 0, "var(--c-text)", 15);
    mark("alpha", "\\alpha", 150, 259, 0, "var(--c-text)", 16);
    mark("l0", "L_0", 429, 257, 0, "var(--c-text)", 15);
    mark("vp", "v_p", 473, 267, 0, "var(--c-velocity)", 16);
    /* ── step ≥1：两条可能的入射方向 ── */
    mark("v-small", "v_\\alpha", 169, 191, 1, SMALL_COLOR, 15);
    mark("v-large", "v_\\alpha", 104, 193, 1, LARGE_COLOR, 15);
    /* ── step ≥2：两个圆心、半径符号、弦长 ── */
    mark("C1", "C_1", 191, 318, 2, "var(--c-text)", 16);
    mark("C2", "C_2", 184, 150, 2, "var(--c-text)", 16);
    mark("r-alpha", "r_\\alpha", 159, 185, 2, "var(--c-text-dim)", 15);
    mark("chord", "L_0", 222, 250, 2, "var(--c-accent)", 15);
    /* ── step ≥3：圆心角数字 ── */
    mark("theta-small", "\\theta=\\dfrac{\\pi}{2}", 288, 294, 3, "var(--c-accent)", 15);
    mark("theta-large", "\\theta=\\dfrac{3\\pi}{2}", 222, 110, 3, "var(--c-accent)", 15);
    /* ── step ≥4：两条路径各自的用时 ── */
    mark("t-small", "t=\\dfrac{\\pi m}{eB}", 150, 437, 4, SMALL_COLOR, 16);
    mark("t-large", "t=\\dfrac{3\\pi m}{eB}", 360, 437, 4, LARGE_COLOR, 16);
  } else if (mode === "proton") {
    /* ── 干净图上的点名（常显）── */
    mark("O", "O", O.value.x, O.value.y + 24, 0, "var(--c-text)", 15);
    mark("minus-l0", "-L_0", 64, 227, 0, "var(--c-text)", 15);
    mark("alpha", "\\alpha", 64, 183, 0, "var(--c-text)", 16);
    mark("l0", "L_0", 401, 227, 0, "var(--c-text)", 15);
    mark("vp", "v_p", 445, 237, 0, "var(--c-velocity)", 16);
    /* ── step ≥1：圆心 C；step ≥2：半径 r_p 与半圈用时 ── */
    mark("C", "C", 348, 225, 1, "var(--c-text)", 16);
    mark("rp", "r_p=L_0/2", 288, 190, 2, "var(--c-accent)", 15);
    mark("tp", "t=\\dfrac{\\pi m}{eB}", 328, 341, 2, "var(--c-accent)", 16);
  } else {
    /* ── 干净题干图（第 32 页）的点名：−L₀ / L₀ 标在两点正下方，α 标在入射点上方 ── */
    mark("O", "O", O.value.x, O.value.y + 24, 0, "var(--c-text)", 15);
    mark("minus-l0", "-L_0", 120, 212, 0, "var(--c-text)", 15);
    mark("l0", "L_0", 405, 212, 0, "var(--c-text)", 15);
    mark("alpha", "\\alpha", 120, 168, 0, "var(--c-text)", 16);
    mark("vp", "v_p", 446, 222, 0, "var(--c-velocity)", 16);
  }

  return labels;
});
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

      <!-- ④ 质子（step ≥2）：直径上的两段半径（过 O 与 (L₀,0)）、原点经过点高亮 -->
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
        <circle :cx="O.x" :cy="O.y" r="11" fill="none" stroke="var(--c-accent)" stroke-width="2" />
        <circle :cx="O.x" :cy="O.y" r="5" fill="var(--c-accent)" />
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
    </svg>

    <!-- ⑧ 图内标注：真 KaTeX 覆盖层（带下标 / 分式的量必须走这里） -->
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
