<script setup lang="ts">
// 第 10 页：位置轴上的一条位移有向线段（由初位置指向末位置）；两个小图共用，只有起止位置不同
const { from = 0, to = 2 } = defineProps<{ from?: number; to?: number }>();

/** 位置轴：刻度 −2、−1、0、1、2 分别画在 x = 20、65、110、155、200，每单位 45 个 viewBox 单位 */
const ORIGIN_X = 110;
const UNIT = 45;
const ARROW_HALF = 11;

/**
 * 位置值 → viewBox 横坐标
 *
 * @param value 位置值
 * @returns 对应的 viewBox 横坐标
 */
const xOf = (value: number): number => ORIGIN_X + value * UNIT;
</script>

<template>
  <!-- 第 10 页：位置轴上的位移有向线段（箭头由初位置指向末位置） -->
  <svg viewBox="0 0 220 96" width="190" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="60" x2="200" y2="60" stroke="#64748b" stroke-width="1.5" />
    <g stroke="#64748b" stroke-width="1.2">
      <line x1="65" y1="55" x2="65" y2="65" />
      <line x1="110" y1="55" x2="110" y2="65" />
      <line x1="155" y1="55" x2="155" y2="65" />
    </g>
    <text x="20" y="78" text-anchor="middle" style="font-size: 11px" fill="#94a3b8">−2</text>
    <text x="65" y="78" text-anchor="middle" style="font-size: 11px" fill="#94a3b8">−1</text>
    <text x="110" y="78" text-anchor="middle" style="font-size: 11px" fill="#94a3b8">0</text>
    <text x="155" y="78" text-anchor="middle" style="font-size: 11px" fill="#94a3b8">1</text>
    <text x="200" y="78" text-anchor="middle" style="font-size: 11px" fill="#94a3b8">2</text>
    <line :x1="xOf(from)" y1="60" :x2="xOf(to)" y2="60" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <path :d="`M ${xOf(to)} 60 L ${xOf(to) - ARROW_HALF} 54 L ${xOf(to) - ARROW_HALF} 66 Z`" fill="#e2a846" />
  </svg>
</template>
