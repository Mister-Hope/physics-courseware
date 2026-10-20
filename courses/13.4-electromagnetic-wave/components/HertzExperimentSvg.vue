<!-- 第 8 页：赫兹捕捉电磁波的装置——发射天线间放电产生火花，接收天线中感应出电流；改变两天线距离观察示数 -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 880 220" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="360" y="18" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">发射天线</text>
    <text x="40" y="204" font-size="15" fill="var(--c-text-dim)">接收天线</text>
    <rect x="40" y="36" width="300" height="10" rx="5" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="380" y="36" width="300" height="10" rx="5" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="52" y="30" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">A</text>
    <text x="668" y="30" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">B</text>
    <rect x="40" y="162" width="300" height="10" rx="5" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="380" y="162" width="300" height="10" rx="5" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="52" y="156" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">C</text>
    <text x="668" y="156" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">D</text>
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 100 100 V 84 H 40 V 46" />
      <path d="M 190 100 V 88 H 680 V 46" />
      <path d="M 340 167 H 346" />
      <path d="M 374 167 H 380" />
    </g>
    <rect x="70" y="100" width="150" height="52" rx="8" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="145" y="120" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">高压发生器</text>
    <text x="145" y="144" text-anchor="middle" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">G</text>
    <CircuitMeter :x="360" :y="167" kind="a" :r="14" />
    <g v-if="(step ?? 0) >= 1">
      <path d="M 342 41 L 350 33 L 356 45 L 364 34 L 372 41" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.3" stroke-linecap="round" />
      <path d="M 342 41 L 350 33 L 356 45 L 364 34 L 372 41" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
      <text x="360" y="72" text-anchor="middle" font-size="15" fill="var(--c-accent)">放电火花</text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <text x="360" y="205" text-anchor="middle" font-size="14" fill="var(--c-physics)">感应电流，电流表指针偏转</text>
    </g>
    <g v-if="(step ?? 0) >= 3">
      <line x1="720" y1="41" x2="720" y2="167" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="7 5" />
      <line x1="712" y1="41" x2="728" y2="41" stroke="var(--c-physics)" stroke-width="1.6" />
      <line x1="712" y1="167" x2="728" y2="167" stroke="var(--c-physics)" stroke-width="1.6" />
      <text x="738" y="108" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">d</text>
      <text x="770" y="108" font-size="14" fill="var(--c-physics)">改变距离</text>
    </g>
  </svg>
</template>
