<!-- 分子势能随分子间距离变化的图像（定性） -->
<template>
  <div class="epc">
    <CoordAxes
      :x-range="[0, 6.4]"
      :y-range="[-1.5, 3.2]"
      :x-axis="{ quantity: 'r', side: 'bottom' }"
      :y-axis="{ quantity: 'E', sub: 'p', side: 'left' }"
      :view="{ width: 620, height: 360 }"
      :ticks="{ x: [], y: [], origin: false }"
      :curves="[
        { points: curve, stroke: 'var(--c-accent)', width: 3.2 },
        {
          points: [
            { x: 1.6, y: -1.5 },
            { x: 1.6, y: 0.35 },
          ],
          stroke: 'var(--c-neutral-500)',
          width: 1.3,
          dashed: true,
          showAt: 1,
        },
      ]"
      :labels="[
        { x: 1.72, y: 0.15, tex: 'r_0', anchor: 'left', dot: 4, size: 16, showAt: 1 },
        {
          x: 2.55,
          y: -1.2,
          parts: [{ text: '势能最小' }],
          anchor: 'top-left',
          size: 14,
          color: 'var(--c-accent)',
          showAt: 2,
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
  { x: 0.9, y: 3 },
  { x: 1, y: 1.55 },
  { x: 1.1, y: 0.62 },
  { x: 1.2, y: 0.05 },
  { x: 1.3, y: -0.34 },
  { x: 1.4, y: -0.72 },
  { x: 1.5, y: -1 },
  { x: 1.6, y: -1.12 },
  { x: 1.7, y: -1.08 },
  { x: 1.8, y: -0.95 },
  { x: 2, y: -0.65 },
  { x: 2.3, y: -0.3 },
  { x: 2.8, y: -0.12 },
  { x: 3.5, y: -0.04 },
  { x: 4.5, y: -0.01 },
  { x: 6.2, y: 0 },
];
</script>

<style scoped>
.epc :deep(svg) {
  width: 100%;
  height: auto;
}
</style>
