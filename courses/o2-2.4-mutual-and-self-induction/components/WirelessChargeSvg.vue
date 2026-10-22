<!--
  第 5 页应用图之二：无线充电。
  充电板与手机里的线圈隔着空气耦合，靠互感传递能量。
-->
<template>
  <svg viewBox="0 0 280 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 手机 -->
    <rect x="85" y="38" width="110" height="92" rx="12" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="94" y="47" width="92" height="74" rx="6" fill="var(--c-bg-soft)" stroke="var(--c-border)" stroke-width="1.2" />

    <!-- 手机内线圈 -->
    <g fill="none" stroke="var(--c-accent-2)" stroke-width="2">
      <ellipse cx="140" cy="112" rx="30" ry="5.5" />
      <ellipse cx="140" cy="112" rx="20" ry="4" />
      <ellipse cx="140" cy="112" rx="10" ry="2.5" />
    </g>

    <!-- 充电板 -->
    <rect x="40" y="150" width="200" height="26" rx="12" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />

    <!-- 充电板线圈 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2">
      <ellipse cx="140" cy="163" rx="36" ry="6.5" />
      <ellipse cx="140" cy="163" rx="24" ry="4.8" />
      <ellipse cx="140" cy="163" rx="12" ry="3" />
    </g>

    <!-- 隔空耦合的磁场 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="9 7" class="field-flow" opacity="0.75">
      <ellipse cx="140" cy="138" rx="20" ry="13" />
      <ellipse cx="140" cy="138" rx="34" ry="21" />
    </g>

    <text x="140" y="28" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">手机</text>
    <text x="140" y="194" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">充电板</text>
  </svg>
</template>
