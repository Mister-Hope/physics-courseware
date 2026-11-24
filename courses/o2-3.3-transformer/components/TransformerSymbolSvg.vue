<script setup lang="ts">
/**
 * 变压器的电路符号（严格照人教版选择性必修二 图 3.3-1、图 3.3-7 实测比例重画）
 *
 * 教材图 3.3-1 实测比例（按 2× 放大到 320×340 viewBox）：
 *
 * - 每个线圈的高度：148（教材 74px）
 * - 每个线圈的半圆个数：4（两侧相同）
 * - 半圆半径 r：18.5（高度 ÷ 8，教材 9px）
 * - 半圆向外鼓出量：18.5（真圆弧：横向 1r、纵向 2r）
 * - 左右两列线圈中线的间距：18.5（等于半径 r，两列几乎相贴）
 * - 上、下引线长度（从中线到端点）：74（等于 4r，教材 37px），使得总宽 ÷ 线圈高 = (74*2 + 18.5) / 148 ≈ 1.125 ~ 1.2
 * - 线宽：4（高度 ÷ 37 = 148 ÷ 37 = 4，教材 2px）
 * - 引线与半圆顺着圆弧切线一笔接出（单条连续 <path>），引线端是干净平齐的线头（stroke-linecap="butt"）。
 */
import { computed } from "vue";

const {
  turns = 4,
  showCore = false,
  showLabels = true,
  showTerminals = false,
  coreColor = "#ffffff",
  leftColor = "#ffffff",
  rightColor = "#ffffff",
} = defineProps<{
  /** 每侧画几个半圆（两侧个数相同，教材画法） */
  turns?: number;
  /** 是否补画闭合铁芯的两条竖线（教材符号里没有，默认关闭） */
  showCore?: boolean;
  showLabels?: boolean;
  /** 是否标出左侧“交流电源”与右侧“负载”接线端文字（供第 5 页 C2 演示） */
  showTerminals?: boolean;
  coreColor?: string;
  leftColor?: string;
  rightColor?: string;
}>();

/** 线圈上下端、半圆半径（高度 148，turns = 4 时 r = 18.5，线宽 = 148 / 37 = 4） */
const coilTop = 86;
const coilBottom = 234;
const coilHeight = coilBottom - coilTop;
const strokeW = coilHeight / 37;
const radius = computed(() => coilHeight / turns / 2);

/** 两条线圈的竖直中线：左线圈半圆向右鼓（顶点在 leftAxisX + r），右线圈半圆向左鼓（顶点在 rightAxisX - r）；两列半圆的鼓包相对，顶点间距约 0.55r，故中线间距 = 2.55r */
const leftAxisX = computed(() => 160 - radius.value * 1.28);
const rightAxisX = computed(() => 160 + radius.value * 1.28);

/** 上、下引线长度（从竖直中线向外延伸 3.6r，总宽 ÷ 线圈高 ≈ 1.2） */
const leadLen = computed(() => radius.value * 3.6);
const leadLeftX = computed(() => leftAxisX.value - leadLen.value);
const leadRightX = computed(() => rightAxisX.value + leadLen.value);

/**
 * 单条连续路径（上引线 → 4 个向中间相对鼓出的半圆 → 下引线）：
 *
 * - 左线圈（sweep = 1）：从上往下画，圆弧向右（向中间）鼓出；
 * - 右线圈（sweep = 0）：从上往下画，圆弧向左（向中间）鼓出； 两列半圆相对而立，完全对齐人教版教材图 3.3-1 与图 3.3-7！
 */
const buildContinuousCoilPath = (axisX: number, leadEndX: number, sweep: 0 | 1): string => {
  const r = radius.value;
  let d = `M ${leadEndX} ${coilTop} L ${axisX} ${coilTop}`;
  for (let i = 0; i < turns; i += 1) d += ` A ${r} ${r} 0 0 ${sweep} ${axisX} ${coilTop + (i + 1) * 2 * r}`;

  d += ` L ${leadEndX} ${coilBottom}`;
  return d;
};

const leftCoilFullPath = computed(() => buildContinuousCoilPath(leftAxisX.value, leadLeftX.value, 1));
const rightCoilFullPath = computed(() => buildContinuousCoilPath(rightAxisX.value, leadRightX.value, 0));
</script>

<template>
  <svg viewBox="-20 0 360 320" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 闭合铁芯（教材符号里没有，默认关闭） -->
    <template v-if="showCore">
      <line x1="157" :y1="coilTop - 8" x2="157" :y2="coilBottom + 8" :stroke="coreColor" :stroke-width="strokeW * 0.75" />
      <line x1="163" :y1="coilTop - 8" x2="163" :y2="coilBottom + 8" :stroke="coreColor" :stroke-width="strokeW * 0.75" />
    </template>

    <!-- 原线圈（左）：上引线 + 4 个朝左半圆 + 下引线一笔连续，干净平齐线头 -->
    <path :d="leftCoilFullPath" fill="none" :stroke="leftColor" :stroke-width="strokeW" stroke-linecap="butt" stroke-linejoin="round" />

    <!-- 副线圈（右）：上引线 + 4 个朝右半圆 + 下引线一笔连续，干净平齐线头 -->
    <path :d="rightCoilFullPath" fill="none" :stroke="rightColor" :stroke-width="strokeW" stroke-linecap="butt" stroke-linejoin="round" />

    <g v-if="showLabels">
      <text v-if="showCore" x="160" y="56" text-anchor="middle" font-size="15" font-weight="700" :fill="coreColor">闭合铁芯</text>
      <text x="108" y="282" text-anchor="middle" font-size="15" font-weight="700" :fill="leftColor">
        原线圈 <tspan font-family="KaTeX_Math" font-style="italic" font-weight="400">n</tspan><tspan font-family="KaTeX_Math" font-size="11" dy="4">1</tspan>
      </text>
      <text x="212" y="282" text-anchor="middle" font-size="15" font-weight="700" :fill="rightColor">
        副线圈 <tspan font-family="KaTeX_Math" font-style="italic" font-weight="400">n</tspan><tspan font-family="KaTeX_Math" font-size="11" dy="4">2</tspan>
      </text>
      <template v-if="showTerminals">
        <circle :cx="leadLeftX" :cy="coilTop" r="3.6" :fill="leftColor" />
        <circle :cx="leadLeftX" :cy="coilBottom" r="3.6" :fill="leftColor" />
        <text :x="leadLeftX - 10" :y="(coilTop + coilBottom) / 2 + 5" text-anchor="end" font-size="14" font-weight="700" :fill="leftColor">接交流电源</text>
        <circle :cx="leadRightX" :cy="coilTop" r="3.6" :fill="rightColor" />
        <circle :cx="leadRightX" :cy="coilBottom" r="3.6" :fill="rightColor" />
        <text :x="leadRightX + 10" :y="(coilTop + coilBottom) / 2 + 5" text-anchor="start" font-size="14" font-weight="700" :fill="rightColor">接负载</text>
      </template>
    </g>
  </svg>
</template>
