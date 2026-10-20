<script setup lang="ts">
import { LEVEL_Y } from "./energyLevels";

/**
 * 第 12 / 13 页共用：原子的能级图（横线 = 分立的能级，纵轴 = 能量 E）。
 *
 * Step 0：只有 E 轴； step 1：四条能级 + n 编号； step 2：高亮最低能级（能量最低，最稳定）； step 3：被高速电子撞击而激发（向上箭头，n = 1 → n =
 * 3）； step 4：自发跃迁 n = 3 → n = 2，放出一个光子； step 5：再跃迁 n = 2 → n = 1，再放出一个光子。
 *
 * 跃迁箭头端点一律取自 energyLevels.ts 的 LEVEL_Y，保证尖端精确落在能级线上； 不画"入射电子"卡通形象（避免误读成"电子自己跑到高能级"），只用箭头 + 短标注；
 * 不标能量数值、不标刻度；能级间距「越高越密」只作画图约定，不上屏、不作结论。
 */
const { step = 0 } = defineProps<{ step?: number }>();

const LEVELS = LEVEL_Y.map((y, index) => ({ y, n: index + 1 }));
/** 激发箭头与向下跃迁箭头的横坐标（各占一条竖直通道，互不重叠） */
const UP_X = 210;
const DOWN_X = 380;
/** 光子波浪线的起点与标注位置 */
const WAVE_X = 396;
const WAVE_LABEL_X = 494;

const photonPath = (y: number): string =>
  `M ${WAVE_X} ${y} q 9 -12 18 0 t 18 0 t 18 0 t 18 0 t 18 0`;

/** N = 3 → n = 2 与 n = 2 → n = 1 两次跃迁的纵向中点（光子波浪线的位置） */
const MID_32 = (LEVEL_Y[2] + LEVEL_Y[1]) / 2;
const MID_21 = (LEVEL_Y[1] + LEVEL_Y[0]) / 2;
</script>

<template>
  <svg
    viewBox="0 0 620 300"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="原子的能级图：能量最低的能级最稳定；原子被高速电子撞击后跃迁到较高能级，再自发向较低能级跃迁并放出光子"
  >
    <CourseArrow
      :from="{ x: 54, y: 272 }"
      :to="{ x: 54, y: 26 }"
      stroke="var(--c-text-dim)"
      stroke-width="2"
    />
    <text
      x="34"
      y="26"
      font-size="20"
      font-family="KaTeX_Math"
      font-style="italic"
      fill="var(--c-text-dim)"
    >
      E
    </text>
    <g v-if="step >= 1">
      <g stroke="var(--c-text-dim)" stroke-width="2.6" stroke-linecap="round">
        <line
          v-for="level in LEVELS"
          :key="level.n"
          :x1="112"
          :y1="level.y"
          :x2="572"
          :y2="level.y"
          :opacity="0.72"
        />
      </g>
      <text
        v-for="level in LEVELS"
        :key="`n-${level.n}`"
        :x="100"
        :y="level.y + 6"
        font-size="17"
        text-anchor="end"
        fill="var(--c-text)"
      >
        <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
        <tspan font-family="KaTeX_Main" font-style="normal">= {{ level.n }}</tspan>
      </text>
    </g>
    <g v-if="step >= 2">
      <line
        :x1="112"
        :y1="LEVEL_Y[0]"
        :x2="572"
        :y2="LEVEL_Y[0]"
        stroke="var(--c-accent)"
        stroke-width="5"
        stroke-linecap="round"
      />
      <text x="112" :y="LEVEL_Y[0] + 22" font-size="16" fill="var(--c-accent)">
        能量最低，最稳定
      </text>
    </g>
    <g v-if="step >= 3">
      <CourseArrow
        :from="{ x: UP_X, y: LEVEL_Y[0] }"
        :to="{ x: UP_X, y: LEVEL_Y[2] }"
        stroke="var(--c-accent)"
        stroke-width="3.2"
      />
      <text x="112" :y="LEVEL_Y[0] - 24" font-size="16" fill="var(--c-physics)">被电子撞击</text>
    </g>
    <g v-if="step >= 4">
      <CourseArrow
        :from="{ x: DOWN_X, y: LEVEL_Y[2] }"
        :to="{ x: DOWN_X, y: LEVEL_Y[1] }"
        stroke="var(--c-accent-2)"
        stroke-width="3.2"
      />
      <path
        :d="photonPath(MID_32)"
        fill="none"
        stroke="var(--c-physics)"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <text :x="WAVE_LABEL_X" :y="MID_32 + 6" font-size="16" fill="var(--c-physics)">光子</text>
    </g>
    <g v-if="step >= 5">
      <CourseArrow
        :from="{ x: DOWN_X, y: LEVEL_Y[1] }"
        :to="{ x: DOWN_X, y: LEVEL_Y[0] }"
        stroke="var(--c-accent-2)"
        stroke-width="3.2"
      />
      <path
        :d="photonPath(MID_21)"
        fill="none"
        stroke="var(--c-physics)"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <text :x="WAVE_LABEL_X" :y="MID_21 + 6" font-size="16" fill="var(--c-physics)">光子</text>
    </g>
  </svg>
</template>
