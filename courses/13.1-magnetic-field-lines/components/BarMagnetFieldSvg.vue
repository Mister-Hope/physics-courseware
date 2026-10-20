<script setup lang="ts">
/**
 * 条形磁体的磁感线（13.1 P5 / P7）
 * variant="needles"：磁体 + 三个待放小磁针的位置标记，逐击让磁针转到该点磁场方向；
 * variant="lines"  ：磁体外部的磁感线（N→S，带箭头），可加某点切线与两极「密」/ 中间「疏」标注。
 * 场方向全部由 magField 的两磁极模型算出，P6 铁屑、P8 闭合回路共用同一套方向。
 */
import { computed } from "vue";
import { type Line, arrowsAlong, barPoles, squashLine, squashedAngle, traceLine } from "./magField";

const {
  variant = "lines",
  step: stepProp = 0,
  showDensity = false,
} = defineProps<{
  variant?: "needles" | "lines";
  step?: number;
  showDensity?: boolean;
}>();

const W = 920;
const H = 280;
const CX = 460;
const CY = 150;
const A = 70; // 磁体半长
const BW = 28; // 磁体半宽
const N_POLE = { x: CX + A, y: CY };
const poles = barPoles(CX, CY, A);
const K = 0.45;
const bounds = { x: 16, y: -160, w: W - 32, h: H + 320 };

const step = computed(() => Math.max(0, Math.min(stepProp, 4)));

/** 外部磁感线：从 N 极面外侧一排起点向后积分 */
const lines = computed<Line[]>(() => {
  const out: Line[] = [];
  for (const d of [-62, -54, -46, -38, -30, -22, -14, -6, 2, 10, 18, 26, 34, 42, 50, 58, 62]) {
    const line = traceLine([N_POLE.x + 12, N_POLE.y + d], poles, bounds, { stopRadius: 14 });
    if (line && line.points.length > 10 && line.closed) out.push(squashLine(line, CY, K));
  }
  return out;
});

const lineArrows = computed(() =>
  lines.value.map((line) => arrowsAlong(line, [0.46], 7.5)),
);

/** P7 第 2 击：在某条线上取一点 P，按该点的场方向画切线 */
const tangent = computed(() => {
  const line = lines.value[Math.min(2, lines.value.length - 1)];
  if (!line) return null;
  const i = Math.max(2, Math.floor(line.points.length * 0.3));
  const [x, y] = line.points[i];
  const ang = squashedAngle(x, y, poles, CY, K);
  const L = 54;
  return {
    x,
    y,
    to: { x: x + L * Math.cos(ang), y: y + L * Math.sin(ang) },
    from: { x: x - L * Math.cos(ang), y: y - L * Math.sin(ang) },
    labelX: x + 16 * Math.cos(ang + Math.PI / 2),
    labelY: y + 16 * Math.sin(ang + Math.PI / 2),
  };
});

/** P5：三个放磁针的位置（上方中点、右端外侧、左端外侧） */
const needleSpots = computed(() => [
  { x: CX, y: CY - 104, show: step.value >= 1 },
  { x: CX + A + 150, y: CY, show: step.value >= 2 },
  { x: CX - A - 150, y: CY, show: step.value >= 3 },
]);

const needleAngle = (x: number, y: number): number =>
  (squashedAngle(x, y, poles, CY, K) * 180) / Math.PI;

const needles = computed(() =>
  needleSpots.value.map((s) => ({ ...s, deg: needleAngle(s.x, s.y) })),
);
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <!-- 磁体：左 S（蓝）右 N（红） -->
    <rect :x="CX - A" :y="CY - BW" :width="A" :height="BW * 2" rx="7" fill="var(--c-velocity)" opacity="0.9" />
    <rect :x="CX" :y="CY - BW" :width="A" :height="BW * 2" rx="7" fill="var(--c-danger)" opacity="0.9" />
    <text :x="CX - A / 2" :y="CY + 7" text-anchor="middle" font-size="18" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text :x="CX + A / 2" :y="CY + 7" text-anchor="middle" font-size="18" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>

    <template v-if="variant === 'lines'">
      <g fill="none" stroke="var(--c-field)" stroke-width="1.8" opacity="0.9">
        <path v-for="(line, i) in lines" :key="i" :d="line.d" />
      </g>
      <g v-if="step >= 1" fill="var(--c-field)">
        <path v-for="(group, i) in lineArrows" :key="i" :d="group[0].d" />
      </g>
      <g v-if="step >= 2 && tangent">
        <line
          :x1="tangent.from.x"
          :y1="tangent.from.y"
          :x2="tangent.to.x"
          :y2="tangent.to.y"
          stroke="var(--c-accent-2)"
          stroke-width="2.2"
          stroke-dasharray="6 4"
        />
        <circle :cx="tangent.x" :cy="tangent.y" r="4.5" fill="var(--c-accent-2)" />
        <text :x="tangent.labelX" :y="tangent.labelY" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">P</text>
      </g>
      <g v-if="showDensity">
        <text :x="CX + A - 18" :y="CY - BW - 14" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">密</text>
        <text :x="CX - A + 6" :y="CY - BW - 14" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">密</text>
        <text :x="CX - 8" :y="CY - BW - 52" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">疏</text>
      </g>
    </template>

    <template v-else>
      <g>
        <circle
          v-for="(s, i) in needleSpots"
          :key="i"
          :cx="s.x"
          :cy="s.y"
          r="26"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-dasharray="5 5"
          opacity="0.7"
        />
      </g>
      <g v-for="(n, i) in needles" :key="i">
        <g v-if="n.show" :transform="`rotate(${n.deg} ${n.x} ${n.y})`">
          <path :d="`M ${n.x} ${n.y - 6} L ${n.x + 24} ${n.y} L ${n.x} ${n.y + 6} Z`" fill="var(--c-danger)" />
          <path :d="`M ${n.x} ${n.y - 6} L ${n.x - 24} ${n.y} L ${n.x} ${n.y + 6} Z`" fill="var(--c-velocity)" />
          <text :x="n.x + 30" :y="n.y - 5" font-size="12" fill="var(--c-text-dim)" font-family="KaTeX_Main">N</text>
        </g>
      </g>
    </template>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
