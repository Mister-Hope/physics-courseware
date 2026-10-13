<script setup lang="ts">
// 第 7 页：向心力按作用效果命名 —— 三个例子：绳的拉力、引力、静摩擦力，都能充当向心力。
// 三幅小图共用同一种画法：虚线圆轨道 + 一个"施力者" + 指向圆心的金色箭头。
// 物体填充一律用不透明深色：半透明会让轨道虚线从物体中间透出来，看着像画错。
</script>

<template>
  <svg viewBox="0 0 660 380" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- ① 绳的拉力 -->
    <circle cx="110" cy="150" r="92" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.55" />
    <circle cx="110" cy="150" r="3.4" fill="#94a3b8" />
    <line x1="110" y1="58" x2="110" y2="112" stroke="#e2a846" stroke-width="4" stroke-linecap="round" />
    <path d="M 110 126 L 99 105 L 121 105 Z" fill="#e2a846" />
    <circle cx="110" cy="58" r="16" fill="#3a2f14" stroke="#e2a846" stroke-width="2" />
    <text x="110" y="292" font-family="KaTeX_Main" font-size="24" fill="#e2e8f0" text-anchor="middle">绳的拉力</text>
    <text x="110" y="332" font-family="KaTeX_Main" font-size="22" fill="#94a3b8" text-anchor="middle">细线拴着小球</text>

    <!-- ② 引力 -->
    <circle cx="330" cy="150" r="92" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.55" />
    <circle cx="330" cy="150" r="24" fill="#4a3a18" stroke="#e2a846" stroke-width="2" />
    <line x1="330" y1="58" x2="330" y2="108" stroke="#e2a846" stroke-width="4" stroke-linecap="round" />
    <path d="M 330 122 L 319 101 L 341 101 Z" fill="#e2a846" />
    <circle cx="330" cy="58" r="15" fill="#16304d" stroke="#60a5fa" stroke-width="2" />
    <text x="330" y="292" font-family="KaTeX_Main" font-size="24" fill="#e2e8f0" text-anchor="middle">引力</text>
    <text x="330" y="332" font-family="KaTeX_Main" font-size="22" fill="#94a3b8" text-anchor="middle">地球绕太阳</text>

    <!-- ③ 静摩擦力 -->
    <circle cx="550" cy="150" r="92" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.55" />
    <circle cx="550" cy="150" r="3.4" fill="#94a3b8" />
    <line x1="550" y1="58" x2="550" y2="108" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round" />
    <path d="M 550 122 L 539 101 L 561 101 Z" fill="#2dd4bf" />
    <rect x="532" y="40" width="36" height="36" rx="7" fill="#0d3330" stroke="#2dd4bf" stroke-width="2" />
    <text x="550" y="292" font-family="KaTeX_Main" font-size="24" fill="#e2e8f0" text-anchor="middle">静摩擦力</text>
    <text x="550" y="332" font-family="KaTeX_Main" font-size="22" fill="#94a3b8" text-anchor="middle">随圆盘转动的物块</text>
  </svg>
</template>
