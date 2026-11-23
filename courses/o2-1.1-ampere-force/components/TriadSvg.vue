<!--
  第 4 页：I 与 B 所决定的平面 + F 垂直于该平面。
  —— 用斜二测的平面（平行四边形）表示 I、B 所在平面，I 与 B 不必互相垂直；
     F 从 I、B 的交点竖直向上，垂直于整个平面。showF 由页面点击控制。
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 是否显示安培力 F（点击后） */
    showF?: boolean;
  }>(),
  { showF: false },
);
</script>

<template>
  <svg viewBox="0 0 480 330" width="480" height="330" class="course-fig" role="img" aria-label="安培力垂直于电流与磁场所决定的平面">
    <polygon
      points="80,238 352,238 430,150 158,150"
      fill="color-mix(in srgb, var(--c-accent-2) 7%, transparent)"
      stroke="color-mix(in srgb, var(--c-accent-2) 38%, transparent)"
      stroke-width="1.6"
      stroke-dasharray="7 6"
    />
    <CourseArrow :from="{ x: 150, y: 210 }" :to="{ x: 356, y: 210 }" stroke="var(--c-accent-2)" :stroke-width="3.2" label="I" :label-dx="0" :label-dy="18" />
    <CourseArrow :from="{ x: 150, y: 210 }" :to="{ x: 268, y: 170 }" stroke="var(--c-accent)" :stroke-width="3.2" label="B" :label-dx="10" :label-dy="-10" />
    <circle cx="150" cy="210" r="4.2" fill="var(--c-text)" opacity="0.9" />
    <g v-show="showF">
      <CourseArrow :from="{ x: 150, y: 210 }" :to="{ x: 150, y: 74 }" stroke="var(--c-danger)" :stroke-width="3.6" label="F" :label-dx="-20" :label-dy="0" />
    </g>
  </svg>
</template>
