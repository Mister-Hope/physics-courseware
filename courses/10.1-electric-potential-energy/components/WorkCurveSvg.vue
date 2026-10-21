<!-- 第 5 页：任意曲线路径上把曲线分成小段，逐段分解为"沿电场方向 + 垂直电场方向" -->
<script setup lang="ts">
import { computed } from "vue";

const P0 = { x: 70, y: 165 };
const P1 = { x: 110, y: 70 };
const P2 = { x: 220, y: 240 };
const P3 = { x: 260, y: 60 };

const bezierAt = (t: number): { x: number; y: number } => {
  const u = 1 - t;
  return {
    x: u ** 3 * P0.x + 3 * u ** 2 * t * P1.x + 3 * u * t ** 2 * P2.x + t ** 3 * P3.x,
    y: u ** 3 * P0.y + 3 * u ** 2 * t * P1.y + 3 * u * t ** 2 * P2.y + t ** 3 * P3.y,
  };
};

const ts = [0, 0.2, 0.4, 0.6, 0.8, 1];
const points = ts.map((t) => bezierAt(t));
const segments = points.slice(0, -1).map((from, index) => ({ from, to: points[index + 1] }));

const { step = 0 } = defineProps<{ step?: number }>();

const curvePath = computed(() => `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y} ${P2.x} ${P2.y} ${P3.x} ${P3.y}`);
</script>

<template>
  <svg
    viewBox="0 0 440 250"
    width="440"
    height="250"
    xmlns="http://www.w3.org/2000/svg"
    font-family="Inter, system-ui, sans-serif"
    role="img"
    aria-label="电荷沿任意曲线由 A 到 B 的路径与分段叠加"
  >
    <CourseArrow v-for="y in [45, 105, 195]" :key="y" :from="{ x: 44, y }" :to="{ x: 400, y }" stroke="var(--c-field)" stroke-width="1.4" opacity="0.45" />
    <text x="412" y="41" text-anchor="end" fill="var(--c-accent)" font-size="19" font-style="italic" font-family="KaTeX_Math">E</text>
    <line x1="70" y1="165" x2="260" y2="165" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.7" />
    <path :d="curvePath" fill="none" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-dasharray="8 6" />
    <circle cx="260" cy="165" r="4" fill="var(--c-neutral-300)" />
    <circle cx="70" cy="165" r="10" fill="var(--c-force)" fill-opacity="0.22" stroke="var(--c-force)" stroke-width="2.2" />
    <path d="M 64 165 H 76 M 70 159 V 171" stroke="var(--c-force)" stroke-width="1.8" stroke-linecap="round" />
    <circle cx="260" cy="60" r="5" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="70" y="193" text-anchor="middle" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">A</text>
    <text x="272" y="173" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">M</text>
    <text x="274" y="56" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">B</text>
    <g v-if="step >= 1">
      <circle v-for="(point, index) in points" :key="'pt-' + index" :cx="point.x" :cy="point.y" r="3.2" fill="var(--c-neutral-300)" />
    </g>
    <g v-if="step >= 2">
      <g v-for="(segment, index) in segments" :key="'seg-' + index">
        <line :x1="segment.from.x" :y1="segment.from.y" :x2="segment.to.x" :y2="segment.from.y" stroke="var(--c-accent)" stroke-width="1.8" />
        <line
          :x1="segment.to.x"
          :y1="segment.from.y"
          :x2="segment.to.x"
          :y2="segment.to.y"
          stroke="var(--c-neutral-300)"
          stroke-width="1.2"
          stroke-dasharray="4 4"
          opacity="0.75"
        />
      </g>
    </g>
    <g v-if="step >= 3">
      <line
        v-for="(segment, index) in segments"
        :key="'prj-' + index"
        :x1="segment.from.x"
        :y1="165"
        :x2="segment.to.x"
        :y2="165"
        :stroke="index % 2 === 0 ? 'var(--c-accent-2)' : 'var(--c-physics)'"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <line x1="70" y1="210" x2="260" y2="210" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line x1="70" y1="204" x2="70" y2="216" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line x1="260" y1="204" x2="260" y2="216" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <text x="165" y="232" text-anchor="middle" fill="var(--c-text-dim)" font-size="18">
        <tspan font-family="KaTeX_Main">|</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">AM</tspan>
        <tspan font-family="KaTeX_Main">|</tspan>
      </text>
    </g>
  </svg>
</template>
