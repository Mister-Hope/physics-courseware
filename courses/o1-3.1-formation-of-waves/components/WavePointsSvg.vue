<!-- 第 4 页/第 16 页：一列绳波在各时刻的形状。质点按 y = A·sin(2π(t − x/λ)) 真算，波长 λ 用「间隔数」表示 -->
<template>
  <svg :viewBox="`0 0 ${width} 168`" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="24" :y1="axisY" :x2="width - 16" :y2="axisY" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-dasharray="5 5" opacity="0.35" />
    <polyline :points="curve" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <circle
      v-for="p in pts"
      :key="p.i"
      :cx="p.x"
      :cy="p.y"
      r="5.4"
      :fill="p.started ? 'var(--c-physics)' : '#0f1425'"
      :stroke="p.started ? 'var(--c-physics)' : 'var(--c-text-mute)'"
      stroke-width="1.5"
    />
    <text
      v-for="p in pts"
      :key="'n' + p.i"
      :x="p.x"
      :y="axisY + 34"
      text-anchor="middle"
      font-family="KaTeX_Math, Georgia, serif"
      font-style="italic"
      font-size="13"
      :fill="p.started ? 'var(--c-text-dim)' : 'var(--c-text-mute)'"
    >
      {{ p.label }}
    </text>
    <text :x="width - 18" y="26" text-anchor="end" font-family="KaTeX_Math, Georgia, serif" font-style="italic" font-size="17" fill="var(--c-text)">
      {{ frameLabel }}
    </text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const {
  step,
  count = 9,
  startIndex = 0,
  lambda = 8,
  prefix = "",
} = defineProps<{
  step: number;
  count?: number;
  startIndex?: number;
  lambda?: number;
  prefix?: string;
}>();

const frames = [0, 0.25, 0.5, 0.75, 1];
const frameName = ["0", "T/4", "T/2", "3T/4", "T"];

const axisY = 96;
const amp = 52;
const spacing = count > 10 ? 42 : 74;
const x0 = 56;
const width = x0 + (count - 1) * spacing + 56;

const t = computed(() => frames[Math.min(step, frames.length - 1)]);
const frameLabel = computed(() => `t = ${frameName[Math.min(step, frames.length - 1)]}`);

/** 第 i 个质点相对波源的间隔数（以间距为单位） */
const yAt = (i: number): number => {
  const phase = 2 * Math.PI * (t.value - i / lambda);
  return phase < 0 ? axisY : axisY - amp * Math.sin(phase);
};

const pts = computed(() =>
  Array.from({ length: count }, (_, i) => ({
    i,
    x: x0 + i * spacing,
    y: yAt(i),
    started: t.value >= i / lambda,
    label: `${prefix}${startIndex + i}`,
  })),
);

const curve = computed(() =>
  Array.from({ length: Math.round((width - x0 - 30) / 2) + 1 }, (_, k) => {
    const x = x0 + k * 2;
    const s = (x - x0) / spacing;
    const phase = 2 * Math.PI * (t.value - s / lambda);
    const y = phase < 0 ? axisY : axisY - amp * Math.sin(phase);
    return `${x},${y.toFixed(2)}`;
  }).join(" "),
);
</script>
