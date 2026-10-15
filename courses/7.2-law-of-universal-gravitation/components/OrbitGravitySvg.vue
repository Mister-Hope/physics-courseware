<!-- 行星绕太阳运动（第 3、5 页）：轨道按圆处理，速度沿切线，引力沿两者连线指向太阳；相互吸引时太阳同样受到行星的引力 -->
<script setup lang="ts">
import { computed } from "vue";

const { showForce = false, mutual = false } = defineProps<{
  /** 是否画出引力箭头（点击后才出现） */
  showForce?: boolean;
  /** 是否同时画出太阳受到行星的引力（相互性） */
  mutual?: boolean;
}>();

const SUN = { x: 170, y: 155 };
const SUN_R = 24;
const PLANET_R = 16;
/** 圆轨道半径：行星轨道与圆十分接近，中学一律按圆处理 */
const R = 130;

/** 行星在轨道上的位置（偏角取 -35°，让圆轨道铺满画面） */
const angle = (-35 * Math.PI) / 180;
const planet = computed(() => ({
  x: SUN.x + R * Math.cos(angle),
  y: SUN.y + R * Math.sin(angle),
}));

/** 半径标记 r：放在连线中点附近，沿垂直方向让开一点 */
const radiusLabel = computed(() => {
  const dx = planet.value.x - SUN.x;
  const dy = planet.value.y - SUN.y;
  const len = Math.hypot(dx, dy) || 1;

  return { x: SUN.x + dx / 2 + (dy / len) * 26, y: SUN.y + dy / 2 - (dx / len) * 26 };
});

/** 行星受到的引力：从行星几何中心出发，沿连线指向太阳（尖端落在太阳边缘外一点） */
const forceTo = computed(() => {
  const dx = SUN.x - planet.value.x;
  const dy = SUN.y - planet.value.y;
  const len = Math.hypot(dx, dy) || 1;

  return { x: SUN.x - (dx / len) * (SUN_R + 12), y: SUN.y - (dy / len) * (SUN_R + 12) };
});

/** 太阳受到的引力：从太阳中心出发，沿连线指向行星（尖端落在行星边缘外一点） */
const reactionTo = computed(() => {
  const dx = planet.value.x - SUN.x;
  const dy = planet.value.y - SUN.y;
  const len = Math.hypot(dx, dy) || 1;

  return {
    x: planet.value.x - (dx / len) * (PLANET_R + 10),
    y: planet.value.y - (dy / len) * (PLANET_R + 10),
  };
});

/** 线速度：圆轨道上与半径垂直的切线方向（略小一号，画在物体旁侧） */
const velocityTo = computed(() => {
  const tx = -Math.sin(angle);
  const ty = Math.cos(angle);

  return { x: planet.value.x + tx * 58, y: planet.value.y + ty * 58 };
});
</script>

<template>
  <svg viewBox="0 0 460 300" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- 公转轨道：圆 -->
    <circle :cx="SUN.x" :cy="SUN.y" :r="R" fill="none" stroke="rgba(148,163,184,0.45)" stroke-width="1.8" stroke-dasharray="8 7" />

    <!-- 半径连线 -->
    <line :x1="SUN.x" :y1="SUN.y" :x2="planet.x" :y2="planet.y" stroke="rgba(148,163,184,0.55)" stroke-width="1.4" stroke-dasharray="6 5" />
    <text
      :x="radiusLabel.x"
      :y="radiusLabel.y"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      fill="#e2e8f0"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      r
    </text>

    <CelestialSun :x="SUN.x" :y="SUN.y" :r="SUN_R" label="太阳" :label-size="15" />
    <CelestialPlanet :x="planet.x" :y="planet.y" :r="PLANET_R" variant="red" label="行星" :label-size="15" />

    <!-- 线速度：沿圆轨道切线，略小一号 -->
    <CourseArrow :from="planet" :to="velocityTo" stroke="#60a5fa" :stroke-width="2.6" label="v" :label-dx="6" :label-dy="16" />

    <!-- 行星受到的引力：从行星中心指向太阳（充当向心力） -->
    <CourseArrow v-if="showForce" :from="planet" :to="forceTo" stroke="#f87171" :stroke-width="3.4" label="F" :label-dx="-14" :label-dy="-6" />

    <!-- 太阳受到的引力：与行星受到的引力等大反向 -->
    <CourseArrow v-if="showForce && mutual" :from="SUN" :to="reactionTo" stroke="#f87171" :stroke-width="3.4" label="F′" :label-dx="-16" :label-dy="18" />
  </svg>
</template>
