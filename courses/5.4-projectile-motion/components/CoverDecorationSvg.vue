<script setup lang="ts">
/** 封面右下角装饰（5.4 抛体运动的规律）：一条平抛抛物线（左上抛出、右下落地）， 抛出点一小段水平初速度箭头、轨迹中段与落地处各一个小球、以及很淡的地面虚线。 颜色跟随封面的 currentColor（低透明度），只有落点用强调金。 */
const START = { x: 26, y: 26 };
const SPAN_X = 146;
const SPAN_Y = 92;
const SAMPLES = 16;

/** 抛物线（y 正比于 x 的平方）采样成折线：小球与轨迹共用同一组参数，保证点落在线上 */
const curve = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const t = i / SAMPLES;

  return { x: START.x + SPAN_X * t, y: START.y + SPAN_Y * t * t };
});
const pathD = curve.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");

const dotAt = (t: number): { x: number; y: number } => ({ x: START.x + SPAN_X * t, y: START.y + SPAN_Y * t * t });
/** 轨迹中段的小球与落地处的小球 */
const midDot = dotAt(0.45);
const endDot = dotAt(1);
</script>

<template>
  <svg viewBox="0 0 200 140" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="18" y1="124" x2="188" y2="124" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.3" />
    <path :d="pathD" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity="0.65" />
    <CourseArrow :from="START" :to="{ x: 66, y: 26 }" stroke="currentColor" :stroke-width="2.4" opacity="0.7" />
    <circle :cx="midDot.x" :cy="midDot.y" r="3.6" fill="currentColor" opacity="0.7" />
    <circle :cx="endDot.x" :cy="endDot.y" r="5" fill="#e2a846" />
  </svg>
</template>
