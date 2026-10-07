<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 斜面上重力的分解：把重力 G 沿"使物体下滑"和"压紧斜面"两个方向分解。
 *
 * 滑块放在倾角 θ 的斜面上，G 竖直向下；两个分力由真实三角函数算出： 沿斜面方向 G∥ = G sinθ，垂直斜面方向 G⊥ = G cosθ。斜面倾角与物重都能滑杆调。
 */
/** 视图框紧贴图形本身（省掉大片空白），图形因此能在左栏里画满 */
const VIEW = { minX: 30, minY: 80, width: 390, height: 155 };
/** 每牛顿多少用户单位 */
const SCALE = 5;
/** 斜面底端与斜面长度（用户单位） */
const slopeBase = { x: 80, y: 215 };
const SLOPE_LEN = 220;
/** 滑块中心距斜面底端的距离、滑块半边长 */
const BLOCK_AT = 110;
const BLOCK_H = 22;

const theta = ref(30);
const weight = ref(10);

const rad = computed(() => (theta.value * Math.PI) / 180);
/** 沿斜面向上（slopeBase→top）的单位向量；屏幕坐标 */
const along = computed(() => ({ x: Math.cos(rad.value), y: -Math.sin(rad.value) }));
/** 背离斜面的外法线单位向量 */
const normal = computed(() => ({ x: -Math.sin(rad.value), y: -Math.cos(rad.value) }));

const top = computed(() => ({
  x: slopeBase.x + SLOPE_LEN * along.value.x,
  y: slopeBase.y + SLOPE_LEN * along.value.y,
}));

/** 滑块中心：贴住斜面往外法线方向挪半个边长 */
const blockCenter = computed(() => ({
  x: slopeBase.x + BLOCK_AT * along.value.x + BLOCK_H * normal.value.x,
  y: slopeBase.y + BLOCK_AT * along.value.y + BLOCK_H * normal.value.y,
}));

const blockPoints = computed(() => {
  const center = blockCenter.value;
  const alongDir = along.value;
  const normalDir = normal.value;
  const h = BLOCK_H;

  return [
    {
      x: center.x + alongDir.x * h + normalDir.x * h,
      y: center.y + alongDir.y * h + normalDir.y * h,
    },
    {
      x: center.x + alongDir.x * h - normalDir.x * h,
      y: center.y + alongDir.y * h - normalDir.y * h,
    },
    {
      x: center.x - alongDir.x * h - normalDir.x * h,
      y: center.y - alongDir.y * h - normalDir.y * h,
    },
    {
      x: center.x - alongDir.x * h + normalDir.x * h,
      y: center.y - alongDir.y * h + normalDir.y * h,
    },
  ];
});

/** 下滑力（沿斜面向下）与压紧斜面的力（垂直斜面向里） */
const slideForce = computed(() => weight.value * Math.sin(rad.value));
const pressForce = computed(() => weight.value * Math.cos(rad.value));

const gravityTip = computed(() => ({
  x: blockCenter.value.x,
  y: blockCenter.value.y + weight.value * SCALE,
}));
const slideTip = computed(() => ({
  x: blockCenter.value.x - slideForce.value * SCALE * along.value.x,
  y: blockCenter.value.y - slideForce.value * SCALE * along.value.y,
}));
const pressTip = computed(() => ({
  x: blockCenter.value.x - pressForce.value * SCALE * normal.value.x,
  y: blockCenter.value.y - pressForce.value * SCALE * normal.value.y,
}));

/** θ 圆弧（半径 60 的用户单位）与标签位置 */
const arcRadius = 60;
const arcEnd = computed(() => ({
  x: slopeBase.x + arcRadius * along.value.x,
  y: slopeBase.y + arcRadius * along.value.y,
}));
const arcLabel = computed(() => {
  const half = rad.value / 2;

  return { x: slopeBase.x + 84 * Math.cos(half), y: slopeBase.y - 84 * Math.sin(half) };
});

const pctX = (value: number): number => ((value - VIEW.minX) / VIEW.width) * 100;
const pctY = (value: number): number => ((value - VIEW.minY) / VIEW.height) * 100;

const fmt = (v: number): string => v.toFixed(1);

const thetaTex = computed(() => `\\theta = ${theta.value}^\\circ`);
const weightTex = computed(() => `G = ${weight.value}\\ \\text{N}`);
const slideTex = computed(
  () => `G_\\parallel = G\\sin\\theta = ${fmt(slideForce.value)}\\ \\text{N}`,
);
const pressTex = computed(() => `G_\\perp = G\\cos\\theta = ${fmt(pressForce.value)}\\ \\text{N}`);
</script>

