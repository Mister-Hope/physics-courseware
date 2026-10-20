<script setup lang="ts">
/**
 * 两条形磁铁靠近时的磁感线（13.1 P10） 左格「同名磁极相对（N–N）」、右格「异名磁极相对（N–S）」，都是整空间的图； 每个磁体内部另画淡虚线的 S→N 段（常显），让每条回路在图上自证闭合、不在极面「停住」。 step
 * 1：左格外部线；2：右格外部线；3：右格把「穿过两磁铁之间」与「外侧绕回」两类线分色。
 */
import { computed } from "vue";

import { arrowsAlong, inBox, squashLine, traceLine } from "./magField";
import type { Line, Pole } from "./magField";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 960;
const H = 300;
const CY = 160;
const A = 50;
const BW = 20;

interface MagnetSpec {
  cx: number;
  nSide: "left" | "right";
}
const magnets: MagnetSpec[] = [
  { cx: 150, nSide: "right" },
  { cx: 310, nSide: "left" },
  { cx: 640, nSide: "right" },
  { cx: 800, nSide: "right" },
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
const boxOf = (m: MagnetSpec): { x: number; y: number; w: number; h: number } => ({
  x: m.cx - A,
  y: CY - BW,
  w: A * 2,
  h: BW * 2,
});
const K = 0.45;
const box1 = { x: 28, y: -120, w: 444, h: 420 };
const box2 = { x: 508, y: -120, w: 424, h: 420 };

const buildLines = (ms: MagnetSpec[], bounds: typeof box1): Line[] => {
  const poles = ms.flatMap((m) => polesOf(m));
  const boxes = ms.map((m) => boxOf(m));
  const out: Line[] = [];
  for (const m of ms) {
    const nPole = polesOf(m).find((p) => p.s === 1);
    if (!nPole) continue;
    const face = nPole.x > m.cx ? 1 : -1;
    for (const d of [-30, -15, 0, 15, 30]) {
      const sx = nPole.x + 10 * face;
      const sy = CY + d;
      if (boxes.some((b) => inBox(sx, sy, b))) continue;
      const line = traceLine([sx, sy], poles, bounds, { stopRadius: 12 });
      if (line && line.points.length > 12) out.push(squashLine(line, CY, K));
    }
  }
  return out;
};

const likeLines = computed(() => buildLines(magnets.slice(0, 2), box1));
const unlikeLines = computed(() => buildLines(magnets.slice(2, 4), box2));
const likeArrows = computed(() => likeLines.value.map((l) => arrowsAlong(l, [0.5], 6.5)));
const unlikeArrows = computed(() => unlikeLines.value.map((l) => arrowsAlong(l, [0.5], 6.5)));

const gap = { left: 686, right: 744 };
const classified = computed(() =>
  unlikeLines.value.map((line) => ({
    line,
    throughGap: line.points.some(([x, y]) => x > gap.left && x < gap.right && Math.abs(y - CY) < 58),
  })),
);
const colorOf = (throughGap: boolean): string => (step.value >= 3 && !throughGap ? "var(--c-physics)" : "var(--c-field)");

const innerSegs = computed(() =>
  magnets.flatMap((m) => {
    const face = m.nSide === "right" ? 1 : -1;
    const xS = m.cx - face * (A - 10);
    const xN = m.cx + face * (A - 10);
    return [-6, 0, 6].map((dy) => ({
      x1: xS,
      y1: CY + dy,
      x2: xN - face * 10,
      y2: CY + dy,
      arrow: `M ${xN - face * 13} ${CY + dy - 4} L ${xN - face * 3} ${CY + dy} L ${xN - face * 13} ${CY + dy + 4} Z`,
    }));
  }),
);

const half = (m: MagnetSpec, side: "left" | "right"): { fill: string; label: string; labelX: number; x: number } => {
  const isN = m.nSide === "right" ? side === "right" : side === "left";
  return {
    fill: isN ? "var(--c-danger)" : "var(--c-velocity)",
    label: isN ? "N" : "S",
    labelX: side === "left" ? m.cx - A / 2 : m.cx + A / 2,
    x: side === "left" ? m.cx - A : m.cx,
  };
};
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <defs>
      <clipPath id="mf-tbm-left"><rect x="28" y="56" width="444" height="222" rx="14" /></clipPath>
      <clipPath id="mf-tbm-right"><rect x="508" y="56" width="424" height="222" rx="14" /></clipPath>
    </defs>
    <rect x="28" y="56" width="444" height="222" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <rect x="508" y="56" width="424" height="222" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <text x="250" y="40" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">同名磁极相对（N–N）</text>
    <text x="720" y="40" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">异名磁极相对（N–S）</text>

    <!-- 磁体 -->
    <g v-for="(m, i) in magnets" :key="`m${i}`">
      <template v-for="side in ['left', 'right'] as const" :key="side">
        <rect :x="half(m, side).x" :y="CY - BW" :width="A" :height="BW * 2" :rx="5" :fill="half(m, side).fill" opacity="0.9" />
        <text :x="half(m, side).labelX" :y="CY + 5" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">
          {{ half(m, side).label }}
        </text>
      </template>
    </g>

    <!-- 磁体内部的 S→N 虚线（常显，示意） -->
    <g stroke="var(--c-physics)" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.85">
      <line v-for="(s, i) in innerSegs" :key="`in${i}`" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2" />
    </g>
    <g fill="var(--c-physics)">
      <path v-for="(s, i) in innerSegs" :key="`ia${i}`" :d="s.arrow" />
    </g>

    <!-- 左格外部线：同名 -->
    <g v-if="step >= 1" clip-path="url(#mf-tbm-left)">
      <g fill="none" stroke="var(--c-field)" stroke-width="1.7" opacity="0.9">
        <path v-for="(l, i) in likeLines" :key="`l${i}`" :d="l.d" />
      </g>
      <g fill="var(--c-field)">
        <path v-for="(a, i) in likeArrows" :key="`la${i}`" :d="a[0].d" />
      </g>
    </g>

    <!-- 右格外部线：异名（第 3 击分色） -->
    <g v-if="step >= 2" clip-path="url(#mf-tbm-right)">
      <g fill="none" stroke-width="1.7" opacity="0.9">
        <path v-for="(c, i) in classified" :key="`u${i}`" :d="c.line.d" :stroke="colorOf(c.throughGap)" />
      </g>
      <g>
        <path v-for="(a, i) in unlikeArrows" :key="`ua${i}`" :d="a[0].d" :fill="colorOf(classified[i].throughGap)" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
