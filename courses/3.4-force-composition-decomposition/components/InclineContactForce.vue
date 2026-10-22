<script setup lang="ts">
/**
 * 第 16 页：斜面上物块的"真实合力、分力"与"抽象分力"。
 *
 * 物块静止在倾角 30° 的斜面上，受三个真实的力：重力 G（竖直向下）、支持力 F_N（垂直斜面向上）、 静摩擦力 F_f（沿斜面向上）。F_N 与 F_f 的合力 F
 * 就是"斜面对物体的作用力"——与 G 等大反向。
 *
 * 同时把 G 沿斜面、垂直斜面分解出 G∥、G⊥：它们是抽象的分力（物体并没有受到它们），所以画成虚线。 静止时 G∥ = F_f、G⊥ =
 * F_N，两对力等大反向——但那是"大小相等"，不是同一个力。
 *
 * 所有力都从物块的几何中心出发；长度由真实三角函数算出（30° 斜面上 F_N = G cosθ、F_f = G sinθ）。
 */
/** 视图框（用户单位） */
const VIEW = { width: 420, height: 290 };
/** 斜面底端、倾角、斜面长度（用户单位） */
const SLOPE_BASE = { x: 30, y: 265 };
const ANGLE = (30 * Math.PI) / 180;
const SLOPE_LEN = 350;
/** 物块半边长、中心距斜面底端多远 */
const BLOCK_HALF = 22;
const BLOCK_AT = 160;
/** 重力 G 的箭头长度（用户单位）；其余力按三角函数算出 */
const G_LEN = 60;

const COS = Math.cos(ANGLE);
const SIN = Math.sin(ANGLE);
/** 沿斜面向上、背离斜面的外法线：两个方向的单位向量（屏幕坐标） */
const along = { x: COS, y: -SIN };
const normal = { x: -SIN, y: -COS };

const slopeTop = {
  x: SLOPE_BASE.x + SLOPE_LEN * along.x,
  y: SLOPE_BASE.y + SLOPE_LEN * along.y,
};
/** 物块贴着斜面，中心在"接触点 + 半个边长 × 外法线"处 */
const center = {
  x: SLOPE_BASE.x + BLOCK_AT * along.x + BLOCK_HALF * normal.x,
  y: SLOPE_BASE.y + BLOCK_AT * along.y + BLOCK_HALF * normal.y,
};

const blockPoints = [
  {
    x: center.x + BLOCK_HALF * along.x + BLOCK_HALF * normal.x,
    y: center.y + BLOCK_HALF * along.y + BLOCK_HALF * normal.y,
  },
  {
    x: center.x + BLOCK_HALF * along.x - BLOCK_HALF * normal.x,
    y: center.y + BLOCK_HALF * along.y - BLOCK_HALF * normal.y,
  },
  {
    x: center.x - BLOCK_HALF * along.x - BLOCK_HALF * normal.x,
    y: center.y - BLOCK_HALF * along.y - BLOCK_HALF * normal.y,
  },
  {
    x: center.x - BLOCK_HALF * along.x + BLOCK_HALF * normal.x,
    y: center.y - BLOCK_HALF * along.y + BLOCK_HALF * normal.y,
  },
];

/** 真实力：支持力、摩擦力、它们的合力（合力 = 斜面对物体的作用力） */
const tipN = {
  x: center.x + G_LEN * COS * normal.x,
  y: center.y + G_LEN * COS * normal.y,
};
const tipFriction = {
  x: center.x + G_LEN * SIN * along.x,
  y: center.y + G_LEN * SIN * along.y,
};
const tipResultant = { x: center.x, y: center.y - G_LEN };

/** 抽象分力：重力沿斜面、垂直斜面的两个分力 */
const tipGravity = { x: center.x, y: center.y + G_LEN };
const tipGravityParallel = {
  x: center.x - G_LEN * SIN * along.x,
  y: center.y - G_LEN * SIN * along.y,
};
const tipGravityPerp = {
  x: center.x - G_LEN * COS * normal.x,
  y: center.y - G_LEN * COS * normal.y,
};

const pctX = (value: number): number => (value / VIEW.width) * 100;
const pctY = (value: number): number => (value / VIEW.height) * 100;
</script>

