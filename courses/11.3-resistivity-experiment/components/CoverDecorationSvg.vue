<script setup lang="ts">
/** 封面装饰图：伏安法测金属丝电阻率的电路示意 （电源 + 开关 + 滑动变阻器位置上的金属丝 + 并联电压表 + 串联电流表）。 元件一律用共享 <Circuit*> 组件；导线手画（止于元件两端，不穿过元件）。 */
const { width = 300 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 220 150" :width="width" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.75">
      <path d="M 32 44 V 62" />
      <path d="M 32 78 V 122 H 99" />
      <path d="M 104 44 H 32" />
      <path d="M 144 44 H 157" />
      <path d="M 189 44 H 196 V 122 H 147" />
      <path d="M 76 122 V 85 H 107" />
      <path d="M 139 85 H 170 V 122" />
    </g>
    <circle cx="76" cy="122" r="3" fill="currentColor" opacity="0.75" />
    <circle cx="170" cy="122" r="3" fill="currentColor" opacity="0.75" />
    <CircuitBattery :x="32" :y="70" orientation="vertical" polarity />
    <CircuitSwitch :x="124" :y="44" :open="true" />
    <CircuitResistor :x="123" :y="122" />
    <CircuitMeter :x="123" :y="85" kind="v" />
    <CircuitMeter :x="173" :y="44" kind="a" />
    <text x="110" y="145" text-anchor="middle" style="font-size: 13px" fill="var(--c-text-dim)" opacity="0.7">伏安法测电阻率</text>
  </svg>
</template>
