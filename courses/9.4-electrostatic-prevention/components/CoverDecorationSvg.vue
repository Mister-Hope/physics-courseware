<script setup lang="ts">
// 第 1 页封面装饰：平行电场线 + 金属导体剪影 + 两侧感应电荷 + 内部 E=0 意象
const ys = [64, 100, 136, 172, 208];
</script>

<template>
  <svg viewBox="0 0 520 270" width="380" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow v-for="y in ys" :key="`l${y}`" :from="{ x: 26, y }" :to="{ x: 176, y }" stroke="var(--c-field)" stroke-width="1.6" :opacity="0.7" />
    <CourseArrow v-for="y in ys" :key="`r${y}`" :from="{ x: 344, y }" :to="{ x: 494, y }" stroke="var(--c-field)" stroke-width="1.6" :opacity="0.7" />
    <rect
      x="196"
      y="42"
      width="128"
      height="192"
      rx="12"
      fill="var(--c-line)"
      fill-opacity="0.5"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.45"
      stroke-width="2"
    />
    <text
      v-for="y in [82, 124, 166, 208]"
      :key="`m${y}`"
      x="214"
      :y="y"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="20"
      fill="var(--c-velocity)"
      opacity="0.9"
    >
      −
    </text>
    <text
      v-for="y in [82, 124, 166, 208]"
      :key="`p${y}`"
      x="306"
      :y="y"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="20"
      fill="var(--c-danger)"
      opacity="0.9"
    >
      +
    </text>
    <text
      x="260"
      y="140"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-text-mute)"
    >
      E = 0
    </text>
  </svg>
</template>
