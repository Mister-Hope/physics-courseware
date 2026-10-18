<script setup lang="ts">
// 第 5 页：用电流挡测支路电流——断开电路，多用电表串联接入
import { CourseArrow } from "#slidev/ shared/components/index.js";
</script>
<template>
  <svg viewBox="0 0 640 300" w-full h-full>
    <text x="320" y="16" text-anchor="middle" font-size="12" fill="var(--c-text-faint)">断开电路，把多用电表（直流电流挡）串联进去</text>
    <g stroke="var(--c-line-strong)" stroke-width="1.6" fill="none">
      <path d="M 100 48 H 230" />
      <path d="M 270 48 H 570 V 170 H 520" />
      <path d="M 480 170 H 100 V 286" />
      <path d="M 100 212 V 286" />
    </g>
    <g stroke-dasharray="4 4" stroke="var(--c-warn)" stroke-width="1.2" fill="none">
      <rect x="62" y="128" width="76" height="104" rx="10" />
    </g>
    <text x="142" y="132" font-size="11" fill="var(--c-warn)">此处断开，接入电表</text>
    <g>
      <circle cx="230" cy="48" r="2.6" fill="var(--c-line-strong)" />
      <circle cx="270" cy="48" r="2.6" fill="var(--c-line-strong)" />
      <line x1="232" y1="47" x2="263" y2="33" stroke="var(--c-text)" stroke-width="2.4" />
      <text x="250" y="72" text-anchor="middle" font-size="11" fill="var(--c-text-faint)">S</text>
    </g>
    <g stroke="var(--c-text)" stroke-width="2.4" fill="none">
      <line x1="86" y1="48" x2="114" y2="48" />
      <line x1="92" y1="58" x2="108" y2="58" stroke-width="5" />
      <line x1="86" y1="68" x2="114" y2="68" />
      <line x1="92" y1="78" x2="108" y2="78" stroke-width="5" />
    </g>
    <text x="130" y="66" font-size="11" fill="var(--c-text-faint)">电源</text>
    <g stroke="var(--c-gold)" stroke-width="2" fill="none">
      <line x1="480" y1="150" x2="520" y2="190" />
      <line x1="480" y1="190" x2="520" y2="150" />
    </g>
    <circle cx="500" cy="170" r="22" fill="rgba(226,168,70,0.12)" stroke="var(--c-gold)" stroke-width="1.8" />
    <text x="546" y="174" font-size="12" fill="var(--c-gold)">小灯泡</text>
    <g stroke="var(--c-line-strong)" stroke-width="1.6" fill="none">
      <path d="M 100 72 V 148" />
    </g>
    <circle cx="100" cy="180" r="32" fill="#101a2e" stroke="var(--c-pos)" stroke-width="1.8" />
    <text x="100" y="187" text-anchor="middle" font-size="18" fill="var(--c-pos)" font-weight="600">A</text>
    <text x="140" y="176" font-size="11" fill="var(--c-text-faint)">多用电表</text>
    <text x="140" y="190" font-size="11" fill="var(--c-text-faint)">直流电流挡</text>
    <text x="140" y="232" font-size="11" fill="var(--c-pos)">红表笔（+）：电流流入端</text>
    <text x="140" y="152" font-size="11" fill="var(--c-neg)">黑表笔（−）：电流流出端</text>
    <CourseArrow :from="{ x: 420, y: 286 }" :to="{ x: 352, y: 286 }" color="#60a5fa" :width="3" />
    <CourseArrow :from="{ x: 340, y: 48 }" :to="{ x: 408, y: 48 }" color="#60a5fa" :width="3" />
    <text x="378" y="302" text-anchor="middle" font-size="11" fill="var(--c-neg)">I</text>
    <text x="374" y="40" text-anchor="middle" font-size="11" fill="var(--c-neg)">I</text>
  </svg>
</template>
