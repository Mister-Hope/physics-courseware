<!--
  共享天体：月球（灰色球体 + 环形山 + 晨昏线暗面）。
  —— 只能在 <svg> 里使用（渲染的是 <g>）；几何按基准半径 20 等比缩放，x / y / r 可任意摆。
  用法：<CelestialMoon :x="500" :y="150" :r="16" label="月球" />
-->
<script setup lang="ts">
import { computed, useId } from "vue";

const {
  x = 0,
  y = 0,
  r = 20,
  label = "",
  labelDy = 0,
  labelSize = 18,
  labelColor = "#cbd5e1",
  showCraters = true,
  opacity = 1,
} = defineProps<{
  /** 球心横坐标（父级 SVG 用户单位） */
  x?: number;
  /** 球心纵坐标（父级 SVG 用户单位） */
  y?: number;
  /** 球半径：环形山、线宽全部按它等比缩放 */
  r?: number;
  /** 球体下方标注文字，空字符串则不画 */
  label?: string;
  /** 标注相对球心的纵向偏移；0 = 按半径自动（r + 20） */
  labelDy?: number;
  /** 标注字号（屏幕近似 px，不随 r 缩放） */
  labelSize?: number;
  /** 标注颜色 */
  labelColor?: string;
  /** 是否画环形山 */
  showCraters?: boolean;
  /** 整体不透明度 */
  opacity?: number;
}>();

const uid = useId();

/** 基准几何按 r = 20 绘制，统一缩放到目标半径 */
const scale = computed(() => r / 20);
const textY = computed(() => (labelDy === 0 ? r + 20 : labelDy));
</script>

<template>
  <g :transform="`translate(${x},${y})`" :opacity="opacity">
    <defs>
      <radialGradient :id="`${uid}-surface`" cx="32%" cy="30%" r="72%">
        <stop offset="0%" stop-color="#e2e8f0" />
        <stop offset="45%" stop-color="#94a3b8" />
        <stop offset="82%" stop-color="#64748b" />
        <stop offset="100%" stop-color="#334155" />
      </radialGradient>
      <linearGradient :id="`${uid}-shadow`" x1="0" y1="0" x2="1" y2="0">
        <stop offset="55%" stop-color="#020617" stop-opacity="0" />
        <stop offset="100%" stop-color="#020617" stop-opacity="0.6" />
      </linearGradient>
      <clipPath :id="`${uid}-clip`">
        <circle r="20" />
      </clipPath>
    </defs>

    <g :transform="`scale(${scale})`">
      <circle
        r="20"
        :fill="`url(#${uid}-surface)`"
        stroke="rgba(203,213,225,0.5)"
        stroke-width="1"
      />

      <g :clip-path="`url(#${uid}-clip)`">
        <g v-if="showCraters">
          <circle cx="-6" cy="-6" r="4.6" fill="rgba(51,65,85,0.5)" />
          <circle cx="-6.4" cy="-6.6" r="3.4" fill="rgba(148,163,184,0.35)" />
          <circle cx="5.5" cy="3.5" r="6" fill="rgba(51,65,85,0.42)" />
          <circle cx="4.8" cy="2.8" r="4.4" fill="rgba(148,163,184,0.3)" />
          <circle cx="-2.5" cy="9.5" r="3" fill="rgba(51,65,85,0.45)" />
          <circle cx="9.5" cy="-8.5" r="2.6" fill="rgba(51,65,85,0.42)" />
          <circle cx="-11" cy="4" r="2.2" fill="rgba(51,65,85,0.4)" />
        </g>
        <circle r="20" :fill="`url(#${uid}-shadow)`" />
      </g>
    </g>

    <text
      v-if="label"
      :y="textY"
      text-anchor="middle"
      :font-size="labelSize"
      font-weight="bold"
      :fill="labelColor"
      letter-spacing="1"
    >
      {{ label }}
    </text>
  </g>
</template>
