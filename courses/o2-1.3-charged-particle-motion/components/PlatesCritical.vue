<!--
  选必二 1.3 · 临界与多解 · 例 1 配图
  ── 题干 ──
     水平平行金属板：板长 L、间距 d，板间有垂直纸面向外的匀强磁场 B。
     带正电粒子从板的左上角沿板方向水平射入，求不打在板上的速度条件。
  ── 几何（屏幕坐标，y 向下；入射点取左上角）──
     上板从 (X0, YT) 到 (X1, YT)，下板在 YT + D；粒子在 (X0, YT) 处以 +x 速度射入，
     洛伦兹力向下 ⟹ 轨迹圆圆心在入射点正下方：
       ① 小速度临界 R1 = d/2：轨迹从入射点扫到最低点 (X0, YT+d)，恰与下板左端相切；
       ② 大速度临界 R2 = (L² + d²)/(2d)：轨迹恰好经过下板右端 (X1, YT+d)。
  ── 分步 ──
     step 0：题干图（板 + 磁场点阵 + 入射速度，不给轨迹）；
     step ≥1：① 小速度临界；step ≥2：② 大速度临界。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 0 = 题干图；1 = 小速度临界；2 = 大速度临界 */
  step?: number;
}>();

/** 画布：1000 × 372 */
const W = 1000;
const H = 372;

/** 板：左端（入射点）X0、右端 X1；上板高 YT；间距 D */
const X0 = 176;
const X1 = 866;
const YT = 84;
const D = 200;
const L = X1 - X0;

/** ① 小速度临界半径：2R1 = d */
const R1 = D / 2;
/** ② 大速度临界半径：R2² = L² + (R2 − d)² */
const R2 = (L * L + D * D) / (2 * D);

interface Pt {
  x: number;
  y: number;
}

const toPath = (points: Pt[]): string =>
  points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

/** ① 小速度临界：圆心在入射点正下方 R1，从最高点（入射点）顺到最低点（下板左端） */
const smallArc = ((): string => {
  const cy = YT + R1;
  return toPath(
    Array.from({ length: 41 }, (_, i) => {
      const a = -Math.PI / 2 + (Math.PI * i) / 40;
      return { x: X0 + R1 * Math.cos(a), y: cy + R1 * Math.sin(a) };
    }),
  );
})();

/** ② 大速度临界：圆心在入射点正下方 R2；轨迹从入射点落到下板右端，再沿切线射出 */
const largeArc = ((): string => {
  const cy = YT + R2;
  const points: Pt[] = Array.from({ length: 71 }, (_, i) => {
    const x = X0 + (L * i) / 70;
    return { x, y: cy - Math.sqrt(R2 * R2 - (x - X0) * (x - X0)) };
  });
  const end = points[points.length - 1];
  const tx = (R2 - D) / R2;
  const ty = L / R2;
  points.push({ x: end.x + 68 * tx, y: end.y + 68 * ty });
  return toPath(points);
})();

/** 磁场点阵：铺在两板之间（外圈留 14 的边） */
const SP = 32;
const COLS = Math.floor((L - 28) / SP) + 1;
const ROWS = Math.floor((D - 28) / SP) + 1;
const DOT_X = X0 + (L - (COLS - 1) * SP) / 2;
const DOT_Y = YT + (D - (ROWS - 1) * SP) / 2;

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-plates">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="fig-svg"
      role="img"
      aria-label="平行金属板间有垂直纸面向外的匀强磁场，带正电粒子从左上角沿板方向射入；两种临界轨迹"
    >
      <!-- 板间磁场：垂直纸面向外（裸 ·） -->
      <FieldDots
        :x="DOT_X"
        :y="DOT_Y"
        :cols="COLS"
        :rows="ROWS"
        :spacing="SP"
        :size="4"
        :line-width="1.3"
        dir="out"
        :opacity="0.5"
      />

      <!-- 上、下板 -->
      <line
        :x1="X0"
        :y1="YT - 12"
        :x2="X1"
        :y2="YT - 12"
        stroke="color-mix(in srgb, var(--c-text) 62%, transparent)"
        stroke-width="10"
        stroke-linecap="round"
      />
      <line
        :x1="X0"
        :y1="YT + D + 12"
        :x2="X1"
        :y2="YT + D + 12"
        stroke="color-mix(in srgb, var(--c-text) 62%, transparent)"
        stroke-width="10"
        stroke-linecap="round"
      />

      <!-- 入射速度（沿板方向） -->
      <CourseArrow
        :from="{ x: X0, y: YT }"
        :to="{ x: X0 + 96, y: YT }"
        stroke="var(--c-force)"
        :stroke-width="3"
        label="v"
        :label-dy="-14"
      />
      <circle :cx="X0" :cy="YT" r="5" fill="var(--c-force)" />

      <!-- ① 小速度临界轨迹 -->
      <path
        v-if="step >= 1"
        :d="smallArc"
        fill="none"
        stroke="var(--c-force)"
        stroke-width="2.4"
        stroke-linecap="round"
      />

      <!-- ② 大速度临界轨迹 -->
      <path
        v-if="step >= 2"
        :d="largeArc"
        fill="none"
        stroke="var(--c-force)"
        stroke-width="2.4"
        stroke-linecap="round"
      />

      <!-- 板长 L -->
      <CourseArrow
        :from="{ x: (X0 + X1) / 2, y: YT - 44 }"
        :to="{ x: X0, y: YT - 44 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <CourseArrow
        :from="{ x: (X0 + X1) / 2, y: YT - 44 }"
        :to="{ x: X1, y: YT - 44 }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <text
        :x="(X0 + X1) / 2"
        :y="YT - 56"
        font-size="24"
        text-anchor="middle"
        fill="var(--c-text)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        L
      </text>

      <!-- 板间距 d -->
      <CourseArrow
        :from="{ x: X0 - 46, y: YT + D / 2 }"
        :to="{ x: X0 - 46, y: YT }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <CourseArrow
        :from="{ x: X0 - 46, y: YT + D / 2 }"
        :to="{ x: X0 - 46, y: YT + D }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.4"
        :head-size="9"
      />
      <text
        :x="X0 - 62"
        :y="YT + D / 2 + 9"
        font-size="24"
        text-anchor="end"
        fill="var(--c-text)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        d
      </text>

      <!-- 磁场方向说明 -->
      <text :x="X0 + 22" :y="YT + 40" font-size="19" fill="var(--c-text-dim)" :style="HALO">
        B 向外
      </text>

      <!-- 临界轨迹编号 -->
      <text
        v-if="step >= 1"
        :x="X0 + 118"
        :y="YT + D - 34"
        font-size="24"
        fill="var(--c-force)"
        :style="HALO"
      >
        ①
      </text>
      <text
        v-if="step >= 2"
        :x="X1 - 96"
        :y="YT + D - 52"
        font-size="24"
        fill="var(--c-force)"
        :style="HALO"
      >
        ②
      </text>
    </svg>
  </div>
</template>

<style scoped>
.fig-plates {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

.fig-plates .fig-svg {
  width: 100%;
  max-width: none;
  height: 100%;
}
</style>
