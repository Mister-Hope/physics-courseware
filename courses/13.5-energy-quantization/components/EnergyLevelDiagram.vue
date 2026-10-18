<script setup lang="ts">
/**
 * 第 10 / 11 页共用：原子的能级图（横线 = 分立的能级，纵轴 = 能量 E）。 step = 0 只画能级阶梯（第 10 页）；第 11 页把 step 传成 $clicks： 1 →
 * 高亮能量最低的那条线（最稳定），2 → 高速电子撞击、跃迁到较高能级， 3 → 自发向低能级跃迁、放出一道光子。
 */
const { step = 0 } = defineProps<{ step?: number }>();

/** 四条能级的纵坐标（自下而上间距递减，与原子能级的画法一致） */
const LEVELS = [296, 206, 152, 118];
const X0 = 96;
const X1 = 372;
</script>

<template>
  <svg
    viewBox="0 0 460 340"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="原子的能级图：能量分立的四条能级，电子撞击后跃迁到较高能级，再自发跃迁回低能级并放出光子"
  >
    <CourseArrow
      :from="{ x: 48, y: 320 }"
      :to="{ x: 48, y: 40 }"
      stroke="var(--c-text-dim)"
      stroke-width="2"
    />
    <text
      x="30"
      y="38"
      font-size="19"
      font-family="KaTeX_Math"
      font-style="italic"
      fill="var(--c-text-dim)"
    >
      E
    </text>
    <g stroke="var(--c-text-dim)" stroke-width="2.6" stroke-linecap="round">
      <line
        v-for="(y, index) in LEVELS"
        :key="y"
        :x1="X0"
        :y1="y"
        :x2="X1"
        :y2="y"
        :opacity="0.75"
      />
    </g>
    <text
      v-for="(y, index) in LEVELS"
      :key="`n-${y}`"
      :x="X0 - 12"
      :y="y + 6"
      font-size="19"
      text-anchor="end"
      fill="var(--c-text)"
    >
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan font-family="KaTeX_Main" font-style="normal">= {{ index + 1 }}</tspan>
    </text>
    <g v-if="step >= 1">
      <line
        :x1="X0"
        :y1="LEVELS[0]"
        :x2="X1"
        :y2="LEVELS[0]"
        stroke="var(--c-accent)"
        stroke-width="4"
        stroke-linecap="round"
      />
      <text :x="X1" :y="LEVELS[0] - 14" font-size="17" text-anchor="end" fill="var(--c-accent)">
        能量最低，最稳定
      </text>
    </g>
    <g v-if="step >= 2">
      <circle cx="120" cy="250" r="7" fill="var(--c-physics)" />
      <text x="106" y="244" font-size="16" text-anchor="end" fill="var(--c-physics)">电子</text>
      <CourseArrow
        :from="{ x: 132, y: 256 }"
        :to="{ x: 178, y: 290 }"
        stroke="var(--c-physics)"
        stroke-width="2.4"
      />
      <CourseArrow
        :from="{ x: 220, y: 292 }"
        :to="{ x: 220, y: 156 }"
        stroke="var(--c-accent)"
        stroke-width="3"
      />
    </g>
    <g v-if="step >= 3">
      <CourseArrow
        :from="{ x: 300, y: 156 }"
        :to="{ x: 300, y: 292 }"
        stroke="var(--c-physics)"
        stroke-width="3"
      />
      <path
        d="M 312 232 q 8 -10 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <text x="371" y="256" font-size="17" text-anchor="middle" fill="var(--c-accent-2)">光子</text>
    </g>
  </svg>
</template>
