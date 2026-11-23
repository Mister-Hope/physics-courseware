<!-- 第 11 页：分子力 F 随分子间距离 r 变化的图像 -->
<template>
  <div class="mfc">
    <CoordAxes
      :x-range="[0, 6.4]"
      :y-range="[-1.2, 3.6]"
      :x-axis="{ quantity: 'r', side: 'bottom' }"
      :y-axis="{ quantity: 'F', side: 'left' }"
      :view="{ width: 620, height: 360 }"
      :ticks="{ x: [], y: [], origin: false }"
      :curves="[
        { points: curve, stroke: 'var(--c-accent)', width: 3.5 },
        {
          points: [
            { x: 1.6, y: -1.0 },
            { x: 1.6, y: 0.5 },
          ],
          stroke: 'var(--c-neutral-500)',
          width: 1.4,
          dashed: true,
          showAt: 0,
        },
      ]"
      :labels="[
        { x: 1.6, y: 0, tex: 'r_0', anchor: 'top-right', dot: 4, size: 16, showAt: 0 },
        {
          x: 1.05,
          y: 1.9,
          parts: [{ text: '斥力' }],
          anchor: 'top-right',
          size: 15,
          color: 'var(--c-danger)',
          showAt: 1,
        },
        {
          x: 3.25,
          y: -0.72,
          parts: [{ text: '引力' }],
          anchor: 'bottom-right',
          size: 15,
          color: 'var(--c-physics)',
          showAt: 2,
        },
        {
          x: 5.7,
          y: 0.3,
          tex: 'F \\to 0',
          anchor: 'top-left',
          size: 14,
          color: 'var(--c-text-mute)',
          showAt: 3,
        },
      ]"
      :step="step"
      :font-scale="0.9"
    />
  </div>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const curve = [
  { x: 0.9, y: 3.25 },
  { x: 1, y: 2.25 },
  { x: 1.1, y: 1.45 },
  { x: 1.2, y: 0.88 },
  { x: 1.3, y: 0.48 },
  { x: 1.4, y: 0.22 },
  { x: 1.5, y: 0.07 },
  { x: 1.6, y: 0 },
  { x: 1.7, y: -0.1 },
  { x: 1.8, y: -0.22 },
  { x: 2, y: -0.42 },
  { x: 2.2, y: -0.55 },
  { x: 2.5, y: -0.51 },
  { x: 2.9, y: -0.36 },
  { x: 3.4, y: -0.24 },
  { x: 4.2, y: -0.12 },
  { x: 5.2, y: -0.05 },
  { x: 6.2, y: -0.02 },
];
</script>

<style scoped>
.mfc :deep(svg) {
  width: 100%;
  height: auto;
}
</style>
