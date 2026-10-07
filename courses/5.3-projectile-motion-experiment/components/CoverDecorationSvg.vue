<script setup lang="ts">
/** 封面右下角装饰：一段平抛轨迹与频闪点（颜色跟随封面装饰色） */
const START = { x: 26, y: 28 };
const SPAN_X = 124;
const SPAN_Y = 104;
const SAMPLES = 12;
/** 抛物线 y ∝ x²，采样成折线（点与曲线共用同一组参数，保证点落在线上） */
const curve = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const t = i / SAMPLES;

  return { x: START.x + SPAN_X * t, y: START.y + SPAN_Y * t * t };
});
const pathD = curve.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
const dots = [0.25, 0.5, 0.75, 1].map((t) => ({ x: START.x + SPAN_X * t, y: START.y + SPAN_Y * t * t }));
</script>

<template>
  <svg viewBox="0 0 200 150" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="26" y1="28" x2="186" y2="28" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.3" />
    <line x1="26" y1="28" x2="26" y2="142" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.3" />
    <path :d="pathD" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity="0.55" />
    <circle
      v-for="(dot, i) in dots"
      :key="i"
      :cx="dot.x"
      :cy="dot.y"
      :r="i === dots.length - 1 ? 5 : 3.2"
      :fill="i === dots.length - 1 ? '#e2a846' : 'currentColor'"
      :opacity="i === dots.length - 1 ? 1 : 0.7"
    />
  </svg>
</template>
