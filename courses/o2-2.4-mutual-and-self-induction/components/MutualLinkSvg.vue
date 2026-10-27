<!--
  第 4 页示意图：互感的因果链——
  A 中电流变化 → A 周围的磁场变化 → 穿过 B 的磁通量变化 → B 中产生感应电动势。
  图中只画两只线圈与穿过它们的磁场，不在图上写结论（结论由页面给出）。
  两只线圈用共享 Solenoid（连续螺旋线）：同轴横放、4 匝，磁感线穿过管口。
  不标电流方向，两圈取同一绕向（从右端看顺时针）只是统一画法。
-->
<template>
  <svg viewBox="60 35 330 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 穿过两只线圈的磁场回路 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-dasharray="12 9" class="field-flow" opacity="0.75">
      <ellipse cx="230" cy="120" rx="108" ry="22" />
      <ellipse cx="230" cy="120" rx="118" ry="44" />
      <ellipse cx="230" cy="120" rx="126" ry="62" />
    </g>
    <!-- 线圈 A：4 匝、半径 26，从右端看顺时针 -->
    <Solenoid :x="121" :y="120" :length="42" :radius="26" :turns="4" direction="cw" :phase="0" :line-width="2.8" :back-opacity="0.32" />
    <!-- 线圈 B：与 A 同轴、同绕向 -->
    <Solenoid
      :x="339"
      :y="120"
      :length="42"
      :radius="26"
      :turns="4"
      direction="cw"
      :phase="0"
      :line-width="2.8"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 标签 -->
    <text x="121" y="64" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">线圈 A</text>
    <text x="339" y="64" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">线圈 B</text>
    <text x="121" y="204" text-anchor="middle" font-size="15" fill="var(--c-text)">电流变化</text>
    <text x="339" y="204" text-anchor="middle" font-size="15" fill="var(--c-text)">产生感应电动势</text>
  </svg>
</template>
