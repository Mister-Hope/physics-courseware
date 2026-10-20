<!--
  选必二 1.3 · 临界与多解 · 例 2 配图（正方形构图：挡板与“被打到的范围”是主体，坐标轴只画到够用）
  ── 题干 ──
     xOy 平面：第一、二象限有垂直纸面向里的匀强磁场 B；第二象限内有一块平行于 x 轴、
     与 x 轴相距 d 的足够长挡板（右端在 y 轴上）。原点处粒子源向第一、二象限各方向均匀发射
     带正电粒子，v = qBd/m ⟹ 回旋半径 r = d。求挡板上、下表面被粒子打到的坐标范围。
  ── 关键几何（r = d，全部用 d 作单位）──
     第一象限射出的粒子轨迹圆过 O：
       θ = 60° 时，轨迹第一次与 y = d 的交点正好在 y 轴上（x = 0），是“打上表面 / 打下表面”的临界；
       θ > 60°：第一次交点已在第二象限 ⟹ 打在挡板下表面，x ∈ [−d, 0]（θ = 90° 在 (−d, d) 处相切）；
       θ < 60°：先在第一象限越过 y = d，再从上方落到挡板 ⟹ 打在上表面，x ∈ [−√3d, −d]（θ = 0° 落在 (−d, d)）。
     第二象限射出的粒子轨迹最高点低于 y = d，打不到挡板。
  ── 分步 ──
     step 0：题干图（磁场、挡板、粒子源与发射方向）；
     step ≥1：θ = 60° 的临界轨迹；step ≥2：下表面被打范围；step ≥3：上表面被打范围。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 0 = 题干图；1 = 临界轨迹；2 = 下表面；3 = 上表面 */
  step?: number;
}>();

/** 画布（只框住有内容的那块，留 20 左右边距；接近正方形） */
const VB = { x: 280, y: 272, w: 424, h: 332 };

/** 原点 O 与 d（用户单位） */
const OX = 520;
const OY = 520;
const D = 100;

interface Pt {
  x: number;
  y: number;
}

/** 物理坐标（y 向上、O 为原点）→ 屏幕坐标 */
const toScreen = (p: Pt): Pt => ({ x: OX + p.x, y: OY - p.y });

