<script setup lang="ts">
/**
 * 第一课时：螺旋测微器读数图（基准线放大投影）。
 *
 * 把固定刻度与微分筒"摊开"到同一张图上：整毫米刻度线画在基准线上方、半毫米线画在下方， 并且**只画到微分筒边缘为止**——半毫米线露出与否因此成为看得见的事实（读数最常见的易错点）。 右侧微分筒按 0.01 mm/格 展开，与基准线（红色虚线）对准的那一格就是可动刻度读数， 落在两格之间时读出半格（末位估读）。
 *
 * 读数一律由 calculateMicrometerReading 按真实规则算出，随 reading 真实变化。 step ≥1 标出露出的整毫米线，≥2 标出半毫米线（未露出时画成被挡住的样子），≥3 标出对齐的可动刻度格。
 */
import { computed } from "vue";

import { calculateMicrometerReading } from "./micrometerReading";

const { reading = 6.725, step = 0 } = defineProps<{ reading?: number; step?: number }>();

const width = 640;
const height = 316;
const datumY = 150;
/** 微分筒边缘：固定刻度只画到这条线为止 */
const edgeX = 392;
const pxPerMm = 54;
const pxPerGrid = 10;

const result = computed(() => calculateMicrometerReading(reading));

/** 固定刻度：整毫米线（基准线上方） */
const wholeMarks = computed(() => {
  const last = Math.floor(result.value.rawMm) + 1;
  return Array.from({ length: 9 }, (_, index) => last - index)
    .filter((mm) => mm >= 0)
    .map((mm) => ({
      mm,
      x: edgeX - (result.value.rawMm - mm) * pxPerMm,
      size: mm % 5 === 0,
    }))
    .filter((mark) => mark.x >= 16 && mark.x <= edgeX + 1);
});

/** 固定刻度：半毫米线（基准线下方），同样止于微分筒边缘 */
const halfMarks = computed(() => {
  const last = Math.floor(result.value.rawMm) + 1;
  return Array.from({ length: 9 }, (_, index) => last - index + 0.5)
    .filter((mm) => mm >= 0)
    .map((mm) => ({ mm, x: edgeX - (result.value.rawMm - mm) * pxPerMm }))
    .filter((mark) => mark.x >= 16 && mark.x <= edgeX);
});

/** 与微分筒边缘最接近的那条半毫米线（判断"是否露出"用） */
const edgeHalfMark = computed(() => {
  const mm = Math.floor(result.value.rawMm) + 0.5;
  const x = edgeX - (result.value.rawMm - mm) * pxPerMm;
  return { mm, x, exposed: x <= edgeX };
});

/** 可动刻度：基准线附近各 7 格 */
const gridMarks = computed(() => {
  const center = result.value.thimbleGrids;
  return Array.from({ length: 16 }, (_, index) => Math.floor(center) - 7 + index)
    .map((grid) => ({
      grid,
      label: ((grid % 50) + 50) % 50,
      y: datumY + (center - grid) * pxPerGrid,
    }))
    .filter((mark) => mark.y >= 24 && mark.y <= 276);
});

/** 对齐格：基准线正好落在两格之间时为半格（估读） */
const alignLow = computed(() => Math.floor(result.value.thimbleGrids));
const alignHigh = computed(() => Math.ceil(result.value.thimbleGrids));
</script>

