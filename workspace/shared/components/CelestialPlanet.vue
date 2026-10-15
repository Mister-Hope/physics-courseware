<!--
  共享天体：一般星球（可换色的小球，支持气态条纹与行星环，用于画任意行星 / 卫星 / 天体）。
  —— 只能在 <svg> 里使用（渲染的是 <g>）；几何按基准半径 20 等比缩放，x / y / r 可任意摆。
  用法：<CelestialPlanet :x="420" :y="140" :r="22" variant="red" label="火星" />
        <CelestialPlanet :x="420" :y="140" :r="30" variant="amber" :bands="true" :ring="true" label="土星" />
-->
<script setup lang="ts">
import { computed, useId } from "vue";

type PlanetVariant = "blue" | "red" | "amber" | "teal" | "violet";

const {
  x = 0,
  y = 0,
  r = 20,
  variant = "blue",
  label = "",
  labelDy = 0,
  labelSize = 18,
  labelColor = "",
  bands = false,
  ring = false,
  opacity = 1,
} = defineProps<{
  /** 球心横坐标（父级 SVG 用户单位） */
  x?: number;
  /** 球心纵坐标（父级 SVG 用户单位） */
  y?: number;
  /** 球半径：条纹、行星环、线宽全部按它等比缩放 */
  r?: number;
  /** 配色：蓝（地球类）/ 红（火星类）/ 金（气态）/ 青 / 紫 */
  variant?: PlanetVariant;
  /** 球体下方标注文字，空字符串则不画 */
  label?: string;
  /** 标注相对球心的纵向偏移；0 = 按半径自动（r + 20） */
  labelDy?: number;
  /** 标注字号（屏幕近似 px，不随 r 缩放） */
  labelSize?: number;
  /** 标注颜色；空字符串 = 用该配色的亮色 */
  labelColor?: string;
  /** 是否画气态行星条纹 */
  bands?: boolean;
  /** 是否画行星环 */
  ring?: boolean;
  /** 整体不透明度 */
  opacity?: number;
}>();

interface Palette {
  light: string;
  mid: string;
  dark: string;
  ring: string;
}

const PALETTES: Record<PlanetVariant, Palette> = {
  blue: { light: "#7dd3fc", mid: "#3b82f6", dark: "#1e3a8a", ring: "#93c5fd" },
  red: { light: "#fca5a5", mid: "#ef4444", dark: "#7f1d1d", ring: "#fecaca" },
  amber: { light: "#fde68a", mid: "#f59e0b", dark: "#78350f", ring: "#fcd34d" },
  teal: { light: "#5eead4", mid: "#14b8a6", dark: "#134e4a", ring: "#99f6e4" },
  violet: { light: "#c4b5fd", mid: "#8b5cf6", dark: "#4c1d95", ring: "#ddd6fe" },
};

const uid = useId();

const palette = computed(() => PALETTES[variant]);
const scale = computed(() => r / 20);
const textY = computed(() => (labelDy === 0 ? r + 20 : labelDy));
const textColor = computed(() => (labelColor === "" ? palette.value.light : labelColor));

/** 气态条纹：横向椭圆，上下交错明暗 */
const bandList = [
  { cy: -12, ry: 2.6, tone: "light", alpha: 0.38 },
  { cy: -6, ry: 3.2, tone: "dark", alpha: 0.3 },
  { cy: 0, ry: 2.6, tone: "light", alpha: 0.34 },
  { cy: 6, ry: 3, tone: "dark", alpha: 0.28 },
  { cy: 12, ry: 2.4, tone: "light", alpha: 0.32 },
];
</script>

<template>
  <g :transform="`translate(${x},${y})`" :opacity="opacity">
    <defs>
      <radialGradient :id="`${uid}-surface`" cx="32%" cy="30%" r="72%">
        <stop offset="0%" :stop-color="palette.light" />
        <stop offset="48%" :stop-color="palette.mid" />
        <stop offset="100%" :stop-color="palette.dark" />
      </radialGradient>
      <linearGradient :id="`${uid}-shadow`" x1="0" y1="0" x2="1" y2="0">
        <stop offset="55%" stop-color="#020617" stop-opacity="0" />
        <stop offset="100%" stop-color="#020617" stop-opacity="0.6" />
      </linearGradient>
      <clipPath :id="`${uid}-clip`">
        <circle r="20" />
      </clipPath>
      <clipPath :id="`${uid}-front`">
        <rect x="-42" y="0" width="84" height="34" />
      </clipPath>
    </defs>

    <g :transform="`scale(${scale})`">
      <g v-if="ring" transform="rotate(-18)">
        <ellipse
          rx="33"
          ry="8.5"
          fill="none"
          :stroke="palette.ring"
          stroke-width="3"
          opacity="0.75"
        />
      </g>

      <circle r="20" :fill="`url(#${uid}-surface)`" :stroke="palette.light" stroke-width="1" />

      <g :clip-path="`url(#${uid}-clip)`">
        <g v-if="bands">
          <ellipse
            v-for="(band, index) in bandList"
            :key="index"
            cx="0"
            :cy="band.cy"
            rx="20"
            :ry="band.ry"
            :fill="band.tone === 'light' ? palette.light : palette.dark"
            :opacity="band.alpha"
          />
        </g>
        <circle r="20" :fill="`url(#${uid}-shadow)`" />
      </g>

      <g v-if="ring" transform="rotate(-18)" :clip-path="`url(#${uid}-front)`">
        <ellipse
          rx="33"
          ry="8.5"
          fill="none"
          :stroke="palette.ring"
          stroke-width="3"
          opacity="0.95"
        />
      </g>
    </g>

    <text
      v-if="label"
      :y="textY"
      text-anchor="middle"
      :font-size="labelSize"
      font-weight="bold"
      :fill="textColor"
      letter-spacing="1"
    >
      {{ label }}
    </text>
  </g>
</template>