const toPath = (points: Pt[]): string =>
  points
    .map((p, i) => {
      const q = toScreen(p);
      return `${i === 0 ? "M" : "L"} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
    })
    .join(" ");

/** 以物理坐标圆心 c、半径 D，从 a0 扫到 a1 的圆弧 */
const arc = (c: Pt, a0: number, a1: number, steps = 60): string =>
  toPath(
    Array.from({ length: steps + 1 }, (_, i) => {
      const a = a0 + ((a1 - a0) * i) / steps;
      return { x: c.x + D * Math.cos(a), y: c.y + D * Math.sin(a) };
    }),
  );

/** 磁场点阵（第一、二象限，裸 × = 向里） */
const DOT_X = 312;
const DOT_Y = 316;
const DOT_SP = 30;
const DOT_COLS = 12;
const DOT_ROWS = 7;

/** 挡板：平行 x 轴、位于 y = d、从 y 轴向左足够长 */
const PLATE_X0 = 300;
const PLATE_X1 = OX;
const PLATE_Y = OY - D;

/** 发射方向（第一、二象限各取两条） */
const EMIT = [30, 60, 120, 150];

/** θ = 60° 的临界轨迹：第一次交点在 y 轴上 */
const CRITICAL_ARC = arc(
  { x: -D * Math.sin(Math.PI / 3), y: D * Math.cos(Math.PI / 3) },
  -Math.PI / 6,
  (5 * Math.PI) / 6,
);

/** θ = 90°：在 (−d, d) 处与挡板下表面相切 */
const DOWN_ARC = arc({ x: -D, y: 0 }, 0, Math.PI / 2);

/** θ = 0°：从上方落到 (−d, d) */
const UP_ARC = arc({ x: 0, y: D }, -Math.PI / 2, Math.PI);

/** 下表面被打范围：x ∈ [−d, 0] */
const LOWER_BAND = { x1: OX - D, x2: OX, y: PLATE_Y + 7 };
/** 上表面被打范围：x ∈ [−√3d, −d] */
const UPPER_BAND = { x1: OX - Math.sqrt(3) * D, x2: OX - D, y: PLATE_Y - 7 };

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-baffle">
    <svg
      :viewBox="`${VB.x} ${VB.y} ${VB.w} ${VB.h}`"
      class="fig-svg"
      role="img"
      aria-label="第一、二象限有垂直纸面向里的匀强磁场，第二象限有一块距 x 轴 d 的挡板；原点粒子源发射的粒子回旋半径等于 d，挡板上、下表面各有一段被打到"
    >
      <!-- 第一、二象限的磁场：垂直纸面向里（裸 ×） -->
      <FieldDots
        :x="DOT_X"
        :y="DOT_Y"
        :cols="DOT_COLS"
        :rows="DOT_ROWS"
        :spacing="DOT_SP"
        :size="4.2"
        :line-width="1.3"
        dir="in"
        :opacity="0.3"
      />

      <!-- 坐标轴：只画到内容够用 -->
      <CourseArrow
        :from="{ x: 300, y: OY }"
        :to="{ x: 666, y: OY }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.6"
        :head-size="10"
      />
      <CourseArrow
        :from="{ x: OX, y: OY + 70 }"
        :to="{ x: OX, y: 300 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.6"
        :head-size="10"
      />

      <!-- 挡板 -->
      <rect
        :x="PLATE_X0"
        :y="PLATE_Y - 5"
        :width="PLATE_X1 - PLATE_X0"
        :height="10"
        rx="3"
        fill="color-mix(in srgb, var(--c-text) 62%, transparent)"
      />
      <text
        :x="PLATE_X0 + 10"
        :y="PLATE_Y - 16"
        font-size="19"
        fill="var(--c-text-dim)"
        :style="HALO"
      >
        挡板
      </text>

      <!-- 下表面：θ = 90° 的轨迹 + 被打范围 -->
      <template v-if="step >= 2">
        <path
          :d="DOWN_ARC"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="2.2"
          stroke-dasharray="9 6"
          stroke-linecap="round"
          opacity="0.85"
        />
        <line
          :x1="LOWER_BAND.x1"
          :y1="LOWER_BAND.y"
          :x2="LOWER_BAND.x2"
          :y2="LOWER_BAND.y"
          stroke="var(--c-ok)"
          stroke-width="8"
          stroke-linecap="round"
        />
        <text
          :x="(LOWER_BAND.x1 + LOWER_BAND.x2) / 2"
          :y="PLATE_Y + 36"
          font-size="19"
          text-anchor="middle"
          fill="var(--c-ok)"
          :style="HALO"
        >
          下表面
        </text>
      </template>

      <!-- 上表面：θ = 0° 的轨迹 + 被打范围 -->
      <template v-if="step >= 3">
        <path
          :d="UP_ARC"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="2.2"
          stroke-dasharray="3 6"
          stroke-linecap="round"
          opacity="0.85"
        />
        <line
          :x1="UPPER_BAND.x1"
          :y1="UPPER_BAND.y"
          :x2="UPPER_BAND.x2"
          :y2="UPPER_BAND.y"
          stroke="var(--c-accent-2)"
          stroke-width="8"
          stroke-linecap="round"
        />
        <text
          :x="(UPPER_BAND.x1 + UPPER_BAND.x2) / 2"
          :y="PLATE_Y - 26"
          font-size="19"
          text-anchor="middle"
          fill="var(--c-accent-2)"
          :style="HALO"
        >
          上表面
        </text>
      </template>

      <!-- 粒子源与发射方向 -->
      <circle :cx="OX" :cy="OY" r="5.5" fill="var(--c-accent)" />
      <CourseArrow
        v-for="a in EMIT"
        :key="a"
        :from="{ x: OX, y: OY }"
        :to="{
          x: OX + 62 * Math.cos((a * Math.PI) / 180),
          y: OY - 62 * Math.sin((a * Math.PI) / 180),
        }"
        stroke="var(--c-force)"
        :stroke-width="2.2"
        :head-size="8"
        opacity="0.5"
      />

      <!-- 板间距 d -->
      <CourseArrow
        :from="{ x: PLATE_X0 + 30, y: OY }"
        :to="{ x: PLATE_X0 + 30, y: PLATE_Y }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <text
        :x="PLATE_X0 + 14"
        :y="PLATE_Y + D / 2 + 9"
        font-size="24"
        text-anchor="end"
        fill="var(--c-text)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        d
      </text>

      <!-- 临界轨迹：θ = 60°（画在最上层） -->
      <path
        v-if="step >= 1"
        :d="CRITICAL_ARC"
        fill="none"
        stroke="var(--c-force)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <circle v-if="step >= 1" :cx="OX" :cy="PLATE_Y" r="5" fill="var(--c-accent)" />

      <!-- 磁场方向说明 -->
      <text :x="306" :y="304" font-size="19" fill="var(--c-text-dim)" :style="HALO">B 向里</text>

      <!-- 坐标轴与原点标注 -->
      <text
        :x="674"
        :y="OY + 9"
        font-size="24"
        fill="var(--c-text-dim)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        x
      </text>
      <text
        :x="OX + 14"
        :y="304"
        font-size="24"
        fill="var(--c-text-dim)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        y
      </text>
      <text
        :x="OX - 16"
        :y="OY + 30"
        font-size="24"
        text-anchor="end"
        fill="var(--c-accent)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        O
      </text>

      <!-- θ = 60° 临界标注 -->
      <text
        v-if="step >= 1"
        :x="OX - 0.7 * D"
        :y="OY - 1.4 * D"
        font-size="20"
        fill="var(--c-force)"
        :style="HALO"
      >
        60°
      </text>
    </svg>
  </div>
</template>

<style scoped>
.fig-baffle {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

.fig-baffle .fig-svg {
  width: 100%;
  max-width: none;
  height: 100%;
}
</style>
