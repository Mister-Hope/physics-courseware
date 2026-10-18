<script setup lang="ts">
/**
 * 第 6 页「原子为什么显电中性」：核内 3 个质子（带正电）、3 个中子（不带电），核外 3 个电子（带负电）。
 * 数量画成"可以数出来"的三对，不写"一样多"三个字——那是这一页要学生自己看出来的结论。
 */
</script>

<template>
  <svg viewBox="0 0 520 280" width="100%" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="260" cy="140" rx="212" ry="98" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="7 6" opacity="0.5" />
    <ellipse cx="260" cy="140" rx="118" ry="56" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.3" />

    <!-- 原子核：3 个质子 + 3 个中子 -->
    <circle cx="238" cy="126" r="14" fill="var(--c-danger)" fill-opacity="0.9" />
    <text x="238" y="126" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="17" fill="#0c1122">+</text>
    <circle cx="266" cy="126" r="14" fill="var(--c-neutral-600)" />
    <circle cx="252" cy="150" r="14" fill="var(--c-danger)" fill-opacity="0.9" />
    <text x="252" y="150" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="17" fill="#0c1122">+</text>
    <circle cx="280" cy="150" r="14" fill="var(--c-neutral-600)" />
    <circle cx="252" cy="172" r="14" fill="var(--c-danger)" fill-opacity="0.9" />
    <text x="252" y="172" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="17" fill="#0c1122">+</text>
    <circle cx="280" cy="172" r="14" fill="var(--c-neutral-600)" />

    <!-- 核外电子 -->
    <circle cx="48" cy="140" r="12" fill="var(--c-velocity)" />
    <text x="48" y="140" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">−</text>
    <circle cx="472" cy="140" r="12" fill="var(--c-velocity)" />
    <text x="472" y="140" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">−</text>
    <circle cx="260" cy="42" r="12" fill="var(--c-velocity)" />
    <text x="260" y="42" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">−</text>

    <!-- 引线标注 -->
    <line x1="228" y1="112" x2="150" y2="60" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.65" />
    <text x="146" y="48" text-anchor="middle" font-size="16" fill="var(--c-danger)">质子：带正电</text>
    <line x1="290" y1="162" x2="360" y2="216" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.65" />
    <text x="392" y="230" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">中子：不带电</text>
    <line x1="472" y1="126" x2="472" y2="92" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.65" />
    <text x="466" y="78" text-anchor="middle" font-size="16" fill="var(--c-velocity)">电子：带负电</text>
  </svg>
</template>
