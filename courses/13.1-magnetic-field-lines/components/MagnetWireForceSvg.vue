<!--
  蹄形磁体两极间的通电直导线（第 4 页）：磁体两极间先给出磁场 B，
  点击①通电（导线电流垂直纸面向外 ⊙），点击②出受力 F 并沿 F 方向移动。
  F = I L × B：I 向外（−z）、B 向右（+x）⇒ F 向上（屏幕上方），由 computed 给出方向。
-->
<script setup>
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

const { $clicks } = useSlideContext();
const step = computed(() => $clicks.value);
/** 导线通电后沿受力方向移动的距离（用户单位） */
const LIFT = 16;
const dy = computed(() => (step.value >= 2 ? -LIFT : 0));
</script>

<template>
  <svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
    <!-- 蹄形磁体（两臂朝下，左 N 右 S） -->
    <path d="M 110 200 V 88 Q 110 64 134 64 H 220 V 80 H 177 Q 165 80 165 88 V 200 Z" fill="var(--c-danger)" />
    <path d="M 330 200 V 88 Q 330 64 306 64 H 220 V 80 H 263 Q 275 80 275 88 V 200 Z" fill="var(--c-velocity)" />
    <text x="137" y="150" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-text)">N</text>
    <text x="303" y="150" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-text)">S</text>

    <!-- 两极间的磁场：N → S -->
    <CourseArrow :from="{ x: 174, y: 150 }" :to="{ x: 266, y: 150 }" stroke="var(--c-field)" stroke-width="3" label="B" :label-dy="-14" />

    <!-- 电流垂直纸面向外的直导线（原位置用虚线圆留痕） -->
    <circle v-if="step >= 2" cx="220" cy="150" r="13" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.7" />
    <g :transform="`translate(0 ${dy})`">
      <FieldMark :x="220" :y="150" dir="out" :r="13" :line-width="2.4" label="I" />
    </g>

    <!-- 受力方向：F = I L × B，从导线几何中心出发向上 -->
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 220, y: 150 + dy }" :to="{ x: 220, y: 84 }" stroke="var(--c-physics)" stroke-width="4" label="F" :label-dx="18" />
    </g>
  </svg>
</template>
