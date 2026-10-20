<script setup lang="ts">
/**
 * 磁场为什么能叠加（13.1 P12）
 * 左格：异名磁极（N–S）之间取点 P；右格：同名磁极（N–N）之间取点 P。
 * 每格画出左、右磁体在 P 点各自产生的 B₁、B₂ 与合矢量 B。
 * 矢量由 magField 的四磁极模型算出（与 P11 同一套），箭头用 CourseArrow，颜色见页面图例。
 */
import { computed } from "vue";
import { type Pole, fieldAt, inBox, squashLine, traceLine } from "./magField";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 960;
const H = 300;
const CY = 160;
const A = 45;
const BW = 18;

interface MagnetSpec {
  cx: number;
  nSide: "left" | "right";
}

/** 左格「异名」：A 的 N 朝右、B 的 S 朝左；右格「同名」：A 的 N 朝右、B 的 N 朝左 */
const unlike: [MagnetSpec, MagnetSpec] = [
  { cx: 155, nSide: "right" },
  { cx: 325, nSide: "right" },
];
const like: [MagnetSpec, MagnetSpec] = [
  { cx: 640, nSide: "right" },
  { cx: 780, nSide: "left" },
];

const polesOf = (m: MagnetSpec): Pole[] =>
  m.nSide === "right"
    ? [
        { x: m.cx + A, y: CY, s: 1 },
        { x: m.cx - A, y: CY, s: -1 },
      ]
    : [
        { x: m.cx - A, y: CY, s: 1 },
        { x: m.cx + A, y: CY, s: -1 },
      ];
const boxOf = (m: MagnetSpec) => ({ x: m.cx - A, y: CY - BW, w: A * 2, h: BW * 2 });
const boxL = { x: 28, y: -120, w: 444, h: 420 };
const boxR = { x: 508, y: -120, w: 424, h: 420 };

const half = (m: MagnetSpec, side: "left" | "right") => {
  const isN = m.nSide === "right" ? side === "right" : side === "left";
  return {
    fill: isN ? "var(--c-danger)" : "var(--c-velocity)",
    label: isN ? "N" : "S",
    labelX: side === "left" ? m.cx - A / 2 : m.cx + A / 2,
    x: side === "left" ? m.cx - A : m.cx,
  };
};

const UNIT = 46;

const vectors = (ms: [MagnetSpec, MagnetSpec], p: { x: number; y: number }) => {
  const b1 = fieldAt(p.x, p.y, polesOf(ms[0]));
  const b2 = fieldAt(p.x, p.y, polesOf(ms[1]));
  const m1 = Math.hypot(b1[0], b1[1]);
  const m2 = Math.hypot(b2[0], b2[1]);
  const u1 = { x: b1[0] / m1, y: b1[1] / m1 };
  const u2 = { x: b2[0] / m2, y: b2[1] / m2 };
  const sum = { x: b1[0] + b2[0], y: b1[1] + b2[1] };
  void sum;
  return {
    b1: { from: p, to: { x: p.x + UNIT * u1.x, y: p.y + UNIT * u1.y } },
    b2: { from: p, to: { x: p.x + UNIT * u2.x, y: p.y + UNIT * u2.y } },
  };
};

const P_L = { x: 240, y: CY };
const P_R = { x: 710, y: CY };
const vUnlike = vectors(unlike, P_L);
const vLike = vectors(like, P_R);

