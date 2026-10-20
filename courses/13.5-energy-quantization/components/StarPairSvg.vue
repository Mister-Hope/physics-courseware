<script setup lang="ts">
/**
 * 第 19 页题目图：教材练习 3 里「有的恒星偏红、有的偏蓝」的干净示意图。 只画两颗星（共享 CelestialPlanet，红 / 蓝两套配色）并标注「红星」「蓝星」， 不带任何分析标注（谁更热、为什么，都靠点击后才出）。
 *
 * ⚠️ exercise-split 的 #fig 栏宽度取 max-content，根 <svg> 必须写固有 width/height，否则图栏塌成 0。
 */
</script>

<template>
  <svg viewBox="0 0 380 170" width="320" height="143" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="夜空中两颗恒星，一颗偏红、一颗偏蓝">
    <CelestialPlanet :x="100" :y="76" :r="44" variant="red" label="红星" label-size="17" />
    <CelestialPlanet :x="280" :y="76" :r="44" variant="blue" label="蓝星" label-size="17" />
  </svg>
</template>
