<script setup lang="ts">
/** 封面右下角装饰：一个闭合回路（电源 + 开关 + 灯泡），电流沿回路持续流动 —— 对应课题《电源和电流》 */
const { width = 320 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 320 150" :width="width" xmlns="http://www.w3.org/2000/svg" class="select-none overflow-visible" aria-hidden="true">
    <!-- 导线：横平竖直、90° 拐角，止于每个元件两端 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 40 30 H 280" />
      <path d="M 40 30 V 67" />
      <path d="M 40 83 V 120" />
      <path d="M 40 120 H 140" />
      <path d="M 180 120 H 280" />
      <path d="M 280 120 V 87" />
      <path d="M 280 63 V 30" />
    </g>
    <!-- 灯泡发光光晕（画在灯泡符号之下） -->
    <circle cx="280" cy="75" r="26" fill="var(--c-accent)" opacity="0.16" />
    <circle cx="280" cy="75" r="18" fill="var(--c-accent)" opacity="0.12" />
    <CircuitBattery :x="40" :y="75" orientation="vertical" polarity />
    <CircuitSwitch :x="160" :y="120" :open="false" label="S" />
    <CircuitBulb :x="280" :y="75" label="L" />
    <!-- 电流方向：从电源正极（上端）流出 -->
    <CourseArrow :from="{ x: 100, y: 30 }" :to="{ x: 216, y: 30 }" stroke="var(--c-accent)" :stroke-width="2.6" label="I" :label-dy="-12" />
  </svg>
</template>
