<script setup lang="ts">
/** 铁屑在磁场中的排列（13.1 P6） 玻璃板 + 条形磁体（左 S 蓝、右 N 红）；step 1 撒上铁屑（杂乱）、step 2 轻敲后沿各点磁场方向排列。 铁屑取向 = 该点磁场方向，方向由 magField 的两磁极模型给出（与 P5 小磁针、P7 磁感线同一套）。 */
import { computed } from "vue";

import { barPoles, fieldAngle, inBox } from "./magField";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 780;
const H = 300;
const CX = 390;
const CY = 150;
const A = 110;
const BW = 30;
const poles = barPoles(CX, CY, A);
const magnetBox = { x: CX - A, y: CY - BW, w: A * 2, h: BW * 2 };

/* oxlint-disable eslint/no-bitwise, unicorn/prefer-math-trunc, eslint/operator-assignment -- mulberry32 是 32 位整型 PRNG，位运算不能改写 */
const mulberry32 = (seed: number): (() => number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
/* oxlint-enable eslint/no-bitwise, unicorn/prefer-math-trunc, eslint/operator-assignment */

interface Grain {
  x: number;
  y: number;
  jitter: number;
  len: number;
  op: number;
  tone: number;
}

const GRAINS: Grain[] = (() => {
  const rnd = mulberry32(20261021);
  const out: Grain[] = [];
  for (let gy = 28; gy < H - 20; gy += 21) {
    for (let gx = 32; gx < W - 22; gx += 23) {
      const x = gx + (rnd() - 0.5) * 20;
      const y = gy + (rnd() - 0.5) * 18;
      if (inBox(x, y, magnetBox)) continue;
      out.push({
        x,
        y,
        jitter: (rnd() - 0.5) * 0.3,
        len: 14 + rnd() * 5,
        op: 0.4 + rnd() * 0.4,
        tone: rnd(),
      });
    }
  }
  return out;
})();

const grains = computed(() =>
  GRAINS.map((g) => {
    const ang = step.value >= 2 ? fieldAngle(g.x, g.y, poles) + g.jitter : 0;
    const dx = (g.len / 2) * Math.cos(ang);
    const dy = (g.len / 2) * Math.sin(ang);
    return {
      x1: g.x - dx,
      y1: g.y - dy,
      x2: g.x + dx,
      y2: g.y + dy,
      color: g.tone > 0.45 ? "var(--c-text-dim)" : "var(--c-text-mute)",
      op: g.op,
    };
  }),
);
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <rect x="16" y="16" width="748" height="268" rx="12" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.3" />
    <g v-if="step >= 1" stroke-linecap="round" stroke-width="1.6">
      <line v-for="(g, i) in grains" :key="i" :x1="g.x1" :y1="g.y1" :x2="g.x2" :y2="g.y2" :stroke="g.color" :opacity="g.op" />
    </g>
    <rect :x="CX - A" :y="CY - BW" :width="A" :height="BW * 2" rx="7" fill="var(--c-velocity)" opacity="0.95" />
    <rect :x="CX" :y="CY - BW" :width="A" :height="BW * 2" rx="7" fill="var(--c-danger)" opacity="0.95" />
    <text :x="CX - A / 2" :y="CY + 7" text-anchor="middle" font-size="20" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text :x="CX + A / 2" :y="CY + 7" text-anchor="middle" font-size="20" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
