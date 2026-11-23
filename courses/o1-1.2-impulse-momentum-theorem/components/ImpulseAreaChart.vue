<!-- 第 8 页：变力 F-t 图，曲线下的面积表示冲量；面积随 step 显示。 -->
<template>
  <CoordAxes
    :x-range="[0, 1.1]"
    :y-range="[0, 10.5]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :y-axis="{ quantity: 'F', unit: 'N' }"
    :ticks="{ x: [], y: [], origin: false }"
    :curves="[{ points: pulse, color: 'var(--c-accent)', width: 3, showAt: 0 }]"
    :areas="[
      {
        points: pulse,
        fill: 'var(--c-accent)',
        fillOpacity: 0.22,
        stroke: 'transparent',
        showAt: 1,
      },
    ]"
    :view="{ width: 620, height: 340 }"
    :step="step"
  />
</template>
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const pulse = [
  { x: 0.15, y: 0 },
  { x: 0.3, y: 7.2 },
  { x: 0.5, y: 9.2 },
  { x: 0.75, y: 6.4 },
  { x: 0.95, y: 0 },
];
</script>
