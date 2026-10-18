<script setup lang="ts">
// 第 4 页：用电压挡测小灯泡电压——多用电表并联接入，红表笔接高电势一侧
</script>
<template>
  <svg viewBox="0 0 640 300" w-full h-full>
    <text x="320" y="16" text-anchor="middle" font-size="12" fill="var(--c-text-faint)">多用电表拨到直流电压挡，与小灯泡并联</text>
    <g stroke="var(--c-line-strong)" stroke-width="1.6" fill="none">
      <path d="M 100 48 H 230" />
      <path d="M 270 48 H 570 V 170 H 520" />
      <path d="M 480 170 H 100 V 72" />
      <path d="M 100 286 H 500 V 190" />
    </g>
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
      <path d="M 300 132 V 48" />
      <path d="M 300 208 V 286" />
    </g>
    <circle cx="300" cy="48" r="3" fill="var(--c-pos)" />
    <circle cx="300" cy="286" r="3" fill="var(--c-neg)" />
    <circle cx="300" cy="170" r="36" fill="#101a2e" stroke="var(--c-pos)" stroke-width="1.8" />
    <text x="300" y="177" text-anchor="middle" font-size="18" fill="var(--c-pos)" font-weight="600">V</text>
    <text x="228" y="176" font-size="11" fill="var(--c-text-faint)">多用电表</text>
    <text x="228" y="190" font-size="11" fill="var(--c-text-faint)">直流电压挡</text>
    <text x="312" y="42" font-size="11" fill="var(--c-pos)">红表笔（+）接高电势一侧</text>
    <text x="312" y="300" font-size="11" fill="var(--c-neg)">黑表笔（−）接低电势一侧</text>
  </svg>
</template>