const bgLines = (ms: [MagnetSpec, MagnetSpec], bounds: typeof boxL) => {
  const poles = ms.flatMap(polesOf);
  const boxes = ms.map(boxOf);
  const out: string[] = [];
  for (const m of ms) {
    const nPole = polesOf(m).find((p) => p.s === 1)!;
    const face = nPole.x > m.cx ? 1 : -1;
    for (const d of [-20, 0, 20]) {
      const sx = nPole.x + 10 * face;
      const sy = CY + d;
      if (boxes.some((b) => inBox(sx, sy, b))) continue;
      const line = traceLine([sx, sy], poles, bounds, { stopRadius: 12 });
      if (line && line.points.length > 10) out.push(squashLine(line, CY, 0.45).d);
    }
  }
  return out;
};
const bgL = bgLines(unlike, boxL);
const bgR = bgLines(like, boxR);
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <defs>
      <clipPath id="mf-sup-left"><rect x="28" y="56" width="444" height="222" rx="14" /></clipPath>
      <clipPath id="mf-sup-right"><rect x="508" y="56" width="424" height="222" rx="14" /></clipPath>
    </defs>
    <rect x="28" y="56" width="444" height="222" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <rect x="508" y="56" width="424" height="222" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <text x="250" y="40" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">异名磁极之间（N–S）</text>
    <text x="720" y="40" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">同名磁极之间（N–N）</text>

    <!-- 磁体 -->
    <g v-for="(m, i) in [...unlike, ...like]" :key="`m${i}`">
      <template v-for="side in (['left', 'right'] as const)" :key="side">
        <rect
          :x="half(m, side).x"
          :y="CY - BW"
          :width="A"
          :height="BW * 2"
          :rx="4"
          :fill="half(m, side).fill"
          opacity="0.9"
        />
        <text
          :x="half(m, side).labelX"
          :y="CY + 5"
          text-anchor="middle"
          font-size="12"
          font-weight="700"
          fill="var(--c-bg)"
          font-family="KaTeX_Main"
        >{{ half(m, side).label }}</text>
      </template>
    </g>

    <!-- 背景磁感线（淡） -->
    <g clip-path="url(#mf-sup-left)" fill="none" stroke="var(--c-field)" stroke-width="1.2" opacity="0.4">
      <path v-for="(d, i) in bgL" :key="`bl${i}`" :d="d" />
    </g>
    <g clip-path="url(#mf-sup-right)" fill="none" stroke="var(--c-field)" stroke-width="1.2" opacity="0.4">
      <path v-for="(d, i) in bgR" :key="`br${i}`" :d="d" />
    </g>

    <g v-if="step >= 1">
      <circle :cx="P_L.x" :cy="P_L.y" r="3.6" fill="var(--c-text)" />
      <text :x="P_L.x + 8" :y="P_L.y - 8" font-size="12" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">P</text>
      <CourseArrow :from="vUnlike.b1.from" :to="vUnlike.b1.to" stroke="var(--c-velocity)" :stroke-width="2.8" />
      <CourseArrow :from="vUnlike.b2.from" :to="vUnlike.b2.to" stroke="var(--c-physics)" :stroke-width="2.8" />
      <line :x1="P_L.x + 4" :y1="P_L.y" :x2="P_L.x + 66" :y2="P_L.y" stroke="var(--c-accent)" stroke-width="3.4" stroke-linecap="round" />
      <path :d="`M ${P_L.x + 60} ${P_L.y - 7} L ${P_L.x + 74} ${P_L.y} L ${P_L.x + 60} ${P_L.y + 7} Z`" fill="var(--c-accent)" />
    </g>

    <g v-if="step >= 2">
      <circle :cx="P_R.x" :cy="P_R.y" r="3.6" fill="var(--c-text)" />
      <text :x="P_R.x + 8" :y="P_R.y - 8" font-size="12" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">P</text>
      <CourseArrow :from="vLike.b1.from" :to="vLike.b1.to" stroke="var(--c-velocity)" :stroke-width="2.8" />
      <CourseArrow :from="vLike.b2.from" :to="vLike.b2.to" stroke="var(--c-physics)" :stroke-width="2.8" />
      <line :x1="P_R.x + 4" :y1="P_R.y" :x2="P_R.x + 16" :y2="P_R.y" stroke="var(--c-accent)" stroke-width="3.4" stroke-linecap="round" />
      <path :d="`M ${P_R.x + 10} ${P_R.y - 7} L ${P_R.x + 24} ${P_R.y} L ${P_R.x + 10} ${P_R.y + 7} Z`" fill="var(--c-accent)" />
    </g>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
