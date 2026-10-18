<script setup lang="ts">
/** 第 8 页：电流表改装电路（教材图 11.4-6）：表头与分流电阻 R 并联，虚线框＝改装后的电流表 */
</script>

<template>
  <svg viewBox="0 0 440 210" width="420" height="200" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 20 50 H 420" />
      <path d="M 20 150 H 420" />
      <path d="M 160 50 V 104" />
      <path d="M 160 136 V 150" />
      <path d="M 300 50 V 76" />
      <path d="M 300 124 V 150" />
    </g>
    <circle cx="160" cy="50" r="3" fill="var(--c-text)" />
    <circle cx="300" cy="50" r="3" fill="var(--c-text)" />
    <circle cx="160" cy="150" r="3" fill="var(--c-text)" />
    <circle cx="300" cy="150" r="3" fill="var(--c-text)" />
    <rect x="120" y="30" width="220" height="140" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" />
    <CircuitMeter :x="160" :y="120" kind="a" />
    <CircuitResistor :x="300" :y="100" orientation="vertical" />
    <text x="204" y="126" font-size="15" fill="var(--c-text-dim)">表头</text>
    <text x="326" y="106" font-size="15" fill="var(--c-text-dim)">分流电阻</text>
    <text x="20" y="40" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent-2)">+</text>
    <text x="20" y="174" font-family="KaTeX_Main" font-size="17" fill="var(--c-text-dim)">−</text>
    <text x="230" y="196" text-anchor="middle" font-size="16" fill="var(--c-accent)">改装成电流表：表头并联一个电阻</text>
  </svg>
</template>
