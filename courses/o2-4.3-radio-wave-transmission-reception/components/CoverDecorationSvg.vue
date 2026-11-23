<!--
  封面装饰：发射天线塔 + 向外辐射的同心波 + 一台收音机。
  纯装饰，不承担物理量标注；颜色只用正本 token。
-->
<template>
  <svg viewBox="0 0 260 180" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 天线塔：两根斜撑 + 横档 + 交叉斜线 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" opacity="0.9">
      <line x1="64" y1="158" x2="64" y2="46" />
      <line x1="47" y1="158" x2="64" y2="62" />
      <line x1="81" y1="158" x2="64" y2="62" />
      <line x1="51" y1="136" x2="77" y2="136" />
      <line x1="54" y1="116" x2="74" y2="116" />
      <line x1="58" y1="96" x2="70" y2="96" />
      <line x1="58.5" y1="78" x2="69.5" y2="78" />
      <path d="M 51 136 L 74 116 M 77 136 L 54 116 M 54 116 L 70 96 M 74 116 L 58 96 M 58 96 L 69.5 78 M 70 96 L 58.5 78" opacity="0.55" />
    </g>
    <circle cx="64" cy="43" r="3.6" fill="var(--c-accent)" />
    <!-- 地面 -->
    <line x1="28" y1="160" x2="112" y2="160" stroke="var(--c-text-dim)" stroke-width="1.5" opacity="0.65" />
    <g stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.4">
      <line x1="36" y1="160" x2="30" y2="167" />
      <line x1="50" y1="160" x2="44" y2="167" />
      <line x1="64" y1="160" x2="58" y2="167" />
      <line x1="78" y1="160" x2="72" y2="167" />
      <line x1="92" y1="160" x2="86" y2="167" />
    </g>
    <!-- 辐射波：以天线顶部为中心的同心弧 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round">
      <path d="M 87.8 40.6 A 32 32 0 0 1 87.8 83.4" opacity="0.75" />
      <path d="M 101.2 28.5 A 50 50 0 0 1 101.2 95.5" opacity="0.55" />
      <path d="M 114.5 16.5 A 68 68 0 0 1 114.5 107.5" opacity="0.4" />
      <path d="M 127.9 4.5 A 86 86 0 0 1 127.9 119.5" opacity="0.26" />
    </g>
    <!-- 收音机：机身 + 喇叭格栅 + 调谐盘 + 拉杆天线 -->
    <rect x="162" y="108" width="82" height="50" rx="9" fill="var(--c-surface)" stroke="var(--c-accent-2)" stroke-width="1.6" />
    <circle cx="180" cy="133" r="7" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
    <line x1="180" y1="129.5" x2="180" y2="133" stroke="var(--c-accent)" stroke-width="1.4" stroke-linecap="round" />
    <g stroke="var(--c-text-dim)" stroke-width="1.4" stroke-linecap="round" opacity="0.75">
      <line x1="196" y1="123" x2="232" y2="123" />
      <line x1="196" y1="132" x2="232" y2="132" />
      <line x1="196" y1="141" x2="232" y2="141" />
    </g>
    <line x1="226" y1="108" x2="246" y2="78" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-linecap="round" />
    <circle cx="246" cy="78" r="3" fill="var(--c-accent-2)" />
  </svg>
</template>
