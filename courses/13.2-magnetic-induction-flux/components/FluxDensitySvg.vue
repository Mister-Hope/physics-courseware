<template>
  <!--
    第 8 页《磁感线的疏密》配图（教材图 13.2-4 风格）
    —— 左右两簇疏密不同的磁感线（方向向下）；在两处各取同样大小的面 S₁、S₂（虚线方框），
       框内的磁感线高亮：穿过 S₁ 的 3 条、穿过 S₂ 的 2 条 —— 条数多的一侧磁场强。
  -->
  <svg viewBox="0 0 480 300" width="480" height="300" xmlns="http://www.w3.org/2000/svg">
    <g v-for="x in LEFT" :key="`l${x}`">
      <CourseArrow
        :from="{ x, y: 36 }"
        :to="{ x, y: 262 }"
        :stroke="inBox(x, S1) ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        :stroke-width="inBox(x, S1) ? 3 : 2"
        :opacity="inBox(x, S1) ? 1 : 0.35"
      />
    </g>
    <g v-for="x in RIGHT" :key="`r${x}`">
      <CourseArrow
        :from="{ x, y: 36 }"
        :to="{ x, y: 262 }"
        :stroke="inBox(x, S2) ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        :stroke-width="inBox(x, S2) ? 3 : 2"
        :opacity="inBox(x, S2) ? 1 : 0.35"
      />
    </g>
    <rect :x="S1.x" :y="S1.y" :width="S1.w" :height="S1.h" fill="rgba(226,168,70,0.08)" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-dasharray="7 5" />
    <rect :x="S2.x" :y="S2.y" :width="S2.w" :height="S2.h" fill="rgba(226,168,70,0.08)" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-dasharray="7 5" />
    <text x="134" y="252" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-accent-2)">S</text>
    <text x="144" y="256" font-family="KaTeX_Main" font-size="13" fill="var(--c-accent-2)">1</text>
    <text x="369" y="252" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-accent-2)">S</text>
    <text x="379" y="256" font-family="KaTeX_Main" font-size="13" fill="var(--c-accent-2)">2</text>
  </svg>
</template>

<script setup>
/** 左侧密的一簇（间距 26）与右侧疏的一簇（间距 46） */
const LEFT = [82, 108, 134, 160, 186, 212];
const RIGHT = [300, 346, 392, 438];
/** 两个同样大小的面（虚线方框，80×80） */
const S1 = { x: 94, y: 110, w: 80, h: 80 };
const S2 = { x: 329, y: 110, w: 80, h: 80 };

/**
 * 判断某条磁感线是否穿过给定的面（框内高亮、框外压淡）
 *
 * @param x 磁感线的横坐标
 * @param box 面的方框
 * @returns 是否穿过
 */
const inBox = (x, box) => x >= box.x && x <= box.x + box.w;
</script>
