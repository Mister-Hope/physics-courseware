<script setup lang="ts">
/** 第 4、5 页：频闪照片上的小球位置（等时间间隔）。 step 1 = 水平方向的投影与 Δx；step 2 = 竖直方向的投影与 Δy（频闪点与轨迹常显）。 */
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

/** 抛出点与频闪参数（相邻两点的时间间隔记为 T） */
const origin = { x: 60, y: 52 };
const DX = 92;
const DY = 13;
const COUNT = 4;
/** 沿轨迹的采样点（小球位置：x ∝ t、y ∝ t²） */
const dots = computed(() =>
  Array.from({ length: COUNT }, (_, i) => {
    const stepIndex = i + 1;

    return { stepIndex, x: origin.x + DX * stepIndex, y: origin.y + DY * stepIndex * stepIndex };
  }),
);
const pathD = computed(() => {
  const samples = 40;
  const points = Array.from({ length: samples + 1 }, (_, i) => {
    const t = (COUNT * i) / samples;

    return { x: origin.x + DX * t, y: origin.y + DY * t * t };
  });

  return points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
});
/** 水平投影基线 / 竖直投影基线 */
const BASE_Y = 348;
const BASE_X = 500;
/** 水平方向三段 Δx（等长） */
const dxSpans = computed(() => dots.value.slice(1).map((dot, i) => ({ from: dots.value[i].x, to: dot.x, mid: (dots.value[i].x + dot.x) / 2 })));
/** 竖直方向三段 Δy（依次变大） */
const dySpans = computed(() => dots.value.slice(1).map((dot, i) => ({ from: dots.value[i].y, to: dot.y, mid: (dots.value[i].y + dot.y) / 2 })));
</script>

<template>
  <svg viewBox="0 0 560 420" width="100%" style="max-width: 520px" xmlns="http://www.w3.org/2000/svg">
    <line
      :x1="origin.x"
      :y1="origin.y"
      :x2="origin.x + DX * COUNT + 32"
      :y2="origin.y"
      stroke="rgba(148,163,184,0.4)"
      stroke-width="1.6"
      stroke-dasharray="7 5"
    />
    <line
      :x1="origin.x"
      :y1="origin.y"
      :x2="origin.x"
      :y2="origin.y + DY * COUNT * COUNT + 40"
      stroke="rgba(148,163,184,0.4)"
      stroke-width="1.6"
      stroke-dasharray="7 5"
    />
    <path :d="pathD" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="9 6" opacity="0.7" />
    <circle :cx="origin.x" :cy="origin.y" r="4.5" fill="var(--c-text)" />
    <text :x="origin.x - 12" :y="origin.y + 22" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="#e2e8f0">O</text>
    <circle v-for="dot in dots" :key="`dot-${dot.stepIndex}`" :cx="dot.x" :cy="dot.y" r="6.5" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
    <g v-if="step >= 1">
      <line
        v-for="dot in dots"
        :key="`drop-${dot.stepIndex}`"
        :x1="dot.x"
        :y1="dot.y"
        :x2="dot.x"
        :y2="BASE_Y"
        stroke="rgba(148,163,184,0.3)"
        stroke-width="1.4"
        stroke-dasharray="5 5"
      />
      <line :x1="origin.x" :y1="BASE_Y" :x2="dots[COUNT - 1].x + 24" :y2="BASE_Y" stroke="#94a3b8" stroke-width="1.8" />
      <g stroke="#e2a846" stroke-width="2.6">
        <template v-for="(span, i) in dxSpans" :key="`dx-${i}`">
          <line :x1="span.from" :y1="BASE_Y" :x2="span.to" :y2="BASE_Y" />
          <line :x1="span.from" :y1="BASE_Y - 8" :x2="span.from" :y2="BASE_Y + 8" />
          <line :x1="span.to" :y1="BASE_Y - 8" :x2="span.to" :y2="BASE_Y + 8" />
        </template>
      </g>
      <text
        v-for="(span, i) in dxSpans"
        :key="`dx-text-${i}`"
        :x="span.mid"
        :y="BASE_Y + 28"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#e2a846"
      >
        Δx
      </text>
    </g>
    <g v-if="step >= 2">
      <line
        v-for="dot in dots"
        :key="`shift-${dot.stepIndex}`"
        :x1="dot.x"
        :y1="dot.y"
        :x2="BASE_X"
        :y2="dot.y"
        stroke="rgba(148,163,184,0.3)"
        stroke-width="1.4"
        stroke-dasharray="5 5"
      />
      <line :x1="BASE_X" :y1="origin.y" :x2="BASE_X" :y2="dots[COUNT - 1].y + 22" stroke="#94a3b8" stroke-width="1.8" />
      <g stroke="#2dd4bf" stroke-width="2.6">
        <template v-for="(span, i) in dySpans" :key="`dy-${i}`">
          <line :x1="BASE_X" :y1="span.from" :x2="BASE_X" :y2="span.to" />
          <line :x1="BASE_X - 8" :y1="span.from" :x2="BASE_X + 8" :y2="span.from" />
          <line :x1="BASE_X - 8" :y1="span.to" :x2="BASE_X + 8" :y2="span.to" />
        </template>
      </g>
      <text
        v-for="(span, i) in dySpans"
        :key="`dy-text-${i}`"
        :x="BASE_X - 16"
        :y="span.mid + 5"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="#2dd4bf"
      >
        Δy
        <tspan dy="5" font-size="13">{{ i + 1 }}</tspan>
      </text>
    </g>
  </svg>
</template>
