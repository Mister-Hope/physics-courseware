<!--
  第 5 页应用图之三：无线输电。
  两只线圈隔开一段距离，靠互感把能量送过去。
-->
<template>
  <svg viewBox="0 0 280 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 送电端线圈 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.6">
      <ellipse cx="62" cy="92" rx="7" ry="28" />
      <ellipse cx="76" cy="92" rx="7" ry="28" />
      <ellipse cx="90" cy="92" rx="7" ry="28" />
    </g>

    <!-- 受电端线圈 -->
    <g fill="none" stroke="var(--c-accent-2)" stroke-width="2.6">
      <ellipse cx="190" cy="92" rx="7" ry="28" />
      <ellipse cx="204" cy="92" rx="7" ry="28" />
      <ellipse cx="218" cy="92" rx="7" ry="28" />
    </g>

    <!-- 耦合磁场 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-dasharray="10 8" class="field-flow" opacity="0.75">
      <ellipse cx="140" cy="92" rx="76" ry="20" />
      <ellipse cx="140" cy="92" rx="88" ry="40" />
    </g>

    <!-- 引线 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 62 120 V 150 H 90" />
      <path d="M 90 120 V 150 H 62" />
      <path d="M 190 120 V 150 H 218" />
      <path d="M 218 120 V 150 H 190" />
    </g>

    <text x="76" y="176" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">送电端</text>
    <text x="204" y="176" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">受电端</text>
  </svg>
</template>
