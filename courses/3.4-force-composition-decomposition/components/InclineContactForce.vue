<script setup lang="ts">
/**
 * 斜面对物体的作用力：斜面上物块受到的支持力 F_N（垂直斜面向上）与摩擦力 F_f（沿斜面向上） 都是真实的力，它们的合力 F 正是"斜面对物体的作用力"——一个真实的斜向力。
 *
 * 以 F_N、F_f 为邻边作平行四边形，F 就是它的对角线。斜面倾角 30°，几何全部由三角函数算出。
 */
/** 视图框（用户单位） */
const VIEW = { width: 400, height: 230 };
/** 斜面底端、倾角、斜面长度（用户单位） */
const SLOPE_BASE = { x: 40, y: 210 };
const ANGLE = (30 * Math.PI) / 180;
const SLOPE_LEN = 330;
/** 物块半边长、中心距斜面底端多远、两个箭头多长 */
const BLOCK_HALF = 22;
const BLOCK_AT = 150;
const FORCE_LEN = 48;

/** 沿斜面向上、背离斜面的外法线：两个方向的单位向量（屏幕坐标） */
const along = { x: Math.cos(ANGLE), y: -Math.sin(ANGLE) };
const normal = { x: -Math.sin(ANGLE), y: -Math.cos(ANGLE) };

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

/** 三个力的箭头尖端：F 是 F_N 与 F_f 的矢量和 */
const tipN = { x: center.x + FORCE_LEN * normal.x, y: center.y + FORCE_LEN * normal.y };
const tipFriction = { x: center.x + FORCE_LEN * along.x, y: center.y + FORCE_LEN * along.y };
const tipResultant = { x: tipN.x + FORCE_LEN * along.x, y: tipN.y + FORCE_LEN * along.y };

const pctX = (value: number): number => (value / VIEW.width) * 100;
const pctY = (value: number): number => (value / VIEW.height) * 100;
</script>

<template>
  <div class="in-figure">
    <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
      <!-- 地面与斜面 -->
      <SurfaceHatch
        :from="{ x: SLOPE_BASE.x - 20, y: SLOPE_BASE.y }"
        :to="{ x: 392, y: SLOPE_BASE.y }"
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
      <!-- 以 F_N、F_f 为邻边的平行四边形：斜向的 F 是它的对角线 -->
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
      <circle :cx="center.x" :cy="center.y" r="3.6" fill="var(--c-text)" />
    </svg>
    <ChartLabel
      :x-percent="pctX(tipN.x)"
      :y-percent="pctY(tipN.y)"
      :parts="[{ tex: 'F_N' }]"
      anchor="top-left"
      :dx="-6"
      :dy="-6"
      color="var(--c-accent-2)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tipFriction.x)"
      :y-percent="pctY(tipFriction.y)"
      :parts="[{ tex: 'F_f' }]"
      anchor="top-right"
      :dx="4"
      :dy="-8"
      color="var(--c-accent)"
      halo
    />
    <ChartLabel
      :x-percent="pctX(tipResultant.x)"
      :y-percent="pctY(tipResultant.y)"
      :parts="[{ tex: 'F' }]"
      anchor="left"
      :dx="-12"
      color="var(--c-physics)"
      halo
    />
  </div>
</template>

<style scoped>
.in-figure {
  position: relative;
  min-width: 0;
}

.in-figure svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
