<script setup lang="ts">
/** 磁感线的特点（13.1 P8） 左格：条形磁体外部磁感线（常显）→ 点击 1 补出磁体内部由 S 到 N 的虚线，内外接成闭合回路； 右格：点击 2 出现「两条磁感线如果相交」的反例示意（交叉点打叉），用来否定相交。 内部虚线只承担「闭合示意」，不参与疏密、不标数值。 */
import { computed } from "vue";

import { arrowsAlong, barPoles, squashLine, traceLine } from "./magField";
import type { Line } from "./magField";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 960;
const H = 300;
const CY = 160;
const CX = 170;
const A = 58;
const BW = 22;
const poles = barPoles(CX, CY, A);
const K = 0.45;
const bounds = { x: 20, y: -120, w: 440, h: 400 };
const N = { x: CX + A, y: CY };

const lines = computed<Line[]>(() => {
  const out: Line[] = [];
  for (const d of [-44, -30, -16, -2, 12, 26, 40]) {
    const line = traceLine([N.x + 10, N.y + d], poles, bounds, { stopRadius: 12 });
    if (line && line.points.length > 10) out.push(squashLine(line, CY, K));
  }
  return out;
});
const arrows = computed(() => lines.value.map((l) => arrowsAlong(l, [0.5], 6.5)));

const innerLines = [-8, 0, 8].map((dy) => ({
  y: CY + dy,
  from: CX - A + 10,
  to: CX + A - 12,
}));

const cross = { x: 720, y: 160 };
const crossPaths = ["M 610 205 C 655 190 686 176 710 166", "M 610 118 C 655 133 686 147 710 157"];
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <defs>
      <clipPath id="mf-closed-left"><rect x="20" y="16" width="470" height="268" rx="14" /></clipPath>
      <clipPath id="mf-closed-right"><rect x="510" y="16" width="430" height="268" rx="14" /></clipPath>
    </defs>
    <!-- 左格：闭合 -->
    <rect x="20" y="16" width="470" height="268" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <text x="38" y="38" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">磁体外部与内部</text>
    <g clip-path="url(#mf-closed-left)">
      <g fill="none" stroke="var(--c-field)" stroke-width="1.7" opacity="0.9">
        <path v-for="(line, i) in lines" :key="i" :d="line.d" />
      </g>
      <g fill="var(--c-field)">
        <path v-for="(group, i) in arrows" :key="i" :d="group[0].d" />
      </g>
    </g>
    <rect :x="CX - A" :y="CY - BW" :width="A" :height="BW * 2" rx="6" fill="var(--c-velocity)" opacity="0.9" />
    <rect :x="CX" :y="CY - BW" :width="A" :height="BW * 2" rx="6" fill="var(--c-danger)" opacity="0.9" />
    <text :x="CX - A / 2" :y="CY + 6" text-anchor="middle" font-size="16" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text :x="CX + A / 2" :y="CY + 6" text-anchor="middle" font-size="16" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
    <g v-if="step >= 1">
      <g v-for="(l, i) in innerLines" :key="i" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" opacity="0.95">
        <line :x1="l.from" :y1="l.y" :x2="l.to" :y2="l.y" />
        <path :d="`M ${l.to - 12} ${l.y - 5} L ${l.to} ${l.y} L ${l.to - 12} ${l.y + 5} Z`" fill="var(--c-physics)" stroke="none" />
      </g>
    </g>

    <!-- 右格：相交反例 -->
    <rect x="510" y="16" width="430" height="268" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <text x="528" y="38" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">如果两条磁感线相交……</text>
    <g v-if="step >= 2">
      <g fill="none" stroke="var(--c-field)" stroke-width="1.7" opacity="0.9">
        <path v-for="(d, i) in crossPaths" :key="i" :d="d" />
      </g>
      <g stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round">
        <line :x1="cross.x - 14" :y1="cross.y - 14" :x2="cross.x + 14" :y2="cross.y + 14" />
        <line :x1="cross.x - 14" :y1="cross.y + 14" :x2="cross.x + 14" :y2="cross.y - 14" />
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
