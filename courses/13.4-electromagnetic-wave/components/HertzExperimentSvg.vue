<!-- 第 7 页：赫兹实验装置——高压发生器 G 给发射天线 A、B 供电，极间放电产生火花；下方平行放置接收天线 C、D，中间接电流表 -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 740 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="53" width="290" height="14" rx="7" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="370" y="53" width="290" height="14" rx="7" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="55" y="45" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">A</text>
    <text x="645" y="45" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">B</text>
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 115 140 V 110 H 45 V 67" />
      <path d="M 215 140 V 100 H 640 V 67" />
      <path d="M 330 250 H 334" />
      <path d="M 366 250 H 370" />
    </g>
    <rect x="90" y="140" width="150" height="55" rx="8" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="165" y="176" text-anchor="middle" font-size="20" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">G</text>
    <text x="165" y="216" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">高压发生器</text>
    <rect x="60" y="243" width="270" height="14" rx="7" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="370" y="243" width="270" height="14" rx="7" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="75" y="235" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">C</text>
    <text x="625" y="235" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">D</text>
    <CircuitMeter :x="350" :y="250" kind="a" />
    <g v-if="(step ?? 0) >= 1">
      <path d="M 332 60 L 342 51 L 348 66 L 356 52 L 368 60" fill="none" stroke="var(--c-accent)" stroke-width="7" opacity="0.3" stroke-linecap="round" />
      <path d="M 332 60 L 342 51 L 348 66 L 356 52 L 368 60" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
      <text x="350" y="32" text-anchor="middle" font-size="15" fill="var(--c-accent)">放电火花</text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <line x1="700" y1="60" x2="700" y2="250" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="7 5" />
      <line x1="692" y1="60" x2="708" y2="60" stroke="var(--c-physics)" stroke-width="1.6" />
      <line x1="692" y1="250" x2="708" y2="250" stroke="var(--c-physics)" stroke-width="1.6" />
      <text x="716" y="160" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">d</text>
    </g>
  </svg>
</template>
