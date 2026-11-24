<script setup lang="ts">
import { computed } from "vue";

const { stage = 0 } = defineProps<{
  /** 分步：0 只画轮子；1 摩擦生热；2 没有能量输入；3 总能量只减不增 */
  stage?: number;
}>();

const CX = 168;
const CY = 138;
const R = 86;

const spokes = computed(() =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return {
      x1: CX + 16 * Math.cos(a),
      y1: CY + 16 * Math.sin(a),
      x2: CX + R * Math.cos(a),
      y2: CY + R * Math.sin(a),
    };
  }),
);

const weights = computed(() =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const right = Math.cos(a) > -0.01;
    const r1 = right ? 58 : 26;
    const r2 = right ? 104 : 72;
    return {
      x1: CX + r1 * Math.cos(a),
      y1: CY + r1 * Math.sin(a),
      x2: CX + r2 * Math.cos(a),
      y2: CY + r2 * Math.sin(a),
      hx: CX + 58 * Math.cos(a),
      hy: CY + 58 * Math.sin(a),
      right,
    };
  }),
);
</script>

<template>
  <!-- 历史上一类永动机的设计：轮缘上铰接可摆动的配重 -->
  <svg viewBox="0 0 460 290" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="246" x2="430" y2="246" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.55" />
    <path :d="`M ${CX - 40} 246 L ${CX} ${CY + 24} L ${CX + 40} 246`" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-linejoin="round" />
    <circle :cx="CX" :cy="CY" :r="R" fill="none" stroke="var(--c-velocity)" stroke-width="3" />
    <line v-for="(s, i) in spokes" :key="`s${i}`" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2" stroke="var(--c-velocity)" stroke-width="1.6" opacity="0.8" />
    <g v-for="(w, i) in weights" :key="`w${i}`">
      <line :x1="w.x1" :y1="w.y1" :x2="w.x2" :y2="w.y2" stroke="var(--c-accent)" stroke-width="13" stroke-linecap="round" />
      <circle :cx="w.hx" :cy="w.hy" r="3.4" fill="var(--c-bg)" stroke="var(--c-accent)" stroke-width="1.4" />
    </g>
    <circle :cx="CX" :cy="CY" r="12" fill="var(--c-bg)" stroke="var(--c-velocity)" stroke-width="2.4" />
    <circle :cx="CX" :cy="CY" r="4" fill="var(--c-text-dim)" />
    <text :x="CX" :y="CY - 108" font-size="15" fill="var(--c-text-dim)" text-anchor="middle">轮缘上的配重可以摆动</text>
    <CourseArrow :from="{ x: CX + R + 8, y: CY }" :to="{ x: CX + R + 76, y: CY }" stroke="var(--c-physics)" :stroke-width="2" />
    <text :x="CX + R + 12" :y="CY - 10" font-size="14" fill="var(--c-physics)">对外做功</text>

    <g v-if="stage >= 1">
      <line x1="300" y1="78" x2="232" y2="94" stroke="var(--c-danger)" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.85" />
      <path d="M 244 88 l 6 -9 l 6 9 l 6 -9" fill="none" stroke="var(--c-danger)" stroke-width="1.6" />
      <text x="306" y="74" font-size="14" fill="var(--c-danger)">摩擦使机械能变成内能</text>
    </g>
    <g v-if="stage >= 2">
      <text x="250" y="272" font-size="14" fill="var(--c-accent)" text-anchor="middle">总能量不会增加，只会减少</text>
    </g>
  </svg>
</template>
