<script setup lang="ts">
import { computed } from "vue";

/** 第 2 页：平抛运动的分解示意。 抛出点为原点 O，轨迹 y ∝ x²（采样成折线）；step 1 出初速度与重力，step 2 出两个方向。 */
const { step = 0 } = defineProps<{ step?: number }>();

/** 抛出点（viewBox 用户单位）与轨迹参数 */
const origin = { x: 46, y: 48 };
const SPAN_X = 352;
const SPAN_Y = 216;
const SAMPLES = 24;
const curve = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const t = i / SAMPLES;

  return { x: origin.x + SPAN_X * t, y: origin.y + SPAN_Y * t * t };
});
const pathD = curve.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
/** 空中的小球（受力画在球心） */
const ball = computed(() => {
  const t = 0.66;

  return { x: origin.x + SPAN_X * t, y: origin.y + SPAN_Y * t * t };
});
</script>

<template>
  <svg viewBox="0 0 420 300" width="100%" style="max-width: 440px" xmlns="http://www.w3.org/2000/svg">
    <line
      v-if="step >= 2"
      :x1="origin.x"
      :y1="origin.y"
      :x2="origin.x + SPAN_X + 24"
      :y2="origin.y"
      stroke="rgba(148,163,184,0.45)"
      stroke-width="1.6"
      stroke-dasharray="7 5"
    />
    <line
      v-if="step >= 2"
      :x1="origin.x"
      :y1="origin.y"
      :x2="origin.x"
      :y2="origin.y + SPAN_Y + 26"
      stroke="rgba(148,163,184,0.45)"
      stroke-width="1.6"
      stroke-dasharray="7 5"
    />
    <path :d="pathD" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="9 6" opacity="0.75" />
    <circle :cx="ball.x" :cy="ball.y" r="11" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
    <circle :cx="origin.x" :cy="origin.y" r="4" fill="var(--c-text)" />
    <text :x="origin.x - 10" :y="origin.y + 20" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2e8f0">O</text>
    <g v-if="step >= 1">
      <CourseArrow :from="origin" :to="{ x: origin.x + 96, y: origin.y }" stroke="#e2a846" :stroke-width="3.4" />
      <text :x="origin.x + 84" :y="origin.y - 14" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2a846">
        v
        <tspan dy="4" font-size="13">0</tspan>
      </text>
      <CourseArrow :from="ball" :to="{ x: ball.x, y: ball.y + 74 }" stroke="#f87171" :stroke-width="3.4" />
      <text :x="ball.x + 12" :y="ball.y + 70" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#f87171">mg</text>
    </g>
    <text v-if="step >= 2" :x="origin.x + SPAN_X + 26" :y="origin.y + 8" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#94a3b8">x</text>
    <text
      v-if="step >= 2"
      :x="origin.x - 12"
      :y="origin.y + SPAN_Y + 30"
      text-anchor="end"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="#94a3b8"
    >
      y
    </text>
  </svg>
</template>
