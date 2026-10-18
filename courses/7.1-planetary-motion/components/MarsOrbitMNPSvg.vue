<script setup lang="ts">
/** 练习一（火星椭圆轨道 · M/N/P）：椭圆轨道、两个焦点 F₁、F₂，M、N、P 依次是火星经过的三个位置， 且三段弧中的 MN 与 NP 路程相等。题目图里**不画太阳**（太阳在哪一个焦点正是 A 选项要判断的）； 点开解析后才在 F₁ 处补上太阳，并画出两段扫过的面积 S₁、S₂。 */
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();

/** 椭圆中心、半长轴、离心率 */
const C = { x: 230, y: 152 };
const A = 150;
const ECC = 0.68;
const B = A * Math.sqrt(1 - ECC * ECC);
const FC = A * ECC;
const F1 = { x: C.x - FC, y: C.y };
const F2 = { x: C.x + FC, y: C.y };
/**
 * 椭圆上参数角 θ 处的点
 *
 * @param deg 参数角（度）
 * @returns 画布坐标
 */
const pointAt = (deg: number): { x: number; y: number } => {
  const rad = (deg * Math.PI) / 180;
  return { x: C.x + A * Math.cos(rad), y: C.y + B * Math.sin(rad) };
};
/** 在 θ ∈ [186°, 252°] 这段弧上按**等弧长**取三点：M、N、P（题给“MN 与 NP 路程相等”） */
const ARC_START = 176;
const ARC_END = 262;
const SAMPLES = 600;
const arcPoints = Array.from({ length: SAMPLES + 1 }, (_, index) => pointAt(ARC_START + ((ARC_END - ARC_START) * index) / SAMPLES));
const arcLengths = arcPoints.reduce<number[]>(
  (acc, point, index) => [...acc, index === 0 ? 0 : acc[index - 1] + Math.hypot(point.x - arcPoints[index - 1].x, point.y - arcPoints[index - 1].y)],
  [],
);
const totalArc = arcLengths[arcLengths.length - 1];
/**
 * 弧上按累计弧长比例 f 取点
 *
 * @param f 0–1 的比例
 * @returns 画布坐标
 */
const pointAtFraction = (f: number): { x: number; y: number } => {
  const target = f * totalArc;
  let index = 1;

  while (index < arcLengths.length - 1 && arcLengths[index] < target) index += 1;

  const previous = arcPoints[index - 1];
  const next = arcPoints[index];
  const segment = arcLengths[index] - arcLengths[index - 1] || 1;
  const ratio = (target - arcLengths[index - 1]) / segment;
  return { x: previous.x + (next.x - previous.x) * ratio, y: previous.y + (next.y - previous.y) * ratio };
};
const M = pointAtFraction(0);
const N = pointAtFraction(1 / 3);
const P = pointAtFraction(2 / 3);
/**
 * 弧上从 f1 到 f2 的采样点串（画扫过的面积用）
 *
 * @param f1 起点（累计弧长比例 0–1）
 * @param f2 终点（累计弧长比例 0–1）
 * @param steps 采样段数
 * @returns 可直接喂给 polygon 的坐标串
 */
const arcBetween = (f1: number, f2: number, steps = 24): string =>
  Array.from({ length: steps + 1 }, (_, index) => {
    const point = pointAtFraction(f1 + ((f2 - f1) * index) / steps);
    return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }).join(" ");
const areaS1 = `${F1.x},${F1.y} ${arcBetween(0, 1 / 3)}`;
const areaS2 = `${F1.x},${F1.y} ${arcBetween(1 / 3, 2 / 3)}`;

/**
 * 扇形质心附近的标注位置（太阳到这段弧上的点再往外挪一点）
 *
 * @param f1 起点（累计弧长比例）
 * @param f2 终点（累计弧长比例）
 * @returns 标注位置
 */
