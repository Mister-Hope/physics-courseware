<script setup lang="ts">
/**
 * 航天大事时间轴（7.4）：1957 年第一颗人造地球卫星 → 1961 加加林 → 1969 阿波罗 11 号 → 2003 神舟五号 → 2022 中国空间站长期有人驻留。 时间轴用共享的
 * `NumberAxis`（禁止手写坐标轴 SVG），具体日期由页面正文给出。
 */
const CALLOUTS: {
  value: number;
  text: string;
  side: "above" | "below";
  color: string;
}[] = [
  { value: 1957, text: "首颗卫星", side: "above", color: "#e2a846" },
  { value: 1961, text: "加加林", side: "below", color: "#60a5fa" },
  { value: 1969, text: "阿波罗11号", side: "above", color: "#e2a846" },
  { value: 2003, text: "神舟五号", side: "below", color: "#60a5fa" },
  { value: 2022, text: "中国空间站", side: "below", color: "#2dd4bf" },
];
</script>

<template>
  <NumberAxis
    :range="[1950, 2030]"
    :axis="{ quantity: 't', unit: '年' }"
    :ticks="{ values: [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020] }"
    :callouts="CALLOUTS"
    :view="{ width: 900, height: 150 }"
    :font-scale="1.15"
  />
</template>