<template>
  <div class="figure relative min-w-0">
    <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
      <!-- 地面与斜面 -->
      <SurfaceHatch
        :from="{ x: 20, y: SLOPE_BASE.y }"
        :to="{ x: 400, y: SLOPE_BASE.y }"
        side="below"
        :thickness="14"
        :gap="30"
      />
      <polygon
        :points="`${SLOPE_BASE.x},${SLOPE_BASE.y} ${slopeTop.x},${slopeTop.y} ${slopeTop.x},${SLOPE_BASE.y}`"
        fill="var(--c-accent-2)"
        fill-opacity="0.08"
        stroke="none"
      />
      <line
        :x1="SLOPE_BASE.x"
        :y1="SLOPE_BASE.y"
        :x2="slopeTop.x"
        :y2="slopeTop.y"
        stroke="var(--c-text-dim)"
        stroke-width="2.4"
      />
      <line
        :x1="slopeTop.x"
        :y1="slopeTop.y"
        :x2="slopeTop.x"
        :y2="SLOPE_BASE.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        opacity="0.75"
      />
      <!-- 物块 -->
      <polygon
        :points="blockPoints.map((p) => `${p.x},${p.y}`).join(' ')"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        stroke-width="2.2"
      />
      <!-- 两个平行四边形：F_N、F_f 合成 F；G∥、G⊥ 合成 G -->
      <line
        :x1="tipN.x"
        :y1="tipN.y"
        :x2="tipResultant.x"
        :y2="tipResultant.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.7"
      />
      <line
        :x1="tipFriction.x"
        :y1="tipFriction.y"
        :x2="tipResultant.x"
        :y2="tipResultant.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.7"
      />
      <line
        :x1="tipGravityParallel.x"
        :y1="tipGravityParallel.y"
        :x2="tipGravity.x"
        :y2="tipGravity.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.5"
      />
      <line
        :x1="tipGravityPerp.x"
        :y1="tipGravityPerp.y"
        :x2="tipGravity.x"
        :y2="tipGravity.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.5"
      />
      <!-- 真实力：F_N、F_f、F -->
      <CourseArrow
        :from="center"
        :to="tipN"
        stroke="var(--c-accent-2)"
        stroke-width="3.4"
        pointer-events="none"
      />
      <CourseArrow
        :from="center"
        :to="tipFriction"
        stroke="var(--c-accent)"
        stroke-width="3.4"
        pointer-events="none"
      />
      <CourseArrow
        :from="center"
        :to="tipResultant"
        stroke="var(--c-physics)"
        stroke-width="3.8"
        pointer-events="none"
      />
      <!-- 重力（真实）与它的两个分力（抽象，虚线） -->
      <CourseArrow
        :from="center"
        :to="tipGravity"
        stroke="var(--c-text)"
        stroke-width="3.6"
        pointer-events="none"
      />
      <CourseArrow
        :from="center"
        :to="tipGravityParallel"
        stroke="var(--c-text-dim)"
        stroke-width="2.6"
        stroke-dasharray="7 5"
        pointer-events="none"
      />
      <CourseArrow
        :from="center"
        :to="tipGravityPerp"
        stroke="var(--c-text-dim)"
        stroke-width="2.6"
        stroke-dasharray="7 5"
        pointer-events="none"
      />
      <circle :cx="center.x" :cy="center.y" r="3.6" fill="var(--c-text)" />
    </svg>
    <ChartLabel
      :x-percent="pctX(tipN.x)"
      :y-percent="pctY(tipN.y)"
      :parts="[{ tex: 'F_N' }]"
      anchor="top-left"
      :dx="-6"
      :dy="-8"
      color="var(--c-accent-2)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tipFriction.x)"
      :y-percent="pctY(tipFriction.y)"
      :parts="[{ tex: 'F_f' }]"
      anchor="top-right"
      :dx="6"
      :dy="-10"
      color="var(--c-accent)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tipResultant.x)"
      :y-percent="pctY(tipResultant.y)"
      :parts="[{ tex: 'F' }]"
      anchor="top-left"
      :dx="-6"
      :dy="-10"
      color="var(--c-physics)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tipGravity.x)"
      :y-percent="pctY(tipGravity.y)"
      :parts="[{ tex: 'G' }]"
      anchor="left"
      :dx="-10"
      color="var(--c-text)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tipGravityParallel.x)"
      :y-percent="pctY(tipGravityParallel.y)"
      :parts="[{ tex: 'G_\\parallel' }]"
      anchor="bottom-left"
      :dx="-6"
      :dy="8"
      color="var(--c-text-dim)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tipGravityPerp.x)"
      :y-percent="pctY(tipGravityPerp.y)"
      :parts="[{ tex: 'G_\\perp' }]"
      anchor="bottom-right"
      :dx="6"
      :dy="8"
      color="var(--c-text-dim)"
      halo
    />
  </div>
</template>
