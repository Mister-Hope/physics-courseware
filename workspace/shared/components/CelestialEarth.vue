<!--
  共享天体：地球（矢量球体：海洋基底 + 大陆 + 云系 + 晨昏线 + 大气层辉光）。
  —— 只能在 <svg> 里使用（渲染的是 <g>）；几何按原始 12.4 能源页等比缩放，x / y / r 可任意摆。
  用法：<CelestialEarth :x="320" :y="150" :r="48" label="地球" />
-->
<script setup lang="ts">
import { computed, useId } from "vue";

const {
  x = 0,
  y = 0,
  r = 48,
  label = "",
  labelDy = 0,
  labelSize = 18,
  labelColor = "#e2e8f0",
  showHalo = true,
  showLabel = true,
  opacity = 1,
} = defineProps<{
  /** 球心横坐标（父级 SVG 用户单位） */
  x?: number;
  /** 球心纵坐标（父级 SVG 用户单位） */
  y?: number;
  /** 球半径：大陆、云系、线宽全部按它等比缩放 */
  r?: number;
  /** 球体下方标注文字，空字符串则不画 */
  label?: string;
  /** 标注相对球心的纵向偏移；0 = 按半径自动（r + 22） */
  labelDy?: number;
  /** 标注字号（屏幕近似 px，不随 r 缩放） */
  labelSize?: number;
  /** 标注颜色 */
  labelColor?: string;
  /** 是否画大气层辉光环 */
  showHalo?: boolean;
  /** 是否画标注（label 非空时才生效） */
  showLabel?: boolean;
  /** 整体不透明度 */
  opacity?: number;
}>();

const uid = useId();

/** 原始几何以 r = 55、球心 (336,116) 绘制，这里统一缩放到目标半径 */
const scale = computed(() => r / 55);
const textY = computed(() => (labelDy === 0 ? r + 22 : labelDy));
</script>

<template>
  <g :transform="`translate(${x},${y})`" :opacity="opacity">
    <defs>
      <radialGradient :id="`${uid}-ocean`" cx="30%" cy="32%" r="70%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="45%" stop-color="#0284c7" />
        <stop offset="85%" stop-color="#0f3769" />
        <stop offset="100%" stop-color="#091e3a" />
      </radialGradient>
      <radialGradient :id="`${uid}-atmo`" cx="50%" cy="50%" r="50%">
        <stop offset="82%" stop-color="rgba(56,189,248,0)" />
        <stop offset="94%" stop-color="rgba(56,189,248,0.35)" />
        <stop offset="100%" stop-color="rgba(147,197,253,0.8)" />
      </radialGradient>
      <linearGradient :id="`${uid}-shadow`" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#000000" stop-opacity="0" />
        <stop offset="65%" stop-color="#000000" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#020617" stop-opacity="0.55" />
      </linearGradient>
      <filter :id="`${uid}-halo`" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <clipPath :id="`${uid}-clip`">
        <circle cx="336" cy="116" r="54" />
      </clipPath>
    </defs>

    <g :transform="`scale(${scale})`">
      <g transform="translate(-336,-116)">
        <circle
          v-if="showHalo"
          cx="336"
          cy="116"
          r="58"
          fill="none"
          stroke="rgba(56,189,248,0.45)"
          stroke-width="2"
          :filter="`url(#${uid}-halo)`"
        />

        <circle
          cx="336"
          cy="116"
          r="55"
          :fill="`url(#${uid}-ocean)`"
          stroke="rgba(147,197,253,0.6)"
          stroke-width="1.8"
        />

        <g :clip-path="`url(#${uid}-clip)`">
          <path
            d="M 302 86 C 314 80 335 82 348 88 C 362 94 368 110 358 120 C 348 128 332 122 324 116 C 312 108 296 94 302 86 Z"
            fill="#10b981"
            stroke="#059669"
            stroke-width="1"
            opacity="0.88"
          />
          <path
            d="M 326 90 C 334 86 345 88 348 95 C 344 101 334 103 328 100 Z"
            fill="#34d399"
            opacity="0.6"
          />
          <ellipse cx="360" cy="140" rx="14" ry="9" fill="#10b981" opacity="0.88" />
          <ellipse cx="334" cy="148" rx="9" ry="6" fill="#10b981" opacity="0.85" />
          <path
            d="M 284 118 C 288 110 296 114 297 126 C 298 138 290 146 286 140 Z"
            fill="#10b981"
            opacity="0.85"
          />

          <path
            d="M 292 98 Q 312 92 334 96 T 374 100"
            fill="none"
            stroke="#ffffff"
            stroke-width="3"
            stroke-linecap="round"
            opacity="0.28"
          />
          <path
            d="M 304 134 Q 330 138 352 130 T 378 138"
            fill="none"
            stroke="#ffffff"
            stroke-width="2.5"
            stroke-linecap="round"
            opacity="0.25"
          />

          <circle cx="336" cy="116" r="54" :fill="`url(#${uid}-shadow)`" />
          <circle cx="336" cy="116" r="54" :fill="`url(#${uid}-atmo)`" />
        </g>
      </g>
    </g>

    <text
      v-if="label && showLabel"
      :y="textY"
      text-anchor="middle"
      :font-size="labelSize"
      font-weight="bold"
      :fill="labelColor"
      letter-spacing="2"
    >
      {{ label }}
    </text>
  </g>
</template>
