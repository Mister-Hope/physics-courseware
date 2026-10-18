<script setup lang="ts">
// 第 15 页：相距很近的一对带等量异种电荷的平行金属板，
// 板间的电场除边缘外可以看作匀强电场——电场线是间隔相等、方向相同的平行线。
const PLATE_X1 = 96;
const PLATE_X2 = 364;
const TOP_Y = 72;
const BOTTOM_Y = 208;
const PLATE_H = 12;
// 板间等距平行电场线（方向由正极板指向负极板）
const LINE_X = [124, 164, 204, 244, 284, 324, 356];
const PLUS_X = [110, 150, 190, 230, 270, 310, 350];
const MINUS_X = [110, 150, 190, 230, 270, 310, 350];
</script>

<template>
  <svg viewBox="0 0 460 300" class="w-full h-full">
    <rect :x="PLATE_X1" :y="TOP_Y" :width="PLATE_X2 - PLATE_X1" :height="PLATE_H" rx="3" fill="var(--c-panel)" stroke="var(--c-line)" />
    <rect :x="PLATE_X1" :y="BOTTOM_Y" :width="PLATE_X2 - PLATE_X1" :height="PLATE_H" rx="3" fill="var(--c-panel)" stroke="var(--c-line)" />
    <text
      v-for="x in PLUS_X"
      :key="`p${x}`"
      :x="x"
      :y="TOP_Y - 16"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="15"
      fill="var(--c-danger)"
    >+</text>
    <text
      v-for="x in MINUS_X"
      :key="`m${x}`"
      :x="x"
      :y="BOTTOM_Y + 30"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="15"
      fill="var(--c-velocity)"
    >−</text>
    <CourseArrow
      v-for="x in LINE_X"
      :key="`l${x}`"
      :from="{ x, y: TOP_Y + PLATE_H + 10 }"
      :to="{ x, y: BOTTOM_Y - 10 }"
      stroke="var(--c-field)"
      :stroke-width="2"
    />
    <line x1="76" :y1="TOP_Y + PLATE_H" x2="76" :y2="BOTTOM_Y" stroke="var(--c-text-mute)" stroke-width="1.4" />
    <line x1="70" :y1="TOP_Y + PLATE_H" x2="82" :y2="TOP_Y + PLATE_H" stroke="var(--c-text-mute)" stroke-width="1.4" />
    <line x1="70" :y1="BOTTOM_Y" x2="82" :y2="BOTTOM_Y" stroke="var(--c-text-mute)" stroke-width="1.4" />
    <text x="62" :y="(TOP_Y + BOTTOM_Y) / 2 + 5" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text-mute)">d</text>
  </svg>
</template>