<template>
  <div class="figure">
    <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="58" :width="edgeX - 16" height="184" rx="10" fill="var(--c-panel)" stroke="var(--c-line)" stroke-width="1.4" />
      <path
        :d="`M ${edgeX} 22 L ${edgeX + 18} 14 L ${width - 8} 14 L ${width - 8} 286 L ${edgeX + 18} 286 L ${edgeX} 278 Z`"
        fill="var(--c-panel)"
        stroke="var(--c-line)"
        stroke-width="1.4"
      />
      <g stroke="var(--c-text-dim)" stroke-width="1" opacity="0.35">
        <path :d="`M ${edgeX + 56} 22 V 278`" />
        <path :d="`M ${edgeX + 88} 22 V 278`" />
        <path :d="`M ${edgeX + 120} 22 V 278`" />
        <path :d="`M ${edgeX + 152} 22 V 278`" />
        <path :d="`M ${edgeX + 184} 22 V 278`" />
      </g>
      <g v-for="mark in wholeMarks" :key="`whole-${mark.mm}`">
        <line :x1="mark.x" :y1="datumY" :x2="mark.x" :y2="datumY - (mark.size ? 30 : 20)" stroke="var(--c-text)" :stroke-width="mark.size ? 2.4 : 1.6" />
        <text
          :x="mark.x"
          :y="datumY - (mark.size ? 38 : 28)"
          text-anchor="middle"
          font-family="KaTeX_Main"
          :font-size="mark.size ? 15 : 13"
          fill="var(--c-text)"
        >
          {{ mark.mm }}
        </text>
      </g>
      <g v-for="mark in halfMarks" :key="`half-${mark.mm}`">
        <line :x1="mark.x" :y1="datumY" :x2="mark.x" :y2="datumY + 20" stroke="var(--c-text)" stroke-width="1.6" />
      </g>
      <g v-for="mark in gridMarks" :key="`grid-${mark.grid}`">
        <line
          :x1="edgeX"
          :y1="mark.y"
          :x2="edgeX + (mark.label % 5 === 0 ? 34 : 20)"
          :y2="mark.y"
          stroke="var(--c-text)"
          :stroke-width="mark.label % 5 === 0 ? 2.2 : 1.5"
        />
        <text v-if="mark.label % 5 === 0" :x="edgeX + 42" :y="mark.y + 5" font-family="KaTeX_Main" font-size="13" fill="var(--c-text)">{{ mark.label }}</text>
      </g>
      <line :x1="edgeX - 34" :y1="datumY" :x2="edgeX + 58" :y2="datumY" stroke="var(--c-danger)" stroke-width="1.6" stroke-dasharray="4 3" />
      <circle :cx="edgeX" :cy="datumY" r="3" fill="var(--c-danger)" />
      <text x="20" y="308" font-size="15" fill="var(--c-text-dim)">固定刻度</text>
      <text :x="edgeX + 30" y="308" font-size="15" fill="var(--c-text-dim)">可动刻度</text>
      <g v-if="step >= 1">
        <line
          :x1="edgeX - (result.rawMm - result.sleeveMainMm) * pxPerMm"
          :y1="datumY"
          :x2="edgeX - (result.rawMm - result.sleeveMainMm) * pxPerMm"
          :y2="datumY - 34"
          stroke="var(--c-accent)"
          stroke-width="3.2"
        />
        <circle :cx="edgeX - (result.rawMm - result.sleeveMainMm) * pxPerMm" :cy="datumY - 40" r="4" fill="var(--c-accent)" />
      </g>
      <g v-if="step >= 2 && edgeHalfMark.exposed">
        <line :x1="edgeHalfMark.x" :y1="datumY" :x2="edgeHalfMark.x" :y2="datumY + 26" stroke="var(--c-accent-2)" stroke-width="3.2" />
        <circle :cx="edgeHalfMark.x" :cy="datumY + 32" r="4" fill="var(--c-accent-2)" />
      </g>
      <g v-if="step >= 2 && !edgeHalfMark.exposed" opacity="0.75">
        <line :x1="edgeHalfMark.x" :y1="datumY" :x2="edgeHalfMark.x" :y2="datumY + 20" stroke="var(--c-text-mute)" stroke-width="1.4" stroke-dasharray="4 4" />
        <path
          :d="`M ${edgeHalfMark.x - 5} ${datumY + 26} L ${edgeHalfMark.x + 5} ${datumY + 36} M ${edgeHalfMark.x + 5} ${datumY + 26} L ${edgeHalfMark.x - 5} ${datumY + 36}`"
          stroke="var(--c-text-mute)"
          stroke-width="1.6"
          fill="none"
        />
      </g>
      <g v-if="step >= 3">
        <circle :cx="edgeX + 6" :cy="datumY" r="7" fill="none" stroke="var(--c-accent)" stroke-width="2.2" />
        <line
          :x1="edgeX"
          :y1="datumY + (result.thimbleGrids - alignLow) * pxPerGrid"
          :x2="edgeX + 30"
          :y2="datumY + (result.thimbleGrids - alignLow) * pxPerGrid"
          stroke="var(--c-accent)"
          stroke-width="3"
        />
        <line
          v-if="alignHigh !== alignLow"
          :x1="edgeX"
          :y1="datumY + (result.thimbleGrids - alignHigh) * pxPerGrid"
          :x2="edgeX + 30"
          :y2="datumY + (result.thimbleGrids - alignHigh) * pxPerGrid"
          stroke="var(--c-accent)"
          stroke-width="3"
        />
      </g>
    </svg>
  </div>
</template>
