<!--
  共享天体：太阳（矢量球体 + 日冕光晕 + 8 束光芒）。
  —— 只能在 <svg> 里使用（渲染的是 <g>），可用 x / y 定位、r 控制半径，尺寸与细节随 r 等比缩放。
  用法：<CelestialSun :x="120" :y="160" :r="30" label="太阳" />
-->
<script setup lang="ts">
import { computed, useId } from "vue";

const {
  x = 0,
  y = 0,
  r = 30,
  label = "",
  labelDy = 0,
  labelSize = 18,
  labelColor = "#fbbf24",
  showGlow = true,
  showRays = true,
  rayCount = 8,
  opacity = 1,
} = defineProps<{
  /** 圆心横坐标（父级 SVG 用户单位） */
  x?: number;
  /** 圆心纵坐标（父级 SVG 用户单位） */
  y?: number;
  /** 光球半径：光晕、光芒、线宽都按它等比缩放 */
  r?: number;
  /** 球体下方标注文字，空字符串则不画 */
  label?: string;
  /** 标注文字相对圆心的纵向偏移；0 = 按半径自动（r + 44） */
  labelDy?: number;
  /** 标注字号（屏幕近似 px，不随 r 缩放） */
  labelSize?: number;
  /** 标注颜色 */
  labelColor?: string;
  /** 是否画日冕光晕 */
  showGlow?: boolean;
  /** 是否画 8 束几何光芒 */
  showRays?: boolean;
  /** 光芒条数（默认 8，均匀分布） */
  rayCount?: number;
  /** 整体不透明度 */
  opacity?: number;
}>();

const uid = useId();

/** 光芒两端距圆心的距离：内 1.38r、外 1.69r（与 12.4 能源页太阳比例一致） */
const rays = computed(() =>
  Array.from({ length: Math.max(rayCount, 0) }, (_, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(rayCount, 1) - Math.PI / 2;
    return {
      x1: Math.cos(angle) * r * 1.38,
      y1: Math.sin(angle) * r * 1.38,
      x2: Math.cos(angle) * r * 1.69,
      y2: Math.sin(angle) * r * 1.69,
    };
  }),
);

const textY = computed(() => (labelDy === 0 ? r + 44 : labelDy));
</script>

<template>
  <g :transform="`translate(${x},${y})`" :opacity="opacity">
    <defs>
      <radialGradient :id="`${uid}-core`" cx="40%" cy="38%" r="65%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="25%" stop-color="#fef08a" />
        <stop offset="65%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </radialGradient>
      <radialGradient :id="`${uid}-halo`" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(251,191,36,0.45)" />
        <stop offset="70%" stop-color="rgba(245,158,11,0.15)" />
        <stop offset="100%" stop-color="rgba(245,158,11,0)" />
      </radialGradient>
      <filter :id="`${uid}-glow`" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <circle v-if="showGlow" :r="r * 1.77" :fill="`url(#${uid}-halo)`" />

    <g
      v-if="showRays"
      stroke="#fbbf24"
      :stroke-width="Math.max(r * 0.1, 1)"
      stroke-linecap="round"
      opacity="0.85"
    >
      <line
        v-for="(ray, index) in rays"
        :key="index"
        :x1="ray.x1"
        :y1="ray.y1"
        :x2="ray.x2"
        :y2="ray.y2"
      />
    </g>

    <circle
      :r="r"
      :fill="`url(#${uid}-core)`"
      :filter="`url(#${uid}-glow)`"
      stroke="#fef08a"
      :stroke-width="Math.max(r * 0.07, 1)"
    />

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
