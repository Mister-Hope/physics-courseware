<!--
  4.2 P13/P14：赫兹实验装置
  —— 发射器：两个抛光金属球之间留很小的空气间隙，由感应圈的高压引线供电；
  接收器：弯成环状的导线，两端也各有一个小球与空隙。
  step 0 静态装置 / step 1 发射器跳火花、向外发出电磁波 / step 2 电磁波到达导线环，环上小球间也跳火花。
-->
<template>
  <svg :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="select-none" aria-hidden="true">
    <defs>
      <radialGradient :id="sparkGlowId">
        <stop offset="0" stop-color="var(--c-accent-light)" stop-opacity="0.55" />
        <stop offset="1" stop-color="var(--c-accent-light)" stop-opacity="0" />
      </radialGradient>
      <linearGradient :id="sphereId" x1="0.2" y1="0.1" x2="0.9" y2="1">
        <stop offset="0" stop-color="#f4f8ff" />
        <stop offset="0.45" stop-color="#c3d0e4" />
        <stop offset="1" stop-color="#7c8aa3" />
      </linearGradient>
      <linearGradient :id="ringId" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e8eef7" />
        <stop offset="0.5" stop-color="#b9c6db" />
        <stop offset="1" stop-color="#77869e" />
      </linearGradient>
    </defs>

    <!-- 桌面 -->
    <line :x1="40" :y1="BASE_Y" :x2="VIEW_W - 40" :y2="BASE_Y" stroke="var(--c-border)" stroke-width="1.6" stroke-dasharray="10 8" opacity="0.7" />

    <!-- 感应圈 -->
    <rect :x="COIL.x" :y="COIL.y" :width="COIL.w" :height="COIL.h" rx="10" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.6" />
    <g v-for="i in 7" :key="`w-${i}`">
      <line
        :x1="COIL.x + 20 + (i - 1) * 20"
        :y1="COIL.y + 12"
        :x2="COIL.x + 20 + (i - 1) * 20"
        :y2="COIL.y + COIL.h - 12"
        stroke="var(--c-accent)"
        stroke-width="3"
        stroke-linecap="round"
        opacity="0.5"
      />
    </g>
    <text :x="COIL.x + COIL.w / 2" :y="COIL.y + COIL.h + 26" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">感应圈</text>

    <!-- 两根高压引线：从感应圈引到左右两个金属球 -->
    <path :d="`M${COIL.x + 40} ${COIL.y} V${EMIT_Y + 10} H${EMIT_L - 15}`" fill="none" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path :d="`M${COIL.x + COIL.w - 22} ${COIL.y} V${EMIT_Y + 10} H${EMIT_R + 8}`" fill="none" stroke="var(--c-text-dim)" stroke-width="2.2" />

    <!-- 发射器：两个抛光金属球 -->
    <circle :cx="EMIT_L" :cy="EMIT_Y" r="15" :fill="`url(#${sphereId})`" />
    <circle :cx="EMIT_R" :cy="EMIT_Y" r="15" :fill="`url(#${sphereId})`" />
    <circle :cx="EMIT_L - 5" :cy="EMIT_Y - 5" r="4" fill="#ffffff" opacity="0.75" />
    <circle :cx="EMIT_R - 5" :cy="EMIT_Y - 5" r="4" fill="#ffffff" opacity="0.75" />
    <text :x="(EMIT_L + EMIT_R) / 2" :y="EMIT_Y - 44" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">发射器</text>

    <!-- 发射器火花 -->
    <g v-if="step >= 1">
      <circle :cx="(EMIT_L + EMIT_R) / 2" :cy="EMIT_Y" r="34" :fill="`url(#${sparkGlowId})`" />
      <polyline :points="emitSpark" fill="none" stroke="#ffe6a8" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" />
      <polyline :points="emitRays" fill="none" stroke="var(--c-accent-light)" stroke-width="1.6" stroke-linecap="round" opacity="0.75" />
    </g>

    <!-- 电磁波：从发射器传到导线环 -->
    <g v-if="step >= 2">
      <path
        v-for="(d, i) in wavePaths"
        :key="`wv-${i}`"
        :d="d"
        fill="none"
        stroke="var(--c-physics)"
        stroke-width="2.2"
        stroke-linecap="round"
        :opacity="0.85 - i * 0.22"
      />
      <text :x="WAVE_X + 76" :y="EMIT_Y - 54" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">电磁波</text>
    </g>

    <!-- 接收器：弯成环状的导线 -->
    <path :d="ringPath" fill="none" :stroke="`url(#${ringId})`" stroke-width="3" stroke-linejoin="round" />
    <circle :cx="540" :cy="19.7" r="5" fill="#b9c6db" stroke="#e8eef7" stroke-width="1.2" />
    <circle :cx="548" :cy="19.7" r="5" fill="#b9c6db" stroke="#e8eef7" stroke-width="1.2" />
    <text :x="RING_CX + 74" :y="RING_CY + 40" font-size="17" fill="var(--c-text-dim)">接收器</text>

    <!-- 接收器火花 -->
    <g v-if="step >= 2">
      <circle :cx="RING_CX" :cy="19.7" r="30" :fill="`url(#${sparkGlowId})`" />
      <polyline :points="recvSpark" fill="none" stroke="#ffe6a8" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useId } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const VIEW_W = 760;
