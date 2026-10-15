<!-- 重力与万有引力（第 12 页，一般纬度）：物体随地球自转需要指向地轴的向心力，重力是万有引力减去向心力后的结果 —— 两者大小不等、方向也不同（图中把向心力放大，便于看清） -->
<script setup lang="ts">
import { computed } from "vue";

/** 地球 */
const EARTH = { x: 300, y: 180 };
const EARTH_R = 115;

/** 物体在纬度 45° 处 */
const LATITUDE = 45;
const latRad = (LATITUDE * Math.PI) / 180;
const P = {
  x: EARTH.x + EARTH_R * Math.cos(latRad),
  y: EARTH.y - EARTH_R * Math.sin(latRad),
};

/** 万有引力：沿地心连线，指向地心 */
const GRAVITY_LEN = 110;
const gravityTip = computed(() => {
  const dx = EARTH.x - P.x;
  const dy = EARTH.y - P.y;
  const len = Math.hypot(dx, dy) || 1;

  return { x: P.x + (dx / len) * GRAVITY_LEN, y: P.y + (dy / len) * GRAVITY_LEN };
});

/** 向心力：垂直于地轴、指向地轴（图中放大） */
const CENTRIPETAL_LEN = 70;
const centripetalTip = { x: P.x - CENTRIPETAL_LEN, y: P.y };

/** 重力 = 万有引力 − 向心力（矢量差） */
const weightTip = computed(() => ({
  x: gravityTip.value.x - centripetalTip.x + P.x,
  y: gravityTip.value.y - centripetalTip.y + P.y,
}));
</script>

<template>
  <svg viewBox="0 0 560 340" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- 地轴与自转 -->
    <line :x1="EARTH.x" y1="26" :x2="EARTH.x" y2="330" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" stroke-dasharray="7 6" />
    <text :x="EARTH.x" y="22" text-anchor="middle" font-size="15" fill="#94a3b8">地轴</text>
    <ellipse :cx="EARTH.x" cy="70" rx="68" ry="18" fill="none" stroke="rgba(96,165,250,0.6)" stroke-width="1.6" stroke-dasharray="5 5" />
    <polygon :points="`${EARTH.x + 68},70 ${EARTH.x + 59},64 ${EARTH.x + 61},77`" fill="#60a5fa" />

    <CelestialEarth :x="EARTH.x" :y="EARTH.y" :r="EARTH_R" />

    <!-- 物体 -->
    <circle :cx="P.x" :cy="P.y" r="10" fill="rgba(226,168,70,0.25)" stroke="#e2a846" stroke-width="2.4" />

    <!-- 矢量关系：万有引力 = 重力 + 向心力（虚线补成三角形） -->
    <line :x1="weightTip.x" :y1="weightTip.y" :x2="gravityTip.x" :y2="gravityTip.y" stroke="rgba(148,163,184,0.7)" stroke-width="1.6" stroke-dasharray="6 5" />
    <line
      :x1="centripetalTip.x"
      :y1="centripetalTip.y"
      :x2="gravityTip.x"
      :y2="gravityTip.y"
      stroke="rgba(148,163,184,0.7)"
      stroke-width="1.6"
      stroke-dasharray="6 5"
    />

    <CourseArrow :from="P" :to="gravityTip" stroke="#f87171" :stroke-width="3.4" />
    <CourseArrow :from="P" :to="weightTip" stroke="#e2a846" :stroke-width="3.4" />
    <CourseArrow :from="P" :to="centripetalTip" stroke="#60a5fa" :stroke-width="3.4" />

    <text :x="396" y="94" font-size="16" fill="#e2a846">物体</text>
    <text :x="346" y="84" text-anchor="middle" font-size="16" fill="#60a5fa" stroke="#0f1425" stroke-width="4" paint-order="stroke">向心力</text>
    <text :x="392" y="146" font-size="16" fill="#e2a846" stroke="#0f1425" stroke-width="4" paint-order="stroke">重力</text>
    <text :x="292" y="204" text-anchor="end" font-size="16" fill="#f87171" stroke="#0f1425" stroke-width="4" paint-order="stroke">万有引力</text>
  </svg>
</template>
