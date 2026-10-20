<script setup lang="ts">
/** 电场线与磁感线的对比（13.1 P9） 左格：正点电荷的电场线（从正电荷出发、不闭合）； 右格：条形磁体的磁感线（闭合、从 N 出发回到 S）。 */
import { computed } from "vue";

import { arrowsAlong, barPoles, squashLine, traceLine } from "./magField";
import type { Line } from "./magField";

const W = 960;
const H = 300;
const CX = 240;
const CY = 150;
const A = 70;
const BW = 20;
const MX = 710;
const poles = barPoles(MX, CY, A);
const K = 0.45;
const bounds = { x: 530, y: -120, w: 410, h: 400 };

const rays = computed(() =>
  Array.from({ length: 8 }, (_, i) => {
    const ang = (i * Math.PI) / 4;
    const x2 = CX + 118 * Math.cos(ang);
    const y2 = CY + 118 * Math.sin(ang);
    return {
      x1: CX + 20 * Math.cos(ang),
      y1: CY + 20 * Math.sin(ang),
      x2: x2 - 8 * Math.cos(ang),
      y2: y2 - 8 * Math.sin(ang),
      head: `M ${x2 - 8 * Math.cos(ang) - 4.5 * Math.sin(ang)} ${y2 - 8 * Math.sin(ang) + 4.5 * Math.cos(ang)} L ${x2} ${y2} L ${x2 - 8 * Math.cos(ang) + 4.5 * Math.sin(ang)} ${y2 - 8 * Math.sin(ang) - 4.5 * Math.cos(ang)} Z`,
    };
  }),
);

const lines = computed<Line[]>(() => {
  const out: Line[] = [];
  for (const d of [-42, -24, -6, 12, 30]) {
    const line = traceLine([MX + A + 10, CY + d], poles, bounds, { stopRadius: 12 });
    if (line && line.points.length > 10) out.push(squashLine(line, CY, K));
  }
  return out;
});
const arrows = computed(() => lines.value.map((l) => arrowsAlong(l, [0.5], 6.5)));
const inner = [-7, 0, 7].map((dy) => ({ y: CY + dy, x1: MX - A + 10, x2: MX + A - 12 }));
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <defs>
      <clipPath id="mf-compare-left"><rect x="20" y="16" width="460" height="268" rx="14" /></clipPath>
      <clipPath id="mf-compare-right"><rect x="510" y="16" width="430" height="268" rx="14" /></clipPath>
    </defs>
    <rect x="20" y="16" width="460" height="268" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <rect x="510" y="16" width="430" height="268" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />

    <!-- 左：正点电荷的电场线 -->
    <text x="250" y="40" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">电场线（正点电荷）</text>
    <g stroke="var(--c-accent-2)" stroke-width="1.8" opacity="0.9">
      <line v-for="(r, i) in rays" :key="`r${i}`" :x1="r.x1" :y1="r.y1" :x2="r.x2" :y2="r.y2" />
    </g>
    <g fill="var(--c-accent-2)">
      <path v-for="(r, i) in rays" :key="`rh${i}`" :d="r.head" />
    </g>
    <circle :cx="CX" :cy="CY" r="12" fill="var(--c-danger)" opacity="0.9" />
    <text :x="CX" :y="CY + 5" text-anchor="middle" font-size="14" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">+</text>
    <text x="250" y="268" text-anchor="middle" font-size="12" fill="var(--c-text-mute)" font-family="KaTeX_Main">从正电荷出发，不闭合</text>

    <!-- 右：条形磁体的磁感线 -->
    <text x="725" y="40" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">磁感线（条形磁体）</text>
    <g clip-path="url(#mf-compare-right)">
      <g fill="none" stroke="var(--c-field)" stroke-width="1.7" opacity="0.9">
        <path v-for="(l, i) in lines" :key="`l${i}`" :d="l.d" />
      </g>
      <g fill="var(--c-field)">
        <path v-for="(a, i) in arrows" :key="`la${i}`" :d="a[0].d" />
      </g>
    </g>
    <rect :x="MX - A" :y="CY - BW" :width="A" :height="BW * 2" rx="6" fill="var(--c-velocity)" opacity="0.9" />
    <rect :x="MX" :y="CY - BW" :width="A" :height="BW * 2" rx="6" fill="var(--c-danger)" opacity="0.9" />
    <text :x="MX - A / 2" :y="CY + 6" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text :x="MX + A / 2" :y="CY + 6" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
    <g stroke="var(--c-physics)" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.85">
      <line v-for="(l, i) in inner" :key="`in${i}`" :x1="l.x1" :y1="l.y" :x2="l.x2" :y2="l.y" />
    </g>
    <text x="725" y="268" text-anchor="middle" font-size="12" fill="var(--c-text-mute)" font-family="KaTeX_Main">从 N 极出发、回到 S 极，闭合</text>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