const VIEW_H = 230;
const BASE_Y = 196;

const COIL = { x: 96, y: 132, w: 172, h: 52 };
const EMIT_Y = 78;
const EMIT_L = 196;
const EMIT_R = 244;

const RING_CX = 544;
const RING_CY = 66;
const RING_R = 46;
const WAVE_X = 286;

const sparkGlowId = `hz-glow-${useId()}`;
const sphereId = `hz-sphere-${useId()}`;
const ringId = `hz-ring-${useId()}`;

/** 导线环：顶部留一个很小的空隙（100° → 440°），两端各一个小球 */
const ringPoints = Array.from({ length: 61 }, (_, i) => {
  const rad = ((100 + i * (340 / 60)) * Math.PI) / 180;

  return [RING_CX + RING_R * Math.cos(rad), RING_CY - RING_R * Math.sin(rad)];
});
const ringPath = ringPoints.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x?.toFixed(1)},${y?.toFixed(1)}`).join(" ");

/** 发射器小球之间的火花折线 */
const emitSpark = [EMIT_L + 2, 216, 222, 228, 234, 240, EMIT_R - 2].map((x, i) => `${x},${EMIT_Y + (i % 2 === 0 ? 0 : -9)}`).join(" ");

/** 火花四周的放射短线 */
const emitRays = [
  [-26, -22],
  [26, -22],
  [-30, 4],
  [30, 4],
]
  .map(([dx = 0, dy = 0]) => {
    const cx = (EMIT_L + EMIT_R) / 2;

    return `${cx + dx * 0.72},${EMIT_Y + dy * 0.72} ${cx + dx},${EMIT_Y + dy}`;
  })
  .join(" ");

/** 接收器小球之间的火花折线 */
const recvSpark = [540, 542.6, 545.3, 548].map((x, i) => `${x},${19.7 + (i % 2 === 0 ? 0 : -7)}`).join(" ");

/** 电磁波示意：三条同相位的正弦线（振幅递减），从发射器右侧传向接收器 */
const wavePaths = [0, -22, 22].map((offset, idx) => {
  const amp = 11 - idx * 1.5;
  const points = Array.from({ length: 97 }, (_, i) => {
    const x = WAVE_X + i * 2.2;

    return `${x.toFixed(1)},${(EMIT_Y + offset - amp * Math.sin((2 * Math.PI * (x - WAVE_X)) / 66)).toFixed(1)}`;
  });

  return `M${points.join(" L")}`;
});
</script>
