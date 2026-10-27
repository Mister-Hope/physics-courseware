<!--
  第 5 页应用图之三：无线输电。
  两只线圈隔开一段距离，靠互感把能量送过去。
  两只线圈用共享 Solenoid（连续螺旋线）：同轴横放、3 匝，两端都落在管截面下侧、引线从那里接出。
  图上不标电流方向，两圈取同一绕向（从右端看顺时针）只是统一画法。
-->
<template>
  <svg viewBox="0 0 280 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 送电端线圈：3 匝、半径 28，从右端看顺时针；两端在下侧 (60,120) / (92,120) -->
    <Solenoid :x="76" :y="92" :length="32" :radius="28" :turns="3" direction="cw" :phase="180" :line-width="2.6" :back-opacity="0.32" />
    <!-- 受电端线圈：与送电端同轴、同绕向；两端在下侧 (188,120) / (220,120) -->
    <Solenoid
      :x="204"
      :y="92"
      :length="32"
      :radius="28"
      :turns="3"
      direction="cw"
      :phase="180"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 耦合磁场 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-dasharray="10 8" class="field-flow" opacity="0.75">
      <ellipse cx="140" cy="92" rx="76" ry="20" />
      <ellipse cx="140" cy="92" rx="88" ry="40" />
    </g>
    <!-- 引线：从线圈两端的接线点 (60,120) / (92,120) 与 (188,120) / (220,120) 接出 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 60 120 V 150 H 92" />
      <path d="M 92 120 V 150 H 60" />
      <path d="M 188 120 V 150 H 220" />
      <path d="M 220 120 V 150 H 188" />
    </g>
    <text x="76" y="176" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">送电端</text>
    <text x="204" y="176" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">受电端</text>
  </svg>
</template>
