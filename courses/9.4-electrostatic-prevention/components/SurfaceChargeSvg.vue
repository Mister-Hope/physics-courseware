<script setup lang="ts">
// 第 5 页：静电平衡导体的电荷分布 —— 外表面、尖端更密、尖端场强更大
defineProps<{ step: number }>();

const surfaceCharges = [
  { x: 138, y: 176 },
  { x: 160, y: 206 },
  { x: 196, y: 222 },
  { x: 240, y: 224 },
  { x: 280, y: 210 },
  { x: 306, y: 176 },
  { x: 312, y: 140 },
  { x: 296, y: 108 },
  { x: 258, y: 90 },
  { x: 214, y: 84 },
  { x: 174, y: 92 },
  { x: 146, y: 116 },
];
const tipCharges = [
  { x: 112, y: 132 },
  { x: 118, y: 140 },
  { x: 112, y: 148 },
  { x: 126, y: 132 },
  { x: 126, y: 148 },
];
</script>

<template>
  <svg viewBox="0 0 420 260" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 240px">
    <path
      d="M 108 140 C 140 96 204 76 254 94 C 304 112 322 168 292 204 C 258 242 176 240 146 206 C 126 182 116 160 108 140 Z"
      fill="var(--c-line)"
      fill-opacity="0.55"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.5"
      stroke-width="2"
    />
    <template v-if="step >= 1">
      <text
        v-for="(c, i) in surfaceCharges"
        :key="`s${i}`"
        :x="c.x"
        :y="c.y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="16"
        fill="var(--c-danger)"
      >
        +
      </text>
      <text x="214" y="156" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-text-mute)">内部无净电荷</text>
    </template>
    <template v-if="step >= 2">
      <circle cx="120" cy="140" r="34" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="5 4" />
      <text
        v-for="(c, i) in tipCharges"
        :key="`t${i}`"
        :x="c.x"
        :y="c.y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="15"
        fill="var(--c-danger)"
      >
        +
      </text>
      <text x="76" y="96" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">电荷密度大</text>
    </template>
    <template v-if="step >= 3">
      <CourseArrow :from="{ x: 110, y: 140 }" :to="{ x: 34, y: 140 }" stroke="var(--c-field)" stroke-width="2.4" />
      <CourseArrow :from="{ x: 116, y: 128 }" :to="{ x: 54, y: 88 }" stroke="var(--c-field)" stroke-width="2" />
      <CourseArrow :from="{ x: 116, y: 154 }" :to="{ x: 54, y: 194 }" stroke="var(--c-field)" stroke-width="2" />
      <text x="34" y="70" font-family="KaTeX_Main" font-size="12" fill="var(--c-field)">场强大</text>
    </template>
  </svg>
</template>
