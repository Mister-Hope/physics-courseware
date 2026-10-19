<script setup lang="ts">
/**
 * 第一课时：游标卡尺读数图（10 / 20 / 50 分度通用）。
 *
 * 几何完全由读数反推，读数与图必然自洽： 精度 = 1 / 分度数；每格长 = 1 mm − 精度（10 分度每格 0.9 mm、20 分度 0.95 mm、50 分度 0.98 mm）； 主尺读数 = 游标零线左侧最近的主尺刻度；对齐格号 k 由 (读数 − 主尺读数) / 精度 得到； 第 k
 * 条游标刻度线恰好落在主尺 (读数 + k × 每格长) 处——这个位置一定是整数毫米。 主尺刻度一直画到覆盖整条游标尺，所以"对齐"永远能在图上核对。
 *
 * Step ≥1 标主尺读数与游标零线位置，≥2 标出对齐的游标刻度线与对应的主尺刻度线。
 */
import { computed } from "vue";

const {
  divisions = 10,
  reading = 21.7,
  step = 0,
} = defineProps<{
  divisions?: 10 | 20 | 50;
  reading?: number;
  step?: number;
}>();

const width = 640;
const height = 300;
const left = 36;
const mainY = 96;
const vernierY = 168;

const precision = computed(() => 1 / divisions);
/** 游标尺每格长度：1 mm − 精度 */
const perDivision = computed(() => 1 - precision.value);
/** 主尺读数：游标零线左侧最近的整毫米 */
const mainReading = computed(() => Math.floor(reading));
/** 对齐的游标刻度编号（0 … 分度数−1） */
const alignIndex = computed(() => Math.round((reading - mainReading.value) / precision.value));
/** 对齐处对应主尺的整数毫米刻度 */
const alignMm = computed(() => reading + alignIndex.value * perDivision.value);
/** 主尺要画到的最大值：覆盖整条游标尺 */
const mainEnd = computed(() => Math.ceil(reading + divisions * perDivision.value) + 1);
const pxPerMm = computed(() => (width - left - 24) / mainEnd.value);
const getX = (mm: number): number => left + mm * pxPerMm.value;

const mainMarks = computed(() =>
  Array.from({ length: mainEnd.value + 1 }, (_, mm) => ({
    mm,
    x: getX(mm),
    size: mm % 5 === 0,
  })),
);
const vernierMarks = computed(() =>
  Array.from({ length: divisions + 1 }, (_, index) => ({
    index,
    x: getX(reading + index * perDivision.value),
    size: index % 5 === 0,
  })),
);
const vernierLeft = computed(() => getX(reading) - 12);
const vernierRight = computed(() => getX(reading + divisions * perDivision.value) + 12);
</script>

<template>
  <div class="figure">
    <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
      <line :x1="left - 14" :y1="mainY" :x2="width - 12" :y2="mainY" stroke="var(--c-text)" stroke-width="1.6" />
      <g v-for="mark in mainMarks" :key="`main-${mark.mm}`">
        <line :x1="mark.x" :y1="mainY" :x2="mark.x" :y2="mainY - (mark.size ? 28 : 18)" stroke="var(--c-text)" :stroke-width="mark.size ? 2.2 : 1.4" />
        <text v-if="mark.size" :x="mark.x" :y="mainY - 36" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">
          {{ mark.mm }}
        </text>
      </g>
      <text :x="left - 12" :y="mainY - 50" font-size="15" fill="var(--c-text-dim)">主尺</text>
      <rect
        :x="vernierLeft"
        :y="vernierY - 22"
        :width="vernierRight - vernierLeft"
        height="52"
        rx="6"
        fill="var(--c-panel)"
        stroke="var(--c-line)"
        stroke-width="1.4"
      />
      <line :x1="vernierLeft" :y1="vernierY" :x2="vernierRight" :y2="vernierY" stroke="var(--c-text)" stroke-width="1.6" />
      <g v-for="mark in vernierMarks" :key="`vernier-${mark.index}`">
        <line :x1="mark.x" :y1="vernierY" :x2="mark.x" :y2="vernierY + (mark.size ? 20 : 14)" stroke="var(--c-text)" :stroke-width="mark.size ? 2 : 1.3" />
        <text v-if="mark.size" :x="mark.x" :y="vernierY + 36" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-text)">
          {{ mark.index }}
        </text>
      </g>
      <text :x="(vernierLeft + vernierRight) / 2" :y="vernierY + 56" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">游标尺</text>
      <g v-if="step >= 1">
        <line :x1="getX(reading)" :y1="mainY" :x2="getX(reading)" :y2="vernierY + 26" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="5 4" />
        <line :x1="vernierLeft" :y1="vernierY - 28" :x2="vernierLeft" :y2="vernierY + 26" stroke="var(--c-accent)" stroke-width="1.6" />
        <line :x1="getX(mainReading)" :y1="mainY" :x2="getX(mainReading)" :y2="mainY - 34" stroke="var(--c-accent)" stroke-width="3.2" />
        <circle :cx="getX(mainReading)" :cy="mainY - 42" r="4.5" fill="var(--c-accent)" />
      </g>
      <g v-if="step >= 2">
        <line
          :x1="getX(alignMm)"
          :y1="mainY - 34"
          :x2="getX(alignMm)"
          :y2="vernierY + 30"
          stroke="var(--c-accent-2)"
          stroke-width="1.6"
          stroke-dasharray="5 4"
        />
        <line :x1="getX(alignMm)" :y1="mainY" :x2="getX(alignMm)" :y2="mainY - 32" stroke="var(--c-accent-2)" stroke-width="3.2" />
        <line :x1="getX(alignMm)" :y1="vernierY" :x2="getX(alignMm)" :y2="vernierY + 26" stroke="var(--c-accent-2)" stroke-width="3.2" />
      </g>
    </svg>
  </div>
</template>
