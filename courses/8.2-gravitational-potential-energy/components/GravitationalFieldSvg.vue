<script setup lang="ts">
/**
 * 第 7 页示意图：万有引力势能——地球与距地心 r 处的物体。
 *
 * 地球用共享组件 CelestialEarth（禁止手画地球）；虚线圈是以地心为圆心、过物体的圆，半径即 r。 viewBox 580×220，页面里按 380px 宽渲染（≈144px 高）。
 */
const EARTH = { x: 130, y: 120 };
const OBJ = { x: 420, y: 60 };
/** 地心到物体的距离（即 r），用作虚线圈半径 */
const R = Math.hypot(OBJ.x - EARTH.x, OBJ.y - EARTH.y);
const MID = { x: (EARTH.x + OBJ.x) / 2, y: (EARTH.y + OBJ.y) / 2 };
</script>

<template>
  <svg viewBox="0 0 580 220" width="100%" style="max-width: 340px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="地球与距地心距离为 r 的物体">
    <circle :cx="EARTH.x" :cy="EARTH.y" :r="R" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.4" />
    <line :x1="EARTH.x" :y1="EARTH.y" :x2="OBJ.x" :y2="OBJ.y" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="8 6" />
    <CelestialEarth :x="EARTH.x" :y="EARTH.y" :r="42" label="地球" :label-size="17" />
    <circle :cx="OBJ.x" :cy="OBJ.y" r="10" fill="var(--c-accent)" />
    <text :x="MID.x + 8" :y="MID.y - 10" font-size="21" fill="var(--c-accent)" class="gfs-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">r</tspan>
    </text>
    <text :x="OBJ.x + 19" :y="OBJ.y + 7" font-size="21" fill="var(--c-text)" class="gfs-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">m</tspan>
    </text>
  </svg>
</template>

<style scoped>
.gfs-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
