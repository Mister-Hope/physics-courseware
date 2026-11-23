<!--
  水平弹簧振子（第 3、5、10、11、13 页共用）。
  x：小球相对平衡位置的位移，单位取振幅 A（-1 ~ 1，正方向向右）。
  showForces：画出回复力 F 与速度 v 的箭头（F 从几何中心指向平衡位置）。
-->
<script setup lang="ts">
import { computed } from "vue";

const {
  x = 0,
  showForces = false,
  showAxis = true,
} = defineProps<{
  /** 相对平衡位置的位移（以振幅为单位） */
  x?: number;
  /** 是否画出回复力与速度箭头 */
  showForces?: boolean;
  /** 是否画出坐标轴与 x 标注 */
  showAxis?: boolean;
}>();

const EQ = 230;
const SCALE = 70;
const ballX = computed(() => EQ + x * SCALE);
/** 弹簧右端（小球左侧的挂钩处） */
const springEnd = computed(() => ballX.value - 20);
/** 弹簧圈数固定，长度随小球位置变化 */
const coils = computed(() => {
  const start = 34;
  const end = springEnd.value;
  const n = 8;
  const step = (end - start) / n;
  const pts: string[] = [`${start},78`];
  for (let i = 0; i < n; i += 1) {
    const px = start + step * (i + 0.5);
    const py = i % 2 === 0 ? 64 : 92;
    pts.push(`${px.toFixed(1)},${py}`);
  }
  pts.push(`${end.toFixed(1)},78`);
  return pts.join(" ");
});
const forceDir = computed(() => (x > 0.02 ? -1 : x < -0.02 ? 1 : 0));
const velocityDir = computed(() => (x > 0.02 ? 1 : x < -0.02 ? -1 : 0));
</script>

<template>
  <svg viewBox="0 0 460 170" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 固定端与光滑杆 -->
    <rect x="20" y="44" width="12" height="70" rx="2" fill="var(--c-text-dim)" opacity="0.5" />
    <line x1="32" y1="78" x2="440" y2="78" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.45" />
    <!-- 平衡位置的竖直虚线 -->
    <line x1="230" y1="40" x2="230" y2="152" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.7" />
    <text x="230" y="166" text-anchor="middle" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">O</text>
    <!-- 弹簧 -->
    <polyline :points="coils" fill="none" stroke="var(--c-text-dim)" stroke-width="2.2" stroke-linejoin="round" />
    <!-- 小球 -->
    <circle :cx="ballX" cy="78" r="17" fill="rgba(226, 168, 70, 0.2)" stroke="var(--c-accent)" stroke-width="2" />
    <circle :cx="ballX" cy="78" r="3" fill="var(--c-accent)" opacity="0.75" />
    <!-- 坐标轴 -->
    <g v-if="showAxis">
      <CourseArrow :from="{ x: 60, y: 130 }" :to="{ x: 410, y: 130 }" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text x="418" y="135" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="16">x</text>
    </g>
    <!-- 位移的标注线 -->
    <g v-if="Math.abs(x) > 0.02"></g>
    <!-- 回复力与速度 -->
    <g v-if="showForces">
      <CourseArrow v-if="forceDir !== 0" :from="{ x: ballX, y: 78 }" :to="{ x: ballX + forceDir * 62, y: 78 }" stroke="var(--c-danger)" stroke-width="2.6" />
      <text
        v-if="forceDir !== 0"
        :x="ballX + forceDir * 30"
        y="58"
        text-anchor="middle"
        fill="var(--c-danger)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
      >
        F
      </text>
      <CourseArrow
        v-if="velocityDir !== 0"
        :from="{ x: ballX, y: 36 }"
        :to="{ x: ballX + velocityDir * 54, y: 36 }"
        stroke="var(--c-velocity)"
        stroke-width="2.2"
      />
      <text
        v-if="velocityDir !== 0"
        :x="ballX + velocityDir * 26"
        y="26"
        text-anchor="middle"
        fill="var(--c-velocity)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
      >
        v
      </text>
    </g>
  </svg>
</template>
