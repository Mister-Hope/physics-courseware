<script setup lang="ts">
/**
 * 三个宇宙速度（7.4）：一条发射速度数轴，标出 7.9 / 11.2 / 16.7 km/s 三个节点。 数轴用共享的 `NumberAxis`（禁止手写坐标轴
 * SVG）；三段含义写在页面正文里。
 */
const CALLOUTS: {
  value: number;
  text: string;
  unit: string;
  side: "above" | "below";
  color: string;
}[] = [
  { value: 7.9, text: "7.9", unit: "km/s", side: "above", color: "#e2a846" },
  { value: 11.2, text: "11.2", unit: "km/s", side: "above", color: "#60a5fa" },
  { value: 16.7, text: "16.7", unit: "km/s", side: "above", color: "#2dd4bf" },
];
</script>

<template>
  <NumberAxis
    :range="[0, 18]"
    :axis="{ quantity: 'v', unit: '(km/s)' }"
    :ticks="{ values: [0, 5, 10, 15] }"
    :callouts="CALLOUTS"
    :view="{ width: 900, height: 140 }"
    :font-scale="1.15"
  />
</template>