<template>
  <div class="ic-wrap">
    <div class="ic-figure">
      <svg :viewBox="`${VIEW.minX} ${VIEW.minY} ${VIEW.width} ${VIEW.height}`">
        <!-- 地面用共享接触面组件：斜线只画在表面下方 -->
        <SurfaceHatch
          :from="{ x: 40, y: slopeBase.y }"
          :to="{ x: 400, y: slopeBase.y }"
          side="below"
          :thickness="13"
          :gap="30"
        />
        <polygon
          :points="`${slopeBase.x},${slopeBase.y} ${top.x},${top.y} ${top.x},${slopeBase.y}`"
          fill="var(--c-accent-2)"
          fill-opacity="0.08"
          stroke="none"
        />
        <line
          :x1="slopeBase.x"
          :y1="slopeBase.y"
          :x2="top.x"
          :y2="top.y"
          stroke="var(--c-text-dim)"
          stroke-width="2.4"
        />
        <line
          :x1="top.x"
          :y1="top.y"
          :x2="top.x"
          :y2="slopeBase.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
          opacity="0.75"
        />
        <path
          :d="`M ${slopeBase.x + arcRadius} ${slopeBase.y} A ${arcRadius} ${arcRadius} 0 0 0 ${arcEnd.x} ${arcEnd.y}`"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="2"
        />
        <polygon
          :points="blockPoints.map((p) => `${p.x},${p.y}`).join(' ')"
          fill="var(--c-surface-solid)"
          stroke="var(--c-text)"
          stroke-width="2"
        />
        <line
          :x1="blockCenter.x"
          :y1="blockCenter.y"
          :x2="slideTip.x"
          :y2="slideTip.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-dasharray="5 5"
          opacity="0.55"
        />
        <line
          :x1="blockCenter.x"
          :y1="blockCenter.y"
          :x2="pressTip.x"
          :y2="pressTip.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-dasharray="5 5"
          opacity="0.55"
        />
        <line
          :x1="slideTip.x"
          :y1="slideTip.y"
          :x2="gravityTip.x"
          :y2="gravityTip.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-dasharray="5 5"
          opacity="0.55"
        />
        <line
          :x1="pressTip.x"
          :y1="pressTip.y"
          :x2="gravityTip.x"
          :y2="gravityTip.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-dasharray="5 5"
          opacity="0.55"
        />
        <CourseArrow
          :from="blockCenter"
          :to="gravityTip"
          stroke="var(--c-text)"
          stroke-width="3.6"
          pointer-events="none"
        />
        <CourseArrow
          :from="blockCenter"
          :to="slideTip"
          stroke="var(--c-accent)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="blockCenter"
          :to="pressTip"
          stroke="var(--c-accent-2)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <circle :cx="blockCenter.x" :cy="blockCenter.y" r="3.5" fill="var(--c-text)" />
      </svg>
      <ChartLabel
        :x-percent="pctX(blockCenter.x)"
        :y-percent="pctY(blockCenter.y + (weight * SCALE) / 2)"
        :parts="[{ tex: 'G' }]"
        anchor="left"
        :dx="-8"
        color="var(--c-text)"
      />
      <ChartLabel
        :x-percent="pctX(blockCenter.x - (slideForce * SCALE * along.x) / 2)"
        :y-percent="pctY(blockCenter.y - (slideForce * SCALE * along.y) / 2)"
        :parts="[{ tex: 'G_\\parallel' }]"
        anchor="left"
        :dx="-14"
        color="var(--c-accent)"
        halo
      />
      <ChartLabel
        :x-percent="pctX(blockCenter.x - (pressForce * SCALE * normal.x) / 2)"
        :y-percent="pctY(blockCenter.y - (pressForce * SCALE * normal.y) / 2)"
        :parts="[{ tex: 'G_\\perp' }]"
        anchor="right"
        :dx="14"
        color="var(--c-accent-2)"
        halo
      />
      <ChartLabel
        :x-percent="pctX(arcLabel.x)"
        :y-percent="pctY(arcLabel.y)"
        :parts="[{ tex: '\\theta' }]"
        color="var(--c-accent-2)"
      />
    </div>

    <div class="ic-info">
      <div class="ic-row">
        <span class="ic-name"><Latex tex="\theta" /></span>
        <input
          v-model.number="theta"
          type="range"
          min="15"
          max="60"
          step="5"
          aria-label="斜面倾角"
        />
        <span class="ic-val"><Latex :tex="thetaTex" /></span>
      </div>
      <div class="ic-row">
        <span class="ic-name"><Latex tex="G" /></span>
        <input v-model.number="weight" type="range" min="5" max="15" step="1" aria-label="物重" />
        <span class="ic-val"><Latex :tex="weightTex" /></span>
      </div>

      <div class="ic-result">
        <div style="color: var(--c-accent)"><Latex :tex="slideTex" /></div>
        <div style="color: var(--c-accent-2)"><Latex :tex="pressTex" /></div>
      </div>
      <div class="ic-note">
        分力仍作用在物体上；物体对斜面的压力作用在斜面上，大小等于
        <Latex tex="G_\perp" /> 却不是一个力
      </div>
    </div>
  </div>
</template>

<style scoped>
.ic-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;
}

.ic-figure {
  position: relative;
  min-width: 0;
}

.ic-figure svg {
  display: block;
  width: 100%;
  height: auto;
}

.ic-info {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
}

.ic-info :deep(.katex) {
  font-size: 1em !important;
}

.ic-row {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr) 5.6rem;
  gap: 0.6rem;
  align-items: center;

  font-size: 0.95rem;
}

.ic-name {
  font-weight: 700;
  text-align: center;
}

.ic-val {
  color: var(--c-text-dim);
  font-size: 0.9rem;
  text-align: right;
  white-space: nowrap;
}

.ic-row input[type="range"] {
  min-width: 0;
  height: 4px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.ic-row input[type="range"]::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid var(--c-bg-soft);
  border-radius: 50%;

  background: var(--c-text-dim);

  appearance: none;
}

.ic-result {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  padding-left: 0.9rem;
  border-left: 3px solid var(--c-physics);

  font-size: 1.02rem;
}

.ic-note {
  color: var(--c-text-dim);
  font-size: 0.85rem;
  line-height: 1.6;
}
</style>
