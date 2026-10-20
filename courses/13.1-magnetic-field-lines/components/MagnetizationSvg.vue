<script setup lang="ts">
/**
 * 磁化与去磁（13.1 P19）
 * 铁棒内部的分子电流（取向）：0 杂乱（不显磁性）、2 取向大致相同（两端显磁极）、3 又杂乱（去磁）。
 * 取向用固定种子的角度，避免每次渲染乱跳。
 */
import { computed } from "vue";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 900;
const H = 300;
const CX = 450;
const CY = 142;
const BAR_W = 520;
const BAR_H = 76;

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

interface Molecule {
  x: number;
  y: number;
  randomAngle: number;
}

const MOLECULES: Molecule[] = (() => {
  const rnd = mulberry32(20261022);
  const out: Molecule[] = [];
  for (let iy = 0; iy < 3; iy += 1) {
    for (let ix = 0; ix < 8; ix += 1) {
      out.push({
        x: CX - BAR_W / 2 + 38 + ix * 60,
        y: CY - 22 + iy * 22,
        randomAngle: (rnd() - 0.5) * 320,
      });
    }
  }
  return out;
})();

const angleOf = (m: Molecule): number => {
  if (step.value === 1) return m.randomAngle;
  if (step.value === 2) return 90;
  if (step.value >= 3) return -m.randomAngle * 0.9 + 40;
  return m.randomAngle;
};
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <rect
      :x="CX - BAR_W / 2"
      :y="CY - BAR_H / 2"
      :width="BAR_W"
      :height="BAR_H"
      rx="10"
      fill="var(--c-surface)"
      stroke="var(--c-border)"
      stroke-width="2"
    />
    <g v-if="step === 2">
      <rect :x="CX - BAR_W / 2 - 30" :y="CY - 17" width="30" height="34" rx="5" fill="var(--c-velocity)" opacity="0.9" />
      <rect :x="CX + BAR_W / 2" :y="CY - 17" width="30" height="34" rx="5" fill="var(--c-danger)" opacity="0.9" />
      <text :x="CX - BAR_W / 2 - 15" :y="CY + 5" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
      <text :x="CX + BAR_W / 2 + 15" :y="CY + 5" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
    </g>

    <g v-for="(m, i) in MOLECULES" :key="i">
      <g :transform="`rotate(${angleOf(m)} ${m.x} ${m.y})`">
        <ellipse :cx="m.x" :cy="m.y" rx="9" ry="4.5" fill="none" stroke="var(--c-field)" stroke-width="1.4" opacity="0.9" />
        <path
          :d="`M ${m.x + 6} ${m.y - 3} L ${m.x + 11} ${m.y} L ${m.x + 6} ${m.y + 3} Z`"
          fill="var(--c-field)"
          opacity="0.9"
        />
      </g>
    </g>

    <text :x="CX" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--c-text-mute)" font-family="KaTeX_Main">铁棒内部分子电流的取向</text>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
