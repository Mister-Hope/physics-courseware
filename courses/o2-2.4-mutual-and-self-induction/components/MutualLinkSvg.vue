<!--
  第 4 页示意图：互感的因果链——
  A 中电流变化 → A 周围的磁场变化 → 穿过 B 的磁通量变化 → B 中产生感应电动势。
  图中只画两只线圈与穿过它们的磁场，不在图上写结论（结论由页面给出）。
-->
<template>
  <svg viewBox="60 35 330 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 穿过两只线圈的磁场回路 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-dasharray="12 9" class="field-flow" opacity="0.75">
      <ellipse cx="230" cy="120" rx="108" ry="22" />
      <ellipse cx="230" cy="120" rx="118" ry="44" />
      <ellipse cx="230" cy="120" rx="126" ry="62" />
    </g>

    <!-- 线圈 A -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.8">
      <ellipse cx="100" cy="120" rx="7" ry="26" />
      <ellipse cx="114" cy="120" rx="7" ry="26" />
      <ellipse cx="128" cy="120" rx="7" ry="26" />
      <ellipse cx="142" cy="120" rx="7" ry="26" />
    </g>

    <!-- 线圈 B -->
    <g fill="none" stroke="var(--c-accent-2)" stroke-width="2.8">
      <ellipse cx="318" cy="120" rx="7" ry="26" />
      <ellipse cx="332" cy="120" rx="7" ry="26" />
      <ellipse cx="346" cy="120" rx="7" ry="26" />
      <ellipse cx="360" cy="120" rx="7" ry="26" />
    </g>

    <!-- 标签 -->
    <text x="121" y="64" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">线圈 A</text>
    <text x="339" y="64" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">线圈 B</text>
    <text x="121" y="204" text-anchor="middle" font-size="15" fill="var(--c-text)">电流变化</text>
    <text x="339" y="204" text-anchor="middle" font-size="15" fill="var(--c-text)">产生感应电动势</text>
  </svg>
</template>