const sectorLabel = (f1: number, f2: number): { x: number; y: number } => {
  let sx = 0;
  let sy = 0;
  const steps = 12;

  for (let index = 0; index <= steps; index += 1) {
    const point = pointAtFraction(f1 + ((f2 - f1) * index) / steps);

    sx += point.x;
    sy += point.y;
  }

  const mid = { x: sx / (steps + 1), y: sy / (steps + 1) };
  return { x: mid.x + (mid.x - F1.x) * 0.45, y: mid.y + (mid.y - F1.y) * 0.45 + 5 };
};
const LABEL_S1 = sectorLabel(0, 1 / 3);
const LABEL_S2 = sectorLabel(1 / 3, 2 / 3);
/**
 * 点标签沿半径方向往外挪，避免压住轨道
 *
 * @param point 轨道上的点
 * @param distance 沿半径向外挪的距离
 * @returns 标签位置
 */
const labelOf = (point: { x: number; y: number }, distance = 30): { x: number; y: number } => {
  const dx = point.x - C.x;
  const dy = point.y - C.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: point.x + (dx / len) * distance, y: point.y + (dy / len) * distance + 5 };
};
const LABEL_M = labelOf(M);
const LABEL_N = labelOf(N);
const LABEL_P = labelOf(P);
const aria = "火星绕太阳运动的椭圆轨道，M、N、P 是火星依次经过的三个位置，F₁、F₂ 是两个焦点，弧 MN 与弧 NP 路程相等。";
</script>

<template>
  <svg viewBox="0 0 460 300" width="340" height="222" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
    <ellipse :cx="C.x" :cy="C.y" :rx="A" :ry="B" fill="none" stroke="#e2a846" stroke-width="2" opacity="0.7" />
    <g v-if="showAnalysis">
      <polygon :points="areaS1" fill="rgba(226,168,70,0.22)" />
      <polygon :points="areaS2" fill="rgba(96,165,250,0.22)" />
      <CelestialSun :x="F1.x" :y="F1.y" :r="14" />
    </g>
    <circle v-else :cx="F1.x" :cy="F1.y" r="5" fill="none" stroke="#94a3b8" stroke-width="1.8" />
    <circle :cx="F2.x" :cy="F2.y" r="5" fill="none" stroke="#94a3b8" stroke-width="1.8" />
    <text :x="F1.x" :y="F1.y + 24" text-anchor="middle" font-size="18" fill="#94a3b8" class="mn-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-size="11" dy="4">1</tspan>
    </text>
    <text :x="F2.x" :y="F2.y + 24" text-anchor="middle" font-size="18" fill="#94a3b8" class="mn-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-size="11" dy="4">2</tspan>
    </text>
    <circle :cx="M.x" :cy="M.y" r="4.6" fill="#7dd3fc" />
    <circle :cx="N.x" :cy="N.y" r="4.6" fill="#7dd3fc" />
    <circle :cx="P.x" :cy="P.y" r="4.6" fill="#7dd3fc" />
    <text :x="LABEL_M.x" :y="LABEL_M.y" text-anchor="middle" font-size="19" fill="#7dd3fc" class="mn-halo">M</text>
    <text :x="LABEL_N.x" :y="LABEL_N.y" text-anchor="middle" font-size="19" fill="#7dd3fc" class="mn-halo">N</text>
    <text :x="LABEL_P.x" :y="LABEL_P.y" text-anchor="middle" font-size="19" fill="#7dd3fc" class="mn-halo">P</text>
    <text v-if="showAnalysis" :x="LABEL_S1.x" :y="LABEL_S1.y" text-anchor="middle" font-size="19" fill="#e2a846" class="mn-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">S</tspan>
      <tspan font-size="12" dy="4">1</tspan>
    </text>
    <text v-if="showAnalysis" :x="LABEL_S2.x" :y="LABEL_S2.y" text-anchor="middle" font-size="19" fill="#60a5fa" class="mn-halo">
      <tspan font-family="KaTeX_Math" font-style="italic">S</tspan>
      <tspan font-size="12" dy="4">2</tspan>
    </text>
  </svg>
</template>

<style scoped>
/* 图内小字压在轨道上时加描边光晕 */
.mn-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
