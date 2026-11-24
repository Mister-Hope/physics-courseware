<!--
  4.2 P16：科学漫步——麦克斯韦电磁场理论的建立（时间轴：1831 / 1854 / 1860 / 1886，教材原文口径）
-->
<template>
  <NumberAxis
    :range="[1820, 1900]"
    :ticks="{ labels: false, values: [] }"
    :callouts="callouts"
    :view="{ width: 900, height: 178 }"
    :font-scale="1.08"
  />
</template>

<script setup lang="ts">
const callouts = [
  {
    value: 1831,
    text: "1831　法拉第发现电磁感应",
    side: "above",
    color: "var(--c-text-dim)",
    dy: 4,
  },
  {
    value: 1854,
    text: "1854　麦克斯韦研读法拉第著作",
    side: "below",
    color: "var(--c-physics)",
    dy: -2,
  },
  {
    value: 1860,
    text: "1860　拜访法拉第",
    side: "above",
    color: "var(--c-physics)",
    dy: 4,
  },
  {
    value: 1886,
    text: "1886　赫兹实验证实电磁波",
    side: "below",
    color: "var(--c-accent)",
    dy: -2,
  },
];
</script>
