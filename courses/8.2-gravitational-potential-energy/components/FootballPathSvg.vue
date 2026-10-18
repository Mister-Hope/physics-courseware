<script setup lang="ts">
/**
 * 第 9 页练习题图（教材图 8.2-8）：足球在地面 1 被踢出，升到最高点 2（高 h），落到地面 3。
 *
 * 干净版只有地面、轨迹、三个位置与最高点的高度 h（题给的量常显）；
 * showForces：点击后才在三个位置上出现重力 G（都从球的几何中心竖直向下）。
 *
 * viewBox 580×300，exercise-split 的图栏里按固有尺寸 340×176 渲染。
 */
const { showForces = false } = defineProps<{
  /** 点击后出现：三个位置上的重力箭头 */
  showForces?: boolean;
}>();

const P1 = { x: 90, y: 205 };
const P2 = { x: 300, y: 80 };
const P3 = { x: 510, y: 205 };
</script>

<template>
  <svg viewBox="0 0 580 300" width="340" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="足球被踢出后升到最高点再落到地面">
    <SurfaceHatch :from="{ x: 40, y: 240 }" :to="{ x: 550, y: 240 }" side="below" :thickness="12" :gap="20" />
    <path d="M 90 205 Q 300 -45 510 205" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-dasharray="9 7" />
    <line :x1="P2.x" :y1="P2.y" :x2="452" :y2="P2.y" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="5 5" />
    <line x1="452" y1="80" x2="452" y2="240" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="443" y1="80" x2="461" y2="80" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="443" y1="240" x2="461" y2="240" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="464" y="166" font-size="21" fill="var(--c-accent)" class="fps-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan>
    </text>

    <circle :cx="P1.x" :cy="P1.y" r="12" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <circle :cx="P2.x" :cy="P2.y" r="12" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <circle :cx="P3.x" :cy="P3.y" r="12" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <text :x="P1.x - 24" :y="P1.y - 8" font-size="21" fill="var(--c-text)" class="fps-lbl">1</text>
    <text :x="P2.x - 7" :y="P2.y - 24" font-size="21" fill="var(--c-text)" class="fps-lbl">2</text>
    <text :x="P3.x + 20" :y="P3.y + 24" font-size="21" fill="var(--c-text)" class="fps-lbl">3</text>

    <g v-if="showForces">
      <CourseArrow :from="P1" :to="{ x: P1.x, y: P1.y + 30 }" stroke="var(--c-force)" :stroke-width="2.8" label="G" :label-dx="-16" :label-dy="6" />
      <CourseArrow :from="P2" :to="{ x: P2.x, y: P2.y + 30 }" stroke="var(--c-force)" :stroke-width="2.8" label="G" :label-dx="-16" :label-dy="6" />
      <CourseArrow :from="P3" :to="{ x: P3.x, y: P3.y + 30 }" stroke="var(--c-force)" :stroke-width="2.8" label="G" :label-dx="-16" :label-dy="6" />
    </g>
  </svg>
</template>

<style scoped>
.fps-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
