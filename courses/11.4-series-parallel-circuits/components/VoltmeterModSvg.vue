<script setup lang="ts">
/** 第 8 页：电压表改装电路（教材图 11.4-5）：表头与分压电阻 R 串联，虚线框＝改装后的电压表 */
</script>

<template>
  <svg viewBox="0 0 440 170" width="420" height="162" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 40 62 H 134" />
      <path d="M 166 62 H 251" />
      <path d="M 299 62 H 400" />
    </g>
    <rect x="110" y="30" width="240" height="70" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" />
    <CircuitMeter :x="150" :y="62" kind="a" />
    <CircuitResistor :x="275" :y="62" />
    <text x="150" y="122" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">表头</text>
    <text x="275" y="122" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">分压电阻</text>
    <text x="404" y="67" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent-2)">+</text>
    <text x="34" y="67" text-anchor="end" font-family="KaTeX_Main" font-size="17" fill="var(--c-text-dim)">−</text>
    <text x="230" y="154" text-anchor="middle" font-size="16" fill="var(--c-accent)">改装成电压表：表头串联一个电阻</text>
  </svg>
</template>
